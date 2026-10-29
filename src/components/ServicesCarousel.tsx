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
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                      CASO DE ÉXITO
                    </span>
                  </div>

                  <h2 className="text-left text-base sm:text-lg tracking-wide font-serif mb-2 font-bold text-zinc-100 group-hover:text-[#FFE066] transition-colors line-clamp-2">
                    {service.heading.replace(/^CASE-[^/]+\/\/\s*/, '')}
                  </h2>

                  {/* Vista Previa Visual Real de la Aplicación */}
                  <div
                    onClick={(e) => {
                      if (service.demoUrl) {
                        e.stopPropagation();
                        sfx.playSelect();
                        window.open(service.demoUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="h-[210px] w-full mb-3 overflow-hidden rounded-sm border border-[#C5A059]/40 group-hover:border-[#FFE066] bg-black relative shadow-inner group/preview cursor-pointer"
                    title={`Lanzar ${service.shortIdentifier || service.categoryTitle} en vivo`}
                  >
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.shortIdentifier || service.categoryTitle}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105 opacity-90 group-hover/preview:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0a0c14] flex items-center justify-center font-mono text-zinc-500 text-xs">
                        [VISTA PREVIA NO DISPONIBLE]
                      </div>
                    )}

                    {/* Badge Superior: Tag de Aplicación + Status Live */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-[#C5A059]/50 px-2 py-0.5 rounded text-[10px] font-mono text-[#FFE066] font-bold shadow-md">
                        <span>{service.shortIdentifier || service.categoryTitle}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md border border-emerald-500/60 px-2 py-0.5 rounded text-[9.5px] font-mono font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>[DEMO ACTIVA ↗]</span>
                      </div>
                    </div>

                    {/* Overlay Inferior en Hover: Clic para Lanzar Demo */}
                    <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between text-[10px] font-mono text-zinc-300 group-hover/preview:text-[#FFE066] transition-colors pointer-events-none border-t border-white/5">
                      <span className="truncate">{service.statusTag || '[PRODUCCIÓN // 100% ONLINE]'}</span>
                      <span className="shrink-0 font-bold flex items-center gap-1 text-[#FFE066]">
                        ABRIR APP ↗
                      </span>
                    </div>
                  </div>

                  {/* Telemetría Métrica Destacada del Caso */}
                  {service.metrics && service.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 mb-3 font-mono text-left">
                      {service.metrics.slice(0, 2).map((metric, mIdx) => (
                        <div key={mIdx} className="bg-black/85 border border-zinc-800/80 rounded px-2 py-1">
                          <span className="text-[8px] text-zinc-400 block uppercase truncate">{metric.label}</span>
                          <span className="text-xs font-bold text-[#FFE066] truncate block">{metric.value}</span>
                        </div>
                      ))}
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
