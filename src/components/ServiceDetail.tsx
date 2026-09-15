import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Service } from '../types';
import { TechStack } from './TechStack';
import { sfx } from '../utils/soundEffects';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
}

export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const handleBackClick = () => {
    sfx.playBack();
    onBack();
  };

  const handleCtaClick = () => {
    sfx.playPowerUp();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black/60 via-black/30 to-black/70 text-white flex flex-col font-sans"
    >
      {/* Top Header */}
      <header className="w-full pt-12 pb-8 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-2xl md:text-3xl font-serif text-[#C5A059] tracking-widest uppercase drop-shadow-md">
          {service.categoryTitle}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-start justify-center p-8 md:px-16 lg:px-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-4">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start bg-[#0e0e11]/80 backdrop-blur-md p-8 rounded-sm border border-[#C5A059]/25 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="border border-[#C5A059] text-[#C5A059] text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6 bg-black/40">
              Portafolio de Servicio
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gray-100 uppercase tracking-wide">
              {service.heading}
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
              {service.description}
            </p>

            {/* Key Services List */}
            {service.keyServices && service.keyServices.length > 0 && (
              <div className="w-full mb-6 bg-black/40 backdrop-blur-md rounded-sm border border-[#C5A059]/25 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block" />
                  Servicios Clave
                </div>
                <ul className="space-y-2 text-sm text-gray-300 font-sans">
                  {service.keyServices.map((ks, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C5A059] font-mono select-none mt-0.5">•</span>
                      <div className="leading-snug">
                        <span className="text-zinc-100 font-medium">{ks.title}</span>
                        {ks.detail && (
                          <span className="text-gray-400 text-xs block sm:inline sm:before:content-[':_']">
                            {ks.detail}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* CTA Principal Externo */}
            {service.externalLink && (
              <a
                href={service.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                onMouseEnter={() => sfx.playHover()}
                className="w-full md:w-auto inline-flex items-center justify-center border border-[#C5A059] text-[#C5A059] px-8 py-3.5 mb-6 font-mono font-bold tracking-widest uppercase hover:bg-[#C5A059] hover:text-[#141414] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 rounded-sm text-center cursor-pointer"
              >
                {service.ctaText || 'ABRIR SERVICIO'}
              </a>
            )}

            {/* Botón de Volver */}
            <button
              onClick={handleBackClick}
              onMouseEnter={() => sfx.playHover()}
              className="group flex items-center gap-3 border border-[#C5A059]/50 text-[#C5A059] px-6 py-3 rounded-sm hover:bg-[#C5A059]/10 transition-all duration-300 tracking-wider text-xs uppercase cursor-pointer mt-2"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Volver al Menú Principal
            </button>
          </motion.div>

          {/* Right Column: Media (Image or Iframe) + Caso de Éxito + Stack Tecnológico */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex flex-col items-center lg:items-end gap-6"
          >
            {/* Media Container */}
            <div className="aspect-[16/9] w-full max-w-2xl rounded-md overflow-hidden shadow-2xl shadow-black/80 border border-[#C5A059]/30 bg-black relative">
              {service.videoSrc ? (
                <video
                  src={service.videoSrc}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : service.iframeSrc ? (
                <div className="w-full h-full relative group">
                  <iframe
                    src={service.iframeSrc}
                    title={service.heading}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <a
                    href={
                      service.iframeSrc.includes('drive.google.com')
                        ? service.iframeSrc.replace('/preview', '/view?usp=sharing')
                        : service.iframeSrc.replace('/preview', '/play')
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    onMouseEnter={() => sfx.playHover()}
                    className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/85 hover:bg-[#C5A059] text-zinc-300 hover:text-black border border-[#C5A059]/40 rounded px-2.5 py-1 text-[11px] font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer"
                    title="Abrir en pestaña nueva"
                  >
                    <ExternalLink size={12} />
                    <span>Ver externo</span>
                  </a>
                </div>
              ) : service.image ? (
                <img 
                  src={service.image} 
                  alt={service.heading}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('googleusercontent.com/d/')) {
                      const match = target.src.match(/googleusercontent\.com\/d\/([^=]+)/);
                      if (match && match[1]) {
                        target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#121217] to-black text-center relative">
                  <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 flex items-center justify-center mb-3 bg-[#C5A059]/10">
                    <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-pulse" />
                  </div>
                  <span className="font-mono text-sm tracking-widest text-[#C5A059] font-semibold uppercase mb-1">
                    ARES GRID // REPRODUCTOR DEMO
                  </span>
                  <span className="font-mono text-xs text-zinc-400 max-w-xs">
                    [ Enlace multimedia listo para vincular ]
                  </span>
                </div>
              )}
            </div>

            {/* Nuevo Contenedor (Caso de Éxito): tarjeta ancha full-width estrictamente debajo del Iframe */}
            {service.caseStudy && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-2xl bg-[#0e0e11]/85 backdrop-blur-md p-6 rounded-sm border border-[#C5A059]/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A059]/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A059]/50" />

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#C5A059] font-semibold">
                    {service.caseStudy.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {service.caseStudy.description}
                </p>

                {/* Key Services for Case Study if present */}
                {service.caseStudy.keyServices && service.caseStudy.keyServices.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/80">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block" />
                      Servicios Clave
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300 font-sans">
                      {service.caseStudy.keyServices.map((ks, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#C5A059] font-mono select-none mt-0.5">•</span>
                          <div className="leading-snug">
                            <span className="text-zinc-100 font-medium">{ks.title}</span>
                            {ks.detail && (
                              <span className="text-gray-400 text-xs block sm:inline sm:before:content-[':_']">
                                {ks.detail}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {/* Stack Tecnológico: Contenedor de ancho completo ubicado estrictamente debajo de la tarjeta CASO DE ÉXITO */}
            {service.techStack && service.techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-2xl"
              >
                <TechStack items={service.techStack} />
              </motion.div>
            )}
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
