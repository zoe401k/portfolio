/**
 * Edit this file to add your GIS projects.
 * Each project appears on the homepage and has its own detail page.
 */
export const projects = [
  {
    id: "urban-heat-islands",
    title: "Urban heat island analysis",
    summary:
      "Landsat-derived land surface temperature mapped across a metro area to identify hotspots and correlate with land cover.",
    category: "remote-sensing",
    tags: ["Landsat", "Python", "QGIS"],
    year: "2025",
    thumbLabel: "LST map preview",
    location: { lat: 40.7128, lng: -74.006, zoom: 11 },
    details: {
      problem:
        "Cities need to understand where heat stress concentrates to target green infrastructure and cooling interventions.",
      approach:
        "Processed Landsat 8/9 TIRS scenes, applied atmospheric correction, and computed seasonal LST composites. Joined results with NLCD land cover and building footprint layers.",
      outcomes: [
        "Identified persistent hot corridors aligned with impervious surfaces",
        "Quantified temperature differences between parks and adjacent blocks",
        "Delivered static maps and an interactive web viewer",
      ],
      tools: ["Google Earth Engine", "Python", "QGIS", "Leaflet"],
      links: [
        { label: "GitHub repo", url: "https://github.com/yourusername/example" },
        { label: "Live map", url: "#" },
      ],
    },
  },
  {
    id: "watershed-delineation",
    title: "Watershed delineation & flow accumulation",
    summary:
      "Hydrologic preprocessing from a 10 m DEM — fill sinks, flow direction, and catchment boundaries for a headwater basin.",
    category: "analysis",
    tags: ["Hydrology", "DEM", "ArcGIS Pro"],
    year: "2024",
    thumbLabel: "Flow accumulation",
    location: { lat: 46.8797, lng: -121.7269, zoom: 10 },
    details: {
      problem:
        "A conservation group needed catchment boundaries and stream networks to prioritize riparian restoration.",
      approach:
        "Used a high-resolution DEM with hydrologic conditioning, D8 flow routing, and stream thresholding validated against existing hydrography.",
      outcomes: [
        "Delineated nested sub-watersheds for three restoration sites",
        "Exported pour points and catchment polygons for field planning",
      ],
      tools: ["ArcGIS Pro", "WhiteboxTools", "PostGIS"],
      links: [{ label: "Project write-up", url: "#" }],
    },
  },
  {
    id: "fire-scar-mapping",
    title: "Post-fire scar mapping",
    summary:
      "Multi-temporal Sentinel-2 composites and NBR differencing to map burn severity after a wildfire event.",
    category: "remote-sensing",
    tags: ["Sentinel-2", "NBR", "Classification"],
    year: "2024",
    thumbLabel: "Burn severity classes",
    location: { lat: 39.0968, lng: -120.9497, zoom: 11 },
    details: {
      problem:
        "Land managers required a rapid burn severity product to guide erosion control and replanting.",
      approach:
        "Built cloud-free pre/post composites, computed dNBR, and classified severity using standard thresholds with local validation plots.",
      outcomes: [
        "Mapped severity classes across the fire perimeter within 72 hours",
        "Shared GeoTIFF and web preview for partner agencies",
      ],
      tools: ["Sentinel Hub", "Rasterio", "QGIS"],
      links: [{ label: "Story map", url: "#" }],
    },
  },
  {
    id: "transit-accessibility",
    title: "Transit accessibility isochrones",
    summary:
      "Network-based travel time surfaces and isochrones showing access to services from major transit hubs.",
    category: "web-maps",
    tags: ["PostGIS", "Mapbox", "GTFS"],
    year: "2025",
    thumbLabel: "Isochrone web map",
    location: { lat: 37.7749, lng: -122.4194, zoom: 12 },
    details: {
      problem:
        "A planning study needed to visualize how far residents can reach within 15, 30, and 45 minutes by transit.",
      approach:
        "Built a routable network from GTFS feeds, computed isochrones from hub nodes, and styled results in a Mapbox GL web map.",
      outcomes: [
        "Interactive map with toggles for time bands and destination types",
        "Exported PDF figures for a public meeting",
      ],
      tools: ["OpenTripPlanner", "PostGIS", "Mapbox GL JS"],
      links: [{ label: "Live demo", url: "#" }],
    },
  },
  {
    id: "historical-atlas",
    title: "Historical landscape atlas",
    summary:
      "A print-ready atlas combining hillshade, vintage boundaries, and annotated inset maps for a regional history publication.",
    category: "cartography",
    tags: ["Cartography", "InDesign", "Hillshade"],
    year: "2023",
    thumbLabel: "Atlas spread",
    location: { lat: 42.3601, lng: -71.0589, zoom: 9 },
    details: {
      problem:
        "Authors needed publication-quality maps that matched a book's visual language while staying geographically accurate.",
      approach:
        "Designed a custom basemap style, standardized typography and north arrows, and produced CMYK-ready exports at multiple scales.",
      outcomes: [
        "12 map plates across 8 chapters",
        "Consistent color palette and labeling hierarchy",
      ],
      tools: ["QGIS", "Adobe Illustrator", "InDesign"],
      links: [{ label: "Sample spread (PDF)", url: "#" }],
    },
  },
];

export const categoryLabels = {
  "remote-sensing": "Remote sensing",
  cartography: "Cartography",
  "web-maps": "Web maps",
  analysis: "Analysis",
};

export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}
