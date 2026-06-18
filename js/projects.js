export const projects = [
  {
  
    id: "ACT",
    title: "Ground Water Abstraction Calculations in Morocco",
    summary:
      "This project calculates groundwater abstraction via remote sensing at field and aquifer scale in Morocco by combining evapotranspiration data, crop classification, and parcel-level analysis. It supports better water governance by identifying irrigation water use hotspots under increasing drought pressure.",
    category: "remotesensing",
    tags: ["groundwater", "remote sensing", "water balance"],
    year: "June, 2026",
    thumbLabel: "Groundwater abstraction map preview",
    thumbnail: "assets/img/thumb-act.jpg",
    location: { lat: 31.7917, lng: -7.0926, zoom: 6 },
    details: {
      problem:
        "Morocco is experiencing severe water stress due to prolonged droughts and rapid groundwater depletion driven by expanding agricultural irrigation. Limited data sharing and sensitive water governance issues make it difficult to accurately monitor and manage groundwater abstraction at scale.",
      approach:
        "The project integrates ESA WorldCereal crop classification, Fields of the World parcel extraction, and high-resolution evapotranspiration data to estimate field-level water use. Field survey data from RESING is used as ground truth. Water balance modelling combines ET, rainfall effectiveness, irrigation efficiency, and water allocation (groundwater and dam sources), which is then aggregated from parcel to aquifer level. IWMI tools (DIWASA and Global Hydrological Foundation Model) are evaluated for additional insight.",
      outcomes: [
        "Mapped irrigated agriculture and crop-specific groundwater use hotspots at field scale across Moroccan aquifers",
        "Built an upscaled water balance model from parcel to aquifer level to support groundwater monitoring and governance decisions",
        "Developed a prototype dashboard for visualizing agricultural water use and abstraction patterns"
      ],
      tools: [
        "ESA WorldCereal",
        "Fields of the World",
        "eLEAF evapotranspiration data",
        "QGIS / Python",
        "Tableau Public",
        "IWMI DIWASA",
        "Global Hydrological Foundation Model"
      ],
    },
  },
  {
   
    id: "IDHV",
    title: "Invasive Species Monitoring with Remote Detection and Citizen Science Validation",
    summary:
      "This project combines UAV imagery, machine learning, and citizen science to detect and monitor invasive plant species in the Groenlo (Achterhoek) region. It supports municipal biodiversity management by enabling early detection, validation, and mapping of invasive species through an interactive public application.",
    category: ["remotesensing", "databases"],
    tags: ["invasive species", "UAV", "citizen science"],
    year: "April, 2026",
    thumbLabel: "Invasive species map preview",
    thumbnail: "assets/img/thumb-idhv.jpg",
    // Live demo is a Streamlit app; the screenshots showcase it better than the link.
    gallery: [
      "assets/img/idhv-app-2.jpg",
      "assets/img/idhv-app-3.jpg",
      "assets/img/idhv-app-1.jpg",
    ],
    location: { lat: 52.0400, lng: 6.6200, zoom: 11 },
    details: {
      problem:
        "Invasive plant species in the Netherlands are increasing in distribution and ecological impact, threatening native biodiversity and increasing management costs for municipalities. In the Oost Gelre (Groenlo) region, limited monitoring capacity and expensive ground surveys make it difficult to consistently detect and track invasive species across large areas.",
      approach:
        "UAV imagery (DJI 45MP RGB) is used to create orthomosaics of the study area, followed by manual annotation of invasive and non-invasive vegetation. A Random Forest model is trained to classify invasive species presence, producing spatial prediction maps. These results are combined with citizen science inputs through a mobile application where users can upload geotagged photos for validation. The workflow integrates preprocessing (AOI clipping, orthomosaic generation), machine learning classification, and participatory validation.",
      outcomes: [
        "Generated high-resolution prediction maps of invasive plant species distribution in the Groenlo region",
        "Developed a citizen science validation workflow using geotagged photo submissions to improve model reliability",
        "Produced a geospatial decision-support tool for the Municipality of Oost Gelre to prioritize invasive species removal"
      ],
      tools: [
        "DJI UAV 45MP RGB imagery",
        "QGIS preprocessing",
        "Random Forest classifier",
        "Python (geospatial ML workflows)",
        "Agisoft Metashape for Orthomosaic ",
        "Mobile citizen science application (geotagging + validation)"
      ],
    },
  },
  {
    id: "Datamangement",
    title: "Database for Exoplanet Analysis",
    summary:
      " Data for exoplanets and their solar systems are gathered by a variety of institutions by a wide range of methods. The data is then compiled for NASA but is unorganized and hard to read. A well-functioning, readable database is necessary for proper analysis of the exoplanets to draw meaningful scientific conclusions from decades of accumulated data.",
    category: "databases",
    tags: ["Database Management", "Habitability Analysis", "SQL"],
    year: "February, 2026",
    thumbLabel: "Exoplanet database",
    thumbnail: "assets/img/thumb-datamanagement.jpg",
    image: "assets/img/exoplanet-erd.jpg",
    // No geographic location — this is a database project; the ER diagram is the figure.

    details: {
      problem:
        "NASA's exoplanet archive aggregates data from dozens of observatories and detection methods, resulting in a sprawling dataset with inconsistent formatting, redundant entries, and missing values that hinder comparative habitability analysis.",
      approach:
        "Designed a normalized relational database schema in PostgreSQL to house stellar, planetary, and observational metadata. Wrote ETL scripts in Python to clean, deduplicate, and ingest the NASA Exoplanet Archive bulk download. Constructed SQL views and queries to enable rapid filtering by habitability zone, detection method, and planetary radius class.",
      outcomes: [
        "Ingested and cleaned over 5,500 confirmed exoplanet records from the NASA Exoplanet Archive",
        "Reduced data redundancy by 40% through normalization across 6 relational tables",
        "Identified 312 potentially habitable zone candidates using parameterized SQL queries",
        "Documented schema with an entity-relationship diagram and data dictionary",
        "Delivered reproducible ETL pipeline as a commented Python script with logging",
      ],
      tools: ["PostgreSQL", "Python", "pandas", "NASA Exoplanet Archive", "pgAdmin"],
      links: [{ label: "Project report (PDF)", url: "assets/reports/exoplanet-database.pdf" }],
    },
  },
  {
    id: "STT",
    title: "Constrained Latin Hypercube Sampling for Optimal Placement of Rainfall Gauges in the Ecuadorian Amazon",
    summary:
      "Rain gauges are the most widely used instrument to quantify precipitation. Precipitation strongly influences the hydrological functioning of the Ecuadorian Amazon, yet its spatio-temporal variability remains poorly understood due to the limited number of gauges.",
    category: "spatialmodelling",
    tags: ["Latin Hypercube", "Constrained Sampling", "Principal Component Analysis"],
    year: "January, 2026",
    thumbLabel: "Rain gauge placement",
    thumbnail: "assets/img/thumb-stt.jpg",
    image: "assets/img/stt-hypercube.jpg",
    pdf: "assets/reports/rain-gauge-placement.pdf",
    pdfLabel: "Conference poster",
    location: { lat: -1.8312, lng: -78.1834, zoom: 7 },
    details: {
      problem:
        "The aim of this study is to analyze optimal rain gauge placement to increase network density. Using existing sites, environmental factors, and environmental variability, the appropriate number of additional sampling locations required to represent landscape diversity was determined, while accounting for accessibility constraints.",
      approach:
        "Conducted a principal component analysis on environmental covariates including elevation, slope, aspect, and vegetation indices derived from remote sensing data. Applied constrained Latin Hypercube Sampling (cLHS) to select new gauge locations that maximize coverage of environmental space while respecting access constraints such as road proximity and protected area boundaries.",
      outcomes: [
        "Identified 12 optimal additional gauge locations across the study catchment",
        "PCA reduced 8 environmental variables to 3 principal components explaining 84% of variance",
        "Proposed network reduces average nearest neighbor distance between gauges by 31%",
        "Accessibility constraints eliminated 18% of candidate locations from consideration",
        "Results delivered as a georeferenced point layer and accompanying site access report",
      ],
      tools: ["R", "clhs package", "QGIS", "Google Earth Engine", "Python"],
    },
  },
  {
    id: "GEOTOOLS",
    title: "Industrial Pipeline Suitability Analysis in Maas-Waal",
    summary:
      "Least-cost path modeling to identify optimal wastewater pipeline routes connecting industrial zones to a water refinement facility.",
    category: "spatialmodelling",
    tags: ["ArcGIS Pro", "Least-Cost Path", "Suitability Analysis"],
    year: "December, 2025",
    thumbLabel: "Pipeline suitability cost raster",
    thumbnail: "assets/img/thumb-geotools.jpg",
    image: "assets/img/geotools-pipeline.jpg",
    location: { lat: 51.8833, lng: 5.6167, zoom: 12 },
    details: {
      problem:
        "Water board Rivierenland required a spatial decision-support product to guide pipeline placement connecting industrial wastewater sources in Beneden-Leeuwen, Bergharen, and Deest to the water refinement facility in Druten.",
      approach:
        "Constructed a suitability cost raster by combining land use penalties, ditch network reductions, and hard exclusion zones (built-up areas and waterbodies) using ArcGIS ModelBuilder. Applied least-cost path analysis from each wastewater area to the largest refinement basin.",
      outcomes: [
        "Final suitability cost raster with values ranging from 1 (most suitable) to 100 (excluded)",
        "Least-cost pipeline routes for all three industrial source locations",
        "Identified the largest water refinement basin in Druten as the destination node",
        "Exclusion of residential blocks and open water bodies enforced via substitution value of 100",
        "Automated, reproducible ModelBuilder workflow submitted as .atbx toolbox",
      ],
      tools: ["ArcGIS Pro", "ModelBuilder", "ArcPy", "Spatial Analyst"],
    },
  },
  {
    id: "geoscripting",
    title: "Visualizing 25 Years of Land Surface Temperature in Amsterdam",
    summary:
      "Annual, monthly, and daily Land Surface Temperature statistics for Amsterdam from Satellite Data",
    category: "geovisualization",
    tags: ["Landsat", "MODIS", "LST"],
    year: "November, 2025",
    thumbLabel: "Urban Heat",
    thumbnail: "assets/img/thumb-geoscripting.jpg",
    location: { lat: 52.3676, lng: 4.9041, zoom: 10 },
    details: {
      problem:
        "Urban areas, like Amsterdam, are particularly sensitive to temperature changes due to the urban heat island effect. Understanding historical land surface temperature (LST) patterns can help identify long-term climate trends and support sustainable urban planning. Satellite remote sensing provides a valuable data source for monitoring LST over time. The MODIS (Moderate Resolution Imaging Spectroradiometer) product offers daily LST measurements, which can be aggregated to monthly and annual scales to reveal seasonal and long-term variations.",
      approach:
        "The objective of this project is to design and develop an interactive, web-based dashboard that visualizes daily, monthly, and annual LST statistics for Amsterdam over the past 25 years using MODIS satellite data. Required features: Spatial visualization of daily maximum, minimum, mean, and median temperature maps for each pixel within one year (1 km*1 km), with interactive functionality allowing users to click on a point and view its corresponding statistics. Statistical visualizations of maximum, minimum, mean, and median LST values for each pixel, aggregated monthly and annually, and socioeconomic data, such as population density, age, and income data from the CBS portal. ",
      outcomes: [
        "Daily LST imagery streamed live from Google Earth Engine (GEE)",
        "Annual and seasonal aggregates (mean, median, min, max) for 2000–2025 as multi-band GeoTIFFs",
        "District-level summaries for Amsterdam’s 110 districts with 26-year histories",
        ],
      data: [
        "Time range: 2000–present for MODIS",
        "Daily data:        https://www.earthdata.nasa.gov/data/catalog/lpcloud-mod11a1-006",
        "Monthly data:      https://www.earthdata.nasa.gov/data/catalog/lpcloud-mod11c3-006",
        "GEE daily and monthly data: https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MOD11A1#bands",
        "https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MOD21C3",
        "Spatial focus: Amsterdam city boundaries (students to clip/filter data accordingly)",
        "Socioeconomic Stats: https://www.cbs.nl/en-gb",
      ],
      tools: ["GEE", "rgee", "shiny", "leaflet", "ggplot2"],
      links: [{ label: "Project code (GitLab)", url: "https://git.wur.nl/geoscripting-2025/staff/project/Project_Starter-The_Invisible_Futuristic_Python_Beginners" }],
    },
  },
  {
    id: "GIS-Context",
    title: "Mapping Heat Inequality: Vegetation, Socioeconomics, and Urban Heat Exposure",
    summary:
      "Urban heat island effects are exacerbating the already serious heat problem and lack of vegetation is perpetuating this. Some neighborhoods, however, are greener than others. This project locates areas with low vegetation density and relates this to the average level of income.",
    category: "geovisualization",
    tags: ["Landsat", "Python", "QGIS"],
    year: "September, 2025",
    thumbLabel: "LST map preview",
    thumbnail: "assets/img/thumb-gis-context.jpg",
    location: { lat: 29.7604, lng: -95.3698, zoom: 11 },
    embedUrl: "https://storymaps.arcgis.com/stories/ce489e2e22ec4f99ad9da8d86ff3ccf0",
    details: {
      problem:
        "Houston is getting hotter. It is projected that in the next 10 years tree cover in Harris county will decrease by close to 5%, and by 2060 it is estimated to be up to 10%. Tree cover and green space are declining as they are being replaced by buildings, concrete and asphalt. This means lower instance of surfaces that absorb rain and cool surfaces. On average in the Southwest U.S, the poorest 10% of neighborhoods in an urban region were  2.2-3C hotter than the wealthiest 10% on both extreme heat days and average summer days.",
      approach: [
        "Processed Landsat 9 Collection 2 Level-2 TIRS scenes (Surface Temperature Band 10) and computed seasonal LST composites.",
        "Applied atmospheric correction and derived NDVI and heat index layers.",
        "Built a Land Surface Temperature raster from Landsat 9 (LST Band 10) using the ArcGIS Pro Raster Calculator geoprocessing tool.",
        "Applied the LST-in-Fahrenheit formula (Bonansea et al., 2024):",
        "    LST(°F) = ((\"ST_B10\" × 0.00341802) + 149.0 − 273.15) × 1.8 + 32",
        "Where the coefficients come from the scene's MTL metadata:",
        "    • ST_B10 = Surface Temperature Band 10",
        "    • TEMPERATURE_MULT_BAND_ST_B10 = 0.00341802 (multiplicative scale)",
        "    • TEMPERATURE_ADD_BAND_ST_B10 = 149.0 (additive offset)",
        "    • −273.15 converts Kelvin → Celsius; × 1.8 + 32 converts Celsius → Fahrenheit",
        "Calculated the Urban (Surface) Heat Index from the resulting LST raster to identify surface heat hotspots.",
        "Classified results into 5 natural breaks for visualization.",
      ],
      outcomes: [
        {
          title: "Memorial Village",
          items: [
            "Tree cover - 58%",
            "Average temperature - 82°F (27.8°C)",
            "Demographics - 78% white",
            "Income - >75% of households make $100,000+ a year",
            "Quantified temperature differences between parks and adjacent blocks",
            "Delivered static maps and an interactive web viewer",
          ],
        },
        {
          title: "Sharpstown",
          items: [
            "Tree Cover - 3%",
            "Average temperature - 91°F (32.8°C)",
            "Demographics - 32% of residents live in poverty",
            "Income - 64% of households make less than $45,000 a year",
          ],
        },
      ],
      tools: ["ArcGIS StoryMaps", "Landsat 9", "USGS Earth Explorer", "Leaflet"],
      links: [
        { label: "GitHub repo", url: "https://github.com/yourusername/example" },
        { label: "Open full story map ↗", url: "https://storymaps.arcgis.com/stories/ce489e2e22ec4f99ad9da8d86ff3ccf0" },
      ],
    },
  },
  {
    id: "NHSS",
    title: "Namhansanseong Fortress Still Stands: The Geography of Survival",
    summary:
      "A spatial and cartographic case study of South Korea's Namhansanseong fortress, examining how location, topography, hydrography, vegetation, and terrain combined to make one of the world's largest mountain fortresses endure centuries of sieges. The project asks how geography contributed to the longevity of the fortified city southeast of Seoul.",
    category: "geovisualization",
    tags: ["cartography", "spatial analysis", "historical GIS"],
    year: "April, 2024",
    thumbLabel: "Namhansanseong fortress map preview",
    // Photo: Republic of Korea / Korea.net (Wikimedia Commons, CC BY-SA 2.0).
    thumbnail: "assets/img/thumb-nhss.jpg",
    location: { lat: 37.4701, lng: 127.1904, zoom: 13 },
    embedUrl: "https://storymaps.arcgis.com/stories/65ea71fb93fa48d0b9ae6f501be497f5",
    details: {
      problem:
        "Namhansanseong, a UNESCO World Heritage fortress roughly 25 km southeast of Seoul, has stood intact through centuries of conflict. This project investigates the research question: how did geography contribute to the longevity of the Namhansanseong city fortress? Answering it requires untangling the interacting physical and human-geographic factors—from mountain topography and river hydrology to vegetation cover and wall geomorphology—that together formed a self-sustaining defensive system.",
      approach: [
        "Combined historical research and literature review with spatial analysis to evaluate geographic contributions to the fortress's endurance.",
        "Conducted critical analysis of historical accounts, architecture, spatial data, and peer-reviewed research.",
        "Employed cartographic analysis across topographic maps, satellite imagery, political and landmark maps, and historical maps.",
        "Built interactive express maps in ArcGIS StoryMaps to show the route from Seoul, the river/moat path along the fortress rim, aerial tree-cover extent, and the multi-layered wall and terrain.",
      ],
      outcomes: [
        "Identified location and proximity-to-capital advantages: close enough to Seoul for rapid refuge and resource flow, yet geographically isolated on a mountain (~500 m elevation) for natural fortification and surveillance.",
        "Mapped hydrography and watershed features—the river acting as moat, drinking supply, and weapon, plus more than 80 wells and 45 lotus ponds inside the walls indicating abundant groundwater.",
        "Documented vegetation and ecology defenses: dense planted pine and cypress forest slowing invaders and supplying self-sufficient fuel and timber for long sieges.",
        "Characterized terrain and defilade: three wall layers following the mountain ridge, an ~11.76 km wall enclosing ~2,120,000 m², four main gates plus 16 hidden gates, and nearly 2,000 merlons angled to the slope for short- and long-range fire.",
        "Analyzed geomorphology—lime-mortar mineralogy (quartz, mica, feldspar, clay) and strategic rock placement that resisted cannon fire and erosion—as a key factor in the wall's durability.",
      ],
      tools: [
        "ArcGIS StoryMaps",
        "Satellite and aerial imagery",
        "Topographic, historical, and political map sources",
        "Cartographic / spatial analysis",
        "Literature and historical-document review",
      ],
      links: [
        { label: "Open full story map ↗", url: "https://storymaps.arcgis.com/stories/65ea71fb93fa48d0b9ae6f501be497f5" },
      ],
    },
  },
  {
    id: "astrophysics1",
    title: "Supermassive Black Hole Effects on Galaxy Properties",
    summary:
      "Astrophysics research poster (University of Washington) on how supermassive black holes shape their host galaxies — growth, color, and star formation — using the Romulus25 cosmological simulation. The poster tells the full story.",
    category: "astrophysics",
    tags: ["astrophysics", "simulation", "data analysis"],
    year: "Undergraduate research",
    thumbLabel: "Supermassive black hole poster",
    thumbnail: "assets/img/thumb-astrophysics1.jpg",
    image: "assets/img/astrophysics1-poster.jpg",
    pdf: "assets/reports/smbh-galaxy-properties.pdf",
    pdfLabel: "Full poster (PDF)",
    // No geographic location — cosmological simulation work; the poster is the figure.
    details: {
      problem:
        "How do supermassive black holes affect the growth and shape of their host galaxies? The relationship between black hole properties and galaxy evolution is still poorly understood.",
      approach: [
        "Drew a sample of 500 galaxies from the Romulus25 cosmological simulation (a 25 Mpc box).",
        "Correlated galaxy properties with black hole properties across cosmic time, tracking color, specific star formation rate, and black hole accretion.",
      ],
      outcomes: [
        "Found that galaxies separate cleanly into red and blue populations by black hole activity, consistent with black-hole-driven quenching.",
        "Full methods, figures, and conclusions are in the poster.",
      ],
      tools: ["Romulus25 simulation", "Python", "Data analysis"],
    },
  },
  {
    id: "astrophysics2",
    title: "Galaxy Quenching and Rejuvenation",
    summary:
      "Astrophysics research poster (University of Washington) investigating what causes galaxies to stop forming stars (quenching) and what can restart it (rejuvenation), traced through N-body cosmological simulation. The poster tells the full story.",
    category: "astrophysics",
    tags: ["astrophysics", "simulation", "star formation"],
    year: "Undergraduate research",
    thumbLabel: "Galaxy quenching poster",
    thumbnail: "assets/img/thumb-astrophysics2.jpg",
    image: "assets/img/astrophysics2-poster.jpg",
    pdf: "assets/reports/galaxy-quenching-rejuvenation.pdf",
    pdfLabel: "Full poster (PDF)",
    // No geographic location — cosmological simulation work; the poster is the figure.
    details: {
      problem:
        "What causes galaxies to quench (stop forming stars and turn 'red and dead'), and what can rejuvenate star formation afterward?",
      approach: [
        "Selected the 40 most massive galaxies from an N-body cosmological simulation.",
        "Tracked each galaxy's star formation rate over time to identify when and why it dips, quenches, or rejuvenates — often via mergers and gas inflow.",
      ],
      outcomes: [
        "Documented quenching pathways (merger and stripping) and rejuvenation driven by gas intake from neighboring halos.",
        "Full case studies, figures, and conclusions are in the poster.",
      ],
      tools: ["N-body simulation", "Python", "Data analysis"],
    },
  },
];

export const categoryLabels = {
  remotesensing: "Remote sensing",
  spatialmodelling: "Spatial analysis",
  geovisualization: "Geovisualization",
  databases: "Databases",
  astrophysics: "Astrophysics",
};

export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}