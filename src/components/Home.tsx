import { motion } from 'motion/react';
import { Github, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { serviceList } from '../data';
import { blogPosts } from '../blogData';
import { ServiceId, BlogPost } from '../types';
import { sfx } from '../utils/soundEffects';

interface HomeProps {
  onSelectService: (id: ServiceId) => void;
  onOpenBlog?: () => void;
  onSelectBlogPost?: (post: BlogPost) => void;
}

export function Home({ onSelectService, onOpenBlog, onSelectBlogPost }: HomeProps) {
  const latestPost = blogPosts[0];

  const handleCardClick = (id: ServiceId) => {
    sfx.playSelect();
    onSelectService(id);
  };

  const handleOpenBlog = () => {
    sfx.playWarp();
    if (onOpenBlog) onOpenBlog();
  };

  const handleOpenLatestPost = () => {
    sfx.playSelect();
    if (onSelectBlogPost && latestPost) {
      onSelectBlogPost(latestPost);
    } else if (onOpenBlog) {
      onOpenBlog();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black/50 via-transparent to-black/70 text-white py-14 px-4 md:px-12 font-sans flex flex-col items-center justify-between"
    >
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#C5A059] tracking-widest mb-16 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Gustavo De La Rosa
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0e0e11]/85 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059] rounded-sm p-6 flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300"
            >
              <h2 className="text-center text-lg tracking-wider font-serif mb-6 h-8 flex items-center justify-center uppercase text-zinc-100">
                {service.categoryTitle}
              </h2>
              
              <div className="aspect-video w-full mb-6 overflow-hidden rounded-sm border border-zinc-700/60 bg-black/60">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.categoryTitle}
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
              
              <p className="text-gray-300 text-sm text-center mb-8 flex-grow leading-relaxed">
                {service.shortDescription}
              </p>
              
              <button
                onClick={() => handleCardClick(service.id)}
                onMouseEnter={() => sfx.playHover()}
                className="w-full border border-[#C5A059] text-[#C5A059] py-3 text-sm tracking-widest hover:bg-[#C5A059] hover:text-[#141414] transition-all duration-300 rounded-sm uppercase font-medium shadow-md cursor-pointer"
              >
                Abrir Servicio
              </button>
            </motion.div>
          ))}
        </div>

        {/* Banner destacado: Bitácora & Radar Técnico */}
        {latestPost && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="w-full max-w-4xl mb-4"
          >
            <div 
              onClick={handleOpenLatestPost}
              onMouseEnter={() => sfx.playHover()}
              className="group bg-[#0e0e13]/90 hover:bg-[#151520] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-sm p-4 sm:p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(197,160,89,0.25)] transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] shrink-0 mt-0.5 sm:mt-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A059] mb-1">
                    <span className="flex items-center gap-1">
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

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-xs font-mono text-[#C5A059] tracking-wider uppercase">
                  Leer
                </span>
                <ChevronRight size={15} className="text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Acciones de pie: Explorar Bitácora y GitHub */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-6">
          <button
            onClick={handleOpenBlog}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-sm border border-[#C5A059]/50 hover:border-[#C5A059] bg-[#0e0e11]/85 hover:bg-[#C5A059]/15 backdrop-blur-md text-[#FFE066] hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-300 text-xs font-mono uppercase tracking-widest cursor-pointer font-semibold"
          >
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <span>Ver Toda la Bitácora</span>
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
