import { Service } from './types';

export const servicesEs: Record<string, Service> = {
  'CASE-SANTAFE-BI': {
    id: 'CASE-SANTAFE-BI',
    categoryTitle: '[ SANTA FE BI ]',
    shortIdentifier: '[ SANTA FE BI ]',
    tag: '[ SANTA FE BI ]',
    caseBadge: 'CASE-SANTAFE-BI',
    statusTag: '[TABLERO EN VIVO // LOOKER STUDIO AUDITADO]',
    keyMetric: '+131,000 interacciones territoriales auditadas | 245,000 m² recuperados',
    businessProblem: 'Descontrol operativo y dispersión de datos en cientos de planillas Excel que retrasan semanas los informes y dejan a la dirección a ciegas sobre lo que ocurre en territorio.',
    businessValue: 'Consolidación de +131,000 registros en un único Centro de Mando interactivo en tiempo real, reduciendo tiempos de reportería en 95% y eliminando costos de licenciamiento por usuario.',
    targetAudience: 'Alcaldías, Secretarías de Gobierno, Operadores Logísticos y Empresas de Servicios Públicos con cuadrillas en campo.',
    metrics: [
      { label: 'INTERACCIONES AUDITADAS', value: '+131,000' },
      { label: 'ESPACIO PÚBLICO RECUPERADO', value: '245,000 m²' },
      { label: 'PRECISIÓN GEOESPACIAL', value: '100% PostGIS' },
      { label: 'LATENCIA DE CONSULTA', value: '< 250 ms' },
    ],
    technicalArgument: 'El cliente interactúa directamente con un tablero real de escala gubernamental y territorial sin intermediarios ni mockups.',
    shortDescription: 'Centro de Inteligencia de Negocios y Cuadro de Mando Operativo: consolida más de 131,000 registros territoriales en tiempo real en un dashboard ejecutivo embebido, eliminando semanas de trabajo manual.',
    heading: 'SANTA FE BI — Business Intelligence y Analítica Territorial',
    description: 'Transformación integral de datos territoriales para la Localidad de Santa Fe (Bogotá). Reemplazamos procesos manuales y planillas dispersas por un Centro de Comando Centralizado que procesa más de 131,000 registros en PostgreSQL/PostGIS y entrega cuadros de mando ejecutivos en vivo en Looker Studio para decisiones gerenciales inmediatas.',
    derivedServiceTitle: 'Business Intelligence Gubernamental, Analítica Territorial y Cuadros de Mando',
    derivedServiceDescription: 'Desplegamos centros de comando analíticos y cuadros de mando territoriales replicando esta arquitectura: ETLs automatizados, normalización geoespacial, bases de datos relacionales optimizadas y tableros interactivos para toma de decisiones ejecutivas en tiempo real.',
    derivedServices: [
      'Cuadros de Mando y Dashboards Ejecutivos (Looker Studio / D3.js)',
      'Data Warehousing Geoespacial con PostgreSQL / PostGIS',
      'ETLs Automatizados de Ingesta y Limpieza en Python Analytics',
      'Auditoría y Trazabilidad de Operaciones Territoriales Masivas'
    ],
    image: '/thumbnails/thumbnail-santafe.png',
    iframeSrc: 'https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    externalLink: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    demoUrl: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    ctaText: 'PROBAR DEMO EN VIVO ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'Comando Central Operativo Bogotá',
        detail: 'Trazabilidad en tiempo real de más de 131,000 registros territoriales normalizados.'
      },
      {
        title: 'Modelado Espacial & PostGIS',
        detail: 'Georreferenciación estricta y cubicación de 245,000 m² de espacio público recuperado.'
      },
      {
        title: 'Tableros Looker Studio Embebidos',
        detail: 'Dashboards analíticos de acceso instantáneo sin costo por asiento de usuario.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-SANTAFE-BI // COMANDO CENTRAL BOGOTÁ',
      description: 'Auditoría territorial a gran escala: ingesta masiva en Python, persistencia geodésica en PostgreSQL/PostGIS y analítica ejecutiva en Looker Studio para control institucional continuo.'
    },
    techStack: [
      { name: 'PostgreSQL / PostGIS', iconName: 'database' },
      { name: 'React', iconName: 'code' },
      { name: 'Python Analytics', iconName: 'python' },
      { name: 'D3.js', iconName: 'chart' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  },

  'CASE-ARES-GRID': {
    id: 'CASE-ARES-GRID',
    categoryTitle: '[ Novux ARES SCRAP ]',
    shortIdentifier: '[ Novux ARES SCRAP ]',
    tag: '[ Novux ARES SCRAP ]',
    caseBadge: 'CASE-ARES-GRID',
    statusTag: '[L7 PIPELINE // CONCURRENCIA ACTIVA]',
    keyMetric: 'Extracción concurrente de alta disponibilidad en memoria C con persistencia de sesión.',
    businessProblem: 'Pérdida de millones en oportunidades comerciales por no tener precios y catálogos de competidores actualizados, bloqueados continuamente por firewalls y sistemas antibot.',
    businessValue: 'Captura ininterrumpida de inteligencia de precios y mercado 24/7 con 99.98% de disponibilidad, superando bloqueos de Cloudflare y poblando automáticamente sus bases de datos.',
    targetAudience: 'E-commerce, Retailers, Distribuidores Mayoristas, Agencias de Pricing y Consultoras de Inteligencia Competitiva.',
    metrics: [
      { label: 'DISPONIBILIDAD OPERATIVA', value: '99.98%' },
      { label: 'MEMORIA DE PARSING', value: 'RAM C Nativa' },
      { label: 'CANALIZACIÓN DE DATOS', value: 'Data Lake L7' },
      { label: 'LATENCIA DE EXTRACCIÓN', value: '< 180 ms' },
    ],
    technicalArgument: 'Demostramos en vivo la extracción continua en memoria C y la canalización directa a Data Lake optimizando latencia.',
    shortDescription: 'Motor de Inteligencia de Mercado y Extracción Masiva Web: recolecta precios, inventarios y catálogos comerciales de forma continua, automatizada y de alta fidelidad.',
    heading: 'Novux ARES SCRAP — Extracción Masiva de Datos y Data Lakes',
    description: 'Infraestructura automatizada de extracción y recolección masiva de datos en la web (Web Data Harvesting Industrial). Arquitectura de alta concurrencia diseñada para recolectar información comercial crítica de mercado sin interrupciones y alimentar directamente sus sistemas de toma de decisiones.',
    derivedServiceTitle: 'Web Data Harvesting, Extracción Masiva de Datos y Data Lakes',
    derivedServiceDescription: 'Implementamos infraestructuras de minería de datos y recolección web a gran escala adaptando este motor: orquestación distribuida, extracción asíncrona concurrente, normalización en memoria y pipelines canónicos hacia su base de datos o almacenamiento en nube.',
    derivedServices: [
      'Infraestructuras de Extracción Masiva Web (Web Data Harvesting)',
      'Canalización y Extracción Distribuida de Alta Resiliencia',
      'Construcción y Alimentación Continua de Data Lakes Corporativos',
      'Pipelines ETL Asíncronos Tipados en Pydantic y Pandas Core'
    ],
    image: '/thumbnails/thumbnail-ares.png',
    videoSrc: '/AresGrid.mp4',
    videoDemoUrl: 'https://ares-scraper.vercel.app/',
    externalLink: 'https://ares-scraper.vercel.app/',
    demoUrl: 'https://ares-scraper.vercel.app/',
    ctaText: 'PROBAR DEMO EN VIVO ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'Navegación Headless Optimizada (Selenium)',
        detail: 'Automatización de navegación con alta resiliencia y persistencia de sesión.'
      },
      {
        title: 'Parsing de Alto Rendimiento en C (libxml2)',
        detail: 'Extracción en memoria nativa con bajo consumo de RAM y mínima latencia.'
      },
      {
        title: 'Pipeline ETL & Data Lake Canónico',
        detail: 'Esquemas fuertemente tipados en Pydantic y almacenamiento estructurado multiformato.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-ARES-GRID // Novux ARES SCRAP L7',
      description: 'Motor industrial de extracción de alta concurrencia verificado en producción: descarga masiva continua y alimentación directa a Data Lake.'
    },
    techStack: [
      { name: 'Python Asíncrono', iconName: 'python' },
      { name: 'Proxies Distribuidos', iconName: 'shield' },
      { name: 'Selenium Headless', iconName: 'selenium' },
      { name: 'Extracción Asíncrona', iconName: 'cpu' },
      { name: 'libxml2 en RAM', iconName: 'code' },
    ]
  },

  'CASE-COT-OPS': {
    id: 'CASE-COT-OPS',
    categoryTitle: '[ Novux COT ]',
    shortIdentifier: '[ Novux COT ]',
    tag: '[ Novux COT ]',
    caseBadge: 'CASE-COT-OPS',
    statusTag: '[ENGINE ONLINE // 60 FPS CONSTANTES]',
    keyMetric: 'Renderizado 3D a 60 FPS constantes | Precisión métrica sub-metro | Cadena de custodia con Hash georreferenciado.',
    businessProblem: 'Pérdida de control operativo de cuadrillas en campo, multas contractuales y demandas por falta de evidencia física incontestable de actividades realizadas en terreno.',
    businessValue: 'Visibilidad total 3D en tiempo real (60 FPS) de operaciones y cuadrillas con blindaje legal mediante fotos georreferenciadas con hash inmutable que impiden cualquier fraude o disputa.',
    targetAudience: 'Empresas de Seguridad Privada, Constructoras, Concesiones de Vías, Puertos, Minería y Empresas de Telecomunicaciones.',
    metrics: [
      { label: 'RENDIMIENTO DE RENDER', value: '60 FPS // GPU' },
      { label: 'PRECISIÓN ESPACIAL', value: 'Sub-métrica WGS84' },
      { label: 'CADENA DE CUSTODIA', value: 'Hash SHA-256' },
      { label: 'LATENCIA DE TELEMETRÍA', value: '< 50 ms C2' },
    ],
    technicalArgument: 'No desarrollamos software genérico ni plantillas corporativas estándar: construimos centros de comando tácticos 3D con aceleración por hardware y precisión geodésica.',
    shortDescription: 'Plataforma de Control Operativo en Territorio y Gemelos Digitales 3D: supervisión en vivo a 60 FPS de personal y activos con cálculo submétrico y cadena de custodia fotográfica blindada legalmente.',
    heading: 'Novux COT — Gemelos Digitales 3D y Comando y Control (C2)',
    description: 'Plataforma táctica de Comando y Control (C2) y Gemelos Digitales 3D para operaciones de alto riesgo en terreno. Permite a los directores de operaciones visualizar en 3D la posición exacta de cada elemento a 60 FPS, coordinar despachos en tiempo real y blindar legalmente cada intervención con fotos selladas criptográficamente.',
    derivedServiceTitle: 'Gemelos Digitales 3D, Sistemas de Comando y Control (C2) y Telemetría Táctica',
    derivedServiceDescription: 'Implementamos plataformas a medida de gemelos digitales, centros de monitoreo táctico y consolas C2 sobre esta base probada: renderizado 3D en navegador sin plugins, telemetría bidireccional en tiempo real y gobernanza espacial de flotas o personal en terreno.',
    derivedServices: [
      'Gemelos Digitales 3D Interactivos (WebGL 2.0 / Three.js acelerados por GPU)',
      'Sistemas de Comando y Control (C2) y Despacho Táctico de Personal',
      'Motores Geodésicos de Alta Precisión (Gauss-Haversine / MapLibre)',
      'Auditoría Forense de Campo con Cadena de Custodia Criptográfica'
    ],
    image: '/thumbnails/thumbnail-cot.png',
    externalLink: 'https://demo-c2.novuxops.com/',
    demoUrl: 'https://demo-c2.novuxops.com/',
    ctaText: 'PROBAR DEMO EN VIVO ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'WebGL 2.0 & Three.js 3D (60 FPS GPU)',
        detail: 'Renderizado tridimensional y gemelos digitales con control orbital e iluminación dinámica.'
      },
      {
        title: 'Motor Geodésico Gauss-Haversine',
        detail: 'Cálculo dinámico submétrico de distancias, perímetros poligonales y áreas en tiempo real.'
      },
      {
        title: 'Despacho Táctico Drag-and-Drop',
        detail: 'Telemetría radar 360°, avatares tridimensionales y asignación espacial de recursos.'
      },
      {
        title: 'Cadena de Custodia con Hash',
        detail: 'Captura estricta de incidentes georreferenciados con sellado inmutable SHA-256.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-COT-OPS // Novux COT DIGITAL TWIN',
      description: 'Centro de Comando y Control Geodésico y Gemelo Digital 3D (WebGL 2.0 + Three.js + MapLibre GL Engine). 60 FPS constantes, cálculo espacial submétrico y telemetría táctica sin dependencias propietarias.'
    },
    techStack: [
      { name: 'WebGL 2.0', iconName: 'window' },
      { name: 'Three.js 3D', iconName: 'code' },
      { name: 'MapLibre GL', iconName: 'database' },
      { name: 'Motor Gauss-Haversine', iconName: 'cpu' },
      { name: 'React 19 / TypeScript', iconName: 'code' },
    ]
  },

  'CASE-CPC-PULSE': {
    id: 'CASE-CPC-PULSE',
    categoryTitle: '[ Novux CPC ]',
    shortIdentifier: '[ Novux CPC ]',
    tag: '[ Novux CPC ]',
    caseBadge: 'CASE-CPC-PULSE',
    statusTag: '[LIVE HUD // 45/45 CURULES REAL-TIME]',
    keyMetric: '45/45 Curules monitoreadas en tiempo real | 3.86M seguidores auditados | Motor Kahn DAG y cruce de actas E-14/E-24.',
    businessProblem: 'Riesgo económico o sancionatorio por aprobación sorpresiva de proyectos de ley o normativas, sumado a opacidad en resultados electorales y desinformación en redes sociales.',
    businessValue: 'Sistema de alerta temprana y fiscalización en vivo: seguimiento de 45 curules en tiempo real, predicción de tiempos legislativos y verificación matemática contra fraude en actas electorales.',
    targetAudience: 'Firmas de Asuntos Públicos y Relaciones Corporativas, Gremios Económicos, Bancas de Inversión y Partidos Políticos.',
    metrics: [
      { label: 'CURULES MONITOREADAS', value: '45/45 Curules' },
      { label: 'AUDIENCIA AUDITADA', value: '3.86M Seguidores' },
      { label: 'TOPOLOGÍA NORMATIVA', value: 'Kahn DAG Engine' },
      { label: 'AUDITORÍA ELECTORAL', value: 'Cruce E-14 / E-24' },
    ],
    technicalArgument: 'Auditoría matemática de decisiones legislativas y electorales: transformamos opacidad parlamentaria en un grafo acíclico dirigido y un hemiciclo 3D interactivo.',
    shortDescription: 'Plataforma de Inteligencia Regulatoria y Auditoría Electoral: monitoreo segundo a segundo de 45 curules y 3.86M de ciudadanos para anticipar riesgos normativos antes de que impacten a su organización.',
    heading: 'Novux CPC — Inteligencia Política y Auditoría Regulatoria',
    description: 'Sistema integral de inteligencia política y monitoreo regulatorio. Permite a directores legales y corporativos adelantarse a decisiones gubernamentales críticas mediante el monitoreo de 45 curules en un hemiciclo 3D en vivo, análisis de 3.86M de seguidores y verificación algorítmica de actas electorales E-14 vs E-24.',
    derivedServiceTitle: 'Plataformas de Inteligencia Política, Auditoría Regulatoria y Modelos de Correlación Electoral',
    derivedServiceDescription: 'Diseñamos e implementamos sistemas de fiscalización regulatoria, monitoreo de cuerpos colegiados y auditoría electoral: motores DAG de dependencias legales, analítica de votaciones y tableros interactivos para compliance institucional y consultoras de asuntos públicos.',
    derivedServices: [
      'Visualizadores Legislativos y Hemiciclos 3D Interactivos (Three.js / React 19)',
      'Motores de Trazabilidad Regulatoria y Grafos de Dependencia (Kahn DAG)',
      'Auditoría Algorítmica y Conciliación Forense Electoral (Actas E-14 vs E-24)',
      'Sistemas de Monitoreo de Opinión y Análisis de Redes a Escala (+3.86M)'
    ],
    image: '/thumbnails/thumbnail-cpc.png',
    externalLink: 'https://novux-market-pulse.vercel.app/',
    demoUrl: 'https://novux-market-pulse.vercel.app/',
    ctaText: 'PROBAR DEMO EN VIVO ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'Hemiciclo 3D Interactivo (45/45 Curules)',
        detail: 'Telemetría de votaciones, perfiles partidistas y mapas de calor en Three.js.'
      },
      {
        title: 'Motor Topológico Kahn DAG',
        detail: 'Resolución de dependencias y tiempos de trámite de proyectos de ley sin ciclos.'
      },
      {
        title: 'Cruce Algorítmico E-14 / E-24',
        detail: 'Detección automática de discrepancias y anomalías en actas de escrutinio.'
      },
      {
        title: 'Minería Social de 3.86M Seguidores',
        detail: 'Rastreo y ponderación del impacto digital de figuras públicas en tiempo real.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-CPC-PULSE // Novux CPC POLITICAL INTELLIGENCE',
      description: 'Supervisión en tiempo real de 45 curules legislativas, correlación electoral con actas E-14 y motor de ordenación DAG para proyectos de ley con arquitectura FastAPI y React 19.'
    },
    techStack: [
      { name: 'React 19', iconName: 'code' },
      { name: 'Three.js 3D', iconName: 'window' },
      { name: 'FastAPI', iconName: 'cpu' },
      { name: 'Topología DAG Kahn', iconName: 'database' },
      { name: 'Selenium Live HUD', iconName: 'selenium' },
      { name: 'Python Analytics', iconName: 'python' },
    ]
  },

  'CASE-PCD-PRICING': {
    id: 'CASE-PCD-PRICING',
    categoryTitle: '[ Novux PCD ]',
    shortIdentifier: '[ Novux PCD ]',
    tag: '[ Novux PCD ]',
    caseBadge: 'CASE-PCD-PRICING',
    statusTag: '[MACRO TRADING // ARBITRAJE REAL-TIME]',
    keyMetric: 'Normalización métrica unitaria ($/g, $/ml, $/ud) | Auditoría multi-competidor paralela | Algoritmo de margen óptimo.',
    businessProblem: 'Pérdida de margen bruto y pérdida de Buy-Box por fijación de precios a ciegas, cambios manuales en Excel y comparaciones métricas erróneas entre presentaciones de diferente gramaje.',
    businessValue: 'Normalización matemática automática a precio base unitario con recomendación dinámica de precio óptimo y auditoría multi-e-commerce en tiempo real para liderar el mercado sin regalar margen.',
    targetAudience: 'E-commerce, Retailers, Distribuidores Masivos, Supermercados, CPG Brands y Equipos de Pricing.',
    metrics: [
      { label: 'COMPETIDORES PARALELOS', value: 'Hasta 5 Nodos' },
      { label: 'NORMALIZACIÓN MÉTRICA', value: '$/g, $/ml, $/ud' },
      { label: 'RECUPERACIÓN MARGEN', value: '+18.4% Bruto' },
      { label: 'LATENCIA DE CÁLCULO', value: '< 250ms Reactivo' },
    ],
    technicalArgument: 'Arquitectura de arbitraje financiero adaptada al retail: normalización dimensional estricta de SKU y recomendación de elasticidad de precios en tiempo real.',
    shortDescription: 'Mesa de Arbitraje de Precios y Análisis Macro de Competencia: comparación justa de productos por gramo/mililitro, monitoreo paralelo multi-tienda y optimización de márgenes.',
    heading: 'Novux PCD — Fijación Dinámica de Precios y Arbitraje',
    description: 'Motor reactivo de fijación dinámica de precios y arbitraje de mercado. Audita en paralelo hasta 5 competidores simultáneos (MercadoLibre, Éxito, Alkosto, etc.), normaliza cantidades y sugiere el precio óptimo para maximizar el margen bruto.',
    derivedServiceTitle: 'Sistemas de Pricing Dinámico, Arbitraje de Mercado y Motores de Elasticidad',
    derivedServiceDescription: 'Desarrollamos e integramos plataformas de arbitraje de precios a medida sobre esta infraestructura: conexión con Shopify/WooCommerce/SAP, alertas automáticas de guerra de precios y normalización métrica.',
    derivedServices: [
      'Normalizadores Métricos Multidimensionales ($/kg, $/ml, $/pack)',
      'Motores de Arbitraje y Recomendación de Precios en Tiempo Real',
      'Dashboards Ejecutivos de Dispersión y Buy-Box con Recharts',
      'Integración con ERPs, CRMs y Canales de Venta E-commerce'
    ],
    image: '/thumbnails/thumbnail-pcd.png',
    externalLink: 'https://market-pricing-engine-pcd-zeta.vercel.app/',
    demoUrl: 'https://market-pricing-engine-pcd-zeta.vercel.app/',
    ctaText: 'PROBAR DEMO EN VIVO ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'Normalización Métrica Automática',
        detail: 'Conversión instantánea a precio base por unidad ($/g, $/ml, $/ud) para comparaciones 100% justas.'
      },
      {
        title: 'Auditoría Multi-Competidor Paralela',
        detail: 'Rastreo simultáneo de hasta 5 competidores con detección de precios de lista y descuentos reales.'
      },
      {
        title: 'Simulador Dinámico de Elasticidad',
        detail: 'Algoritmo de sugerencia de precio óptimo para liderar la categoría sin sacrificar rentabilidad.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-PCD-PRICING // Novux PCD TRADING ENGINE',
      description: 'Plataforma reactiva de arbitraje de precios y análisis macro de competencia en React 19 y TypeScript. Normalización dimensional en tiempo real y visualización de bandas de mercado con Recharts.'
    },
    techStack: [
      { name: 'React 19', iconName: 'code' },
      { name: 'TypeScript', iconName: 'code' },
      { name: 'Vite 8', iconName: 'window' },
      { name: 'Tailwind CSS', iconName: 'window' },
      { name: 'Recharts', iconName: 'chart' },
    ]
  },
  'LABORATORIO_INVESTIGACION': {
    id: 'LABORATORIO_INVESTIGACION',
    categoryTitle: 'LABORATORIO E INVESTIGACIÓN',
    shortIdentifier: '[ R&D LAB ]',
    tag: '[ R&D LAB ]',
    isLab: true,
    shortDescription: 'Investigación técnica y desarrollo de productos y conceptos.',
    heading: 'LABORATORIO E INVESTIGACIÓN',
    description: 'Investigación técnica y desarrollo de productos y conceptos.',
    ctaText: 'EXPLORAR LABORATORIO',
    caseBadge: 'NOVUX R&D LAB',
    technicalArgument: 'Investigación técnica y desarrollo de productos y conceptos.',
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'IA & LLMs', iconName: 'cpu' },
      { name: 'C & libxml2', iconName: 'code' },
      { name: 'Algoritmos BPE', iconName: 'regex' },
    ]
  }
};

export const servicesEn: Record<string, Service> = {
  'CASE-SANTAFE-BI': {
    id: 'CASE-SANTAFE-BI',
    categoryTitle: '[ SANTA FE BI ]',
    shortIdentifier: '[ SANTA FE BI ]',
    tag: '[ SANTA FE BI ]',
    caseBadge: 'CASE-SANTAFE-BI',
    statusTag: '[LIVE DASHBOARD // AUDITED LOOKER STUDIO]',
    keyMetric: '+131,000 territorial interactions audited | 245,000 m² recovered',
    businessProblem: 'Operational disorganization and data scattered across hundreds of manual spreadsheets, delaying reports by weeks and leaving leadership blind to field ground operations.',
    businessValue: 'Consolidation of +131,000 records into a single real-time interactive Command Center, slashing reporting times by 95% and eliminating per-seat user licensing costs.',
    targetAudience: 'City Halls, Regional Governments, Logistics Operators, and Field Utility Service Providers.',
    metrics: [
      { label: 'AUDITED INTERACTIONS', value: '+131,000' },
      { label: 'PUBLIC SPACE RECOVERED', value: '245,000 m²' },
      { label: 'GEOSPATIAL ACCURACY', value: '100% PostGIS' },
      { label: 'QUERY LATENCY', value: '< 250 ms' },
    ],
    technicalArgument: 'Clients interact directly with a production-grade governmental and territorial dashboard—no mockups, zero third-party lock-in.',
    shortDescription: 'Business Intelligence & Operational Command Center: consolidates over 131,000 territorial records in real time within an embedded executive dashboard, eliminating weeks of manual reporting.',
    heading: 'SANTA FE BI — Governmental Business Intelligence & Territorial Analytics',
    description: 'Comprehensive territorial data transformation for regional operations. Replaced manual processes with a centralized Command Center processing +131,000 records in PostgreSQL/PostGIS, delivering real-time executive dashboards in Looker Studio for immediate leadership decisions.',
    derivedServiceTitle: 'Governmental Business Intelligence, Territorial Analytics & Executive Dashboards',
    derivedServiceDescription: 'We deploy custom analytics command centers and territorial dashboards replicating this architecture: automated ETLs, geospatial normalization, optimized relational databases, and interactive dashboards.',
    derivedServices: [
      'Executive Dashboards & Reporting (Looker Studio / D3.js)',
      'Geospatial Data Warehousing (PostgreSQL / PostGIS)',
      'Automated Python Analytics ETL Ingestion & Cleaning Pipelines',
      'Massive Territorial Operations Audit & Traceability'
    ],
    image: '/thumbnails/thumbnail-santafe.png',
    iframeSrc: 'https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    externalLink: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    demoUrl: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    ctaText: 'TRY LIVE DEMO ↗',
    secondaryCtaText: 'REQUEST CUSTOM DEVELOPMENT',
    keyServices: [
      {
        title: 'Central Operational Command Center',
        detail: 'Real-time traceability of more than 131,000 normalized field records.'
      },
      {
        title: 'Spatial Modeling & PostGIS',
        detail: 'Strict georeferencing and volumetric calculation of 245,000 m² of recovered public space.'
      },
      {
        title: 'Embedded Looker Studio Dashboards',
        detail: 'Zero per-seat licensing fees with high-throughput executive visual access.'
      }
    ],
    caseStudy: {
      title: 'CASE STUDY: CASE-SANTAFE-BI // CENTRAL OPERATIONAL COMMAND',
      description: 'Large-scale territorial auditing: massive Python ingestion, geodesic persistence in PostgreSQL/PostGIS, and executive analytics in Looker Studio.'
    },
    techStack: [
      { name: 'PostgreSQL / PostGIS', iconName: 'database' },
      { name: 'React', iconName: 'code' },
      { name: 'Python Analytics', iconName: 'python' },
      { name: 'D3.js', iconName: 'chart' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  },

  'CASE-ARES-GRID': {
    id: 'CASE-ARES-GRID',
    categoryTitle: '[ Novux ARES SCRAP ]',
    shortIdentifier: '[ Novux ARES SCRAP ]',
    tag: '[ Novux ARES SCRAP ]',
    caseBadge: 'CASE-ARES-GRID',
    statusTag: '[L7 PIPELINE // ACTIVE CONCURRENCY]',
    keyMetric: 'High-availability concurrent extraction in native C RAM with persistent session handling.',
    businessProblem: 'Losing millions in commercial opportunities due to unmonitored competitor prices and catalogs, continuously blocked by Cloudflare, firewalls, and anti-bot systems.',
    businessValue: 'Uninterrupted 24/7 market intelligence capture with 99.98% uptime, bypassing Cloudflare anti-bot barriers and feeding your data lakes automatically.',
    targetAudience: 'E-commerce brands, Retailers, Wholesalers, Pricing Consultancies, and Competitive Intelligence firms.',
    metrics: [
      { label: 'OPERATIONAL UPTIME', value: '99.98%' },
      { label: 'PARSING ENGINE', value: 'Native C RAM' },
      { label: 'DATA PIPELINE', value: 'L7 Data Lake' },
      { label: 'EXTRACTION LATENCY', value: '< 180 ms' },
    ],
    technicalArgument: 'Live demonstration of high-throughput extraction in native C memory and direct streaming to Data Lake optimizing latency.',
    shortDescription: 'Market Intelligence & High-Scale Web Scraping Engine: continuously extracts competitor pricing, inventories, and commercial catalogs with automated, enterprise-grade fidelity.',
    heading: 'Novux ARES SCRAP — Industrial Web Data Harvesting & Data Lakes',
    description: 'Automated industrial web data harvesting infrastructure. High-concurrency architecture engineered to gather critical market data continuously without disruption, feeding enterprise decision-making pipelines directly.',
    derivedServiceTitle: 'Industrial Web Data Harvesting, High-Scale Scraping & Enterprise Data Lakes',
    derivedServiceDescription: 'We build large-scale data harvesting and web extraction pipelines: distributed orchestration, concurrent async scraping, in-memory normalization, and canonical exports to your cloud data warehouse.',
    derivedServices: [
      'Industrial Web Data Harvesting Infrastructures',
      'High-Resilience Distributed Extraction Pipelines',
      'Continuous Feeding of Corporate Data Lakes',
      'Typed Async ETL Pipelines with Pydantic and Pandas Core'
    ],
    image: '/thumbnails/thumbnail-ares.png',
    videoSrc: '/AresGrid.mp4',
    videoDemoUrl: 'https://ares-scraper.vercel.app/',
    externalLink: 'https://ares-scraper.vercel.app/',
    demoUrl: 'https://ares-scraper.vercel.app/',
    ctaText: 'TRY LIVE DEMO ↗',
    secondaryCtaText: 'REQUEST CUSTOM DEVELOPMENT',
    keyServices: [
      {
        title: 'Optimized Headless Browsing (Selenium)',
        detail: 'Anti-detect session persistence and automated resilient navigation.'
      },
      {
        title: 'High-Performance C Parsing (libxml2)',
        detail: 'Native memory extraction with sub-millisecond overhead and minimal footprint.'
      },
      {
        title: 'ETL Pipeline & Canonical Data Lake',
        detail: 'Strongly-typed Pydantic schemas and structured multiformat storage.'
      }
    ],
    caseStudy: {
      title: 'CASE STUDY: CASE-ARES-GRID // Novux ARES SCRAP L7',
      description: 'Industrial high-concurrency extraction engine verified in production: continuous massive scraping with direct pipeline to Data Lake.'
    },
    techStack: [
      { name: 'Python Asyncio', iconName: 'python' },
      { name: 'Distributed Proxies', iconName: 'shield' },
      { name: 'Selenium Headless', iconName: 'selenium' },
      { name: 'Async Extraction', iconName: 'cpu' },
      { name: 'libxml2 in RAM', iconName: 'code' },
    ]
  },

  'CASE-COT-OPS': {
    id: 'CASE-COT-OPS',
    categoryTitle: '[ Novux COT ]',
    shortIdentifier: '[ Novux COT ]',
    tag: '[ Novux COT ]',
    caseBadge: 'CASE-COT-OPS',
    statusTag: '[ENGINE ONLINE // CONSTANT 60 FPS]',
    keyMetric: 'Constant 60 FPS 3D rendering | Sub-meter geodesic precision | Cryptographic SHA-256 chain of custody.',
    businessProblem: 'Loss of operational control over field crews, leading to contractual penalties, disputes, and lack of irrefutable evidence of on-site tasks.',
    businessValue: 'Full real-time 3D visibility (60 FPS) over field operations and crews, backed by geo-tagged photos with immutable hashes preventing fraud and disputes.',
    targetAudience: 'Private Security Companies, General Contractors, Highway Concessions, Ports, Mining, and Telecom Crews.',
    metrics: [
      { label: 'RENDER PERFORMANCE', value: '60 FPS // GPU' },
      { label: 'SPATIAL PRECISION', value: 'Sub-metric WGS84' },
      { label: 'CHAIN OF CUSTODY', value: 'SHA-256 Hash' },
      { label: 'TELEMETRY LATENCY', value: '< 50 ms C2' },
    ],
    technicalArgument: 'No generic web templates: we engineer tactical 3D command centers with hardware-accelerated WebGL and geodesic precision.',
    shortDescription: 'Territorial Operations Control & 3D Digital Twin Platform: real-time 60 FPS workforce and asset monitoring with sub-meter geodesics and legally-sealed cryptographic photo chain of custody.',
    heading: 'Novux COT — 3D Digital Twins & Command & Control (C2)',
    description: 'Tactical Command and Control (C2) and 3D Digital Twin platform for high-risk field operations. Enables operations directors to track asset positioning in 3D at 60 FPS, coordinate dispatches in real time, and seal interventions cryptographically.',
    derivedServiceTitle: '3D Digital Twins, Command & Control (C2) Systems & Tactical Telemetry',
    derivedServiceDescription: 'We deploy custom digital twin platforms, tactical monitoring centers, and C2 consoles: plugin-free browser 3D rendering, two-way real-time telemetry, and spatial governance over field fleets.',
    derivedServices: [
      'Interactive 3D Digital Twins (GPU-accelerated WebGL 2.0 / Three.js)',
      'Command & Control (C2) & Tactical Personnel Dispatch Systems',
      'High-Precision Geodesic Engines (Gauss-Haversine / MapLibre)',
      'Forensic Field Audits with Cryptographic Chain of Custody'
    ],
    image: '/thumbnails/thumbnail-cot.png',
    externalLink: 'https://demo-c2.novuxops.com/',
    demoUrl: 'https://demo-c2.novuxops.com/',
    ctaText: 'TRY LIVE DEMO ↗',
    secondaryCtaText: 'REQUEST CUSTOM DEVELOPMENT',
    keyServices: [
      {
        title: 'WebGL 2.0 & Three.js 3D (60 FPS GPU)',
        detail: '3D rendering and interactive digital twins with orbital controls and dynamic lighting.'
      },
      {
        title: 'Gauss-Haversine Geodesic Engine',
        detail: 'Real-time sub-meter dynamic calculation of distances, polygon perimeters, and areas.'
      },
      {
        title: 'Drag-and-Drop Tactical Dispatch',
        detail: '360° radar telemetry, 3D avatars, and spatial resource allocation.'
      },
      {
        title: 'Cryptographic Chain of Custody',
        detail: 'Immutable SHA-256 incident logging with verifiable geospatial integrity.'
      }
    ],
    caseStudy: {
      title: 'CASE STUDY: CASE-COT-OPS // Novux COT DIGITAL TWIN',
      description: 'Geodesic Command and Control Center with 3D Digital Twin (WebGL 2.0 + Three.js + MapLibre GL Engine). 60 FPS constant render, sub-meter spatial computation, and tactical telemetry.'
    },
    techStack: [
      { name: 'WebGL 2.0', iconName: 'window' },
      { name: 'Three.js 3D', iconName: 'code' },
      { name: 'MapLibre GL', iconName: 'database' },
      { name: 'Gauss-Haversine Engine', iconName: 'cpu' },
      { name: 'React 19 / TypeScript', iconName: 'code' },
    ]
  },

  'CASE-CPC-PULSE': {
    id: 'CASE-CPC-PULSE',
    categoryTitle: '[ Novux CPC ]',
    shortIdentifier: '[ Novux CPC ]',
    tag: '[ Novux CPC ]',
    caseBadge: 'CASE-CPC-PULSE',
    statusTag: '[LIVE HUD // 45/45 SEATS REAL-TIME]',
    keyMetric: '45/45 Legislative seats tracked in real time | 3.86M followers audited | Kahn DAG engine & ballot reconciliation.',
    businessProblem: 'Financial and regulatory risk from surprise bill approvals, combined with electoral opacity and social media disinformation.',
    businessValue: 'Early warning system and live legislative tracking: real-time monitoring of 45 seats, legislative timeline forecasting, and algorithmic reconciliation against vote-tally fraud.',
    targetAudience: 'Public Affairs Consultancies, Economic Guilds, Investment Banks, and Political Organizations.',
    metrics: [
      { label: 'SEATS MONITORED', value: '45/45 Seats' },
      { label: 'AUDITED AUDIENCE', value: '3.86M Followers' },
      { label: 'REGULATORY TOPOLOGY', value: 'Kahn DAG Engine' },
      { label: 'ELECTORAL AUDIT', value: 'E-14 / E-24 Cross' },
    ],
    technicalArgument: 'Mathematical audit of legislative votes and electoral returns: we turn parliamentary opacity into a directed acyclic graph and an interactive 3D hemicycle.',
    shortDescription: 'Regulatory Intelligence & Electoral Audit Suite: real-time monitoring of 45 legislative seats and 3.86M citizen interactions to anticipate legislative and public policy risks.',
    heading: 'Novux CPC — Political Intelligence & Regulatory Audit',
    description: 'Comprehensive political intelligence and regulatory monitoring system. Enables corporate and legal directors to anticipate policy decisions via live 3D hemicycle tracking, 3.86M follower analytics, and algorithmic ballot reconciliation.',
    derivedServiceTitle: 'Political Intelligence Platforms, Regulatory Auditing & Electoral Correlation Models',
    derivedServiceDescription: 'We design and deploy regulatory monitoring suites, parliamentary tracking engines, and electoral audits: dependency DAGs, vote analytics, and interactive dashboards for institutional compliance.',
    derivedServices: [
      'Interactive 3D Legislative Hemicycles (Three.js / React 19)',
      'Regulatory Dependency & Workflow Engines (Kahn DAG)',
      'Algorithmic Electoral Auditing & Forensic Ballot Reconciliation',
      'Large-Scale Digital Sentiment & Influence Tracking (+3.86M)'
    ],
    image: '/thumbnails/thumbnail-cpc.png',
    externalLink: 'https://novux-market-pulse.vercel.app/',
    demoUrl: 'https://novux-market-pulse.vercel.app/',
    ctaText: 'TRY LIVE DEMO ↗',
    secondaryCtaText: 'REQUEST CUSTOM DEVELOPMENT',
    keyServices: [
      {
        title: 'Interactive 3D Hemicycle (45/45 Seats)',
        detail: 'Live vote telemetry, political party profiles, and Three.js heatmaps.'
      },
      {
        title: 'Kahn DAG Topological Engine',
        detail: 'Cycle-free dependency resolution and legislative timeline estimation.'
      },
      {
        title: 'Algorithmic E-14 / E-24 Verification',
        detail: 'Automated discrepancy detection and forensic anomaly reporting on official tallies.'
      },
      {
        title: '3.86M Social Footprint Mining',
        detail: 'Real-time impact weighting and digital reach tracking of key stakeholders.'
      }
    ],
    caseStudy: {
      title: 'CASE STUDY: CASE-CPC-PULSE // Novux CPC POLITICAL INTELLIGENCE',
      description: 'Real-time oversight of legislative bodies, electoral correlation with official returns, and DAG engine for legislative bills built with FastAPI and React 19.'
    },
    techStack: [
      { name: 'React 19', iconName: 'code' },
      { name: 'Three.js 3D', iconName: 'window' },
      { name: 'FastAPI', iconName: 'cpu' },
      { name: 'Kahn DAG Engine', iconName: 'database' },
      { name: 'Selenium Live HUD', iconName: 'selenium' },
      { name: 'Python Analytics', iconName: 'python' },
    ]
  },

  'CASE-PCD-PRICING': {
    id: 'CASE-PCD-PRICING',
    categoryTitle: '[ Novux PCD ]',
    shortIdentifier: '[ Novux PCD ]',
    tag: '[ Novux PCD ]',
    caseBadge: 'CASE-PCD-PRICING',
    statusTag: '[MACRO TRADING // REAL-TIME ARBITRAGE]',
    keyMetric: 'Unit metric normalization ($/g, $/ml, $/unit) | Parallel 5-competitor audit | Optimal margin algorithm.',
    businessProblem: 'Gross margin erosion and lost Buy-Box share due to blind pricing, manual spreadsheets, and skewed comparisons across varying package sizes.',
    businessValue: 'Automatic mathematical normalization to base unit price with dynamic optimal price recommendations and multi-retailer real-time auditing to lead the market profitably.',
    targetAudience: 'E-commerce brands, Retailers, Wholesale Distributors, Supermarkets, and CPG Pricing Teams.',
    metrics: [
      { label: 'PARALLEL COMPETITORS', value: 'Up to 5 Nodes' },
      { label: 'METRIC NORMALIZATION', value: '$/g, $/ml, $/unit' },
      { label: 'MARGIN RECOVERY', value: '+18.4% Gross' },
      { label: 'CALCULATION LATENCY', value: '< 250ms Reactive' },
    ],
    technicalArgument: 'Financial arbitrage architecture adapted to retail: strict dimensional SKU normalization and dynamic real-time price elasticity recommendations.',
    shortDescription: 'Pricing Arbitrage Desk & Macro Competitive Analysis: fair unit-price comparison by gram/milliliter, parallel multi-store monitoring, and margin optimization.',
    heading: 'Novux PCD — Dynamic Pricing & Market Arbitrage',
    description: 'Reactive dynamic pricing and market arbitrage engine. Simultaneously audits up to 5 competitors, normalizes packaging quantities, and computes optimal prices to maximize gross margins.',
    derivedServiceTitle: 'Dynamic Pricing Systems, Market Arbitrage & Elasticity Engines',
    derivedServiceDescription: 'We build custom pricing arbitrage platforms on this infrastructure: seamless ERP/e-commerce integrations, price war alerts, and unit-level normalization.',
    derivedServices: [
      'Multidimensional Metric Normalizers ($/kg, $/ml, $/pack)',
      'Real-Time Arbitrage & Price Recommendation Engines',
      'Executive Price-Dispersion & Buy-Box Dashboards with Recharts',
      'Direct ERP, CRM, and E-commerce Channel Integrations'
    ],
    image: '/thumbnails/thumbnail-pcd.png',
    externalLink: 'https://market-pricing-engine-pcd-zeta.vercel.app/',
    demoUrl: 'https://market-pricing-engine-pcd-zeta.vercel.app/',
    ctaText: 'TRY LIVE DEMO ↗',
    secondaryCtaText: 'REQUEST CUSTOM DEVELOPMENT',
    keyServices: [
      {
        title: 'Automatic Unit Normalization',
        detail: 'Instant conversion to base price per unit ($/g, $/ml, $/item) for 100% fair comparisons.'
      },
      {
        title: 'Parallel Multi-Competitor Audit',
        detail: 'Simultaneous tracking of 5 retailers with detection of listed prices and real promos.'
      },
      {
        title: 'Dynamic Elasticity Simulator',
        detail: 'Algorithmic optimal pricing recommendations to lead categories without sacrificing profit.'
      }
    ],
    caseStudy: {
      title: 'CASE STUDY: CASE-PCD-PRICING // Novux PCD TRADING ENGINE',
      description: 'Reactive pricing arbitrage and macro competitive analysis platform in React 19 and TypeScript. Real-time dimensional normalization and market band visualization with Recharts.'
    },
    techStack: [
      { name: 'React 19', iconName: 'code' },
      { name: 'TypeScript', iconName: 'code' },
      { name: 'Vite 8', iconName: 'window' },
      { name: 'Tailwind CSS', iconName: 'window' },
      { name: 'Recharts', iconName: 'chart' },
    ]
  },

  'LABORATORIO_INVESTIGACION': {
    id: 'LABORATORIO_INVESTIGACION',
    categoryTitle: 'RESEARCH & DEVELOPMENT LAB',
    shortIdentifier: '[ R&D LAB ]',
    tag: '[ R&D LAB ]',
    isLab: true,
    shortDescription: 'Applied technical research, product engineering, and conceptual development.',
    heading: 'RESEARCH & DEVELOPMENT LAB',
    description: 'Applied technical research, product engineering, and conceptual development.',
    ctaText: 'EXPLORE LAB',
    caseBadge: 'NOVUX R&D LAB',
    technicalArgument: 'Applied technical research, product engineering, and conceptual development.',
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'AI & LLMs', iconName: 'cpu' },
      { name: 'C & libxml2', iconName: 'code' },
      { name: 'BPE Algorithms', iconName: 'regex' },
    ]
  }
};

// Aliases for backwards compatibility with any legacy routes or components
servicesEs['SOFTWARE_FACTORY'] = servicesEs['CASE-COT-OPS'];
servicesEs['DATA_ANALYTICS'] = servicesEs['CASE-SANTAFE-BI'];
servicesEs['WEB_DATA_HARVESTING'] = servicesEs['CASE-ARES-GRID'];
servicesEs['NOVUX_MARKETPULSE'] = servicesEs['CASE-CPC-PULSE'];
servicesEs['DATAOPS_RPA'] = servicesEs['CASE-SANTAFE-BI'];
servicesEs['AI_DOCUMENT_NLP'] = servicesEs['CASE-CPC-PULSE'];

servicesEn['SOFTWARE_FACTORY'] = servicesEn['CASE-COT-OPS'];
servicesEn['DATA_ANALYTICS'] = servicesEn['CASE-SANTAFE-BI'];
servicesEn['WEB_DATA_HARVESTING'] = servicesEn['CASE-ARES-GRID'];
servicesEn['NOVUX_MARKETPULSE'] = servicesEn['CASE-CPC-PULSE'];
servicesEn['DATAOPS_RPA'] = servicesEn['CASE-SANTAFE-BI'];
servicesEn['AI_DOCUMENT_NLP'] = servicesEn['CASE-CPC-PULSE'];

export const getLocalizedServices = (lang: 'es' | 'en' = 'es'): Record<string, Service> => {
  return lang === 'en' ? servicesEn : servicesEs;
};

export const getLocalizedServiceList = (lang: 'es' | 'en' = 'es'): Service[] => {
  const current = getLocalizedServices(lang);
  return [
    current['CASE-SANTAFE-BI'],
    current['CASE-ARES-GRID'],
    current['CASE-COT-OPS'],
    current['CASE-CPC-PULSE'],
    current['CASE-PCD-PRICING'],
    current['LABORATORIO_INVESTIGACION']
  ];
};

// Default exports for backward compatibility
export const services = servicesEs;
export const serviceList = [
  servicesEs['CASE-SANTAFE-BI'],
  servicesEs['CASE-ARES-GRID'],
  servicesEs['CASE-COT-OPS'],
  servicesEs['CASE-CPC-PULSE'],
  servicesEs['CASE-PCD-PRICING'],
  servicesEs['LABORATORIO_INVESTIGACION']
];

export const WHATSAPP_CORPORATE_NUMBER = '+573196300410';
export const WHATSAPP_DISPLAY_NUMBER = '+57 319 630 0410';

export const getWhatsAppUrl = (message: string) => {
  const cleanNumber = WHATSAPP_CORPORATE_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
