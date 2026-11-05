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

export const MASTER_PROFILE_DATA = {
  name: 'GUSTAVO ALBERTO DE LA ROSA FLÓREZ',
  headline: 'Coordinador de Operaciones · Especialista en Automatización & Datos · Desarrollador Python',
  location: 'Bogotá D.C., Colombia',
  portfolioUrl: 'https://www.novuxops.com/',
  portfolioDisplay: 'novuxops.com',
  email: 'Gustavodlr53@gmail.com',
  phone: '+57 319 534 8320',
  phoneClean: '573195348320',
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
