import { getProjectById } from "./projects.js";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");
const container = document.getElementById("project-detail");

if (!container) {
  throw new Error("Project detail container not found");
}

const project = projectId ? getProjectById(projectId) : null;

if (!project) {
  container.innerHTML = `
    <p class="not-found">Project not found. <a href="index.html#work">Return to the gallery</a>.</p>
  `;
} else {
  document.title = `${project.title} · GIS Portfolio`;
  container.innerHTML = renderProject(project);
  initProjectMap(project);
}

function renderProject(project) {
  const { details } = project;
  const links = (details.links ?? [])
    .map(
      (link) =>
        `<a class="btn btn-ghost" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
    )
    .join("");

  const outcomes = (details.outcomes ?? [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const tools = (details.tools ?? [])
    .map((tool) => `<li>${tool}</li>`)
    .join("");

  const dataSources = (details.data ?? [])
    .map((item) => `<li>${linkify(item)}</li>`)
    .join("");

  const tags = project.tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join("");

  return `
    <header class="project-header">
      <div class="project-meta">${tags}</div>
      <h1>${project.title}</h1>
      <p class="summary">${project.summary}</p>
    </header>

    <div id="project-map" aria-label="Project location map"></div>
    <p class="map-caption">Project study area · ${project.year}</p>

    <div class="project-content">
      <section>
        <h2>Problem</h2>
        <p>${details.problem}</p>
      </section>
      <section>
        <h2>Approach</h2>
        <p>${details.approach}</p>
      </section>
      ${
        outcomes
          ? `<section><h2>Outcomes</h2><ul>${outcomes}</ul></section>`
          : ""
      }
      ${
        tools
          ? `<section><h2>Tools</h2><ul>${tools}</ul></section>`
          : ""
      }
      ${
        dataSources
          ? `<section><h2>Data sources</h2><ul class="data-list">${dataSources}</ul></section>`
          : ""
      }
    </div>

    ${links ? `<div class="project-links">${links}</div>` : ""}
  `;
}

// Turn bare http(s) URLs inside a data string into clickable links,
// leaving surrounding label text (e.g. "Daily data: ") intact.
function linkify(text) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
}

function initProjectMap(project) {
  const mapEl = document.getElementById("project-map");
  if (!mapEl || typeof L === "undefined" || !project.location) return;

  const { lat, lng, zoom = 10 } = project.location;

  const map = L.map(mapEl).setView([lat, lng], zoom);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  L.circleMarker([lat, lng], {
    radius: 8,
    color: "#3dd6c6",
    fillColor: "#3dd6c6",
    fillOpacity: 0.85,
    weight: 2,
  }).addTo(map);
}
