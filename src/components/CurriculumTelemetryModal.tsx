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
  MasterCertificationItem 
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

// Modelos de Inversión y Retorno (MAGI Valuation Engine)
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
    whatsappMessage: 'Hola Gustavo, revisé tu perfil en el Modal NERV C2 de novuxops.com y nos interesa evaluar una vinculación como Empleado Full-Time para liderar proyectos de Datos e Inteligencia de Software.'
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

export function CurriculumTelemetryModal() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('TELEMETRY');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('COT');
  const [badgeViewMode, setBadgeViewMode] = useState<'TABLE' | 'CARDS'>('TABLE');
  const [badgeFilter, setBadgeFilter] = useState<'ALL' | 'IBM' | 'COURSERA' | 'MINTIC' | 'GOOGLE'>('ALL');
  const [masterCertFilter, setMasterCertFilter] = useState<'ALL' | 'DATA' | 'DEV' | 'LEGAL' | 'OPER' | 'AGILE' | 'MKT' | 'FOTO_ACAD'>('ALL');

  const filteredMasterCertifications = MASTER_CERTIFICATIONS_INVENTORY.filter((item) => {
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

  // Estado del MAGI Valuation Engine (Modalidades de Inversión y ROI)
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

  // Totales de la 5ª Pantalla: Dashboard de Proyectos
  const totalConceptHours = PROJECTS_TELEMETRY.reduce((acc, p) => acc + p.conceptHours, 0);
  const totalMaterializeHours = PROJECTS_TELEMETRY.reduce((acc, p) => acc + p.materializeHours, 0);
  const totalCoreProjectsHours = totalConceptHours + totalMaterializeHours;
  const activeProject = PROJECTS_TELEMETRY.find(p => p.id === selectedProjectId) || PROJECTS_TELEMETRY[0];

  // MAGI Valuation Engine - Modalidades de Inversión y ROI
  const activeInvestment = INVESTMENT_MODES.find(m => m.id === selectedInvestmentMode) || INVESTMENT_MODES[0];
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
  const contractsList = [
    {
      code: 'CPS 281-2026',
      period: '12/03/2026 – 01/10/2026',
      role: 'Técnico Operativo de Campo & Analista de Datos',
      impact: 'Diseño de pipelines ETL en Python para depuración de datasets territoriales (de 8,000 registros con ruido a 5,000 registros limpios de alta fidelidad). Despliegue de cuadros de mando geoespaciales y reducción >70% en tiempos de consolidación de reportes mediante IA Generativa.',
      tag: 'FASE V: ANALÍTICA AVANZADA'
    },
    {
      code: 'CPS 425-2025',
      period: '01/10/2025 – 31/12/2025',
      role: 'Técnico Operativo de Campo & Analista de Datos',
      impact: 'Supervisión técnica de cuadrillas y estructuración de bases de datos geoespaciales. Automatización de métricas de ocupación de espacio público en polígonos de alta concurrencia.',
      tag: 'FASE IV: AUTOMATIZACIÓN'
    },
    {
      code: 'CPS 183-2025',
      period: '21/06/2025 – 20/09/2025',
      role: 'Gestor de Seguridad y Convivencia Local',
      impact: 'Consolidación operativa en campo, enlace con cuadrillas de inspección y diseño de formatos tabulares estandarizados para captura de variables urbanas sin pérdidas de información.',
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
      impact: 'Monitoreo territorial, captura de variables de alta complejidad en una zona con >1.2M de población flotante y detección de cuellos de botella en reportes manuales.',
      tag: 'FASE I: DIAGNÓSTICO BASE'
    }
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* DISPARADOR 3D FLOTANTE ("NERV C2 CURRICULUM TELEMETRY")                    */}
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
          {/* Tooltip Táctico NERV Flotante */}
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
      {/* MODAL COMPLETO: DASHBOARD TÁCTICO NERV C2 (5 PANTALLAS)                    */}
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
                      ANALISTA &amp; DEV
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
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 font-mono text-[10px] text-zinc-400">
                        MAGI SYNC RATE: 100%
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      Gustavo Alberto De La Rosa Flórez
                    </h1>
                    <p className="text-xs sm:text-sm text-[#FFE066] font-mono font-medium mt-0.5">
                      Coordinador de Operaciones · Especialista en Automatización &amp; Datos · Desarrollador Python
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-[10.5px] text-zinc-300">
                      <span className="text-[#00F0FF]">{MASTER_PROFILE_DATA.location}</span>
                      <span className="text-zinc-600">•</span>
                      <a href={`tel:${MASTER_PROFILE_DATA.phoneClean}`} className="text-zinc-300 hover:text-white transition-colors">{MASTER_PROFILE_DATA.phone}</a>
                      <span className="text-zinc-600">•</span>
                      <a href={`mailto:${MASTER_PROFILE_DATA.email}`} className="text-cyan-300 hover:text-white transition-colors">{MASTER_PROFILE_DATA.email}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                  <button
                    onClick={handleDownloadMarkdown}
                    onMouseEnter={() => sfx.playHover()}
                    className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/60 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer"
                    title="Descargar Perfil Profesional Maestro en formato Markdown (.md)"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">DESCARGAR</span>
                    <span>.MD</span>
                  </button>
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
                  title="Dashboard Maestro, 3 Pilares y Telemetría de Rendimiento"
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'TELEMETRY'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Cpu size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '1 MASTER' : '1 MASTER'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('PROJECTS_DASHBOARD')}
                  title="Dashboard de Proyectos y Telemetría Temporal"
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'PROJECTS_DASHBOARD'
                      ? 'border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <BarChart3 size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '2 PROY' : '2 PROY'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('EXPERIENCE')}
                  title="Experiencia Demostrable (Santa Fe, Avianca Express, NOVUX)"
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'EXPERIENCE'
                      ? 'border-[#FFE066] text-[#FFE066] bg-[#FFE066]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Briefcase size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '3 EXP' : '3 EXP'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('BADGES')}
                  title="Inventario Maestro de Certificaciones (+920 Horas)"
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'BADGES'
                      ? 'border-[#a855f7] text-[#a855f7] bg-[#a855f7]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Award size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '4 CERT (+920H)' : '4 CERT (+920H)'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('CALCULATOR')}
                  title="Valoración Real, ROI & Simulador de Contratación"
                  className={`py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'CALCULATOR'
                      ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <Calculator size={13} className="shrink-0" />
                  <span>{lang === 'en' ? '5 VAL' : '5 VAL'}</span>
                </button>
              </div>

              {/* Contenido Dinámico de las 5 Pestañas */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-sans space-y-6">

                {/* ================================================================= */}
                {/* PESTAÑA 1: DASHBOARD MAESTRO, PILARES & STACK TÉCNICO              */}
                {/* ================================================================= */}
                {activeTab === 'TELEMETRY' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* 0. PANEL EJECUTIVO // PERFIL PROFESIONAL MAESTRO */}
                    <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-br from-[#0a0d18] via-[#070912] to-[#04060a] border border-[#00f0ff]/40 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FFE066]" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5 mb-3.5">
                        <div className="flex items-center gap-2">
                          <User size={15} className="text-[#00f0ff]" />
                          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            PERFIL PROFESIONAL MAESTRO // TRAYECTORIA MULTIDISCIPLINARIA
                          </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-bold">
                            1 AÑO Y 11 MESES A NIVEL OPERATIVO (2 AÑOS)
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a855f7]/20 border border-[#a855f7]/50 text-[#a855f7] font-bold">
                            +920H FORMACIÓN CONTINUA
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-zinc-200 font-sans leading-relaxed mb-4">
                        {MASTER_PROFILE_DATA.profileSummary}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-zinc-300">
                          <span className="inline-flex items-center gap-1 text-[#00F0FF]">
                            <MapPin size={12} />
                            <span>{MASTER_PROFILE_DATA.location}</span>
                          </span>
                          <span className="text-zinc-600">•</span>
                          <a href={`tel:${MASTER_PROFILE_DATA.phoneClean}`} className="text-zinc-300 hover:text-white transition-colors">
                            {MASTER_PROFILE_DATA.phone}
                          </a>
                          <span className="text-zinc-600">•</span>
                          <a href={`mailto:${MASTER_PROFILE_DATA.email}`} className="text-cyan-300 hover:underline">
                            {MASTER_PROFILE_DATA.email}
                          </a>
                        </div>

                        <button
                          onClick={handleDownloadMarkdown}
                          onMouseEnter={() => sfx.playHover()}
                          className="px-3.5 py-1.5 rounded bg-[#00F0FF]/20 hover:bg-[#00F0FF]/35 border border-[#00F0FF]/60 text-[#00F0FF] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Descargar Perfil Maestro (.MD)</span>
                        </button>
                      </div>
                    </div>

                    {/* KPI STATS GRID (7 INDICADORES) */}
                    <div>
                      <div className="border-b border-zinc-800 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Gauge size={14} className="text-[#FFE066]" />
                          <span>MÉTRICAS CLAVE CONSOLIDADAS (DATA &amp; OPERACIONES)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 font-mono">
                        {MASTER_PROFILE_DATA.kpiStats.map((kpi, idx) => (
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
                          <span>LOS TRES PILARES ESTRATÉGICOS DE TRAYECTORIA</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-sans">
                        {MASTER_PROFILE_DATA.pillars.map((pillar) => (
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
                          <span>HABILIDADES Y COMPETENCIAS TÉCNICAS VERIFICADAS</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                        {/* Liderazgo */}
                        <div className="p-3 rounded bg-black/50 border border-zinc-800/80">
                          <span className="font-mono text-[11px] font-bold text-[#00F0FF] block mb-2 uppercase">
                            • Liderazgo &amp; Operaciones
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {MASTER_PROFILE_DATA.competencies.operations.map((c, i) => (
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
                            • Datos &amp; Programación
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {MASTER_PROFILE_DATA.competencies.programming.map((c, i) => (
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
                            • Estrategia &amp; Negocios
                          </span>
                          <ul className="space-y-1 text-zinc-300">
                            {MASTER_PROFILE_DATA.competencies.strategy.map((c, i) => (
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
                          <span>COMPETENCIAS CLAVE CON MÉTRICAS DE RESULTADOS EN PRODUCCIÓN</span>
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
                            {['Python Core', 'PostgreSQL / PostGIS', 'Pandas', 'Pydantic', 'Asyncio', 'ETL Automatizado'].map((t, idx) => (
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
                            {['libxml2 en RAM', 'Selenium Headless', 'FastAPI', 'Stealth Proxies', 'Data Lake L7'].map((t, idx) => (
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
                              FRONTEND REACT &amp; VISUALIZACIÓN INTERACTIVA
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              60 FPS CONSTANTES
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                            Construcción de interfaces tácticas y tableros analíticos de alta velocidad en React 19 y TypeScript. Gemelos digitales y hemiciclos 3D renderizados a 60 FPS estables sobre WebGL 2.0 y Three.js.
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
                            {['Looker Studio', 'Analítica Territorial', 'Georreferenciación', 'Auditoría Institucional'].map((t, idx) => (
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
                          <span className="text-[10px] text-[#00f0ff] font-bold block mb-1.5">LENGUAJES CORE:</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px]">
                            <li>• Python (Avanzado)</li>
                            <li>• SQL (PostgreSQL)</li>
                            <li>• TypeScript / JS</li>
                            <li>• C (libxml2 nativo)</li>
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
                            <li>• PostGIS Espacial</li>
                            <li>• Selenium &amp; Pydantic</li>
                          </ul>
                        </div>

                        {/* Capa 4 */}
                        <div className="p-3 rounded bg-[#0a0d18] border border-zinc-800">
                          <span className="text-[10px] text-[#a855f7] font-bold block mb-1.5">HERRAMIENTAS &amp; IA:</span>
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
                          CONSENSO MAGI: 100%
                        </span>
                      </div>
                    </div>

                    {/* Resumen Superior de Indicadores KPI */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-zinc-500 block uppercase">TOTAL HORAS CORE:</span>
                        <strong className="text-white text-lg font-bold block mt-0.5">{totalCoreProjectsHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">6 Unidades de Ingeniería Propietarias</span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-[#FFE066] block uppercase">CONCEPTUALIZACIÓN:</span>
                        <strong className="text-[#FFE066] text-lg font-bold block mt-0.5">{totalConceptHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">27.9% Arquitectura &amp; Lógica en Gemini/NotebookLM</span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-[#00f0ff] block uppercase">MATERIALIZACIÓN:</span>
                        <strong className="text-[#00f0ff] text-lg font-bold block mt-0.5">{totalMaterializeHours} h</strong>
                        <span className="text-[9.5px] text-zinc-400">72.1% Código, Scraping L7 &amp; Hardening en Antigravity</span>
                      </div>

                      <div className="p-3 rounded bg-black/70 border border-zinc-800">
                        <span className="text-[9.5px] text-emerald-400 block uppercase">EFICIENCIA GLOBAL:</span>
                        <strong className="text-emerald-400 text-lg font-bold block mt-0.5">+64.8%</strong>
                        <span className="text-[9.5px] text-zinc-400">2.78M Tokens RAG • 148 Pines WIP=1</span>
                      </div>
                    </div>

                    {/* GRÁFICA COMPARATIVA TÁCTICA CENTRAL (BARRAS APILADAS NERV / MAGI) */}
                    <div className="p-4 rounded-lg bg-[#070912] border border-zinc-800 relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2 mb-4 font-mono text-xs">
                        <span className="text-white font-bold flex items-center gap-1.5">
                          <Layers2 size={13} className="text-[#38bdf8]" />
                          <span>DISTRIBUCIÓN DE HORAS POR UNIDAD: CONCEPTUALIZACIÓN VS. MATERIALIZACIÓN</span>
                        </span>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1 text-[#FFE066]">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#FFE066]/80" />
                            <span>Conceptualización</span>
                          </span>
                          <span className="flex items-center gap-1 text-[#00f0ff]">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#00f0ff]/80" />
                            <span>Materialización</span>
                          </span>
                        </div>
                      </div>

                      {/* Visualizador de Barras Horizontales Tácticas */}
                      <div className="space-y-3 font-mono">
                        {PROJECTS_TELEMETRY.map((p) => {
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
                                  <span>Concept: <b className="text-[#FFE066]">{p.conceptHours}h</b></span>
                                  <span>Code: <b className="text-[#00f0ff]">{p.materializeHours}h</b></span>
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
                                  title={`Conceptualización: ${p.conceptHours}h`}
                                />
                                <div 
                                  style={{ 
                                    width: `${materializeWidthPct}%`,
                                    backgroundColor: p.primaryColor
                                  }}
                                  className="h-full opacity-90 transition-all duration-500"
                                  title={`Materialización: ${p.materializeHours}h`}
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
                            [{activeProject.tag}] // SISTEMA PROPIETARIO
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
                            FASE 1: CONCEPTUALIZACIÓN LÓGICA ({activeProject.conceptHours} Horas)
                          </span>
                          <p className="text-zinc-300 leading-relaxed">
                            {activeProject.conceptDetails}
                          </p>
                        </div>

                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="font-mono text-[10px] text-[#00f0ff] font-bold block mb-1">
                            FASE 2: MATERIALIZACIÓN &amp; HARDENING ({activeProject.materializeHours} Horas)
                          </span>
                          <p className="text-zinc-300 leading-relaxed">
                            {activeProject.materializeDetails}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded bg-black/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-zinc-500 block uppercase mb-1">ENTREGABLE VALIDADO EN PRODUCCIÓN:</span>
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
                              Fondo de Desarrollo Local de Santa Fe (Alcaldía Local de Santa Fe)
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">Bogotá D.C., Colombia • Radicado Oficial No. 20265320571351</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#FFE066] font-bold bg-[#FFE066]/10 border border-[#FFE066]/30 px-2.5 py-1 rounded w-fit">
                          Total: 1 Año, 11 Meses y 11 Días
                        </span>
                      </div>

                      {/* Roles en Santa Fe */}
                      <div className="space-y-3.5">
                        {/* Rol 1: Coordinador y Analista */}
                        <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="text-sm font-serif font-bold text-white">
                              Coordinador Técnico Operativo &amp; Analista de Datos Territorial
                            </h4>
                            <span className="text-[10.5px] font-mono text-[#FFE066] font-bold">
                              Diciembre 2024 – Actualidad
                            </span>
                          </div>
                          <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              <span><strong className="text-white">Liderazgo Humano y Territorial:</strong> Coordiné en terreno a 60 gestores territoriales para acciones de Inspección, Vigilancia y Control (IVC), convivencia ciudadana y recuperación de espacio público en las UPZ 91, 92 y 93 (área con más de 1.2M de población flotante diaria).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              <span><strong className="text-white">Ingeniería de Datos y Automatización ETL:</strong> Diseñé e implementé pipelines en Python (Pandas, Regex) que procesaron y estructuraron más de 131.000 interacciones operativas no estructuradas y auditaron la recuperación de 245.000 m² de espacio público, reduciendo los tiempos de consolidación técnica en más de un 70%.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              <span><strong className="text-white">Monitoreo BI &amp; Calidad de Datos (MIPG):</strong> Estructuré matrices de depuración que redujeron inconsistencias operativas de 8.000 a 5.000 registros saneados y desarrollé tableros en Looker Studio y Excel Avanzado para la toma de decisiones en mesas institucionales.</span>
                            </li>
                          </ul>
                        </div>

                        {/* Rol 2: Gestor */}
                        <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="text-sm font-serif font-bold text-white">
                              Gestor de Seguridad y Convivencia Ciudadana
                            </h4>
                            <span className="text-[10.5px] font-mono text-zinc-400">
                              Diciembre 2024 – Septiembre 2025
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              <span><strong className="text-white">Inspección en Terreno y Mediación:</strong> Ejecución directa de recorridos de verificación y mediación comunitaria para la preservación del orden, censo en campo y prevención de ocupaciones indebidas.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#FFE066] font-bold mt-0.5">•</span>
                              <span><strong className="text-white">Levantamiento de Información Primaria:</strong> Recolección y sistematización de datos en calle que nutrieron los diagnósticos preventivos y mapas de riesgo territorial de la localidad.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Desglose de los 5 Contratos CPS */}
                      <div className="pt-2">
                        <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                          TRAZABILIDAD CONTRACTUAL POR CPS (5 FASES AUDITABLES):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                          {contractsList.map((c, idx) => (
                            <div key={idx} className="p-2.5 rounded bg-black/70 border border-zinc-800/80 text-left">
                              <div className="text-[11px] font-mono font-bold text-[#FFE066]">{c.code}</div>
                              <div className="text-[9.5px] font-mono text-zinc-400 mb-1">{c.period}</div>
                              <div className="text-[10px] text-zinc-300 line-clamp-2">{c.tag}</div>
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
                              Avianca Express | Aeropuerto Internacional El Dorado
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">Bogotá D.C., Colombia • Operaciones Aeronáuticas de Alta Precisión</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#00f0ff] font-bold bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2.5 py-1 rounded w-fit">
                          2021 – 2023
                        </span>
                      </div>

                      <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="text-sm font-serif font-bold text-white">
                            Operaciones Terrestres, Seguridad Operacional (SMS) &amp; Cumplimiento
                          </h4>
                          <span className="text-[10.5px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            CALIFICACIÓN 100.00% SMS / AVSEC
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                          <li className="flex items-start gap-2">
                            <span className="text-[#00f0ff] font-bold mt-0.5">•</span>
                            <span><strong className="text-white">Seguridad Operacional (SMS):</strong> Gestión estricta de protocolos de seguridad en rampa y operaciones terrestres bajo estándares aeronáuticos internacionales, certificado con calificación de 100.00% en Safety Management System.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#00f0ff] font-bold mt-0.5">•</span>
                            <span><strong className="text-white">Cumplimiento Normativo y Ética Corporativa:</strong> Aplicación estricta de normatividad anticorrupción (FCPA), protocolos de seguridad aeroportuaria AVSEC (100% calificación) y manejo logístico de pasajeros y equipajes especiales.</span>
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
                              NOVUX D&amp;D / Consultor Independiente
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-400">Software Factory, Data Analytics &amp; Automatización Digital</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#10b981] font-bold bg-[#10b981]/10 border border-[#10b981]/30 px-2.5 py-1 rounded w-fit">
                          2020 – Actualidad
                        </span>
                      </div>

                      <div className="p-3.5 rounded bg-black/50 border border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="text-sm font-serif font-bold text-white">
                            Desarrollador de Software, Automatización y Soluciones Digitales
                          </h4>
                          <span className="text-[10.5px] font-mono text-cyan-300 font-bold">
                            3 PLATAFORMAS EN PRODUCCIÓN
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                          <li className="flex items-start gap-2">
                            <span className="text-[#10b981] font-bold mt-0.5">•</span>
                            <span><strong className="text-white">Construcción de Sistemas en Producción:</strong> Diseño y despliegue de plataformas modulares: ARES Scraper (extracción web resiliente con 98.4% de efectividad y bypass antibot), NOVUX PCD (terminal de normalización de datos comerciales multitienda) y NOVUX COT (herramienta de control logístico y gemelo digital táctico de personal).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#10b981] font-bold mt-0.5">•</span>
                            <span><strong className="text-white">Desarrollo E-Commerce y Estrategia Digital:</strong> Estructuración de plataformas comerciales y catálogos interactivos ligeros con conexión a pasarelas conversacionales (WhatsApp Business API).</span>
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
                            INVENTARIO MAESTRO DE CERTIFICACIONES Y FORMACIÓN CONTINUA
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-bold">
                            +920 HORAS TOTALES
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          Acreditaciones clasificadas bajo nomenclatura unificada <b>CERT-[ÁREA]-[NN]</b> (IBM, Google, Oracle/Alura, MinTIC, Avianca Express y Cámara de Comercio de Bogotá).
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
                            <span>Tabla</span>
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
                            <span>Tarjetas</span>
                          </button>
                        </div>

                        <a
                          href={CREDLY_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playClick()}
                          className="px-3 py-1.5 rounded bg-[#a855f7]/20 hover:bg-[#a855f7]/40 border border-[#a855f7]/60 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0 cursor-pointer no-underline"
                        >
                          <span>Perfil Credly</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Resumen Superior de Horas por Dominio */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 font-mono text-center">
                      <div className="p-2 rounded bg-black/60 border border-[#00F0FF]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">DATA &amp; IA</span>
                        <strong className="text-[#00F0FF] text-xs font-bold">+220h</strong>
                        <span className="text-[8px] text-zinc-500 block">7 Cursos</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#FFE066]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">DEV PYTHON</span>
                        <strong className="text-[#FFE066] text-xs font-bold">+185h</strong>
                        <span className="text-[8px] text-zinc-500 block">5 Cursos</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#38BDF8]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">RESOLUCIÓN</span>
                        <strong className="text-[#38BDF8] text-xs font-bold">+132h</strong>
                        <span className="text-[8px] text-zinc-500 block">CCB 120h</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#EC4899]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">FOTOGRAFÍA</span>
                        <strong className="text-[#EC4899] text-xs font-bold">+216h</strong>
                        <span className="text-[8px] text-zinc-500 block">Zona Cinco</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#10B981]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">E-COMMERCE</span>
                        <strong className="text-[#10B981] text-xs font-bold">+90h</strong>
                        <span className="text-[8px] text-zinc-500 block">Google/CCB</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#a855f7]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">AGILIDAD/SEC</span>
                        <strong className="text-[#a855f7] text-xs font-bold">+50h</strong>
                        <span className="text-[8px] text-zinc-500 block">IBM Skills</span>
                      </div>
                      <div className="p-2 rounded bg-black/60 border border-[#F59E0B]/30">
                        <span className="text-[8.5px] text-zinc-400 block uppercase">AERONÁUTICA</span>
                        <strong className="text-[#F59E0B] text-xs font-bold">100%</strong>
                        <span className="text-[8px] text-zinc-500 block">SMS/AVSEC</span>
                      </div>
                    </div>

                    {/* Filtros por Categoría */}
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono text-[10.5px]">
                      <span className="text-zinc-500 uppercase text-[10px] mr-1 hidden sm:inline">FILTRO:</span>
                      {[
                        { key: 'ALL', label: `TODAS (${MASTER_CERTIFICATIONS_INVENTORY.length})` },
                        { key: 'DATA', label: 'DATA & IA (7)' },
                        { key: 'DEV', label: 'DEV & PYTHON (5)' },
                        { key: 'LEGAL', label: 'RESOLUCIÓN CCB (3)' },
                        { key: 'OPER', label: 'AERONÁUTICA SMS (5)' },
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
                              <th className="py-2.5 px-3 min-w-[120px]">Código</th>
                              <th className="py-2.5 px-3 min-w-[240px]">Certificación Oficial</th>
                              <th className="py-2.5 px-3 min-w-[70px]">Horas / Nota</th>
                              <th className="py-2.5 px-3 min-w-[170px]">Institución Emisora</th>
                              <th className="py-2.5 px-3 min-w-[120px]">Área</th>
                              <th className="py-2.5 px-3 text-right min-w-[90px]">Validación</th>
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
                                      <span>Verificar</span>
                                      <ExternalLink size={9} />
                                    </a>
                                  ) : (
                                    <span className="text-[10px] text-zinc-500 font-mono">Oficial</span>
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
                                  <span>Credencial</span>
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
                {/* PESTAÑA 5: MAGI VALUATION ENGINE & RETORNO DE INVERSIÓN (ROI)   */}
                {/* ================================================================= */}
                {activeTab === 'CALCULATOR' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* Header del MAGI Valuation Engine */}
                    <div className="p-4 rounded-lg bg-[#070914] border border-[#10b981]/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1">
                        <h3 className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider flex items-center gap-1.5">
                          <Calculator size={14} />
                          <span>MAGI VALUATION ENGINE // RETORNO DE INVERSIÓN AL CONTRATAR O ASOCIARSE CON GUSTAVO DE LA ROSA</span>
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                          CONSENSO MAGI: 3/3 APROBADO
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Modelo de costeo y optimización de capital: compara el impacto de contratar una célula técnica tradicional frente al efecto multiplicador de incorporar a Gustavo De La Rosa con más de <b>1.140 horas de software y pipelines pre-construidos</b> desde el primer día.
                      </p>
                    </div>

                    {/* BLOQUE A: EFECTO MULTIPLICADOR 4x1 (CÉLULA TRADICIONAL VS. GUSTAVO DE LA ROSA) */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#070a14] border border-zinc-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Users size={14} className="text-[#38bdf8]" />
                          <span>BLOQUE A: EFECTO MULTIPLICADOR 4 EN 1 — ANÁLISIS DE MERCADO COLOMBIA</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded">
                          AHORRO ANUAL: ~$190M+ COP
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Opción A: Célula Tradicional */}
                        <div className="p-3.5 rounded bg-red-950/15 border border-red-500/30 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-red-400 uppercase">
                              OPCIÓN A: CÉLULA TÉCNICA TRADICIONAL
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">4 Nóminas Separadas</span>
                          </div>

                          <div className="space-y-1.5 font-mono text-xs text-zinc-300">
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• Analista de Datos &amp; BI (SQL/Looker)</span>
                              <span className="text-zinc-200 font-bold">$5.500.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• Ingeniero de Scraping &amp; WAF Bypass L7</span>
                              <span className="text-zinc-200 font-bold">$7.200.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• Desarrollador Frontend React &amp; 3D WebGL</span>
                              <span className="text-zinc-200 font-bold">$6.000.000 COP</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-800/60">
                              <span>• Arquitecto de Infraestructura &amp; IA Local</span>
                              <span className="text-zinc-200 font-bold">$8.000.000 COP</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-red-500/30 flex items-baseline justify-between font-mono">
                            <span className="text-xs text-zinc-400">COSTO MENSUAL TOTAL:</span>
                            <span className="text-base font-bold text-red-400">~$22.300.000 COP / mes</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                            * Implica $267.6M COP/año + costos de onboarding, cargas prestacionales (+52%), fricción de comunicación y 4 meses mínimos de curva de aprendizaje.
                          </p>
                        </div>

                        {/* Opción B: Solución Unificada Gustavo De La Rosa */}
                        <div className="p-3.5 rounded bg-emerald-950/20 border border-emerald-500/40 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                              OPCIÓN B: INTEGRACIÓN UNIFICADA (GUSTAVO DE LA ROSA)
                            </span>
                            <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                              MULTIPLICADOR 4x1
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-zinc-200 font-sans">
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>Una sola mente estratégica:</b> Arquitectura, datos territoriales, scraping L7 y gemelos WebGL 3D ejecutados sin silos.</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>Capital Intelectual Día 1:</b> Aporta 1.140 horas de librerías, parsers en C (libxml2) y pipelines probados en campo.</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>Valor en Activos Pre-construidos:</b> Más de <b>$68.400.000 COP</b> en software propietario listo para producción inmediata.</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span><b>Alineación con el Negocio:</b> Capacidad demostrada en el sector público (Santa Fe) y proyectos comerciales B2B.</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-emerald-500/30 flex items-baseline justify-between font-mono">
                            <span className="text-xs text-zinc-300">AHORRO NETO ESTIMADO:</span>
                            <span className="text-base font-bold text-emerald-400">+60% a 70% Directo</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                            * Despliegue inmediato sin semanas de inducción ni desalineación entre frontend, backend y analítica de datos.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BLOQUE B: SELECTOR TÁCTICO DE 3 MODALIDADES DE INVERSIÓN */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#070a14] border border-zinc-800 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Target size={14} className="text-[#FFE066]" />
                          <span>BLOQUE B: ESCOJA SU MODALIDAD DE VINCULACIÓN O ASOCIACIÓN</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          SELECCIONADA: <b className="text-white">{activeInvestment.title}</b>
                        </span>
                      </div>

                      {/* 3 Botones de Selección */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {INVESTMENT_MODES.map((mode) => {
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
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">MODALIDAD ACTIVA:</span>
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
                          <span className="text-zinc-300">VENTAJA DIRECTA / AHORRO:</span>
                          <span className="text-emerald-400 font-bold">{activeInvestment.savingsOrAdvantage}</span>
                        </div>

                        {/* Competencias y Diferenciales Clave */}
                        <div className="space-y-2">
                          <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider block">
                            DIFERENCIALES &amp; VALOR AGREGADO GARANTIZADO:
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
                          <strong className="text-white font-mono block mb-1">IMPACTO OPERATIVO INMEDIATO:</strong>
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
                          <span>Agendar Sesión Técnica sobre {activeInvestment.title} vía WhatsApp B2B</span>
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
                  <span>NERV C2 // NOVUX OPS • REGISTRO OFICIAL DE TELEMETRÍA PROFESIONAL</span>
                </div>
                <span>BOGOTÁ D.C. • AÑO 2026</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
