import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, Network, Cpu, Filter, ShieldCheck, Database, 
  Coins, Terminal, Box, Zap, ArrowDown, Copy, Check, Eye, Code,
  Layers, Lock, Sparkles
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

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
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'ascii'>('visual');

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Identificar qué tipo de mapa conceptual es
  const isL7Scraping = rawContent.includes('Servidor Web Remoto') || rawContent.includes('Handshake TLS');
  const isTokenPhysics = rawContent.includes('vamos a las maquinitas') || rawContent.includes('Token IDs') || rawContent.includes('W_emb');
  const isArcadeEconomics = rawContent.includes('Presupuesto en Efectivo') || rawContent.includes('Taquilla / Caja') || rawContent.includes('Ficha Ranurada');

  let title = 'MAPA CONCEPTUAL // FLUJO DETERMINISTA';
  let subtitle = 'Arquitectura lógica del flujo de datos';
  let steps: FlowStep[] = [];

  if (isL7Scraping) {
    title = 'MAPA CONCEPTUAL // TOPOLOGÍA DE INGESTA L7';
    subtitle = 'Ciclo determinista de vida del dato desde TCP hasta modelo de persistencia';
    steps = [
      {
        title: 'Servidor Web Remoto',
        subtitle: 'Origen del hipertexto público (Host externo)',
        icon: Server,
        transitBadge: 'Payload en Tránsito: Bytes TCP/IP — Capas L3/L4',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: 'Socket / Cliente HTTP (Handshake TLS)',
        subtitle: 'Terminación de cifrado & buffer de red local',
        icon: Lock,
        transitBadge: 'Buffer de Memoria: Stream crudo de bytes / UTF-8',
        accentColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/40',
      },
      {
        title: 'Parser Sintáctico (libxml2 / C)',
        subtitle: 'Árbol DOM contiguo en memoria nativa de bajo overhead',
        icon: Cpu,
        transitBadge: 'DOM en RAM: Jerarquía de Nodos y Punteros',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: 'Proyección Semántica (XPath / CSS Selectors)',
        subtitle: 'Extracción focalizada sin renderizar capas gráficas',
        icon: Filter,
        transitBadge: 'Deduplicación & Hash: MinHash / LSH',
        accentColor: 'text-purple-400',
        borderColor: 'border-purple-500/40',
      },
      {
        title: 'Validación Canónica (Pydantic / Tipado Estricto)',
        subtitle: 'Esquema tipado con validación y normalización matemática',
        icon: ShieldCheck,
        transitBadge: 'Serialización y Batch Ingest',
        accentColor: 'text-cyan-400',
        borderColor: 'border-cyan-500/40',
      },
      {
        title: 'Persistencia & Model Training',
        subtitle: 'Tablas SQL / Formato Parquet / Alimentación de LLMs',
        icon: Database,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else if (isTokenPhysics) {
    title = 'MAPA CONCEPTUAL // LA FÍSICA DEL TOKEN';
    subtitle = 'Deconstrucción desde lenguaje humano hasta cálculo matricial en GPU';
    steps = [
      {
        title: 'Texto Humano: "vamos a las maquinitas"',
        subtitle: 'Cadena arbitraria de caracteres sin estructura numérica',
        icon: Terminal,
        transitBadge: 'Caja de Cambio: Algoritmo BPE sobre bytes UTF-8',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: 'Secuencia de Fichas Discretas: Token IDs',
        subtitle: 'Llaves enteras discretas: [ 8932, 257, 1340, 48219 ]',
        icon: Coins,
        transitBadge: 'Lookup en Matriz de Entrada: W_emb ∈ R^(V x d)',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: 'Espacio Latente: Embeddings Continuos',
        subtitle: 'Vectores densos de 4.096 flotantes (similitud coseno)',
        icon: Box,
        transitBadge: 'Mapeo hacia capas de atención Q, K, V',
        accentColor: 'text-purple-400',
        borderColor: 'border-purple-500/40',
      },
      {
        title: 'Mecanismo de Atención Transformer',
        subtitle: 'Cómputo matricial masivo O(N²) en clusters de GPU',
        icon: Zap,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else if (isArcadeEconomics) {
    title = 'MAPA CONCEPTUAL // MODELO MENTAL DEL ARCADE NOVENTERO';
    subtitle = 'Analogía económica de la taquilla, las fichas y la tolva de contexto';
    steps = [
      {
        title: 'Cliente: Presupuesto en Efectivo',
        subtitle: 'Fondos de la empresa para consumo de inteligencia artificial',
        icon: Terminal,
        transitBadge: 'Compra fichas según tasa de cambio en taquilla',
        accentColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/40',
      },
      {
        title: 'Taquilla / Caja de Cambio',
        subtitle: 'Convierte moneda corriente en fichas con ranuras específicas',
        icon: Box,
        transitBadge: 'Cada ficha compra un ciclo exacto de juego',
        accentColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
      },
      {
        title: 'La Ficha Ranurada (Token ID)',
        subtitle: 'Unidad atómica calibrada que entra en la ranura de la máquina',
        icon: Coins,
        transitBadge: 'Almacenamiento dentro del depósito interno',
        accentColor: 'text-sky-400',
        borderColor: 'border-sky-500/40',
      },
      {
        title: 'La Tolva / Depósito (Context Window)',
        subtitle: 'Límite físico máximo de monedas admisibles antes del Out-of-Context',
        icon: Layers,
        accentColor: 'text-[#FFE066]',
        borderColor: 'border-[#C5A059]',
      },
    ];
  } else {
    // Si no coincide con ninguno específico, extraer líneas entre corchetes
    const lines = rawContent.split('\n').filter(l => l.trim().length > 0);
    const extractedNodes = lines.filter(l => l.includes('[') && l.includes(']'));
    
    steps = extractedNodes.map((line, idx) => {
      const clean = line.replace(/[\[\]]/g, '').trim();
      return {
        title: clean,
        icon: Layers,
        transitBadge: idx < extractedNodes.length - 1 ? 'Transición de estado determinista' : undefined,
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
              <span>Vista Gráfica</span>
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
              <span>Terminal ASCII</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-zinc-400 hover:text-white px-2 py-1 rounded bg-black/60 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer text-xs font-mono"
            title="Copiar contenido"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <div className="p-5 sm:p-7 space-y-3 bg-[#030307] relative overflow-hidden">
          {/* Sutil halo de fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 blur-3xl rounded-full pointer-events-none" />

          <div className="text-xs font-mono text-zinc-400 mb-4">
            // {subtitle}
          </div>

          <div className="relative space-y-4 max-w-2xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  {/* Tarjeta de Nodo del Flujo */}
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
                          PASO 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-[#FFE066]">
                          ESTADO DETERMINISTA
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

                  {/* Conector Flecha hacia el siguiente paso */}
                  {idx < steps.length - 1 && (
                    <div className="py-2 flex flex-col items-center justify-center relative my-0.5">
                      {/* Línea vertical */}
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
        /* VISTA TERMINAL ASCII FORMATO ORIGINAL PRESERVADO */
        <div className="p-4 sm:p-5 bg-[#020205] overflow-x-auto">
          <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#FFE066] selection:bg-[#C5A059]/30">
            <code>{rawContent}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
