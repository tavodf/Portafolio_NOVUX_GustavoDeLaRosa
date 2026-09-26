import { motion } from 'motion/react';
import { Github, BookOpen, ChevronRight, Sparkles, Radio } from 'lucide-react';
import { serviceList } from '../data';
import { blogPosts } from '../blogData';
import { techNews } from '../newsData';
import { ServiceId, BlogPost, TechNewsItem } from '../types';
import { sfx } from '../utils/soundEffects';
import { CredentialsCarousel } from './CredentialsCarousel';

interface HomeProps {
  onSelectService: (id: ServiceId) => void;
  onOpenBlog?: () => void;
  onOpenNoticias?: () => void;
  onSelectBlogPost?: (post: BlogPost) => void;
  onSelectNewsItem?: (item: TechNewsItem) => void;
}

export function Home({ 
  onSelectService, 
  onOpenBlog, 
  onOpenNoticias, 
  onSelectBlogPost,
  onSelectNewsItem 
}: HomeProps) {
  const latestPost = blogPosts[0];
  const latestNews = techNews[0];

  const handleCardClick = (id: ServiceId) => {
    sfx.playSelect();
    onSelectService(id);
  };

  const handleOpenBlog = () => {
    sfx.playWarp();
    if (onOpenBlog) onOpenBlog();
  };

  const handleOpenNoticias = () => {
    sfx.playWarp();
    if (onOpenNoticias) onOpenNoticias();
  };

  const handleOpenLatestPost = () => {
    sfx.playSelect();
    if (onSelectBlogPost && latestPost) {
      onSelectBlogPost(latestPost);
    } else if (onOpenBlog) {
      onOpenBlog();
    }
  };

  const handleOpenLatestNews = () => {
    sfx.playSelect();
    if (onSelectNewsItem && latestNews) {
      onSelectNewsItem(latestNews);
    } else if (onOpenNoticias) {
      onOpenNoticias();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black/50 via-transparent to-black/70 text-white py-12 px-4 md:px-12 font-sans flex flex-col items-center justify-between"
    >
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Cabecera Principal */}
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="flex justify-center items-center">
            <span className="sr-only">NOVUX</span>
            <img 
              src="https://lh3.googleusercontent.com/d/14YSecawix_ogB7wJocutwLOwSXtztcKU=w1000?v=2"
              alt="NOVUX"
              className="w-48 sm:w-56 md:w-64 h-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(197,160,89,0.35)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('googleusercontent.com/d/')) {
                  const match = target.src.match(/googleusercontent\.com\/d\/([^=?&]+)/);
                  if (match && match[1]) {
                    target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000&v=2`;
                  }
                }
              }}
            />
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            SOFTWARE FACTORY • ARQUITECTURA BI • MARKET INTELLIGENCE
          </p>
        </div>

        {/* Carrusel de Credenciales en Herramientas (Estilo Stack Tecnológico) */}
        <CredentialsCarousel />

        {/* Subtítulo de Sección Estilo Terminal */}
        <div className="w-full text-center my-6 md:my-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(197,160,89,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span>// PORTAFOLIO DE SERVICIOS / INFRAESTRUCTURA OPERATIVA</span>
          </div>
        </div>
        
        {/* Servicios Principales con Resplandor al Posicionar el Mouse (Cuadrícula Responsiva de 3 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mb-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(service.id)}
              className="group relative bg-[#0e0e11]/90 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059] rounded-sm p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(197,160,89,0.38)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />

              {/* Ambient Golden Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <h2 className="text-center text-base sm:text-lg tracking-wider font-serif mb-5 h-8 flex items-center justify-center uppercase text-zinc-100 group-hover:text-[#FFE066] transition-colors">
                  {service.categoryTitle}
                </h2>
                
                {/* Visual Content: Mock Terminal Dashboard for NOVUX MARKETPULSE or Image/Fallback for other services */}
                {service.id === 'NOVUX_MARKETPULSE' ? (
                  <div className="aspect-video w-full mb-6 overflow-hidden rounded-sm border border-emerald-500/40 group-hover:border-[#C5A059] bg-[#07090e] p-3 sm:p-3.5 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    {/* Subtle Matrix grid background */}
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
                        backgroundSize: '16px 16px'
                      }}
                    />

                    {/* Terminal Top Bar with Console Dots and Status */}
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="text-[10px] text-zinc-500 ml-1 hidden sm:inline">marketpulse.sh</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>[STATUS: ACTIVE MONITORING]</span>
                      </div>
                    </div>

                    {/* Target and Item Details */}
                    <div className="space-y-1.5 my-auto relative z-10">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-500 text-[11px]">Target:</span>
                        <span className="text-zinc-200 font-semibold truncate">Competidor Alpha Retail</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-500 text-[11px]">Item:</span>
                        <span className="text-white font-medium truncate">Laptop Pro 16" - Core Ultra</span>
                      </div>
                    </div>

                    {/* Pricing and Variation Box */}
                    <div className="bg-black/75 border border-zinc-800/90 rounded p-2 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase">Precio Actual:</span>
                        <span className="text-xs sm:text-sm font-bold text-[#FFE066] tracking-tight">$4,607,500 COP</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 block uppercase">Variación:</span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                          <span>↓</span>
                          <span>-5.0% (DESCUENTO DETECTADO)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full mb-6 overflow-hidden rounded-sm border border-zinc-700/60 group-hover:border-[#C5A059]/70 bg-black/60 transition-colors shadow-inner">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.categoryTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#18181f]/80 to-black/90 text-center">
                        <span className="font-mono text-xs tracking-widest text-[#C5A059] uppercase font-semibold mb-1">
                          {service.categoryTitle}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400">
                          [ ARQUITECTURA DIGITAL ]
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-gray-300 text-sm text-center mb-8 leading-relaxed font-light">
                  {service.shortDescription}
                </p>
              </div>
              
              {/* Botón de Acción */}
              {service.id === 'NOVUX_MARKETPULSE' ? (
                <a
                  href={service.externalLink || 'https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playPowerUp();
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full border border-[#C5A059] bg-[#C5A059]/15 text-[#FFE066] hover:bg-[#C5A059] hover:text-black py-3 text-xs sm:text-sm tracking-widest transition-all duration-300 rounded-sm uppercase font-bold shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] cursor-pointer text-center block"
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
                  className="w-full border border-[#C5A059] text-[#C5A059] py-3 text-xs sm:text-sm tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-300 rounded-sm uppercase font-bold shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] cursor-pointer"
                >
                  Abrir Servicio
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dos Secciones Novedades: NUEVO EN LA BITÁCORA & NUEVO EN NOTICIAS & RADAR TECH */}
        <div className="w-full max-w-4xl flex flex-col gap-3.5 mb-6">
          {/* 1. Sección: NUEVO EN LA BITÁCORA */}
          {latestPost && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <div 
                onClick={handleOpenLatestPost}
                onMouseEnter={() => sfx.playHover()}
                className="group relative bg-[#0e0e13]/90 hover:bg-[#151520] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-sm p-4 sm:p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-start sm:items-center gap-3.5 z-10">
                  <div className="p-2.5 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] shrink-0 mt-0.5 sm:mt-0 group-hover:scale-105 transition-transform">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A059] mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Sparkles size={11} />
                        NUEVO EN LA BITÁCORA
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{latestPost.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFE066] transition-colors leading-snug">
                      {latestPost.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 z-10">
                  <span className="text-xs font-mono text-[#C5A059] group-hover:text-[#FFE066] tracking-wider uppercase font-semibold">
                    Leer Entrada
                  </span>
                  <ChevronRight size={15} className="text-[#C5A059] group-hover:translate-x-1 group-hover:text-[#FFE066] transition-transform" />
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Sección: NUEVO EN NOTICIAS & RADAR TECH */}
          {latestNews && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="w-full"
            >
              <div 
                onClick={handleOpenLatestNews}
                onMouseEnter={() => sfx.playHover()}
                className="group relative bg-[#0e0e13]/90 hover:bg-[#151520] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-sm p-4 sm:p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-start sm:items-center gap-3.5 z-10">
                  <div className="p-2.5 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] shrink-0 mt-0.5 sm:mt-0 group-hover:scale-105 transition-transform">
                    <Radio size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A059] mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Sparkles size={11} />
                        NUEVO EN NOTICIAS & RADAR TECH
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{latestNews.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FFE066] transition-colors leading-snug">
                      {latestNews.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 z-10">
                  <span className="text-xs font-mono text-[#C5A059] group-hover:text-[#FFE066] tracking-wider uppercase font-semibold">
                    Explorar
                  </span>
                  <ChevronRight size={15} className="text-[#C5A059] group-hover:translate-x-1 group-hover:text-[#FFE066] transition-transform" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Acciones principales: Noticias, Bitácora y GitHub (Sin resplandor permanente) */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-6">
          <button
            onClick={handleOpenNoticias}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-sm border border-zinc-700 hover:border-[#C5A059] bg-[#0e0e11]/85 hover:bg-[#C5A059]/15 backdrop-blur-md text-zinc-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-300 text-xs font-mono uppercase tracking-widest cursor-pointer font-semibold"
          >
            <Radio className="w-4 h-4 text-[#C5A059] group-hover:text-[#FFE066] transition-colors" />
            <span>Noticias & Radar Tech</span>
          </button>

          <button
            onClick={handleOpenBlog}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-sm border border-zinc-700 hover:border-[#C5A059] bg-[#0e0e11]/85 hover:bg-[#C5A059]/15 backdrop-blur-md text-zinc-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-300 text-xs font-mono uppercase tracking-widest cursor-pointer font-semibold"
          >
            <BookOpen className="w-4 h-4 text-[#C5A059] group-hover:text-[#FFE066] transition-colors" />
            <span>Bitácora & Ensayos</span>
          </button>

          <a
            href="https://github.com/tavodf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-sm border border-zinc-800 hover:border-[#C5A059]/60 bg-[#0e0e11]/85 hover:bg-[#18181f]/95 backdrop-blur-md text-zinc-300 hover:text-[#FFE066] shadow-[0_4px_24px_rgba(0,0,0,0.7)] transition-all duration-300 text-xs font-mono tracking-wider cursor-pointer"
            title="Visitar perfil de GitHub de Gustavo De La Rosa (tavodf)"
          >
            <Github className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold tracking-wide">github.com/tavodf</span>
          </a>
        </div>
      </div>

      {/* Footer info */}
      <footer className="w-full max-w-6xl pt-8 border-t border-[#C5A059]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
        <span>© {new Date().getFullYear()} Gustavo De La Rosa. Todos los derechos reservados.</span>
        <span className="text-zinc-500">Arquitectura de Software & Datos</span>
      </footer>
    </motion.div>
  );
}
