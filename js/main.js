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
  }).setView([20, 0], 2);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

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

  return `
    <a
      class="project-card"
      href="project.html?id=${encodeURIComponent(project.id)}"
      data-category="${project.category}"
    >
      <div class="project-thumb">${project.thumbLabel}</div>
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
