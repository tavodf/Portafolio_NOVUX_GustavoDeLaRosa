import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, Terminal, Play, RotateCcw, Copy, Check, Sparkles, 
  ArrowRight, ShieldAlert, Cpu, Layers, DollarSign, Gauge, CheckCircle2, Code2
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

// Simulador heurístico de BPE para comparar fragmentación en inglés vs español
function simulateBpeTokens(text: string, language: 'en' | 'es'): { tokens: string[]; count: number } {
  if (!text.trim()) return { tokens: [], count: 0 };

  // Palabras comunes y sus fragmentaciones típicas en tokenizadores de 32k-50k con sesgo en inglés
  const englishDict: Record<string, string[]> = {
    'understanding': ['understanding'],
    'computational': ['computational'],
    'intelligence': ['intelligence'],
    'tokenization': ['token', 'ization'],
    'architecture': ['architecture'],
    'engineering': ['engineering'],
    'contract': ['contract'],
    'processing': ['processing'],
  };

  const spanishDict: Record<string, string[]> = {
    'entendimiento': ['ent', 'endi', 'miento'],
    'computacional': ['comp', 'ut', 'acional'],
    'inteligencia': ['intel', 'igen', 'cia'],
    'tokenización': ['token', 'iz', 'ación'],
    'arquitectura': ['arqu', 'itect', 'ura'],
    'ingeniería': ['ingen', 'ier', 'ía'],
    'contrato': ['contr', 'ato'],
    'procesamiento': ['proc', 'esa', 'miento'],
  };

  const words = text.toLowerCase().split(/\s+/);
  const result: string[] = [];

  words.forEach(word => {
    const clean = word.replace(/[^a-záéíóúüñ]/gi, '');
    const dict = language === 'en' ? englishDict : spanishDict;

    if (dict[clean]) {
      result.push(...dict[clean]);
    } else {
      // Heurística BPE estándar: en inglés ~4 caracteres/token, en español ~2.2 caracteres/token
      const chunkLen = language === 'en' ? 4 : 2;
      for (let i = 0; i < clean.length; i += chunkLen) {
        result.push(clean.slice(i, i + chunkLen));
      }
      if (clean.length === 0 && word.length > 0) {
        result.push(word);
      }
    }
  });

  return { tokens: result, count: result.length };
}

export function NovuxEng002Interactive() {
  const [activeTab, setActiveTab] = useState<'auditor' | 'arcade' | 'code'>('auditor');

  // Textos para comparación de impuesto lingüístico
  const [englishText, setEnglishText] = useState('understanding the computational architecture of deep learning models');
  const [spanishText, setSpanishText] = useState('entendimiento de la arquitectura computacional de modelos de aprendizaje profundo');

  // Parámetros económicos del Arcade
  const [pricePerMillionInput, setPricePerMillionInput] = useState(2.50); // USD por 1M tokens
  const [pricePerMillionOutput, setPricePerMillionOutput] = useState(10.00);
  const [monthlyVolumeRequests, setMonthlyVolumeRequests] = useState(100000); // 100k requests/mes

  const [copiedCode, setCopiedCode] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditOutput, setAuditOutput] = useState<any | null>(null);

  // Tokenización simulada en tiempo real
  const enTokens = useMemo(() => simulateBpeTokens(englishText, 'en'), [englishText]);
  const esTokens = useMemo(() => simulateBpeTokens(spanishText, 'es'), [spanishText]);

  // Cálculos de asimetría económica
  const linguisticTaxMetrics = useMemo(() => {
    const ratioEn = englishText.length / Math.max(enTokens.count, 1);
    const ratioEs = spanishText.length / Math.max(esTokens.count, 1);
    const tokenDiffPercent = enTokens.count > 0 
      ? (((esTokens.count - enTokens.count) / enTokens.count) * 100) 
      : 0;

    const monthlyCostEn = ((enTokens.count * monthlyVolumeRequests) / 1000000) * pricePerMillionInput;
    const monthlyCostEs = ((esTokens.count * monthlyVolumeRequests) / 1000000) * pricePerMillionInput;
    const extraAnnualCost = (monthlyCostEs - monthlyCostEn) * 12;

    return {
      ratioEn: Number(ratioEn.toFixed(2)),
      ratioEs: Number(ratioEs.toFixed(2)),
      tokenDiffPercent: Math.round(tokenDiffPercent),
      monthlyCostEn: Number(monthlyCostEn.toFixed(2)),
      monthlyCostEs: Number(monthlyCostEs.toFixed(2)),
      extraAnnualCost: Math.max(0, Math.round(extraAnnualCost)),
    };
  }, [enTokens, esTokens, englishText, spanishText, monthlyVolumeRequests, pricePerMillionInput]);

  const handleClearAudit = () => {
    sfx.playBack();
    setAuditOutput(null);
    setIsAuditing(false);
  };

  const handleResetAuditorTexts = () => {
    sfx.playBack();
    setEnglishText('understanding the computational architecture of deep learning models');
    setSpanishText('entendimiento de la arquitectura computacional de modelos de aprendizaje profundo');
    setPricePerMillionInput(2.50);
    setPricePerMillionOutput(10.00);
    setMonthlyVolumeRequests(100000);
  };

  const handleRunPythonAuditor = () => {
    sfx.playSelect();
    setIsAuditing(true);
    setAuditOutput(null);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditOutput({
        status: 'AUDITED',
        contractVolume: monthlyVolumeRequests,
        english: {
          chars: englishText.length,
          tokens: enTokens.count,
          char_per_token_ratio: linguisticTaxMetrics.ratioEn,
          monthly_cost_usd: linguisticTaxMetrics.monthlyCostEn,
        },
        spanish: {
          chars: spanishText.length,
          tokens: esTokens.count,
          char_per_token_ratio: linguisticTaxMetrics.ratioEs,
          monthly_cost_usd: linguisticTaxMetrics.monthlyCostEs,
        },
        linguistic_tax_surcharge_percent: linguisticTaxMetrics.tokenDiffPercent,
        projected_annual_overpay_usd: linguisticTaxMetrics.extraAnnualCost,
        novux_recommendation: 'Recomendada migración a vocabulario multilingüe de 128k tokens o pre-procesamiento estructurado en JSON minificado para reducir sobrecosto en un 35%.'
      });
      sfx.playPowerUp();
    }, 450);
  };

  const handleCopyCode = () => {
    sfx.playClick();
    const rawCode = `from typing import Dict
import unicodedata

class ArcadeTokenAuditor:
    def __init__(self, price_per_million_input: float, price_per_million_output: float):
        self.price_input = price_per_million_input
        self.price_output = price_per_million_output

    @staticmethod
    def normalize_text(text: str) -> str:
        return unicodedata.normalize("NFKC", text).strip()

    def audit_payload(self, text: str, token_count: int, is_output: bool = False) -> Dict[str, float]:
        rate = self.price_output if is_output else self.price_input
        cost_usd = (token_count / 1_000_000) * rate
        chars = len(text)
        words = len(text.split())
        char_per_token = chars / max(token_count, 1)
        
        return {
            "token_count": token_count,
            "char_count": chars,
            "word_count": words,
            "char_per_token_ratio": round(char_per_token, 2),
            "estimated_cost_usd": round(cost_usd, 6)
        }`;
    navigator.clipboard.writeText(rawCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full my-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#07070d] shadow-[0_0_50px_rgba(197,160,89,0.18)] select-none">
      {/* Cabecera del Laboratorio Arcade */}
      <div className="bg-[#12121c] px-4 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Coins size={16} className="text-[#FFE066] animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider">
            LABORATORIO ARCADE // AUDITOR BPE & IMPUESTO LINGÜÍSTICO EN ESPAÑOL
          </span>
        </div>

        {/* Pestañas del Laboratorio */}
        <div className="flex items-center gap-1 bg-black/70 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('auditor');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'auditor'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gauge size={12} />
            <span>Auditor de Impuesto</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('arcade');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'arcade'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Coins size={12} />
            <span>La Tolva del Arcade</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('code');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 size={12} />
            <span>Script Python (Auditor)</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* PESTAÑA 1: AUDITOR DEL IMPUESTO LINGÜÍSTICO */}
        {activeTab === 'auditor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert size={15} className="text-[#C5A059]" />
                  <span>Comparativa de Fragmentación BPE: Asimetría Inglés vs Español</span>
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
                    Sobrecosto Estimado: <strong className="text-red-400">+{linguisticTaxMetrics.tokenDiffPercent}% Tokens</strong>
                  </span>
                  <button
                    onClick={handleResetAuditorTexts}
                    className="text-[11px] font-mono text-zinc-400 hover:text-[#FFE066] bg-zinc-900 hover:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-800 cursor-pointer flex items-center gap-1"
                    title="Restablecer textos al valor predeterminado"
                  >
                    <RotateCcw size={10} />
                    <span>Restablecer</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Edita los enunciados equivalentes. Observa cómo el algoritmo BPE parte la palabra en español en múltiples monedas (sub-piezas), mientras que en inglés conserva palabras completas en una sola ficha.
              </p>
            </div>

            {/* Inputs Comparativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Inglés */}
              <div className="space-y-2 p-3.5 rounded-lg bg-[#0a0a12] border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-400 font-bold">🇺🇸 ENTRADA EN INGLÉS (Base 1.0x):</span>
                  <span className="text-zinc-400 font-bold">{enTokens.count} Fichas (Tokens)</span>
                </div>
                <textarea
                  rows={2}
                  value={englishText}
                  onChange={(e) => setEnglishText(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-sky-500 rounded p-2.5 text-xs font-mono text-zinc-200 outline-none"
                />
                {/* Visualizador de Fichas de Arcade */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Tokens Forjados por el BPE:</span>
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded bg-black/60 border border-zinc-900">
                    {enTokens.tokens.map((tok, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-950/60 border border-sky-500/50 text-sky-200 shadow-sm"
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 text-right">
                    Ratio: {linguisticTaxMetrics.ratioEn} caracteres/ficha
                  </div>
                </div>
              </div>

              {/* Input Español */}
              <div className="space-y-2 p-3.5 rounded-lg bg-[#0a0a12] border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold">🇪🇸 ENTRADA EN ESPAÑOL (Impuesto Lingüístico):</span>
                  <span className="text-red-400 font-bold">{esTokens.count} Fichas (Tokens)</span>
                </div>
                <textarea
                  rows={2}
                  value={spanishText}
                  onChange={(e) => setSpanishText(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-amber-500 rounded p-2.5 text-xs font-mono text-zinc-200 outline-none"
                />
                {/* Visualizador de Fichas de Arcade */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Tokens Forjados por el BPE:</span>
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded bg-black/60 border border-zinc-900">
                    {esTokens.tokens.map((tok, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-950/60 border border-amber-500/50 text-amber-200 shadow-sm"
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 text-right">
                    Ratio: {linguisticTaxMetrics.ratioEs} caracteres/ficha
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de Facturación & P&L */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Sobrecosto por Tasa de Cambio
                </div>
                <div className="text-2xl font-mono font-bold text-red-400 mt-1">
                  +{linguisticTaxMetrics.tokenDiffPercent}%
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  Operaciones matriciales extra
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex justify-between">
                  <span>Factura Mensual (100k Req)</span>
                </div>
                <div className="text-xl font-mono font-bold text-zinc-200 mt-1 flex items-baseline gap-2">
                  <span className="text-emerald-400">${linguisticTaxMetrics.monthlyCostEn}</span>
                  <span className="text-zinc-500 text-xs">vs</span>
                  <span className="text-amber-400">${linguisticTaxMetrics.monthlyCostEs} USD</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  Mismo contenido semántico
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Fuga Financiera Anual
                </div>
                <div className="text-2xl font-mono font-bold text-[#FFE066] mt-0.5">
                  ${linguisticTaxMetrics.extraAnnualCost} USD
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Desperdicio evitable con sanitización
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PESTAÑA 2: LA TOLVA DEL ARCADE (CONTEXT WINDOW) */}
        {activeTab === 'arcade' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2 mb-1">
                <Coins size={15} className="text-[#C5A059]" />
                <span>La Tolva del Arcade: Capacidad Física de la Ventana de Contexto</span>
              </h4>
              <p className="text-xs text-zinc-400 font-sans">
                La máquina de Street Fighter tiene un depósito donde caen las fichas. En la inferencia LLM ocurre exactamente lo mismo: cada token ocupa una ranura en la memoria de atención cuadrática O(N²). Si la tolva se llena, la partida interrumpe su contexto.
              </p>
            </div>

            {/* Simulación Gráfica de la Tolva */}
            <div className="p-6 rounded-lg bg-[#050509] border border-[#C5A059]/40 relative overflow-hidden text-center space-y-4 shadow-inner">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-2">
                <span>// ESTADO DE LA TOLVA DE MONEDAS: 128,000 RANURAS MÁXIMAS</span>
                <span className="text-[#FFE066]">Ocupación Actual: {esTokens.count + enTokens.count} / 128,000 tokens</span>
              </div>

              {/* Tolva física simulada */}
              <div className="w-full max-w-md mx-auto h-40 border-2 border-dashed border-[#C5A059]/40 rounded-b-2xl bg-black/60 relative flex flex-col justify-end p-3 overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  ▼ RANURA MECÁNICA DE MONEDAS ▼
                </div>

                {/* Monedas cayendo */}
                <div className="flex flex-wrap justify-center gap-1.5 z-10">
                  {Array.from({ length: Math.min(esTokens.count + enTokens.count, 28) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.03, type: 'spring' }}
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#997328] via-[#FFE066] to-[#C5A059] border border-amber-300 shadow-md flex items-center justify-center text-[10px] font-mono font-bold text-black select-none"
                    >
                      $
                    </motion.div>
                  ))}
                </div>

                {/* Resplandor inferior */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#C5A059]/20 to-transparent pointer-events-none" />
              </div>

              <div className="max-w-lg mx-auto text-xs font-mono text-zinc-400">
                <span className="text-[#FFE066] font-bold">Lección de Negocio:</span> Quien llena la tolva con palabras vacías ("por favor", saludos, código HTML redundante) paga el costo de la partida sin jugar. Sanea el payload antes de insertar la moneda en la ranura.
              </div>
            </div>
          </motion.div>
        )}

        {/* PESTAÑA 3: EJECUTOR DEL SCRIPT PYTHON */}
        {activeTab === 'code' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2">
                  <Play size={13} className="text-[#C5A059] fill-current" />
                  <span>ArcadeTokenAuditor: Script de Auditoría Económica en Python</span>
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Calcula el costo real por tanda de fichas consumidas, ratio de caracteres por token y auditoría B2B.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {auditOutput && (
                  <button
                    onClick={handleClearAudit}
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#FFE066] border border-zinc-700 font-mono text-xs rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Limpiar dictamen y devolver proceso"
                  >
                    <RotateCcw size={12} />
                    <span>Limpiar Dictamen</span>
                  </button>
                )}

                <button
                  onClick={handleRunPythonAuditor}
                  disabled={isAuditing}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center gap-1.5 animate-pulse"
                >
                  <Play size={12} className="fill-current" />
                  <span>{isAuditing ? 'Auditoría en Curso...' : '▶ Ejecutar Auditoría'}</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-2 bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs rounded transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copiar código fuente"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Código Python con Syntax Highlighting */}
            <div className="bg-[#040407] rounded-lg border border-zinc-800 overflow-hidden shadow-2xl font-mono text-xs">
              <div className="bg-[#0d0d15] px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <Code2 size={12} />
                  arcade_token_auditor.py
                </span>
                <span className="text-zinc-600">// NOVUX Engine • Token Cost Auditor v1.0</span>
              </div>

              <div className="p-4 sm:p-5 overflow-x-auto text-[11.5px] leading-relaxed max-h-[320px] overflow-y-auto">
                <pre className="text-zinc-300">
                  <span className="text-[#c084fc]">from</span> <span className="text-[#38bdf8]">typing</span> <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">Dict</span>{'\n'}
                  <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">unicodedata</span>{'\n\n'}
                  <span className="text-[#c084fc]">class</span> <span className="text-[#38bdf8] font-bold">ArcadeTokenAuditor</span>:{'\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">__init__</span>(<span className="text-[#fb923c]">self</span>, price_per_million_input: <span className="text-[#38bdf8]">float</span>, price_per_million_output: <span className="text-[#38bdf8]">float</span>):{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>.price_input = price_per_million_input{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>.price_output = price_per_million_output{'\n\n'}
                  {'    '}<span className="text-[#f43f5e]">@staticmethod</span>{'\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">normalize_text</span>(text: <span className="text-[#38bdf8]">str</span>) -&gt; <span className="text-[#38bdf8]">str</span>:{'\n'}
                  {'        '}<span className="text-[#a1a1aa] italic">"""Sanea el texto eliminando caracteres invisibles y redundancias."""</span>{'\n'}
                  {'        '}<span className="text-[#c084fc]">return</span> unicodedata.<span className="text-[#FFE066]">normalize</span>(<span className="text-[#4ade80]">"NFKC"</span>, text).<span className="text-[#FFE066]">strip</span>(){'\n\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">audit_payload</span>(<span className="text-[#fb923c]">self</span>, text: <span className="text-[#38bdf8]">str</span>, token_count: <span className="text-[#38bdf8]">int</span>, is_output: <span className="text-[#38bdf8]">bool</span> = <span className="text-[#c084fc]">False</span>) -&gt; <span className="text-[#38bdf8]">Dict[str, float]</span>:{'\n'}
                  {'        '}<span className="text-[#a1a1aa] italic">"""Calcula el costo real por tanda de fichas consumidas."""</span>{'\n'}
                  {'        '}rate = <span className="text-[#fb923c]">self</span>.price_output <span className="text-[#c084fc]">if</span> is_output <span className="text-[#c084fc]">else</span> <span className="text-[#fb923c]">self</span>.price_input{'\n'}
                  {'        '}cost_usd = (token_count / <span className="text-[#f472b6]">1_000_000</span>) * rate{'\n'}
                  {'        '}chars = <span className="text-[#FFE066]">len</span>(text){'\n'}
                  {'        '}words = <span className="text-[#FFE066]">len</span>(text.<span className="text-[#FFE066]">split</span>()){'\n'}
                  {'        '}char_per_token = chars / <span className="text-[#FFE066]">max</span>(token_count, <span className="text-[#f472b6]">1</span>){'\n'}
                  {'        '}<span className="text-[#c084fc]">return</span> {'{'}{'\n'}
                  {'            '}<span className="text-[#4ade80]">"token_count"</span>: token_count,{'\n'}
                  {'            '}<span className="text-[#4ade80]">"char_count"</span>: chars,{'\n'}
                  {'            '}<span className="text-[#4ade80]">"word_count"</span>: words,{'\n'}
                  {'            '}<span className="text-[#4ade80]">"char_per_token_ratio"</span>: <span className="text-[#FFE066]">round</span>(char_per_token, <span className="text-[#f472b6]">2</span>),{'\n'}
                  {'            '}<span className="text-[#4ade80]">"estimated_cost_usd"</span>: <span className="text-[#FFE066]">round</span>(cost_usd, <span className="text-[#f472b6]">6</span>){'\n'}
                  {'        '}{'}'}
                </pre>
              </div>
            </div>

            {/* Resultado de la Auditoría */}
            {auditOutput && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-black/95 border border-[#C5A059]/50 font-mono text-xs shadow-2xl space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 size={14} />
                    <span>DICTAMEN DE AUDITORÍA ECONÓMICA COMPLETADO</span>
                  </div>
                  <span className="text-zinc-500 text-[11px]">
                    Volumen de Análisis: {auditOutput.contractVolume.toLocaleString()} consultas/mes
                  </span>
                </div>

                <div className="bg-[#090912] p-3 rounded border border-zinc-800/80 overflow-x-auto text-[11px]">
                  <pre className="text-zinc-300">
{JSON.stringify(auditOutput, null, 2)}
                  </pre>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">// Auditoría completada con éxito</span>
                  <button
                    onClick={handleClearAudit}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[#C5A059] hover:text-[#FFE066] border border-zinc-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={11} />
                    <span>Limpiar dictamen y devolver proceso</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
