import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Zap, ArrowRight, Gauge, 
  HelpCircle, Volume2, ShieldCheck, Check, Layers, DollarSign, Database, Server
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export interface AiProviderBenchmark {
  id: string;
  company: string;
  model: string;
  marqueeColor: string;
  neonBorder: string;
  glowColor: string;
  badge: string;
  badgeEn?: string;
  inputCostPerM: number;
  outputCostPerM: number;
  cacheCostPerM?: number;
  contextTokens: string;
  vocabSize: string;
  spanishEfficiency: string;
  spanishEfficiencyEn?: string;
  categoryTag: string;
  flavor: string;
  flavorEn?: string;
}

const PROVIDERS: AiProviderBenchmark[] = [
  {
    id: 'openai',
    company: 'OpenAI',
    model: 'GPT-4o / o1-preview',
    marqueeColor: 'from-emerald-400 to-teal-500',
    neonBorder: 'border-emerald-500/60',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    badge: 'ESTÁNDAR DE MERCADO',
    badgeEn: 'MARKET BENCHMARK',
    inputCostPerM: 2.50,
    outputCostPerM: 10.00,
    contextTokens: '128k tokens',
    vocabSize: '200k tokens (o200k)',
    spanishEfficiency: 'Buena (~2.8 car/tok)',
    spanishEfficiencyEn: 'Good (~2.8 char/tok)',
    categoryTag: 'ENTERPRISE TIER // GENERAL PURPOSE',
    flavor: 'Modelo insignia corporativo de alta precisión para razonamiento estructurado, APIs empresariales y orquestación de agentes con tokenización o200k.',
    flavorEn: 'Flagship corporate model for structured reasoning, enterprise APIs, and agent orchestration with modern o200k tokenization.'
  },
  {
    id: 'anthropic',
    company: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    marqueeColor: 'from-amber-400 to-orange-500',
    neonBorder: 'border-amber-500/60',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    badge: 'ELITE CODING & REASONING',
    badgeEn: 'ELITE CODING & REASONING',
    inputCostPerM: 3.00,
    outputCostPerM: 15.00,
    cacheCostPerM: 0.30,
    contextTokens: '200k tokens',
    vocabSize: '65k tokens (Claude BPE)',
    spanishEfficiency: 'Alta (~3.1 car/tok)',
    spanishEfficiencyEn: 'High (~3.1 char/tok)',
    categoryTag: 'ADVANCED TIER // PROMPT CACHING 90%',
    flavor: 'Motor de élite en arquitectura de software y análisis contextual profundo. Su función de Prompt Caching permite un 90% de descuento en tokens recurrentes.',
    flavorEn: 'Elite engine for software architecture and deep contextual analysis. Prompt Caching delivers up to 90% savings on recurring inputs.'
  },
  {
    id: 'google',
    company: 'Google DeepMind',
    model: 'Gemini 1.5 Flash / Pro',
    marqueeColor: 'from-blue-400 via-indigo-500 to-cyan-400',
    neonBorder: 'border-blue-500/60',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    badge: 'VENTANA GIGANTE 2M',
    badgeEn: '2M MASSIVE WINDOW',
    inputCostPerM: 0.075,
    outputCostPerM: 0.30,
    contextTokens: '2,000,000 tokens',
    vocabSize: '256k tokens (SentencePiece)',
    spanishEfficiency: 'Excelente (~3.6 car/tok)',
    spanishEfficiencyEn: 'Excellent (~3.6 char/tok)',
    categoryTag: 'HIGH-SCALE TIER // ULTRA-EFFICIENT',
    flavor: 'Máxima ventana de contexto del mercado con 2 millones de tokens y vocabulario de 256k, optimizando drásticamente la relación costo/rendimiento para documentos masivos.',
    flavorEn: 'Largest context window in the market with 2M tokens and a 256k vocabulary, drastically reducing token penalties in non-English payloads.'
  },
  {
    id: 'deepseek',
    company: 'DeepSeek AI',
    model: 'DeepSeek-V3 / R1',
    marqueeColor: 'from-cyan-300 to-sky-500',
    neonBorder: 'border-cyan-400/60',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    badge: 'DEFLACIÓN DE COSTOS',
    badgeEn: 'COST DEFLATION',
    inputCostPerM: 0.14,
    outputCostPerM: 0.28,
    cacheCostPerM: 0.014,
    contextTokens: '64k tokens',
    vocabSize: '100k tokens (DeepSeek BPE)',
    spanishEfficiency: 'Media-Alta (~3.0 car/tok)',
    spanishEfficiencyEn: 'Medium-High (~3.0 char/tok)',
    categoryTag: 'HYPER-EFFICIENCY // 0.14$ INPUT',
    flavor: 'Deflación radical de costos. Arquitectura Multi-head Latent Attention (MLA) que reduce en más de un 90% el costo por token frente a modelos propietarios.',
    flavorEn: 'Radical cost deflation. Multi-head Latent Attention (MLA) architecture slashing API token expenses by over 90% compared to legacy proprietary models.'
  },
  {
    id: 'meta',
    company: 'Meta AI',
    model: 'Llama 3.1 70B / 405B',
    marqueeColor: 'from-purple-400 to-fuchsia-500',
    neonBorder: 'border-purple-500/60',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badge: 'CÓDIGO ABIERTO / ON-PREMISE',
    badgeEn: 'OPEN-SOURCE / ON-PREM',
    inputCostPerM: 0.60,
    outputCostPerM: 1.80,
    contextTokens: '128k tokens',
    vocabSize: '128k tokens (tiktoken)',
    spanishEfficiency: 'Buena (~2.9 car/tok)',
    spanishEfficiencyEn: 'Good (~2.9 char/tok)',
    categoryTag: 'OPEN ARCHITECTURE // SELF-HOSTED',
    flavor: 'Arquitectura de pesos abiertos para despliegue soberano On-Premise o en nubes privadas, garantizando privacidad total y costo marginal $0 de API.',
    flavorEn: 'Open-weights architecture for sovereign On-Premise or private cloud deployments, ensuring zero external data leakage and $0 variable API fees.'
  },
];

export function AiArcadeCabinetsHero() {
  const { lang } = useLanguage();
  const [selectedCabinetId, setSelectedCabinetId] = useState<string>('google');
  const [simulatedBudget, setSimulatedBudget] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cabinets' | 'matrix'>('cabinets');

  const selectedProvider = PROVIDERS.find(c => c.id === selectedCabinetId) || PROVIDERS[0];

  const handleSelectProvider = (id: string) => {
    sfx.playSelect();
    setSelectedCabinetId(id);
  };

  const handleAddBudget = () => {
    sfx.playPowerUp();
    setIsCalculating(true);
    setTimeout(() => {
      setSimulatedBudget(prev => prev + 1);
      setIsCalculating(false);
    }, 280);
  };

  const handleResetBudget = () => {
    sfx.playBack();
    setSimulatedBudget(1);
  };

  // Cálculos de tokens adquiridos según $1 USD en el proveedor seleccionado
  const tokensPerOneUsd = Math.round((1 / selectedProvider.inputCostPerM) * 1_000_000);
  const tokensWithCurrentBudget = tokensPerOneUsd * simulatedBudget;

  return (
    <div className="mb-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#06060c] shadow-[0_0_50px_rgba(197,160,89,0.22)] relative select-none">
      {/* Barra Superior de Control de Auditoría */}
      <div className="bg-[#0f0f18] px-4 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE066]" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider flex items-center gap-1.5">
            <Database size={14} className="text-[#FFE066]" />
            <span>
              {lang === 'en'
                ? 'AI COST BENCHMARK // TOKENOMICS & EFFICIENCY FOR ENTERPRISE LLMs'
                : 'BENCHMARK DE COSTOS DE IA // ECONOMÍA DEL TOKEN EN MODELOS DE LENGUAJE EMPRESARIALES'}
            </span>
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
            <span>{lang === 'en' ? 'Leading Providers' : 'Proveedores Líderes'}</span>
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
            <span>{lang === 'en' ? 'Rate Matrix' : 'Matriz de Tarifas'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'cabinets' ? (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Fila Horizontal de Proveedores de IA */}
          <div>
            <div className="text-[11px] font-mono text-zinc-400 mb-2.5 flex items-center justify-between">
              <span>
                {lang === 'en'
                  ? '// SELECT AN AI PROVIDER TO AUDIT COSTS, EFFICIENCY AND CAPACITY:'
                  : '// SELECCIONA UN PROVEEDOR DE IA PARA AUDITAR COSTOS, EFICIENCIA Y CAPACIDAD:'}
              </span>
              <span className="text-[#FFE066] hidden sm:inline">
                {lang === 'en' ? 'Click on any provider module' : 'Haz clic en cualquier proveedor'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
              {PROVIDERS.map((provider) => {
                const isSelected = provider.id === selectedCabinetId;
                return (
                  <button
                    key={provider.id}
                    onClick={() => handleSelectProvider(provider.id)}
                    className={`group relative text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                      isSelected
                        ? `bg-zinc-950 ${provider.neonBorder} shadow-[0_0_25px_var(--glow)]`
                        : 'bg-[#0a0a10]/80 border-zinc-800 hover:border-zinc-600 hover:bg-[#10101a]'
                    }`}
                    style={{
                      // @ts-ignore
                      '--glow': provider.glowColor,
                    }}
                  >
                    {/* Barra de Color del Proveedor */}
                    <div>
                      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${provider.marqueeColor} mb-2 ${isSelected ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-40 group-hover:opacity-80'} transition-opacity`} />
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block leading-tight">
                        {provider.company}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFE066] transition-colors truncate">
                        {provider.model.split('/')[0]}
                      </h4>
                    </div>

                    {/* Métrica Resumida */}
                    <div className="my-2.5 p-2 rounded bg-black/90 border border-zinc-900 font-mono text-center">
                      <span className="text-[9px] text-zinc-500 uppercase block">Input / 1M</span>
                      <span className={`text-xs sm:text-sm font-bold block ${isSelected ? 'text-[#FFE066]' : 'text-zinc-300'}`}>
                        ${provider.inputCostPerM.toFixed(provider.inputCostPerM < 0.1 ? 3 : 2)}
                      </span>
                    </div>

                    {/* Estado de Auditoría */}
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">{lang === 'en' ? 'Audit Status' : 'Auditoría'}</span>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 animate-ping' : 'bg-zinc-700'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gran Consola Central del Proveedor Seleccionado */}
          <div className="rounded-xl border border-zinc-800 bg-[#020205] p-5 sm:p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Consola Digital de Métricas */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm bg-gradient-to-r ${selectedProvider.marqueeColor}`} />
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-mono">
                      {selectedProvider.company.toUpperCase()} // {selectedProvider.model}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#FFE066] font-bold">
                    {lang === 'en' ? (selectedProvider.badgeEn || selectedProvider.badge) : selectedProvider.badge}
                  </span>
                </div>

                {/* Métricas Principales de Eficiencia y Costo */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      {lang === 'en' ? 'Input Cost (1M)' : 'Costo Entrada (1M)'}
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-[#FFE066]">
                      ${selectedProvider.inputCostPerM.toFixed(selectedProvider.inputCostPerM < 0.1 ? 3 : 2)} USD
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      ${(selectedProvider.inputCostPerM / 1_000_000).toFixed(8)} / tok
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      {lang === 'en' ? 'Output Cost (1M)' : 'Costo Salida (1M)'}
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                      ${selectedProvider.outputCostPerM.toFixed(2)} USD
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      ${(selectedProvider.outputCostPerM / 1_000_000).toFixed(8)} / tok
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      {lang === 'en' ? 'Max Context Window' : 'Ventana de Contexto'}
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-cyan-400">
                      {selectedProvider.contextTokens}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      {lang === 'en' ? 'Maximum Capacity' : 'Capacidad Máxima'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800/90 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                      {lang === 'en' ? 'Base Vocabulary' : 'Vocabulario Base'}
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-purple-400">
                      {selectedProvider.vocabSize.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">
                      {lang === 'en' ? 'Unique Tokens' : 'Tokens Únicos'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 font-mono text-xs text-zinc-300 flex items-start gap-2.5">
                  <Zap size={14} className="text-[#FFE066] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block mb-0.5">
                      {lang === 'en' ? 'Architecture & Operational Efficiency:' : 'Arquitectura & Eficiencia Operativa:'}
                    </span>
                    <span>
                      {lang === 'en' ? (selectedProvider.flavorEn || selectedProvider.flavor) : selectedProvider.flavor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Panel de Simulación Financiera */}
              <div className="lg:col-span-4 bg-[#0a0a12] p-5 rounded-xl border border-[#C5A059]/40 flex flex-col justify-between space-y-4 shadow-inner text-center">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block mb-1 font-bold">
                    {lang === 'en' ? 'FINANCIAL SIMULATOR // USAGE PER $1.00 USD' : 'SIMULADOR FINANCIERO // CONSUMO POR $1.00 USD'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-white flex items-center justify-center gap-1.5">
                    <DollarSign size={20} className="text-[#FFE066]" />
                    <span>${simulatedBudget}.00 USD</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 block mt-1">
                    {lang === 'en' ? (
                      <>Yields <strong className="text-emerald-400">{tokensWithCurrentBudget.toLocaleString()}</strong> input tokens processed with this model</>
                    ) : (
                      <>Equivale a <strong className="text-emerald-400">{tokensWithCurrentBudget.toLocaleString()}</strong> tokens de entrada procesados con este modelo</>
                    )}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleAddBudget}
                    disabled={isCalculating}
                    className="w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center gap-2 active:scale-95"
                  >
                    <DollarSign size={14} className="stroke-[2.5]" />
                    <span>
                      {isCalculating
                        ? (lang === 'en' ? 'Calculating...' : 'Calculando...')
                        : (lang === 'en' ? 'Simulate Budget (+1 USD)' : 'Simular Presupuesto (+1 USD)')}
                    </span>
                  </button>

                  <button
                    onClick={handleResetBudget}
                    className="w-full py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-[11px] rounded transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Reset Simulation' : 'Restablecer Simulación'}
                  </button>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-900 leading-tight">
                  {lang === 'en'
                    ? '// In enterprise AI architectures, every API call consumes processing tokens with direct operational budget impact.'
                    : '// En arquitectura de IA empresarial, cada llamada a API consume tokens de procesamiento medibles por presupuesto operativo.'}
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
                  <th className="py-2.5 px-3">{lang === 'en' ? 'Provider / Enterprise' : 'Empresa / Proveedor'}</th>
                  <th className="py-2.5 px-3">{lang === 'en' ? 'Model' : 'Modelo'}</th>
                  <th className="py-2.5 px-3 text-right">Input / 1M</th>
                  <th className="py-2.5 px-3 text-right">Output / 1M</th>
                  <th className="py-2.5 px-3 text-center">{lang === 'en' ? 'Context Window' : 'Ventana de Contexto'}</th>
                  <th className="py-2.5 px-3 text-center">{lang === 'en' ? 'Spanish Efficiency' : 'Eficiencia Español'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {PROVIDERS.map((c) => (
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
                    <td className="py-3 px-3 text-center text-zinc-400">
                      {lang === 'en' ? (c.spanishEfficiencyEn || c.spanishEfficiency) : c.spanishEfficiency}
                    </td>
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
