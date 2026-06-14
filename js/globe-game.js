// "Hit the Hex" — a target-arcade game played on the About globe.
//
// The globe lives in two modes: ambient (faint background) and game. This
// module owns the game mode: a Play button toggles it on, warm target orbs
// pop onto the spinning globe, and clicking them before they fade scores
// points against a 30-second clock. Everything here is self-contained so
// main.js stays focused on building the ambient globe.

const ROUND_SECONDS = 30;
const SPAWN_MS = 850; // how often a new target appears
const TARGET_LIFE_MS = 2000; // how long a target stays before it fades (a miss)
const HISCORE_KEY = "zoe-globe-hiscore";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const wrapLng = (lng) => ((((lng + 180) % 360) + 360) % 360) - 180;

export function initGlobeGame(world, el, aboutSection) {
  if (!world || !el || !aboutSection) return;

  const controls = world.controls();
  const ui = buildUI(aboutSection);

  let targets = []; // { id, lat, lng, born }
  let nextId = 1;
  let score = 0;
  let timeLeft = ROUND_SECONDS;
  let playing = false;
  let savedOpacity = "";
  let spawnTimer = null;
  let reapTimer = null;
  let clockTimer = null;

  const hiScore = () => Number(localStorage.getItem(HISCORE_KEY) || 0);

  const render = () => world.pointsData(targets);

  function spawn() {
    // Place targets within the front-facing hemisphere so they're reachable
    // even as the globe slowly spins.
    const pov = world.pointOfView();
    const lat = clamp(pov.lat + (Math.random() * 110 - 55), -75, 75);
    const lng = wrapLng(pov.lng + (Math.random() * 120 - 60));
    targets.push({ id: nextId++, lat, lng, born: performance.now() });
    render();
  }

  function reapMisses() {
    const now = performance.now();
    const before = targets.length;
    targets = targets.filter((t) => now - t.born < TARGET_LIFE_MS);
    if (targets.length !== before) render();
  }

  function tickClock() {
    timeLeft -= 1;
    ui.time.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }

  function onHit(point) {
    if (!playing || !point) return;
    targets = targets.filter((t) => t.id !== point.id);
    score += 1;
    ui.score.textContent = String(score);
    // quick burst at the hit location
    world.ringsData([{ lat: point.lat, lng: point.lng }]);
    setTimeout(() => playing && world.ringsData([]), 500);
    render();
  }

  function clearTimers() {
    clearInterval(spawnTimer);
    clearInterval(reapTimer);
    clearInterval(clockTimer);
  }

  function startGame() {
    playing = true;
    score = 0;
    timeLeft = ROUND_SECONDS;
    targets = [];
    nextId = 1;
    ui.score.textContent = "0";
    ui.time.textContent = `${ROUND_SECONDS}s`;
    ui.hi.textContent = String(hiScore());
    ui.over.classList.remove("is-on");
    aboutSection.classList.add("is-playing");

    // Configure the globe for play: clickable warm orbs, pulsing hit rings.
    savedOpacity = el.style.opacity;
    el.style.opacity = "0.92";
    world
      .pointColor(() => "#f0a56e")
      .pointAltitude(0.07)
      .pointRadius(0.7)
      .onPointClick(onHit)
      .ringColor(() => (t) => `rgba(240, 165, 110, ${1 - t})`)
      .ringMaxRadius(4)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(400)
      .ringsData([]);
    world.enablePointerInteraction(true);
    controls.enableRotate = false; // no dragging mid-game
    controls.autoRotateSpeed = 1.2;

    spawnTimer = setInterval(spawn, SPAWN_MS);
    reapTimer = setInterval(reapMisses, 200);
    clockTimer = setInterval(tickClock, 1000);
    spawn();
  }

  function endGame() {
    if (!playing) return;
    playing = false;
    clearTimers();
    targets = [];
    render();
    world.ringsData([]);
    const best = Math.max(hiScore(), score);
    localStorage.setItem(HISCORE_KEY, String(best));
    ui.overScore.textContent = String(score);
    ui.overHi.textContent = String(best);
    ui.over.classList.add("is-on");
  }

  // Return all the way to ambient mode.
  function exitGame() {
    playing = false;
    clearTimers();
    targets = [];
    world.pointsData([]).onPointClick(null).ringsData([]);
    world.enablePointerInteraction(false);
    controls.autoRotateSpeed = 0.6;
    el.style.opacity = savedOpacity || "";
    aboutSection.classList.remove("is-playing");
    ui.over.classList.remove("is-on");
  }

  ui.play.addEventListener("click", startGame);
  ui.again.addEventListener("click", startGame);
  ui.done.addEventListener("click", exitGame);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && aboutSection.classList.contains("is-playing")) {
      exitGame();
    }
  });
}

// Build the Play button, in-game HUD, and game-over card. Uses createElement +
// textContent only (no innerHTML) and returns references the game drives.
function buildUI(section) {
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const play = make("button", "globe-play", "▶ Play");
  play.type = "button";

  // In-game HUD: score · time · high score
  const hudWrap = make("div", "game-hud");
  const score = make("span", "game-stat", "0");
  const time = make("span", "game-stat game-stat-time", `${ROUND_SECONDS}s`);
  const hi = make("span", "game-stat game-stat-hi", "0");
  hudWrap.append(
    labeled("SCORE", score),
    labeled("TIME", time),
    labeled("BEST", hi)
  );

  // Game-over card
  const over = make("div", "game-over");
  const overScore = make("span", "game-over-score", "0");
  const overHi = make("span", "game-over-hi", "0");
  const again = make("button", "game-btn game-btn-primary", "Play again");
  again.type = "button";
  const done = make("button", "game-btn", "Done");
  done.type = "button";
  over.append(
    make("p", "game-over-title", "Time!"),
    wrap("game-over-line", make("span", null, "Score "), overScore),
    wrap("game-over-line", make("span", null, "Best "), overHi),
    wrap("game-over-actions", again, done)
  );

  section.append(play, hudWrap, over);
  return { play, score, time, hi, over, overScore, overHi, again, done };

  function labeled(label, valueNode) {
    const box = make("span", "game-stat-box");
    box.append(make("span", "game-stat-label", label), valueNode);
    return box;
  }
  function wrap(className, ...kids) {
    const node = make("div", className);
    node.append(...kids);
    return node;
  }
}
