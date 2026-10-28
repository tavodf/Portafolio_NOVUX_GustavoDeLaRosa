import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Database, Cpu, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { Service, ServiceId } from '../types';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl } from '../data';

interface ServicesCarouselProps {
  services: Service[];
  onSelectService: (id: ServiceId) => void;
}

export function ServicesCarousel({ services, onSelectService }: ServicesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardElement = scrollContainerRef.current.firstElementChild as HTMLElement;
    if (cardElement) {
      const cardWidth = cardElement.getBoundingClientRect().width + 24;
      const newIndex = Math.min(services.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
      setActiveIndex(newIndex);
    }
  }, [services.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const handleScroll = (direction: 'left' | 'right') => {
    sfx.playSelect();
    const total = services.length;
    if (total === 0) return;
    const nextIndex = direction === 'left'
      ? (activeIndex > 0 ? activeIndex - 1 : total - 1)
      : (activeIndex < total - 1 ? activeIndex + 1 : 0);
    handleScrollToIndex(nextIndex);
  };

  const handleScrollToIndex = (index: number) => {
    sfx.playSelect();
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardElement = container.children[index] as HTMLElement;
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    } else {
      const cardWidth = container.firstElementChild ? (container.firstElementChild.getBoundingClientRect().width + 24) : 420;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setActiveIndex(index);
  };

  const handleCardClick = (id: ServiceId) => {
    sfx.playSelect();
    onSelectService(id);
  };

  return (
    <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] flex flex-col items-center my-4 font-sans">
      {/* Pestañas Superiores de Selección Rápida de Casos */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-5 px-3 sm:px-6">
        {/* Selector de Pestañas / Píldoras Directas por Identificador de Caso */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {services.map((s, idx) => {
            const isActive = activeIndex === idx;
            const label = s.shortIdentifier || s.categoryTitle;
            return (
              <button
                key={s.id}
                onClick={() => handleScrollToIndex(idx)}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-sm border font-mono text-xs sm:text-[13px] tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C5A059] text-black border-[#FFE066] font-bold shadow-[0_0_20px_rgba(197,160,89,0.5)] scale-102'
                    : 'bg-[#0a0a0f]/90 text-zinc-300 border-zinc-800 hover:border-[#C5A059]/60 hover:text-white'
                }`}
                title={s.heading}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black animate-ping' : 'bg-[#C5A059]'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Indicador de posición y flechas de navegación */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
            CASO <span className="text-[#FFE066] font-bold">0{activeIndex + 1}</span> / 0{services.length}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              onMouseEnter={() => sfx.playHover()}
              aria-label="Caso anterior"
              className="p-2 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95"
              title="Caso anterior"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              onMouseEnter={() => sfx.playHover()}
              aria-label="Caso siguiente"
              className="p-2 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95"
              title="Caso siguiente"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Desplazable del Carrusel con Snapping */}
      <div className="w-full relative px-1 sm:px-2">
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-3 sm:px-6 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => {
            const isSantaFe = service.id === 'CASE-SANTAFE-BI' || service.id === 'DATA_ANALYTICS';
            const isAres = service.id === 'CASE-ARES-GRID' || service.id === 'WEB_DATA_HARVESTING';
            const isCot = service.id === 'CASE-COT-OPS' || service.id === 'SOFTWARE_FACTORY';
            const isCpc = service.id === 'CASE-CPC-PULSE' || service.id === 'AI_DOCUMENT_NLP';
            const isPcd = service.id === 'CASE-PCD-PRICING';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleCardClick(service.id)}
                className="group relative flex-shrink-0 w-[88vw] sm:w-[350px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[270px] sm:min-w-[320px] md:min-w-[340px] snap-start bg-[#0e0e11]/90 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059] rounded-sm p-4 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(197,160,89,0.38)] transition-all duration-300 overflow-hidden cursor-pointer min-h-[580px]"
              >
                {/* Cyber Brackets */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />

                {/* Ambient Golden Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Identificador Principal del Caso */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#FFE066] bg-[#C5A059]/15 border border-[#C5A059]/40 px-2 py-0.5 rounded uppercase tracking-wider">
                      {service.shortIdentifier || service.categoryTitle}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      *{service.caseBadge || service.id}*
                    </span>
                  </div>

                  <h2 className="text-left text-base sm:text-lg tracking-wide font-serif mb-2 font-bold text-zinc-100 group-hover:text-[#FFE066] transition-colors line-clamp-2">
                    {service.heading.replace(/^CASE-[^/]+\/\/\s*/, '')}
                  </h2>

                  {/* Terminal con Telemetría en Vivo Específica de Cada Caso */}
                  {isSantaFe ? (
                    <div className="h-[200px] w-full mb-3 overflow-hidden rounded-sm border border-amber-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-[10px] text-zinc-400 ml-1 truncate">santafe_bi_pipeline.py</span>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded text-[9.5px] font-bold text-amber-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066] animate-ping shrink-0" />
                          <span>[LOOKER STUDIO LIVE]</span>
                        </div>
                      </div>
                      <div className="space-y-1 my-1 relative z-10 text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Métrica Clave:</span>
                          <span className="text-white font-bold truncate">+131,000 Interacciones</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Área Auditada:</span>
                          <span className="text-emerald-400 font-medium truncate">245,000 m² Espacio Público</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Base de Datos:</span>
                          <span className="text-zinc-300 font-mono truncate">PostgreSQL + PostGIS</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 relative z-10">
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase">REGISTROS</span>
                          <span className="text-xs font-bold text-[#FFE066]">+131k AUDITADOS</span>
                        </div>
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1 text-right">
                          <span className="text-[8px] text-zinc-400 block uppercase">VISUALIZACIÓN</span>
                          <span className="text-xs font-bold text-emerald-400">EMBEBIDO REAL</span>
                        </div>
                      </div>
                    </div>
                  ) : isAres ? (
                    <div className="h-[200px] w-full mb-3 overflow-hidden rounded-sm border border-purple-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                          <span className="text-[10px] text-zinc-400 ml-1 truncate">ares_scraper_l7.py</span>
                        </div>
                        <div className="flex items-center gap-1 bg-purple-950/70 border border-purple-500/40 px-2 py-0.5 rounded text-[9.5px] font-bold text-purple-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                          <span>[WAF BYPASS ACTIVE]</span>
                        </div>
                      </div>
                      <div className="space-y-1 my-1 relative z-10 text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Evasión WAF:</span>
                          <span className="text-emerald-400 font-bold truncate">Cloudflare / DataDome 0 Bloqueos</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Rendimiento C:</span>
                          <span className="text-cyan-300 font-medium truncate">DOM Parser nativo en RAM (libxml2)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Pipeline:</span>
                          <span className="text-zinc-300 font-mono truncate">Extracción concurrente Data Lake</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 relative z-10">
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase">DISPONIBILIDAD</span>
                          <span className="text-xs font-bold text-purple-300">99.98% CONTINUA</span>
                        </div>
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1 text-right">
                          <span className="text-[8px] text-zinc-400 block uppercase">PROXIES</span>
                          <span className="text-xs font-bold text-emerald-400">STEALTH ROTATIVO</span>
                        </div>
                      </div>
                    </div>
                  ) : isCot ? (
                    <div className="h-[200px] w-full mb-3 overflow-hidden rounded-sm border border-cyan-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                          <span className="text-[10px] text-zinc-400 ml-1 truncate">novux_cot_engine.wasm</span>
                        </div>
                        <div className="flex items-center gap-1 bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 rounded text-[9.5px] font-bold text-cyan-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                          <span>[60 FPS GPU // C2]</span>
                        </div>
                      </div>
                      <div className="space-y-1 my-1 relative z-10 text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Precisión:</span>
                          <span className="text-emerald-400 font-bold truncate">Métrica Sub-metro Gauss-Haversine</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Motor 3D:</span>
                          <span className="text-cyan-300 font-medium truncate">WebGL 2.0 + Three.js + MapLibre</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Auditoría:</span>
                          <span className="text-zinc-300 font-mono truncate">Cadena Custodia Hash Georreferenciado</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 relative z-10">
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase">RENDIMIENTO</span>
                          <span className="text-xs font-bold text-cyan-300">60 FPS CONSTANTES</span>
                        </div>
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1 text-right">
                          <span className="text-[8px] text-zinc-400 block uppercase">DESPACHO</span>
                          <span className="text-xs font-bold text-emerald-400">RADAR 360° DRAG</span>
                        </div>
                      </div>
                    </div>
                  ) : isPcd ? (
                    <div className="h-[200px] w-full mb-3 overflow-hidden rounded-sm border border-purple-500/40 group-hover:border-[#FFE066] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                          <span className="text-[10px] text-zinc-400 ml-1 truncate">novux_pricing_engine.tsx</span>
                        </div>
                        <div className="flex items-center gap-1 bg-purple-950/70 border border-purple-500/40 px-2 py-0.5 rounded text-[9.5px] font-bold text-purple-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                          <span>[LIVE TICKER // ARBITRAJE]</span>
                        </div>
                      </div>
                      <div className="space-y-1 my-1 relative z-10 text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Normalización:</span>
                          <span className="text-emerald-400 font-bold truncate">$/g, $/ml, $/ud Dinámico</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Multi-Tienda:</span>
                          <span className="text-cyan-300 font-medium truncate">Éxito, ML, Alkosto, D1 en Paralelo</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Algoritmo:</span>
                          <span className="text-[#FFE066] font-mono truncate">Optimización Buy-Box & Margen</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 relative z-10">
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase">DISPERSIÓN PRECIOS</span>
                          <span className="text-xs font-bold text-purple-300">±18.4% DETECTADA</span>
                        </div>
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1 text-right">
                          <span className="text-[8px] text-zinc-400 block uppercase">STACK MOTOR</span>
                          <span className="text-xs font-bold text-emerald-400">REACT 19 + RECHARTS</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] w-full mb-3 overflow-hidden rounded-sm border border-emerald-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-[10px] text-zinc-400 ml-1 truncate">cpc_pulse_dag.py</span>
                        </div>
                        <div className="flex items-center gap-1 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded text-[9.5px] font-bold text-emerald-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                          <span>[45 CURULES // LIVE HUD]</span>
                        </div>
                      </div>
                      <div className="space-y-1 my-1 relative z-10 text-[10.5px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Hemiciclo 3D:</span>
                          <span className="text-white font-bold truncate">45/45 Curules Monitoreadas en Vivo</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Algoritmo DAG:</span>
                          <span className="text-cyan-300 font-medium truncate">Topología Kahn de Proyectos de Ley</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500 shrink-0">Electoral:</span>
                          <span className="text-emerald-400 font-mono truncate">Cruce de Actas E-14 vs E-24</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 relative z-10">
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase">SEGUIDORES AUDITADOS</span>
                          <span className="text-xs font-bold text-[#FFE066]">3.86M EN TIEMPO REAL</span>
                        </div>
                        <div className="bg-black/85 border border-zinc-800 rounded px-2 py-1 text-right">
                          <span className="text-[8px] text-zinc-400 block uppercase">STACK MOTOR</span>
                          <span className="text-xs font-bold text-zinc-300">FASTAPI + REACT 19</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Valor Comercial y ROI */}
                  {service.businessValue && (
                    <div className="my-2 p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-left">
                      <span className="text-[9.5px] font-mono uppercase font-bold text-emerald-400 block mb-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        VALOR PARA SU NEGOCIO & ROI:
                      </span>
                      <p className="text-xs text-zinc-100 font-sans font-medium leading-snug">
                        {service.businessValue}
                      </p>
                    </div>
                  )}

                  {/* Reto Operativo que Elimina */}
                  {service.businessProblem && (
                    <div className="mb-2 p-2 rounded bg-black/60 border-l-2 border-l-amber-500/80 border-y border-r border-zinc-900 text-left text-xs font-sans text-zinc-300">
                      <span className="text-[9px] font-mono uppercase font-bold text-amber-400 block mb-0.5">
                        EL RETO OPERATIVO QUE ELIMINA:
                      </span>
                      <p className="leading-snug text-zinc-300">
                        {service.businessProblem}
                      </p>
                    </div>
                  )}

                  {/* Bloque Destacado: Métrica Clave Comprobada */}
                  <div className="my-2 p-2 rounded bg-black/80 border-l-2 border-y border-r border-zinc-800 text-[11px] font-mono leading-snug text-left shadow-sm border-l-[#FFE066]">
                    <span className="text-[9px] uppercase font-bold text-[#FFE066] block mb-0.5">
                      MÉTRICA COMPROBADA EN PRODUCCIÓN:
                    </span>
                    <p className="text-zinc-200 italic font-medium">
                      {service.keyMetric || service.technicalArgument}
                    </p>
                  </div>

                  {/* Oferta de Servicio Derivado */}
                  {service.derivedServiceTitle && (
                    <div className="mb-3 p-2 rounded bg-[#0b0c14] border border-[#C5A059]/25 text-left">
                      <div className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066]" />
                        <span>INFRAESTRUCTURA REPLICABLE A MEDIDA:</span>
                      </div>
                      <p className="text-xs text-zinc-200 font-sans font-semibold line-clamp-2">
                        {service.derivedServiceTitle}
                      </p>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {service.techStack && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-black/70 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botones de Acción Directos (Inversión del Embudo) */}
                <div className="flex flex-col gap-2 w-full mt-auto pt-2 border-t border-zinc-800/80">
                  {service.demoUrl ? (
                    <a
                      href={service.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sfx.playSelect();
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className="w-full bg-gradient-to-r from-[#C5A059] via-[#FFE066] to-[#C5A059] hover:from-[#FFE066] hover:to-[#C5A059] text-black py-2.5 text-xs tracking-wider transition-all duration-300 rounded-sm uppercase font-bold shadow-[0_0_20px_rgba(197,160,89,0.4)] cursor-pointer text-center flex items-center justify-center gap-1.5 font-mono"
                    >
                      <span>{service.ctaText || 'PROBAR DEMO EN VIVO ↗'}</span>
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(service.id);
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className="w-full bg-gradient-to-r from-[#C5A059] via-[#FFE066] to-[#C5A059] hover:from-[#FFE066] hover:to-[#C5A059] text-black py-2.5 text-xs tracking-wider transition-all duration-300 rounded-sm uppercase font-bold shadow-[0_0_20px_rgba(197,160,89,0.4)] cursor-pointer text-center block font-mono"
                    >
                      {service.ctaText || 'LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗'}
                    </button>
                  )}

                  <a
                    href={getWhatsAppUrl(`Hola NOVUX S.A.S., me interesa solicitar desarrollo a la medida basado en la arquitectura de ${service.shortIdentifier || service.categoryTitle}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playSelect();
                    }}
                    onMouseEnter={() => sfx.playHover()}
                    className="w-full border border-zinc-700 hover:border-[#C5A059] bg-transparent hover:bg-[#C5A059]/10 text-zinc-300 hover:text-white py-2 text-xs tracking-wider transition-all duration-300 rounded-sm uppercase font-bold text-center block font-mono"
                  >
                    {service.secondaryCtaText || 'SOLICITAR DESARROLLO A MEDIDA'}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
