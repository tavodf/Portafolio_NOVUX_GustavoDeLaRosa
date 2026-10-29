import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Award, Briefcase, Calculator, CheckCircle2, ChevronRight, 
  Clock, Cpu, Download, ExternalLink, FileText, Layers, ShieldCheck, 
  Sparkles, Terminal, TrendingUp, User, X, DollarSign, Send, MapPin, 
  Database, RefreshCw, Gauge, PlaySquare, Video, ShieldAlert
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';

type TabKey = 'TELEMETRY' | 'EXPERIENCE' | 'BADGES' | 'CALCULATOR';

interface EvaArchitecture {
  id: 'DAG' | 'ETL' | 'C2' | 'BI' | 'PRICING';
  unitCode: string;
  unitName: string;
  label: string;
  basePerHour: number;
  roiMultiplier: number;
  primaryColor: string;
  secondaryColor: string;
  syncRate: string;
  techFocus: string;
}

const EVA_ARCHITECTURES: Record<string, EvaArchitecture> = {
  DAG: {
    id: 'DAG',
    unitCode: 'EVA-01',
    unitName: 'TEST TYPE',
    label: 'NOVUX CPC // Grafos Kahn DAG & Hemiciclo 3D',
    basePerHour: 115000,
    roiMultiplier: 3.8,
    primaryColor: '#7C3AED',
    secondaryColor: '#10B981',
    syncRate: 'SYNC RATE: 100%',
    techFocus: 'Topological Kahn Sort, React 19, Three.js'
  },
  ETL: {
    id: 'ETL',
    unitCode: 'EVA-02',
    unitName: 'PRODUCTION MODEL',
    label: 'ARES SCRAPER // Ingesta Concurrente L7 & Data Lakes',
    basePerHour: 95000,
    roiMultiplier: 3.4,
    primaryColor: '#EF4444',
    secondaryColor: '#F59E0B',
    syncRate: 'PERIMETER: HARDENED A+',
    techFocus: 'Python Asíncrono, libxml2 en RAM, SLA 99.98%'
  },
  C2: {
    id: 'C2',
    unitCode: 'EVA-00',
    unitName: 'PROTO-TYPE',
    label: 'NOVUX COT // Gemelo Digital 3D & Comando C2',
    basePerHour: 145000,
    roiMultiplier: 5.0,
    primaryColor: '#06B6D4',
    secondaryColor: '#EAB308',
    syncRate: 'SYNC RATE: 100%',
    techFocus: 'WebGL 2.0 (60 FPS GPU), Gauss-Haversine WASM'
  },
  BI: {
    id: 'BI',
    unitCode: 'MAGI',
    unitName: 'TRI-SUPERCOMPUTER',
    label: 'SANTA FE BI // Inteligencia Territorial & PostGIS',
    basePerHour: 110000,
    roiMultiplier: 4.2,
    primaryColor: '#059669',
    secondaryColor: '#3B82F6',
    syncRate: 'MAGI CONSENSUS: 3/3',
    techFocus: 'PostgreSQL + PostGIS, +131k Registros'
  },
  PRICING: {
    id: 'PRICING',
    unitCode: 'EVA-04',
    unitName: 'PRICING CORE',
    label: 'NOVUX PCD // Motor de Fijación Dinámica & Arbitraje',
    basePerHour: 125000,
    roiMultiplier: 4.6,
    primaryColor: '#D97706',
    secondaryColor: '#94A3B8',
    syncRate: 'SYNC RATE: 100%',
    techFocus: 'Regex Dimensional, Elasticidad Buy-Box'
  }
};

export function CurriculumTelemetryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('TELEMETRY');

  // Estado de la Calculadora de Costeo de Software (Modelos EVA & CPC)
  const [calcType, setCalcType] = useState<'DAG' | 'ETL' | 'C2' | 'BI' | 'PRICING'>('DAG');
  const [calcHours, setCalcHours] = useState(120);
  const [calcComplexity, setCalcComplexity] = useState<1.0 | 1.35 | 1.8>(1.35);

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

  // Cálculo Algorítmico del Modelo de Costeo EVA (Economic Value Added)
  const selectedArch = EVA_ARCHITECTURES[calcType];
  const totalCostCOP = Math.round(calcHours * selectedArch.basePerHour * calcComplexity);
  const totalCostUSD = Math.round(totalCostCOP / 4150);
  const annualSavingsCOP = Math.round(totalCostCOP * selectedArch.roiMultiplier);
  const paybackMonths = ((totalCostCOP / (annualSavingsCOP / 12))).toFixed(1);
  const manualHoursSavedMonth = Math.round(calcHours * 0.45);

  const getCalculatorWhatsAppMsg = () => {
    return encodeURIComponent(
      `Hola Gustavo Alberto De La Rosa Flórez (NOVUX S.A.S.), calculé una cotización preliminar desde la Consola Táctica NERV C2:
- Unidad Táctica: [${selectedArch.unitCode}] ${selectedArch.label}
- Esfuerzo Estimado: ${calcHours} Horas de Ingeniería
- Complejidad Lógica: ${calcComplexity === 1.0 ? 'Básica (1.0x)' : calcComplexity === 1.35 ? 'Intermedia (1.35x)' : 'Avanzada / Alta Concurrencia (1.8x)'}
- Inversión Proyectada: $${totalCostCOP.toLocaleString('es-CO')} COP (~$${totalCostUSD.toLocaleString('en-US')} USD).
- Consenso MAGI: 3/3 Aprobado (ROI Proyectado: ${paybackMonths} meses).
Deseo agendar una sesión técnica para revisar requerimientos.`
    );
  };

  // Credenciales Verificadas y Badges Credly
  const badgesList = [
    {
      title: 'Agile Explorer',
      issuer: 'IBM SkillsBuild',
      category: 'Metodologías Ágiles & Scrum',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#00f0ff'
    },
    {
      title: 'Explore Emerging Tech',
      issuer: 'IBM SkillsBuild',
      category: 'Tecnologías Emergentes & Cloud',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#FFE066'
    },
    {
      title: 'Cybersecurity Fundamentals',
      issuer: 'IBM SkillsBuild',
      category: 'Ciberseguridad Defensiva',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#10b981'
    },
    {
      title: 'Web Development with Python',
      issuer: 'IBM SkillsBuild',
      category: 'Desarrollo Web & Backend',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#a855f7'
    },
    {
      title: 'Python for Data Science & AI',
      issuer: 'IBM / Coursera',
      category: 'Ciencia de Datos & IA',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#00f0ff'
    },
    {
      title: 'Programación en Python (50 Horas)',
      issuer: 'MinTIC / Univ. Distrital FJC',
      category: 'Certificación Académica Oficial',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      color: '#FFE066'
    }
  ];

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
              <span className="font-bold text-[#00f0ff]">NERV C2 //</span>
              <span>Telemetría &amp; Hoja de Vida Profesional</span>
            </div>
          </div>

          {/* Botón Circular 3D Isométrico con Borde Táctico NERV / MAGI */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            onMouseEnter={() => sfx.playHover()}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#060814] via-[#121329] to-[#060814] text-white shadow-[0_12px_28px_rgba(0,0,0,0.85),0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center cursor-pointer border-2 border-[#00f0ff]/80 hover:border-[#a855f7] relative transition-colors duration-300"
            aria-label="Abrir Consola de Telemetría Táctica NERV"
          >
            {/* Brillo Isométrico Superior */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Anillo de Pulso Telemétrico NERV */}
            <span className="absolute -inset-1 rounded-full border border-[#00f0ff]/50 animate-ping opacity-75 pointer-events-none" />

            {/* Icono Central: Telemetría / NERV C2 */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Activity size={22} className="text-[#00f0ff] group-hover:text-[#FFE066] transition-colors" />
              <span className="text-[7px] font-mono uppercase font-bold text-zinc-300 tracking-tighter">NERV // C2</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL COMPLETO: DASHBOARD TÁCTICO NERV C2 & MAGI SYSTEM                   */}
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

              {/* Cabecera Principal del Dashboard con HUD NERV / MAGI */}
              <div className="p-4 sm:p-6 border-b border-zinc-800 bg-[#0a0d18]/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 border border-[#00f0ff]/50 font-mono text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider">
                      NERV C2 TACTICAL HUD
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      MAGI SYNC RATE: 100%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 font-mono text-[10px] text-zinc-400">
                      PERIMETER: HARDENED A+
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    Gustavo Alberto De La Rosa Flórez
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs font-mono">
                    <span className="text-[#FFE066] font-semibold">
                      Data &amp; Automation Analyst | Python Developer | AI Solutions Builder
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400">C.C. 1.032.428.783 de Bogotá D.C.</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans italic mt-1">
                    * Perfil validado mediante certificaciones técnicas internacionales y experiencia contractual demostrable en el sector público.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="self-end sm:self-center p-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-red-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Cerrar Consola Táctica"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Barra de Navegación de las 4 Pestañas */}
              <div className="flex border-b border-zinc-800 bg-[#05060b] px-4 overflow-x-auto scrollbar-none gap-2">
                <button
                  onClick={() => handleTabChange('TELEMETRY')}
                  className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'TELEMETRY'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Cpu size={14} />
                  <span>1. Telemetría &amp; Stack</span>
                </button>

                <button
                  onClick={() => handleTabChange('EXPERIENCE')}
                  className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'EXPERIENCE'
                      ? 'border-[#FFE066] text-[#FFE066] bg-[#FFE066]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Briefcase size={14} />
                  <span>2. Experiencia (Santa Fe)</span>
                </button>

                <button
                  onClick={() => handleTabChange('BADGES')}
                  className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'BADGES'
                      ? 'border-[#a855f7] text-[#a855f7] bg-[#a855f7]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Award size={14} />
                  <span>3. Insignias &amp; Credly</span>
                </button>

                <button
                  onClick={() => handleTabChange('CALCULATOR')}
                  className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'CALCULATOR'
                      ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Calculator size={14} />
                  <span>4. Modelos EVA (MAGI C2)</span>
                </button>
              </div>

              {/* Contenido Dinámico de las Pestañas */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-sans space-y-6">

                {/* ================================================================= */}
                {/* PESTAÑA 1: TELEMETRÍA DE RENDIMIENTO & STACK                       */}
                {/* ================================================================= */}
                {activeTab === 'TELEMETRY' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Tarjetas Métricas Clave de Telemetría */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-[#0a0d18] border border-[#00f0ff]/40 text-left">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          ESFUERZO DE DESARROLLO LOGUEADO
                        </span>
                        <div className="text-2xl font-mono font-bold text-[#00f0ff]">
                          +1,840 Horas
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1">
                          Iteración en motores de datos, parsing L7 y tableros territoriales.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-[#0a0d18] border border-[#FFE066]/40 text-left">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          REDUCCIÓN DE LATENCIA DE CONSULTA
                        </span>
                        <div className="text-2xl font-mono font-bold text-[#FFE066]">
                          &gt;2,500ms → &lt;180ms
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1">
                          Optimización en PostgreSQL/PostGIS e índices espaciales en memoria.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-[#0a0d18] border border-[#10b981]/40 text-left">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          RESOLUCIÓN LOGÍSTICA EN CAMPO
                        </span>
                        <div className="text-2xl font-mono font-bold text-[#10b981]">
                          60 Gestores
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1">
                          Algoritmo de asignación y despacho coordinado simultáneo en territorio.
                        </p>
                      </div>
                    </div>

                    {/* NUEVO PANEL TÁCTICO: TIEMPOS DE CONCEPTUALIZACIÓN VS. MATERIALIZACIÓN */}
                    <div className="p-4 rounded-lg bg-[#080914] border border-[#00f0ff]/30 text-left space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Gauge size={14} className="text-[#00f0ff]" />
                          <span>Telemetría de Ciclo de Vida: Conceptualización vs. Materialización</span>
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                          SPEEDUP: ~60% ACELERACIÓN
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[9.5px]">SPRINT CONCEPTUAL / MODELADO:</span>
                          <strong className="text-[#FFE066] text-base block mt-0.5">48 Horas</strong>
                          <span className="text-zinc-400 text-[10px] block mt-0.5">
                            Diseño de DAGs, esquemas Pydantic y blueprints de microservicios.
                          </span>
                        </div>

                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[9.5px]">MATERIALIZACIÓN A PRODUCCIÓN:</span>
                          <strong className="text-[#00f0ff] text-base block mt-0.5">120 Horas</strong>
                          <span className="text-zinc-400 text-[10px] block mt-0.5">
                            Pipelines ETL, WebGL 2.0 (60 FPS) y hardening bancario A+.
                          </span>
                        </div>

                        <div className="p-3 rounded bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[9.5px]">MOTOR MULTIMEDIA / YOUTUBE:</span>
                          <strong className="text-[#10b981] text-base block mt-0.5">+131k Nodos</strong>
                          <span className="text-zinc-400 text-[10px] block mt-0.5">
                            Telemetría continua, streaming multicanal y sincronización WebGL.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desglose de Stack Técnico Canónico */}
                    <div className="space-y-4 text-left">
                      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Terminal size={15} className="text-[#00f0ff]" />
                        <span>Core Stack de Producción &amp; Arquitectura</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#00f0ff] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                            PYTHON CORE &amp; INGENIERÍA DE DATOS
                          </h4>
                          <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                            Pandas, NumPy, Requests, Pydantic, Selenium Headless, BeautifulSoup4, parsing nativo C (libxml2) en memoria RAM y scripts CLI automatizados.
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['Pandas', 'NumPy', 'Pydantic', 'Asyncio', 'libxml2', 'FastAPI'].map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#FFE066] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066]" />
                            FRONTEND REACT 19 &amp; VISUALIZACIÓN 3D
                          </h4>
                          <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                            React 19, TypeScript, Vite 8, WebGL 2.0 con Three.js Engine (60 FPS constantes), MapLibre GL, Recharts dinámico y Tailwind CSS.
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['React 19', 'TypeScript', 'Three.js', 'WebGL 2.0', 'Recharts', 'Tailwind'].map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#38bdf8] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                            ARQUITECTURA RESILIENTE &amp; ALTA DISPONIBILIDAD (SLA 99.98%)
                          </h4>
                          <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                            Despliegue multi-región en red Edge de baja latencia, aislamiento estricto de entornos de cómputo, cifrado de datos de grado industrial en tránsito y reposo, y tolerancia a fallos diseñada para máxima continuidad de negocio.
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['SLA 99.98%', 'Edge Global', 'Cifrado E2E', 'Zero-Trust', 'Alta Concurrencia'].map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#10b981] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            ALGORITMOS &amp; INTEGRACIÓN DE MODELOS IA
                          </h4>
                          <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                            Ordenación topológica Kahn DAG para flujos normativos, cálculo geodésico Gauss-Haversine submétrico y orquestación con LLM APIs (Gemini 2.5 / OpenAI).
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['Kahn DAG', 'Gauss-Haversine', 'Gemini API', 'PostGIS', 'Looker Studio'].map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 2: EXPERIENCIA DEMOSTRABLE (ALCALDÍA LOCAL SANTA FE)       */}
                {/* ================================================================= */}
                {activeTab === 'EXPERIENCE' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    {/* Tarjeta de Respaldo Contractual Oficial */}
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#FFE066]/40">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#FFE066]" />
                          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            Fondo de Desarrollo Local de Santa Fe — Alcaldía Local
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-[#FFE066] font-bold">
                          Total Acumulado: 1 Año, 11 Meses y 11 Días
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Trayectoria contractual continua demostrable (21/12/2024 al 01/10/2026). Radicado oficial No. <b>20265320571351</b>. Evolución progresiva desde el monitoreo territorial de variables de alta complejidad hacia el liderazgo técnico en ingeniería de datos, analítica geoespacial y automatización de reportes mediante IA Generativa.
                      </p>
                    </div>

                    {/* Línea de Tiempo de los 5 Contratos CPS */}
                    <div className="space-y-4">
                      {contractsList.map((c, idx) => (
                        <div 
                          key={idx}
                          className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-[#FFE066]/60 transition-all text-left relative overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#FFE066] bg-[#FFE066]/10 px-2 py-0.5 rounded border border-[#FFE066]/30">
                                {c.code}
                              </span>
                              <span className="text-xs font-mono text-zinc-400">
                                {c.period}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                              {c.tag}
                            </span>
                          </div>

                          <h4 className="text-sm font-serif font-bold text-white mb-1">
                            {c.role}
                          </h4>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                            {c.impact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 3: INSIGNIAS Y CREDENCIALES VERIFICADAS (CREDLY / IBM)     */}
                {/* ================================================================= */}
                {activeTab === 'BADGES' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#a855f7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xs font-mono font-bold text-[#a855f7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Award size={14} />
                          <span>Perfil Oficial Verificado en Credly</span>
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans">
                          Insignias digitales emitidas por IBM SkillsBuild, MinTIC y entidades acreditadas globales.
                        </p>
                      </div>

                      <a
                        href="https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sfx.playClick()}
                        className="px-3.5 py-1.5 rounded bg-[#a855f7]/20 hover:bg-[#a855f7]/40 border border-[#a855f7]/60 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0 cursor-pointer no-underline"
                      >
                        <span>Ver Perfil Credly</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {badgesList.map((badge, idx) => (
                        <div 
                          key={idx}
                          className="p-4 rounded-lg bg-black/60 border border-zinc-800 hover:border-[#a855f7]/60 transition-all flex flex-col justify-between text-left"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[10px] font-mono text-zinc-400 truncate">
                                {badge.issuer}
                              </span>
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                            </div>
                            <h4 className="font-serif text-sm font-bold text-white mb-1 leading-snug">
                              {badge.title}
                            </h4>
                            <p className="text-[11px] text-zinc-400 font-sans">
                              {badge.category}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-[#a855f7]">
                            <span>ESTADO: VERIFICADO</span>
                            <span className="text-zinc-600">✓ NATIVO</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 4: MODELOS EVA & CALCULADORA DE COSTEO (NERV / MAGI C2)   */}
                {/* ================================================================= */}
                {activeTab === 'CALCULATOR' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="p-4 rounded-lg bg-[#070914] border border-[#10b981]/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1">
                        <h3 className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider flex items-center gap-1.5">
                          <Calculator size={14} />
                          <span>NERV C2 // Motor Económico EVA (Economic Value Added) &amp; MAGI Tri-Consensus</span>
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                          CONSENSO MAGI: 3/3 APROBADO
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Abstracción matemática de los modelos CPC/EVA: calcula el valor comercial de despliegue, horas telemétricas y retorno de inversión garantizado (ROI) para las 5 Unidades Tácticas.
                      </p>
                    </div>

                    {/* SELECTOR DE LAS 5 UNIDADES TÁCTICAS (ESTÉTICA EVANGELION / NERV) */}
                    <div>
                      <label className="text-xs font-mono font-bold text-zinc-300 block mb-2">
                        SELECCIONE LA UNIDAD TÁCTICA A DESPLEGAR:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {Object.values(EVA_ARCHITECTURES).map((arch) => {
                          const isSelected = calcType === arch.id;
                          return (
                            <button
                              key={arch.id}
                              onClick={() => {
                                sfx.playSelect();
                                setCalcType(arch.id);
                              }}
                              className={`p-2.5 rounded text-left border transition-all cursor-pointer font-mono ${
                                isSelected
                                  ? 'bg-[#0f1224] scale-102 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                                  : 'bg-black/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                              }`}
                              style={{
                                borderColor: isSelected ? arch.primaryColor : undefined
                              }}
                            >
                              <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                                <span style={{ color: arch.primaryColor }}>{arch.unitCode}</span>
                                <span className="text-[9px] text-zinc-500">{arch.unitName}</span>
                              </div>
                              <div className={`text-[11px] font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                {arch.label.split('//')[0]}
                              </div>
                              <div className="text-[9.5px] text-zinc-500 mt-1 truncate">
                                {arch.techFocus}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Controles de Parámetros de la Calculadora */}
                      <div className="lg:col-span-6 space-y-4 bg-black/60 p-4 rounded-lg border border-zinc-800">
                        {/* Slider de Horas de Ingeniería */}
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span>ESFUERZO ESTIMADO DE INGENIERÍA:</span>
                            <span className="font-bold text-[#FFE066]">{calcHours} Horas</span>
                          </div>
                          <input
                            type="range"
                            min="40"
                            max="320"
                            step="20"
                            value={calcHours}
                            onChange={(e) => setCalcHours(Number(e.target.value))}
                            className="w-full accent-[#10b981] cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                            <span>40h (Sprint Rápido)</span>
                            <span>160h (Mes Completo)</span>
                            <span>320h (Despliegue Core)</span>
                          </div>
                        </div>

                        {/* Selector de Complejidad Lógica */}
                        <div>
                          <label className="text-xs font-mono font-bold text-zinc-300 block mb-1.5">
                            COMPLEJIDAD LÓGICA &amp; ARQUITECTURA:
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { val: 1.0, label: 'Básica (1.0x)' },
                              { val: 1.35, label: 'Media (1.35x)' },
                              { val: 1.8, label: 'Alta Concurrencia (1.8x)' }
                            ].map((item) => (
                              <button
                                key={item.val}
                                onClick={() => setCalcComplexity(item.val as any)}
                                className={`py-2 px-1 text-center rounded font-mono text-[11px] border transition-all cursor-pointer ${
                                  calcComplexity === item.val
                                    ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981] font-bold'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* PANEL TÁCTICO MAGI TRI-CONSENSUS (MELCHIOR, BALTHASAR, CASPER) */}
                        <div className="p-3 rounded bg-[#070914] border border-zinc-800 font-mono text-[10.5px] space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1">
                            <span>SUPERCOMPUTADORES MAGI</span>
                            <span className="text-emerald-400 font-bold">VOTO UNÁNIME (3/3)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-400">MELCHIOR-1 (Viabilidad Técnica):</span>
                            <span className="text-emerald-400 font-bold">APROBADO 100%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-400">BALTHASAR-2 (Retorno ROI &amp; Costos):</span>
                            <span className="text-amber-400 font-bold">APROBADO 100%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-400">CASPER-3 (Resiliencia &amp; SLA):</span>
                            <span className="text-cyan-400 font-bold">APROBADO 100%</span>
                          </div>
                        </div>
                      </div>

                      {/* Panel de Resultados Matemáticos EVA */}
                      <div className="lg:col-span-6 bg-[#080a14] p-5 rounded-lg border border-[#10b981]/40 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                              VALOR COMERCIAL ESTIMADO DE DESPLIEGUE:
                            </span>
                            <span 
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                              style={{
                                color: selectedArch.primaryColor,
                                borderColor: `${selectedArch.primaryColor}50`,
                                backgroundColor: `${selectedArch.primaryColor}15`
                              }}
                            >
                              [{selectedArch.unitCode}]
                            </span>
                          </div>
                          <div className="text-3xl font-mono font-bold text-white flex items-baseline gap-2">
                            <span className="text-[#10b981]">${totalCostCOP.toLocaleString('es-CO')}</span>
                            <span className="text-xs font-mono text-zinc-400">COP</span>
                          </div>
                          <div className="text-xs font-mono text-zinc-400 mt-0.5">
                            Equivalente aproximado: <b>~${totalCostUSD.toLocaleString('en-US')} USD</b>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 text-left">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                              AHORRO OPERATIVO ANUAL:
                            </span>
                            <span className="font-mono text-sm font-bold text-[#FFE066]">
                              ${annualSavingsCOP.toLocaleString('es-CO')} COP
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                              RETORNO DE INVERSIÓN (ROI):
                            </span>
                            <span className="font-mono text-sm font-bold text-emerald-400">
                              {paybackMonths} Meses
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                              HORAS-HOMBRE AHORRADAS:
                            </span>
                            <span className="font-mono text-xs font-bold text-zinc-300">
                              ~{manualHoursSavedMonth} h / mes
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                              PROPIEDAD DE CÓDIGO:
                            </span>
                            <span className="font-mono text-xs font-bold text-[#00f0ff]">
                              100% Cesión Total
                            </span>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/573196300410?text=${getCalculatorWhatsAppMsg()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playPowerUp()}
                          className="w-full py-3 px-4 rounded bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer no-underline"
                        >
                          <Send size={14} />
                          <span>Solicitar Despliegue con Parámetros NERV C2</span>
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
