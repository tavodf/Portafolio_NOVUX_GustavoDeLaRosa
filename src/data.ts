import { Service } from './types';

export const services: Record<Service['id'], Service> = {
  SOFTWARE_FACTORY: {
    id: 'SOFTWARE_FACTORY',
    categoryTitle: 'SOFTWARE FACTORY',
    shortDescription: 'Ecosistemas digitales a la medida de tu empresa. Desarrollamos soluciones de software que automatizan, optimizan y dominan tu sector con tecnología de punta y transferencia total de derechos.',
    image: 'https://lh3.googleusercontent.com/d/1i7909uMhrHTMKnu5WlJAf_rnmVWYubzJ=w1000',
    iframeSrc: 'https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/preview',
    heading: 'SOFTWARE FACTORY',
    description: 'Ingeniería de software diseñada para escalar. Construimos aplicaciones robustas, desde la arquitectura base hasta el despliegue en la nube, optimizando cada proceso de tu negocio.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'INICIAR PROYECTO',
    caseStudy: {
      title: 'CASO DE ÉXITO: ARES GRID // MOTOR DE MINERÍA DE DATOS & EVASIÓN WAF',
      description: 'Desarrollo a medida de un ecosistema de extracción web de grado industrial. Ares Scraper opera mediante una arquitectura de evasión perimetral capaz de auditar y extraer matrices de datos en marketplaces protegidos. El sistema integra un pipeline ETL automatizado y una interfaz gráfica asíncrona de alta inmersión, garantizando la trazabilidad y persistencia de datos limpios en un Data Lake local sin comprometer el rendimiento.',
      keyServices: [
        {
          title: 'Evasión de Firewalls (WAF)',
          detail: 'Bypass inteligente de barreras antibot con persistencia de sesión.'
        },
        {
          title: 'Data Lake Automático',
          detail: 'Limpieza de precios, deduplicación de registros y normalización matemática.'
        },
        {
          title: 'UI/UX Asíncrona',
          detail: 'Interfaz inmersiva renderizada localmente, operada en hilos paralelos para retroalimentación en tiempo real.'
        }
      ]
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Selenium (Stealth)', iconName: 'selenium' },
      { name: 'PyWebView', iconName: 'pywebview' },
      { name: 'Pandas', iconName: 'pandas' },
    ]
  },
  DATA_ANALYTICS: {
    id: 'DATA_ANALYTICS',
    categoryTitle: 'DATA ANALYTICS & ARQUITECTURA BI',
    shortDescription: 'Transformamos datos dispersos y operaciones manuales en sistemas claros, ágiles y confiables. Diseñamos flujos analíticos que ordenan tu información, eliminan errores y ahorran tiempo a tu equipo, convirtiendo números complejos en decisiones seguras para hacer crecer tu negocio con total respaldo.',
    image: 'https://lh3.googleusercontent.com/d/1y11CauG0RR2qr3UaOx3VfsAGmjeIkvzp=w1000',
    iframeSrc: 'https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F',
    heading: 'DATA ANALYTICS & ARQUITECTURA BI',
    description: 'Transformamos datos dispersos y operaciones manuales en sistemas claros, ágiles y confiables. Diseñamos flujos analíticos que ordenan tu información, eliminan errores y ahorran tiempo a tu equipo, convirtiendo números complejos en decisiones seguras para hacer crecer tu negocio con total respaldo.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'INICIAR PROYECTO',
    keyServices: [
      {
        title: 'Ingeniería ETL (Python)',
        detail: 'Construcción de pipelines de datos (Extracción, Transformación y Carga) en Python.'
      },
      {
        title: 'Business Intelligence',
        detail: 'Despliegue de tableros interactivos y monitoreo de KPIs en tiempo real.'
      },
      {
        title: 'Análisis Geoespacial & NLP',
        detail: 'Extracción de coordenadas y métricas a partir de texto no estructurado.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: COMANDO CENTRAL OPERATIVO',
      description: 'Desarrollo de un pipeline ETL de extremo a extremo que transforma reportes crudos en un Comando Central Operativo mediante Python, NLP y Regex, logrando la trazabilidad de +131,000 interacciones y 245,000 m² recuperados en la Localidad de Santa Fe.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Pandas', iconName: 'pandas' },
      { name: 'Regex / NLP', iconName: 'regex' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  },
  NOVUX_MARKETPULSE: {
    id: 'NOVUX_MARKETPULSE',
    categoryTitle: 'NOVUX MARKETPULSE',
    shortDescription: 'Sistemas autónomos de vigilancia comercial y analítica de precios para e-commerce y distribución. Monitoreo diario de competidores, detección de quiebres de stock y reportes ejecutivos automatizados sin intervención manual.',
    heading: 'NOVUX MARKETPULSE // VIGILANCIA COMERCIAL & ANALÍTICA DE PRECIOS',
    description: 'Sistemas autónomos de vigilancia comercial y analítica de precios para e-commerce y distribución. Monitoreo diario de competidores, detección de quiebres de stock y reportes ejecutivos automatizados sin intervención manual.',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'SOLICITAR AUDITORÍA / DEMO',
    keyServices: [
      {
        title: 'Monitoreo Continuo de Competidores',
        detail: 'Rastreo programado de catálogos y variaciones de precio en e-commerce y marketplaces.'
      },
      {
        title: 'Detección de Quiebres y Stock Rival',
        detail: 'Alertas en tiempo real ante variaciones de catálogo y desabastecimiento de la competencia.'
      },
      {
        title: 'Reportes Ejecutivos & BI Automatizados',
        detail: 'Modelado analítico y consolidación de elasticidad de precios sin intervención manual.'
      }
    ],
    caseStudy: {
      title: 'CASO DE ÉXITO: MARKETPULSE EN RETAIL & DISTRIBUCIÓN',
      description: 'Implementación de un motor de vigilancia asíncrono para auditar más de 15,000 referencias de competidores directos, detectando oscilaciones de precios en tiempo récord y optimizando el margen comercial dinámico.'
    },
    techStack: [
      { name: 'Python', iconName: 'python' },
      { name: 'Selenium (Stealth)', iconName: 'selenium' },
      { name: 'Pandas', iconName: 'pandas' },
      { name: 'Looker Studio', iconName: 'looker' },
    ]
  }
};

// Reservado para activación futura cuando el producto esté listo
export const pendingServices: Record<string, Service> = {
  DIGITAL_MARKETING: {
    id: 'DIGITAL_MARKETING',
    categoryTitle: 'DIGITAL MARKETING',
    shortDescription: 'Estrategias B2B y captación de leads estructurados.',
    image: 'https://elements-resized.envatousercontent.com/elements-video-cover-images/files/9a3ddae4-872b-41ab-afe7-3d7ccdf80aa6/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=fc2f5b7d21af56b5ba2a51de36814d75e810561fcaec26bedddcc2973f29e97a',
    heading: 'ESTRATEGIAS B2B',
    description: 'Estrategias de posicionamiento y captación de leads B2B con estricto cumplimiento del Estatuto del Consumidor (Ley 1480 de 2011).',
    externalLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform',
    ctaText: 'INICIAR PROYECTO',
    techStack: [
      { name: 'Google Ads', iconName: 'chart' },
      { name: 'Meta Pixel', iconName: 'code' },
      { name: 'HubSpot', iconName: 'database' },
      { name: 'Analytics 4', iconName: 'looker' },
    ]
  }
};

export const serviceList = Object.values(services);
