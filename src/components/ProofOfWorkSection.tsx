import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Database, Play, ExternalLink, Cpu, 
  Layers, MapPin, CheckCircle2, TrendingDown, ArrowUpRight,
  Terminal, Sparkles, LineChart
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl } from '../data';

export function ProofOfWorkSection() {
  const [activeTab, setActiveTab] = useState<'ARES' | 'SANTAFE' | 'GESTOR' | 'RETAIL'>('ARES');

  const tabs = [
    {
      id: 'ARES' as const,
      label: 'Caso 01: Ares Grid',
      subtitle: 'Bypass WAF & Minería L7',
      tag: 'Scraping Industrial',
      accent: '#38bdf8'
    },
    {
      id: 'SANTAFE' as const,
      label: 'Caso 02: Santa Fe BI',
      subtitle: '+131k Interacciones Bogotá',
      tag: 'Looker Studio en Vivo',
      accent: '#facc15'
    },
    {
      id: 'GESTOR' as const,
      label: 'Caso 03: Gestor Ops',
      subtitle: 'Balanceo Territorial CST 23',
      tag: 'DataOps & RPA',
      accent: '#10b981'
    },
    {
      id: 'RETAIL' as const,
      label: 'Caso 04: MarketPulse',
      subtitle: 'Auditoría 15,000 SKUs',
      tag: 'Vigilancia Comercial',
      accent: '#c084fc'
    }
  ];

  return (
    <section className="w-full max-w-6xl my-16">
      {/* Encabezado del Bloque 2 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(197,160,89,0.18)] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FFE066] animate-ping" />
          <span>// BLOQUE 2: CASOS DE ÉXITO & "PROOF OF WORK"</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
          Evidencia Técnica Comprobada en Producción
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-2">
          No comenzamos desde cero. Cada solución B2B está respaldada por motores algorítmicos ya desplegados, validados y auditables.
        </p>
      </div>

      {/* Contenedor con Pestañas de Casos */}
      <div className="bg-[#0b0b10] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Selector de Pestañas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#12121a] border-b border-zinc-800 p-2 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playClick();
                  setActiveTab(tab.id);
                }}
                className={`p-3 rounded-lg text-left transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-[#1b1b26] border border-[#C5A059]/60 shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                    : 'bg-black/40 hover:bg-[#161622] border border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${isActive ? 'text-[#FFE066]' : 'text-zinc-500'}`}>
                    {tab.tag}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FFE066] shadow-[0_0_8px_#FFE066]" />}
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono text-zinc-100">
                  {tab.label}
                </div>
                <div className="text-[11px] text-zinc-400 truncate">
                  {tab.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Contenido Dinámico de la Pestaña Activa */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* CASO 1: ARES GRID */}
            {activeTab === 'ARES' && (
              <motion.div
                key="ARES"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-500/40 text-sky-300 font-mono text-xs">
                    <ShieldCheck size={13} />
                    <span>CASE-ARES-GRID // EVASIÓN WAF EN VIVO</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    Ares Scraper: Minería de Datos & Bypass Antibot Perimetral
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    Demostración práctica de evasión de firewalls (Cloudflare / Akamai) mediante emulación de huellas digitales TLS/JA3 con Selenium Stealth y un motor de parsing ultrarrápido compilado en lenguaje C (<code className="text-[#FFE066]">libxml2</code>).
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3 rounded bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">EFICIENCIA RAM:</span>
                      <strong className="text-emerald-400 text-sm">~95% de Ahorro</strong>
                      <span className="text-zinc-400 text-[10px] block">Parser en memoria C</span>
                    </div>
                    <div className="p-3 rounded bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">VELOCIDAD DE BYPASS:</span>
                      <strong className="text-sky-400 text-sm">&lt; 350 ms</strong>
                      <span className="text-zinc-400 text-[10px] block">Persistencia de sesión</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#10141f] border border-sky-500/30 text-sky-200 text-xs font-mono">
                    <strong className="text-white block mb-1 font-sans">// Argumento de Cierre Técnico:</strong>
                    "Mostramos en vivo la evasión perimetral y la extracción en memoria continua C sin comprometer su IP corporativa."
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href={getWhatsAppUrl('Hola NOVUX S.A.S., requiero cotizar la extracción de un dataset estructurado con Ares Scraper.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                    >
                      <span>Cotizar Dataset Ares ($500 USD)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Video Demo Embebido */}
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-video shadow-2xl flex items-center justify-center">
                  <video
                    src="/AresGrid.mp4"
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/novux-cot-platform.png"
                  >
                    Tu navegador no soporta el tag de video.
                  </video>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-sky-500/50 text-sky-400 text-[10px] font-mono pointer-events-none">
                    ● ARES_GRID_DEMO.MP4
                  </div>
                </div>
              </motion.div>
            )}

            {/* CASO 2: SANTA FE BI */}
            {activeTab === 'SANTAFE' && (
              <motion.div
                key="SANTAFE"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs mb-2">
                      <LineChart size={13} />
                      <span>CASE-SANTAFE-BI // LOOKER STUDIO EN VIVO</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Comando Central Bogotá: +131,000 Interacciones Auditadas
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
                      Data Warehouse y pipeline ETL en Python procesando reportes de campo de la Localidad de Santa Fe con 245,000 m² recuperados.
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl('Hola NOVUX S.A.S., vi el caso de éxito de BI y deseo estructurar un Data Warehouse / Tablero para mi compañía.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Cotizar Tablero BI ($1,200 - $2,500 USD)</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Dashboard Looker Studio Interactivo Embebido */}
                <div className="w-full h-[520px] rounded-lg overflow-hidden border border-zinc-800 bg-black relative shadow-2xl">
                  <iframe
                    src="https://lookerstudio.google.com/embed/reporting/8c0ef96a-6947-42aa-8ac0-b210ba6863d1/page/qsv7F"
                    title="Tablero Looker Studio en Vivo"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                  <div className="absolute bottom-2 right-3 px-2.5 py-1 rounded bg-black/90 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    // Tablero Real Conectado a Pipeline ETL de NOVUX
                  </div>
                </div>
              </motion.div>
            )}

            {/* CASO 3: GESTOR OPS */}
            {activeTab === 'GESTOR' && (
              <motion.div
                key="GESTOR"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                    <CheckCircle2 size={13} />
                    <span>CASE-GESTOR-OPS // CONCILIACIÓN CST ART. 23</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    Gestor-Ops: Balanceo Territorial & Automatización RPA
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    Arquitectura de cruce algorítmico de cuadrillas operativas en campo. Automatiza la asignación de turnos, verifica la trazabilidad contractual y elimina discrepancias en nóminas y facturación.
                  </p>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded bg-[#0b130e] border border-emerald-500/30 text-emerald-200">
                      <span className="text-white block font-bold mb-1">Impacto Financiero Directo:</span>
                      • 40+ horas mensuales de reproceso manual ahorradas.<br/>
                      • 0% margen de error en conciliaciones territoriales.<br/>
                      • Blindaje jurídico ante litigios laborales o de contratistas.
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#15120a] border border-[#C5A059]/40 text-[#FFE066] text-xs font-mono">
                    <strong className="text-white block mb-1 font-sans">// Argumento de Cierre Técnico:</strong>
                    "Sustituya horas-hombre de digitación manual por scripts en Python con 0% de margen de error y ejecución 24/7."
                  </div>

                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl('Hola NOVUX S.A.S., busco automatizar procesos operativos y conciliación de reportes con scripts en Python (DataOps).')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Cotizar DataOps & RPA ($600 Setup + $250/mes)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Tarjeta Visual de Métricas de Cuadrilla */}
                <div className="bg-[#050907] border border-emerald-500/40 rounded-xl p-6 font-mono space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-2">
                      <Cpu size={14} />
                      MOTOR DE CONCILIACIÓN ACTIVO
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      CST ART. 23 COMPLIANT
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded bg-black/70 border border-zinc-900">
                      <span className="text-zinc-500 block text-[10px]">HORAS PROCESADAS:</span>
                      <span className="text-lg font-bold text-white">4,820 hrs/mes</span>
                    </div>
                    <div className="p-3 rounded bg-black/70 border border-zinc-900">
                      <span className="text-zinc-500 block text-[10px]">TASA DE DISCREPANCIA:</span>
                      <span className="text-lg font-bold text-emerald-400">0.00%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-black/70 border border-zinc-900 text-xs text-zinc-300 space-y-1">
                    <span className="text-zinc-500 text-[10px] block">REGLA DE BALANCEO:</span>
                    <p className="text-zinc-300 text-[11px]">
                      Algoritmo de dispersión geográfica por geocercas con asignación equitativa de carga y reporte automático en PDF/Excel.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CASO 4: MARKETPULSE */}
            {activeTab === 'RETAIL' && (
              <motion.div
                key="RETAIL"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs">
                    <TrendingDown size={13} />
                    <span>CASE-MARKETPULSE // VIGILANCIA DE 15,000 SKUs</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    MarketPulse: Detección de Quiebres y Variaciones de Precio
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    Auditoría algorítmica diaria sobre marketplaces y catálogos de distribuidores competidores. Dispara alertas inmediatas cuando un rival quiebra stock o altera su lista de precios para capturar cuota de mercado.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3 rounded bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">CATÁLOGO AUDITADO:</span>
                      <strong className="text-purple-400 text-sm">15,000+ SKUs</strong>
                      <span className="text-zinc-400 text-[10px] block">Rastreo diario asíncrono</span>
                    </div>
                    <div className="p-3 rounded bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">TIEMPO DE DETECCIÓN:</span>
                      <strong className="text-emerald-400 text-sm">&lt; 15 minutos</strong>
                      <span className="text-zinc-400 text-[10px] block">Alerta por WhatsApp/Email</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#181120] border border-purple-500/30 text-purple-200 text-xs font-mono">
                    <strong className="text-white block mb-1 font-sans">// Argumento de Cierre Técnico:</strong>
                    "Ya tenemos el motor algorítmico desplegado; no comenzamos desde cero, solo parametrizamos su catálogo objetivo."
                  </div>

                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl('Hola NOVUX S.A.S., me interesa cotizar el servicio de Monitoreo de Precios y Detección de Quiebres (MarketPulse) para mi e-commerce/empresa.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Cotizar MarketPulse ($450 Setup + $350/mes)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Simulador Visual de Alerta MarketPulse */}
                <div className="bg-[#0b0712] border border-purple-500/40 rounded-xl p-6 font-mono space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs text-purple-300 font-bold flex items-center gap-2">
                      <Sparkles size={14} />
                      TELEMETRÍA DE VARIACIÓN COMERCIAL
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                      ALERTA DISPARADA
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded bg-black/70 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 text-[10px] block">SKU OBJETIVO:</span>
                        <span className="text-white font-bold">MON-OLED-4K-32</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-500 text-[10px] block">ESTADO RIVAL:</span>
                        <span className="text-red-400 font-bold">QUIEBRE DE STOCK</span>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black/70 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 text-[10px] block">PRECIO PROMEDIO:</span>
                        <span className="text-[#FFE066] font-bold">$3,850,000 COP</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-500 text-[10px] block">OPORTUNIDAD:</span>
                        <span className="text-emerald-400 font-bold">+18% MARGEN CAPTURABLE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
