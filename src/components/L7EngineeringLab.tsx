import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Binary, Terminal, Cpu, Sparkles, Code2, 
  Layers, ShieldAlert, ArrowRight, Zap, Orbit
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { NovuxEng001Interactive } from './NovuxEng001Interactive';
import { NovuxEng002Interactive } from './NovuxEng002Interactive';
import { NovuxEng003NeuralMatrix3D } from './NovuxEng003NeuralMatrix3D';

export function L7EngineeringLab() {
  const [activeSimulator, setActiveSimulator] = useState<'NEURAL_MATRIX_3D' | 'TOKEN_BPE' | 'MINHASH_CPARSER'>('NEURAL_MATRIX_3D');

  return (
    <section className="w-full max-w-6xl my-16">
      {/* Encabezado del Bloque 3 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(197,160,89,0.18)] mb-3">
          <Zap size={14} className="text-[#FFE066] animate-pulse" />
          <span>// BLOQUE 3: LABORATORIO DE INGENIERÍA & SIMULADORES L7</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
          Músculo Tecnológico: Simuladores Interactivos en Vivo
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-2">
          No vendemos presentaciones ni hipótesis comerciales. Pruebe en vivo nuestra física computacional de modelos de lenguaje, telemetría de razonamiento 3D y auditoría económica de tokens.
        </p>
      </div>

      {/* Selector de Simulador */}
      <div className="flex justify-center mb-6 px-2">
        <div className="inline-flex flex-col sm:flex-row p-1.5 rounded-xl bg-[#0f0f18] border border-zinc-800 gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sfx.playSelect();
              setActiveSimulator('NEURAL_MATRIX_3D');
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSimulator === 'NEURAL_MATRIX_3D'
                ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Orbit size={14} />
            <span>NeuralMatrix 3D (Variedad & Telemetría)</span>
          </button>

          <button
            onClick={() => {
              sfx.playSelect();
              setActiveSimulator('TOKEN_BPE');
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSimulator === 'TOKEN_BPE'
                ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Cpu size={14} />
            <span>Auditor de Costos BPE</span>
          </button>

          <button
            onClick={() => {
              sfx.playSelect();
              setActiveSimulator('MINHASH_CPARSER');
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSimulator === 'MINHASH_CPARSER'
                ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Binary size={14} />
            <span>Pipeline L7 (MinHash + Parser C)</span>
          </button>
        </div>
      </div>

      {/* Contenedor del Simulador Activo */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeSimulator === 'NEURAL_MATRIX_3D' && (
            <motion.div
              key="NEURAL_MATRIX_3D"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NovuxEng003NeuralMatrix3D />
            </motion.div>
          )}

          {activeSimulator === 'TOKEN_BPE' && (
            <motion.div
              key="TOKEN_BPE"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NovuxEng002Interactive />
            </motion.div>
          )}

          {activeSimulator === 'MINHASH_CPARSER' && (
            <motion.div
              key="MINHASH_CPARSER"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NovuxEng001Interactive />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
