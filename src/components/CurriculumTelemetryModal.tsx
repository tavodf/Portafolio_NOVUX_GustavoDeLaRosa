import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Award, Briefcase, Calculator, CheckCircle2, ChevronRight, 
  Clock, Cpu, Download, ExternalLink, FileText, Layers, ShieldCheck, 
  Sparkles, Terminal, TrendingUp, User, X, DollarSign, Send, MapPin, 
  Database, RefreshCw, Gauge, BarChart3, Layers2, Table2, LayoutGrid, CheckCircle,
  Users, Target, Zap, ArrowRight, ShieldAlert
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';
import { VERIFIED_CREDENTIALS, CREDLY_PROFILE_URL, VerifiedCredential } from './CredentialsCarousel';
import { 
  MASTER_PROFILE_DATA, 
  MASTER_EXPERIENCE_DATA, 
  MASTER_CERTIFICATIONS_INVENTORY, 
  MasterCertificationItem,
  SPECIALIZED_CV_PROFILES,
  SpecializedCvProfile,
  getMasterProfileData,
  getMasterExperienceData,
  getSpecializedProfiles,
  getMasterCertifications
} from '../cvMasterData';

type TabKey = 'TELEMETRY' | 'PROJECTS_DASHBOARD' | 'EXPERIENCE' | 'BADGES' | 'CALCULATOR';

interface ProjectTelemetryData {
  id: string;
  tag: string;
  shortName: string;
  fullName: string;
  primaryColor: string;
  secondaryColor: string;
  conceptHours: number;
  materializeHours: number;
  totalHours: number;
  badgeEfficiency: string;
  conceptDetails: string;
  materializeDetails: string;
  techStack: string[];
  deliverable: string;
}

const PROJECTS_TELEMETRY: ProjectTelemetryData[] = [
  {
    id: 'COT',
    tag: 'COT',
    shortName: 'Novux COT',
    fullName: 'Tactical Digital Twin C2 // WebGL 2.0 (demo-c2.novuxops.com)',
    primaryColor: '#00F0FF',
    secondaryColor: '#38BDF8',
    conceptHours: 68,
    materializeHours: 182,
    totalHours: 250,
    badgeEfficiency: '+66% Entrega Ágil',
    conceptDetails: 'Modelado geodésico submétrico Gauss-Haversine, cálculo de dispersión orbital y protocolos C2.',
    materializeDetails: 'Motor 3D WebGL 2.0 con Three.js Engine a 60 FPS GPU continuos, MapLibre GL y sellado criptográfico SHA-256.',
    techStack: ['WebGL 2.0', 'Three.js 3D', 'Gauss-Haversine', 'MapLibre GL', 'Hash SHA-256'],
    deliverable: 'Gemelo Digital 3D de comando en terreno con radar 360°, geoposicionamiento submétrico y cadena de custodia criptográfica.'
  },
  {
    id: 'PCD',
    tag: 'PCD',
    shortName: 'Novux PCD',
    fullName: 'Market Pricing & Trading Terminal (Adidas, Dafiti, Falabella, Éxito)',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    conceptHours: 52,
    materializeHours: 138,
    totalHours: 190,
    badgeEfficiency: '+61% Reducción Time-to-Market',
    conceptDetails: 'Formulación matemática de elasticidad de demanda, normalización unitaria dimensional ($/g, $/ml) y matching difuso.',
    materializeDetails: 'Normalizador regex dimensional, auditoría paralela multi-nodo, simulador Buy-Box y ticker dinámico en Recharts.',
    techStack: ['Python Core', 'Regex Dimensional', 'Elasticidad Dinámica', 'Recharts Ticker'],
    deliverable: 'Motor de arbitraje comercial B2B con normalización unitaria y optimización algorítmica de márgenes y Buy-Box.'
  },
  {
    id: 'ARES',
    tag: 'ARES',
    shortName: 'Novux ARES SCRAP',
    fullName: 'Resilient L7 Data Harvesting // Paper NOVUX-ENG-001',
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    conceptHours: 58,
    materializeHours: 152,
    totalHours: 210,
    badgeEfficiency: '+63% Aceleración de Pipeline',
    conceptDetails: 'Topología de recolección distribuida, contratos Pydantic fuertemente tipados y mitigación SSRF.',
    materializeDetails: 'Parser nativo en lenguaje C (libxml2) en RAM, evasión WAF L7 y FastAPI concurrente.',
    techStack: ['Python Asíncrono', 'libxml2 en RAM', 'Pydantic', 'FastAPI', 'SLA 99.98%'],
    deliverable: 'Infraestructura de extracción masiva de alta disponibilidad 24/7 y canalización a Data Lakes sin bloqueos WAF.'
  },
  {
    id: 'CPC',
    tag: 'CPC',
    shortName: 'Novux CPC',
    fullName: 'Political & LegalTech Intelligence // IDL-RADAR',
    primaryColor: '#E5A93C',
    secondaryColor: '#B45309',
    conceptHours: 62,
    materializeHours: 148,
    totalHours: 210,
    badgeEfficiency: '+62% Automatización Auditoría',
    conceptDetails: 'Modelado matemático de ordenación topológica Kahn DAG para resolución de dependencias legislativas y cruce E-14 / E-24.',
    materializeDetails: 'Hemiciclo legislativo 3D (45 curules) en Three.js, radar normativo IDL-RADAR y auditoría forense electoral automatizada.',
    techStack: ['Kahn DAG', 'Three.js 3D', 'FastAPI', 'Auditoría E-14/E-24'],
    deliverable: 'Plataforma de inteligencia política, trazabilidad legislativa sin ciclos y veeduría técnica en tiempo real.'
  },
  {
    id: 'TAZARTE',
    tag: 'TAZARTE',
    shortName: 'TazArte',
    fullName: 'E-Commerce Interactivo, Galería & Reservas Toberín',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    conceptHours: 34,
    materializeHours: 96,
    totalHours: 130,
    badgeEfficiency: '+68% Conversión Sin Fricción',
    conceptDetails: 'Arquitectura de experiencia de usuario interactiva para comercialización de arte, catálogo curado y motor de agendamiento en Toberín.',
    materializeDetails: 'Frontend reactivo de alta velocidad, galería inmersiva de alta resolución, carrito de conversión directa y flujo de reservas automatizado.',
    techStack: ['React 19', 'Tailwind CSS', 'Booking Engine', 'UX Conversión'],
    deliverable: 'Plataforma integral de comercio electrónico, exhibición digital y gestión de reservas comerciales en producción.'
  },
  {
    id: 'IA-LOCAL',
    tag: 'IA-LOCAL',
    shortName: 'Qwen 3.8-9B Local Engine',
    fullName: 'Inferencia Híbrida Vulkan (:1234 // 10.03 tok/s)',
    primaryColor: '#8B5CF6',
    secondaryColor: '#6D28D9',
    conceptHours: 44,
    materializeHours: 106,
    totalHours: 150,
    badgeEfficiency: '100% Ahorro Tokens API ($0 COP)',
    conceptDetails: 'Especificación de inferencia soberana local sin fuga de datos a nubes externas y aceleración híbrida sobre GPU/Vulkan.',
    materializeDetails: 'Servidor de inferencia local en puerto :1234 sosteniendo 10.03 tok/s, integración RAG local y eliminación del 100% en facturación de APIs externas.',
    techStack: ['Qwen 3.8-9B', 'Vulkan GPU', 'Local Server :1234', 'Zero Cloud Cost'],
    deliverable: 'Motor de Inteligencia Artificial local soberano operando a 10.03 tok/s con privacidad absoluta y costo $0 COP por token.'
  }
];

const PROJECTS_TELEMETRY_EN: ProjectTelemetryData[] = [
  {
    id: 'COT',
    tag: 'COT',
    shortName: 'Novux COT',
    fullName: 'Tactical Digital Twin C2 // WebGL 2.0 (demo-c2.novuxops.com)',
    primaryColor: '#00F0FF',
    secondaryColor: '#38BDF8',
    conceptHours: 68,
    materializeHours: 182,
    totalHours: 250,
    badgeEfficiency: '+66% Agile Delivery',
    conceptDetails: 'Sub-meter Gauss-Haversine geodesic modeling, orbital dispersion calculation, and C2 protocols.',
    materializeDetails: 'WebGL 2.0 3D engine with Three.js at sustained 60 GPU FPS, MapLibre GL, and SHA-256 cryptographic sealing.',
    techStack: ['WebGL 2.0', 'Three.js 3D', 'Gauss-Haversine', 'MapLibre GL', 'SHA-256 Hash'],
    deliverable: '3D Field Command Digital Twin with 360° radar, sub-meter geopositioning, and cryptographic chain of custody.'
  },
  {
    id: 'PCD',
    tag: 'PCD',
    shortName: 'Novux PCD',
    fullName: 'Market Pricing & Trading Terminal (Adidas, Dafiti, Falabella, Éxito)',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    conceptHours: 52,
    materializeHours: 138,
    totalHours: 190,
    badgeEfficiency: '+61% Faster Time-to-Market',
    conceptDetails: 'Mathematical demand elasticity modeling, dimensional unit normalization ($/g, $/ml), and fuzzy SKU matching.',
    materializeDetails: 'Dimensional regex normalizer, multi-node parallel auditing, Buy-Box simulator, and dynamic Recharts ticker.',
    techStack: ['Python Core', 'Dimensional Regex', 'Dynamic Elasticity', 'Recharts Ticker'],
    deliverable: 'B2B commercial arbitrage engine with unit normalization and algorithmic margin & Buy-Box optimization.'
  },
  {
    id: 'ARES',
    tag: 'ARES',
    shortName: 'Novux ARES SCRAP',
    fullName: 'Resilient L7 Data Harvesting // Paper NOVUX-ENG-001',
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    conceptHours: 58,
    materializeHours: 152,
    totalHours: 210,
    badgeEfficiency: '+63% Pipeline Acceleration',
    conceptDetails: 'Distributed harvesting topology, strongly typed Pydantic data contracts, and SSRF mitigation.',
    materializeDetails: 'Native C parser (libxml2) in RAM, L7 WAF evasion, and high-concurrency FastAPI microservices.',
    techStack: ['Async Python', 'libxml2 in RAM', 'Pydantic', 'FastAPI', '99.98% SLA'],
    deliverable: '24/7 high-availability massive extraction infrastructure streaming into Data Lakes with zero WAF blocks.'
  },
  {
    id: 'CPC',
    tag: 'CPC',
    shortName: 'Novux CPC',
    fullName: 'Political & LegalTech Intelligence // IDL-RADAR',
    primaryColor: '#E5A93C',
    secondaryColor: '#B45309',
    conceptHours: 62,
    materializeHours: 148,
    totalHours: 210,
    badgeEfficiency: '+62% Audit Automation',
    conceptDetails: 'Kahn DAG topological sorting mathematical modeling for legislative dependency resolution and E-14 / E-24 cross-auditing.',
    materializeDetails: '3D legislative chamber (45 seats) in Three.js, IDL-RADAR regulatory monitor, and automated forensic electoral auditing.',
    techStack: ['Kahn DAG', 'Three.js 3D', 'FastAPI', 'E-14/E-24 Audit'],
    deliverable: 'Political intelligence platform, cycle-free legislative traceability, and real-time technical oversight.'
  },
  {
    id: 'TAZARTE',
    tag: 'TAZARTE',
    shortName: 'TazArte',
    fullName: 'Interactive E-Commerce, Gallery & Booking Engine',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    conceptHours: 34,
    materializeHours: 96,
    totalHours: 130,
    badgeEfficiency: '+68% Frictionless Conversion',
    conceptDetails: 'Interactive UX architecture for art commercialization, curated catalog, and commercial booking engine.',
    materializeDetails: 'High-speed reactive frontend, immersive high-resolution gallery, direct conversion cart, and automated booking flow.',
    techStack: ['React 19', 'Tailwind CSS', 'Booking Engine', 'Conversion UX'],
    deliverable: 'End-to-end e-commerce platform, digital exhibition, and commercial booking management in production.'
  },
  {
    id: 'IA-LOCAL',
    tag: 'IA-LOCAL',
    shortName: 'Qwen 3.8-9B Local Engine',
    fullName: 'Hybrid Vulkan Inference (:1234 // 10.03 tok/s)',
    primaryColor: '#8B5CF6',
    secondaryColor: '#6D28D9',
    conceptHours: 44,
    materializeHours: 106,
    totalHours: 150,
    badgeEfficiency: '100% API Token Savings ($0 USD)',
    conceptDetails: 'Sovereign local inference specification with zero external cloud data leakage and hybrid GPU/Vulkan acceleration.',
    materializeDetails: 'Local inference server on port :1234 sustaining 10.03 tok/s, local RAG integration, and 100% elimination of external API billing.',
    techStack: ['Qwen 3.8-9B', 'Vulkan GPU', 'Local Server :1234', 'Zero Cloud Cost'],
    deliverable: 'Sovereign local AI engine running at 10.03 tok/s with absolute privacy and $0 cost per token.'
  }
];

// Modelos de Inversión y Retorno (ROI & Capital Optimization Engine)
interface InvestmentMode {
  id: 'FULL_TIME' | 'CONTRACTOR' | 'PARTNER';
  title: string;
  badge: string;
  targetCompensation: string;
  usdEquivalent: string;
  savingsOrAdvantage: string;
  color: string;
  keyHighlights: string[];
  operationalImpact: string;
  whatsappMessage: string;
}

const INVESTMENT_MODES: InvestmentMode[] = [
  {
    id: 'FULL_TIME',
    title: '01. EMPLEADO FULL-TIME',
    badge: 'ROL ESTRATÉGICO DIRECTO',
    targetCompensation: '$6.500.000 – $9.000.000 COP / mes',
    usdEquivalent: '$1.800 – $2.800 USD / mes (Remoto / On-site)',
    savingsOrAdvantage: '65% de Ahorro Directo (+$13.5M COP/mes ahorrados)',
    color: '#00F0FF',
    keyHighlights: [
      'Liderazgo y desarrollo unificado de pipelines de datos',
      'Propiedad intelectual 100% in-house para su organización',
      'Cero dependencia de proveedores externos costosos',
      'Despliegues ágiles sin burocracia ni intermediarios'
    ],
    operationalImpact: 'Dirección técnica in situ, optimización continua de bases de datos territoriales y comerciales, y desarrollo de nuevas líneas de producto sin requerir contratar células sobredimensionadas.',
    whatsappMessage: 'Hola Gustavo, revisé tu perfil profesional y el simulador de ROI en novuxops.com y nos interesa evaluar una vinculación como Empleado Full-Time para liderar proyectos de Datos e Inteligencia de Software.'
  },
  {
    id: 'CONTRACTOR',
    title: '02. CONTRATISTA / PRESTACIÓN DE SERVICIOS',
    badge: 'FLEXIBILIDAD & ALTO IMPACTO',
    targetCompensation: '$7.500.000 – $10.500.000 COP / mes',
    usdEquivalent: '0% Carga Prestacional / Pasivo Laboral Cero',
    savingsOrAdvantage: 'Deducción tributaria 100% como gasto operativo B2B',
    color: '#F59E0B',
    keyHighlights: [
      '2 años de trayectoria real demostrable en Santa Fe (Bogotá)',
      'Interlocución con entidades públicas y comités directivos',
      'Arquitectura de datos y ciberseguridad con entrega por hitos',
      'Cumplimiento estricto de estándares técnicos y Ley 1581/2012'
    ],
    operationalImpact: 'Agilidad de contratación inmediata, facturación directa como persona natural o jurídica, auditoría técnica estricta y entregables verificables sin generar pasivos laborales ni contingencias.',
    whatsappMessage: 'Hola Gustavo, me pongo en contacto desde novuxops.com para explorar una contratación por Prestación de Servicios / Consultoría Técnica para un sprint estratégico en nuestra entidad/empresa.'
  },
  {
    id: 'PARTNER',
    title: '03. SOCIO TECNOLÓGICO / CONSULTOR B2B',
    badge: 'ALIANZA ESTRATÉGICA & REVENUE SHARE',
    targetCompensation: '$2.800.000 – $6.500.000 COP por Sprint',
    usdEquivalent: 'O Revenue Share sobre Novux PCD, Novux COT y Novux ARES SCRAP',
    savingsOrAdvantage: 'Acceso inmediato a $68.4M COP en código pre-construido',
    color: '#10B981',
    keyHighlights: [
      'Time-to-market récord (despliegue en 2 a 4 semanas)',
      'Blindaje legal SAS con actas de confidencialidad y cesión',
      'Soporte técnico y hardening perimetral L7 continuo',
      'Ecosistema activo con más de 1.140 horas de I+D lista'
    ],
    operationalImpact: 'Lanzamiento rápido de productos de software propios o integración comercial de los motores NOVUX (Novux PCD, Novux COT y Novux ARES SCRAP) para licitar con entidades del estado o competir en mercados privados.',
    whatsappMessage: 'Hola Gustavo, me interesa coordinar una reunión ejecutiva para evaluar una alianza como Socio Tecnológico / Consultor B2B sobre las tecnologías del ecosistema NOVUX.'
  }
];

const INVESTMENT_MODES_EN: InvestmentMode[] = [
  {
    id: 'FULL_TIME',
    title: '01. FULL-TIME EMPLOYEE',
    badge: 'DIRECT STRATEGIC ROLE',
    targetCompensation: '$6,500,000 – $9,000,000 COP / mo',
    usdEquivalent: '$1,800 – $2,800 USD / mo (Remote / On-site)',
    savingsOrAdvantage: '65% Direct Savings (+$13.5M COP/mo saved)',
    color: '#00F0FF',
    keyHighlights: [
      'Unified leadership & development of data pipelines',
      '100% in-house intellectual property for your organization',
      'Zero dependency on costly external vendors',
      'Agile delivery without corporate bureaucracy'
    ],
    operationalImpact: 'On-site technical direction, continuous optimization of territorial and commercial databases, and development of new product lines without overstaffing.',
    whatsappMessage: 'Hello Gustavo, I reviewed your profile and the ROI simulator on novuxops.com and we are interested in evaluating a Full-Time position to lead Data and Software Intelligence projects.'
  },
  {
    id: 'CONTRACTOR',
    title: '02. CONTRACTOR / PROFESSIONAL SERVICES',
    badge: 'FLEXIBILITY & HIGH IMPACT',
    targetCompensation: '$7,500,000 – $10,500,000 COP / mo',
    usdEquivalent: '0% Payroll Taxes / Zero Labor Liabilities',
    savingsOrAdvantage: '100% Tax deductible as B2B operating expense',
    color: '#F59E0B',
    keyHighlights: [
      '2 years of verifiable track record in Santa Fe (Bogota)',
      'High-level dialogue with public entities and executive boards',
      'Data architecture & cybersecurity with milestone deliverables',
      'Strict compliance with technical standards and Data Law 1581'
    ],
    operationalImpact: 'Immediate hiring agility, direct B2B invoicing, strict technical auditing, and auditable deliverables without labor contingency risks.',
    whatsappMessage: 'Hello Gustavo, I am reaching out from novuxops.com to explore a Professional Services / Technical Consulting contract for a strategic sprint in our organization.'
  },
  {
    id: 'PARTNER',
    title: '03. TECH PARTNER / B2B CONSULTANT',
    badge: 'STRATEGIC ALLIANCE & REVENUE SHARE',
    targetCompensation: '$2,800,000 – $6,500,000 COP per Sprint',
    usdEquivalent: 'Or Revenue Share on Novux PCD, Novux COT, and Novux ARES SCRAP',
    savingsOrAdvantage: 'Immediate access to $68.4M COP in pre-built code',
    color: '#10B981',
    keyHighlights: [
      'Record time-to-market (deployment in 2 to 4 weeks)',
      'Corporate legal shielding with NDAs and IP assignment',
      'Continuous technical support and L7 perimeter hardening',
      'Active ecosystem with over 1,140 hours of turnkey R&D'
    ],
    operationalImpact: 'Rapid rollout of proprietary software products or commercial integration of NOVUX engines to bid on government contracts or dominate private markets.',
    whatsappMessage: 'Hello Gustavo, I would like to schedule an executive meeting to evaluate an alliance as Tech Partner / B2B Consultant on the NOVUX ecosystem.'
  }
];

export function CurriculumTelemetryModal() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('TELEMETRY');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('COT');
  const [badgeViewMode, setBadgeViewMode] = useState<'TABLE' | 'CARDS'>('TABLE');
  const [badgeFilter, setBadgeFilter] = useState<'ALL' | 'IBM' | 'COURSERA' | 'MINTIC' | 'GOOGLE'>('ALL');
  const [masterCertFilter, setMasterCertFilter] = useState<'ALL' | 'DATA' | 'DEV' | 'LEGAL' | 'OPER' | 'AGILE' | 'MKT' | 'FOTO_ACAD'>('ALL');

  // Datos adaptados al idioma activo (ES / EN)
  const masterProfile = getMasterProfileData(lang);
  const masterExperience = getMasterExperienceData(lang);
  const specializedProfiles = getSpecializedProfiles(lang);
  const masterCertifications = getMasterCertifications(lang);
  const projectsTelemetry = lang === 'en' ? PROJECTS_TELEMETRY_EN : PROJECTS_TELEMETRY;
  const investmentModes = lang === 'en' ? INVESTMENT_MODES_EN : INVESTMENT_MODES;

  const filteredMasterCertifications = masterCertifications.filter((item) => {
    if (masterCertFilter === 'ALL') return true;
    return item.category === masterCertFilter;
  });

  const handleDownloadMarkdown = () => {
    sfx.playPowerUp();
    const link = document.createElement('a');
    link.href = '/perfil-maestro-gustavo-delarosa.md';
    link.download = 'Gustavo_De_La_Rosa_Perfil_Maestro.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [selectedProfileId, setSelectedProfileId] = useState<'MASTER' | 'PERFIL_1' | 'PERFIL_2' | 'PERFIL_3' | 'PERFIL_4' | 'PERFIL_5'>('MASTER');

  const handleDownloadSpecialized = (fileUrl: string, fileName: string) => {
    sfx.playPowerUp();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Estado del Motor de Retorno de Inversión (Modalidades de Inversión y ROI)
  const [selectedInvestmentMode, setSelectedInvestmentMode] = useState<'FULL_TIME' | 'CONTRACTOR' | 'PARTNER'>('FULL_TIME');

  const handleOpen = () => {
    sfx.playWarp();
    setIsOpen(true);
  };

  const handleClose = () => {
    sfx.playBack();
    setIsOpen(false);
  };

  const handleTabChange = (tab: TabKey) => {
    sfx.playSelect();
    setActiveTab(tab);
  };

  // Totales de la 2ª Pantalla: Dashboard de Proyectos
  const totalConceptHours = projectsTelemetry.reduce((acc, p) => acc + p.conceptHours, 0);
  const totalMaterializeHours = projectsTelemetry.reduce((acc, p) => acc + p.materializeHours, 0);
  const totalCoreProjectsHours = totalConceptHours + totalMaterializeHours;
  const activeProject = projectsTelemetry.find(p => p.id === selectedProjectId) || projectsTelemetry[0];

  // Modalidades de Inversión y ROI
  const activeInvestment = investmentModes.find(m => m.id === selectedInvestmentMode) || investmentModes[0];
  const getInvestmentWhatsAppMsg = () => encodeURIComponent(activeInvestment.whatsappMessage);

  // Credenciales Verificadas Oficiales (12 Certificaciones Credly / IBM / Coursera / MinTIC / Google)
  const filteredCredentials = VERIFIED_CREDENTIALS.filter((item) => {
    if (badgeFilter === 'ALL') return true;
    if (badgeFilter === 'IBM') return item.type === 'IBM SkillsBuild';
    if (badgeFilter === 'COURSERA') return item.type === 'Coursera';
    if (badgeFilter === 'MINTIC') return item.type === 'MinTIC';
    if (badgeFilter === 'GOOGLE') return item.type === 'Google';
    return true;
  });

  // Experiencia Demostrable en Alcaldía Local de Santa Fe (5 Contratos CPS)
  const contractsList = masterExperience[0]?.cpsContracts || [];

  return (
    <>
      {/* ========================================================================= */}
      {/* DISPARADOR 3D FLOTANTE ("NOVUX C2 CURRICULUM TELEMETRY")                   */}
      {/* Ubicado verticalmente sobre el botón de WhatsApp: bottom + 85px; right: 20px*/}
      {/* ========================================================================= */}
      <div 
        style={{
          position: 'fixed',
          bottom: 'calc(env(safe-area-inset-bottom, 20px) + 85px)',
          right: '20px',
          zIndex: 50
        }}
        className="select-none pointer-events-auto font-sans"
      >
        <div className="relative group">
          {/* Tooltip Táctico Flotante */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
            <div className="bg-[#070914]/95 border border-[#00f0ff]/50 text-white text-xs font-mono px-3 py-1.5 rounded shadow-[0_0_25px_rgba(0,240,255,0.35)] backdrop-blur-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="font-bold text-[#00f0ff]">CV //</span>
              <span>{t('cvTooltip')}</span>
            </div>
          </div>

          {/* Botón Circular 3D Isométrico de CV y Telemetría */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            onMouseEnter={() => sfx.playHover()}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#060814] via-[#121329] to-[#060814] text-white shadow-[0_12px_28px_rgba(0,0,0,0.85),0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center cursor-pointer border-2 border-[#00f0ff]/80 hover:border-[#FFE066] relative transition-colors duration-300"
            aria-label="Ver Hoja de Vida y Telemetría Profesional"
          >
            {/* Brillo Isométrico Superior */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Anillo de Pulso Telemétrico */}
            <span className="absolute -inset-1 rounded-full border border-[#00f0ff]/50 animate-ping opacity-75 pointer-events-none" />

            {/* Icono Central: CV Profesional */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <FileText size={19} className="text-[#00f0ff] group-hover:text-[#FFE066] transition-colors" />
              <span className="text-[9px] font-mono uppercase font-bold text-white tracking-wider mt-0.5">CV</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL COMPLETO: DASHBOARD TÁCTICO EJECUTIVO (5 PANTALLAS)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 font-sans select-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl bg-[#060810] border border-[#00f0ff]/50 rounded-xl shadow-[0_0_70px_rgba(0,240,255,0.25)] flex flex-col max-h-[92vh] overflow-hidden text-left relative"
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#a855f7] pointer-events-none" />

              {/* Cabecera Principal del Dashboard — AVATAR HUD & PRIVACIDAD HARDENED */}
              <div className="p-4 sm:p-6 border-b border-zinc-800 bg-[#0a0d18]/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar Ejecutivo sin elementos invasivos en el rostro */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-lg p-0.5 bg-black/90 border-2 border-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.35)] overflow-hidden group">
                      <img
                        src="/assets/gustavo-congreso.jpg"
                        alt="Gustavo Alberto De La Rosa Flórez"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== '/assets/gustavo-congreso.jpg') {
                            target.src = '/assets/gustavo-congreso.jpg';
                          }
                        }}
                        className="w-full h-full object-cover rounded"
                        style={{
                          objectPosition: 'center 15%',
                          filter: 'contrast(1.08)'
                        }}
                      />
                      <div className="absolute inset-0 border border-[#00F0FF]/30 rounded pointer-events-none" />
                    </div>
                    <span className="font-mono text-[8.5px] font-bold text-[#00F0FF] tracking-wider text-center mt-1 block uppercase">
                      {lang === 'en' ? 'ANALYST & DEV' : 'ANALISTA & DEV'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 border border-[#00f0ff]/50 font-mono text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider">
                        {t('authorBadge')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === 'en' ? 'AVAILABLE // BOGOTA & REMOTE' : 'DISPONIBLE // BOGOTÁ & REMOTO'}
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      Gustavo Alberto De La Rosa Flórez
                    </h1>
                    <p className="text-xs sm:text-sm text-[#FFE066] font-mono font-medium mt-0.5">
                      {masterProfile.headline}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-[10.5px] text-zinc-300">
                      <span className="text-[#00F0FF]">{masterProfile.location}</span>
                      <span className="text-zinc-600">•</span>
                      <a href={`tel:${masterProfile.phoneClean}`} className="text-zinc-300 hover:text-white transition-colors">{masterProfile.phone}</a>
                      <span className="text-zinc-600">•</span>
                      <a href={`mailto:${masterProfile.email}`} className="text-cyan-300 hover:text-white transition-colors">{masterProfile.email}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                  {selectedProfileId === 'MASTER' ? (
                    <button
                      onClick={handleDownloadMarkdown}
                      onMouseEnter={() => sfx.playHover()}
                      className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/60 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer"
                      title={lang === 'en' ? 'Download Master Resume in Markdown (.md)' : 'Descargar Perfil Profesional Maestro en formato Markdown (.md)'}
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">{lang === 'en' ? 'DOWNLOAD' : 'DESCARGAR'}</span>
                      <span>.MD MASTER</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          const cur = specializedProfiles.find(p => p.id === selectedProfileId);
                          if (cur) handleDownloadSpecialized(cur.mdFile, cur.mdDownloadName);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/60 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        title={lang === 'en' ? 'Download specialized profile in Markdown (.md)' : 'Descargar este perfil especializado en formato Markdown (.md)'}
                      >
                        <Download size={12} />
                        <span>.MD</span>
                      </button>
                      <button
                        onClick={() => {
                          const cur = specializedProfiles.find(p => p.id === selectedProfileId);
                          if (cur) handleDownloadSpecialized(cur.docxFile, cur.docxDownloadName);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#10b981]/15 hover:bg-[#10b981]/30 border border-[#10b981]/60 text-[#10b981] hover:text-white font-mono text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        title={lang === 'en' ? 'Download specialized profile in ATS Word (.docx)' : 'Descargar este perfil especializado en formato ATS Word (.docx)'}
                      >
                        <Download size={12} />
                        <span>.DOCX ATS</span>
                      </button>
                    </div>
                  )}
                  <LanguageSwitcher />
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-red-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={lang === 'en' ? 'Close Modal' : 'Cerrar Consola'}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Barra de Navegación Canónica de las 5 Pestañas — SIGLAS TÁCTICAS COMPACTAS */}
              <div className="grid grid-cols-5 border-b border-zinc-800 bg-[#05060b] px-2 sm:px-6 gap-1 sm:gap-2">
                <button
                  onClick={() => handleTabChange('TELEMETRY')}
                  title={lang === 'en' ? 'Master Profile, 3 Strategic Pillars & Track Record' : 'Dashboard Maestro, 3 Pilares y Telemetría de Rendimiento'}
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'TELEMETRY'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Cpu size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '1 PROFILE' : '1 PERFIL'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('PROJECTS_DASHBOARD')}
                  title={lang === 'en' ? 'Projects Dashboard & Deployed Software Assets' : 'Dashboard de Proyectos y Telemetría Temporal'}
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'PROJECTS_DASHBOARD'
                      ? 'border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <BarChart3 size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '2 PROJECTS' : '2 PROYECTOS'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('EXPERIENCE')}
                  title={lang === 'en' ? 'Demonstrable Experience (Santa Fe, Avianca Express, NOVUX)' : 'Experiencia Demostrable (Santa Fe, Avianca Express, NOVUX)'}
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'EXPERIENCE'
                      ? 'border-[#FFE066] text-[#FFE066] bg-[#FFE066]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Briefcase size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '3 EXPERIENCE' : '3 TRAYECTORIA'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('BADGES')}
                  title={lang === 'en' ? 'Master Certifications Inventory (+920 Hours)' : 'Inventario Maestro de Certificaciones (+920 Horas)'}
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'BADGES'
                      ? 'border-[#a855f7] text-[#a855f7] bg-[#a855f7]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Award size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '4 CERTS (+920H)' : '4 CERT (+920H)'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('CALCULATOR')}
                  title={lang === 'en' ? 'Financial Valuation, ROI & Hiring Simulator' : 'Valoración Real, ROI & Simulador de Contratación'}
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'CALCULATOR'
                      ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Calculator size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '5 ROI & VALUE' : '5 RETORNO ROI'}</span>
                </button>
              </div>

              {/* Contenido Dinámico de las 5 Pestañas */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-sans space-y-6">

                {/* ================================================================= */}
                {/* PESTAÑA 1: DASHBOARD MAESTRO, PILARES & STACK TÉCNICO              */}
                {/* ================================================================= */}
                {activeTab === 'TELEMETRY' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* SELECTOR DE PERFILES // MASTER & 5 MATRICES ESPECIALIZADAS POR SKILL */}
                    <div className="p-3 rounded-lg bg-black/80 border border-zinc-800 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-zinc-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <Layers2 size={15} className="text-[#00F0FF]" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            {lang === 'en' ? 'SPECIALIZED RESUMES BY SKILL // ATS FORMAT (1 PAGE) & MASTER' : 'HOJAS DE VIDA POR SKILL // FORMATO ATS (1 PÁGINA) & MASTER'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {selectedProfileId === 'MASTER'
                            ? (lang === 'en' ? 'Comprehensive View: Master Profile' : 'Vista Integral: Perfil Maestro')
                            : (lang === 'en' ? `Specialized View: Profile ${selectedProfileId.replace('PERFIL_', '')}` : `Vista Especializada: Perfil ${selectedProfileId.replace('PERFIL_', '')}`)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 font-mono text-[10.5px]">
                        <button
                          type="button"
                          onClick={() => {
                            sfx.playSelect();
                            setSelectedProfileId('MASTER');
                          }}
                          className={`p-2 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedProfileId === 'MASTER'
                              ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)] font-bold'
                              : 'bg-black/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-[9px] uppercase tracking-wider text-zinc-400">GENERAL</span>
                          <span className="text-white font-bold truncate">★ MASTER CV</span>
                          <span className="text-[9px] text-[#00F0FF] mt-0.5">{lang === 'en' ? '3 Pillars + KPIs' : '3 Pilares + KPIs'}</span>
                        </button>

                        {specializedProfiles.map((p) => {
                          const isSelected = selectedProfileId === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                sfx.playSelect();
                                setSelectedProfileId(p.id as any);
                              }}
                              className={`p-2 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-white/10 font-bold shadow-sm'
                                  : 'bg-black/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                              }`}
                              style={isSelected ? { borderColor: p.primaryColor, color: p.primaryColor } : {}}
                            >
                              <span className="text-[9px] uppercase tracking-wider text-zinc-500">{lang === 'en' ? 'PROFILE' : 'PERFIL'} 0{p.number}</span>
                              <span className="text-white font-bold truncate" title={p.targetRole}>
                                {p.shortTag}
                              </span>
                              <span className="text-[9px] mt-0.5 truncate" style={{ color: p.primaryColor }}>
                                {p.targetRole}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* VISTA SEGÚN PERFIL SELECCIONADO */}
                    {selectedProfileId === 'MASTER' ? (
                      /* 0. PANEL EJECUTIVO // PERFIL PROFESIONAL MAESTRO */
                      <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-br from-[#0a0d18] via-[#070912] to-[#04060a] border border-[#00f0ff]/40 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FFE066]" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5 mb-3.5">
                          <div className="flex items-center gap-2">
                            <User size={15} className="text-[#00f0ff]" />
                            <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                              {lang === 'en' ? 'MASTER PROFESSIONAL PROFILE // MULTIDISCIPLINARY TRACK RECORD' : 'PERFIL PROFESIONAL MAESTRO // TRAYECTORIA MULTIDISCIPLINARIA'}
                            </h2>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-bold">
                              {lang === 'en' ? '1 YEAR & 11 MONTHS OPERATIONAL (2 YEARS)' : '1 AÑO Y 11 MESES A NIVEL OPERATIVO (2 AÑOS)'}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a855f7]/20 border border-[#a855f7]/50 text-[#a855f7] font-bold">
                              {lang === 'en' ? '+920H CERTIFIED TRAINING' : '+920H FORMACIÓN CONTINUA'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-[13px] text-zinc-200 font-sans leading-relaxed mb-4">
                          {masterProfile.profileSummary}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-zinc-300">
                            <span className="inline-flex items-center gap-1 text-[#00F0FF]">
                              <MapPin size={12} />
                              <span>{masterProfile.location}</span>
                            </span>
                            <span className="text-zinc-600">•</span>
                            <a href={`tel:${masterProfile.phoneClean}`} className="text-zinc-300 hover:text-white transition-colors">
                              {masterProfile.phone}
                            </a>
                            <span className="text-zinc-600">•</span>
                            <a href={`mailto:${masterProfile.email}`} className="text-cyan-300 hover:underline">
                              {masterProfile.email}
                            </a>
                          </div>

                          <button
                            onClick={handleDownloadMarkdown}
                            onMouseEnter={() => sfx.playHover()}
                            className="px-3.5 py-1.5 rounded bg-[#00F0FF]/20 hover:bg-[#00F0FF]/35 border border-[#00F0FF]/60 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <Download size={13} />
                            <span>{lang === 'en' ? 'Download Master Profile (.MD)' : 'Descargar Perfil Maestro (.MD)'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* VISTA DE PERFIL ESPECIALIZADO POR SKILL (ATS 1-PÁGINA) */
                      (() => {
                        const activeProfile = specializedProfiles.find((p) => p.id === selectedProfileId);
                        if (!activeProfile) return null;
                        return (
                          <div 
                            className="p-4 sm:p-5 rounded-lg bg-[#080b14] border shadow-lg space-y-4 animate-in fade-in duration-150"
                            style={{ borderColor: `${activeProfile.primaryColor}60` }}
                          >
                            {/* Cabecera del Perfil Especializado */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-zinc-800 pb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span 
                                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                                    style={{
                                      color: activeProfile.primaryColor,
                                      borderColor: `${activeProfile.primaryColor}50`,
                                      backgroundColor: `${activeProfile.primaryColor}15`
                                    }}
                                  >
                                    {lang === 'en' ? `SPECIALIZED PROFILE 0${activeProfile.number} // ATS (1 PAGE)` : `PERFIL ESPECIALIZADO 0${activeProfile.number} // ATS (1 PÁGINA)`}
                                  </span>
                                  <span className="text-[10.5px] font-mono text-zinc-400">
                                    {activeProfile.targetRole}
                                  </span>
                                </div>
                                <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                                  {activeProfile.titleRole}
                                </h3>
                              </div>

                              {/* Acciones de Descarga Directa */}
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleDownloadSpecialized(activeProfile.mdFile, activeProfile.mdDownloadName)}
                                  className="px-3 py-1.5 rounded bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/50 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                                  title={lang === 'en' ? 'Download Markdown version (.md)' : 'Descargar versión Markdown (.md)'}
                                >
                                  <Download size={12} />
                                  <span>{lang === 'en' ? 'Download .MD' : 'Descargar .MD'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownloadSpecialized(activeProfile.docxFile, activeProfile.docxDownloadName)}
                                  className="px-3 py-1.5 rounded bg-[#10b981]/15 hover:bg-[#10b981]/30 border border-[#10b981]/50 text-[#10b981] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                                  title={lang === 'en' ? 'Download ATS Word version (.docx)' : 'Descargar versión ATS Word (.docx)'}
                                >
                                  <Download size={12} />
                                  <span>{lang === 'en' ? 'Download .DOCX ATS' : 'Descargar .DOCX ATS'}</span>
                                </button>
                              </div>
                            </div>

                            {/* Resumen Profesional Focalizado */}
                            <div className="p-3.5 rounded bg-black/60 border border-zinc-800/80">
                              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                                {lang === 'en' ? 'FOCUSED EXECUTIVE SUMMARY:' : 'RESUMEN PROFESIONAL ENFOCADO:'}
                              </span>
                              <p className="text-xs sm:text-[12.5px] text-zinc-200 font-sans leading-relaxed">
                                {activeProfile.summary}
                              </p>
                            </div>

                            {/* Grilla: Experiencia Focalizada & Proyectos Destacados */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Experiencia Focalizada */}
                              <div className="p-3.5 rounded bg-black/60 border border-zinc-800/80 space-y-3">
                                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#FFE066] flex items-center gap-1.5">
                                  <Briefcase size={13} />
                                  <span>{lang === 'en' ? 'WORK EXPERIENCE & FIELD MANAGEMENT:' : 'EXPERIENCIA LABORAL & GESTIÓN EN CAMPO:'}</span>
                                </span>
                                <div className="space-y-3">
                                  {activeProfile.experience.map((exp, eIdx) => (
                                    <div key={eIdx} className="border-l-2 border-zinc-700 pl-2.5 space-y-1">
                                      <div className="text-xs font-bold text-white">{exp.role}</div>
                                      <div className="text-[10px] font-mono text-zinc-400">{exp.company} • {exp.dates}</div>
                                      <ul className="space-y-1 mt-1 text-[11px] text-zinc-300 font-sans">
                                        {exp.bullets.map((b, bIdx) => (
                                          <li key={bIdx} className="leading-snug">
                                            <strong className="text-zinc-100">{b.prefix}</strong> {b.text}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Proyectos Técnicos & Competencias */}
                              <div className="space-y-3">
                                <div className="p-3.5 rounded bg-black/60 border border-zinc-800/80 space-y-2.5">
                                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#38BDF8] flex items-center gap-1.5">
                                    <Cpu size={13} />
                                    <span>{lang === 'en' ? 'PRODUCTION PROJECTS & ARCHITECTURES:' : 'PROYECTOS & ARQUITECTURAS EN PRODUCCIÓN:'}</span>
                                  </span>
                                  <div className="space-y-2">
                                    {activeProfile.projects.map((proj, pIdx) => (
                                      <div key={pIdx} className="p-2 rounded bg-zinc-900/60 border border-zinc-800 text-xs">
                                        <div className="font-bold text-white flex items-center justify-between">
                                          <span>{proj.name}</span>
                                          <span className="text-[9.5px] font-mono text-emerald-400">{proj.stack}</span>
                                        </div>
                                        <p className="text-[11px] text-zinc-300 mt-1 leading-snug">{proj.desc}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-3.5 rounded bg-black/60 border border-zinc-800/80">
                                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#A855F7] flex items-center gap-1.5 mb-2">
                                    <Terminal size={13} />
                                    <span>{lang === 'en' ? 'CORE ROLE COMPETENCIES:' : 'COMPETENCIAS CLAVE DEL ROL:'}</span>
                                  </span>
                                  <div className="space-y-1.5">
                                    {activeProfile.skills.map((sk, sIdx) => (
                                      <div key={sIdx} className="text-[11px] font-sans">
                                        <strong className="text-zinc-200 font-mono text-[10px] uppercase block sm:inline sm:mr-1">
                                          • {sk.category}:
                                        </strong>
                                        <span className="text-zinc-300">{sk.items}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {/* KPI STATS GRID (7 INDICADORES) */}
                    <div>
                      <div className="border-b border-zinc-800 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Gauge size={14} className="text-[#FFE066]" />
                          <span>{lang === 'en' ? 'CONSOLIDATED KEY METRICS (DATA & OPERATIONS)' : 'MÉTRICAS CLAVE CONSOLIDADAS (DATA & OPERACIONES)'}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 font-mono">
                        {masterProfile.kpiStats.map((kpi, idx) => (
                          <div 
                            key={idx} 
                            className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                          >
                            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block mb-1 leading-tight">
                              {kpi.label}
                            </span>
                            <div className="text-sm sm:text-[15px] font-bold leading-tight" style={{ color: kpi.color }}>
                              {kpi.value}
                            </div>
                            <span className="text-[9.5px] text-zinc-400 font-sans mt-1 leading-tight">
                              {kpi.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LOS 3 PILARES ESTRATÉGICOS MAESTROS */}
                    <div>
                      <div className="border-b border-zinc-800 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Layers size={14} className="text-[#00F0FF]" />
                          <span>{lang === 'en' ? 'THE THREE STRATEGIC CAREER PILLARS' : 'LOS TRES PILARES ESTRATÉGICOS DE TRAYECTORIA'}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-sans">
                        {masterProfile.pillars.map((pillar) => (
                          <div 
                            key={pillar.id}
                            className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
                            style={{ borderTopColor: pillar.color, borderTopWidth: '2px' }}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span 
                                  className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border"
                                  style={{
                                    color: pillar.color,
                                    borderColor: `${pillar.color}40`,
                                    backgroundColor: `${pillar.color}15`
                                  }}
                                >
                                  {pillar.badge}
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                                  {pillar.metrics}
                                </span>
                              </div>

                              <h3 className="font-serif text-sm font-bold text-white mb-0.5">
                                {pillar.title}
                              </h3>
                              <p className="text-[11px] font-mono text-[#FFE066] mb-2">
                                {pillar.subtitle}
                              </p>
                              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                                {pillar.description}
                              </p>

                              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                                {pillar.bullets.map((bullet, bIdx) => (
                                  <div key={bIdx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MATRIZ DE COMPETENCIAS TÉCNICAS */}
                    <div className="p-4 rounded-lg bg-[#070912] border border-zinc-800">
                      <div className="border-b border-zinc-800 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle size={14} className="text-[#10b981]" />
                          <span>{lang === 'en' ? 'VERIFIED TECHNICAL SKILLS & COMPETENCIES' : 'HABILIDADES Y COMPETENCIAS TÉCNICAS VERIFICADAS'}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                        {/* Liderazgo */}
                        <div className="p-3 rounded bg-black/50 border border-zinc-800/80">
                          <span className="font-mono text-[11px] font-bold text-[#00F0FF] block mb-2 uppercase">
                            • {lang === 'en' ? 'Leadership & Operations' : 'Liderazgo & Operaciones'}
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {masterProfile.competencies.operations.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#00F0FF]">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Datos & Programación */}
                        <div className="p-3 rounded bg-black/50 border border-zinc-800/80">
                          <span className="font-mono text-[11px] font-bold text-[#FFE066] block mb-2 uppercase">
                            • {lang === 'en' ? 'Data & Programming' : 'Datos & Programación'}
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {masterProfile.competencies.programming.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#FFE066]">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Estrategia & Negocios */}
                        <div className="p-3 rounded bg-black/50 border border-zinc-800/80">
                          <span className="font-mono text-[11px] font-bold text-[#10b981] block mb-2 uppercase">
                            • {lang === 'en' ? 'Strategy & Business' : 'Estrategia & Negocios'}
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {masterProfile.competencies.strategy.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#10b981]">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* 1. TELEMETRÍA DE RITMO Y CAPACIDAD OPERATIVA DE TRABAJO */}
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Clock size={14} className="text-[#00f0ff]" />
                          <span>{lang === 'en' ? 'WORK CADENCE & OPERATIONAL CAPACITY (LOGGED TELEMETRY)' : 'RITMO DE PRODUCCIÓN Y CAPACIDAD LABORAL (TELEMETRÍA REAL)'}</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                          {lang === 'en' ? 'IMMEDIATE AVAILABILITY' : 'DISPONIBILIDAD INMEDIATA'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                        {/* Semanal */}
                        <div className="p-3.5 rounded-lg bg-[#0a0d18] border border-[#00f0ff]/40">
                          <span className="text-[9.5px] text-zinc-400 uppercase block mb-1">
                            {lang === 'en' ? 'SUSTAINED WEEKLY CADENCE:' : 'RITMO SEMANAL SOSTENIDO:'}
                          </span>
                          <div className="text-2xl font-bold text-[#00f0ff]">
                            44h – 48h <span className="text-xs text-zinc-400 font-normal">/ {lang === 'en' ? 'wk' : 'sem'}</span>
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans mt-1.5 leading-snug">
                            {lang === 'en'
                              ? 'Intensive engineering of ETL pipelines, backend architecture, automated scripting, and field telemetry.'
                              : 'Desarrollo intensivo de pipelines ETL, lógica de backend, scripting automatizado y monitoreo de campo.'}
                          </p>
                        </div>

                        {/* Mensual */}
                        <div className="p-3.5 rounded-lg bg-[#0a0d18] border border-[#FFE066]/40">
                          <span className="text-[9.5px] text-zinc-400 uppercase block mb-1">
                            {lang === 'en' ? 'MONTHLY TECHNICAL OUTPUT:' : 'PRODUCCIÓN TÉCNICA MENSUAL:'}
                          </span>
                          <div className="text-2xl font-bold text-[#FFE066]">
                            ~180h – 195h <span className="text-xs text-zinc-400 font-normal">/ {lang === 'en' ? 'mo' : 'mes'}</span>
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans mt-1.5 leading-snug">
                            {lang === 'en'
                              ? 'Delivery of critical features, database incident resolution, and continuous solution deployment.'
                              : 'Entrega de features críticas, resolución de incidencias en bases de datos y despliegue de soluciones.'}
                          </p>
                        </div>

                        {/* Anual */}
                        <div className="p-3.5 rounded-lg bg-[#0a0d18] border border-[#10b981]/40">
                          <span className="text-[9.5px] text-zinc-400 uppercase block mb-1">
                            {lang === 'en' ? 'ANNUAL OPERATING VOLUME:' : 'CAPACIDAD OPERATIVA ANUAL:'}
                          </span>
                          <div className="text-2xl font-bold text-[#10b981]">
                            +2,160h <span className="text-xs text-zinc-400 font-normal">/ {lang === 'en' ? 'yr' : 'año'}</span>
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans mt-1.5 leading-snug">
                            {lang === 'en'
                              ? 'Demonstrable contractual track record in the public sector and ongoing proprietary software development.'
                              : 'Trayectoria contractual demostrable en el sector público (Santa Fe) y desarrollo continuo de software propio.'}
                          </p>
                        </div>
                      </div>

                      {/* Banner de Impacto de Automatización */}
                      <div className="mt-3 p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                        <span className="text-zinc-300 flex items-center gap-1.5">
                          <Zap size={13} className="text-emerald-400" />
                          <span>{lang === 'en' ? 'PROCESS EFFICIENCY IMPACT:' : 'IMPACTO EN EFICIENCIA DE PROCESOS:'}</span>
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {lang === 'en'
                            ? '>70% Reduction in report consolidation time through automated Python pipelines'
                            : '>70% Reducción en tiempos de reporte manual mediante scripts en Python'}
                        </span>
                      </div>
                    </div>

                    {/* 2. SKILLS TÉCNICAS CON MÉTRICAS AUDITABLES Y VERIFICABLES */}
                    <div className="space-y-3">
                      <div className="border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Target size={14} className="text-[#FFE066]" />
                          <span>{lang === 'en' ? 'CORE COMPETENCIES WITH PRODUCTION OUTCOME METRICS' : 'COMPETENCIAS CLAVE CON MÉTRICAS DE RESULTADOS EN PRODUCCIÓN'}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-sans">
                        {/* Skill 1: Data Engineering */}
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-[#00f0ff]/50 transition-colors">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-xs font-bold text-[#00f0ff]">
                              {lang === 'en' ? 'DATA ENGINEERING & ETL PIPELINES' : 'INGENIERÍA DE DATOS & PIPELINES ETL'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              {lang === 'en' ? '+131K RECORDS' : '+131K REGISTROS'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                            {lang === 'en'
                              ? 'Design and deployment of ingestion, cleaning, and sanitization pipelines for territorial and commercial data. Query latency optimized to <180ms via spatial indexing in PostgreSQL/PostGIS.'
                              : 'Diseño y ejecución de pipelines de absorción, limpieza y depuración de datos territoriales y comerciales. Latencia de consulta optimizada a <180ms mediante indexación espacial en PostgreSQL/PostGIS.'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(lang === 'en'
                              ? ['Python Core', 'PostgreSQL / PostGIS', 'Pandas', 'Pydantic', 'Asyncio', 'Automated ETL']
                              : ['Python Core', 'PostgreSQL / PostGIS', 'Pandas', 'Pydantic', 'Asyncio', 'ETL Automatizado']
                            ).map((t, idx) => (
                              <span key={idx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Skill 2: Scraping & Harvesting */}
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-red-400/50 transition-colors">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-xs font-bold text-red-400">
                              {lang === 'en' ? 'WEB SCRAPING & MARKET INTELLIGENCE' : 'WEB SCRAPING & MINERÍA DE MERCADO'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              99.98% UPTIME
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                            {lang === 'en'
                              ? 'Continuous commercial data collection infrastructure across domains shielded by Cloudflare and anti-bot systems. Native C parser (libxml2) in RAM for minimal resource footprint and zero blocks.'
                              : 'Infraestructura de recolección continua de datos comerciales sobre sitios protegidos por Cloudflare/DataDome. Parser nativo en C (libxml2) en memoria RAM para consumo mínimo de recursos y 0 bloqueos.'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(lang === 'en'
                              ? ['libxml2 in RAM', 'Selenium Headless', 'FastAPI', 'Stealth Proxies', 'L7 Data Lake']
                              : ['libxml2 en RAM', 'Selenium Headless', 'FastAPI', 'Stealth Proxies', 'Data Lake L7']
                            ).map((t, idx) => (
                              <span key={idx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Skill 3: Frontend & 3D WebGL */}
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-[#38bdf8]/50 transition-colors">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-xs font-bold text-[#38bdf8]">
                              {lang === 'en' ? 'REACT FRONTEND & INTERACTIVE 3D VISUALIZATION' : 'FRONTEND REACT & VISUALIZACIÓN INTERACTIVA'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              {lang === 'en' ? 'SUSTAINED 60 FPS' : '60 FPS CONSTANTES'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                            {lang === 'en'
                              ? 'Engineering high-speed analytical dashboards and executive interfaces in React 19 and TypeScript. Digital twins and 3D hemicycles rendered at stable 60 FPS over WebGL 2.0 and Three.js.'
                              : 'Construcción de interfaces tácticas y tableros analíticos de alta velocidad en React 19 y TypeScript. Gemelos digitales y hemiciclos 3D renderizados a 60 FPS estables sobre WebGL 2.0 y Three.js.'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {['React 19', 'TypeScript', 'Three.js 3D', 'WebGL 2.0', 'Vite 8', 'Tailwind CSS'].map((t, idx) => (
                              <span key={idx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Skill 4: Territorial & BI */}
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-emerald-400/50 transition-colors">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-xs font-bold text-emerald-400">
                              {lang === 'en' ? 'BUSINESS INTELLIGENCE & TERRITORIAL ANALYTICS' : 'BUSINESS INTELLIGENCE & ANALÍTICA TERRITORIAL'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              {lang === 'en' ? '245K m² AUDITED' : '245K m² AUDITADOS'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                            {lang === 'en'
                              ? 'Hands-on field experience coordinating operational crews and centralizing +131,000 logs in Looker Studio dashboards with sub-meter geocoding for leadership decision-making.'
                              : 'Experiencia real en campo coordinando equipos y centralizando más de 131.000 reportes en cuadros de mando de Looker Studio con georreferenciación sub-métrica para decisiones gerenciales.'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(lang === 'en'
                              ? ['Looker Studio', 'Territorial Analytics', 'Geocoding', 'Institutional Auditing']
                              : ['Looker Studio', 'Analítica Territorial', 'Georreferenciación', 'Auditoría Institucional']
                            ).map((t, idx) => (
                              <span key={idx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. STACK TECNOLÓGICO DOMINADO (ORGANIZADO POR CAPAS PROFESIONALES) */}
                    <div className="space-y-3">
                      <div className="border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal size={14} className="text-[#a855f7]" />
                          <span>{lang === 'en' ? 'PRODUCTION TECH STACK (TOOLS & ENVIRONMENT)' : 'STACK TECNOLÓGICO DE PRODUCCIÓN (HERRAMIENTAS & ENTORNO)'}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
                        {/* Capa 1 */}
                        <div className="p-3 rounded bg-[#0a0d18] border border-zinc-800">
                          <span className="text-[10px] text-[#00f0ff] font-bold block mb-1.5">{lang === 'en' ? 'CORE LANGUAGES:' : 'LENGUAJES CORE:'}</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px]">
                            <li>• {lang === 'en' ? 'Python (Advanced)' : 'Python (Avanzado)'}</li>
                            <li>• SQL (PostgreSQL)</li>
                            <li>• TypeScript / JS</li>
                            <li>• {lang === 'en' ? 'C (native libxml2)' : 'C (libxml2 nativo)'}</li>
                          </ul>
                        </div>

                        {/* Capa 2 */}
                        <div className="p-3 rounded bg-[#0a0d18] border border-zinc-800">
                          <span className="text-[10px] text-[#FFE066] font-bold block mb-1.5">FRAMEWORKS &amp; UI:</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px]">
                            <li>• React 19 &amp; Vite 8</li>
                            <li>• Three.js (WebGL 2.0)</li>
                            <li>• Tailwind CSS</li>
                            <li>• Recharts / D3.js</li>
                          </ul>
                        </div>

                        {/* Capa 3 */}
                        <div className="p-3 rounded bg-[#0a0d18] border border-zinc-800">
                          <span className="text-[10px] text-emerald-400 font-bold block mb-1.5">BACKEND &amp; DATA:</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px]">
                            <li>• FastAPI &amp; Asyncio</li>
                            <li>• Pandas &amp; NumPy</li>
                            <li>• {lang === 'en' ? 'Spatial PostGIS' : 'PostGIS Espacial'}</li>
                            <li>• Selenium &amp; Pydantic</li>
                          </ul>
                        </div>

                        {/* Capa 4 */}
                        <div className="p-3 rounded bg-[#0a0d18] border border-zinc-800">
                          <span className="text-[10px] text-[#a855f7] font-bold block mb-1.5">{lang === 'en' ? 'TOOLS & AI:' : 'HERRAMIENTAS & IA:'}</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px]">
                            <li>• Git &amp; GitHub</li>
                            <li>• Looker Studio BI</li>
                            <li>• Qwen Local (Vulkan)</li>
                            <li>• Linux / Bash CLI</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'PROJECTS_DASHBOARD' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* Header del Dashboard Táctico */}
                    <div className="p-4 rounded-lg bg-[#070914] border border-[#38bdf8]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 size={15} className="text-[#38bdf8]" />
                          <h3 className="font-mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                            {lang === 'en' ? 'PROJECT TELEMETRY DASHBOARD // 6 PRODUCTION ARCHITECTURES' : 'DASHBOARD DE TELEMETRÍA TEMPORAL // 6 PROYECTOS & ARQUITECTURAS EN PRODUCCIÓN'}
                          </h3>
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {lang === 'en'
                            ? <span>Logged hours of <b>Logical Architecture &amp; Design</b> vs. <b>Code Writing &amp; Deployment</b> across the 6 developed software solutions.</span>
                            : <span>Registro de horas reales de <b>Arquitectura &amp; Diseño Lógico</b> vs. <b>Escritura de Código &amp; Despliegue</b> en las 6 soluciones de software desarrolladas.</span>}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-[10.5px]">
                        <span className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 px-2 py-1 rounded font-bold">
                          {lang === 'en' ? 'DEPLOYMENT AUDIT: 100% IN PRODUCTION' : 'AUDITORÍA DE DESPLIEGUE: 100% EN PRODUCCIÓN'}
                        </span>
                      </div>
                    </div>

                    {/* Resumen Superior de Indicadores KPI */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-zinc-500 block uppercase">
                          {lang === 'en' ? 'TOTAL CORE HOURS:' : 'TOTAL HORAS CORE:'}
                        </span>
                        <strong className="text-white text-lg font-bold block mt-0.5">{totalCoreProjectsHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">
                          {lang === 'en' ? '6 Proprietary Engineering Units' : '6 Unidades de Ingeniería Propietarias'}
                        </span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-[#FFE066] block uppercase">
                          {lang === 'en' ? 'ARCHITECTURE & DESIGN:' : 'CONCEPTUALIZACIÓN:'}
                        </span>
                        <strong className="text-[#FFE066] text-lg font-bold block mt-0.5">{totalConceptHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">
                          {lang === 'en' ? '27.9% Logic & Design in Gemini/NotebookLM' : '27.9% Arquitectura & Lógica en Gemini/NotebookLM'}
                        </span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-[#00f0ff] block uppercase">
                          {lang === 'en' ? 'CODE & DEPLOYMENT:' : 'MATERIALIZACIÓN:'}
                        </span>
                        <strong className="text-[#00f0ff] text-lg font-bold block mt-0.5">{totalMaterializeHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">
                          {lang === 'en' ? '72.1% Code, L7 Scraping & Hardening in Antigravity' : '72.1% Código, Scraping L7 & Hardening en Antigravity'}
                        </span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-emerald-400 block uppercase">
                          {lang === 'en' ? 'GLOBAL EFFICIENCY:' : 'EFICIENCIA GLOBAL:'}
                        </span>
                        <strong className="text-emerald-400 text-lg font-bold block mt-0.5">+64.8%</strong>
                        <span className="text-[9.5px] text-zinc-400">
                          {lang === 'en' ? '2.78M RAG Tokens • 148 WIP=1 Pins' : '2.78M Tokens RAG • 148 Pines WIP=1'}
                        </span>
                      </div>
                    </div>

                    {/* GRÁFICA COMPARATIVA DE HORAS Y CAPACIDAD */}
                    <div className="p-4 rounded-lg bg-[#070912] border border-zinc-800 relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2 mb-4 font-mono text-xs">
                        <span className="text-white font-bold flex items-center gap-1.5">
                          <Layers2 size={13} className="text-[#38bdf8]" />
                          <span>
                            {lang === 'en'
                              ? 'HOUR ALLOCATION PER SYSTEM: ARCHITECTURE & DESIGN VS. CODE & DEPLOYMENT'
                              : 'DISTRIBUCIÓN DE HORAS POR UNIDAD: CONCEPTUALIZACIÓN VS. MATERIALIZACIÓN'}
                          </span>
                        </span>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1 text-[#FFE066]">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#FFE066]/80" />
                            <span>{lang === 'en' ? 'Architecture & Logic' : 'Conceptualización'}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[#00f0ff]">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#00f0ff]/80" />
                            <span>{lang === 'en' ? 'Code & Deployment' : 'Materialización'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Visualizador de Barras Horizontales Tácticas */}
                      <div className="space-y-3 font-mono">
                        {projectsTelemetry.map((p) => {
                          const isSelected = selectedProjectId === p.id;
                          const maxHours = 250; // Escala máxima normalizada
                          const conceptWidthPct = (p.conceptHours / maxHours) * 100;
                          const materializeWidthPct = (p.materializeHours / maxHours) * 100;

                          return (
                            <div 
                              key={p.id}
                              onClick={() => {
                                sfx.playSelect();
                                setSelectedProjectId(p.id);
                              }}
                              className={`p-2.5 rounded transition-all cursor-pointer border ${
                                isSelected 
                                  ? 'bg-[#0e1224] border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.2)]' 
                                  : 'bg-black/50 border-zinc-900 hover:border-zinc-700'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-1.5 gap-1">
                                <div className="flex items-center gap-2">
                                  <span 
                                    className="px-1.5 py-0.2 rounded text-[10px] font-bold border"
                                    style={{
                                      color: p.primaryColor,
                                      borderColor: `${p.primaryColor}50`,
                                      backgroundColor: `${p.primaryColor}15`
                                    }}
                                  >
                                    [{p.tag}]
                                  </span>
                                  <span className={`font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                    {p.shortName}
                                  </span>
                                  <span className="text-[10px] text-zinc-500 hidden md:inline truncate max-w-xs">
                                    — {p.fullName}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                                  <span>{lang === 'en' ? 'Arch:' : 'Concepto:'} <b className="text-[#FFE066]">{p.conceptHours}h</b></span>
                                  <span>{lang === 'en' ? 'Code:' : 'Código:'} <b className="text-[#00f0ff]">{p.materializeHours}h</b></span>
                                  <span className="text-white font-bold">Total: {p.totalHours}h</span>
                                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                                    {p.badgeEfficiency}
                                  </span>
                                </div>
                              </div>

                              {/* Barra Apilada Visual */}
                              <div className="w-full h-3 bg-zinc-950 rounded overflow-hidden flex border border-zinc-800">
                                <div 
                                  style={{ width: `${conceptWidthPct}%` }}
                                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                                  title={`${lang === 'en' ? 'Architecture & Design' : 'Conceptualización'}: ${p.conceptHours}h`}
                                />
                                <div 
                                  style={{ 
                                    width: `${materializeWidthPct}%`,
                                    backgroundColor: p.primaryColor
                                  }}
                                  className="h-full opacity-90 transition-all duration-500"
                                  title={`${lang === 'en' ? 'Code & Deployment' : 'Materialización'}: ${p.materializeHours}h`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SELECTOR Y PANEL DE DETALLE DE LA UNIDAD ACTIVA */}
                    <div className="p-4 rounded-lg bg-[#070914] border border-zinc-800 text-left space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                            style={{
                              color: activeProject.primaryColor,
                              borderColor: `${activeProject.primaryColor}50`,
                              backgroundColor: `${activeProject.primaryColor}15`
                            }}
                          >
                            [{activeProject.tag}] // {lang === 'en' ? 'PROPRIETARY SYSTEM' : 'SISTEMA PROPIETARIO'}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-white">
                            {activeProject.shortName}: {activeProject.fullName}
                          </h4>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                          {activeProject.badgeEfficiency}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="font-mono text-[10px] text-[#FFE066] font-bold block mb-1">
                            {lang === 'en' ? `PHASE 1: LOGICAL ARCHITECTURE (${activeProject.conceptHours} Hours)` : `FASE 1: CONCEPTUALIZACIÓN LÓGICA (${activeProject.conceptHours} Horas)`}
                          </span>
                          <p className="text-zinc-300 leading-relaxed">
                            {activeProject.conceptDetails}
                          </p>
                        </div>

                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="font-mono text-[10px] text-[#00f0ff] font-bold block mb-1">
                            {lang === 'en' ? `PHASE 2: CODE & HARDENING (${activeProject.materializeHours} Hours)` : `FASE 2: MATERIALIZACIÓN & HARDENING (${activeProject.materializeHours} Horas)`}
                          </span>
                          <p className="text-zinc-300 leading-relaxed">
                            {activeProject.materializeDetails}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded bg-black/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-zinc-500 block uppercase mb-1">
                            {lang === 'en' ? 'PRODUCTION-VALIDATED DELIVERABLE:' : 'ENTREGABLE VALIDADO EN PRODUCCIÓN:'}
                          </span>
                          <span className="text-zinc-200 font-sans font-medium">
                            {activeProject.deliverable}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 shrink-0">
                          {activeProject.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 3: EXPERIENCIA DEMOSTRABLE (ALCALDÍA LOCAL SANTA FE)       */}
                {/* ================================================================= */}
                {activeTab === 'EXPERIENCE' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* ENTIDAD 1: ALCALDÍA LOCAL DE SANTA FE */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#0e101a] border border-[#FFE066]/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#FFE066]" />
                          <div>
                            <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                              {lang === 'en'
                                ? 'Santa Fe Local Development Fund (Santa Fe Mayor\'s Office)'
                                : 'Fondo de Desarrollo Local de Santa Fe (Alcaldía Local de Santa Fe)'}
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {lang === 'en'
                                ? 'Bogota D.C., Colombia • Official Filing No. 20265320571351'
                                : 'Bogotá D.C., Colombia • Radicado Oficial No. 20265320571351'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#FFE066] font-bold bg-[#FFE066]/10 border border-[#FFE066]/30 px-2.5 py-1 rounded w-fit">
                          {lang === 'en' ? 'Total: 1 Year, 11 Months & 11 Days' : 'Total: 1 Año, 11 Meses y 11 Días'}
                        </span>
                      </div>

                      {/* Roles en Santa Fe */}
                      <div className="space-y-3.5">
                        {/* Rol 1: Coordinador y Analista */}
                        <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="text-sm font-serif font-bold text-white">
                              {lang === 'en'
                                ? 'Technical Operations Coordinator & Territorial Data Analyst'
                                : 'Coordinador Técnico Operativo & Analista de Datos Territorial'}
                            </h4>
                            <span className="text-[10.5px] font-mono text-[#FFE066] font-bold">
                              {lang === 'en' ? 'December 2024 – Present' : 'Diciembre 2024 – Actualidad'}
                            </span>
                          </div>
                          <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              {lang === 'en' ? (
                                <span><strong className="text-white">Human &amp; Territorial Leadership:</strong> Coordinated 60 field agents for Inspection, Surveillance, and Control (IVC), civic coexistence, and public space recovery across UPZ 91, 92, and 93 (urban corridor with over 1.2M daily commuting population).</span>
                              ) : (
                                <span><strong className="text-white">Liderazgo Humano y Territorial:</strong> Coordiné en terreno a 60 gestores territoriales para acciones de Inspección, Vigilancia y Control (IVC), convivencia ciudadana y recuperación de espacio público en las UPZ 91, 92 y 93 (área con más de 1.2M de población flotante diaria).</span>
                              )}
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              {lang === 'en' ? (
                                <span><strong className="text-white">Data Engineering &amp; ETL Automation:</strong> Designed and implemented Python pipelines (Pandas, Regex) that processed and structured over 131,000 unstructured operational interactions and audited the recovery of 245,000 m² of public space, reducing technical consolidation times by over 70%.</span>
                              ) : (
                                <span><strong className="text-white">Ingeniería de Datos y Automatización ETL:</strong> Diseñé e implementé pipelines en Python (Pandas, Regex) que procesaron y estructuraron más de 131.000 interacciones operativas no estructuradas y auditaron la recuperación de 245.000 m² de espacio público, reduciendo los tiempos de consolidación técnica en más de un 70%.</span>
                              )}
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              {lang === 'en' ? (
                                <span><strong className="text-white">BI Monitoring &amp; Data Quality (MIPG):</strong> Structured sanitization matrices that reduced operational inconsistencies from 8,000 raw records to 5,000 clean entries and built Looker Studio &amp; Advanced Excel dashboards for institutional decision-making.</span>
                              ) : (
                                <span><strong className="text-white">Monitoreo BI &amp; Calidad de Datos (MIPG):</strong> Estructuré matrices de depuración que redujeron inconsistencias operativas de 8.000 a 5.000 registros saneados y desarrollé tableros en Looker Studio y Excel Avanzado para la toma de decisiones en mesas institucionales.</span>
                              )}
                            </li>
                          </ul>
                        </div>

                        {/* Rol 2: Gestor */}
                        <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="text-sm font-serif font-bold text-white">
                              {lang === 'en'
                                ? 'Security & Citizen Coexistence Agent'
                                : 'Gestor de Seguridad y Convivencia Ciudadana'}
                            </h4>
                            <span className="text-[10.5px] font-mono text-zinc-400">
                              {lang === 'en' ? 'December 2024 – September 2025' : 'Diciembre 2024 – Septiembre 2025'}
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              {lang === 'en' ? (
                                <span><strong className="text-white">Field Inspection &amp; Mediation:</strong> Direct execution of verification tours and community mediation to preserve public order, field census, and prevention of unauthorized occupation.</span>
                              ) : (
                                <span><strong className="text-white">Inspección en Terreno y Mediación:</strong> Ejecución directa de recorridos de verificación y mediación comunitaria para la preservación del orden, censo en campo y prevención de ocupaciones indebidas.</span>
                              )}
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              {lang === 'en' ? (
                                <span><strong className="text-white">Primary Data Collection:</strong> Street-level data gathering and systematization that fed preventive risk diagnostics and territorial risk maps.</span>
                              ) : (
                                <span><strong className="text-white">Levantamiento de Información Primaria:</strong> Recolección y sistematización de datos en calle que nutrieron los diagnósticos preventivos y mapas de riesgo territorial de la localidad.</span>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Desglose de los 5 Contratos CPS */}
                      <div className="pt-2">
                        <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                          {lang === 'en' ? 'CONTRACTUAL TRACEABILITY BY CPS (5 AUDITABLE PHASES):' : 'TRAZABILIDAD CONTRACTUAL POR CPS (5 FASES AUDITABLES):'}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                          {contractsList.map((c, idx) => (
                            <div key={idx} className="p-2.5 rounded bg-black/70 border border-zinc-800/80 text-left flex flex-col justify-between">
                              <div>
                                <div className="text-[11px] font-mono font-bold text-[#FFE066]">{c.code}</div>
                                <div className="text-[9.5px] font-mono text-zinc-400 mb-1">{c.period}</div>
                                <div className="text-[10px] font-bold text-white mb-1 leading-snug">{c.role}</div>
                                <div className="text-[9.5px] text-zinc-300 leading-snug line-clamp-3">{c.impact}</div>
                              </div>
                              <div className="text-[9px] font-mono text-emerald-400 mt-1.5 pt-1 border-t border-zinc-800/80 truncate">{c.tag}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ENTIDAD 2: AVIANCA EXPRESS */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#0a0d18] border border-[#00f0ff]/40 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-[#00f0ff]" />
                          <div>
                            <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                              {lang === 'en'
                                ? 'Avianca Express | El Dorado International Airport'
                                : 'Avianca Express | Aeropuerto Internacional El Dorado'}
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {lang === 'en'
                                ? 'Bogota D.C., Colombia • High-Precision Aviation Operations'
                                : 'Bogotá D.C., Colombia • Operaciones Aeronáuticas de Alta Precisión'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#00f0ff] font-bold bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2.5 py-1 rounded w-fit">
                          2021 – 2023
                        </span>
                      </div>

                      <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="text-sm font-serif font-bold text-white">
                            {lang === 'en'
                              ? 'Ground Operations, Operational Safety (SMS) & Compliance'
                              : 'Operaciones Terrestres, Seguridad Operacional (SMS) & Cumplimiento'}
                          </h4>
                          <span className="text-[10.5px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            {lang === 'en' ? '100.00% SMS / AVSEC SCORE' : 'CALIFICACIÓN 100.00% SMS / AVSEC'}
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                          <li className="flex items-start gap-2">
                            <span className="text-[#00f0ff] font-bold mt-0.5">•</span>
                            {lang === 'en' ? (
                              <span><strong className="text-white">Operational Safety (SMS):</strong> Strict management of ramp safety protocols and ground operations under international aviation standards, certified with a 100.00% score in Safety Management Systems.</span>
                            ) : (
                              <span><strong className="text-white">Seguridad Operacional (SMS):</strong> Gestión estricta de protocolos de seguridad en rampa y operaciones terrestres bajo estándares aeronáuticos internacionales, certificado con calificación de 100.00% en Safety Management System.</span>
                            )}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#00f0ff] font-bold mt-0.5">•</span>
                            {lang === 'en' ? (
                              <span><strong className="text-white">Regulatory Compliance &amp; Corporate Ethics:</strong> Strict application of anti-corruption regulations (FCPA), AVSEC airport security protocols (100% score), and special passenger/baggage logistics.</span>
                            ) : (
                              <span><strong className="text-white">Cumplimiento Normativo y Ética Corporativa:</strong> Aplicación estricta de normatividad anticorrupción (FCPA), protocolos de seguridad aeroportuaria AVSEC (100% calificación) y manejo logístico de pasajeros y equipajes especiales.</span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* ENTIDAD 3: NOVUX D&D */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#070c10] border border-[#10b981]/40 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Cpu size={16} className="text-[#10b981]" />
                          <div>
                            <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                              {lang === 'en' ? 'NOVUX D&D / Independent Consultant' : 'NOVUX D&D / Consultor Independiente'}
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {lang === 'en' ? 'Software Factory, Data Analytics & Digital Automation' : 'Software Factory, Data Analytics & Automatización Digital'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#10b981] font-bold bg-[#10b981]/10 border border-[#10b981]/30 px-2.5 py-1 rounded w-fit">
                          {lang === 'en' ? '2020 – Present' : '2020 – Actualidad'}
                        </span>
                      </div>

                      <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="text-sm font-serif font-bold text-white">
                            {lang === 'en'
                              ? 'Software Developer, Automation & Digital Solutions'
                              : 'Desarrollador de Software, Automatización y Soluciones Digitales'}
                          </h4>
                          <span className="text-[10.5px] font-mono text-cyan-300 font-bold">
                            {lang === 'en' ? '3 PLATFORMS IN PRODUCTION' : '3 PLATAFORMAS EN PRODUCCIÓN'}
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                          <li className="flex items-start gap-2">
                            <span className="text-[#10b981] font-bold mt-0.5">•</span>
                            {lang === 'en' ? (
                              <span><strong className="text-white">Production Systems Engineering:</strong> Design and deployment of modular platforms: ARES Scraper (resilient web extraction with 98.4% effectiveness and anti-bot bypass), NOVUX PCD (multi-store commercial pricing normalizer terminal), and NOVUX COT (logistics control tool and tactical personnel digital twin).</span>
                            ) : (
                              <span><strong className="text-white">Construcción de Sistemas en Producción:</strong> Diseño y despliegue de plataformas modulares: ARES Scraper (extracción web resiliente con 98.4% de efectividad y bypass antibot), NOVUX PCD (terminal de normalización de datos comerciales multitienda) y NOVUX COT (herramienta de control logístico y gemelo digital táctico de personal).</span>
                            )}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#10b981] font-bold mt-0.5">•</span>
                            {lang === 'en' ? (
                              <span><strong className="text-white">E-Commerce &amp; Digital Strategy:</strong> Structuring commercial platforms and lightweight interactive catalogs integrated with conversational gateways (WhatsApp Business API).</span>
                            ) : (
                              <span><strong className="text-white">Desarrollo E-Commerce y Estrategia Digital:</strong> Estructuración de plataformas comerciales y catálogos interactivos ligeros con conexión a pasarelas conversacionales (WhatsApp Business API).</span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 4: INVENTARIO MAESTRO DE CERTIFICACIONES (+920 HORAS)      */}
                {/* ================================================================= */}
                {activeTab === 'BADGES' && (
                  <div className="space-y-4 animate-in fade-in duration-200 text-left">
                    {/* Header Oficial Verificado */}
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#a855f7]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Award size={16} className="text-[#a855f7]" />
                          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            {lang === 'en'
                              ? 'MASTER INVENTORY OF CERTIFICATIONS & CONTINUOUS EDUCATION'
                              : 'INVENTARIO MAESTRO DE CERTIFICACIONES Y FORMACIÓN CONTINUA'}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-bold">
                            {lang === 'en' ? '+920 TOTAL HOURS' : '+920 HORAS TOTALES'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {lang === 'en' ? (
                            <span>Credentials classified under unified nomenclature <b>CERT-[AREA]-[NN]</b> (IBM, Google, Oracle/Alura, MinTIC, Avianca Express, and Bogota Chamber of Commerce).</span>
                          ) : (
                            <span>Acreditaciones clasificadas bajo nomenclatura unificada <b>CERT-[ÁREA]-[NN]</b> (IBM, Google, Oracle/Alura, MinTIC, Avianca Express y Cámara de Comercio de Bogotá).</span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Selector de Modo: Tabla vs Tarjetas */}
                        <div className="flex rounded bg-black/80 border border-zinc-800 p-0.5 font-mono text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              sfx.playSelect();
                              setBadgeViewMode('TABLE');
                            }}
                            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                              badgeViewMode === 'TABLE'
                                ? 'bg-[#a855f7] text-white font-bold shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <Table2 size={12} />
                            <span>{lang === 'en' ? 'Table' : 'Tabla'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              sfx.playSelect();
                              setBadgeViewMode('CARDS');
                            }}
                            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                              badgeViewMode === 'CARDS'
                                ? 'bg-[#a855f7] text-white font-bold shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <LayoutGrid size={12} />
                            <span>{lang === 'en' ? 'Cards' : 'Tarjetas'}</span>
                          </button>
                        </div>

                        <a
                          href={CREDLY_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playClick()}
                          className="px-3 py-1.5 rounded bg-[#a855f7]/20 hover:bg-[#a855f7]/40 border border-[#a855f7]/60 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0 cursor-pointer no-underline"
                        >
                          <span>{lang === 'en' ? 'Credly Profile' : 'Perfil Credly'}</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Resumen Superior de Horas por Dominio */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 font-mono text-center">
                      <div className="p-2 rounded bg-black/60 border border-[#00F0FF]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">{lang === 'en' ? 'DATA & AI' : 'DATA & IA'}</span>
                        <strong className="text-[#00F0FF] text-xs font-bold">+220h</strong>
                        <span className="text-[8px] text-zinc-500 block">{lang === 'en' ? '7 Courses' : '7 Cursos'}</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#FFE066]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">DEV PYTHON</span>
                        <strong className="text-[#FFE066] text-xs font-bold">+185h</strong>
                        <span className="text-[8px] text-zinc-500 block">{lang === 'en' ? '5 Courses' : '5 Cursos'}</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#38BDF8]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">{lang === 'en' ? 'MEDIATION' : 'RESOLUCIÓN'}</span>
                        <strong className="text-[#38BDF8] text-xs font-bold">+132h</strong>
                        <span className="text-[8px] text-zinc-500 block">CCB 120h</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#EC4899]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">{lang === 'en' ? 'PHOTOGRAPHY' : 'FOTOGRAFÍA'}</span>
                        <strong className="text-[#EC4899] text-xs font-bold">+216h</strong>
                        <span className="text-[8px] text-zinc-500 block">Zona Cinco</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#10B981]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">E-COMMERCE</span>
                        <strong className="text-[#10B981] text-xs font-bold">+90h</strong>
                        <span className="text-[8px] text-zinc-500 block">Google/CCB</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#a855f7]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">{lang === 'en' ? 'AGILE/SEC' : 'AGILIDAD/SEC'}</span>
                        <strong className="text-[#a855f7] text-xs font-bold">+50h</strong>
                        <span className="text-[8px] text-zinc-500 block">IBM Skills</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#F59E0B]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">{lang === 'en' ? 'AVIATION' : 'AERONÁUTICA'}</span>
                        <strong className="text-[#F59E0B] text-xs font-bold">100%</strong>
                        <span className="text-[8px] text-zinc-500 block">SMS/AVSEC</span>
                      </div>
                    </div>

                    {/* Filtros por Categoría */}
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono text-[10.5px]">
                      <span className="text-zinc-500 uppercase text-[10px] mr-1 hidden sm:inline">{lang === 'en' ? 'FILTER:' : 'FILTRO:'}</span>
                      {[
                        { key: 'ALL', label: lang === 'en' ? `ALL (${masterCertifications.length})` : `TODAS (${masterCertifications.length})` },
                        { key: 'DATA', label: lang === 'en' ? 'DATA & AI (7)' : 'DATA & IA (7)' },
                        { key: 'DEV', label: 'DEV & PYTHON (5)' },
                        { key: 'LEGAL', label: lang === 'en' ? 'MEDIATION CCB (3)' : 'RESOLUCIÓN CCB (3)' },
                        { key: 'OPER', label: lang === 'en' ? 'AVIATION SMS (5)' : 'AERONÁUTICA SMS (5)' },
                        { key: 'AGILE', label: 'AGILE & SEC (3)' },
                        { key: 'MKT', label: 'E-COMMERCE (4)' },
                        { key: 'FOTO_ACAD', label: 'VISUAL & ACAD (4)' }
                      ].map((f) => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => {
                            sfx.playSelect();
                            setMasterCertFilter(f.key as any);
                          }}
                          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer border ${
                            masterCertFilter === f.key
                              ? 'bg-[#a855f7]/20 border-[#a855f7] text-[#a855f7] font-bold'
                              : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    {/* VISTA 1: TABLA TÁCTICA AUDITABLE */}
                    {badgeViewMode === 'TABLE' && (
                      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-[#070912]">
                        <table className="w-full text-left font-mono text-xs">
                          <thead className="bg-[#0e1222] border-b border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-wider">
                            <tr>
                              <th className="py-2.5 px-3 w-12 text-center">#</th>
                              <th className="py-2.5 px-3 min-w-[120px]">{lang === 'en' ? 'Code' : 'Código'}</th>
                              <th className="py-2.5 px-3 min-w-[240px]">{lang === 'en' ? 'Official Certification' : 'Certificación Oficial'}</th>
                              <th className="py-2.5 px-3 min-w-[70px]">{lang === 'en' ? 'Hours / Score' : 'Horas / Nota'}</th>
                              <th className="py-2.5 px-3 min-w-[170px]">{lang === 'en' ? 'Issuing Institution' : 'Institución Emisora'}</th>
                              <th className="py-2.5 px-3 min-w-[120px]">{lang === 'en' ? 'Domain' : 'Área'}</th>
                              <th className="py-2.5 px-3 text-right min-w-[90px]">{lang === 'en' ? 'Validation' : 'Validación'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/60">
                            {filteredMasterCertifications.map((c, idx) => (
                              <tr 
                                key={c.code} 
                                className="hover:bg-white/[0.03] transition-colors group"
                              >
                                <td className="py-2.5 px-3 text-center text-zinc-500 text-[11px]">
                                  {String(idx + 1).padStart(2, '0')}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span 
                                    className="font-bold text-[10.5px] px-2 py-0.5 rounded border"
                                    style={{
                                      color: c.categoryColor,
                                      borderColor: `${c.categoryColor}40`,
                                      backgroundColor: `${c.categoryColor}15`
                                    }}
                                  >
                                    [{c.code}]
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="font-bold text-white group-hover:text-[#a855f7] transition-colors">
                                    {c.name}
                                  </div>
                                  {c.gradeOrDetail && (
                                    <span className="text-[9.5px] text-zinc-400 block mt-0.5">
                                      {c.gradeOrDetail}
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-emerald-400 font-bold text-[11px]">
                                    {c.hours ? `${c.hours}h` : c.hoursDisplay || '—'}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-[11px] font-medium text-zinc-300">
                                    {c.issuer}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                                    {c.categoryLabel}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                  {c.validationUrl ? (
                                    <a
                                      href={c.validationUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => sfx.playClick()}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#a855f7]/10 hover:bg-[#a855f7]/30 border border-[#a855f7]/40 text-[#a855f7] hover:text-white text-[10px] font-bold transition-all cursor-pointer no-underline"
                                    >
                                      <CheckCircle2 size={11} className="text-emerald-400" />
                                      <span>{lang === 'en' ? 'Verify' : 'Verificar'}</span>
                                      <ExternalLink size={9} />
                                    </a>
                                  ) : (
                                    <span className="text-[10px] text-zinc-500 font-mono">{lang === 'en' ? 'Official' : 'Oficial'}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* VISTA 2: TARJETAS EN CUADRÍCULA */}
                    {badgeViewMode === 'CARDS' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                        {filteredMasterCertifications.map((item) => (
                          <div 
                            key={item.code}
                            className="p-3.5 rounded-lg bg-black/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between text-left"
                            style={{ borderTopColor: item.categoryColor, borderTopWidth: '2px' }}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span 
                                  className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded border"
                                  style={{
                                    color: item.categoryColor,
                                    borderColor: `${item.categoryColor}40`,
                                    backgroundColor: `${item.categoryColor}15`
                                  }}
                                >
                                  [{item.code}]
                                </span>
                                <span className="text-emerald-400 font-mono text-[10.5px] font-bold">
                                  {item.hours ? `${item.hours}h` : item.hoursDisplay}
                                </span>
                              </div>
                              <h4 className="font-serif text-sm font-bold text-white mb-1 leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[10.5px] text-zinc-400 font-mono mb-1">
                                {item.issuer}
                              </p>
                              {item.gradeOrDetail && (
                                <p className="text-[10px] text-[#FFE066] font-sans">
                                  {item.gradeOrDetail}
                                </p>
                              )}
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-zinc-500">{item.categoryLabel}</span>
                              {item.validationUrl && (
                                <a
                                  href={item.validationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#00F0FF] hover:underline flex items-center gap-1"
                                >
                                  <span>{lang === 'en' ? 'Credential' : 'Credencial'}</span>
                                  <ExternalLink size={9} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 5: SIMULADOR DE VALORACIÓN FINANCIERA & RETORNO DE INVERSIÓN (ROI) */}
                {/* ================================================================= */}
                {activeTab === 'CALCULATOR' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* Header del Simulador Financiero */}
                    <div className="p-4 rounded-lg bg-[#070914] border border-[#10b981]/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1">
                        <h3 className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider flex items-center gap-1.5">
                          <Calculator size={14} />
                          <span>{lang === 'en' ? 'FINANCIAL ROI SIMULATOR // CAPITAL IMPACT & TALENT MULTIPLIER' : 'SIMULADOR DE RETORNO DE INVERSIÓN (ROI) // COSTO-BENEFICIO AL VINCULAR A GUSTAVO DE LA ROSA'}</span>
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                          {lang === 'en' ? 'VALIDATED FINANCIAL EFFICIENCY' : 'EFICIENCIA FINANCIERA VALIDADA'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {lang === 'en'
                          ? <span>Capital optimization &amp; cost model: compares the impact of hiring a traditional technical pod versus the multiplier effect of bringing on Gustavo De La Rosa with over <b>1,140 hours of pre-built software and pipelines</b> from day one.</span>
                          : <span>Modelo de costeo y optimización de capital: compara el impacto de contratar una célula técnica tradicional frente al efecto multiplicador de incorporar a Gustavo De La Rosa con más de <b>1.140 horas de software y pipelines pre-construidos</b> desde el primer día.</span>}
                      </p>
                    </div>

                    {/* BLOQUE A: EFECTO MULTIPLICADOR 4x1 (CÉLULA TRADICIONAL VS. GUSTAVO DE LA ROSA) */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#070a14] border border-zinc-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Users size={14} className="text-[#38bdf8]" />
                          <span>{lang === 'en' ? 'BLOCK A: 4-IN-1 MULTIPLIER EFFECT — REGIONAL & GLOBAL BENCHMARK' : 'BLOQUE A: EFECTO MULTIPLICADOR 4 EN 1 — ANÁLISIS DE MERCADO COLOMBIA'}</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded">
                          {lang === 'en' ? 'ANNUAL SAVINGS: ~$190M+ COP' : 'AHORRO ANUAL: ~$190M+ COP'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Opción A: Célula Tradicional */}
                        <div className="p-3.5 rounded bg-red-950/15 border border-red-500/30 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-red-400 uppercase">
                              {lang === 'en' ? 'OPTION A: TRADITIONAL TECHNICAL POD' : 'OPCIÓN A: CÉLULA TÉCNICA TRADICIONAL'}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {lang === 'en' ? '4 Separate Payrolls' : '4 Nóminas Separadas'}
                            </span>
                          </div>

                          <div className="space-y-1.5 font-mono text-xs text-zinc-300">
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• {lang === 'en' ? 'Data Analyst & BI Specialist' : 'Analista de Datos & BI (SQL/Looker)'}</span>
                              <span className="text-zinc-200 font-bold">$5.500.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• {lang === 'en' ? 'Scraping & L7 Bypass Engineer' : 'Ingeniero de Scraping & WAF Bypass L7'}</span>
                              <span className="text-zinc-200 font-bold">$7.200.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• {lang === 'en' ? 'Frontend WebGL/React Developer' : 'Desarrollador Frontend React & 3D WebGL'}</span>
                              <span className="text-zinc-200 font-bold">$6.000.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• {lang === 'en' ? 'AI & Infrastructure Architect' : 'Arquitecto de Infraestructura & IA Local'}</span>
                              <span className="text-zinc-200 font-bold">$8.000.000 COP</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-red-500/30 flex items-baseline justify-between font-mono">
                            <span className="text-xs text-zinc-400">{lang === 'en' ? 'TOTAL MONTHLY COST:' : 'COSTO MENSUAL TOTAL:'}</span>
                            <span className="text-base font-bold text-red-400">{lang === 'en' ? '~$22,300,000 COP / mo' : '~$22.300.000 COP / mes'}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                            {lang === 'en'
                              ? '* Implies $267.6M COP/yr + recruitment, onboarding, legal payroll taxes (+52%), communication friction, and a minimum 4-month learning curve.'
                              : '* Implica $267.6M COP/año + costos de onboarding, cargas prestacionales (+52%), fricción de comunicación y 4 meses mínimos de curva de aprendizaje.'}
                          </p>
                        </div>

                        {/* Opción B: Solución Unificada Gustavo De La Rosa */}
                        <div className="p-3.5 rounded bg-emerald-950/20 border border-emerald-500/40 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                              {lang === 'en' ? 'OPTION B: UNIFIED LEADERSHIP (GUSTAVO DE LA ROSA)' : 'OPCIÓN B: INTEGRACIÓN UNIFICADA (GUSTAVO DE LA ROSA)'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                              {lang === 'en' ? '4x1 MULTIPLIER' : 'MULTIPLICADOR 4x1'}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-zinc-200 font-sans">
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>{lang === 'en' ? 'Single strategic mind:' : 'Una sola mente estratégica:'}</b> {lang === 'en' ? 'Architecture, territorial data, L7 scraping, and WebGL 3D twins delivered without friction.' : 'Arquitectura, datos territoriales, scraping L7 y gemelos WebGL 3D ejecutados sin silos.'}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>{lang === 'en' ? 'Day 1 Intellectual Capital:' : 'Capital Intelectual Día 1:'}</b> {lang === 'en' ? 'Contributes 1,140 hours of tested libraries, C parsers (libxml2), and battle-hardened pipelines.' : 'Aporta 1.140 horas de librerías, parsers en C (libxml2) y pipelines probados en campo.'}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>{lang === 'en' ? 'Pre-built Asset Value:' : 'Valor en Activos Pre-construidos:'}</b> {lang === 'en' ? 'Over $68.4M COP in proprietary production-ready software.' : 'Más de $68.400.000 COP en software propietario listo para producción inmediata.'}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>{lang === 'en' ? 'Business Alignment:' : 'Alineación con el Negocio:'}</b> {lang === 'en' ? 'Proven capacity in public governance (Santa Fe) and B2B commercial pipelines.' : 'Capacidad demostrada en el sector público (Santa Fe) y proyectos comerciales B2B.'}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-emerald-500/30 flex items-baseline justify-between font-mono">
                            <span className="text-xs text-zinc-300">{lang === 'en' ? 'ESTIMATED NET SAVINGS:' : 'AHORRO NETO ESTIMADO:'}</span>
                            <span className="text-base font-bold text-emerald-400">{lang === 'en' ? '+60% to 70% Direct' : '+60% a 70% Directo'}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                            {lang === 'en'
                              ? '* Immediate rollout without long ramp-up periods or misalignment between frontend, backend, and data analytics.'
                              : '* Despliegue inmediato sin semanas de inducción ni desalineación entre frontend, backend y analítica de datos.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BLOQUE B: SELECTOR TÁCTICO DE 3 MODALIDADES DE INVERSIÓN */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#070a14] border border-zinc-800 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Target size={14} className="text-[#FFE066]" />
                          <span>{lang === 'en' ? 'BLOCK B: CHOOSE YOUR HIRING OR PARTNERSHIP MODEL' : 'BLOQUE B: ESCOJA SU MODALIDAD DE VINCULACIÓN O ASOCIACIÓN'}</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {lang === 'en' ? 'SELECTED:' : 'SELECCIONADA:'} <b className="text-white">{activeInvestment.title}</b>
                        </span>
                      </div>

                      {/* 3 Botones de Selección */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {investmentModes.map((mode) => {
                          const isSelected = selectedInvestmentMode === mode.id;
                          return (
                            <button
                              key={mode.id}
                              onClick={() => {
                                sfx.playSelect();
                                setSelectedInvestmentMode(mode.id);
                              }}
                              className={`p-3 rounded-lg border text-left transition-all cursor-pointer font-mono ${
                                isSelected
                                  ? 'bg-[#0f1428] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                                  : 'bg-black/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                              }`}
                              style={{
                                borderColor: isSelected ? mode.color : undefined
                              }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span 
                                  className="text-[9px] font-bold px-1.5 py-0.5 rounded border"
                                  style={{
                                    color: mode.color,
                                    borderColor: `${mode.color}40`,
                                    backgroundColor: `${mode.color}15`
                                  }}
                                >
                                  {mode.badge}
                                </span>
                              </div>
                              <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                {mode.title}
                              </h4>
                              <p className="text-[11px] font-mono font-bold mt-1" style={{ color: mode.color }}>
                                {mode.targetCompensation}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Panel de Detalle Dinámico de la Modalidad Activa */}
                      <div className="p-4 rounded-lg bg-black/70 border border-zinc-800 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                              {lang === 'en' ? 'ACTIVE MODEL:' : 'MODALIDAD ACTIVA:'}
                            </span>
                            <h3 className="font-serif text-sm font-bold text-white">
                              {activeInvestment.title}
                            </h3>
                          </div>
                          <div className="text-right font-mono">
                            <span className="text-sm font-bold block" style={{ color: activeInvestment.color }}>
                              {activeInvestment.targetCompensation}
                            </span>
                            <span className="text-[10px] text-zinc-400 block">
                              {activeInvestment.usdEquivalent}
                            </span>
                          </div>
                        </div>

                        {/* Ventaja de Ahorro */}
                        <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-300">
                            {lang === 'en' ? 'DIRECT ADVANTAGE / SAVINGS:' : 'VENTAJA DIRECTA / AHORRO:'}
                          </span>
                          <span className="text-emerald-400 font-bold">{activeInvestment.savingsOrAdvantage}</span>
                        </div>

                        {/* Competencias y Diferenciales Clave */}
                        <div className="space-y-2">
                          <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider block">
                            {lang === 'en' ? 'GUARANTEED VALUE & KEY DIFFERENTIATORS:' : 'DIFERENCIALES & VALOR AGREGADO GARANTIZADO:'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeInvestment.keyHighlights.map((hl, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2 rounded bg-black/50 border border-zinc-800/80 text-xs text-zinc-200">
                                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Impacto Operativo */}
                        <div className="p-3 rounded bg-black/60 border border-zinc-800 text-xs font-sans text-zinc-300">
                          <strong className="text-white font-mono block mb-1">
                            {lang === 'en' ? 'IMMEDIATE OPERATIONAL IMPACT:' : 'IMPACTO OPERATIVO INMEDIATO:'}
                          </strong>
                          {activeInvestment.operationalImpact}
                        </div>

                        {/* Botón CTA Dinámico a WhatsApp B2B */}
                        <a
                          href={`https://wa.me/573196300410?text=${getInvestmentWhatsAppMsg()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playPowerUp()}
                          className="w-full py-3.5 px-4 rounded text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer no-underline shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${activeInvestment.color}, #059669)`,
                            boxShadow: `0 0 25px ${activeInvestment.color}35`
                          }}
                        >
                          <Send size={15} />
                          <span>
                            {lang === 'en'
                              ? `Schedule Technical Session on ${activeInvestment.title} via WhatsApp B2B`
                              : `Agendar Sesión Técnica sobre ${activeInvestment.title} vía WhatsApp B2B`}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer de la Consola Modal */}
              <div className="p-3 sm:p-4 border-t border-zinc-800 bg-[#060810] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {lang === 'en'
                      ? 'NOVUX OPS // OFFICIAL RECORD OF OPERATIONAL CAPACITY & TELEMETRY'
                      : 'NOVUX OPS // REGISTRO OFICIAL DE TELEMETRÍA Y CAPACIDAD OPERATIVA'}
                  </span>
                </div>
                <span>{lang === 'en' ? 'BOGOTA D.C. • YEAR 2026' : 'BOGOTÁ D.C. • AÑO 2026'}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
