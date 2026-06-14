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

  // Approach may be a single paragraph (string) or a list of steps (array).
  const approachHtml = Array.isArray(details.approach)
    ? `<ul>${details.approach.map((step) => `<li>${step}</li>`).join("")}</ul>`
    : `<p>${details.approach}</p>`;

  const outcomesHtml = renderOutcomes(details.outcomes);

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

    ${
      project.image
        ? `<figure class="project-figure">
             <img src="${project.image}" alt="${project.title}" loading="lazy" />
             <figcaption class="map-caption">${project.title} · ${project.year}</figcaption>
           </figure>`
        : project.embedUrl
        ? `<figure class="project-embed">
             <iframe
               src="${project.embedUrl}"
               title="${project.title} — interactive story map"
               loading="lazy"
               allowfullscreen
               allow="geolocation"
             ></iframe>
             <figcaption class="map-caption">Interactive story map · ${project.year}</figcaption>
           </figure>`
        : project.location
        ? `<div id="project-map" aria-label="Project location map"></div>
           <p class="map-caption">Project study area · ${project.year}</p>`
        : ""
    }

    <div class="project-content">
      <section>
        <h2>Problem</h2>
        <p>${details.problem}</p>
      </section>
      <section>
        <h2>Approach</h2>
        ${approachHtml}
      </section>
      ${outcomesHtml}
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

    ${
      project.pdf
        ? `<section class="project-pdf">
             <h2>${project.pdfLabel ?? "Poster"}</h2>
             <iframe class="pdf-embed" src="${project.pdf}" title="${project.title} — PDF" loading="lazy"></iframe>
             <a class="btn btn-ghost" href="${project.pdf}" target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
           </section>`
        : ""
    }

    ${
      project.bottomImage
        ? `<figure class="project-figure">
             <img src="${project.bottomImage}" alt="${project.title}" loading="lazy" />
             <figcaption class="map-caption">${project.title} · ${project.year}</figcaption>
           </figure>`
        : ""
    }

    ${links ? `<div class="project-links">${links}</div>` : ""}
  `;
}

// Outcomes can be plain strings or grouped objects { title, items }.
// Grouped outcomes render an unbulleted heading with bulleted points beneath
// (e.g. the GIS-Context card's "Memorial Village" / "Sharpstown" breakdown).
function renderOutcomes(outcomes = []) {
  if (!outcomes || !outcomes.length) return "";
  const grouped = outcomes.some((item) => item && typeof item === "object");
  if (!grouped) {
    const lis = outcomes.map((item) => `<li>${item}</li>`).join("");
    return `<section><h2>Outcomes</h2><ul>${lis}</ul></section>`;
  }
  const groups = outcomes
    .map((item) => {
      if (item && typeof item === "object") {
        const lis = (item.items ?? []).map((sub) => `<li>${sub}</li>`).join("");
        return `<div class="outcome-group"><h3 class="outcome-title">${item.title}</h3><ul>${lis}</ul></div>`;
      }
      return `<ul><li>${item}</li></ul>`;
    })
    .join("");
  return `<section><h2>Outcomes</h2>${groups}</section>`;
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
