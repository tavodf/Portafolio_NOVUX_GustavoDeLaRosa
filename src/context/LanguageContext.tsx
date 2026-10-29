import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

export const UI_TRANSLATIONS: Translations = {
  // Top Header
  topStatus: {
    es: 'NOVUX D&D // OPERACIONES EN PRODUCCIÓN',
    en: 'NOVUX D&D // PRODUCTION OPERATIONS'
  },
  availableGlobal: {
    es: 'DISPONIBLE // BOGOTÁ D.C. & REMOTO GLOBAL',
    en: 'AVAILABLE // BOGOTA & REMOTE GLOBAL'
  },
  linkedinLabel: {
    es: 'LINKEDIN',
    en: 'LINKEDIN'
  },
  whatsappLabel: {
    es: 'WHATSAPP',
    en: 'WHATSAPP'
  },
  whatsappCorporate: {
    es: 'ATENCIÓN WHATSAPP B2B',
    en: 'B2B WHATSAPP DESK'
  },

  // Hero Section
  heroTitleBadge: {
    es: 'ARQUITECTURAS DESPLEGADAS • CASOS DE ÉXITO • MOTORES EN PRODUCCIÓN',
    en: 'DEPLOYED ARCHITECTURES • CASE STUDIES • PRODUCTION ENGINES'
  },
  heroDescription: {
    es: 'Ingeniería de software avanzada y plataformas de datos para empresas y entidades de gobierno. Convertimos operaciones complejas en sistemas automatizados de alto impacto que reducen costos y aceleran la toma de decisiones.',
    en: 'Advanced software engineering and data platforms for corporations and institutions. We transform complex operational bottlenecks into automated, high-impact systems that cut costs and accelerate decisions.'
  },
  heroBannerLeft: {
    es: '// ARQUITECTURAS DESPLEGADAS & CASOS DE ÉXITO',
    en: '// DEPLOYED ARCHITECTURES & CASE STUDIES'
  },
  heroBannerRight: {
    es: '[ SOLUCIONES DE SOFTWARE INDUSTRIAL // EN PRODUCCIÓN ]',
    en: '[ INDUSTRIAL SOFTWARE SOLUTIONS // IN PRODUCTION ]'
  },

  // Carousel & Cards
  caseBadge: {
    es: 'CASO DE ÉXITO',
    en: 'CASE STUDY'
  },
  demoActiveBadge: {
    es: '[DEMO ACTIVA ↗]',
    en: '[LIVE DEMO ↗]'
  },
  openAppHover: {
    es: 'ABRIR APP ↗',
    en: 'OPEN APP ↗'
  },
  caseCounterLabel: {
    es: 'CASO',
    en: 'CASE'
  },
  businessValueTitle: {
    es: 'VALOR PARA SU NEGOCIO & ROI:',
    en: 'BUSINESS VALUE & ROI:'
  },
  operationalBottleneckTitle: {
    es: 'EL RETO OPERATIVO QUE ELIMINA:',
    en: 'OPERATIONAL BOTTLENECK ELIMINATED:'
  },
  provenMetricTitle: {
    es: 'MÉTRICA COMPROBADA EN PRODUCCIÓN:',
    en: 'PROVEN PRODUCTION METRIC:'
  },
  replicableInfraTitle: {
    es: 'INFRAESTRUCTURA REPLICABLE A MEDIDA:',
    en: 'REPLICABLE CUSTOM INFRASTRUCTURE:'
  },
  tryLiveDemoBtn: {
    es: 'PROBAR DEMO EN VIVO ↗',
    en: 'TRY LIVE DEMO ↗'
  },
  requestCustomDevBtn: {
    es: 'SOLICITAR DESARROLLO A MEDIDA',
    en: 'REQUEST CUSTOM DEVELOPMENT'
  },
  exploreFullCaseBtn: {
    es: 'EXPLORAR CASO COMPLETO →',
    en: 'EXPLORE FULL CASE →'
  },

  // R&D Lab Section
  labBanner: {
    es: '// R&D DIVISION • LABORATORIO E INVESTIGACIÓN',
    en: '// R&D DIVISION • RESEARCH & DEVELOPMENT LAB'
  },
  labTitle: {
    es: 'LABORATORIO E INVESTIGACIÓN',
    en: 'RESEARCH & DEVELOPMENT LAB'
  },
  labDescription: {
    es: 'investigación técnica y desarrollo de productos y conceptos.',
    en: 'applied technical research, product engineering, and conceptual development.'
  },
  labBadge: {
    es: 'ESPACIO DE PROTOTIPADO Y CONCEPTUALIZACIÓN TÉCNICA',
    en: 'RAPID PROTOTYPING & APPLIED ENGINEERING SPACE'
  },
  exploreLabBtn: {
    es: 'EXPLORAR LABORATORIO',
    en: 'EXPLORE R&D LAB'
  },

  // Engineering Standards & Credentials
  standardsBanner: {
    es: '// ESTÁNDARES DE INGENIERÍA & ACREDITACIONES INSTITUCIONALES',
    en: '// ENGINEERING STANDARDS & INSTITUTIONAL ACCREDITATIONS'
  },
  standardsBadge: {
    es: '[ CERTIFICACIONES INTERNACIONALES // IBM • COURSERA ]',
    en: '[ INTERNATIONAL CERTIFICATIONS // IBM • COURSERA ]'
  },
  standardsDescription: {
    es: 'Rigor técnico comprobado: nuestras arquitecturas de backend, modelos de analítica, ciberseguridad y metodologías de entrega están avaladas bajo estándares globales de la industria.',
    en: 'Verified engineering rigor: our backend architectures, analytics pipelines, defensive cybersecurity, and delivery frameworks are certified under global industry benchmarks.'
  },

  // Blog & News Highlights
  newInBlogBadge: {
    es: 'NUEVO EN LA BITÁCORA',
    en: 'NEW IN BLOG & LOGS'
  },
  readEntryBtn: {
    es: 'Leer Entrada',
    en: 'Read Article'
  },
  newInNewsBadge: {
    es: 'NUEVO EN NOTICIAS & RADAR TECH',
    en: 'NEW IN TECH RADAR & NEWS'
  },
  exploreNewsBtn: {
    es: 'Explorar',
    en: 'Explore'
  },
  newsSectionBtn: {
    es: 'Noticias & Radar Tech',
    en: 'Tech Radar & News'
  },
  blogSectionBtn: {
    es: 'Bitácora & Ensayos',
    en: 'Engineering Blog & Papers'
  },

  // Footer
  footerRights: {
    es: 'Gustavo De La Rosa. Todos los derechos reservados.',
    en: 'Gustavo De La Rosa. All rights reserved.'
  },
  footerLocation: {
    es: 'Arquitectura de Software & Datos • Bogotá D.C. & Remoto Global',
    en: 'Software & Data Architecture • Bogota & Remote Global'
  },

  // Floating CV Button & Telemetry Modal
  cvTooltip: {
    es: 'CV // Hoja de Vida & Telemetría Laboral',
    en: 'CV // Resume & Work Telemetry'
  },
  authorBadge: {
    es: 'AUTOR & DESARROLLADOR PRINCIPAL',
    en: 'LEAD AUTHOR & DEVELOPER'
  },
  modalCadenceTitle: {
    es: 'RITMO Y CAPACIDAD OPERATIVA REAL LOGUEADA',
    en: 'VERIFIED WORK CADENCE & LOGGED OPERATING CAPACITY'
  },
  modalCompetenciesTitle: {
    es: 'COMPETENCIAS DE INGENIERÍA CON MÉTRICAS AUDITABLES',
    en: 'ENGINEERING COMPETENCIES WITH AUDITABLE METRICS'
  },
  modalStackTitle: {
    es: 'STACK TECNOLÓGICO DE PRODUCCIÓN (HERRAMIENTAS & ENTORNO)',
    en: 'PRODUCTION TECH STACK (TOOLS & ENVIRONMENT)'
  },
  tabSkills: {
    es: '1. SKILLS & RITMO',
    en: '1. SKILLS & CADENCE'
  },
  tabProjects: {
    es: '2. DASHBOARD PROYECTOS',
    en: '2. PROJECTS DASHBOARD'
  },
  tabExperience: {
    es: '3. EXP. SANTA FE',
    en: '3. TERRITORIAL EXP.'
  },
  tabCertifications: {
    es: '4. CERTIFICACIONES',
    en: '4. CERTIFICATIONS'
  },
  tabValuation: {
    es: '5. VALORACIÓN ROI',
    en: '5. ROI VALUATION'
  },

  // Service Detail Navigation
  backToHome: {
    es: 'VOLVER AL INICIO',
    en: 'BACK TO HOME'
  },
  flagshipArchitecture: {
    es: '// PROGRAMA INSIGNIA DESPLEGADO POR NOVUX',
    en: '// FLAGSHIP ARCHITECTURE DEPLOYED BY NOVUX'
  },
  keyMetricProduction: {
    es: 'MÉTRICA CLAVE COMPROBADA EN PRODUCCIÓN:',
    en: 'PROVEN PRODUCTION METRIC:'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof UI_TRANSLATIONS) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('novux_preferred_lang');
      if (saved === 'es' || saved === 'en') return saved;
      // Auto-detect browser language if non-Spanish
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      return browserLang === 'es' ? 'es' : 'en';
    } catch {
      return 'es';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('novux_preferred_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const t = (key: keyof typeof UI_TRANSLATIONS): string => {
    const item = UI_TRANSLATIONS[key];
    if (!item) return String(key);
    return item[lang] || item['es'] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
