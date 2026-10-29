import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Award, Briefcase, Calculator, CheckCircle2, ChevronRight, 
  Clock, Cpu, Download, ExternalLink, FileText, Layers, ShieldCheck, 
  Sparkles, Terminal, TrendingUp, User, X, DollarSign, Send, MapPin, 
  Database, RefreshCw
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';

type TabKey = 'TELEMETRY' | 'EXPERIENCE' | 'BADGES' | 'CALCULATOR';

export function CurriculumTelemetryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('TELEMETRY');

  // Estado de la Calculadora de Costeo de Software (Modelos EVA & CPC)
  const [calcType, setCalcType] = useState<'ETL' | 'BI' | 'C2' | 'PRICING' | 'DAG'>('ETL');
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
  const projectRates = {
    ETL: { basePerHour: 95000, label: 'Pipeline ETL & Web Data Harvesting L7', roiMultiplier: 3.4 },
    BI: { basePerHour: 110000, label: 'Centro de Inteligencia de Negocios & PostGIS', roiMultiplier: 4.2 },
    C2: { basePerHour: 145000, label: 'Gemelo Digital 3D & Comando Táctico C2', roiMultiplier: 5.0 },
    PRICING: { basePerHour: 125000, label: 'Motor de Fijación Dinámica & Arbitraje', roiMultiplier: 4.6 },
    DAG: { basePerHour: 115000, label: 'Inteligencia Regulatoria & Kahn DAG', roiMultiplier: 3.8 }
  };

  const selectedRate = projectRates[calcType];
  const totalCostCOP = Math.round(calcHours * selectedRate.basePerHour * calcComplexity);
  const totalCostUSD = Math.round(totalCostCOP / 4150);
  const annualSavingsCOP = Math.round(totalCostCOP * selectedRate.roiMultiplier);
  const paybackMonths = ((totalCostCOP / (annualSavingsCOP / 12))).toFixed(1);
  const manualHoursSavedMonth = Math.round(calcHours * 0.45);

  const getCalculatorWhatsAppMsg = () => {
    return encodeURIComponent(
      `Hola Gustavo Alberto De La Rosa Flórez (NOVUX S.A.S.), calculé una cotización preliminar desde la Consola de Telemetría:
- Tipo de Solución: ${selectedRate.label}
- Esfuerzo Estimado: ${calcHours} Horas
- Complejidad: ${calcComplexity === 1.0 ? 'Básica (1.0x)' : calcComplexity === 1.35 ? 'Intermedia (1.35x)' : 'Crítica / WAF / 3D (1.8x)'}
- Inversión Proyectada: $${totalCostCOP.toLocaleString('es-CO')} COP (~$${totalCostUSD.toLocaleString('en-US')} USD).
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
      verified: true
    },
    {
      title: 'Explore Emerging Tech',
      issuer: 'IBM SkillsBuild',
      category: 'Inteligencia Artificial & Cloud',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      verified: true
    },
    {
      title: 'Cybersecurity Fundamentals',
      issuer: 'IBM SkillsBuild',
      category: 'Seguridad Defensiva & Redes',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      verified: true
    },
    {
      title: 'Web Development with Python',
      issuer: 'IBM SkillsBuild',
      category: 'Backend & APIs en Python',
      credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges',
      verified: true
    },
    {
      title: 'Programación Python 50h',
      issuer: 'MinTIC / Univ. Distrital Francisco José de Caldas',
      category: 'Algoritmos & Estructuras de Datos',
      verified: true
    },
    {
      title: 'Python for Data Science, AI & Development',
      issuer: 'IBM / Coursera',
      category: 'Data Science & Pandas Core',
      verified: true
    },
    {
      title: 'Data Visualization & Dashboards',
      issuer: 'IBM / Cognos Analytics',
      category: 'Business Intelligence & Dashboards',
      verified: true
    },
    {
      title: 'Machine Learning & Data Science',
      issuer: 'Udemy Professional',
      category: 'Modelos Predictivos & Clasificación',
      verified: true
    },
    {
      title: 'Google AI Essentials',
      issuer: 'Google / Coursera',
      category: 'IA Generativa & Productividad',
      verified: true
    }
  ];

  // Contratos CPS Alcaldía Local de Santa Fe (Fondo de Desarrollo Local)
  const cpsTimeline = [
    {
      code: 'CPS 281-2026',
      period: '21/02/2026 – 01/10/2026',
      role: 'Técnico Operativo de Campo & Analista de Datos',
      impact: 'Consolidación de tableros ejecutivos en Looker Studio y automatización de reportes mediante IA Generativa con reducción >70% en tiempos de consolidación.',
      tag: 'FASE V: AUTOMATIZACIÓN IA'
    },
    {
      code: 'CPS 425-2025',
      period: '21/09/2025 – 20/02/2026',
      role: 'Técnico Operativo de Campo & Analista de Datos',
      impact: 'Acompañamiento y control técnico del equipo de campo, diseño de pipelines ETL en Python (depuración de datasets de 8k a 5k registros de alta fidelidad) y cuadros de mando geoespaciales.',
      tag: 'FASE IV: PIPELINES ETL'
    },
    {
      code: 'CPS 183-2025',
      period: '21/06/2025 – 20/09/2025',
      role: 'Gestor de Seguridad y Convivencia Local',
      impact: 'Levantamiento geográfico y diseño de requerimientos funcionales para cuadros de mando, georreferenciación de 245,000 m² de espacio público recuperado.',
      tag: 'FASE III: MODELADO GIS'
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
      {/* DISPARADOR 3D FLOTANTE ("CURRICULUM TELEMETRY")                           */}
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
          {/* Tooltip Flotante */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
            <div className="bg-[#0b0c16]/95 border border-[#00f0ff]/50 text-white text-xs font-mono px-3 py-1.5 rounded shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span>Telemetría & Hoja de Vida Profesional</span>
            </div>
          </div>

          {/* Botón Circular 3D Isométrico con Borde Cian/Violeta NOVUX */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            onMouseEnter={() => sfx.playHover()}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0a0c18] via-[#14152b] to-[#0a0c18] text-white shadow-[0_12px_28px_rgba(0,0,0,0.85),0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center cursor-pointer border-2 border-[#00f0ff]/70 hover:border-[#a855f7] relative transition-colors duration-300"
            aria-label="Abrir Consola de Telemetría y Hoja de Vida"
          >
            {/* Brillo Isométrico Superior */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Anillo de Pulso Telemétrico */}
            <span className="absolute -inset-1 rounded-full border border-[#00f0ff]/40 animate-ping opacity-75 pointer-events-none" />

            {/* Icono Central: Telemetría / Actividad */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Activity size={22} className="text-[#00f0ff] group-hover:text-[#FFE066] transition-colors" />
              <span className="text-[7.5px] font-mono uppercase font-bold text-zinc-300 tracking-tighter">CV // OPS</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL COMPLETO: DASHBOARD DE TELEMETRÍA Y TRAYECTORIA                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 font-sans select-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl bg-[#080910] border border-[#00f0ff]/40 rounded-xl shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col max-h-[92vh] overflow-hidden text-left relative"
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#a855f7] pointer-events-none" />

              {/* Cabecera Principal del Dashboard */}
              <div className="p-4 sm:p-6 border-b border-zinc-800 bg-[#0e101a]/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 border border-[#00f0ff]/40 font-mono text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider">
                      AUTOR & DESARROLLADOR PRINCIPAL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 font-mono text-[10px] text-zinc-400">
                      C.C. 1.032.428.783 de Bogotá D.C.
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      DISPONIBLE // BOGOTÁ D.C.
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    Gustavo Alberto De La Rosa Flórez
                  </h1>
                  <p className="text-xs sm:text-sm text-[#FFE066] font-mono font-medium mt-0.5">
                    Data & Automation Analyst | Python Developer | AI Solutions Builder
                  </p>
                  <p className="text-[11px] text-zinc-400 font-sans italic mt-1">
                    * Perfil validado mediante certificaciones técnicas internacionales y experiencia contractual demostrable en el sector público.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="self-end sm:self-center p-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-red-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Cerrar Consola"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Barra de Navegación de las 4 Pestañas */}
              <div className="flex border-b border-zinc-800 bg-[#06070c] px-4 overflow-x-auto scrollbar-none gap-2">
                <button
                  onClick={() => handleTabChange('TELEMETRY')}
                  className={`py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'TELEMETRY'
                      ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Cpu size={14} />
                  <span>1. Telemetría & Stack</span>
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
                  <span>3. Insignias & Credly</span>
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
                  <span>4. Calculadora EVA</span>
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
                      <div className="p-4 rounded-lg bg-[#0e101a] border border-[#00f0ff]/30 text-left">
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

                      <div className="p-4 rounded-lg bg-[#0e101a] border border-[#FFE066]/30 text-left">
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

                      <div className="p-4 rounded-lg bg-[#0e101a] border border-[#10b981]/30 text-left">
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

                    {/* Desglose de Stack Técnico Canónico */}
                    <div className="space-y-4 text-left">
                      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Terminal size={15} className="text-[#00f0ff]" />
                        <span>Core Stack de Producción & Arquitectura</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#00f0ff] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                            PYTHON CORE & INGENIERÍA DE DATOS
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
                            FRONTEND REACT 19 & VISUALIZACIÓN 3D
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
                          <h4 className="font-mono text-xs font-bold text-[#ef4444] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                            CIBERSEGURIDAD DEFENSIVA & HARDENING
                          </h4>
                          <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                            Cabeceras HSTS (Strict-Transport-Security de grado bancario), MutationObserver anti-tamper en el DOM, escudo anti-SSRF de IPs privadas y bypass WAF vía JA3 TLS spoofing.
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['HSTS A+', 'Anti-SSRF', 'DOM Centinela', 'TLS JA3', 'SHA-256'].map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-black/60 border border-zinc-800">
                          <h4 className="font-mono text-xs font-bold text-[#10b981] mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            ALGORITMOS & INTEGRACIÓN DE MODELOS IA
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
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#FFE066]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-[#FFE066]">
                            FONDO DE DESARROLLO LOCAL DE SANTA FE (ALCALDÍA LOCAL)
                          </span>
                        </div>
                        <div className="text-sm font-sans text-white font-medium">
                          Trayectoria Demostrable Acumulada: <b>1 año, 11 meses y 11 días</b> (21/12/2024 a 01/10/2026).
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                          Certificación Laboral Oficial // Radicado No. <b>20265320571351</b>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded bg-black/60 border border-zinc-700 font-mono text-xs text-emerald-400 shrink-0 font-bold">
                        5 CONTRATOS CPS CONSECUTIVOS
                      </div>
                    </div>

                    {/* Evolución de Rol & Logros de Ingeniería */}
                    <div className="p-4 rounded-lg bg-black/70 border border-zinc-800 space-y-2">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp size={14} className="text-[#FFE066]" />
                        <span>Evolución de Rol: Del Territorio a la Ingeniería de Datos</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        • <b>Gestor de Seguridad y Convivencia Local (CPS 663-2024, 196-2025, 183-2025):</b> Levantamiento directo en campo en el centro neurálgico de Bogotá con más de 1.2 millones de población flotante, identificando la ineficiencia de cientos de planillas Excel desarticuladas.
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        • <b>Técnico Operativo de Campo & Analista de Datos (CPS 425-2025, 281-2026):</b> Transición al control técnico y diseño de pipelines ETL en Python para depurar bases de datos de 8,000 a 5,000 registros de alta fidelidad, consolidando el Cuadro de Mando en Looker Studio y reduciendo en más del <b>70%</b> los tiempos de reportería institucional.
                      </p>
                    </div>

                    {/* Línea de Tiempo de los 5 Contratos CPS */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        CRONOLOGÍA CONTRACTUAL AUDITADA (2024 - 2026)
                      </h4>

                      <div className="space-y-2.5">
                        {cpsTimeline.map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-[#0c0d16] border border-zinc-800/80 hover:border-[#FFE066]/50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#FFE066]">
                                  {item.code}
                                </span>
                                <span className="text-xs text-white font-medium">
                                  {item.role}
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
                                {item.period}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {item.impact}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================================= */}
                {/* PESTAÑA 3: INSIGNIAS Y CREDENCIALES VERIFICADAS                   */}
                {/* ================================================================= */}
                {activeTab === 'BADGES' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#a855f7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#a855f7] mb-0.5">
                          REPOSITORIO DE INSIGNIAS DIGITALES // CREDLY OFICIAL
                        </div>
                        <div className="text-sm font-sans text-white">
                          Certificaciones emitidas bajo el estándar internacional Mozilla Open Badges con verificación criptográfica.
                        </div>
                      </div>

                      <a
                        href="https://www.credly.com/users/gustavo-de-la-rosa.abf5f564/badges"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sfx.playSelect()}
                        className="px-4 py-2 rounded bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer no-underline shrink-0"
                      >
                        <span>Ver Perfil en Credly</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {badgesList.map((badge, idx) => (
                        <div 
                          key={idx}
                          className="p-3.5 rounded-lg bg-[#0b0c14] border border-zinc-800 hover:border-[#a855f7]/60 transition-all flex flex-col justify-between"
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
                {/* PESTAÑA 4: MODELOS EVA & CALCULADORA DE COSTEO DE SOFTWARE        */}
                {/* ================================================================= */}
                {activeTab === 'CALCULATOR' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    <div className="p-4 rounded-lg bg-[#0e101a] border border-[#10b981]/40">
                      <h3 className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calculator size={14} />
                        <span>Motor de Costeo Económico EVA (Economic Value Added) & CPC</span>
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Este modelo proyecta la inversión requerida y el retorno de inversión (ROI) a partir de las horas telemétricas y la complejidad lógica desplegada, asegurando que cada peso invertido en software genere ahorro comprobado.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Controles de Parámetros de la Calculadora */}
                      <div className="lg:col-span-6 space-y-4 bg-black/60 p-4 rounded-lg border border-zinc-800">
                        {/* Selector de Tipo de Arquitectura */}
                        <div>
                          <label className="text-xs font-mono font-bold text-zinc-300 block mb-1.5">
                            TIPO DE SOLUCIÓN DE SOFTWARE:
                          </label>
                          <select
                            value={calcType}
                            onChange={(e) => setCalcType(e.target.value as any)}
                            className="w-full bg-[#0e101a] border border-zinc-700 text-white rounded p-2.5 text-xs font-mono focus:border-[#10b981] outline-none cursor-pointer"
                          >
                            <option value="ETL">Pipeline ETL & Web Data Harvesting L7 (Ares Scraper)</option>
                            <option value="BI">Business Intelligence & Analítica Territorial (Santa Fe BI)</option>
                            <option value="C2">Gemelo Digital 3D & Comando Táctico C2 (NOVUX COT)</option>
                            <option value="PRICING">Motor de Arbitraje & Fijación Dinámica (NOVUX PCD)</option>
                            <option value="DAG">Inteligencia Regulatoria & Grafos Kahn DAG (CPC Pulse)</option>
                          </select>
                        </div>

                        {/* Slider de Horas de Ingeniería */}
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1.5">
                            <span>ESFUERZO ESTIMADO:</span>
                            <span className="font-bold text-[#FFE066]">{calcHours} Horas de Desarrollo</span>
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
                            COMPLEJIDAD LÓGICA & HARDENING:
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { val: 1.0, label: 'Básica (1.0x)' },
                              { val: 1.35, label: 'Media (1.35x)' },
                              { val: 1.8, label: 'Crítica / WAF (1.8x)' }
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
                      </div>

                      {/* Panel de Resultados Matemáticos EVA */}
                      <div className="lg:col-span-6 bg-[#0c0e18] p-5 rounded-lg border border-[#10b981]/30 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                            VALOR COMERCIAL ESTIMADO DE DESPLIEGUE:
                          </span>
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
                          <span>Solicitar Propuesta con estos Parámetros</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer de la Consola Modal */}
              <div className="p-3 sm:p-4 border-t border-zinc-800 bg-[#0b0c14] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NOVUX OPS // REGISTRO OFICIAL DE TELEMETRÍA PROFESIONAL</span>
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
