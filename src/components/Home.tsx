import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import { serviceList } from '../data';
import { ServiceId } from '../types';
import { sfx } from '../utils/soundEffects';

interface HomeProps {
  onSelectService: (id: ServiceId) => void;
}

export function Home({ onSelectService }: HomeProps) {
  const handleCardClick = (id: ServiceId) => {
    sfx.playSelect();
    onSelectService(id);
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

        {/* Enlace a GitHub centrado en la parte inferior de la página principal */}
        <div className="flex justify-center items-center my-6">
          <a
            href="https://github.com/tavodf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0e0e11]/85 hover:bg-[#18181f]/95 backdrop-blur-md text-zinc-200 hover:text-[#FFE066] shadow-[0_4px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] transition-all duration-300 text-sm font-mono tracking-wider cursor-pointer"
            title="Visitar perfil de GitHub de Gustavo De La Rosa (tavodf)"
          >
            <Github className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform duration-200" />
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
