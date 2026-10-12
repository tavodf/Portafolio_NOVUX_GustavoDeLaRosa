import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ArrowUpRight, Send } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../data';

interface FloatingWhatsAppProps {
  currentContext?: string;
}

export function FloatingWhatsApp({ currentContext }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickOptions = [
    {
      title: 'CASE-SANTAFE-BI',
      desc: 'Comando Central Bogotá (+131k interacciones)',
      message: 'Hola NOVUX S.A.S., me interesa cotizar una plataforma de Business Intelligence Gubernamental y Analítica Territorial basada en CASE-SANTAFE-BI.'
    },
    {
      title: 'CASE-ARES-GRID',
      desc: 'Extracción L7 y Evasión WAF (Ares Scraper)',
      message: 'Hola NOVUX S.A.S., requiero cotizar infraestructura de Web Data Harvesting y bypass antibot WAF con Ares Scraper.'
    },
    {
      title: 'CASE-COT-OPS',
      desc: 'Gemelos Digitales 3D & Telemetría C2 (60 FPS)',
      message: 'Hola NOVUX S.A.S., deseo cotizar la plataforma de Control Operativo en Territorio NOVUX COT (Gemelo Digital 3D / C2).'
    },
    {
      title: 'CASE-CPC-PULSE',
      desc: 'Hemiciclo 3D & Kahn DAG (45 Curules en Vivo)',
      message: 'Hola NOVUX S.A.S., busco cotizar la plataforma de Inteligencia Política y Auditoría Electoral CPC PULSE.'
    },
    {
      title: 'Desarrollo a Medida // Sprints B2B',
      desc: '100% Cesión de Código y Control Propietario',
      message: 'Hola NOVUX S.A.S., deseo cotizar un desarrollo de software a medida o ingeniería de datos para mi empresa.'
    }
  ];

  const handleToggle = () => {
    sfx.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-[9999] pointer-events-auto font-sans max-w-[calc(100vw-1.5rem)] select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 rounded-xl bg-[#0b0b14]/98 border border-[#C5A059]/40 p-4 shadow-[0_12px_45px_rgba(0,0,0,0.95)] backdrop-blur-xl text-left relative overflow-hidden"
          >
            {/* Cabecera del Widget */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <span>NOVUX B2B DIRECT</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    Línea Oficial: {WHATSAPP_DISPLAY_NUMBER}
                  </div>
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800/60 transition-colors cursor-pointer"
                aria-label="Cerrar modal de WhatsApp"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-zinc-300 font-sans my-3 leading-snug">
              Seleccione la arquitectura o caso de éxito que desea adaptar a las necesidades operativas de su organización:
            </p>

            {/* Opciones directas por anclaje <a> para evitar bloqueos de popup locales */}
            <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
              {quickOptions.map((opt, idx) => (
                <a
                  key={idx}
                  href={getWhatsAppUrl(opt.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sfx.playPowerUp();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full text-left p-2.5 rounded-lg bg-black/60 hover:bg-[#151522] border border-zinc-800/80 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex items-center justify-between block no-underline"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-mono font-bold text-zinc-100 group-hover:text-[#FFE066] transition-colors truncate">
                      {opt.title}
                    </div>
                    <div className="text-[10.5px] text-zinc-400 font-sans truncate">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-[#FFE066] transition-colors shrink-0" />
                </a>
              ))}

              <a
                href={getWhatsAppUrl('Hola NOVUX S.A.S., deseo una consulta técnica general sobre sus arquitecturas desplegadas y casos de éxito.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sfx.playPowerUp();
                  setIsOpen(false);
                }}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 no-underline shadow-md"
              >
                <Send size={12} />
                <span>Consulta General por WhatsApp</span>
              </a>
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
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center cursor-pointer border-2 border-emerald-300/40 relative group shrink-0"
          title="WhatsApp Corporativo NOVUX"
          aria-label="Abrir WhatsApp B2B"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFE066] border-2 border-black animate-pulse" />
          <MessageCircle size={24} className="fill-current sm:scale-110" />
        </motion.button>
      </div>
    </div>
  );
}
