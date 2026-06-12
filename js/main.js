import { projects, categoryLabels } from "./projects.js";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

initHeroMap();
initProjectGrid();
initFilters();

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
