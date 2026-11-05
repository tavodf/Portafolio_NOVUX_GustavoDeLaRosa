export interface MasterPillar {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  metrics: string;
  description: string;
  bullets: string[];
}

export interface MasterExperienceRole {
  role: string;
  period: string;
  highlights: string[];
}

export interface MasterExperienceEntity {
  id: string;
  organization: string;
  location: string;
  badge: string;
  color: string;
  roles: MasterExperienceRole[];
  cpsContracts?: {
    code: string;
    period: string;
    role: string;
    impact: string;
    tag: string;
  }[];
}

export interface MasterCertificationItem {
  code: string;
  name: string;
  hours?: number;
  hoursDisplay?: string;
  issuer: string;
  category: 'LEGAL' | 'DATA' | 'DEV' | 'AGILE' | 'OPER' | 'MKT' | 'FOTO_ACAD';
  categoryLabel: string;
  categoryColor: string;
  gradeOrDetail?: string;
  validationUrl?: string;
}

export interface SpecializedCvProfile {
  id: string;
  number: number;
  shortTag: string;
  titleRole: string;
  targetRole: string;
  primaryColor: string;
  summary: string;
  docxFile: string;
  docxDownloadName: string;
  mdFile: string;
  mdDownloadName: string;
  experience: {
    company: string;
    role: string;
    dates: string;
    bullets: { prefix: string; text: string }[];
  }[];
  projects: {
    name: string;
    stack: string;
    desc: string;
  }[];
  skills: {
    category: string;
    items: string;
  }[];
}

export const MASTER_PROFILE_DATA = {
  name: 'GUSTAVO ALBERTO DE LA ROSA FLÓREZ',
  headline: 'Coordinador de Operaciones · Especialista en Automatización & Datos · Desarrollador Python',
  location: 'Bogotá D.C., Colombia',
  portfolioUrl: 'https://www.novuxops.com/',
  portfolioDisplay: 'novuxops.com',
  email: 'Gustavodlr53@gmail.com',
  phone: '+57 319 6300410',
  phoneClean: '573196300410',
  github: 'github.com/tavodf',
  githubUrl: 'https://github.com/tavodf',
  linkedin: 'linkedin.com/in/tavodelarosaf',
  linkedinUrl: 'https://www.linkedin.com/in/tavodelarosaf',

  profileSummary: `Profesional multidisciplinario con 2 años de trayectoria consolidada (1 año y 11 meses a nivel operativo) integrando tres pilares estratégicos: Liderazgo y Coordinación de Operaciones Críticas en campo, Ingeniería de Software & Automatización de Procesos (desarrollo backend en Python, FastAPI, Web Scraping y pipelines de datos masivos) y Resolución de Conflictos, Gobernanza & Estrategia Comercial. Creador de soluciones tecnológicas aplicadas que transforman flujos caóticos y tareas manuales en sistemas automatizados y medibles, reduciendo en más de un 70% los tiempos operativos de consolidación institucional. Con un historial de formación continua de más de 920 horas certificadas por IBM, Google, Oracle/Alura, MinTIC, Avianca Express y la Cámara de Comercio de Bogotá, respaldo mi trabajo mediante portafolio técnico en vivo (novuxops.com) y disciplina verificada bajo metodologías ágiles.`,

  kpiStats: [
    { label: 'TRAYECTORIA', value: '1 AÑO 11 MESES', detail: 'A Nivel Operativo (2 Años)', color: '#00F0FF' },
    { label: 'FORMACIÓN CERTIFICADA', value: '+920 HORAS', detail: 'IBM, Google, CCB, MinTIC', color: '#a855f7' },
    { label: 'LIDERAZGO EN CAMPO', value: '60 GESTORES', detail: 'UPZ 91, 92, 93 (>1.2M pob.)', color: '#FFE066' },
    { label: 'DATOS PROCESADOS', value: '+131K REG.', detail: 'Pipelines Python & PostGIS', color: '#38BDF8' },
    { label: 'ESPACIO AUDITADO', value: '245.000 m²', detail: 'Recuperación territorial', color: '#10B981' },
    { label: 'EFICIENCIA OPERATIVA', value: '>70%', detail: 'Reducción tiempos de reporte', color: '#34D399' },
    { label: 'SEGURIDAD SMS / AVSEC', value: '100.00%', detail: 'Estándar Aeronáutico Avianca', color: '#F59E0B' },
  ],

  pillars: [
    {
      id: 'OPERATIONS',
      title: 'Liderazgo & Coordinación en Campo',
      subtitle: 'Operaciones Críticas, Inspección (IVC) y Convivencia',
      badge: 'PILAR 01',
      color: '#00F0FF',
      metrics: '60 Gestores Coordinados · UPZ 91, 92, 93',
      description: 'Capacidad demostrada en conducción táctica de equipos humanos en territorio de alta complejidad (área de más de 1.2M de población flotante diaria).',
      bullets: [
        'Inspección, Vigilancia y Control (IVC) de espacio público y orden urbano.',
        'Mediación comunitaria preventiva y preservación de la convivencia.',
        'Articulación interinstitucional con entidades distritales y fuerza pública.',
        'Gestión documental pública bajo el marco MIPG y actas de supervisión.'
      ]
    },
    {
      id: 'DATA_SOFTWARE',
      title: 'Ingeniería de Software & Automatización',
      subtitle: 'Python Backend, Web Scraping y Pipelines ETL',
      badge: 'PILAR 02',
      color: '#FFE066',
      metrics: '+131.000 Registros · >70% Ahorro de Tiempo',
      description: 'Construcción de motores de código limpios, resilientes y auditables que convierten datos dispersos en decisiones ejecutivas inmediatas.',
      bullets: [
        'Desarrollo en Python (FastAPI, Pandas, Regex Dimensional, Asyncio).',
        'Scraping concurrente L7 con bypass antibot y parser nativo en C (libxml2).',
        'Bases de datos espaciales y analíticas con PostgreSQL, PostGIS y Looker Studio.',
        'Sistemas desplegados: ARES Scraper (98.4% efectividad), NOVUX PCD y NOVUX COT.'
      ]
    },
    {
      id: 'GOVERNANCE_LEGAL',
      title: 'Resolución de Conflictos & Gobernanza',
      subtitle: 'Conciliación en Equidad, SMS Aeronáutico & Compliance',
      badge: 'PILAR 03',
      color: '#10B981',
      metrics: '120h Conciliación CCB · 100% Calificación SMS',
      description: 'Blindaje normativo y rigor procedimental forjado en la aviación comercial y el Centro de Arbitraje de la Cámara de Comercio de Bogotá.',
      bullets: [
        'Conciliación en Equidad certificada (120h) por la Cámara de Comercio de Bogotá.',
        'Safety Management System (SMS) con calificación perfecta (100.00%) en Avianca Express.',
        'Seguridad de la Aviación (AVSEC 100%) y cumplimiento ético FCPA anticorrupción.',
        'Blindaje contractual B2B, cesión de propiedad intelectual y Ley 1581 de Datos.'
      ]
    }
  ] as MasterPillar[],

  competencies: {
    operations: [
      'Coordinación de personal en terreno (60 personas)',
      'Conciliación en equidad y mediación de conflictos (120h CCB)',
      'Inspección, Vigilancia y Control (IVC)',
      'Gestión documental pública (MIPG)',
      'Seguridad operacional aeronáutica y terrestre (SMS / AVSEC 100%)'
    ],
    programming: [
      'Python (Pandas, NumPy, FastAPI, Requests, Asyncio)',
      'SQL (PostgreSQL / PostGIS, SQLite, consultas avanzadas)',
      'Pipelines ETL automatizados de alta fidelidad',
      'Web Scraping Industrial resiliente con bypass antibot',
      'Looker Studio & Excel Avanzado (Power Query, macros, DAX)'
    ],
    strategy: [
      'Metodologías Ágiles (Scrum / Kanban estricto WIP = 1)',
      'E-Commerce & pasarelas WhatsApp Business API',
      'Branding & Comunicación Visual Profesional',
      'Soluciones Llave en Mano y Compliance Legal B2B'
    ]
  }
};

export const MASTER_EXPERIENCE_DATA: MasterExperienceEntity[] = [
  {
    id: 'SANTA_FE',
    organization: 'Fondo de Desarrollo Local de Santa Fe (Alcaldía Local de Santa Fe)',
    location: 'Bogotá D.C., Colombia',
    badge: 'SECTOR PÚBLICO // TERRITORIAL',
    color: '#FFE066',
    roles: [
      {
        role: 'Coordinador Técnico Operativo & Analista de Datos Territorial',
        period: 'Diciembre 2024 – Actualidad',
        highlights: [
          'Liderazgo Humano y Territorial: Coordiné en terreno a 60 gestores territoriales para acciones de Inspección, Vigilancia y Control (IVC), convivencia ciudadana y recuperación de espacio público en las UPZ 91, 92 y 93 (área con más de 1.2M de población flotante diaria).',
          'Ingeniería de Datos y Automatización ETL: Diseñé e implementé pipelines en Python (Pandas, Regex) que procesaron y estructuraron más de 131.000 interacciones operativas no estructuradas y auditaron la recuperación de 245.000 m² de espacio público, reduciendo los tiempos de consolidación técnica en más de un 70%.',
          'Monitoreo BI & Calidad de Datos (MIPG): Estructuré matrices de depuración que redujeron inconsistencias operativas de 8.000 a 5.000 registros saneados y desarrollé tableros en Looker Studio y Excel Avanzado para la toma de decisiones en mesas institucionales.'
        ]
      },
      {
        role: 'Gestor de Seguridad y Convivencia Ciudadana',
        period: 'Diciembre 2024 – Septiembre 2025',
        highlights: [
          'Inspección en Terreno y Mediación: Ejecución directa de recorridos de verificación y mediación comunitaria para la preservación del orden, censo en campo y prevención de ocupaciones indebidas.',
          'Levantamiento de Información Primaria: Recolección y sistematización de datos en calle que nutrieron los diagnósticos preventivos y mapas de riesgo territorial de la localidad.'
        ]
      }
    ],
    cpsContracts: [
      {
        code: 'CPS 281-2026',
        period: '12/03/2026 – 01/10/2026',
        role: 'Técnico Operativo de Campo & Analista de Datos',
        impact: 'Diseño de pipelines ETL en Python para depuración de datasets territoriales (de 8,000 registros con ruido a 5,000 registros limpios de alta fidelidad). Despliegue de cuadros de mando geoespaciales y reducción >70% en tiempos de consolidación.',
        tag: 'FASE V: ANALÍTICA AVANZADA'
      },
      {
        code: 'CPS 425-2025',
        period: '01/10/2025 – 31/12/2025',
        role: 'Técnico Operativo de Campo & Analista de Datos',
        impact: 'Supervisión técnica de cuadrillas y estructuración de bases de datos geoespaciales. Automatización de métricas de ocupación de espacio público.',
        tag: 'FASE IV: AUTOMATIZACIÓN'
      },
      {
        code: 'CPS 183-2025',
        period: '21/06/2025 – 20/09/2025',
        role: 'Gestor de Seguridad y Convivencia Local',
        impact: 'Consolidación operativa en campo, enlace con cuadrillas de inspección y diseño de formatos tabulares estandarizados.',
        tag: 'FASE III: CONSOLIDACIÓN'
      },
      {
        code: 'CPS 196-2025',
        period: '21/03/2025 – 20/06/2025',
        role: 'Gestor de Seguridad y Convivencia Local',
        impact: 'Continuidad del control territorial e identificación de patrones de ocupación y puntos críticos en el centro de Bogotá.',
        tag: 'FASE II: CONTROL DE CAMPO'
      },
      {
        code: 'CPS 663-2024',
        period: '21/12/2024 – 20/03/2025',
        role: 'Gestor de Seguridad y Convivencia Local',
        impact: 'Monitoreo territorial, captura de variables de alta complejidad en zona con >1.2M de población flotante y diagnóstico de cuellos de botella.',
        tag: 'FASE I: DIAGNÓSTICO BASE'
      }
    ]
  },
  {
    id: 'AVIANCA',
    organization: 'Avianca Express | Aeropuerto Internacional El Dorado',
    location: 'Bogotá D.C., Colombia',
    badge: 'INDUSTRIA AERONÁUTICA // ALTA PRECISIÓN',
    color: '#00F0FF',
    roles: [
      {
        role: 'Operaciones Terrestres, Seguridad Operacional (SMS) & Cumplimiento',
        period: '2021 – 2023',
        highlights: [
          'Seguridad Operacional (SMS): Gestión de protocolos de seguridad en rampa y operaciones terrestres bajo estándares aeronáuticos internacionales, certificado con calificación de 100.00% en Safety Management System.',
          'Cumplimiento Normativo y Ética Corporativa: Aplicación estricta de normatividad anticorrupción (FCPA), protocolos de seguridad aeroportuaria AVSEC (100% calificación) y manejo logístico de pasajeros y equipajes especiales.'
        ]
      }
    ]
  },
  {
    id: 'NOVUX',
    organization: 'NOVUX D&D / Consultor Independiente',
    location: 'Bogotá D.C., Colombia',
    badge: 'SOFTWARE FACTORY & DATA CONSULTING',
    color: '#10B981',
    roles: [
      {
        role: 'Desarrollador de Software, Automatización y Soluciones Digitales',
        period: '2020 – Actualidad',
        highlights: [
          'Construcción de Sistemas en Producción: Diseño y despliegue de plataformas modulares: ARES Scraper (extracción web resiliente con 98.4% de efectividad), NOVUX PCD (terminal de normalización de datos comerciales multitienda) y NOVUX COT (herramienta de control logístico de personal).',
          'Desarrollo E-Commerce y Estrategia Digital: Estructuración de plataformas comerciales y catálogos interactivos ligeros con conexión a pasarelas conversacionales (WhatsApp Business API).'
        ]
      }
    ]
  }
];

export const MASTER_CERTIFICATIONS_INVENTORY: MasterCertificationItem[] = [
  // Resolución & Institucional (+132 horas)
  {
    code: 'CERT-LEGAL-01',
    name: 'Diplomado de Conciliación en Equidad',
    hours: 120,
    hoursDisplay: '120h',
    issuer: 'Cámara de Comercio de Bogotá (Centro de Arbitraje y Conciliación)',
    category: 'LEGAL',
    categoryLabel: 'Resolución & Legal',
    categoryColor: '#38BDF8',
    gradeOrDetail: '120 horas lectivas y prácticas'
  },
  {
    code: 'CERT-LEGAL-02',
    name: 'IX Congreso Nacional de Justicia en Equidad',
    hours: 8,
    hoursDisplay: '8h',
    issuer: 'Cámara de Comercio de Bogotá',
    category: 'LEGAL',
    categoryLabel: 'Resolución & Legal',
    categoryColor: '#38BDF8',
    gradeOrDetail: 'Participación Oficial'
  },
  {
    code: 'CERT-LEGAL-03',
    name: 'Encuentro Antiextorsión y Autoprotección Ciudadana',
    hours: 4,
    hoursDisplay: '4h',
    issuer: 'GAULA Policía Nacional',
    category: 'LEGAL',
    categoryLabel: 'Resolución & Legal',
    categoryColor: '#38BDF8',
    gradeOrDetail: 'Protocolos de Seguridad'
  },

  // Ciencia de Datos & IA (+220 horas)
  {
    code: 'CERT-DATA-01',
    name: 'Python for Data Science, AI & Development',
    hours: 40,
    hoursDisplay: '40h',
    issuer: 'IBM SkillsBuild / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges'
  },
  {
    code: 'CERT-DATA-02',
    name: 'Machine Learning with Python',
    hours: 40,
    hoursDisplay: '40h',
    issuer: 'IBM SkillsBuild / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://www.credly.com/badges/9e8343b5-7f4e-4359-a657-5a33f0db5cb9'
  },
  {
    code: 'CERT-DATA-03',
    name: 'Introduction to Data Analytics',
    hours: 30,
    hoursDisplay: '30h',
    issuer: 'IBM SkillsBuild / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges'
  },
  {
    code: 'CERT-DATA-04',
    name: 'Data Visualization and Dashboards with Excel and Cognos',
    hours: 35,
    hoursDisplay: '35h',
    issuer: 'IBM SkillsBuild / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges'
  },
  {
    code: 'CERT-DATA-05',
    name: 'Excel Basics for Data Analysis',
    hours: 30,
    hoursDisplay: '30h',
    issuer: 'IBM SkillsBuild / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges'
  },
  {
    code: 'CERT-DATA-06',
    name: 'Google AI Essentials',
    hours: 15,
    hoursDisplay: '15h',
    issuer: 'Google / Coursera',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF',
    validationUrl: 'https://coursera.org/verify/specialization'
  },
  {
    code: 'CERT-DATA-07',
    name: 'Machine Learning y Data Science con Python',
    hours: 31,
    hoursDisplay: '31h',
    issuer: 'Udemy',
    category: 'DATA',
    categoryLabel: 'Ciencia de Datos & IA',
    categoryColor: '#00F0FF'
  },

  // Desarrollo & Programación (+185 horas)
  {
    code: 'CERT-DEV-01',
    name: 'Lenguaje de Programación Python',
    hours: 50,
    hoursDisplay: '50h',
    issuer: 'MinTIC & Universidad Distrital FJC',
    category: 'DEV',
    categoryLabel: 'Desarrollo & Backend',
    categoryColor: '#FFE066',
    gradeOrDetail: 'Certificación MinTIC Colombia'
  },
  {
    code: 'CERT-DEV-02',
    name: 'Principiante en Programación G7 - ONE (9 cursos)',
    hours: 70,
    hoursDisplay: '70h',
    issuer: 'Oracle Next Education + Alura',
    category: 'DEV',
    categoryLabel: 'Desarrollo & Backend',
    categoryColor: '#FFE066',
    gradeOrDetail: 'Programa ONE Oracle'
  },
  {
    code: 'CERT-DEV-03',
    name: 'Lógica de Programación con JavaScript (3 cursos)',
    hours: 24,
    hoursDisplay: '24h',
    issuer: 'Oracle Next Education + Alura',
    category: 'DEV',
    categoryLabel: 'Desarrollo & Backend',
    categoryColor: '#FFE066'
  },
  {
    code: 'CERT-DEV-04',
    name: 'HTML y CSS: Ambientes de desarrollo, estructura y tags',
    hours: 6,
    hoursDisplay: '6h',
    issuer: 'Oracle Next Education + Alura',
    category: 'DEV',
    categoryLabel: 'Desarrollo & Backend',
    categoryColor: '#FFE066'
  },
  {
    code: 'CERT-DEV-05',
    name: 'Web Development with Python',
    hours: 35,
    hoursDisplay: '35h',
    issuer: 'IBM SkillsBuild',
    category: 'DEV',
    categoryLabel: 'Desarrollo & Backend',
    categoryColor: '#FFE066',
    validationUrl: 'https://www.credly.com/badges/77abc3dd-4012-4943-98a6-2f3ad5f3a8dc/public_url'
  },

  // Agilidad & Ciberseguridad (+50 horas)
  {
    code: 'CERT-AGILE-01',
    name: 'Agile Explorer',
    hours: 15,
    hoursDisplay: '15h',
    issuer: 'IBM SkillsBuild / Credly',
    category: 'AGILE',
    categoryLabel: 'Agilidad & Seguridad',
    categoryColor: '#a855f7',
    validationUrl: 'https://www.credly.com/badges/602c8139-5374-4119-b51f-6a494403f64e'
  },
  {
    code: 'CERT-AGILE-02',
    name: 'Explore Emerging Tech',
    hours: 15,
    hoursDisplay: '15h',
    issuer: 'IBM SkillsBuild / Credly',
    category: 'AGILE',
    categoryLabel: 'Agilidad & Seguridad',
    categoryColor: '#a855f7',
    validationUrl: 'https://www.credly.com/badges/a1399f66-ca37-4f67-8850-fa5f6d54cf8e'
  },
  {
    code: 'CERT-AGILE-03',
    name: 'Cybersecurity Fundamentals',
    hours: 20,
    hoursDisplay: '20h',
    issuer: 'IBM SkillsBuild',
    category: 'AGILE',
    categoryLabel: 'Agilidad & Seguridad',
    categoryColor: '#a855f7',
    validationUrl: 'https://www.credly.com/badges/cb02eb3b-c3e6-4d02-943b-4eed3abce34d'
  },

  // Operaciones & Seguridad Aeronáutica
  {
    code: 'CERT-OPER-01',
    name: 'Safety Management System (SMS) Terrestre',
    hours: 10,
    hoursDisplay: 'SMS',
    issuer: 'Avianca Express',
    category: 'OPER',
    categoryLabel: 'Operaciones & Aero',
    categoryColor: '#F59E0B',
    gradeOrDetail: 'Calificación: 100.00%'
  },
  {
    code: 'CERT-OPER-02',
    name: 'Seguridad de la Aviación (AVSEC)',
    hours: 10,
    hoursDisplay: 'AVSEC',
    issuer: 'Avianca Express',
    category: 'OPER',
    categoryLabel: 'Operaciones & Aero',
    categoryColor: '#F59E0B',
    gradeOrDetail: 'Calificación: 100.00%'
  },
  {
    code: 'CERT-OPER-03',
    name: 'Familiarización AVEX Operaciones Terrestres',
    hours: 8,
    hoursDisplay: 'AVEX',
    issuer: 'Avianca Express',
    category: 'OPER',
    categoryLabel: 'Operaciones & Aero',
    categoryColor: '#F59E0B',
    gradeOrDetail: 'Calificación: 100.00%'
  },
  {
    code: 'CERT-OPER-04',
    name: 'Aceptación y Almacenaje de Sillas de Ruedas',
    hours: 4,
    hoursDisplay: 'LOG',
    issuer: 'Avianca Express',
    category: 'OPER',
    categoryLabel: 'Operaciones & Aero',
    categoryColor: '#F59E0B',
    gradeOrDetail: 'Calificación: 85.00%'
  },
  {
    code: 'CERT-OPER-05',
    name: 'Ley de Prácticas Corruptas en el Extranjero (FCPA / Ética)',
    hours: 4,
    hoursDisplay: 'FCPA',
    issuer: 'Avianca Express',
    category: 'OPER',
    categoryLabel: 'Operaciones & Aero',
    categoryColor: '#F59E0B',
    gradeOrDetail: 'Aprobado Ética Corporativa'
  },

  // E-Commerce & Negocios (+90 horas)
  {
    code: 'CERT-MKT-01',
    name: 'Comercio Electrónico Profesional',
    hours: 40,
    hoursDisplay: '40h',
    issuer: 'Google Actívate & EOI España',
    category: 'MKT',
    categoryLabel: 'E-Commerce & Negocios',
    categoryColor: '#10B981',
    gradeOrDetail: 'Acreditación EOI'
  },
  {
    code: 'CERT-MKT-02',
    name: 'Diseña una Estrategia Digital para tu Empresa',
    hours: 20,
    hoursDisplay: '20h',
    issuer: 'Cámara de Comercio de Bogotá',
    category: 'MKT',
    categoryLabel: 'E-Commerce & Negocios',
    categoryColor: '#10B981'
  },
  {
    code: 'CERT-MKT-03',
    name: 'Marketing Digital para E-Commerce',
    hours: 20,
    hoursDisplay: '20h',
    issuer: 'Cámara de Comercio de Bogotá',
    category: 'MKT',
    categoryLabel: 'E-Commerce & Negocios',
    categoryColor: '#10B981'
  },
  {
    code: 'CERT-MKT-04',
    name: 'Taller: Branding y Gestión de Marca',
    hours: 8,
    hoursDisplay: '8h',
    issuer: 'Cámara de Comercio de Bogotá',
    category: 'MKT',
    categoryLabel: 'E-Commerce & Negocios',
    categoryColor: '#10B981'
  },

  // Imagen Visual & Educación Formal (+216 horas)
  {
    code: 'CERT-FOTO-01',
    name: 'Curso Profesional de Fotografía: Técnica e Iluminación',
    hours: 72,
    hoursDisplay: '72h',
    issuer: 'Zona Cinco Escuela de Cine y Fotografía',
    category: 'FOTO_ACAD',
    categoryLabel: 'Visual & Educación',
    categoryColor: '#EC4899'
  },
  {
    code: 'CERT-FOTO-02',
    name: 'Curso Profesional de Fotografía: Laboratorio B/N',
    hours: 72,
    hoursDisplay: '72h',
    issuer: 'Zona Cinco Escuela de Cine y Fotografía',
    category: 'FOTO_ACAD',
    categoryLabel: 'Visual & Educación',
    categoryColor: '#EC4899'
  },
  {
    code: 'CERT-FOTO-03',
    name: 'Curso Profesional de Fotografía: Photoshop & Edición',
    hours: 72,
    hoursDisplay: '72h',
    issuer: 'Zona Cinco Escuela de Cine y Fotografía',
    category: 'FOTO_ACAD',
    categoryLabel: 'Visual & Educación',
    categoryColor: '#EC4899'
  },
  {
    code: 'CERT-ACAD-01',
    name: 'Bachiller Académico',
    hours: 0,
    hoursDisplay: 'Bachiller',
    issuer: 'Colegio Pío X',
    category: 'FOTO_ACAD',
    categoryLabel: 'Visual & Educación',
    categoryColor: '#EC4899',
    gradeOrDetail: 'Educación Secundaria Formal'
  }
];

export const SPECIALIZED_CV_PROFILES: SpecializedCvProfile[] = [
  {
    id: 'PERFIL_1',
    number: 1,
    shortTag: 'Lead Data & Automation',
    titleRole: 'Lead Data & Automation Solutions Architect | Python · SQL · FastAPI · ETL · AI Systems',
    targetRole: 'Arquitectura de Datos, Backend & Automatización',
    primaryColor: '#00F0FF',
    summary: 'Arquitecto de Soluciones de Datos y Automatización con 2 años de trayectoria consolidada (1 año y 11 meses a nivel operativo) integrando ingeniería de software, analítica avanzada y liderazgo operativo en campo (liderando operaciones críticas de datos y 60 gestores territoriales en el sector público). Especialista en construir pipelines ETL resilientes en Python, microservicios FastAPI de baja latencia (<162 ms P95) y sistemas de procesamiento masivo (+131k interacciones operativas estructuradas), reduciendo en más de un 70% los tiempos de respuesta. Respaldado por portafolio en vivo en novuxops.com y más de 920 horas de formación certificada por IBM, Google y la Cámara de Comercio de Bogotá.',
    docxFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil1_Lead_Data_Automation_Architect.docx',
    docxDownloadName: 'CV_Gustavo_DeLaRosa_Perfil1_Lead_Data_Automation_Architect.docx',
    mdFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil1_Lead_Data_Automation_Architect.md',
    mdDownloadName: 'CV_Gustavo_DeLaRosa_Perfil1_Lead_Data_Automation_Architect.md',
    experience: [
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Coordinador Técnico Operativo & Analista de Datos Territorial',
        dates: 'Dic. 2024 – Actualidad',
        bullets: [
          { prefix: 'Liderazgo y Coordinación en Campo: ', text: 'Lideré a 60 gestores territoriales para inspección, vigilancia y control (IVC) en un corredor con más de 1.2M de población flotante al día.' },
          { prefix: 'Arquitectura ETL & Automatización: ', text: 'Diseñé flujos en Python (Pandas, Regex) para ingesta, limpieza y validación de más de 131.000 registros, auditando la recuperación de 245.000 m² de espacio público.' },
          { prefix: 'Calidad de Datos y Reportería: ', text: 'Estructuré matrices de control de calidad bajo marco MIPG (depuración de 8.000 a 5.000 registros) y dashboards en Looker Studio para toma de decisiones.' }
        ]
      },
      {
        company: 'Avianca Express',
        role: 'Operaciones Terrestres & Safety Management System (SMS)',
        dates: '2021 – 2023',
        bullets: [
          { prefix: 'Seguridad Operacional: ', text: 'Aplicación de normatividad aeronáutica y protocolos SMS en rampa con 100% de cumplimiento y calificación perfecta en auditorías.' }
        ]
      }
    ],
    projects: [
      { name: 'NOVUX COT', stack: 'Python, FastAPI, GeoPandas, WebGL', desc: 'Centro de comando y control C2 para balanceo dinámico de rutas y turnos de 60 gestores territoriales.' },
      { name: 'NOVUX CPC / Idealista', stack: 'FastAPI, React, SQL', desc: 'Servicios backend de alta velocidad con latencia P95 de 162 ms y automatización del 62% en auditoría normativa.' },
      { name: 'ARES Scraper L7 & PCD', stack: 'Python, Playwright, Asyncio', desc: 'Motores de extracción web resiliente con 98.4% de efectividad y saneamiento del 39.2% de ruido en datos comerciales.' }
    ],
    skills: [
      { category: 'Backend & Datos', items: 'Python (Pandas, FastAPI, Asyncio, Pydantic, SQLAlchemy), SQL (PostgreSQL, BigQuery, SQLite), ETL/ELT Pipelines, Regex' },
      { category: 'Visualización & Cloud', items: 'Looker Studio, Excel Avanzado (Power Query), Git/GitHub, Docker, WebGL 2.0, APIs REST' },
      { category: 'Gestión & Liderazgo', items: 'Metodologías Ágiles (Scrum/Kanban WIP=1), Conciliación en Equidad (CCB), Liderazgo de Equipos, Seguridad Operacional' }
    ]
  },
  {
    id: 'PERFIL_2',
    number: 2,
    shortTag: 'Data Engineer & ETL',
    titleRole: 'Data Engineer & ETL Pipeline Specialist | Python (Pandas/NumPy) · SQL · BigQuery · Data Quality',
    targetRole: 'Ingeniería de Datos, ETL/ELT & Data Quality',
    primaryColor: '#38BDF8',
    summary: 'Ingeniero de Datos y Especialista en Pipelines ETL/ELT con 1 año y 11 meses de experiencia verificada en el sector público transformando grandes volúmenes de datos no estructurados en almacenes analíticos limpios y estructurados. Experto en deduplicación algorítmica, contratos de datos con Pydantic, modelado dimensional en SQL (Window Functions, CTEs) y orquestación con Python (Pandas, NumPy, AsyncIO), reduciendo en más del 70% los tiempos de consolidación de datos. Certificado por IBM en Python for Data Science & AI, Machine Learning with Python y Data Analytics Essentials.',
    docxFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil2_Data_Engineer_ETL.docx',
    docxDownloadName: 'CV_Gustavo_DeLaRosa_Perfil2_Data_Engineer_ETL.docx',
    mdFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil2_Data_Engineer_ETL.md',
    mdDownloadName: 'CV_Gustavo_DeLaRosa_Perfil2_Data_Engineer_ETL.md',
    experience: [
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Ingeniero de Datos & Coordinador Técnico Operativo',
        dates: 'Dic. 2024 – Actualidad',
        bullets: [
          { prefix: 'Procesamiento ETL de +131.000 Registros: ', text: 'Construí flujos de transformación en Python que limpiaron registros desestructurados desde mensajería instantánea hacia bases tabulares con cero pérdida de trazabilidad.' },
          { prefix: 'Saneamiento y Control de Integridad: ', text: 'Implementé algoritmos que filtraron inconsistencias en lotes de 8.000 a 5.000 registros de alta fidelidad técnica para seguimiento territorial.' },
          { prefix: 'Automatización de Auditoría Espacial: ', text: 'Desarrollé scripts de validación que auditaron más de 245.000 m² de intervenciones en espacio público con reportes automáticos.' }
        ]
      }
    ],
    projects: [
      { name: 'Pipeline de Saneamiento NOVUX PCD', stack: 'Python, NumPy, Requests', desc: 'Normalización matemática de unidades y filtrado automático del 39.2% de ruido en lotes de datos comerciales (8.420 a 5.118 registros limpios).' },
      { name: 'ARES Scraper Data Engine', stack: 'Python, AsyncIO, SQLite', desc: 'Extracción y almacenamiento por lotes con 98.4% de éxito en solicitudes sin bloqueos.' },
      { name: 'Endpoints Analíticos NOVUX CPC', stack: 'FastAPI, PostgreSQL', desc: 'Servicios de consulta optimizados alcanzando latencia P95 de 162 ms.' }
    ],
    skills: [
      { category: 'Pipelines & ETL', items: 'Python 3.11 (Pandas, NumPy, Asyncio, Pydantic, SQLAlchemy 2.0), Ingesta Masiva, Data Cleaning, Regex/NLP' },
      { category: 'Bases de Datos & SQL', items: 'SQL Avanzado (Window Functions, CTEs, Particionamiento), PostgreSQL, BigQuery, SQLite' },
      { category: 'Herramientas & Entorno', items: 'Git/GitHub, Linux/Bash, Looker Studio, APIs REST, Metodología Ágil' }
    ]
  },
  {
    id: 'PERFIL_3',
    number: 3,
    shortTag: 'Senior Data Analyst & BI',
    titleRole: 'Senior Data Analyst & BI Lead | SQL · Python · Looker Studio · Excel Analítico · KPIs & Dashboarding',
    targetRole: 'Business Intelligence, Analítica & Dashboards',
    primaryColor: '#FFE066',
    summary: 'Analista de Datos Senior y Especialista en Inteligencia de Negocios (BI) con 1 año y 11 meses de experiencia convirtiendo información operativa compleja en tableros ejecutivos e indicadores de rendimiento (KPIs). Experto en el ciclo completo de análisis (Ask, Prepare, Process, Analyze, Share, Act) aplicando SQL avanzado, Python (Pandas, Matplotlib) y Looker Studio para optimizar la toma de decisiones en operaciones con más de 1.2M de población flotante diaria. Certificado por IBM en Data Visualization with Dashboards, Excel Essentials y Machine Learning.',
    docxFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil3_Senior_Data_Analyst_BI.docx',
    docxDownloadName: 'CV_Gustavo_DeLaRosa_Perfil3_Senior_Data_Analyst_BI.docx',
    mdFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil3_Senior_Data_Analyst_BI.md',
    mdDownloadName: 'CV_Gustavo_DeLaRosa_Perfil3_Senior_Data_Analyst_BI.md',
    experience: [
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Analista de Datos Territorial & Coordinador Operativo',
        dates: 'Dic. 2024 – Actualidad',
        bullets: [
          { prefix: 'Tableros Ejecutivos en Looker Studio: ', text: 'Diseñé tableros de control y mapas interactivos que redujeron en más del 70% los tiempos de consolidación de informes semanales para directivos.' },
          { prefix: 'Monitoreo Operativo & Métricas Clave: ', text: 'Estructuré indicadores para evaluar la cobertura y desempeño en terreno de 60 gestores operativos sobre 245.000 m² auditados.' },
          { prefix: 'Modelado y Calidad de Datos: ', text: 'Desarrollé consultas analíticas en SQL y scripts en Python para cruzar bases de datos dispersas y detectar cuellos de botella operativos.' }
        ]
      }
    ],
    projects: [
      { name: 'Command Center Analítico NOVUX CPC', stack: 'Python, Looker Studio, SQL', desc: 'Scoring algorítmico ponderado (0-100) para auditar desempeño de 229 actores públicos con +62% de automatización.' },
      { name: 'Monitor de Precios Multitienda NOVUX PCD', stack: 'Python, Matplotlib, Excel', desc: 'Análisis comparativo de fluctuación de precios de grandes superficies filtrando el 39.2% de ruido.' },
      { name: 'Matriz de Turnos y Cobertura NOVUX COT', stack: 'Pandas, GeoPandas, Looker Studio', desc: 'Modelo de asignación con buffer operativo del 10%-15% para personal de campo.' }
    ],
    skills: [
      { category: 'Analítica & BI', items: 'Looker Studio, Excel Analítico (Power Query, Modelos de Datos), IBM Cognos, Dashboards Ejecutivos, KPIs' },
      { category: 'Análisis Técnico', items: 'SQL (Consultas complejas, agrupaciones, Window Functions), Python (Pandas, Matplotlib, Scikit-learn)' },
      { category: 'Habilidades de Negocio', items: 'Google Data Analytics Framework, Metodología Agile, Presentación de Insights a Stakeholders' }
    ]
  },
  {
    id: 'PERFIL_4',
    number: 4,
    shortTag: 'Python Automation & Scraping',
    titleRole: 'Python Automation & Web Scraping Engineer | Playwright · Asyncio · FastAPI · Requests · Resilient Bots',
    targetRole: 'RPA, Scraping Industrial L7 & Microservicios',
    primaryColor: '#A855F7',
    summary: 'Desarrollador Python especializado en Automatización de Procesos (RPA), Extracción Web Resiliente (Capa 7) y Microservicios Backend con 1.250 horas de código materializado en producción (12 repositorios Git locales y 216 scripts Python). Creador de la arquitectura ARES Scraper L7 con 98.4% de tasa de éxito en extracción sin bloqueos y endpoints en FastAPI con latencia P95 de 162 ms. Experiencia comprobada de 1 año y 11 meses automatizando la captura de datos en el sector público (Alcaldía Local de Santa Fe).',
    docxFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil4_Python_Automation_Scraping.docx',
    docxDownloadName: 'CV_Gustavo_DeLaRosa_Perfil4_Python_Automation_Scraping.docx',
    mdFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil4_Python_Automation_Scraping.md',
    mdDownloadName: 'CV_Gustavo_DeLaRosa_Perfil4_Python_Automation_Scraping.md',
    experience: [
      {
        company: 'NOVUX D&D',
        role: 'Ingeniero de Automatización & Desarrollo Python',
        dates: '2020 – Actualidad',
        bullets: [
          { prefix: 'ARES Scraper L7 (Playwright, BS4, Asyncio): ', text: 'Construí un motor de extracción asíncrona multi-hilo con rotación inteligente y evasión de bloqueos, alcanzando un 98.4% de peticiones exitosas (+63% aceleración de pipeline).' },
          { prefix: 'Extractor E-Commerce NOVUX PCD: ', text: 'Desarrollé scripts de extracción y normalización de catálogos comerciales (probado en grandes superficies) con memoria adaptativa de cambios en el DOM.' },
          { prefix: 'Backend de Alta Velocidad NOVUX CPC: ', text: 'Implementé APIs asíncronas con FastAPI y Uvicorn optimizadas para latencia en P95 de 162 ms.' }
        ]
      },
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Especialista en Automatización de Reportes',
        dates: 'Dic. 2024 – Actualidad',
        bullets: [
          { prefix: 'Captura Automatizada de Evidencias: ', text: 'Orquesté scripts en Python para capturar, validar y clasificar más de 131.000 mensajes y registros fotográficos reduciendo en >70% la digitación manual.' }
        ]
      }
    ],
    projects: [
      { name: 'ARES Scraper L7', stack: 'Python 3.11, Playwright, BS4', desc: 'Extracción web masiva y estructuración automática de prospectos comerciales.' },
      { name: 'NOVUX PCD', stack: 'Python, Selenium, Requests', desc: 'Monitoreo multitienda en tiempo real y normalización matemática de catálogos.' }
    ],
    skills: [
      { category: 'Lenguajes & Automatización', items: 'Python 3.11 (POO, AsyncIO, Playwright, Selenium, BeautifulSoup4, Requests), RPA, CLI Tooling' },
      { category: 'Backend & Persistencia', items: 'FastAPI, Uvicorn, Pydantic, SQLAlchemy, SQLite, PostgreSQL, Linux/Bash, Git' },
      { category: 'Prácticas de Código', items: 'Manejo Robusto de Excepciones de Red, Rotación de Headers, Control de Concurrencia' }
    ]
  },
  {
    id: 'PERFIL_5',
    number: 5,
    shortTag: 'Operaciones & Eficiencia Pública',
    titleRole: 'Coordinador de Operaciones & Eficiencia Pública | Gestión Territorial · Conciliación (120h CCB) · MIPG',
    targetRole: 'Liderazgo Territorial, Conciliación & MIPG',
    primaryColor: '#10B981',
    summary: 'Coordinador de Operaciones y Consultor en Eficiencia Territorial con 1 año y 11 meses de experiencia liderando equipos de campo y modernizando procesos en el sector público (Alcaldía Local de Santa Fe). Diplomado en Conciliación en Equidad (120 horas) por el Centro de Arbitraje y Conciliación de la Cámara de Comercio de Bogotá, con sólida capacidad para la mediación de conflictos en espacio público, gestión comunitaria y articulación interinstitucional. Combino el liderazgo de equipos humanos (coordinación de 60 gestores en calle) con herramientas digitales y datos para eliminar el papeleo manual y garantizar el 100% de cumplimiento institucional.',
    docxFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil5_Operaciones_Eficiencia_Publica.docx',
    docxDownloadName: 'CV_Gustavo_DeLaRosa_Perfil5_Operaciones_Eficiencia_Publica.docx',
    mdFile: '/cv-perfiles/CV_Gustavo_DeLaRosa_Perfil5_Operaciones_Eficiencia_Publica.md',
    mdDownloadName: 'CV_Gustavo_DeLaRosa_Perfil5_Operaciones_Eficiencia_Publica.md',
    experience: [
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Coordinador Técnico Operativo (UPZ 91, 92 y 93)',
        dates: 'Sept. 2025 – Actualidad',
        bullets: [
          { prefix: 'Liderazgo y Coordinación en Terreno: ', text: 'Lideré a 60 gestores en espacio público para inspección, vigilancia y control (IVC), convivencia ciudadana y atención de conflictividades.' },
          { prefix: 'Mediación y Gestión Comunitaria: ', text: 'Apliqué principios de conciliación en equidad y concertación con comerciantes informales y juntas de acción comunal, previniendo escalamientos de conflictos.' },
          { prefix: 'Eficiencia de Procesos & MIPG: ', text: 'Modernicé la rendición de reportes y actas reduciendo los tiempos de consolidación en más del 70% bajo estricto cumplimiento del marco normativo estatal.' }
        ]
      },
      {
        company: 'Fondo de Desarrollo Local de Santa Fe',
        role: 'Gestor de Seguridad y Convivencia Ciudadana',
        dates: 'Dic. 2024 – Sept. 2025',
        bullets: [
          { prefix: 'Control Territorial: ', text: 'Verificación de ocupaciones indebidas y levantamiento de datos primarios en zonas críticas del centro de la ciudad.' }
        ]
      },
      {
        company: 'Avianca Express',
        role: 'Operaciones Terrestres & Safety Management System (SMS)',
        dates: '2021 – 2023',
        bullets: [
          { prefix: 'Seguridad Operacional: ', text: 'Coordinación logística bajo estándares de alta exigencia operacional aeroportuaria con calificación del 100% en SMS y AVSEC.' }
        ]
      }
    ],
    projects: [
      { name: 'Gestor Operativo NOVUX COT', stack: 'Software de Coordinación', desc: 'Sistema digital para asignación equilibrada de turnos y verificación fotográfica en terreno de 60 gestores.' },
      { name: 'Sistematización de Derechos de Petición', stack: 'LegalTech Asistido', desc: 'Flujos automatizados para estructurar diagnósticos y respuestas técnicas oportunas bajo Ley 1755 de 2015.' }
    ],
    skills: [
      { category: 'Liderazgo & Gestión', items: 'Coordinación de Personal en Terreno (60 personas), Conciliación en Equidad (CCB), Mediación de Conflictos' },
      { category: 'Marco Normativo Público', items: 'Modelo Integrado de Planeación y Gestión (MIPG), Ley 1801 (Código Convivencia), Ley 1755 (Petición), SECOP II' },
      { category: 'Herramientas & Métodos', items: 'Python Básico para Datos, Excel Avanzado, Looker Studio, Metodologías Ágiles (Agile Explorer IBM)' }
    ]
  }
];

export const MASTER_PROFILE_DATA_EN = {
  name: 'GUSTAVO ALBERTO DE LA ROSA FLÓREZ',
  headline: 'Operations Coordinator · Automation & Data Specialist · Python Developer',
  location: 'Bogota D.C., Colombia',
  portfolioUrl: 'https://www.novuxops.com/',
  portfolioDisplay: 'novuxops.com',
  email: 'Gustavodlr53@gmail.com',
  phone: '+57 319 6300410',
  phoneClean: '573196300410',
  github: 'github.com/tavodf',
  githubUrl: 'https://github.com/tavodf',
  linkedin: 'linkedin.com/in/tavodelarosaf',
  linkedinUrl: 'https://www.linkedin.com/in/tavodelarosaf',

  profileSummary: `Multidisciplinary professional with 2 years of consolidated track record (1 year and 11 months at the operational level) integrating three strategic pillars: Critical Operations Leadership & Field Coordination, Software Engineering & Process Automation (Python backend development, FastAPI, Web Scraping, and massive data pipelines), and Conflict Resolution, Governance & Commercial Strategy. Creator of applied technological solutions that transform chaotic workflows and manual tasks into automated, measurable systems, reducing institutional consolidation times by over 70%. Backed by a verified track record of continuous education with over 920 certified hours from IBM, Google, Oracle/Alura, MinTIC, Avianca Express, and the Bogota Chamber of Commerce, I demonstrate my work through a live technical portfolio (novuxops.com) and agile methodology rigor.`,

  kpiStats: [
    { label: 'TRACK RECORD', value: '1 YEAR 11 MONTHS', detail: 'Operational Level (2 Years)', color: '#00F0FF' },
    { label: 'CERTIFIED TRAINING', value: '+920 HOURS', detail: 'IBM, Google, CCB, MinTIC', color: '#a855f7' },
    { label: 'FIELD LEADERSHIP', value: '60 AGENTS', detail: 'UPZ 91, 92, 93 (>1.2M pop.)', color: '#FFE066' },
    { label: 'PROCESSED DATA', value: '+131K REC.', detail: 'Python & PostGIS Pipelines', color: '#38BDF8' },
    { label: 'AUDITED SPACE', value: '245,000 m²', detail: 'Territorial recovery', color: '#10B981' },
    { label: 'OPERATIONAL EFFICIENCY', value: '>70%', detail: 'Reporting time reduction', color: '#34D399' },
    { label: 'SMS / AVSEC SAFETY', value: '100.00%', detail: 'Avianca Aviation Standard', color: '#F59E0B' },
  ],

  pillars: [
    {
      id: 'OPERATIONS',
      title: 'Field Leadership & Coordination',
      subtitle: 'Critical Operations, Territorial Inspection (IVC) & Coexistence',
      badge: 'PILLAR 01',
      color: '#00F0FF',
      metrics: '60 Field Agents Coordinated · UPZ 91, 92, 93',
      description: 'Proven capacity in tactical leadership of field teams in high-density urban areas (>1.2M daily commuting population).',
      bullets: [
        'Inspection, Surveillance and Control (IVC) of public space and urban order.',
        'Preventive community mediation and social cohesion preservation.',
        'Cross-institutional articulation with district agencies and law enforcement.',
        'Public documentation management under the MIPG framework and supervision reports.'
      ]
    },
    {
      id: 'DATA_SOFTWARE',
      title: 'Software Engineering & Automation',
      subtitle: 'Python Backend, Web Scraping & ETL Pipelines',
      badge: 'PILLAR 02',
      color: '#FFE066',
      metrics: '+131,000 Records · >70% Time Savings',
      description: 'Architecting clean, resilient, and auditable code engines that convert scattered raw data into executive decisions.',
      bullets: [
        'Backend engineering in Python (FastAPI, Pandas, Dimensional Regex, Asyncio).',
        'Concurrent L7 scraping with antibot bypass and native C parser (libxml2).',
        'Spatial and analytical databases with PostgreSQL, PostGIS, and Looker Studio.',
        'Deployed systems: ARES Scraper (98.4% effectiveness), NOVUX PCD, and NOVUX COT.'
      ]
    },
    {
      id: 'GOVERNANCE_LEGAL',
      title: 'Conflict Resolution & Governance',
      subtitle: 'Equity Conciliation, Aviation SMS & Corporate Compliance',
      badge: 'PILLAR 03',
      color: '#10B981',
      metrics: '120h Mediation CCB · 100% SMS Grade',
      description: 'Regulatory compliance and procedural rigor forged in commercial aviation and the Bogota Chamber of Commerce Arbitration Center.',
      bullets: [
        'Certified Equity Conciliation (120h) by the Bogota Chamber of Commerce.',
        'Safety Management System (SMS) with perfect score (100.00%) at Avianca Express.',
        'Aviation Security (AVSEC 100%) and FCPA anti-corruption compliance.',
        'B2B contractual agreements, intellectual property assignment, and Data Law 1581.'
      ]
    }
  ] as MasterPillar[],

  competencies: {
    operations: [
      'Field personnel coordination (60 team members)',
      'Equity conciliation and conflict mediation (120h CCB)',
      'Inspection, Surveillance and Control (IVC)',
      'Public document management (MIPG framework)',
      'Aviation & ground operational safety (SMS / AVSEC 100%)'
    ],
    programming: [
      'Python (Pandas, NumPy, FastAPI, Requests, Asyncio)',
      'SQL (PostgreSQL / PostGIS, SQLite, advanced querying)',
      'High-fidelity automated ETL pipelines',
      'Resilient industrial Web Scraping with antibot bypass',
      'Looker Studio & Advanced Excel (Power Query, macros, DAX)'
    ],
    strategy: [
      'Agile Methodologies (Scrum / strict Kanban WIP = 1)',
      'E-Commerce & WhatsApp Business API gateways',
      'Professional Visual Identity & Branding',
      'Turnkey Solutions and B2B Legal Compliance'
    ]
  }
};

export const MASTER_EXPERIENCE_DATA_EN: MasterExperienceEntity[] = [
  {
    id: 'SANTA_FE',
    organization: 'Santa Fe Local Development Fund (Santa Fe Mayor\'s Office)',
    location: 'Bogota D.C., Colombia',
    badge: 'PUBLIC SECTOR // TERRITORIAL',
    color: '#FFE066',
    roles: [
      {
        role: 'Technical Operations Coordinator & Territorial Data Analyst',
        period: 'December 2024 – Present',
        highlights: [
          'Human & Territorial Leadership: Coordinated 60 field agents for Inspection, Surveillance, and Control (IVC), civic coexistence, and public space recovery across UPZ 91, 92, and 93 (>1.2M daily commuting population).',
          'Data Engineering & ETL Automation: Designed and implemented Python pipelines (Pandas, Regex) that processed and structured over 131,000 unstructured operational records, auditing the recovery of 245,000 m² of public space and cutting technical turnaround times by over 70%.',
          'BI Monitoring & Data Quality (MIPG): Formulated data cleansing workflows that purged noise (from 8,000 raw entries to 5,000 clean records) and created Looker Studio & Advanced Excel executive dashboards.'
        ]
      },
      {
        role: 'Security and Citizen Coexistence Agent',
        period: 'December 2024 – September 2025',
        highlights: [
          'Field Inspection & Mediation: Executed field verification tours and community mediation to preserve public order, field census, and prevention of irregular occupation.',
          'Primary Data Collection: Gathered street-level field metrics that fed preventive risk diagnostics and territorial mapping.'
        ]
      }
    ],
    cpsContracts: [
      {
        code: 'CPS 281-2026',
        period: '12/03/2026 – 01/10/2026',
        role: 'Field Operations Specialist & Data Analyst',
        impact: 'Designed ETL pipelines in Python for territorial dataset sanitation (from 8,000 noisy records to 5,000 verified entries). Deployed geospatial dashboards, reducing consolidation time by >70%.',
        tag: 'PHASE V: ADVANCED ANALYTICS'
      },
      {
        code: 'CPS 425-2025',
        period: '01/10/2025 – 31/12/2025',
        role: 'Field Operations Specialist & Data Analyst',
        impact: 'Technical supervision of field teams and geospatial database structuring. Automated public space occupancy indicators.',
        tag: 'PHASE IV: AUTOMATION'
      },
      {
        code: 'CPS 183-2025',
        period: '21/06/2025 – 20/09/2025',
        role: 'Local Security & Coexistence Agent',
        impact: 'Field operational consolidation, liaison with inspection teams, and standardized reporting format design.',
        tag: 'PHASE III: CONSOLIDATION'
      },
      {
        code: 'CPS 196-2025',
        period: '21/03/2025 – 20/06/2025',
        role: 'Local Security & Coexistence Agent',
        impact: 'Territorial surveillance continuity and critical hotspot identification in central Bogota.',
        tag: 'PHASE II: FIELD CONTROL'
      },
      {
        code: 'CPS 663-2024',
        period: '21/12/2024 – 20/03/2025',
        role: 'Local Security & Coexistence Agent',
        impact: 'Territorial monitoring, complex field data capture in high-density areas, and operational bottleneck diagnostics.',
        tag: 'PHASE I: BASELINE DIAGNOSTIC'
      }
    ]
  },
  {
    id: 'AVIANCA',
    organization: 'Avianca Express | El Dorado International Airport',
    location: 'Bogota D.C., Colombia',
    badge: 'AVIATION INDUSTRY // HIGH PRECISION',
    color: '#00F0FF',
    roles: [
      {
        role: 'Ground Operations, Operational Safety (SMS) & Compliance',
        period: '2021 – 2023',
        highlights: [
          'Operational Safety (SMS): Ramp safety protocols and ground operations management under international aviation standards, certified with a 100.00% rating in Safety Management Systems.',
          'Regulatory Compliance & Ethics: Strict adherence to FCPA anti-corruption regulations, AVSEC airport security protocols (100% audit score), and passenger/special cargo logistics.'
        ]
      }
    ]
  },
  {
    id: 'NOVUX',
    organization: 'NOVUX D&D / Independent Consultant',
    location: 'Bogota D.C., Colombia',
    badge: 'SOFTWARE FACTORY & DATA CONSULTING',
    color: '#10B981',
    roles: [
      {
        role: 'Software Developer, Automation & Digital Solutions',
        period: '2020 – Present',
        highlights: [
          'Production Systems Delivery: Architecture and deployment of modular platforms: ARES Scraper (resilient web extraction with 98.4% effectiveness), NOVUX PCD (commercial pricing normalizer terminal), and NOVUX COT (tactical workforce C2 system).',
          'E-Commerce & Digital Strategy: Structuring lightweight interactive catalogs integrated with conversational gateways (WhatsApp Business API).'
        ]
      }
    ]
  }
];

export const SPECIALIZED_CV_PROFILES_EN: SpecializedCvProfile[] = SPECIALIZED_CV_PROFILES.map((p) => {
  if (p.id === 'PERFIL_1') {
    return {
      ...p,
      shortTag: 'Lead Data & Automation',
      titleRole: 'Lead Data & Automation Solutions Architect | Python · SQL · FastAPI · ETL · AI Systems',
      targetRole: 'Data Architecture, Backend & Automation',
      summary: 'Data and Automation Solutions Architect with 2 years of consolidated track record (1 year and 11 months at the operational level) integrating software engineering, advanced analytics, and field leadership (coordinating critical data workflows and 60 field agents in the public sector). Specialist in building resilient Python ETL pipelines, low-latency FastAPI microservices (<162 ms P95), and massive data processing systems (+131k structured records), reducing response times by over 70%. Backed by a live portfolio at novuxops.com and over 920 hours of certified training from IBM, Google, and the Bogota Chamber of Commerce.',
      experience: [
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Technical Operations Coordinator & Territorial Data Analyst',
          dates: 'Dec. 2024 – Present',
          bullets: [
            { prefix: 'Field Leadership & Coordination: ', text: 'Coordinated 60 field agents for inspection, surveillance, and control (IVC) across an urban corridor with over 1.2M daily commuting population.' },
            { prefix: 'ETL Architecture & Automation: ', text: 'Designed Python workflows (Pandas, Regex) for ingestion, cleansing, and validation of over 131,000 records, auditing the recovery of 245,000 m² of public space.' },
            { prefix: 'Data Quality & BI Reporting: ', text: 'Structured quality control matrices under the MIPG framework (sanitizing 8,000 raw records down to 5,000 clean entries) and Looker Studio dashboards for executive decision-making.' }
          ]
        },
        {
          company: 'Avianca Express',
          role: 'Ground Operations & Safety Management System (SMS)',
          dates: '2021 – 2023',
          bullets: [
            { prefix: 'Operational Safety: ', text: 'Applied aviation regulations and ramp SMS protocols with 100% compliance and a perfect score in safety audits.' }
          ]
        }
      ],
      projects: [
        { name: 'NOVUX COT', stack: 'Python, FastAPI, GeoPandas, WebGL', desc: 'C2 command and control center for dynamic route and shift balancing of 60 territorial agents.' },
        { name: 'NOVUX CPC / Idealista', stack: 'FastAPI, React, SQL', desc: 'High-speed backend services with 162 ms P95 latency and 62% automation in regulatory auditing.' },
        { name: 'ARES Scraper L7 & PCD', stack: 'Python, Playwright, Asyncio', desc: 'Resilient web extraction engines with 98.4% effectiveness and 39.2% noise sanitization in commercial data.' }
      ],
      skills: [
        { category: 'Backend & Data', items: 'Python (Pandas, FastAPI, Asyncio, Pydantic, SQLAlchemy), SQL (PostgreSQL, BigQuery, SQLite), ETL/ELT Pipelines, Regex' },
        { category: 'Visualization & Cloud', items: 'Looker Studio, Advanced Excel (Power Query), Git/GitHub, Docker, WebGL 2.0, REST APIs' },
        { category: 'Management & Leadership', items: 'Agile Methodologies (Scrum/Kanban WIP=1), Equity Conciliation (CCB), Team Leadership, Operational Safety' }
      ]
    };
  }
  if (p.id === 'PERFIL_2') {
    return {
      ...p,
      shortTag: 'Data Engineer & ETL',
      titleRole: 'Data Engineer & ETL Pipeline Specialist | Python (Pandas/NumPy) · SQL · BigQuery · Data Quality',
      targetRole: 'Data Engineering, ETL/ELT & Data Quality',
      summary: 'Data Engineer and ETL/ELT Pipeline Specialist with 1 year and 11 months of verified experience in the public sector transforming massive volumes of unstructured records into clean, structured analytical warehouses. Expert in algorithmic deduplication, Pydantic data contracts, SQL dimensional modeling (Window Functions, CTEs), and Python orchestration (Pandas, NumPy, AsyncIO), cutting data consolidation times by over 70%. Certified by IBM in Python for Data Science & AI, Machine Learning with Python, and Data Analytics Essentials.',
      experience: [
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Data Engineer & Technical Operations Coordinator',
          dates: 'Dec. 2024 – Present',
          bullets: [
            { prefix: 'ETL Processing of +131,000 Records: ', text: 'Built Python transformation workflows that cleansed unstructured records from instant messaging into tabular databases with zero traceability loss.' },
            { prefix: 'Sanitization & Integrity Control: ', text: 'Implemented algorithms that filtered inconsistencies across batches from 8,000 raw records to 5,000 high-fidelity entries for territorial tracking.' },
            { prefix: 'Spatial Audit Automation: ', text: 'Developed validation scripts that audited over 245,000 m² of public space interventions with automated executive reporting.' }
          ]
        }
      ],
      projects: [
        { name: 'NOVUX PCD Sanitization Pipeline', stack: 'Python, NumPy, Requests', desc: 'Mathematical unit normalization and automated filtering of 39.2% noise in commercial data batches (8,420 to 5,118 clean records).' },
        { name: 'ARES Scraper Data Engine', stack: 'Python, AsyncIO, SQLite', desc: 'Batch extraction and persistence achieving a 98.4% success rate without WAF blocks.' },
        { name: 'NOVUX CPC Analytical Endpoints', stack: 'FastAPI, PostgreSQL', desc: 'Optimized query services reaching 162 ms P95 latency.' }
      ],
      skills: [
        { category: 'Pipelines & ETL', items: 'Python 3.11 (Pandas, NumPy, Asyncio, Pydantic, SQLAlchemy 2.0), Massive Ingestion, Data Cleaning, Regex/NLP' },
        { category: 'Databases & SQL', items: 'Advanced SQL (Window Functions, CTEs, Partitioning), PostgreSQL, BigQuery, SQLite' },
        { category: 'Tools & Environment', items: 'Git/GitHub, Linux/Bash, Looker Studio, REST APIs, Agile Methodology' }
      ]
    };
  }
  if (p.id === 'PERFIL_3') {
    return {
      ...p,
      shortTag: 'Senior Data Analyst & BI',
      titleRole: 'Senior Data Analyst & BI Lead | SQL · Python · Looker Studio · Analytical Excel · KPIs & Dashboarding',
      targetRole: 'Business Intelligence, Analytics & Dashboards',
      summary: 'Senior Data Analyst and Business Intelligence (BI) Specialist with 1 year and 11 months of experience converting complex operational datasets into executive dashboards and key performance indicators (KPIs). Expert in the full analytics lifecycle (Ask, Prepare, Process, Analyze, Share, Act) applying advanced SQL, Python (Pandas, Matplotlib), and Looker Studio to optimize decision-making in operations serving over 1.2M daily commuters. Certified by IBM in Data Visualization with Dashboards, Excel Essentials, and Machine Learning.',
      experience: [
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Territorial Data Analyst & Operations Coordinator',
          dates: 'Dec. 2024 – Present',
          bullets: [
            { prefix: 'Looker Studio Executive Dashboards: ', text: 'Designed control dashboards and interactive maps that reduced weekly executive report consolidation times by over 70%.' },
            { prefix: 'Operational Monitoring & Key Metrics: ', text: 'Structured KPIs to evaluate field coverage and performance of 60 operational agents across 245,000 m² of audited territory.' },
            { prefix: 'Data Modeling & Quality: ', text: 'Developed analytical SQL queries and Python scripts to cross-reference dispersed databases and detect operational bottlenecks.' }
          ]
        }
      ],
      projects: [
        { name: 'NOVUX CPC Analytical Command Center', stack: 'Python, Looker Studio, SQL', desc: 'Weighted algorithmic scoring (0-100) to audit performance across 229 public actors with +62% automation.' },
        { name: 'NOVUX PCD Multi-Store Price Monitor', stack: 'Python, Matplotlib, Excel', desc: 'Comparative analysis of retail price fluctuations filtering out 39.2% of data noise.' },
        { name: 'NOVUX COT Shift & Coverage Matrix', stack: 'Pandas, GeoPandas, Looker Studio', desc: 'Workforce allocation model with a 10%-15% operational buffer for field personnel.' }
      ],
      skills: [
        { category: 'Analytics & BI', items: 'Looker Studio, Analytical Excel (Power Query, Data Models), IBM Cognos, Executive Dashboards, KPIs' },
        { category: 'Technical Analysis', items: 'SQL (Complex queries, aggregations, Window Functions), Python (Pandas, Matplotlib, Scikit-learn)' },
        { category: 'Business Skills', items: 'Google Data Analytics Framework, Agile Methodology, Executive Stakeholder Presentations' }
      ]
    };
  }
  if (p.id === 'PERFIL_4') {
    return {
      ...p,
      shortTag: 'Python Automation & Scraping',
      titleRole: 'Python Automation & Web Scraping Engineer | Playwright · Asyncio · FastAPI · Requests · Resilient Bots',
      targetRole: 'RPA, L7 Industrial Scraping & Microservices',
      summary: 'Python Developer specialized in Process Automation (RPA), Resilient Web Extraction (Layer 7), and Backend Microservices with 1,250 hours of production-ready code (12 local Git repositories and 216 Python scripts). Creator of the ARES Scraper L7 architecture with a 98.4% block-free extraction success rate and FastAPI endpoints with 162 ms P95 latency. Proven experience of 1 year and 11 months automating data capture in the public sector (Santa Fe Mayor\'s Office).',
      experience: [
        {
          company: 'NOVUX D&D',
          role: 'Automation & Python Development Engineer',
          dates: '2020 – Present',
          bullets: [
            { prefix: 'ARES Scraper L7 (Playwright, BS4, Asyncio): ', text: 'Built a multi-threaded asynchronous extraction engine with smart rotation and block evasion, achieving 98.4% successful requests (+63% pipeline acceleration).' },
            { prefix: 'NOVUX PCD E-Commerce Extractor: ', text: 'Developed extraction and normalization scripts for commercial catalogs (tested on major retail chains) with adaptive DOM change memory.' },
            { prefix: 'NOVUX CPC High-Speed Backend: ', text: 'Implemented asynchronous APIs with FastAPI and Uvicorn optimized for 162 ms P95 latency.' }
          ]
        },
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Reporting Automation Specialist',
          dates: 'Dec. 2024 – Present',
          bullets: [
            { prefix: 'Automated Evidence Capture: ', text: 'Orchestrated Python scripts to capture, validate, and classify over 131,000 messages and photographic records, cutting manual data entry by >70%.' }
          ]
        }
      ],
      projects: [
        { name: 'ARES Scraper L7', stack: 'Python 3.11, Playwright, BS4', desc: 'Massive web extraction and automated structuring of B2B commercial leads.' },
        { name: 'NOVUX PCD', stack: 'Python, Selenium, Requests', desc: 'Real-time multi-store monitoring and mathematical catalog normalization.' }
      ],
      skills: [
        { category: 'Languages & Automation', items: 'Python 3.11 (OOP, AsyncIO, Playwright, Selenium, BeautifulSoup4, Requests), RPA, CLI Tooling' },
        { category: 'Backend & Persistence', items: 'FastAPI, Uvicorn, Pydantic, SQLAlchemy, SQLite, PostgreSQL, Linux/Bash, Git' },
        { category: 'Code Practices', items: 'Robust Network Exception Handling, Header Rotation, Concurrency Control' }
      ]
    };
  }
  if (p.id === 'PERFIL_5') {
    return {
      ...p,
      shortTag: 'Operations & Public Efficiency',
      titleRole: 'Operations & Public Efficiency Coordinator | Territorial Management · Conciliation (120h CCB) · MIPG',
      targetRole: 'Territorial Leadership, Conciliation & MIPG',
      summary: 'Operations Coordinator and Territorial Efficiency Consultant with 1 year and 11 months of experience leading field teams and modernizing workflows in the public sector (Santa Fe Mayor\'s Office). Certified in Equity Conciliation (120 hours) by the Arbitration and Conciliation Center of the Bogota Chamber of Commerce, with strong capabilities in public space conflict mediation, community engagement, and inter-agency coordination. Combines human team leadership (coordinating 60 field agents) with digital tools and data to eliminate manual paperwork and ensure 100% institutional compliance.',
      experience: [
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Technical Operations Coordinator (UPZ 91, 92 & 93)',
          dates: 'Sept. 2025 – Present',
          bullets: [
            { prefix: 'Field Leadership & Coordination: ', text: 'Led 60 public space agents for inspection, surveillance, and control (IVC), civic coexistence, and conflict resolution.' },
            { prefix: 'Mediation & Community Management: ', text: 'Applied equity conciliation principles and consensus-building with informal vendors and community boards, preventing conflict escalation.' },
            { prefix: 'Process Efficiency & MIPG: ', text: 'Modernized reporting and official minutes, reducing consolidation times by over 70% under strict compliance with public regulatory frameworks.' }
          ]
        },
        {
          company: 'Santa Fe Local Development Fund',
          role: 'Security & Citizen Coexistence Agent',
          dates: 'Dec. 2024 – Sept. 2025',
          bullets: [
            { prefix: 'Territorial Control: ', text: 'Verification of unauthorized public space occupation and primary data collection in high-priority downtown zones.' }
          ]
        },
        {
          company: 'Avianca Express',
          role: 'Ground Operations & Safety Management System (SMS)',
          dates: '2021 – 2023',
          bullets: [
            { prefix: 'Operational Safety: ', text: 'Logistics coordination under high-demand airport operational standards with a 100% score in SMS and AVSEC audits.' }
          ]
        }
      ],
      projects: [
        { name: 'NOVUX COT Operations Manager', stack: 'Coordination Software', desc: 'Digital system for balanced shift allocation and field photographic verification across 60 agents.' },
        { name: 'Petition Rights Systematization', stack: 'Assisted LegalTech', desc: 'Automated workflows to structure technical diagnostics and timely legal responses under Law 1755 of 2015.' }
      ],
      skills: [
        { category: 'Leadership & Management', items: 'Field Personnel Coordination (60 agents), Equity Conciliation (CCB), Conflict Mediation' },
        { category: 'Public Regulatory Framework', items: 'Integrated Planning and Management Model (MIPG), Law 1801 (Police Code), Law 1755 (Petitions), SECOP II' },
        { category: 'Tools & Methods', items: 'Python for Data Processing, Advanced Excel, Looker Studio, Agile Methodologies (IBM Agile Explorer)' }
      ]
    };
  }
  return p;
});

const CERT_CATEGORY_LABELS_EN: Record<MasterCertificationItem['category'], string> = {
  LEGAL: 'Conflict Resolution & Legal',
  DATA: 'Data Science & AI',
  DEV: 'Development & Backend',
  AGILE: 'Agility & Security',
  OPER: 'Operations & Aviation',
  MKT: 'E-Commerce & Business',
  FOTO_ACAD: 'Visual Media & Education'
};

const CERT_TRANSLATIONS_EN: Record<string, { name?: string; issuer?: string; gradeOrDetail?: string; hoursDisplay?: string }> = {
  'CERT-LEGAL-01': {
    name: 'Diploma in Equity Conciliation (MASC)',
    issuer: 'Bogota Chamber of Commerce (Arbitration & Conciliation Center)',
    gradeOrDetail: '120 academic & practical hours'
  },
  'CERT-LEGAL-02': {
    name: '9th National Congress on Equity Justice',
    issuer: 'Bogota Chamber of Commerce',
    gradeOrDetail: 'Official Participation'
  },
  'CERT-LEGAL-03': {
    name: 'Anti-Extortion & Citizen Self-Protection Summit',
    issuer: 'GAULA National Police',
    gradeOrDetail: 'Security Protocols'
  },
  'CERT-DATA-07': {
    name: 'Machine Learning & Data Science with Python'
  },
  'CERT-DEV-01': {
    name: 'Python Programming Language',
    issuer: 'MinTIC & Distrital University FJC',
    gradeOrDetail: 'MinTIC Colombia Certification'
  },
  'CERT-DEV-02': {
    name: 'Beginner in Programming G7 - ONE (9 courses)',
    gradeOrDetail: 'Oracle ONE Program'
  },
  'CERT-DEV-03': {
    name: 'Programming Logic with JavaScript (3 courses)'
  },
  'CERT-DEV-04': {
    name: 'HTML & CSS: Development Environments, Structure & Tags'
  },
  'CERT-OPER-01': {
    name: 'Ground Safety Management System (SMS)',
    gradeOrDetail: 'Score: 100.00%'
  },
  'CERT-OPER-02': {
    name: 'Aviation Security (AVSEC)',
    gradeOrDetail: 'Score: 100.00%'
  },
  'CERT-OPER-03': {
    name: 'AVEX Ground Operations Familiarization',
    gradeOrDetail: 'Score: 100.00%'
  },
  'CERT-OPER-04': {
    name: 'Wheelchair Acceptance & Stowing Procedures',
    gradeOrDetail: 'Score: 85.00%'
  },
  'CERT-OPER-05': {
    name: 'Foreign Corrupt Practices Act (FCPA / Corporate Ethics)',
    gradeOrDetail: 'Corporate Ethics Approved'
  },
  'CERT-MKT-01': {
    name: 'Professional E-Commerce',
    issuer: 'Google Activate & EOI Spain',
    gradeOrDetail: 'EOI Accreditation'
  },
  'CERT-MKT-02': {
    name: 'Design a Digital Strategy for Your Business',
    issuer: 'Bogota Chamber of Commerce'
  },
  'CERT-MKT-03': {
    name: 'Digital Marketing for E-Commerce',
    issuer: 'Bogota Chamber of Commerce'
  },
  'CERT-MKT-04': {
    name: 'Workshop: Branding & Brand Management',
    issuer: 'Bogota Chamber of Commerce'
  },
  'CERT-FOTO-01': {
    name: 'Professional Photography Course: Technique & Lighting',
    issuer: 'Zona Cinco Film & Photography School'
  },
  'CERT-FOTO-02': {
    name: 'Professional Photography Course: B&W Darkroom Lab',
    issuer: 'Zona Cinco Film & Photography School'
  },
  'CERT-FOTO-03': {
    name: 'Professional Photography Course: Photoshop & Digital Editing',
    issuer: 'Zona Cinco Film & Photography School'
  },
  'CERT-ACAD-01': {
    name: 'Academic High School Diploma',
    hoursDisplay: 'Diploma',
    issuer: 'Pio X School',
    gradeOrDetail: 'Formal Secondary Education'
  }
};

export const MASTER_CERTIFICATIONS_INVENTORY_EN: MasterCertificationItem[] = MASTER_CERTIFICATIONS_INVENTORY.map((cert) => {
  const tr = CERT_TRANSLATIONS_EN[cert.code];
  return {
    ...cert,
    name: tr?.name || cert.name,
    issuer: tr?.issuer || cert.issuer,
    hoursDisplay: tr?.hoursDisplay || cert.hoursDisplay,
    gradeOrDetail: tr?.gradeOrDetail || cert.gradeOrDetail,
    categoryLabel: CERT_CATEGORY_LABELS_EN[cert.category] || cert.categoryLabel
  };
});

export function getMasterProfileData(lang: 'es' | 'en') {
  return lang === 'en' ? MASTER_PROFILE_DATA_EN : MASTER_PROFILE_DATA;
}

export function getMasterExperienceData(lang: 'es' | 'en') {
  return lang === 'en' ? MASTER_EXPERIENCE_DATA_EN : MASTER_EXPERIENCE_DATA;
}

export function getSpecializedProfiles(lang: 'es' | 'en') {
  return lang === 'en' ? SPECIALIZED_CV_PROFILES_EN : SPECIALIZED_CV_PROFILES;
}

export function getMasterCertifications(lang: 'es' | 'en') {
  return lang === 'en' ? MASTER_CERTIFICATIONS_INVENTORY_EN : MASTER_CERTIFICATIONS_INVENTORY;
}
