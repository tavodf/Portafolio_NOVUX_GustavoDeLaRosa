import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, Cpu, Filter, ShieldCheck, Database, 
  Coins, Terminal, Box, Zap, ArrowDown, Copy, Check, Eye, Code,
  Layers, Lock, Sparkles
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

interface FlowStep {
  title: string;
  subtitle?: string;
  note?: string;
  icon: any;
  transitBadge?: string;
  accentColor: string;
  borderColor: string;
}

interface ConceptualFlowDiagramProps {
  rawContent: string;
}

export function ConceptualFlowDiagram({ rawContent }: ConceptualFlowDiagramProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'ascii'>('visual');

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Identificar qué tipo de mapa conceptual es
  const isL7Scraping = rawContent.includes('Servidor Web Remoto') || rawContent.includes('Remote Web Server') || rawContent.includes('Handshake TLS');
  const isTokenPhysics = rawContent.includes('procesamiento de lenguaje natural') || rawContent.includes('natural language processing') || rawContent.includes('Token IDs') || rawContent.includes('W_emb');
  const isTokenEconomics = rawContent.includes('Presupuesto') || rawContent.includes('Budget') || rawContent.includes('Tokenizador') || rawContent.includes('Tokenizer') || rawContent.includes('Token de Inferencia') || rawContent.includes('Inference Token');

  let title = lang === 'en' ? 'CONCEPTUAL MAP // DETERMINISTIC FLOW' : 'MAPA CONCEPTUAL // FLUJO DETERMINISTA';
  let subtitle = lang === 'en' ? 'Logical data flow architecture' : 'Arquitectura lógica del flujo de datos';
  let steps: FlowStep[] = [];

  if (isL7Scraping) {
    title = lang === 'en' ? 'CONCEPTUAL MAP // L7 INGESTION TOPOLOGY' : 'MAPA CONCEPTUAL // TOPOLOGÍA DE INGESTA L7';
    subtitle = lang === 'en'
      ? 'Deterministic data lifecycle from TCP socket to persistence model'
      : 'Ciclo determinista de vida del dato desde TCP hasta modelo de persistencia';
    steps = [
      {
        title: lang === 'en' ? 'Remote Web Server' : 'Servidor Web Remoto',
        subtitle: lang === 'en' ? 'Public hypertext source (External Host)' : 'Origen del hipertexto público (Host externo)',
        icon: Server,
        transitBadge: lang === 'en' ? 'In-Transit Payload: TCP/IP Bytes — OSI Layers L3/L4' : 'Payload en Tránsito: Bytes TCP/IP — Capas L3/L4',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: lang === 'en' ? 'Socket / HTTP Client (TLS Handshake)' : 'Socket / Cliente HTTP (Handshake TLS)',
        subtitle: lang === 'en' ? 'Encryption termination & local network buffer' : 'Terminación de cifrado & buffer de red local',
        icon: Lock,
        transitBadge: lang === 'en' ? 'Memory Buffer: Raw UTF-8 Byte Stream' : 'Buffer de Memoria: Stream crudo de bytes / UTF-8',
        accentColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/40',
      },
      {
        title: lang === 'en' ? 'Syntactic Parser (libxml2 / C)' : 'Parser Sintáctico (libxml2 / C)',
        subtitle: lang === 'en' ? 'Contiguous low-overhead native memory DOM tree' : 'Árbol DOM contiguo en memoria nativa de bajo overhead',
        icon: Cpu,
        transitBadge: lang === 'en' ? 'In-RAM DOM: Node & Pointer Hierarchy' : 'DOM en RAM: Jerarquía de Nodos y Punteros',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: lang === 'en' ? 'Semantic Projection (XPath / CSS Selectors)' : 'Proyección Semántica (XPath / CSS Selectors)',
        subtitle: lang === 'en' ? 'Targeted extraction without rendering visual layers' : 'Extracción focalizada sin renderizar capas gráficas',
        icon: Filter,
        transitBadge: lang === 'en' ? 'Deduplication & Hashing: MinHash / LSH' : 'Deduplicación & Hash: MinHash / LSH',
        accentColor: 'text-purple-400',
        borderColor: 'border-purple-500/40',
      },
      {
        title: lang === 'en' ? 'Canonical Validation (Pydantic / Strict Typing)' : 'Validación Canónica (Pydantic / Tipado Estricto)',
        subtitle: lang === 'en' ? 'Typed schema with mathematical validation & normalization' : 'Esquema tipado con validación y normalización matemática',
        icon: ShieldCheck,
        transitBadge: lang === 'en' ? 'Serialization & Batch Ingest' : 'Serialización y Batch Ingest',
        accentColor: 'text-cyan-400',
        borderColor: 'border-cyan-500/40',
      },
      {
        title: lang === 'en' ? 'Persistence & Model Training' : 'Persistencia & Model Training',
        subtitle: lang === 'en' ? 'SQL Tables / Parquet Format / LLM Ingestion' : 'Tablas SQL / Formato Parquet / Alimentación de LLMs',
        icon: Database,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else if (isTokenPhysics) {
    title = lang === 'en' ? 'CONCEPTUAL MAP // TOKEN PHYSICS' : 'MAPA CONCEPTUAL // LA FÍSICA DEL TOKEN';
    subtitle = lang === 'en'
      ? 'Deconstruction from human language to GPU matrix computation'
      : 'Deconstrucción desde lenguaje humano hasta cálculo matricial en GPU';
    steps = [
      {
        title: lang === 'en' ? 'Human Text: "natural language processing"' : 'Texto Humano: "procesamiento de lenguaje natural"',
        subtitle: lang === 'en' ? 'Arbitrary character string without numerical structure' : 'Cadena arbitraria de caracteres sin estructura numérica',
        icon: Terminal,
        transitBadge: lang === 'en' ? 'Encoding Engine: BPE Algorithm over UTF-8 Bytes' : 'Codificador: Algoritmo BPE sobre bytes UTF-8',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: lang === 'en' ? 'Discrete Unit Sequence: Token IDs' : 'Secuencia de Unidades Discretas: Token IDs',
        subtitle: lang === 'en' ? 'Discrete integer keys: [ 8932, 257, 1340, 48219 ]' : 'Llaves enteras discretas: [ 8932, 257, 1340, 48219 ]',
        icon: Coins,
        transitBadge: lang === 'en' ? 'Input Matrix Lookup: W_emb ∈ R^(V x d)' : 'Lookup en Matriz de Entrada: W_emb ∈ R^(V x d)',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: lang === 'en' ? 'Latent Space: Continuous Embeddings' : 'Espacio Latente: Embeddings Continuos',
        subtitle: lang === 'en' ? 'Dense 4,096-float vectors (cosine similarity)' : 'Vectores densos de 4.096 flotantes (similitud coseno)',
        icon: Box,
        transitBadge: lang === 'en' ? 'Projection into Q, K, V Attention Layers' : 'Mapeo hacia capas de atención Q, K, V',
        accentColor: 'text-purple-400',
        borderColor: 'border-purple-500/40',
      },
      {
        title: lang === 'en' ? 'Transformer Attention Mechanism' : 'Mecanismo de Atención Transformer',
        subtitle: lang === 'en' ? 'Massive O(N²) matrix computation across GPU clusters' : 'Cómputo matricial masivo O(N²) en clusters de GPU',
        icon: Zap,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else if (isTokenEconomics) {
    title = lang === 'en' ? 'CONCEPTUAL MAP // ENTERPRISE AI TOKENOMICS' : 'MAPA CONCEPTUAL // ECONOMÍA DEL TOKEN EN IA EMPRESARIAL';
    subtitle = lang === 'en'
      ? 'Budget conversion, BPE segmentation, and context window buffer'
      : 'Conversión presupuestal, segmentación BPE y buffer de ventana de contexto';
    steps = [
      {
        title: lang === 'en' ? 'Enterprise: Operational Budget (USD / COP)' : 'Cliente: Presupuesto Operativo (USD / COP)',
        subtitle: lang === 'en' ? 'Corporate capital allocated for AI API consumption' : 'Fondos de la empresa para consumo de inteligencia artificial',
        icon: Terminal,
        transitBadge: lang === 'en' ? 'Atomic segmentation per BPE vocabulary dictionary' : 'Segmentación atómica según diccionario de vocabulario BPE',
        accentColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/40',
      },
      {
        title: lang === 'en' ? 'BPE Tokenizer Engine' : 'Motor Tokenizador BPE',
        subtitle: lang === 'en' ? 'Converts human text into discrete Token ID sequences' : 'Convierte texto humano en secuencia de Token IDs discretos',
        icon: Box,
        transitBadge: lang === 'en' ? 'Each token consumes compute and API budget' : 'Cada token consume cómputo y presupuesto API',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: lang === 'en' ? 'The Inference Token (Atomic Unit)' : 'El Token de Inferencia (Unidad Atómica)',
        subtitle: lang === 'en' ? 'Atomic unit consuming GPU attention cycles' : 'Unidad atómica que consume ciclos de atención en la GPU',
        icon: Coins,
        transitBadge: lang === 'en' ? 'Allocation in active O(N²) attention memory' : 'Asignación en memoria activa de atención O(N²)',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: lang === 'en' ? 'Context Window Buffer' : 'Ventana de Contexto (Context Window)',
        subtitle: lang === 'en' ? 'Physical ceiling of processable tokens before memory saturation' : 'Límite físico máximo de tokens procesables antes de saturar memoria',
        icon: Layers,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else {
    const lines = rawContent.split('\n').filter(l => l.trim().length > 0);
    const extractedNodes = lines.filter(l => l.includes('[') && l.includes(']'));
    
    steps = extractedNodes.map((line, idx) => {
      const clean = line.replace(/[\[\]]/g, '').trim();
      return {
        title: clean,
        icon: Layers,
        transitBadge: idx < extractedNodes.length - 1
          ? (lang === 'en' ? 'Deterministic state transition' : 'Transición de estado determinista')
          : undefined,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]/40',
      };
    });
  }

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#06060c] shadow-[0_0_40px_rgba(197,160,89,0.18)] select-none">
      {/* Barra Superior del Diagrama */}
      <div className="bg-[#0f0f18] px-4 py-3 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#FFE066] animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Vista: Visual vs ASCII */}
          <div className="flex items-center gap-1 bg-black/70 p-1 rounded border border-zinc-800 text-[11px] font-mono">
            <button
              onClick={() => {
                sfx.playClick();
                setViewMode('visual');
              }}
              className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'visual'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye size={11} />
              <span>{lang === 'en' ? 'Visual View' : 'Vista Gráfica'}</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                setViewMode('ascii');
              }}
              className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'ascii'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code size={11} />
              <span>{lang === 'en' ? 'ASCII Terminal' : 'Terminal ASCII'}</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-zinc-400 hover:text-white px-2 py-1 rounded bg-black/60 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer text-xs font-mono"
            title={lang === 'en' ? 'Copy content' : 'Copiar contenido'}
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? (lang === 'en' ? 'Copied' : 'Copiado') : (lang === 'en' ? 'Copy' : 'Copiar')}</span>
          </button>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <div className="p-5 sm:p-7 space-y-3 bg-[#030307] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 blur-3xl rounded-full pointer-events-none" />

          <div className="text-xs font-mono text-zinc-400 mb-4">
            // {subtitle}
          </div>

          <div className="relative space-y-4 max-w-2xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`p-4 rounded-lg bg-[#0a0a14] border ${step.borderColor} shadow-lg relative z-10 flex items-start gap-3.5 hover:bg-[#10101f] transition-colors`}
                  >
                    <div className="p-2.5 rounded-md bg-black/80 border border-zinc-800 shrink-0 mt-0.5">
                      <Icon size={18} className={step.accentColor} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                          {lang === 'en' ? `STEP 0${idx + 1}` : `PASO 0${idx + 1}`}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-[#FFE066]">
                          {lang === 'en' ? 'DETERMINISTIC STATE' : 'ESTADO DETERMINISTA'}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold font-mono text-white leading-snug">
                        {step.title}
                      </h4>

                      {step.subtitle && (
                        <p className="text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
                          {step.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {idx < steps.length - 1 && (
                    <div className="py-2 flex flex-col items-center justify-center relative my-0.5">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-[#C5A059]/80 to-[#C5A059]/30" />
                      
                      {step.transitBadge && (
                        <div className="my-1 px-3 py-1 rounded-full bg-[#121220] border border-[#C5A059]/40 text-[#FFE066] text-[10.5px] font-mono shadow-md flex items-center gap-1.5 z-20">
                          <ArrowDown size={11} className="text-[#C5A059] animate-bounce" />
                          <span>{step.transitBadge}</span>
                        </div>
                      )}

                      {!step.transitBadge && (
                        <ArrowDown size={14} className="text-[#C5A059]" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 bg-[#020205] overflow-x-auto">
          <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#FFE066] selection:bg-[#C5A059]/30">
            <code>{rawContent}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
