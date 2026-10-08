import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Layers, ExternalLink } from 'lucide-react';
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
  const [factoryActiveTab, setFactoryActiveTab] = useState<'NOVUX_COT' | 'ARES_SCRAPER'>('NOVUX_COT');

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active index based on card width
    const cardElement = scrollContainerRef.current.firstElementChild as HTMLElement;
    if (cardElement) {
      const cardWidth = cardElement.getBoundingClientRect().width + 24; // width + gap
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
    if (!scrollContainerRef.current) return;
    const cardElement = scrollContainerRef.current.firstElementChild as HTMLElement;
    const scrollAmount = cardElement ? (cardElement.getBoundingClientRect().width + 24) : 420;

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScrollToIndex = (index: number) => {
    sfx.playSelect();
    if (!scrollContainerRef.current) return;
    const cardElement = scrollContainerRef.current.firstElementChild as HTMLElement;
    const scrollAmount = cardElement ? (cardElement.getBoundingClientRect().width + 24) : 420;

    scrollContainerRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleCardClick = (id: ServiceId) => {
    sfx.playSelect();
    onSelectService(id);
  };

  return (
    <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] flex flex-col items-center my-4">
      {/* Cabecera y Controles del Carrusel */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(197,160,89,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span>// PORTAFOLIO DE SERVICIOS B2B // MÓDULOS DE INGENIERÍA</span>
          </div>
        </div>

        {/* Indicador de posición y flechas de navegación */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
            MÓDULO <span className="text-[#FFE066] font-bold">0{activeIndex + 1}</span> / 0{services.length}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              onMouseEnter={() => sfx.playHover()}
              disabled={!canScrollLeft}
              aria-label="Anterior servicio"
              className={`p-2 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                canScrollLeft
                  ? 'bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95'
                  : 'bg-zinc-950/40 text-zinc-700 border-zinc-850 opacity-40 cursor-not-allowed'
              }`}
              title="Servicio anterior"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              onMouseEnter={() => sfx.playHover()}
              disabled={!canScrollRight}
              aria-label="Siguiente servicio"
              className={`p-2 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                canScrollRight
                  ? 'bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95'
                  : 'bg-zinc-950/40 text-zinc-700 border-zinc-850 opacity-40 cursor-not-allowed'
              }`}
              title="Siguiente servicio"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Desplazable del Carrusel con Snapping */}
      <div className="w-full relative px-1 sm:px-2">
        {/* Pista horizontal con snap */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-3 sm:px-6 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => handleCardClick(service.id)}
              className="group relative flex-shrink-0 w-[310px] sm:w-[360px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[300px] sm:min-w-[340px] md:min-w-[360px] snap-start bg-[#0e0e11]/90 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059] rounded-sm p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(197,160,89,0.38)] transition-all duration-300 overflow-hidden cursor-pointer min-h-[580px]"
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />

              {/* Ambient Golden Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <h2 className="text-center text-base sm:text-lg tracking-wider font-serif mb-2 h-7 flex items-center justify-center uppercase text-zinc-100 group-hover:text-[#FFE066] transition-colors">
                  {service.categoryTitle}
                </h2>

                {/* Case Badge */}
                {service.caseBadge && service.id !== 'SOFTWARE_FACTORY' && (
                  <div className="text-center mb-3">
                    <span className="inline-block text-[10.5px] font-mono font-bold text-[#FFE066] bg-[#C5A059]/15 border border-[#C5A059]/40 px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                      *{service.caseBadge}*
                    </span>
                  </div>
                )}

                {/* Visual Content: Custom Mock Terminal per Service */}
                {service.id === 'NOVUX_MARKETPULSE' ? (
                  <div className="h-[185px] sm:h-[195px] w-full mb-4 overflow-hidden rounded-sm border border-emerald-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
                        backgroundSize: '16px 16px'
                      }}
                    />
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="text-[10px] text-zinc-500 ml-1 hidden sm:inline">marketpulse.sh</span>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>[ACTIVE MONITORING]</span>
                      </div>
                    </div>

                    <div className="space-y-1 my-1 relative z-10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Target:</span>
                        <span className="text-zinc-200 font-semibold truncate">Competidor Alpha Retail</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Item:</span>
                        <span className="text-white font-medium truncate">Laptop Pro 16" - Core Ultra</span>
                      </div>
                    </div>

                    <div className="bg-black/85 border border-zinc-800/90 rounded px-2.5 py-1.5 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Precio Actual:</span>
                        <span className="text-xs sm:text-sm font-bold text-[#FFE066] tracking-tight leading-none">$4,607,500 COP</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Variación:</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 leading-none">
                          <span>↓ -5.0% (ALERTA)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : service.id === 'DATAOPS_RPA' ? (
                  <div className="h-[185px] sm:h-[195px] w-full mb-4 overflow-hidden rounded-sm border border-cyan-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                        <span className="text-[10px] text-zinc-500 ml-1 hidden sm:inline">dataops_cst23.py</span>
                      </div>
                      <div className="flex items-center gap-1 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-cyan-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                        <span>[RUNNING 24/7]</span>
                      </div>
                    </div>
                    <div className="space-y-1 my-1 relative z-10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Flujo:</span>
                        <span className="text-zinc-200 font-semibold truncate">Conciliación Nómina & Turnos</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Norma:</span>
                        <span className="text-white font-medium truncate">CST Art. 23 (Balanceo Legal)</span>
                      </div>
                    </div>
                    <div className="bg-black/85 border border-zinc-800/90 rounded px-2.5 py-1.5 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Margen Error:</span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-400">0.0% MATEMÁTICO</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Tasa Ahorro:</span>
                        <span className="text-[10px] font-bold text-[#FFE066]">100% DESATENDIDO</span>
                      </div>
                    </div>
                  </div>
                ) : service.id === 'WEB_DATA_HARVESTING' ? (
                  <div className="h-[185px] sm:h-[195px] w-full mb-4 overflow-hidden rounded-sm border border-purple-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                        <span className="text-[10px] text-zinc-500 ml-1 hidden sm:inline">ares_harvester.sh</span>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-950/60 border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-purple-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" />
                        <span>[WAF BYPASS ACTIVE]</span>
                      </div>
                    </div>
                    <div className="space-y-1 my-1 relative z-10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Motor:</span>
                        <span className="text-zinc-200 font-semibold truncate">Selenium Stealth + libxml2 C</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500">Perímetro:</span>
                        <span className="text-white font-medium truncate">Cloudflare & DataDome Evadido</span>
                      </div>
                    </div>
                    <div className="bg-black/85 border border-zinc-800/90 rounded px-2.5 py-1.5 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Memoria C:</span>
                        <span className="text-xs sm:text-sm font-bold text-cyan-300">DOM CONTIGUO RAM</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Seguridad IP:</span>
                        <span className="text-[10px] font-bold text-emerald-400">0 BLOQUEOS</span>
                      </div>
                    </div>
                  </div>
                ) : service.id === 'DATA_ANALYTICS' ? (
                  <div className="h-[185px] sm:h-[195px] w-full mb-4 overflow-hidden rounded-sm border border-amber-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-[10px] text-zinc-400 ml-1 truncate">comando_bogota.sql</span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066] animate-ping shrink-0" />
                        <span>[LOOKER STUDIO LIVE]</span>
                      </div>
                    </div>
                    <div className="space-y-1 my-1 relative z-10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500 shrink-0">Métrica:</span>
                        <span className="text-white font-bold truncate">+131,000 Interacciones</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500 shrink-0">GIS Santa Fe:</span>
                        <span className="text-emerald-400 font-medium truncate">245,000 m² Recuperados</span>
                      </div>
                    </div>
                    <div className="bg-black/85 border border-zinc-800/90 rounded px-2.5 py-1.5 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Control:</span>
                        <span className="text-xs sm:text-sm font-bold text-[#FFE066]">TABLERO EN VIVO</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Arquitectura:</span>
                        <span className="text-[10px] font-bold text-zinc-300">ETL PYTHON + GIS</span>
                      </div>
                    </div>
                  </div>
                ) : service.id === 'AI_DOCUMENT_NLP' ? (
                  <div className="h-[185px] sm:h-[195px] w-full mb-4 overflow-hidden rounded-sm border border-blue-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        <span className="text-[10px] text-zinc-400 ml-1 truncate">l7_token_engine.py</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-950/70 border border-blue-500/40 px-2 py-0.5 rounded text-[10px] font-bold text-blue-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(59,130,246,0.25)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping shrink-0" />
                        <span>[BPE & NLP AUDIT]</span>
                      </div>
                    </div>
                    <div className="space-y-1 my-1 relative z-10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500 shrink-0">Pipeline:</span>
                        <span className="text-zinc-200 font-semibold truncate">MinHash/LSH Deduplication</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-500 shrink-0">Esquema:</span>
                        <span className="text-white font-medium truncate">Pydantic v2 Tipado Estricto</span>
                      </div>
                    </div>
                    <div className="bg-black/85 border border-zinc-800/90 rounded px-2.5 py-1.5 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Optimización:</span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-400">-30% COSTO TOKENS</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-0.5">Texto:</span>
                        <span className="text-[10px] font-bold text-[#FFE066]">NFKC NORMALIZED</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MÓDULO 06: SOFTWARE FACTORY (COEXISTENCIA NOVUX COT & ARES SCRAPER) */
                  <div className="w-full mb-3">
                    {/* Selector de Coexistencia Táctica */}
                    <div className="flex items-center justify-between mb-2.5 p-1 bg-black/90 border border-zinc-800 rounded text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playSelect();
                          setFactoryActiveTab('NOVUX_COT');
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-sm text-center transition-all cursor-pointer font-bold ${
                          factoryActiveTab === 'NOVUX_COT'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        NOVUX COT
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playSelect();
                          setFactoryActiveTab('ARES_SCRAPER');
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-sm text-center transition-all cursor-pointer font-bold ${
                          factoryActiveTab === 'ARES_SCRAPER'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        ARES SCRAPER
                      </button>
                    </div>

                    {factoryActiveTab === 'NOVUX_COT' ? (
                      /* CONTENIDO NOVUX COT (IMAGEN + TERMINAL WIDGET) */
                      <div className="w-full space-y-2">
                        {/* Imagen de Novux Tactical C2 */}
                        <div className="w-full h-32 rounded-sm overflow-hidden border border-cyan-500/50 relative group bg-black shadow-inner">
                          <img
                            src="/novux-cot-platform.png"
                            alt="NOVUX COT // Plataforma de Comando y Gemelo Digital 3D"
                            className="w-full h-full object-cover rounded border border-cyan-500/30 transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                          <div className="absolute top-2 left-2 bg-black/85 border border-cyan-500/40 rounded px-2 py-0.5 text-[9px] font-mono text-cyan-300 flex items-center gap-1 shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span>NOVUX TACTICAL C2 // GEMELO DIGITAL 3D</span>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-emerald-950/80 border border-emerald-500/40 rounded px-1.5 py-0.5 text-[8.5px] font-mono text-emerald-300 font-bold">
                            60 FPS • SUB-METRO
                          </div>
                        </div>

                        {/* WIDGET TERMINAL NOVUX COT */}
                        <div className="w-full overflow-hidden rounded-sm border border-cyan-500/50 group-hover:border-cyan-400 bg-[#07090f] p-2.5 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                          <div 
                            className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)',
                              backgroundSize: '14px 14px'
                            }}
                          />

                          {/* Top bar with console semáforo */}
                          <div className="flex items-center justify-between border-b border-zinc-800/90 pb-1.5 relative z-10 gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                              <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                              <span className="text-[10px] text-zinc-300 ml-1 font-semibold truncate">novux_cot_engine.wasm</span>
                            </div>
                            <div className="flex items-center gap-1 bg-cyan-950/70 border border-cyan-500/50 px-2 py-0.5 rounded text-[9.5px] font-bold text-cyan-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                              <span>[SYS: READY]</span>
                            </div>
                          </div>

                          {/* Exact Terminal Lines */}
                          <div className="space-y-1 my-2 relative z-10 text-[10px] border-b border-zinc-800/80 pb-2 leading-tight">
                            <div className="flex items-start gap-1.5">
                              <span className="text-zinc-500 shrink-0 w-20">Arquitectura:</span>
                              <span className="text-zinc-200 font-semibold truncate">WebGL 2.0 + Three.js 3D + MapLibre GL Engine</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-zinc-500 shrink-0 w-20">Cálculo:</span>
                              <span className="text-cyan-300 font-medium truncate">Motor Geodésico Gauss-Haversine (m / m² / km²)</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-zinc-500 shrink-0 w-20">Telemetría:</span>
                              <span className="text-emerald-300 font-medium truncate">Radar 360° + Avatares 3D Interactivos + Despacho C2</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-zinc-500 shrink-0 w-20">Auditoría:</span>
                              <span className="text-zinc-300 truncate">Cadena de Custodia Fotográfica + Hash Georreferenciado</span>
                            </div>
                          </div>

                          {/* Exact Metrics Grid */}
                          <div className="grid grid-cols-3 gap-1.5 relative z-10">
                            <div className="bg-black/90 border border-cyan-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">RENDIMIENTO</span>
                              <span className="text-[10px] font-bold text-cyan-300 block leading-tight">60 FPS</span>
                              <span className="text-[7px] text-zinc-500 leading-none">CONSTANTES</span>
                            </div>
                            <div className="bg-black/90 border border-emerald-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">PRECISIÓN ESPACIAL</span>
                              <span className="text-[10px] font-bold text-emerald-400 block leading-tight">MÉTRICA</span>
                              <span className="text-[7px] text-zinc-500 leading-none">SUB-METRO</span>
                            </div>
                            <div className="bg-black/90 border border-cyan-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">CARGA GRÁFICA</span>
                              <span className="text-[10px] font-bold text-cyan-300 block leading-tight">GPU ACCEL</span>
                              <span className="text-[7.5px] text-zinc-500 leading-none">ACCELERATED</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* CONTENIDO ARES SCRAPER (TERMINAL CON PROCESO Y FUNCIÓN) */
                      <div className="w-full space-y-2">
                        <div className="w-full overflow-hidden rounded-sm border border-purple-500/50 group-hover:border-purple-400 bg-[#08060d] p-2.5 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                          <div className="flex items-center justify-between border-b border-zinc-800/90 pb-1.5 relative z-10 gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                              <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                              <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                              <span className="text-[10px] text-zinc-300 ml-1 font-semibold truncate">ares_scraper_engine.py</span>
                            </div>
                            <div className="flex items-center gap-1 bg-purple-950/70 border border-purple-500/50 px-2 py-0.5 rounded text-[9.5px] font-bold text-purple-300 shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                              <span>[SYS: READY]</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 my-2 relative z-10 text-[9px] border-b border-zinc-800/80 pb-2 leading-snug">
                            <div className="p-1.5 bg-black/70 rounded border border-purple-500/30">
                              <span className="text-purple-300 font-bold block mb-0.5 text-[9.5px]">
                                CASE-PRICING-GRID // NOVUX ARES SCRAPER
                              </span>
                              <p className="text-zinc-300 font-sans leading-tight">
                                Motor Industrial de Extracción y Minería de Precios E-Commerce (Python + PyWebView + Undetected-ChromeDriver + Pandas Data Lake Pipeline). Orquestación híbrida de transporte adaptable (HTTP/SSR estático vs. WebDriver dinámico), evasión perimetral de WAFs con herencia de sesiones persistentes, flujo operativo gobernado por máquina de estados finitos (FSM) con compuertas de validación humana e ingesta masiva con deduplicación por clave canónica hacia Data Lake local bajo interfaz táctica HUD Tron Red.
                              </p>
                            </div>

                            <div className="p-1.5 bg-black/70 rounded border border-zinc-800/90">
                              <span className="text-[#FFE066] font-bold block mb-0.5 text-[8.5px] uppercase tracking-wider">
                                Alternativa focalizada en analítica y arquitectura de datos:
                              </span>
                              <span className="text-cyan-300 font-bold block mb-0.5 text-[9.5px]">
                                CASE-DATA-FACTORY // NOVUX ARES GRID
                              </span>
                              <p className="text-zinc-300 font-sans leading-tight">
                                Plataforma Desktop de Inteligencia de Mercado y Normalización de Catálogos (Python 3.12 + PyWebView GUI + BeautifulSoup4 + Pandas Core). Enrutamiento polimórfico de adaptadores de marketplace desacoplados, captura asíncrona tolerante a SPA/CSR ofuscadas, auditoría tabular en memoria volátil y persistencia atómica multiformato con saneamiento monetario en tiempo real.
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5 relative z-10">
                            <div className="bg-black/90 border border-purple-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">EXTRACCIÓN</span>
                              <span className="text-[10px] font-bold text-purple-300 block leading-tight">L7 MASIVA</span>
                              <span className="text-[7px] text-zinc-500 leading-none">RAM PARSE</span>
                            </div>
                            <div className="bg-black/90 border border-emerald-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">EVASIÓN WAF</span>
                              <span className="text-[10px] font-bold text-emerald-400 block leading-tight">STEALTH FSM</span>
                              <span className="text-[7px] text-zinc-500 leading-none">PERSISTENTE</span>
                            </div>
                            <div className="bg-black/90 border border-cyan-500/30 rounded p-1 text-center">
                              <span className="text-[7.5px] text-zinc-400 block uppercase leading-none mb-0.5">PIPELINE DATA</span>
                              <span className="text-[10px] font-bold text-cyan-300 block leading-tight">DEDUPLICADA</span>
                              <span className="text-[7px] text-zinc-500 leading-none">CANÓNICA</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Declaración de Enfoque y Arquitectura Técnica */}
                {service.id === 'SOFTWARE_FACTORY' ? (
                  <div className={`my-3 p-2.5 rounded bg-black/85 border-l-2 border-y border-r border-zinc-800/80 text-[11px] font-mono leading-snug text-left shadow-sm ${
                    factoryActiveTab === 'NOVUX_COT' ? 'border-l-cyan-400 text-zinc-200' : 'border-l-purple-400 text-zinc-200'
                  }`}>
                    <p className="text-zinc-200 italic">
                      {factoryActiveTab === 'NOVUX_COT'
                        ? '"No desarrollamos software ni plantillas genéricas. Construimos plataformas de Control de grado técnico para el mercado empresarial operativo."'
                        : '"Ingeniería de datos de alto rendimiento y evasión perimetral: orquestación híbrida de transporte, deduplicación canónica en memoria y entrega con 100% de cesión de código y propiedad intelectual."'}
                    </p>
                  </div>
                ) : service.technicalArgument ? (
                  <div className="my-3 p-2.5 rounded bg-black/85 border-l-2 border-y border-r border-zinc-800/80 text-[11px] font-mono leading-snug text-left shadow-sm border-l-[#C5A059] text-zinc-300">
                    <p className="text-zinc-200 italic">"{service.technicalArgument}"</p>
                  </div>
                ) : null}
                
                <p className={`text-xs sm:text-sm mb-4 leading-relaxed font-light ${
                  service.id === 'SOFTWARE_FACTORY' ? 'text-zinc-300 text-left' : 'text-gray-300 text-center'
                }`}>
                  {service.id === 'SOFTWARE_FACTORY'
                    ? (factoryActiveTab === 'NOVUX_COT'
                        ? 'Ingeniería de software a la medida para operaciones complejas de campo y misión crítica. Centro de Comando y Control (C2) con renderizado tridimensional interactivo, trazado de perímetros poligonales con cálculo dinámico de áreas y distancias geodésicas en tiempo real, despacho táctico de personal con drag-and-drop, captura estricta de incidentes con evidencia fotográfica obligatoria y auditoría integral exportable sin dependencias de terceros.'
                        : 'Extracción industrial y minería de precios e-commerce de alto rendimiento. Evasión de defensas Cloudflare Turnstile / DataDome con herencia de sesiones, máquina de estados finitos y normalización multiformato.')
                    : service.shortDescription}
                </p>

                {/* Sub-banner de coexistencia para Módulo 06 */}
                {service.id === 'SOFTWARE_FACTORY' && (
                  <div className="mb-4 py-1.5 px-2.5 rounded bg-[#070a12] border border-cyan-500/30 text-[9.5px] font-mono flex items-center justify-between text-zinc-400">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      NOVUX COT (Gemelo 3D GPU)
                    </span>
                    <span className="text-zinc-600 font-bold">+</span>
                    <span className="text-purple-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      ARES SCRAPER (Extracción & Data Lake)
                    </span>
                  </div>
                )}
              </div>
              
              {/* Botón de Acción */}
              {service.id === 'SOFTWARE_FACTORY' ? (
                <div className="flex flex-col gap-2 w-full mt-auto">
                  {factoryActiveTab === 'NOVUX_COT' ? (
                    <>
                      {/* Botón Principal NOVUX COT */}
                      <a
                        href="https://demo-c2.novuxops.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playPowerUp();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className="w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 hover:from-cyan-400 hover:to-emerald-300 text-black py-2.5 text-xs tracking-wider transition-all duration-300 rounded-sm uppercase font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] cursor-pointer text-center block font-mono"
                      >
                        LANZAR DEMO INTERACTIVO // COT
                      </a>

                      {/* Botón Secundario NOVUX COT (WhatsApp sin número de teléfono visible) */}
                      <a
                        href={getWhatsAppUrl('Hola NOVUX S.A.S., deseo cotizar y solicitar desarrollo a la medida de la plataforma NOVUX COT // Gemelos Digitales 3D.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playSelect();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className="w-full border border-cyan-500/50 hover:border-cyan-400 bg-transparent hover:bg-cyan-950/40 text-cyan-300 hover:text-white py-2 text-xs tracking-widest transition-all duration-300 rounded-sm uppercase font-bold text-center block font-mono shadow-sm"
                      >
                        SOLICITAR DESARROLLO A MEDIDA
                      </a>
                    </>
                  ) : (
                    <>
                      {/* Botón Principal ARES SCRAPER (Conectado con formulario de petición de servicio) */}
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playPowerUp();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className="w-full bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 hover:from-purple-400 hover:to-amber-300 text-black py-2.5 text-xs tracking-wider transition-all duration-300 rounded-sm uppercase font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer text-center block font-mono"
                      >
                        SOLICITAR DEMO APLICACIÓN DESKTOP // ARES GRID
                      </a>

                      {/* Botón Secundario ARES SCRAPER (WhatsApp sin número visible) */}
                      <a
                        href={getWhatsAppUrl('Hola NOVUX S.A.S., deseo cotizar ingeniería de extracción masiva con ARES SCRAPER.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sfx.playSelect();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className="w-full border border-purple-500/50 hover:border-purple-400 bg-transparent hover:bg-purple-950/40 text-purple-300 hover:text-white py-2 text-xs tracking-widest transition-all duration-300 rounded-sm uppercase font-bold text-center block font-mono shadow-sm"
                      >
                        SOLICITAR DESARROLLO A MEDIDA
                      </a>
                    </>
                  )}
                </div>
              ) : service.id === 'NOVUX_MARKETPULSE' ? (
                <a
                  href={service.externalLink || 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playPowerUp();
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full border border-[#C5A059] bg-[#C5A059]/15 text-[#FFE066] hover:bg-[#C5A059] hover:text-black py-2.5 text-xs tracking-widest transition-all duration-300 rounded-sm uppercase font-bold shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] cursor-pointer text-center block font-mono"
                >
                  SOLICITAR AUDITORÍA / DEMO
                </a>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(service.id);
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full border border-[#C5A059] text-[#C5A059] py-2.5 text-xs tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-300 rounded-sm uppercase font-bold shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] cursor-pointer font-mono"
                >
                  ABRIR SERVICIO
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicadores / Píldoras de Navegación Inferiores */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 select-none px-2">
        {services.map((s, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => handleScrollToIndex(idx)}
              onMouseEnter={() => sfx.playHover()}
              className={`group px-3 py-1.5 rounded-sm border font-mono text-[11px] transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-[#C5A059] text-black border-[#FFE066] font-bold shadow-[0_0_15px_rgba(197,160,89,0.4)] scale-105'
                  : 'bg-[#0a0a0f] text-zinc-400 border-zinc-800 hover:border-[#C5A059]/60 hover:text-white'
              }`}
              title={s.categoryTitle}
            >
              <span>0{idx + 1}.</span>
              <span className="hidden sm:inline whitespace-nowrap">{s.categoryTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
