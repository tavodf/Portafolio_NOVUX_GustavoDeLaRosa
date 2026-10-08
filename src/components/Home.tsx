import { motion } from 'motion/react';
import { Github, BookOpen, ChevronRight, Sparkles, Radio, FlaskConical, Terminal, Cpu, Database, ShieldCheck, Layers, MessageCircle } from 'lucide-react';
import { serviceList, getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';
import { blogPosts } from '../blogData';
import { techNews } from '../newsData';
import { ServiceId, BlogPost, TechNewsItem } from '../types';
import { sfx } from '../utils/soundEffects';
import { CredentialsCarousel } from './CredentialsCarousel';
import { ServicesCarousel } from './ServicesCarousel';
import { Novux3DLogo } from './Novux3DLogo';

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
  const b2bServices = serviceList.filter(s => !s.isLab && s.id !== 'LABORATORIO_INVESTIGACION');
  const labService = serviceList.find(s => s.isLab || s.id === 'LABORATORIO_INVESTIGACION');

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
      className="min-h-screen bg-gradient-to-b from-black/50 via-transparent to-black/70 text-white py-12 px-3 sm:px-6 md:px-8 xl:px-10 font-sans flex flex-col items-center justify-between"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] flex flex-col items-center">
        {/* Cabecera Principal con Logo 3D */}
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="flex justify-center items-center">
            <span className="sr-only">NOVUX</span>
            <Novux3DLogo 
              imageSrc="https://lh3.googleusercontent.com/d/14YSecawix_ogB7wJocutwLOwSXtztcKU=w1000?v=2"
            />
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            SOFTWARE FACTORY • ARQUITECTURA BI • MARKET INTELLIGENCE
          </p>
        </div>

        {/* Carrusel de Credenciales en Herramientas (Estilo Stack Tecnológico) */}
        <CredentialsCarousel />

        {/* Carrusel de los 6 Servicios B2B */}
        <ServicesCarousel services={b2bServices} onSelectService={onSelectService} />

        {/* Sección Independiente Centrada: LABORATORIO E INVESTIGACIÓN (Abajo en la mitad aparte de los servicios) */}
        {labService && (
          <div className="w-full max-w-xl mx-auto my-8 sm:my-10 flex flex-col items-center px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
              <FlaskConical size={13} className="text-[#FFE066] animate-pulse" />
              <span>// R&D DIVISION • LABORATORIO E INVESTIGACIÓN</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleCardClick(labService.id)}
              className="group relative w-full bg-[#0a0a12]/95 backdrop-blur-md border border-[#C5A059]/40 hover:border-[#FFE066] rounded-sm p-6 sm:p-8 flex flex-col items-center justify-between shadow-[0_12px_45px_rgba(0,0,0,0.9)] hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] transition-all duration-300 overflow-hidden cursor-pointer text-center select-none"
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C5A059]/50 group-hover:border-[#FFE066] transition-colors" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C5A059]/50 group-hover:border-[#FFE066] transition-colors" />

              {/* Ambient Golden Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <h2 className="text-lg sm:text-xl font-serif tracking-widest uppercase text-zinc-100 group-hover:text-[#FFE066] transition-colors mb-2">
                {labService.categoryTitle}
              </h2>

              <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center my-3 text-[#FFE066] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(197,160,89,0.25)]">
                <FlaskConical size={22} />
              </div>

              {/* Texto exacto solicitado por el usuario */}
              <p className="text-sm sm:text-base font-serif text-zinc-200 tracking-wide max-w-md leading-relaxed my-2 font-normal">
                investigación técnica y desarrollo de productos y conceptos.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-zinc-800 text-[10.5px] font-mono text-zinc-400 my-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ESPACIO DE PROTOTIPADO Y CONCEPTUALIZACIÓN TÉCNICA</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(labService.id);
                }}
                onMouseEnter={() => sfx.playHover()}
                className="mt-3 w-full sm:w-auto px-8 border border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#FFE066] hover:text-black py-2.5 text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] cursor-pointer"
              >
                EXPLORAR LABORATORIO
              </button>
            </motion.div>
          </div>
        )}

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
      <footer className="w-full max-w-[1560px] 2xl:max-w-[1680px] pt-8 border-t border-[#C5A059]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-4">
        <span>© {new Date().getFullYear()} Gustavo De La Rosa. Todos los derechos reservados.</span>

        {/* Enlace Oficial a WhatsApp Corporativo */}
        <a
          href={getWhatsAppUrl('Hola NOVUX S.A.S., me comunico desde la plataforma oficial.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sfx.playSelect()}
          onMouseEnter={() => sfx.playHover()}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] font-bold cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <MessageCircle size={13} />
          <span>ATENCIÓN WHATSAPP B2B</span>
        </a>

        <span className="text-zinc-500">Arquitectura de Software & Datos • Bogotá D.C.</span>
      </footer>
    </motion.div>
  );
}
