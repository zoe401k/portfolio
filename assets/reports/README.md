# Project reports

Drop a project's PDF here using the **exact filename** below, and its
"report" button on the site starts working immediately — no code changes needed.
The filenames are already wired up in `js/projects.js`.

| Project (card) | Expected filename |
|----------------|-------------------|
| Visualizing 25 Years of LST in Amsterdam | `amsterdam-lst.pdf` |
| Industrial Pipeline Suitability (Maas-Waal) | `pipeline-suitability.pdf` |
| Constrained Latin Hypercube Sampling (rain gauges) | `rain-gauge-placement.pdf` |
| Creating a Database for Exoplanet Analysis | `exoplanet-database.pdf` |

Notes:
- Until a file is added, its button links to a path that returns 404. To hide a
  button instead, remove that entry from the project's `links` array in
  `js/projects.js`.
- To add a report for a different project, put the PDF here and set that
  project's link `url` to `"assets/reports/<your-filename>.pdf"`.
