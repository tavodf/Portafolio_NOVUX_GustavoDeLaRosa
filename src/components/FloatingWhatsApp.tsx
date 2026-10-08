import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ArrowUpRight, Sparkles, Send, Phone } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';

interface FloatingWhatsAppProps {
  currentContext?: string;
}

export function FloatingWhatsApp({ currentContext }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickOptions = [
    {
      title: 'MarketPulse',
      desc: 'Monitoreo de precios y quiebres',
      message: 'Hola NOVUX S.A.S., me interesa cotizar el servicio de Monitoreo de Precios y Detección de Quiebres (MarketPulse) para mi e-commerce/empresa.'
    },
    {
      title: 'DataOps & RPA',
      desc: 'Conciliación y automatización Python',
      message: 'Hola NOVUX S.A.S., busco automatizar procesos operativos y conciliación de reportes con scripts en Python (DataOps).'
    },
    {
      title: 'Web Data Harvesting',
      desc: 'Extracción Ares Scraper con bypass WAF',
      message: 'Hola NOVUX S.A.S., requiero cotizar la extracción de un dataset estructurado con Ares Scraper.'
    },
    {
      title: 'Data Analytics & BI',
      desc: 'Tableros Looker Studio y Data Warehouse',
      message: 'Hola NOVUX S.A.S., vi el caso de éxito de BI y deseo estructurar un Data Warehouse / Tablero para mi compañía.'
    },
    {
      title: 'AI Document & NLP',
      desc: 'Auditoría BPE y pipelines Pydantic',
      message: 'Hola NOVUX S.A.S., me interesa cotizar la solución de AI Document & NLP y auditoría de costos de tokens para mi empresa.'
    },
    {
      title: 'Software Factory',
      desc: 'Sprints React / Python con 100% IP',
      message: 'Hola NOVUX S.A.S., requiero cotizar un Sprint de desarrollo de software a medida o microservicio.'
    }
  ];

  const handleToggle = () => {
    sfx.playClick();
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (msg: string) => {
    sfx.playPowerUp();
    window.open(getWhatsAppUrl(msg), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0b0b14]/95 border border-[#C5A059]/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden text-white"
          >
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-[#181824] to-[#0d0d16] p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    NOVUX S.A.S. • WhatsApp B2B
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-bold mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Canal Oficial de Atención B2B</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleToggle}
                className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Opciones Pre-Estructuradas */}
            <div className="p-3.5 space-y-1.5 max-h-[340px] overflow-y-auto">
              <p className="text-[11px] text-zinc-400 font-mono mb-2">
                Selecciona tu requerimiento para abrir chat de atención:
              </p>

              {quickOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.message)}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full text-left p-2.5 rounded-lg bg-black/60 hover:bg-[#151522] border border-zinc-800/80 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-zinc-100 group-hover:text-[#FFE066] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-sans">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-[#FFE066] transition-colors shrink-0" />
                </button>
              ))}

              <button
                onClick={() => handleSelectOption('Hola NOVUX S.A.S., deseo una consulta técnica general sobre sus servicios de Data & Tech Factory.')}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send size={12} />
                <span>Consulta General por WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal Flotante */}
      <div className="flex items-center gap-2">
        <motion.div
          onClick={handleToggle}
          whileHover={{ scale: 1.02 }}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a0a14]/95 border border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md cursor-pointer transition-all group"
          title="Atención Directa WhatsApp B2B"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-300 group-hover:text-white">Atención Inmediata:</span>
          <span className="text-xs font-mono font-bold text-[#FFE066] group-hover:text-emerald-400 transition-colors">
            WHATSAPP B2B
          </span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center cursor-pointer border-2 border-emerald-300/40 relative group shrink-0"
          title="WhatsApp Corporativo NOVUX"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFE066] border-2 border-black animate-pulse" />
          <MessageCircle size={26} className="fill-current" />
        </motion.button>
      </div>
    </div>
  );
}
