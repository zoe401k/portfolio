# Portfolio

Visualization portfolio for GIS and remote sensing.

## What's here

A static site you can run locally and deploy anywhere (GitHub Pages, Netlify, etc.):

```
portfolio/
├── index.html          # Home — hero map, project grid, about, contact
├── project.html        # Project detail pages (?id=project-slug)
├── css/styles.css      # Layout and theme
├── js/
│   ├── projects.js     # ← Edit your projects here
│   ├── main.js         # Homepage map + filters
│   └── project-detail.js
└── assets/             # Put map screenshots and figures here
```

## Run locally

ES modules need a local server (don't open `index.html` directly from the filesystem).

**Python:**

```bash
cd portfolio
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

**Node (if you have it):**

```bash
npx serve .
```

## Customize

1. **Your name and links** — search for `Your Name`, `you@example.com`, and social URLs in `index.html` and `project.html`.
2. **Projects** — edit `js/projects.js`. Each entry drives a card on the home page and a case study at `project.html?id=<id>`.
3. **Skills & bio** — update the About section in `index.html`.
4. **Images** — add PNG/JPG exports to `assets/` and reference them in project cards (see below).

### Adding project thumbnails

Replace the placeholder thumb in `js/main.js` (`renderProjectCard`) with an image:

```html
<div class="project-thumb">
  <img src="assets/my-map.png" alt="Description of the map" />
</div>
```

Add CSS if needed:

```css
.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Project fields

| Field | Purpose |
|-------|---------|
| `id` | URL slug (`project.html?id=urban-heat-islands`) |
| `title`, `summary` | Card and header text |
| `category` | Filter: `remote-sensing`, `cartography`, `web-maps`, `analysis` |
| `tags`, `year` | Metadata chips |
| `location` | `{ lat, lng, zoom }` for the detail page map |
| `details` | Problem, approach, outcomes, tools, links |

## Deploy

**GitHub Pages:** push to `main`, enable Pages from the repo root (or `/docs` if you move files).

**Netlify / Vercel:** drag the folder or connect the repo — no build step required.

## Next steps

- Swap sample projects in `js/projects.js` for your real work
- Add map screenshots and figures under `assets/`
- Embed Mapbox or MapLibre maps on detail pages for live demos
- Optional: migrate to Next.js or Astro later if you want a build pipeline
