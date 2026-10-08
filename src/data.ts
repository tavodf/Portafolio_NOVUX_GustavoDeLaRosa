import { Service } from './types';

export const services: Record<Service['id'], Service> = {
  NOVUX_MARKETPULSE: {
    id: 'NOVUX_MARKETPULSE',
    categoryTitle: 'NOVUX MARKETPULSE',
    caseBadge: 'CASE-MARKETPULSE',
    technicalArgument: 'Ya tenemos el motor algorítmico desplegado; no comenzamos desde cero, solo parametrizamos su catálogo objetivo.',
    shortDescription: 'Auditoría de 15,000 SKUs con detección de variaciones de precio en tiempo récord. Sistemas autónomos de vigilancia comercial y analítica de precios para e-commerce y distribución.',
    heading: 'NOVUX MARKETPULSE // VIGILANCIA COMERCIAL & ANALÍTICA DE PRECIOS',
    description: 'Sistemas autónomos de vigilancia comercial y analítica de precios para e-commerce y distribución. Monitoreo diario de competidores, detección de quiebres de stock y reportes ejecutivos automatizados sin intervención manual.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'SOLICITAR AUDITORÍA / DEMO',
    keyServices: [
      {
        title: 'Monitoreo Continuo de Competidores',
        detail: 'Rastreo programado de más de 15,000 referencias y variaciones en marketplaces.'
      },
      {
        title: 'Detección de Quiebres y Stock Rival',
        detail: 'Alertas inmediatas ante desabastecimiento de competidores para captura de margen.'
      },
      {
        title: 'Reportes Ejecutivos & BI Automatizados',
        detail: 'Modelado analítico y consolidación de elasticidad de precios sin intervención manual.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-MARKETPULSE',
      description: 'Auditoría de 15,000 SKUs con detección de variaciones de precio en tiempo récord. Motor algorítmico parametrizado que opera 24/7 sin bloqueos.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Selenium (Stealth)', iconName: 'selenium' },
      { name: 'Pandas', iconName: 'pandas' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  },
  DATAOPS_RPA: {
    id: 'DATAOPS_RPA',
    categoryTitle: 'DATAOPS & RPA',
    caseBadge: 'CASE-GESTOR-OPS',
    technicalArgument: 'Sustituya horas-hombre de digitación manual por scripts en Python con 0% de margen de error y ejecución 24/7.',
    shortDescription: 'Arquitectura de conciliación de datos y balanceo territorial (CST Art. 23). Automatización robótica de procesos y pipelines deterministas para sustituir horas-hombre de digitación.',
    heading: 'DATAOPS & RPA // CONCILIACIÓN DE DATOS & AUTOMATIZACIÓN DETERMINISTA',
    description: 'Eliminamos el error humano y la fatiga operativa mediante scripts deterministas en Python. Diseñamos pipelines que concilian millones de registros, auditan nómina y balancean cargas territoriales con ejecución desatendida 24/7.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'SOLICITAR AUTOMATIZACIÓN',
    keyServices: [
      {
        title: 'Conciliación y Auditoría Laboral (CST Art. 23)',
        detail: 'Verificación matemática de contratos, turnos y liquidaciones con 0% margen de error.'
      },
      {
        title: 'Balanceo Territorial Automatizado',
        detail: 'Algoritmos de asignación óptima de carga operativa y recursos en campo.'
      },
      {
        title: 'Robotic Process Automation (RPA)',
        detail: 'Extracción, formateo y carga desatendida de planillas sin digitación manual.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-GESTOR-OPS',
      description: 'Arquitectura de conciliación de datos y balanceo territorial con estricto apego normativo (CST Art. 23). Automatización de flujos masivos reduciendo tiempos de horas a segundos con 0% de error.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Pandas', iconName: 'pandas' },
      { name: 'Regex', iconName: 'regex' },
      { name: 'SQL', iconName: 'database' },
    ]
  },
  WEB_DATA_HARVESTING: {
    id: 'WEB_DATA_HARVESTING',
    categoryTitle: 'WEB DATA HARVESTING',
    caseBadge: 'CASE-ARES-GRID',
    technicalArgument: 'Mostramos en vivo la evasión perimetral y la extracción en memoria continua C sin comprometer IP corporativa.',
    shortDescription: 'Ares Scraper con bypass antibot WAF (Selenium Stealth + libxml2 en C) demostrado en video y código vivo. Extracción masiva en Capa 7 sin comprometer IP corporativa.',
    heading: 'WEB DATA HARVESTING // MINERÍA L7 & EVASIÓN PERIMETRAL',
    description: 'Ingeniería de extracción masiva en Capa 7 (HTTP/HTTPS) con evasión antibot de última generación. Prescindimos de capas gráficas innecesarias para procesar el DOM en memoria C continua, entregando datos limpios y tipados directamente a su Data Lake.',
    videoSrc: '/AresGrid.mp4',
    videoDemoUrl: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'INICIAR EXTRACCIÓN',
    keyServices: [
      {
        title: 'Evasión Antibot WAF (Selenium Stealth)',
        detail: 'Bypass de perímetros Cloudflare, DataDome y reCAPTCHA con persistencia de sesión.'
      },
      {
        title: 'Parsing de Alto Rendimiento en C (libxml2)',
        detail: 'Extracción en memoria nativa con bajo consumo de RAM y mínima latencia.'
      },
      {
        title: 'Pipeline ETL & Data Lake Canónico',
        detail: 'Esquemas fuertemente tipados en Pydantic y almacenamiento estructurado.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-ARES-GRID // ARES SCRAPER',
      description: 'Ares Scraper con bypass antibot WAF (Selenium Stealth + libxml2 en C) demostrado en video y código vivo. Evasión perimetral y extracción en memoria continua C sin comprometer IP corporativa.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Selenium (Stealth)', iconName: 'selenium' },
      { name: 'libxml2 en C', iconName: 'cpu' },
      { name: 'Pandas', iconName: 'pandas' },
    ]
  },
  DATA_ANALYTICS: {
    id: 'DATA_ANALYTICS',
    categoryTitle: 'DATA ANALYTICS & INTELIGENCIA BI',
    caseBadge: 'CASE-SANTAFE-BI',
    technicalArgument: 'El cliente interactúa directamente en la web con un tablero real de escala gubernamental/empresarial.',
    shortDescription: 'Comando Central Operativo Bogotá: +131,000 interacciones, 245,000 m² recuperados y dashboard Looker Studio embebido en vivo.',
    image: 'https://lh3.googleusercontent.com/d/1y11CauG0RR2qr3UaOx3VfsAGmjeIkvzp=w1000',
    iframeSrc: 'https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    heading: 'DATA ANALYTICS & INTELIGENCIA BI // COMANDO CENTRAL OPERATIVO BOGOTÁ',
    description: 'Transformamos datos dispersos y operaciones territoriales en centros de comando analíticos de misión crítica. Conectamos bases transaccionales, aplicamos enriquecimiento geoespacial y desplegamos tableros ejecutivos interactivos en Looker Studio embebidos directamente en la web.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'EXPLORAR PROYECTO BI',
    keyServices: [
      {
        title: 'Comando Central Operativo Bogotá',
        detail: 'Trazabilidad en tiempo real de más de 131,000 registros e interacciones territoriales.'
      },
      {
        title: 'Análisis Geoespacial & Enriquecimiento GIS',
        detail: 'Normalización de direcciones, coordenadas y métricas de espacio público recuperado (245,000 m²).'
      },
      {
        title: 'Tableros Looker Studio Embebidos',
        detail: 'Dashboards interactivos embebidos en vivo con actualización continua de KPIs.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-SANTAFE-BI // COMANDO CENTRAL OPERATIVO BOGOTÁ',
      description: 'Comando Central Bogotá: +131,000 interacciones, 245,000 m² recuperados y dashboard Looker Studio embebido en vivo. Integración de ETL en Python y analítica geoespacial para la Localidad de Santa Fe.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Pandas', iconName: 'pandas' },
      { name: 'Regex / NLP', iconName: 'regex' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  },
  AI_DOCUMENT_NLP: {
    id: 'AI_DOCUMENT_NLP',
    categoryTitle: 'AI DOCUMENT & NLP',
    caseBadge: 'CASE-L7-PIPELINE',
    technicalArgument: 'Auditoría matemática de costos LLM y extracción estructurada con esquemas Pydantic inquebrantables.',
    shortDescription: 'Normalización NFKC, deduplicación MinHash/LSH y tokenizador BPE del Laboratorio L7. Control de costos en APIs de IA y extracción documental estructurada.',
    heading: 'AI DOCUMENT & NLP // INGENIERÍA DE TOKENS & MODELOS COGNITIVOS',
    description: 'Optimizamos la interacción con Modelos de Lenguaje (LLMs) gobernando la física del token. Aplicamos normalización Unicode NFKC, deduplicación probabilística MinHash/LSH y esquemas Pydantic para eliminar el impuesto lingüístico y garantizar salidas deterministas.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'AUDITAR PROYECTO IA',
    keyServices: [
      {
        title: 'Auditoría Económica de Tokenización BPE',
        detail: 'Detección de fragmentación excesiva en español y optimización de costos de inferencia.'
      },
      {
        title: 'Deduplicación MinHash / LSH',
        detail: 'Purga de textos redundantes a escala antes de alimentar la ventana de contexto.'
      },
      {
        title: 'Extracción Canónica con Pydantic',
        detail: 'Garantía de salida en JSON tipado sin alucinaciones de esquema.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-L7-PIPELINE // AUDITORÍA BPE & MINHASH',
      description: 'Normalización NFKC, deduplicación MinHash/LSH y tokenizador BPE del Laboratorio L7. Reducción de hasta un 30% en costos de API y aceleración drástica de latencia en sistemas RAG.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Pydantic v2', iconName: 'code' },
      { name: 'MinHash / LSH', iconName: 'cpu' },
      { name: 'Unicode NFKC', iconName: 'regex' },
    ]
  },
  SOFTWARE_FACTORY: {
    id: 'SOFTWARE_FACTORY',
    categoryTitle: 'SOFTWARE FACTORY',
    caseBadge: 'CASE-TACTICAL-TWIN',
    statusTag: '[ENGINE ONLINE // 60 FPS]',
    technicalArgument: 'No desarrollamos software corporativo estándar ni plantillas genéricas. Construimos plataformas de Comando y Control de grado táctico: procesamiento espacial geodésico en tiempo real, gemelos digitales en 3D acelerados por GPU y cero latencia operativa para entornos de alta exigencia.',
    shortDescription: 'Ingeniería de software a la medida para operaciones complejas de campo y misión crítica. Centro de Comando y Control (C2) con renderizado tridimensional interactivo, trazado de perímetros poligonales con cálculo dinámico de áreas y distancias geodésicas en tiempo real, despacho táctico de personal con drag-and-drop, captura estricta de incidentes con evidencia fotográfica obligatoria y auditoría integral exportable sin dependencias de terceros.',
    image: '/novux-cot-platform.png',
    videoSrc: '/AresGrid.mp4',
    videoDemoUrl: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing',
    heading: 'SOFTWARE FACTORY // NOVUX TACTICAL C2 & DIGITAL TWIN OPS',
    description: 'Ingeniería de software a la medida para operaciones complejas de campo y misión crítica. Centro de Comando y Control (C2) con renderizado tridimensional interactivo, trazado de perímetros poligonales con cálculo dinámico de áreas y distancias geodésicas en tiempo real, despacho táctico de personal con drag-and-drop, captura estricta de incidentes con evidencia fotográfica obligatoria y auditoría integral exportable sin dependencias de terceros.',
    externalLink: 'https://demo-c2.novuxops.com',
    ctaText: 'LANZAR DEMO INTERACTIVO // COT',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
    keyServices: [
      {
        title: 'WebGL 2.0 & Three.js 3D (60 FPS GPU-Accelerated)',
        detail: 'Renderizado tridimensional interactivo de precisión espacial, gemelos digitales y control orbital de cámara.'
      },
      {
        title: 'Motor Geodésico Gauss-Haversine en Tiempo Real',
        detail: 'Cálculo dinámico submétrico de distancias, polígonos perimetrales y superficies territoriales (m / m² / km²).'
      },
      {
        title: 'Despacho Táctico Drag-and-Drop & Telemetría Radar 360°',
        detail: 'Avatares 3D interactivos, asignación espacial de personal en campo y telemetría Push C2 bidireccional.'
      },
      {
        title: 'Cadena de Custodia Fotográfica & Hash Georreferenciado',
        detail: 'Captura estricta de incidentes con evidencia visual obligatoria, sellado inmutable y auditoría exportable.'
      },
      {
        title: 'Ares Scraper // Extracción Masiva & Bypass WAF',
        detail: 'Ingeniería de datos, orquestación híbrida HTTP/WebDriver, evasión perimetral de WAFs e ingesta Data Lake.'
      }
    ],
    caseStudy: {
      title: 'CASE-TACTICAL-TWIN // NOVUX TACTICAL C2 & NOVUX COT',
      description: 'Centro de Comando y Control Geodésico y Gemelo Digital 3D (WebGL 2.0 + Three.js + MapLibre GL Engine). Procesamiento espacial métrico submétrico Gauss-Haversine, telemetría radar 360°, despacho interactivo de personal y cadena de custodia fotográfica con hash georreferenciado sin dependencias de terceros, complementado con el motor de extracción Ares Scraper.'
    },
    techStack: [
      { name: 'WebGL 2.0 / Three.js', iconName: 'window' },
      { name: 'MapLibre GL Engine', iconName: 'database' },
      { name: 'WASM Geodésico', iconName: 'cpu' },
      { name: 'Gauss-Haversine Math', iconName: 'regex' },
      { name: 'React 19 / TypeScript', iconName: 'code' },
      { name: 'Ares Core (C / libxml2)', iconName: 'cpu' },
      { name: 'Selenium Stealth WAF', iconName: 'selenium' },
    ]
  },
  LABORATORIO_INVESTIGACION: {
    id: 'LABORATORIO_INVESTIGACION',
    categoryTitle: 'LABORATORIO E INVESTIGACIÓN',
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

export const serviceList = Object.values(services);

export const WHATSAPP_CORPORATE_NUMBER = '+573196300410';
export const WHATSAPP_DISPLAY_NUMBER = '+57 319 630 0410';

export const getWhatsAppUrl = (message: string) => {
  const cleanNumber = WHATSAPP_CORPORATE_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

