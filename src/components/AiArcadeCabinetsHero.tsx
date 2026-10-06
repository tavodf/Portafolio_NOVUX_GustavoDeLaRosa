import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, Sparkles, Zap, ArrowRight, Gauge, 
  HelpCircle, Volume2, ShieldCheck, Check, Layers
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

export interface ArcadeCabinet {
  id: string;
  company: string;
  model: string;
  marqueeColor: string;
  neonBorder: string;
  glowColor: string;
  badge: string;
  inputCostPerM: number;
  outputCostPerM: number;
  cacheCostPerM?: number;
  contextTokens: string;
  vocabSize: string;
  spanishEfficiency: string;
  arcadeTag: string;
  flavor: string;
}

const CABINETS: ArcadeCabinet[] = [
  {
    id: 'openai',
    company: 'OpenAI',
    model: 'GPT-4o / o1-preview',
    marqueeColor: 'from-emerald-400 to-teal-500',
    neonBorder: 'border-emerald-500/60',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    badge: 'ESTÁNDAR DE MERCADO',
    inputCostPerM: 2.50,
    outputCostPerM: 10.00,
    contextTokens: '128k tokens',
    vocabSize: '200k tokens (o200k)',
    spanishEfficiency: 'Buena (~2.8 car/tok)',
    arcadeTag: 'STREET ATTENTION // 2.5 CREDITS',
    flavor: 'La máquina arcade clásica de la plaza. Alta demanda, fichas estándar y catálogo robusto de razonamiento.',
  },
  {
    id: 'anthropic',
    company: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    marqueeColor: 'from-amber-400 to-orange-500',
    neonBorder: 'border-amber-500/60',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    badge: 'ELITE CODING & REASONING',
    inputCostPerM: 3.00,
    outputCostPerM: 15.00,
    cacheCostPerM: 0.30,
    contextTokens: '200k tokens',
    vocabSize: '65k tokens (Claude BPE)',
    spanishEfficiency: 'Alta (~3.1 car/tok)',
    arcadeTag: 'NEO GEO CLAUDE // 90% PROMPT CACHING',
    flavor: 'Gabinete premium de alta precisión. Su ranura especial con "Prompt Caching" descuenta el 90% en tokens recurrentes.',
  },
  {
    id: 'google',
    company: 'Google DeepMind',
    model: 'Gemini 1.5 Flash / Pro',
    marqueeColor: 'from-blue-400 via-indigo-500 to-cyan-400',
    neonBorder: 'border-blue-500/60',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    badge: 'TOLVA GIGANTE 2M',
    inputCostPerM: 0.075,
    outputCostPerM: 0.30,
    contextTokens: '2,000,000 tokens',
    vocabSize: '256k tokens (SentencePiece)',
    spanishEfficiency: 'Excelente (~3.6 car/tok)',
    arcadeTag: 'HYPER HOPPER 2M // ULTRA CHEAP',
    flavor: 'Tolva descomunal de dos millones de fichas. Gracias a su inmenso vocabulario de 256k, no cobra castigo severo en español.',
  },
  {
    id: 'deepseek',
    company: 'DeepSeek AI',
    model: 'DeepSeek-V3 / R1',
    marqueeColor: 'from-cyan-300 to-sky-500',
    neonBorder: 'border-cyan-400/60',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    badge: 'DEFLACIÓN DE COSTOS',
    inputCostPerM: 0.14,
    outputCostPerM: 0.28,
    cacheCostPerM: 0.014,
    contextTokens: '64k tokens',
    vocabSize: '100k tokens (DeepSeek BPE)',
    spanishEfficiency: 'Media-Alta (~3.0 car/tok)',
    arcadeTag: 'DEFALTO RACER // 0.14¢ COIN',
    flavor: 'La revolución de tarifas. Arquitectura Multi-head Latent Attention que pulveriza el costo por ficha en más de un 90%.',
  },
  {
    id: 'meta',
    company: 'Meta AI',
    model: 'Llama 3.1 70B / 405B',
    marqueeColor: 'from-purple-400 to-fuchsia-500',
    neonBorder: 'border-purple-500/60',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badge: 'CÓDIGO ABIERTO / ON-PREMISE',
    inputCostPerM: 0.60,
    outputCostPerM: 1.80,
    contextTokens: '128k tokens',
    vocabSize: '128k tokens (tiktoken)',
    spanishEfficiency: 'Buena (~2.9 car/tok)',
    arcadeTag: 'OPEN CABINET // SELF-HOSTED 0$',
    flavor: 'El arcade con planos libres. Puedes fabricar tu propia máquina o alquilar servidores por fracciones de centavo.',
  },
];

export function AiArcadeCabinetsHero() {
  const [selectedCabinetId, setSelectedCabinetId] = useState<string>('google');
  const [insertedCoins, setInsertedCoins] = useState<number>(1);
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cabinets' | 'matrix'>('cabinets');

  const selectedCabinet = CABINETS.find(c => c.id === selectedCabinetId) || CABINETS[0];

  const handleSelectCabinet = (id: string) => {
    sfx.playSelect();
    setSelectedCabinetId(id);
  };

  const handleInsertCoin = () => {
    sfx.playPowerUp();
    setIsInserting(true);
    setTimeout(() => {
      setInsertedCoins(prev => prev + 1);
      setIsInserting(false);
    }, 280);
  };

  const handleResetCoins = () => {
    sfx.playBack();
    setInsertedCoins(1);
  };

  // Cálculos de fichas compradas según 1 USD en la máquina seleccionada
  const tokensBoughtWithOneUsd = Math.round((1 / selectedCabinet.inputCostPerM) * 1_000_000);
  const tokensBoughtWithCurrentCoins = tokensBoughtWithOneUsd * insertedCoins;

  return (
    <div className="mb-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#06060c] shadow-[0_0_50px_rgba(197,160,89,0.22)] relative select-none">
      {/* Barra Superior estilo Salón de Arcade de los Noventa */}
      <div className="bg-[#0f0f18] px-4 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider flex items-center gap-1.5">
            <Coins size={14} className="text-[#FFE066]" />
            SALÓN DE MÁQUINAS ARCADE // LA ECONOMÍA DEL TOKEN EN LOS MODELOS DOMINANTES
          </span>
        </div>

        {/* Selector de Vista */}
        <div className="flex items-center gap-1.5 bg-black/70 p-1 rounded border border-zinc-800 text-[11px] font-mono">
          <button
            onClick={() => {
              sfx.playClick();
              setViewMode('cabinets');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'cabinets'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Máquinas CRT</span>
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setViewMode('matrix');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'matrix'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Matriz de Tarifas</span>
          </button>
        </div>
      </div>

      {viewMode === 'cabinets' ? (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Fila Horizontal de Gabinetes Arcade Interactivos */}
          <div>
            <div className="text-[11px] font-mono text-zinc-400 mb-2.5 flex items-center justify-between">
              <span>// SELECCIONA UNA MÁQUINA ARCADE PARA AUDITAR SU PANTALLA CRT:</span>
              <span className="text-[#FFE066] hidden sm:inline">Haz clic en cualquier gabinete</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
              {CABINETS.map((cabinet) => {
                const isSelected = cabinet.id === selectedCabinetId;
                return (
                  <button
                    key={cabinet.id}
                    onClick={() => handleSelectCabinet(cabinet.id)}
                    className={`group relative text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                      isSelected
                        ? `bg-zinc-950 ${cabinet.neonBorder} shadow-[0_0_25px_var(--glow)]`
                        : 'bg-[#0a0a10]/80 border-zinc-800 hover:border-zinc-600 hover:bg-[#10101a]'
                    }`}
                    style={{
                      // @ts-ignore
                      '--glow': cabinet.glowColor,
                    }}
                  >
                    {/* Marquesina Superior Iluminada */}
                    <div>
                      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${cabinet.marqueeColor} mb-2 ${isSelected ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-40 group-hover:opacity-80'} transition-opacity`} />
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block leading-tight">
                        {cabinet.company}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFE066] transition-colors truncate">
                        {cabinet.model.split('/')[0]}
                      </h4>
                    </div>

                    {/* Mini pantalla CRT con costo */}
                    <div className="my-2.5 p-2 rounded bg-black/90 border border-zinc-900 font-mono text-center">
                      <span className="text-[9px] text-zinc-500 uppercase block">Input / 1M</span>
                      <span className={`text-xs sm:text-sm font-bold block ${isSelected ? 'text-[#FFE066]' : 'text-zinc-300'}`}>
                        ${cabinet.inputCostPerM.toFixed(cabinet.inputCostPerM < 0.1 ? 3 : 2)}
                      </span>
                    </div>

                    {/* Ranura de Monedas */}
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">25¢ Slot</span>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 animate-ping' : 'bg-zinc-700'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gran Pantalla CRT en Primer Plano de la Máquina Seleccionada */}
          <div className="rounded-xl border border-zinc-800 bg-[#020205] p-5 sm:p-7 relative overflow-hidden shadow-2xl">
            {/* Efecto de Curvatura y Scanlines de Monitor CRT */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0px, rgba(0, 0, 0, 0.7) 1px, transparent 1px, transparent 3px)',
              }}
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Pantalla CRT Digital */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm bg-gradient-to-r ${selectedCabinet.marqueeColor}`} />
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-mono">
                      {selectedCabinet.company.toUpperCase()} // {selectedCabinet.model}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#FFE066] font-bold">
                    {selectedCabinet.badge}
                  </span>
                </div>

                {/* Métricas en Pantalla Phosphor */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Costo Entrada (1M)
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-[#FFE066]">
                      ${selectedCabinet.inputCostPerM.toFixed(selectedCabinet.inputCostPerM < 0.1 ? 3 : 2)} USD
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      ${(selectedCabinet.inputCostPerM / 1_000_000).toFixed(8)} / token
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Costo Salida (1M)
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                      ${selectedCabinet.outputCostPerM.toFixed(2)} USD
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      ${(selectedCabinet.outputCostPerM / 1_000_000).toFixed(8)} / token
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Tolva de Contexto
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-cyan-400">
                      {selectedCabinet.contextTokens}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      Capacidad Máxima
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      Vocabulario BPE
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-purple-400">
                      {selectedCabinet.vocabSize.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      Fichas Únicas
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 font-mono text-xs text-zinc-300 flex items-start gap-2.5">
                  <Zap size={14} className="text-[#FFE066] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block mb-0.5">Mecánica de la Máquina:</span>
                    <span>{selectedCabinet.flavor}</span>
                  </div>
                </div>
              </div>

              {/* Panel Mecánico de Monedas & Taquilla */}
              <div className="lg:col-span-4 bg-[#0a0a12] p-5 rounded-xl border border-[#C5A059]/40 flex flex-col justify-between space-y-4 shadow-inner text-center">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block mb-1">
                    TAQUILLA // INSERTE FICHAS
                  </span>
                  <div className="text-2xl font-bold font-mono text-white flex items-center justify-center gap-1.5">
                    <Coins size={22} className="text-[#FFE066]" />
                    <span>${insertedCoins}.00 USD</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 block mt-1">
                    Equivale a <strong className="text-emerald-400">{tokensBoughtWithCurrentCoins.toLocaleString()}</strong> tokens de entrada en esta máquina
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleInsertCoin}
                    disabled={isInserting}
                    className="w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Coins size={14} className="fill-current" />
                    <span>{isInserting ? 'Procesando Ficha...' : 'Insertar Moneda (+1 USD)'}</span>
                  </button>

                  <button
                    onClick={handleResetCoins}
                    className="w-full py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-[11px] rounded transition-colors cursor-pointer"
                  >
                    Reiniciar Saldo
                  </button>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                  // En los 90 cambiabas efectivo por fichas; hoy cambias presupuesto API por Token IDs.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: MATRIZ DE COMPARACIÓN DE TARIFAS */
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/80">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#10101c] text-zinc-400 border-b border-zinc-800 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Empresa / Máquina</th>
                  <th className="py-2.5 px-3">Modelo</th>
                  <th className="py-2.5 px-3 text-right">Input / 1M</th>
                  <th className="py-2.5 px-3 text-right">Output / 1M</th>
                  <th className="py-2.5 px-3 text-center">Ventana (Tolva)</th>
                  <th className="py-2.5 px-3 text-center">Eficiencia Español</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {CABINETS.map((c) => (
                  <tr key={c.id} className="hover:bg-[#C5A059]/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${c.marqueeColor}`} />
                      {c.company}
                    </td>
                    <td className="py-3 px-3 text-zinc-300">{c.model}</td>
                    <td className="py-3 px-3 text-right text-[#FFE066] font-bold">
                      ${c.inputCostPerM.toFixed(c.inputCostPerM < 0.1 ? 3 : 2)}
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                      ${c.outputCostPerM.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center text-cyan-400">{c.contextTokens}</td>
                    <td className="py-3 px-3 text-center text-zinc-400">{c.spanishEfficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
