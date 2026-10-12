import { Service } from './types';

export const services: Record<string, Service> = {
  'CASE-SANTAFE-BI': {
    id: 'CASE-SANTAFE-BI',
    categoryTitle: '[ SANTA FE BI ]',
    shortIdentifier: '[ SANTA FE BI ]',
    tag: '[ SANTA FE BI ]',
    caseBadge: 'CASE-SANTAFE-BI',
    statusTag: '[TABLERO EN VIVO // LOOKER STUDIO AUDITADO]',
    keyMetric: '+131,000 interacciones territoriales auditadas | 245,000 m² recuperados',
    metrics: [
      { label: 'INTERACCIONES AUDITADAS', value: '+131,000' },
      { label: 'ESPACIO PÚBLICO RECUPERADO', value: '245,000 m²' },
      { label: 'PRECISIÓN GEOESPACIAL', value: '100% PostGIS' },
      { label: 'LATENCIA DE CONSULTA', value: '< 250 ms' },
    ],
    technicalArgument: 'El cliente interactúa directamente con un tablero real de escala gubernamental y territorial sin intermediarios ni mockups.',
    shortDescription: 'Comando Central Operativo Bogotá: +131,000 interacciones territoriales auditadas, 245,000 m² recuperados y dashboard Looker Studio embebido en vivo con persistencia en PostgreSQL/PostGIS.',
    heading: 'CASE-SANTAFE-BI // COMANDO CENTRAL OPERATIVO BOGOTÁ',
    description: 'Ingeniería de datos geoespaciales y Business Intelligence gubernamental para la Localidad de Santa Fe (Bogotá). Resolvemos la dispersión de datos operativos de campo consolidando más de 131,000 registros e interacciones en PostgreSQL/PostGIS con pipelines analíticos en Python y cuadros de mando ejecutivos en Looker Studio embebidos directamente en la web.',
    derivedServiceTitle: 'Business Intelligence Gubernamental, Analítica Territorial y Cuadros de Mando',
    derivedServiceDescription: 'Desplegamos centros de comando analíticos y cuadros de mando territoriales replicando esta arquitectura: ETLs automatizados, normalización geoespacial, bases de datos relacionales optimizadas y tableros interactivos para toma de decisiones ejecutivas en tiempo real.',
    derivedServices: [
      'Cuadros de Mando y Dashboards Ejecutivos (Looker Studio / D3.js)',
      'Data Warehousing Geoespacial con PostgreSQL / PostGIS',
      'ETLs Automatizados de Ingesta y Limpieza en Python Analytics',
      'Auditoría y Trazabilidad de Operaciones Territoriales Masivas'
    ],
    image: 'https://lh3.googleusercontent.com/d/1y11CauG0RR2qr3UaOx3VfsAGmjeIkvzp=w1000',
    iframeSrc: 'https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    externalLink: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    demoUrl: 'https://lookerstudio.google.com/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    ctaText: 'LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗',
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
    categoryTitle: '[ ARES SCRAPER ]',
    shortIdentifier: '[ ARES SCRAPER ]',
    tag: '[ ARES SCRAPER ]',
    caseBadge: 'CASE-ARES-GRID',
    statusTag: '[L7 PIPELINE // WAF BYPASS ACTIVE]',
    keyMetric: 'Extracción concurrente de alta disponibilidad en memoria C sin bloqueos perimetrales.',
    metrics: [
      { label: 'DISPONIBILIDAD PERIMETRAL', value: '99.98%' },
      { label: 'MEMORIA DE PARSING', value: 'RAM C Nativa' },
      { label: 'BYPASS DE PERÍMETROS', value: 'Cloudflare / WAF' },
      { label: 'LATENCIA DE EXTRACCIÓN', value: '< 180 ms' },
    ],
    technicalArgument: 'Demostramos en vivo la evasión perimetral de WAFs y la extracción en memoria continua C sin comprometer la IP corporativa.',
    shortDescription: 'Motor de Extracción L7 y Evasión WAF (Ares Scraper): bypass de Cloudflare/DataDome con Selenium Stealth, parsing ultrarrápido en memoria C con libxml2 y entrega canónica a Data Lake.',
    heading: 'CASE-ARES-GRID // MOTOR DE EXTRACCIÓN L7 & EVASIÓN WAF (ARES SCRAPER)',
    description: 'Ingeniería de extracción masiva en Capa 7 (HTTP/HTTPS) con evasión antibot de última generación. Prescindimos de capas gráficas innecesarias para procesar el DOM en memoria C continua, neutralizando bloqueos de Cloudflare, Akamai y DataDome para poblar Data Lakes corporativos con esquemas fuertemente tipados.',
    derivedServiceTitle: 'Web Data Harvesting, Extracción Masiva de Datos y Data Lakes',
    derivedServiceDescription: 'Implementamos infraestructuras de minería de datos y recolección web a gran escala adaptando este motor: orquestación de proxies residenciales rotativos, evasión de barreras antibot, extracción asíncrona concurrente y pipelines canónicos hacia su base de datos o almacenamiento en nube.',
    derivedServices: [
      'Infraestructuras de Extracción Masiva Web (Web Data Harvesting)',
      'Bypass Avanzado de Firewalls de Aplicación Web (WAF & Antibot)',
      'Construcción y Alimentación Continua de Data Lakes Corporativos',
      'Pipelines ETL Asíncronos Tipados en Pydantic y Pandas Core'
    ],
    videoSrc: '/AresGrid.mp4',
    videoDemoUrl: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing',
    externalLink: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing',
    demoUrl: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing',
    ctaText: 'LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗',
    secondaryCtaText: 'SOLICITAR DESARROLLO A MEDIDA',
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
        detail: 'Esquemas fuertemente tipados en Pydantic y almacenamiento estructurado multiformato.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: CASE-ARES-GRID // ARES SCRAPER L7',
      description: 'Motor industrial de extracción de alta concurrencia con evasión WAF verificada en video y código fuente: 0 bloqueos perimetrales y descarga masiva directa a Data Lake.'
    },
    techStack: [
      { name: 'Python Asíncrono', iconName: 'python' },
      { name: 'Proxies Distribuidos', iconName: 'shield' },
      { name: 'Selenium Headless', iconName: 'selenium' },
      { name: 'Cloudflare Bypass', iconName: 'cpu' },
      { name: 'libxml2 en RAM', iconName: 'code' },
    ]
  },

  'CASE-COT-OPS': {
    id: 'CASE-COT-OPS',
    categoryTitle: '[ NOVUX COT ]',
    shortIdentifier: '[ NOVUX COT ]',
    tag: '[ NOVUX COT ]',
    caseBadge: 'CASE-COT-OPS',
    statusTag: '[ENGINE ONLINE // 60 FPS CONSTANTES]',
    keyMetric: 'Renderizado 3D a 60 FPS constantes | Precisión métrica sub-metro | Cadena de custodia con Hash georreferenciado.',
    metrics: [
      { label: 'RENDIMIENTO DE RENDER', value: '60 FPS // GPU' },
      { label: 'PRECISIÓN ESPACIAL', value: 'Sub-métrica WGS84' },
      { label: 'CADENA DE CUSTODIA', value: 'Hash SHA-256' },
      { label: 'LATENCIA DE TELEMETRÍA', value: '< 50 ms C2' },
    ],
    technicalArgument: 'No desarrollamos software genérico ni plantillas corporativas estándar: construimos centros de comando tácticos 3D con aceleración por hardware y precisión geodésica.',
    shortDescription: 'Control Operativo en Territorio (NOVUX COT // Digital Twin Ops): gemelos digitales 3D en WebGL 2.0 / Three.js a 60 FPS constantes, cálculo geodésico Gauss-Haversine submétrico y cadena de custodia fotográfica con hash.',
    heading: 'CASE-COT-OPS // CONTROL OPERATIVO EN TERRITORIO (NOVUX COT // DIGITAL TWIN OPS)',
    description: 'Plataforma táctica de Comando y Control (C2) y Gemelos Digitales 3D para operaciones críticas en terreno. Permite renderizado 3D interactivo a 60 FPS constantes, delimitación perimetral con cálculo geodésico submétrico Gauss-Haversine en tiempo real, despacho táctico drag-and-drop y cadena de custodia inmutable con hash SHA-256 georreferenciado.',
    derivedServiceTitle: 'Gemelos Digitales 3D, Sistemas de Comando y Control (C2) y Telemetría Táctica',
    derivedServiceDescription: 'Implementamos plataformas a medida de gemelos digitales, centros de monitoreo táctico y consolas C2 sobre esta base probada: renderizado 3D en navegador sin plugins, telemetría bidireccional en tiempo real y gobernanza espacial de flotas o personal en terreno.',
    derivedServices: [
      'Gemelos Digitales 3D Interactivos (WebGL 2.0 / Three.js acelerados por GPU)',
      'Sistemas de Comando y Control (C2) y Despacho Táctico de Personal',
      'Motores Geodésicos de Alta Precisión (Gauss-Haversine / MapLibre)',
      'Auditoría Forense de Campo con Cadena de Custodia Criptográfica'
    ],
    image: '/novux-cot-platform.png',
    externalLink: 'https://demo-c2.novuxops.com',
    demoUrl: 'https://demo-c2.novuxops.com',
    ctaText: 'LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗',
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
      title: 'CASO DE ÉXITO: CASE-COT-OPS // NOVUX COT DIGITAL TWIN',
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
    categoryTitle: '[ CPC PULSE ]',
    shortIdentifier: '[ CPC PULSE ]',
    tag: '[ CPC PULSE ]',
    caseBadge: 'CASE-CPC-PULSE',
    statusTag: '[LIVE HUD // 45/45 CURULES REAL-TIME]',
    keyMetric: '45/45 Curules monitoreadas en tiempo real | 3.86M seguidores auditados | Motor Kahn DAG y cruce de actas E-14/E-24.',
    metrics: [
      { label: 'CURULES MONITOREADAS', value: '45/45 Curules' },
      { label: 'AUDIENCIA AUDITADA', value: '3.86M Seguidores' },
      { label: 'TOPOLOGÍA NORMATIVA', value: 'Kahn DAG Engine' },
      { label: 'AUDITORÍA ELECTORAL', value: 'Cruce E-14 / E-24' },
    ],
    technicalArgument: 'Auditoría matemática de decisiones legislativas y electorales: transformamos opacidad parlamentaria en un grafo acíclico dirigido y un hemiciclo 3D interactivo.',
    shortDescription: 'Control Político Colombiano (Electoral Cube & Hemiciclo 3D): 45/45 Curules monitoreadas en tiempo real, 3.86M seguidores auditados, motor Kahn DAG y cruce de actas E-14/E-24.',
    heading: 'CASE-CPC-PULSE // CONTROL POLÍTICO COLOMBIANO & ELECTORAL CUBE',
    description: 'Plataforma de inteligencia política, auditoría regulatoria y correlación electoral. Integra la visualización tridimensional del Hemiciclo Legislativo (45 curules con telemetría en vivo), resolución de dependencias normativas mediante ordenamiento topológico DAG de Kahn, cruce algorítmico de actas E-14 frente a E-24 y HUD en vivo impulsado por FastAPI y Selenium.',
    derivedServiceTitle: 'Plataformas de Inteligencia Política, Auditoría Regulatoria y Modelos de Correlación Electoral',
    derivedServiceDescription: 'Diseñamos e implementamos sistemas de fiscalización regulatoria, monitoreo de cuerpos colegiados y auditoría electoral: motores DAG de dependencias legales, analítica de votaciones y tableros interactivos para compliance institucional y consultoras de asuntos públicos.',
    derivedServices: [
      'Visualizadores Legislativos y Hemiciclos 3D Interactivos (Three.js / React 19)',
      'Motores de Trazabilidad Regulatoria y Grafos de Dependencia (Kahn DAG)',
      'Auditoría Algorítmica y Conciliación Forense Electoral (Actas E-14 vs E-24)',
      'Sistemas de Monitoreo de Opinión y Análisis de Redes a Escala (+3.86M)'
    ],
    image: '/novux-cop-platform.png',
    externalLink: '/novux-cop-platform.png',
    demoUrl: '/novux-cop-platform.png',
    ctaText: 'LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗',
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
      title: 'CASO DE ÉXITO: CASE-CPC-PULSE // ELECTORAL CUBE & HEMICICLO 3D',
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

// Aliases for backwards compatibility with any legacy routes or components
services['SOFTWARE_FACTORY'] = services['CASE-COT-OPS'];
services['DATA_ANALYTICS'] = services['CASE-SANTAFE-BI'];
services['WEB_DATA_HARVESTING'] = services['CASE-ARES-GRID'];
services['NOVUX_MARKETPULSE'] = services['CASE-ARES-GRID'];
services['DATAOPS_RPA'] = services['CASE-SANTAFE-BI'];
services['AI_DOCUMENT_NLP'] = services['CASE-CPC-PULSE'];

export const serviceList: Service[] = [
  services['CASE-SANTAFE-BI'],
  services['CASE-ARES-GRID'],
  services['CASE-COT-OPS'],
  services['CASE-CPC-PULSE'],
  services['LABORATORIO_INVESTIGACION']
];

export const WHATSAPP_CORPORATE_NUMBER = '+573196300410';
export const WHATSAPP_DISPLAY_NUMBER = '+57 319 630 0410';

export const getWhatsAppUrl = (message: string) => {
  const cleanNumber = WHATSAPP_CORPORATE_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
