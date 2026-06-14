import { projects, categoryLabels } from "./projects.js";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

initHeroMap();
initProjectGrid();
initFilters();
initAboutStars();
initAboutVideo();

function initAboutVideo() {
  const video = document.querySelector(".about-bg-video");
  if (!video) return;
  // Background video speed: 1 = normal, 0.5 = half, 0.25 = quarter
  video.playbackRate = 0.5;
}

// Cities from Zoë's "Places I've lived & worked" — glow warm on the globe.
const GLOBE_PLACES = [
  { name: "Seattle, Washington", lat: 47.6062, lng: -122.3321 },
  { name: "Naples, Maine", lat: 43.9729, lng: -70.6023 },
  { name: "Los Angeles, California", lat: 34.0522, lng: -118.2437 },
  { name: "Austin, Texas", lat: 30.2672, lng: -97.7431 },
  { name: "Marble Falls, Texas", lat: 30.578, lng: -98.2728 },
  { name: "Alpine, Texas", lat: 30.3585, lng: -103.662 },
  { name: "Utrecht, Netherlands", lat: 52.0907, lng: 5.1214 },
  { name: "Wageningen, Netherlands", lat: 51.9692, lng: 5.6654 },
  { name: "Christchurch, New Zealand", lat: -43.5321, lng: 172.6362 },
];

const GLOBE_GEOJSON =
  "https://cdn.jsdelivr.net/gh/vasturiano/globe.gl@master/example/datasets/ne_110m_admin_0_countries.geojson";

initAboutGlobe();

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (err) {
    return false;
  }
}

// Interactive hex-polygon globe behind the About section. Falls back to the
// looping earth video on any failure: missing lib, no WebGL, fetch or render error.
function initAboutGlobe() {
  const el = document.getElementById("about-globe");
  const video = document.querySelector(".about-bg-video");
  if (!el) return;
  if (typeof Globe === "undefined" || !hasWebGL()) return; // video stays visible

  let world;
  const resize = () => {
    if (world) world.width(el.clientWidth).height(el.clientHeight);
  };

  try {
    world = Globe()(el)
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#3dd6c6")
      .atmosphereAltitude(0.18)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => "rgba(61, 214, 198, 0.6)")
      .pointsData(GLOBE_PLACES)
      .pointColor(() => "#f0a56e")
      .pointAltitude(0.04)
      .pointRadius(0.34)
      .ringsData(GLOBE_PLACES)
      .ringColor(() => (t) => `rgba(240, 165, 110, ${1 - t})`)
      .ringMaxRadius(3)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(1600);

    world.globeMaterial().color.set("#0e1a24");

    const controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    world.enablePointerInteraction(false);
    world.pointOfView({ lat: 20, lng: -40, altitude: 2.4 });

    resize();
    window.addEventListener("resize", resize);

    fetch(GLOBE_GEOJSON)
      .then((res) => {
        if (!res.ok) throw new Error("geojson HTTP " + res.status);
        return res.json();
      })
      .then((geo) => {
        world.hexPolygonsData(geo.features);
        // Globe is live — reveal it and drop the video fallback.
        el.classList.add("is-ready");
        if (video) video.style.display = "none";
        setupGlobeControls(world, el);
      })
      .catch((err) => {
        // Keep the video fallback; tear down the half-built globe.
        console.warn("Globe data failed, keeping video fallback:", err);
        window.removeEventListener("resize", resize);
        el.replaceChildren();
      });
  } catch (err) {
    // Any globe.gl/WebGL failure: leave the video fallback in place.
    console.warn("Globe init failed, keeping video fallback:", err);
    window.removeEventListener("resize", resize);
    el.replaceChildren();
  }
}

// Keyboard controls for the globe, active only while the About section is on
// screen (so arrows still scroll the page everywhere else).
//   ↑/↓        spin speed (down past 0 reverses)
//   ←/→        opacity
//   shift ↑/↓  globe size (shift-up = bigger)
//   shift ←/→  marker glow size
function setupGlobeControls(world, el) {
  const controls = world.controls();
  const state = {
    speed: controls.autoRotateSpeed, // 0.6
    opacity: 0.45,
    altitude: 2.4, // lower = bigger globe
    markers: 1,
  };
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  // Only capture arrows while the About section is visible.
  let aboutVisible = false;
  const about = document.getElementById("about");
  if (about && "IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        aboutVisible = entries[0].isIntersecting;
      },
      { threshold: 0.25 }
    ).observe(about);
  } else {
    aboutVisible = true;
  }

  // Transient readout pill.
  const hud = document.createElement("div");
  hud.className = "globe-hud";
  (about || el).appendChild(hud);
  let hudTimer;
  const flash = (msg) => {
    hud.textContent = msg;
    hud.classList.add("is-on");
    clearTimeout(hudTimer);
    hudTimer = setTimeout(() => hud.classList.remove("is-on"), 1300);
  };

  const ARROWS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  window.addEventListener("keydown", (e) => {
    if (!aboutVisible || !ARROWS.includes(e.key)) return;
    e.preventDefault();

    if (e.shiftKey) {
      // Shift ↑/↓ = globe size, Shift ←/→ = marker glow size.
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const dir = e.key === "ArrowUp" ? -0.2 : 0.2; // up = closer = bigger
        state.altitude = clamp(state.altitude + dir, 1.4, 4);
        world.pointOfView({ altitude: state.altitude }, 350);
        flash(`size ${Math.round(((4 - state.altitude) / (4 - 1.4)) * 100)}%`);
      } else {
        const dir = e.key === "ArrowRight" ? 0.2 : -0.2;
        state.markers = clamp(state.markers + dir, 0.2, 3);
        world.pointRadius(0.34 * state.markers).ringMaxRadius(3 * state.markers);
        flash(`markers ${state.markers.toFixed(1)}×`);
      }
      return;
    }

    // ↑/↓ = spin speed, ←/→ = opacity.
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      state.speed = clamp(state.speed + (e.key === "ArrowUp" ? 0.2 : -0.2), -4, 4);
      controls.autoRotateSpeed = state.speed;
      flash(`spin ${state.speed.toFixed(1)}`);
    } else {
      state.opacity = clamp(state.opacity + (e.key === "ArrowRight" ? 0.05 : -0.05), 0.05, 1);
      el.style.opacity = state.opacity.toFixed(2);
      flash(`opacity ${Math.round(state.opacity * 100)}%`);
    }
  });
}

// Starfield behind the globe — a static 2D canvas (works with the video
// fallback too), gently twinkled via CSS.
function initAboutStars() {
  const bg = document.querySelector(".about-bg");
  if (!bg) return;
  const canvas = document.createElement("canvas");
  canvas.className = "about-stars";
  bg.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.3 + 0.2,
    a: Math.random() * 0.5 + 0.3,
    warm: Math.random() < 0.15, // a few warm-accent stars to echo the markers
  }));

  const draw = () => {
    const w = (canvas.width = bg.clientWidth);
    const h = (canvas.height = bg.clientHeight);
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.warm
        ? `rgba(240, 165, 110, ${s.a})`
        : `rgba(220, 240, 255, ${s.a})`;
      ctx.fill();
    }
  };

  draw();
  window.addEventListener("resize", draw);
}

function initHeroMap() {
  const mapEl = document.getElementById("hero-map");
  const coordsEl = document.getElementById("map-coords");
  if (!mapEl || typeof L === "undefined") return;

  const map = L.map(mapEl, {
    scrollWheelZoom: false,
    zoomControl: true,
  }).setView([20, 0], 0.7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const places = [
    ["Seattle, Washington", 47.6062, -122.3321],
    ["Naples, Maine", 43.9729, -70.6023],
    ["Los Angeles, California", 34.0522, -118.2437],
    ["Austin, Texas", 30.2672, -97.7431],
    ["Marble Falls, Texas", 30.5780, -98.2728],
    ["Alpine, Texas", 30.3585, -103.6620],
    ["Utrecht, Netherlands", 52.0907, 5.1214],
    ["Wageningen, Netherlands", 51.9692, 5.6654],
    ["Christchurch, New Zealand", -43.5321, 172.6362]
  ];
  
  places.forEach(place => {
      L.circleMarker([place[1], place[2]], {
          radius: 2,
          fillColor: "#ffffff",
          color: "#ffffff",
          weight: 2,
          fillOpacity: 0.6
      })
      .bindTooltip(place[0])
      .addTo(map);
  });

  map.on("mousemove", (event) => {
    if (!coordsEl) return;
    const { lat, lng } = event.latlng;
    coordsEl.textContent = `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  });

  mapEl.addEventListener("mouseenter", () => map.scrollWheelZoom.enable());
  mapEl.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
}

function initProjectGrid() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((project) => renderProjectCard(project))
    .join("");
}

function renderProjectCard(project) {
  const categoryLabel = categoryLabels[project.category] ?? project.category;
  // Card thumbnail: a decorative `thumbnail` overrides the detail-page figure (`image`).
  const thumbSrc = project.thumbnail ?? project.image;

  return `
    <a
      class="project-card"
      href="project.html?id=${encodeURIComponent(project.id)}"
      data-category="${project.category}"
    >
      <div class="project-thumb">${
        thumbSrc
          ? `<img src="${thumbSrc}" alt="${project.title}" loading="lazy" />`
          : project.thumbLabel
      }</div>
      <div class="project-body">
        <div class="project-meta">
          <span class="chip">${categoryLabel}</span>
          <span class="chip chip-warm">${project.year}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <span class="project-link-hint">View case study →</span>
      </div>
    </a>
  `;
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = () => document.querySelectorAll(".project-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      buttons.forEach((btn) => btn.classList.toggle("is-active", btn === button));

      cards().forEach((card) => {
        const match =
          filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}
