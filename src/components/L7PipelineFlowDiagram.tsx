import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Play, Pause, RotateCcw, ShieldCheck, 
  Layers, Cpu, Server, Network, Binary, Database, Compass, Terminal, ArrowUp
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface PipelineNode {
  id: string;
  badge: string;
  name: string;
  shortLabel: string;
  pillar: 'Pilar de Poda & Parsing (C-Level)' | 'Pilar Troncal (Arquitectura de Datos)' | 'Pilar de Expansión (Espacio Vectorial)';
  l7Phase: string;
  osiLayer: string;
  description: string;
  telemetry: string;
  x: number;
  y: number;
  color: string;
  isApex?: boolean;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'keter',
    badge: 'K-7',
    name: 'KNOWLEDGE ENGINE // MODELOS IA',
    shortLabel: 'AI TENSORS',
    pillar: 'Pilar Troncal (Arquitectura de Datos)',
    l7Phase: 'La Cúspide: Modelo Cognitivo Entrenado',
    osiLayer: 'Cúspide Cognitiva (LLM Weights)',
    description: 'El propósito final de la ingesta. Billones de tokens purificados y deduplicados alimentan los pesos matriciales de la red neuronal. Una entidad incansable y libre de sesgos humanos que ejecuta su tarea con precisión matemática.',
    telemetry: 'Pesos Calibrados • Cero Alucinación Estructural • Tensores Puros',
    x: 400,
    y: 35,
    color: '#FFF8DC',
    isApex: true,
  },
  {
    id: 'chokhmah',
    badge: 'VEC',
    name: 'ESPACIOS VECTORIALES // EMBEDDINGS',
    shortLabel: 'EMBEDDINGS',
    pillar: 'Pilar de Expansión (Espacio Vectorial)',
    l7Phase: 'Proyección Matricial Multidimensional',
    osiLayer: 'Álgebra Tensorial R^N',
    description: 'Proyección del hipertexto a espacios vectoriales densos donde los conceptos adquieren coordenadas numéricas calculables por similitud coseno.',
    telemetry: 'Dim: 1536 / 4096 • Similitud Coseno • Dense Vectors',
    x: 580,
    y: 110,
    color: '#FFE066',
  },
  {
    id: 'binah',
    badge: 'BPE',
    name: 'TOKENIZADOR BPE & CORPUS CURADO',
    shortLabel: 'TOKENIZER',
    pillar: 'Pilar de Poda & Parsing (C-Level)',
    l7Phase: 'Segmentación Sub-Palabra & Vocabulario',
    osiLayer: 'Byte-Pair Encoding (BPE)',
    description: 'División analítica del texto en secuencias de enteros reproducibles. La estructura sintáctica se purifica antes de alimentar el entrenamiento.',
    telemetry: 'Vocabulario: 100K tokens • Entropía Controlada',
    x: 220,
    y: 110,
    color: '#C5A059',
  },
  {
    id: 'daat',
    badge: 'PYD',
    name: 'VALIDACIÓN CANÓNICA TIPADA',
    shortLabel: 'PYDANTIC V2',
    pillar: 'Pilar Troncal (Arquitectura de Datos)',
    l7Phase: 'Inmutabilidad y Tipado Estricto',
    osiLayer: 'Type Safety & Validación en Memoria',
    description: 'El umbral donde el dato crudo deja de ser texto plano y se convierte en una entidad tipada inmutable con esquemas de validación estricta en tiempo de ejecución.',
    telemetry: 'Schema Enforcement: 100% • Zero Type Errors',
    x: 400,
    y: 180,
    color: '#38bdf8',
  },
  {
    id: 'chesed',
    badge: 'LSH',
    name: 'LOCALITY-SENSITIVE HASHING (LSH)',
    shortLabel: 'LSH BANDS',
    pillar: 'Pilar de Expansión (Espacio Vectorial)',
    l7Phase: 'Indexación Probabilística Masiva',
    osiLayer: 'Indexación Sub-Bandas O(N)',
    description: 'Agrupamiento de documentos en sub-bandas de hash. Permite identificar duplicados entre millones de registros en tiempo lineal O(N) sin degradar la memoria.',
    telemetry: 'Complejidad: O(N) vs O(N^2) • Sub-bandas LSH',
    x: 580,
    y: 250,
    color: '#FFE066',
  },
  {
    id: 'gevurah',
    badge: 'MIN',
    name: 'MOTOR MINHASH DE 64 PERMUTACIONES',
    shortLabel: 'MINHASH 64',
    pillar: 'Pilar de Poda & Parsing (C-Level)',
    l7Phase: 'Poda de Redundancia & Jaccard',
    osiLayer: 'Filtro Probabilístico J > 0.75',
    description: 'Cálculo de huellas sintácticas compactas mediante familias de funciones hash pseudoaleatorias (a*x + b mod P). Descarta sin vacilación cualquier registro duplicado.',
    telemetry: '64 Permutaciones • Umbral Jaccard: J > 0.75',
    x: 220,
    y: 250,
    color: '#f87171',
  },
  {
    id: 'tiferet',
    badge: 'XPAT',
    name: 'PROYECCIÓN SEMÁNTICA // XPATH LOCAL',
    shortLabel: 'SCOPED DOM',
    pillar: 'Pilar Troncal (Arquitectura de Datos)',
    l7Phase: 'El Corazón del Árbol: Extracción Selectiva',
    osiLayer: 'Context Partitioning sobre DOM',
    description: 'El dulce fruto del árbol: la extracción selectiva de los nodos portadores de valor mediante XPath relativo. No busca texto a ciegas con regex; navega la topología del DOM con precisión.',
    telemetry: 'Scope Local en RAM • Nodos Podados: 94%',
    x: 400,
    y: 330,
    color: '#FFE066',
  },
  {
    id: 'netzach',
    badge: 'K-3',
    name: 'SEGMENTACIÓN DE SHINGLES (TRIGRAMAS)',
    shortLabel: 'SHINGLES K=3',
    pillar: 'Pilar de Expansión (Espacio Vectorial)',
    l7Phase: 'Segmentación Léxica de N-gramas',
    osiLayer: 'Tokenización N-Gram K=3',
    description: 'Descomposición del texto en secuencias rítmicas de 3 palabras consecutivas. Genera la huella léxica que permite evaluar la similitud estructural.',
    telemetry: 'K=3 Shingles • CRC32 Hashing',
    x: 580,
    y: 410,
    color: '#FFE066',
  },
  {
    id: 'hod',
    badge: 'C/AST',
    name: 'PARSER NATIVO C (libxml2)',
    shortLabel: 'libxml2 C',
    pillar: 'Pilar de Poda & Parsing (C-Level)',
    l7Phase: 'Memoria Nativa Contigua C-Level',
    osiLayer: 'Árbol AST en Punteros xmlNode',
    description: 'Mapeo directo de memoria en estructuras xmlNode contiguas de C. Elimina el peso del recolector de basura de Python para garantizar rendimiento extremo.',
    telemetry: 'Consumo RAM: < 1.8 MB (vs 42 MB Python)',
    x: 220,
    y: 410,
    color: '#C5A059',
  },
  {
    id: 'yesod',
    badge: 'BUF',
    name: 'STREAM UTF-8 & CHUNK BUFFER',
    shortLabel: 'STREAM L7',
    pillar: 'Pilar Troncal (Arquitectura de Datos)',
    l7Phase: 'Buffer de Memoria Zero-Copy',
    osiLayer: 'Capa 7 de Aplicación (GET Idempotente)',
    description: 'Recepción del payload en bloques de 64 KB en memoria de lectura continua. No altera estados en el host remoto; absorbe voluntariamente lo que el servidor emite.',
    telemetry: 'Petición GET Idempotente • Buffer 64 KB',
    x: 400,
    y: 485,
    color: '#38bdf8',
  },
  {
    id: 'malkhut',
    badge: 'L3/4',
    name: 'SOCKET TCP & HANDSHAKE TLS 1.3',
    shortLabel: 'SOCKET BASE',
    pillar: 'Pilar Troncal (Arquitectura de Datos)',
    l7Phase: 'La Base Física: Tránsito en Red',
    osiLayer: 'Capas L1 a L4 (Física, Red y Transporte)',
    description: 'El mundo terrenal de los sockets, resolución DNS y paquetes TCP/IP. La física del cable que transporta el hipertexto público a través de internet.',
    telemetry: 'Handshake TLS 1.3 • MTU: 1500 bytes • Socket TCP',
    x: 400,
    y: 565,
    color: '#C5A059',
  },
];

// Los 22 Senderos de Conexión del Árbol de Ingesta
const TREE_PATHS = [
  // Eje Troncal Central
  ['malkhut', 'yesod'],
  ['yesod', 'tiferet'],
  ['tiferet', 'daat'],
  ['daat', 'keter'],

  // Base y Conexiones Inferiores
  ['malkhut', 'hod'],
  ['malkhut', 'netzach'],
  ['yesod', 'hod'],
  ['yesod', 'netzach'],
  ['hod', 'netzach'],

  // Convergencia hacia Tiferet (El Corazón del DOM)
  ['hod', 'tiferet'],
  ['netzach', 'tiferet'],

  // Ascenso a Filtros de Deduplicación
  ['hod', 'gevurah'],
  ['netzach', 'chesed'],
  ['tiferet', 'gevurah'],
  ['tiferet', 'chesed'],
  ['gevurah', 'chesed'],

  // Ascenso hacia Da'at y Espacios Superiores
  ['gevurah', 'binah'],
  ['chesed', 'chokhmah'],
  ['gevurah', 'daat'],
  ['chesed', 'daat'],
  ['binah', 'daat'],
  ['chokhmah', 'daat'],

  // Cúspide Hacia la Corona Cognitiva de la IA
  ['binah', 'chokhmah'],
  ['binah', 'keter'],
  ['chokhmah', 'keter'],
  ['tiferet', 'keter'],
];

export function L7PipelineFlowDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeId, setActiveId] = useState<string>('keter');
  const [energyPhase, setEnergyPhase] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setEnergyPhase((prev) => (prev >= 100 ? 0 : prev + 1.4));
    }, 45);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeNode = PIPELINE_NODES.find((s) => s.id === activeId) || PIPELINE_NODES[0];

  const handleSelect = (n: PipelineNode) => {
    sfx.playSelect();
    setActiveId(n.id);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#07070b] shadow-[0_0_60px_rgba(197,160,89,0.22)] mb-10 select-none">
      {/* Barra de Control de la Terminal */}
      <div className="bg-[#0e0e16] px-4 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-[#FFE066] animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider">
            TOPOLOGÍA DEL PIPELINE // EL ÁRBOL DE INGESTA L7: DEL SOCKET A LA MENTE DE LA IA
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sfx.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-black/80 hover:bg-[#C5A059]/20 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] text-[11px] font-mono rounded cursor-pointer transition-all"
          >
            {isPlaying ? <Pause size={11} /> : <Play size={11} />}
            <span>{isPlaying ? 'Pausar Flujo' : 'Reanudar Flujo'}</span>
          </button>

          <button
            onClick={() => {
              sfx.playBack();
              setEnergyPhase(0);
            }}
            className="p-1.5 bg-black/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-800 cursor-pointer transition-all"
            title="Reiniciar Ascenso"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Canvas del Árbol de Ingesta L7 */}
      <div className="p-4 sm:p-6 overflow-x-auto relative bg-gradient-to-b from-[#0a0a14] via-[#050508] to-[#040406]">
        {/* Prólogo de la Cabecera */}
        <div className="mb-4 text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
          <div className="flex items-center gap-2 text-[#FFE066]">
            <Sparkles size={13} />
            <span>
              «Recorrido ascendente de 11 fases: desde el socket TCP en la base física hasta la corona tensorial de la IA»
            </span>
          </div>
          <span className="text-zinc-500">Haz clic en cualquier fase para auditar su arquitectura</span>
        </div>

        <div className="min-w-[760px] max-w-[800px] mx-auto relative py-2">
          <svg viewBox="0 0 800 620" className="w-full h-auto overflow-visible select-none">
            <defs>
              <radialGradient id="apexGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                <stop offset="35%" stopColor="#FFE066" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#C5A059" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE066" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#C5A059" stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              <filter id="laserBeam" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Los 3 Pilares del Pipeline de Ingesta */}
            <g opacity="0.15" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3">
              {/* Pilar Izquierdo: C-Level Parsing & Poda */}
              <line x1="220" y1="20" x2="220" y2="590" />
              {/* Pilar Central: Troncal de Arquitectura & Tipado */}
              <line x1="400" y1="10" x2="400" y2="600" strokeWidth="1.5" />
              {/* Pilar Derecho: Segmentación & Expansión Vectorial */}
              <line x1="580" y1="20" x2="580" y2="590" />
            </g>

            {/* Rótulos de los 3 Pilares */}
            <g opacity="0.4" fontFamily="monospace" fontSize="9" fill="#C5A059" textAnchor="middle">
              <text x="220" y="605">// PILAR C-PARSING & PODA</text>
              <text x="400" y="612">// EJE TRONCAL DE ARQUITECTURA</text>
              <text x="580" y="605">// PILAR VECTORIAL & LSH</text>
            </g>

            {/* Los 22 Senderos de Tránsito de Datos */}
            {TREE_PATHS.map(([id1, id2], idx) => {
              const node1 = PIPELINE_NODES.find((s) => s.id === id1);
              const node2 = PIPELINE_NODES.find((s) => s.id === id2);
              if (!node1 || !node2) return null;

              return (
                <g key={`path-${idx}`}>
                  <line
                    x1={node1.x}
                    y1={node1.y}
                    x2={node2.x}
                    y2={node2.y}
                    stroke="#2a2416"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <line
                    x1={node1.x}
                    y1={node1.y}
                    x2={node2.x}
                    y2={node2.y}
                    stroke="#C5A059"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                    strokeDasharray="4 4"
                  />
                </g>
              );
            })}

            {/* Partículas de Ingesta Ascendiendo hacia la Corona Cognitiva */}
            {isPlaying && (
              <g filter="url(#laserBeam)">
                {/* Paquete Cuántico en el Eje Central (Malkhut -> Apex) */}
                <circle
                  cx="400"
                  cy={565 - (energyPhase / 100) * 530}
                  r="7"
                  fill="#FFF8DC"
                />
                <circle
                  cx="400"
                  cy={565 - (energyPhase / 100) * 530}
                  r="18"
                  fill="url(#nodeGlow)"
                />

                {/* Partículas Derivadas a los Pilares Laterales */}
                <circle
                  cx={400 - Math.sin((energyPhase / 100) * Math.PI) * 180}
                  cy={565 - (energyPhase / 100) * 450}
                  r="3.5"
                  fill="#FFE066"
                  opacity="0.8"
                />
                <circle
                  cx={400 + Math.sin((energyPhase / 100) * Math.PI) * 180}
                  cy={565 - (energyPhase / 100) * 450}
                  r="3.5"
                  fill="#FFE066"
                  opacity="0.8"
                />
              </g>
            )}

            {/* Renderizado de los 11 Nodos del Pipeline de Ingesta */}
            {PIPELINE_NODES.map((node) => {
              const isActive = node.id === activeId;
              const isApex = node.isApex;

              return (
                <g
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  className="cursor-pointer transition-transform duration-300"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  {/* Resplandor si está activo */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isApex ? 46 : 38}
                      fill={isApex ? 'url(#apexGlow)' : 'url(#nodeGlow)'}
                      className="animate-pulse"
                    />
                  )}

                  {/* Cuerpo del Nodo */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isApex ? 28 : 22}
                    fill={isApex ? '#16140d' : '#0c0c14'}
                    stroke={isActive ? '#FFE066' : node.color}
                    strokeWidth={isActive ? (isApex ? 3 : 2.5) : 1.5}
                    strokeOpacity={isActive ? 1 : 0.7}
                    filter={isActive ? 'url(#laserBeam)' : undefined}
                  />

                  {/* Anillo concéntrico interno */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isApex ? 23 : 17}
                    fill="none"
                    stroke={isActive ? '#FFF8DC' : '#C5A059'}
                    strokeWidth="0.8"
                    strokeDasharray={isApex ? '2 2' : 'none'}
                    opacity={isActive ? 0.9 : 0.4}
                  />

                  {/* Badge Técnico Central (Sin Hebreo: Puras Siglas de Ingeniería) */}
                  <text
                    x={node.x}
                    y={node.y + (isApex ? 4.5 : 4)}
                    textAnchor="middle"
                    fontSize={isApex ? '11' : '10'}
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={isActive ? '#FFF8DC' : '#FFE066'}
                    className="pointer-events-none select-none tracking-wider"
                  >
                    {node.badge}
                  </text>

                  {/* Etiqueta Inferior del Nodo */}
                  <text
                    x={node.x}
                    y={node.y + (isApex ? 42 : 36)}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={isActive ? '#FFF8DC' : '#a1a1aa'}
                  >
                    {node.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Panel de Inspección de la Fase Seleccionada: Fuera del overflow scroll para usar el 100% del ancho */}
      <div className="p-4 sm:p-6 pt-0 bg-[#040406]">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-lg bg-[#0e0e18] border border-[#C5A059]/40 shadow-2xl space-y-4"
        >
          {/* Fila Superior: Badge + Nombre + Pilar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#C5A059]/20 text-[#FFE066] border border-[#C5A059]/50 flex items-center gap-1.5 shadow-sm">
                <Cpu size={13} />
                <span>FASE [{activeNode.badge}]: {activeNode.name}</span>
              </span>
              <span className="text-xs font-mono font-semibold text-[#38bdf8] bg-sky-950/40 px-2.5 py-0.5 rounded border border-sky-800/40">
                {activeNode.l7Phase}
              </span>
            </div>

            <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1 rounded border border-zinc-800">
              {activeNode.pillar}
            </span>
          </div>

          {/* Fila Central: Descripción amplia y legible */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {activeNode.description}
          </p>

          {/* Fila Inferior: Telemetría y Capa OSI bien estructurada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-900">
            <div className="p-3 rounded bg-black/80 border border-zinc-800/90 flex flex-col justify-between font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Capa OSI:</span>
              <span className="text-xs sm:text-sm font-bold text-[#FFE066]">{activeNode.osiLayer}</span>
            </div>
            <div className="p-3 rounded bg-black/80 border border-zinc-800/90 flex flex-col justify-between font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Métricas & Telemetría Clave:</span>
              <span className="text-xs font-bold text-emerald-400">{activeNode.telemetry}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
