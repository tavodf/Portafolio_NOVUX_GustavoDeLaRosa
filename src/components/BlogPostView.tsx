import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, Clock, Tag, User, Play, Check, Copy, 
  Terminal, Share2, Database, Table2, RotateCcw, Sparkles, 
  Box, Lock, Layers, RefreshCw, Eye 
} from 'lucide-react';
import { BlogPost } from '../types';
import { sfx } from '../utils/soundEffects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onSelectTag?: (tag: string) => void;
}

export function BlogPostView({ post, onBack, onSelectTag }: BlogPostViewProps) {
  const [copied, setCopied] = useState(false);
  const [showTerminalOutput, setShowTerminalOutput] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [imageError, setImageError] = useState(false);

  // SQL Interactive Playground State (for SQL article)
  const [sqlExecuted, setSqlExecuted] = useState(false);
  const [isSqlRunning, setIsSqlRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [runningStepIndex, setRunningStepIndex] = useState(0);

  // View mode for SQL header image (Holographic 3D Cube vs High-Res Render)
  const [cubeViewMode, setCubeViewMode] = useState<'hologram' | 'photo'>('hologram');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const pythonCode = `import numpy as np

def proyeccion_espacio_semantico():
    """
    Mapea conceptos clave a coordenadas tridimensionales (X: Lógica, Y: Cadencia, Z: Estructura)
    y aplica una transformación lineal para representar la convergencia semántica.
    """
    # Coordenadas base en R^3: [Lógica, Cadencia/Ritmo, Estructura]
    conceptos = {
        "teclado": np.array([0.85, 0.95, 0.70]),
        "piano":   np.array([0.30, 0.98, 0.40]),
        "matriz":  np.array([0.95, 0.20, 0.95]),
        "codigo":  np.array([0.92, 0.70, 0.85]),
    }

    # Matriz de transformación lineal (pesos de integración)
    W = np.array([
        [1.0, 0.4, 0.2],
        [0.3, 1.0, 0.3],
        [0.2, 0.5, 1.0]
    ])

    espacio_vectorial = np.array(list(conceptos.values()))
    espacio_proyectado = np.dot(espacio_vectorial, W)
    
    # Centroide semántico del espacio
    centroide = np.mean(espacio_proyectado, axis=0)
    
    return f"Vector de Estado: {np.round(centroide, 3).tolist()} | Dim: {espacio_proyectado.shape}"

# Definición de la variable de estado
Esto_es_vida = f"{proyeccion_espacio_semantico()}"
print(Esto_es_vida)`;

  const sqlSampleQuery = `-- Logical Query Processing Pipeline Demo
SELECT 
    c.pais,
    COUNT(v.id_venta) AS total_operaciones,
    ROUND(SUM(v.monto_usd), 2) AS facturacion_total
FROM ventas v
INNER JOIN clientes c 
    ON v.id_cliente = c.id_cliente
WHERE v.fecha >= '2024-01-01'
GROUP BY c.pais
HAVING SUM(v.monto_usd) >= 50000.00
ORDER BY facturacion_total DESC
LIMIT 5;`;

  const handleCopy = (code: string) => {
    sfx.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunScript = () => {
    sfx.playSelect();
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowTerminalOutput(true);
      sfx.playPowerUp();
    }, 450);
  };

  const handleRunSql = () => {
    sfx.playSelect();
    setIsSqlRunning(true);
    setSqlExecuted(false);
    setActiveStep(null);
    setRunningStepIndex(1);

    const stages = [1, 2, 3, 4, 5];
    stages.forEach((st, idx) => {
      setTimeout(() => {
        setRunningStepIndex(st);
        sfx.playHover();
      }, (idx + 1) * 280);
    });

    setTimeout(() => {
      setIsSqlRunning(false);
      setSqlExecuted(true);
      setActiveStep(1);
      sfx.playPowerUp();
    }, (stages.length + 1) * 280);
  };

  const handleClearSql = () => {
    sfx.playBack();
    setIsSqlRunning(false);
    setSqlExecuted(false);
    setActiveStep(null);
    setRunningStepIndex(0);
  };

  const handleShare = () => {
    sfx.playClick();
    const url = `${window.location.origin}${window.location.pathname}#blog?id=${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('Enlace directo copiado al portapapeles');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12"
    >
      {/* Botón de Regreso */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            sfx.playBack();
            onBack();
          }}
          onMouseEnter={() => sfx.playHover()}
          className="group inline-flex items-center gap-2 text-xs font-mono text-[#C5A059] hover:text-[#FFE066] border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0c0c12] px-3.5 py-2 rounded-sm transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver a la Bitácora</span>
        </button>

        <button
          onClick={handleShare}
          onMouseEnter={() => sfx.playHover()}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#FFE066] text-xs font-mono border border-zinc-800 hover:border-[#C5A059]/50 bg-black/40 px-3 py-2 rounded-sm transition-colors cursor-pointer"
          title="Compartir publicación"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Compartir</span>
        </button>
      </div>

      {/* Tarjeta / Caja sólida para lectura sin distracción */}
      <div className="w-full bg-[#0c0c12] border border-[#C5A059]/35 hover:border-[#C5A059] rounded-xl p-6 sm:p-10 md:p-12 shadow-[0_16px_60px_rgba(0,0,0,0.95)] hover:shadow-[0_0_45px_rgba(197,160,89,0.3)] transition-all duration-300 relative z-10">
        
        {/* Cabecera del Artículo */}
        <header className="mb-10 border-b border-[#C5A059]/20 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
            <div className="flex items-center gap-1.5 text-[#C5A059]">
              <Calendar size={13} />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            {post.readingTime && (
              <>
                <span className="text-zinc-700">•</span>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock size={13} />
                  <span>{post.readingTime}</span>
                </div>
              </>
            )}
            {post.author && (
              <>
                <span className="text-zinc-700">•</span>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <User size={13} className="text-[#C5A059]" />
                  <span>{post.author.name}</span>
                </div>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light border-l-2 border-[#C5A059] pl-4 py-1.5 bg-[#C5A059]/5 rounded-r">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  sfx.playClick();
                  if (onSelectTag) onSelectTag(tag);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 hover:border-[#C5A059] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
              >
                <Tag size={10} />
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Imagen Principal o Visual Interactivo del Cubo 3D de Datos */}
        {post.id === '2' ? (
          <div className="mb-10 rounded-lg overflow-hidden border border-[#C5A059]/40 bg-[#07070b] shadow-[0_0_40px_rgba(197,160,89,0.2)] relative">
            {/* Header del Visual */}
            <div className="bg-[#12121c] px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-[#C5A059]/30 gap-2">
              <div className="flex items-center gap-2">
                <Box size={14} className="text-[#C5A059] animate-pulse" />
                <span className="text-xs font-mono text-zinc-200 font-semibold tracking-wide">
                  MODELO MENTAL DEL CUBO DE DATOS • NODOS & DESTELLOS DE INFORMACIÓN
                </span>
              </div>

              {/* Selector de Vista: Holograma 3D vs Fotografía Cuántica */}
              <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded border border-zinc-800 text-[11px] font-mono">
                <button
                  onClick={() => {
                    sfx.playClick();
                    setCubeViewMode('hologram');
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                    cubeViewMode === 'hologram'
                      ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={11} />
                  <span>Cubo Holográfico 3D</span>
                </button>

                <button
                  onClick={() => {
                    sfx.playClick();
                    setCubeViewMode('photo');
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                    cubeViewMode === 'photo'
                      ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye size={11} />
                  <span>Fotografía Cuántica</span>
                </button>
              </div>
            </div>

            {/* Vista 1: Cubo Holográfico 3D con Nodos y Destellos de Información */}
            {cubeViewMode === 'hologram' ? (
              <div className="relative w-full h-[400px] sm:h-[460px] bg-gradient-to-b from-[#090912] via-[#050508] to-black flex items-center justify-center overflow-hidden p-2 select-none">
                {/* Cuadrícula isométrica de fondo */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #C5A059 1px, transparent 0)',
                    backgroundSize: '28px 28px'
                  }}
                />

                {/* Brillo ambiental y destellos de fondo */}
                <div className="absolute w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none -translate-y-4" />
                <div className="absolute w-64 h-64 rounded-full bg-[#FFE066]/5 blur-2xl pointer-events-none translate-x-12 translate-y-8" />

                {/* Representación SVG Isométrica del Cubo Translúcido de Datos */}
                <svg
                  viewBox="0 0 800 480"
                  className="w-full h-full max-w-[760px] max-h-[460px] relative z-10 overflow-visible"
                >
                  <defs>
                    {/* Gradiente cara superior */}
                    <linearGradient id="cubeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE066" stopOpacity="0.22" />
                      <stop offset="50%" stopColor="#C5A059" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#0a0a14" stopOpacity="0.30" />
                    </linearGradient>

                    {/* Gradiente cara izquierda */}
                    <linearGradient id="cubeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C5A059" stopOpacity="0.20" />
                      <stop offset="50%" stopColor="#151525" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#050508" stopOpacity="0.60" />
                    </linearGradient>

                    {/* Gradiente cara derecha */}
                    <linearGradient id="cubeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE066" stopOpacity="0.18" />
                      <stop offset="50%" stopColor="#1a1a2e" stopOpacity="0.20" />
                      <stop offset="100%" stopColor="#050508" stopOpacity="0.65" />
                    </linearGradient>

                    {/* Resplandor para nodos dorados */}
                    <radialGradient id="nodeGoldGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                      <stop offset="35%" stopColor="#FFE066" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#C5A059" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                    </radialGradient>

                    {/* Resplandor para nodos cyan / analíticos */}
                    <radialGradient id="nodeCyanGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                      <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Aristas traseras interiores del cubo de cristal (Perspectiva Isométrica 3D) */}
                  <g stroke="#C5A059" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4">
                    <line x1="400" y1="230" x2="400" y2="70" />
                    <line x1="400" y1="230" x2="230" y2="330" />
                    <line x1="400" y1="230" x2="570" y2="330" />
                  </g>

                  {/* Cara Izquierda del Cubo de Cristal */}
                  <polygon
                    points="230,170 400,270 400,430 230,330"
                    fill="url(#cubeLeftGrad)"
                    stroke="#C5A059"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />

                  {/* Cara Derecha del Cubo de Cristal */}
                  <polygon
                    points="400,270 570,170 570,330 400,430"
                    fill="url(#cubeRightGrad)"
                    stroke="#C5A059"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />

                  {/* Cara Superior del Cubo de Cristal */}
                  <polygon
                    points="400,70 570,170 400,270 230,170"
                    fill="url(#cubeTopGrad)"
                    stroke="#FFE066"
                    strokeWidth="1.8"
                    strokeOpacity="0.8"
                  />

                  {/* Líneas de rejilla interna (Data Mesh dentro del cubo) */}
                  <g stroke="#C5A059" strokeOpacity="0.12" strokeWidth="1">
                    <line x1="285" y1="145" x2="455" y2="245" />
                    <line x1="345" y1="120" x2="515" y2="220" />
                    <line x1="485" y1="120" x2="315" y2="220" />
                    <line x1="515" y1="220" x2="515" y2="380" />
                    <line x1="285" y1="220" x2="285" y2="380" />
                  </g>

                  {/* Vectores / Rayos Láser conectando los nodos dentro del cubo */}
                  <g stroke="#FFE066" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3">
                    {/* Conector Tabla Ventas -> JOIN Clientes */}
                    <line x1="320" y1="210" x2="480" y2="185" />
                    {/* Conector JOIN -> WHERE */}
                    <line x1="480" y1="185" x2="330" y2="295" />
                    {/* Conector WHERE -> GROUP BY */}
                    <line x1="330" y1="295" x2="470" y2="295" />
                    {/* Conector GROUP BY -> SELECT */}
                    <line x1="470" y1="295" x2="400" y2="355" />
                    {/* Conector SELECT -> Núcleo de Clausura */}
                    <line x1="400" y1="355" x2="400" y2="175" />
                    {/* Conexiones cruzadas secundarias */}
                    <line x1="320" y1="210" x2="390" y2="250" strokeOpacity="0.3" />
                    <line x1="480" y1="185" x2="390" y2="250" strokeOpacity="0.3" />
                  </g>

                  {/* DESTELLOS DE INFORMACIÓN FLOTANDO (Sparks / Partículas de luz dentro del cubo) */}
                  {/* Destellos dorados y ambar pulsantes */}
                  <g>
                    {/* Destello 1 */}
                    <circle cx="360" cy="190" r="2.5" fill="#FFE066" className="animate-pulse" />
                    <circle cx="360" cy="190" r="8" fill="#C5A059" fillOpacity="0.25" className="animate-ping" />

                    {/* Destello 2 */}
                    <circle cx="440" cy="225" r="2" fill="#FFE066" className="animate-pulse" />

                    {/* Destello 3 */}
                    <circle cx="350" cy="330" r="3" fill="#38bdf8" className="animate-pulse" />
                    <circle cx="350" cy="330" r="9" fill="#38bdf8" fillOpacity="0.2" className="animate-ping" />

                    {/* Destello 4 */}
                    <circle cx="450" cy="340" r="2.5" fill="#FFE066" className="animate-pulse" />

                    {/* Destello 5 */}
                    <circle cx="385" cy="135" r="3" fill="#FFE066" className="animate-pulse" />
                    <circle cx="385" cy="135" r="10" fill="#FFE066" fillOpacity="0.3" className="animate-ping" />

                    {/* Destello 6 */}
                    <circle cx="415" cy="305" r="2" fill="#38bdf8" className="animate-pulse" />
                  </g>

                  {/* NODOS DE INFORMACIÓN PRINCIPALES DENTRO DEL CUBO */}
                  {/* NODO 1: Origen ventas (FROM) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('FROM ventas (Cubo Principal: 500,000 fichas)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="320" cy="210" r="18" fill="url(#nodeGoldGlow)" />
                    <circle cx="320" cy="210" r="6" fill="#0c0c14" stroke="#FFE066" strokeWidth="2" />
                    <circle cx="320" cy="210" r="2" fill="#FFE066" />
                    <text x="305" y="195" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [1] FROM
                    </text>
                  </g>

                  {/* NODO 2: Cruce clientes (JOIN) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('JOIN clientes (Cubo Relacional: 25,000 entidades conectadas)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="480" cy="185" r="18" fill="url(#nodeGoldGlow)" />
                    <circle cx="480" cy="185" r="6" fill="#0c0c14" stroke="#FFE066" strokeWidth="2" />
                    <circle cx="480" cy="185" r="2" fill="#FFE066" />
                    <text x="465" y="170" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [2] JOIN ⋈
                    </text>
                  </g>

                  {/* NODO 3: Conexión Clave Relacional (Centro FK) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('CLAVE RELACIONAL: v.id_cliente = c.id_cliente (Enlace común)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="390" cy="250" r="22" fill="url(#nodeCyanGlow)" />
                    <circle cx="390" cy="250" r="7" fill="#0c0c14" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="390" cy="250" r="3" fill="#38bdf8" />
                    <text x="375" y="275" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      PK ↔ FK
                    </text>
                  </g>

                  {/* NODO 4: Filtro Horizontal (WHERE) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('WHERE fecha >= 2024-01-01 (Colador: purga 357,700 fichas)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="330" cy="295" r="18" fill="url(#nodeGoldGlow)" />
                    <circle cx="330" cy="295" r="6" fill="#0c0c14" stroke="#FFE066" strokeWidth="2" />
                    <circle cx="330" cy="295" r="2" fill="#FFE066" />
                    <text x="270" y="310" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [3] WHERE σ
                    </text>
                  </g>

                  {/* NODO 5: Agregación (GROUP BY & HAVING) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('GROUP BY c.pais & HAVING SUM >= 50k (Fusión de fichas en montoncitos)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="470" cy="295" r="18" fill="url(#nodeGoldGlow)" />
                    <circle cx="470" cy="295" r="6" fill="#0c0c14" stroke="#FFE066" strokeWidth="2" />
                    <circle cx="470" cy="295" r="2" fill="#FFE066" />
                    <text x="480" y="310" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [4] GROUP BY
                    </text>
                  </g>

                  {/* NODO 6: Corte Vertical (SELECT) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('SELECT pais, total_operaciones, facturacion_total (Proyección π)');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="400" cy="355" r="18" fill="url(#nodeGoldGlow)" />
                    <circle cx="400" cy="355" r="6" fill="#0c0c14" stroke="#FFE066" strokeWidth="2" />
                    <circle cx="400" cy="355" r="2" fill="#FFE066" />
                    <text x="365" y="380" fill="#FFE066" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [5] SELECT π
                    </text>
                  </g>

                  {/* NODO 7: Núcleo de Clausura Matemática (Top Apex) */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => {
                      sfx.playHover();
                      setHoveredNode('PROPIEDAD DE CLAUSURA: Entrada es Tabla, Salida es Tabla');
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx="400" cy="175" r="26" fill="url(#nodeGoldGlow)" />
                    <circle cx="400" cy="175" r="9" fill="#121222" stroke="#FFE066" strokeWidth="2.5" />
                    <circle cx="400" cy="175" r="3.5" fill="#FFE066" className="animate-pulse" />
                    <text x="345" y="155" fill="#FFE066" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ✦ CLAUSURA SQL
                    </text>
                  </g>
                </svg>

                {/* Banner flotante de inspección interactiva del nodo */}
                <div className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-black/85 border border-[#C5A059]/40 backdrop-blur-md px-3.5 py-2 rounded-sm text-xs font-mono z-20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
                    <span className="text-zinc-400">Inspección de Nodos:</span>
                    <span className="text-[#FFE066] font-bold">
                      {hoveredNode || 'Pasa el cursor por los nodos del cubo para ver el modelo mental'}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#C5A059] flex items-center gap-1.5 shrink-0">
                    <Sparkles size={11} />
                    <span>8 Nodos • 6 Destellos en flujo</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Vista 2: Fotografía Cuántica de Alta Resolución */
              <div className="relative group">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 text-xs font-mono text-zinc-300 bg-black/85 px-3 py-1.5 rounded backdrop-blur-sm border border-zinc-800 flex items-center gap-2">
                  <Database size={13} className="text-[#C5A059]" />
                  <span>Cubo Cuántico de Datos • Fotografía de Alta Definición</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Imagen Principal para otros posts */
          post.image && !imageError && (
            <div className="mb-10 rounded-lg overflow-hidden border border-[#C5A059]/30 bg-black shadow-[0_0_35px_rgba(197,160,89,0.15)] relative group">
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('googleusercontent.com/d/')) {
                    const match = target.src.match(/googleusercontent\.com\/d\/([^=]+)/);
                    if (match && match[1]) {
                      target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
                      return;
                    }
                  }
                  setImageError(true);
                }}
                className="w-full max-h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-xs font-mono text-zinc-400 bg-black/85 px-2.5 py-1 rounded backdrop-blur-sm border border-zinc-800">
                // Archivo analítico • Álgebra Relacional & Bases de Datos
              </div>
            </div>
          )
        )}

        {/* Caja de Lectura del Cuerpo del Artículo Renderizado con ReactMarkdown + remarkGfm */}
        <div className="bg-[#08080c] border border-zinc-800/80 rounded-lg p-6 sm:p-8 md:p-10 shadow-inner">
          <div className="prose prose-invert max-w-none text-zinc-200 text-base md:text-lg leading-relaxed space-y-6 font-normal">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mt-8 mb-4 border-b border-zinc-800 pb-2">
                    <span className="text-[#C5A059] font-mono">###</span> {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed text-zinc-200">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-[#FFE066] not-italic font-medium">{children}</em>
                ),
                code: ({ children, className }) => {
                  const isBlock = Boolean(className);
                  if (isBlock) {
                    return (
                      <code className="block bg-[#050508] p-4 rounded border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-[#151520] border border-[#C5A059]/30 text-[#FFE066] font-mono text-sm">
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded border border-[#C5A059]/30 bg-[#0c0c14] shadow-md">
                    <table className="w-full text-left text-xs sm:text-sm text-zinc-300 font-mono">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#181824] text-[#FFE066] uppercase text-[11px] tracking-wider border-b border-[#C5A059]/30 font-bold">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="p-3 sm:p-3.5">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="p-3 sm:p-3.5 border-b border-zinc-800/60 leading-relaxed">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#C5A059] bg-[#C5A059]/10 pl-4 py-2 my-4 text-zinc-200 italic">
                    {children}
                  </blockquote>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 my-4 text-zinc-200">
                    {children}
                  </ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 my-4 text-zinc-200">
                    {children}
                  </ul>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>

            {/* Si es el post de Python, mostramos el simulador interactivo de Numpy */}
            {post.id === '1' && (
              <div className="my-6 rounded-lg overflow-hidden border border-[#C5A059]/40 bg-[#0a0a0f] shadow-2xl">
                <div className="bg-[#14141d] px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                      <Terminal size={13} className="text-[#C5A059]" />
                      proyeccion_semantica.py
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunScript}
                      onMouseEnter={() => sfx.playHover()}
                      disabled={isExecuting}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer font-bold ${
                        showTerminalOutput
                          ? 'bg-[#C5A059]/20 hover:bg-[#C5A059] text-[#FFE066] hover:text-black border border-[#C5A059]/50'
                          : 'bg-[#C5A059] text-black hover:bg-[#FFE066] border border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.5)] animate-pulse'
                      }`}
                    >
                      <Play size={11} className="fill-current" />
                      <span>{isExecuting ? 'Calculando...' : showTerminalOutput ? 'Re-ejecutar' : 'Ejecutar'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(pythonCode)}
                      onMouseEnter={() => sfx.playHover()}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white px-2.5 py-1 rounded text-xs font-mono hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed selection:bg-[#C5A059]/30">
                  <code>{pythonCode}</code>
                </pre>

                {showTerminalOutput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-[#C5A059]/40 bg-[#040406] p-5 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] mb-2 pb-2 border-b border-zinc-800/80">
                      <span className="text-[#C5A059] flex items-center gap-1.5">
                        <Terminal size={12} />
                        $ python -u proyeccion_semantica.py
                      </span>
                      <span className="text-zinc-600">// Runtime: Python 3.11 • NumPy Engine</span>
                    </div>

                    <div className="mb-4 bg-black/60 p-3 rounded border border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block mb-1">
                        SALIDA ESTÁNDAR (stdout):
                      </span>
                      <div className="text-[#FFE066] font-bold text-sm">
                        Vector de Estado: [1.378, 1.408, 1.341] | Dim: (4, 3)
                      </div>
                    </div>

                    <div className="bg-[#07070d] border border-[#C5A059]/40 rounded p-4 text-[#FFE066] overflow-x-auto shadow-inner">
                      <div className="flex items-center justify-between text-[11px] text-[#C5A059] mb-2 pb-1.5 border-b border-[#C5A059]/20 font-bold tracking-wider">
                        <span>// PLANO VECTORIAL R^3 : PROYECCIÓN TRIDIMENSIONAL GENERADA</span>
                        <span className="text-green-400 text-[10px]">● CONVERGENCIA SEMÁNTICA ACTIVA</span>
                      </div>

                      <pre className="text-xs sm:text-sm leading-relaxed text-[#FFE066] font-mono select-none">
{`       Z (Estructura / Abstracción)
       ▲
       │      • [Palabra / Vector] ──► (X: 1.378, Y: 1.408, Z: 1.341)
       │     /
       │    /
       │   /
       │  /
       │ /
       └────────────────► X (Lógica / Sintaxis)
      /
     /
    ▼
   Y (Cadencia / Semántica)`}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Si es el nuevo post de SQL (id === '2'), mostramos el Pipeline Interactivo de Procesamiento Lógico */}
            {post.id === '2' && (
              <div className="my-8 rounded-lg overflow-hidden border border-[#C5A059]/40 bg-[#0a0a0f] shadow-2xl">
                {/* Header del Simulador con Estados y Botón de Limpieza */}
                <div className="bg-[#14141d] px-4 py-3 flex flex-wrap items-center justify-between border-b border-zinc-800 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Database size={15} className="text-[#C5A059]" />
                    <span className="text-xs font-mono text-zinc-200 font-semibold">
                      SQL Query Engine • Simulador de Orden Lógico de Ejecución
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isSqlRunning
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 animate-pulse'
                        : sqlExecuted
                        ? 'bg-green-500/20 text-green-300 border-green-500/40'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                      {isSqlRunning ? 'PROCESANDO...' : sqlExecuted ? 'EJECUTADO' : 'EN REPOSO'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Botón de Ejecutar / Re-ejecutar */}
                    <button
                      onClick={handleRunSql}
                      onMouseEnter={() => sfx.playHover()}
                      disabled={isSqlRunning}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer font-bold ${
                        sqlExecuted
                          ? 'bg-[#C5A059]/20 hover:bg-[#C5A059] text-[#FFE066] hover:text-black border border-[#C5A059]/50'
                          : 'bg-[#C5A059] text-black hover:bg-[#FFE066] border border-[#FFE066] shadow-[0_0_15px_rgba(197,160,89,0.5)] animate-pulse'
                      }`}
                    >
                      <Play size={11} className="fill-current" />
                      <span>{isSqlRunning ? 'Compilando...' : sqlExecuted ? 'Re-ejecutar Pipeline' : 'Ejecutar Query'}</span>
                    </button>

                    {/* Botón de Limpieza (Restablece el simulador para verlo desde cero) */}
                    <button
                      onClick={handleClearSql}
                      onMouseEnter={() => sfx.playHover()}
                      disabled={isSqlRunning || (!sqlExecuted && !isSqlRunning)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                        sqlExecuted
                          ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#C5A059]/50 cursor-pointer shadow-sm'
                          : 'bg-zinc-900/50 text-zinc-600 border border-zinc-800 cursor-not-allowed opacity-50'
                      }`}
                      title="Limpiar y restaurar al estado inicial"
                    >
                      <RotateCcw size={12} className={sqlExecuted ? 'text-[#C5A059]' : 'text-zinc-600'} />
                      <span>Limpiar</span>
                    </button>

                    {/* Botón Copiar Query */}
                    <button
                      onClick={() => handleCopy(sqlSampleQuery)}
                      onMouseEnter={() => sfx.playHover()}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded text-xs font-mono hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-800"
                    >
                      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                {/* Código SQL a Simular */}
                <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[#FFE066] bg-[#07070b] overflow-x-auto leading-relaxed border-b border-zinc-800 select-all">
                  <code>{sqlSampleQuery}</code>
                </pre>

                {/* Contenido Dinámico del Simulador */}
                <div className="p-4 sm:p-6 bg-[#09090f]">
                  {/* CASO 1: Estado en Ejecución (Animación en vivo de las fases) */}
                  {isSqlRunning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-lg bg-black/80 border border-[#C5A059]/50 font-mono text-xs my-2"
                    >
                      <div className="flex items-center justify-between mb-3 text-zinc-400 text-xs">
                        <span className="flex items-center gap-2 text-[#FFE066] font-bold">
                          <RefreshCw size={13} className="animate-spin text-[#C5A059]" />
                          MOTOR EN EJECUCIÓN: Procesando Fase {runningStepIndex} de 5...
                        </span>
                        <span className="text-zinc-500">{runningStepIndex * 20}% COMPLETADO</span>
                      </div>

                      {/* Barra de progreso */}
                      <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden mb-4 border border-zinc-800">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#C5A059] to-[#FFE066]"
                          initial={{ width: '0%' }}
                          animate={{ width: `${runningStepIndex * 20}%` }}
                          transition={{ duration: 0.25 }}
                        />
                      </div>

                      {/* Log de la fase actual */}
                      <div className="p-3.5 bg-[#06060a] rounded border border-zinc-800 text-zinc-200">
                        {runningStepIndex === 1 && (
                          <div className="flex items-center gap-2 text-sky-400">
                            <span className="text-[#C5A059]">[1/5 FROM & JOIN]:</span>
                            <span>Montando cubos en memoria: ventas (500,000 tuplas) ⋈ clientes (25,000 registros)...</span>
                          </div>
                        )}
                        {runningStepIndex === 2 && (
                          <div className="flex items-center gap-2 text-sky-400">
                            <span className="text-[#C5A059]">[2/5 WHERE]:</span>
                            <span>Filtrado horizontal fecha &gt;= '2024-01-01'. Purgando 357,700 fichas descartadas...</span>
                          </div>
                        )}
                        {runningStepIndex === 3 && (
                          <div className="flex items-center gap-2 text-sky-400">
                            <span className="text-[#C5A059]">[3/5 GROUP BY & HAVING]:</span>
                            <span>Colapsando en categorías por país y aplicando umbral HAVING SUM(monto) &gt;= $50,000...</span>
                          </div>
                        )}
                        {runningStepIndex === 4 && (
                          <div className="flex items-center gap-2 text-sky-400">
                            <span className="text-[#C5A059]">[4/5 SELECT]:</span>
                            <span>Corte vertical proyectivo: aislando únicamente país, total_operaciones y facturación...</span>
                          </div>
                        )}
                        {runningStepIndex === 5 && (
                          <div className="flex items-center gap-2 text-green-400">
                            <span className="text-[#C5A059]">[5/5 ORDER & LIMIT]:</span>
                            <span>Ordenando por facturación descendente y tomando top 5. ¡Propiedad de clausura alcanzada!</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* CASO 2: Estado Inicial en Reposo (No disponible desde el principio hasta ejecutar) */}
                  {!isSqlRunning && !sqlExecuted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 sm:p-10 text-center bg-black/60 border border-zinc-800/80 rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/5 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-4 shadow-[0_0_25px_rgba(197,160,89,0.25)]">
                        <Lock size={22} className="text-[#FFE066]" />
                      </div>

                      <h4 className="text-white font-mono text-base font-bold mb-2">
                        Simulador de Procesamiento Relacional en Reposo
                      </h4>

                      <p className="text-zinc-400 text-xs sm:text-sm font-mono max-w-lg mb-6 leading-relaxed">
                        Las fases de la pipeline lógica se mantienen bloqueadas para que puedas observar el proceso real de ejecución en memoria. Haz clic en el botón para compilar la consulta y presenciar la transformación paso a paso.
                      </p>

                      <button
                        onClick={handleRunSql}
                        onMouseEnter={() => sfx.playHover()}
                        className="px-6 py-2.5 rounded bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(197,160,89,0.45)] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                      >
                        <Play size={13} className="fill-current" />
                        <span>Ejecutar Consulta Ahora</span>
                      </button>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-4 w-full max-w-md">
                        <span className="flex items-center gap-1.5">
                          <Layers size={12} className="text-[#C5A059]" />
                          5 Fases Lógicas
                        </span>
                        <span>•</span>
                        <span>Dataset: 500k Tuplas</span>
                        <span>•</span>
                        <span>Clausura: Garantizada</span>
                      </div>
                    </motion.div>
                  )}

                  {/* CASO 3: Estado Ejecutado (Fases desbloqueadas e interactivas + Tabla de Resultados) */}
                  {sqlExecuted && !isSqlRunning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="text-xs font-mono text-zinc-400 mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Sparkles size={12} className="text-[#C5A059]" />
                          SELECCIONA CUALQUIER FASE PARA INSPECCIONAR LA TRANSFORMACIÓN:
                        </span>
                        <span className="text-[#C5A059] font-bold">
                          Fase {activeStep || 1} de 5 Seleccionada
                        </span>
                      </div>

                      {/* Selector de los 5 Pasos Desbloqueados */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4 font-mono text-xs">
                        {[
                          { step: 1, label: '1. FROM & JOIN', icon: '📦' },
                          { step: 2, label: '2. WHERE', icon: '🔎' },
                          { step: 3, label: '3. GROUP BY', icon: '📊' },
                          { step: 4, label: '4. SELECT', icon: '✂️' },
                          { step: 5, label: '5. ORDER & LIMIT', icon: '🏁' },
                        ].map((item) => (
                          <button
                            key={item.step}
                            onClick={() => {
                              sfx.playClick();
                              setActiveStep(item.step);
                            }}
                            className={`p-2.5 rounded-sm border text-left transition-all cursor-pointer ${
                              (activeStep || 1) === item.step
                                ? 'bg-[#C5A059]/25 border-[#C5A059] text-[#FFE066] font-bold shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                                : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                            }`}
                          >
                            <div className="text-[10px] text-zinc-500">{item.icon} Fase</div>
                            <div className="text-[11px] truncate">{item.label}</div>
                          </button>
                        ))}
                      </div>

                      {/* Panel Explicativo según la Fase Seleccionada */}
                      <div className="p-4 sm:p-5 rounded border border-zinc-800/80 bg-black/60 font-mono text-xs text-zinc-300">
                        {(activeStep || 1) === 1 && (
                          <div>
                            <div className="text-[#C5A059] font-bold mb-1.5 flex items-center justify-between">
                              <span>// FASE 1: ORIGEN Y PRODUCTO CARTESIANO FILTRADO</span>
                              <span className="text-[10px] text-zinc-500">Operador: FROM + JOIN (⋈)</span>
                            </div>
                            <p className="text-zinc-400 mb-2 leading-relaxed">
                              Se ubican los dos cubos: <strong className="text-white">ventas</strong> (500,000 fichas) y <strong className="text-white">clientes</strong> (25,000 fichas). El operador <code className="text-[#FFE066]">JOIN</code> une fichas donde <code className="text-[#FFE066]">v.id_cliente = c.id_cliente</code>.
                            </p>
                            <div className="text-green-400 text-[11px] font-semibold">
                              ✔ Resultado intermedio en memoria: Tabla virtual con 500,000 registros y 18 atributos.
                            </div>
                          </div>
                        )}

                        {(activeStep || 1) === 2 && (
                          <div>
                            <div className="text-[#C5A059] font-bold mb-1.5 flex items-center justify-between">
                              <span>// FASE 2: SELECCIÓN HORIZONTAL (WHERE σ)</span>
                              <span className="text-[10px] text-zinc-500">Operador: Selección Relacional (σ)</span>
                            </div>
                            <p className="text-zinc-400 mb-2 leading-relaxed">
                              El colador horizontal inspecciona ficha por ficha evaluando <code className="text-[#FFE066]">fecha &gt;= '2024-01-01'</code>. Las ventas históricas del 2023 hacia atrás son purgadas en memoria antes de cualquier cómputo.
                            </p>
                            <div className="text-green-400 text-[11px] font-semibold">
                              ✔ Resultado intermedio: El conjunto se reduce de 500,000 a 142,300 registros activos.
                            </div>
                          </div>
                        )}

                        {(activeStep || 1) === 3 && (
                          <div>
                            <div className="text-[#C5A059] font-bold mb-1.5 flex items-center justify-between">
                              <span>// FASE 3: COLAPSO Y FILTRADO DE GRUPOS (GROUP BY & HAVING)</span>
                              <span className="text-[10px] text-zinc-500">Operador: Agrupación (γ) + Filtro de Grupos</span>
                            </div>
                            <p className="text-zinc-400 mb-2 leading-relaxed">
                              Las 142,300 fichas se agrupan en montones clasificados por <code className="text-[#FFE066]">c.pais</code>. Se calculan las agregaciones (<code className="text-[#FFE066]">COUNT</code>, <code className="text-[#FFE066]">SUM</code>). Luego, <code className="text-[#FFE066]">HAVING</code> descarta países con facturación inferior a $50,000 USD.
                            </p>
                            <div className="text-green-400 text-[11px] font-semibold">
                              ✔ Resultado intermedio: De 45 países evaluados, solo 12 superan el umbral corporativo.
                            </div>
                          </div>
                        )}

                        {(activeStep || 1) === 4 && (
                          <div>
                            <div className="text-[#C5A059] font-bold mb-1.5 flex items-center justify-between">
                              <span>// FASE 4: PROYECCIÓN VERTICAL (SELECT π)</span>
                              <span className="text-[10px] text-zinc-500">Operador: Proyección Relacional (π)</span>
                            </div>
                            <p className="text-zinc-400 mb-2 leading-relaxed">
                              El resaltador extrae exclusivamente las 3 columnas declaradas: <code className="text-[#FFE066]">pais</code>, <code className="text-[#FFE066]">total_operaciones</code> y <code className="text-[#FFE066]">facturacion_total</code>. El resto de las 15 columnas son descartadas.
                            </p>
                            <div className="text-green-400 text-[11px] font-semibold">
                              ✔ Resultado intermedio: Tabla resultante con 12 filas y exactamente 3 columnas.
                            </div>
                          </div>
                        )}

                        {(activeStep || 1) === 5 && (
                          <div>
                            <div className="text-[#C5A059] font-bold mb-1.5 flex items-center justify-between">
                              <span>// FASE 5: ORDENAMIENTO FINAL Y PAGINACIÓN (ORDER BY & LIMIT)</span>
                              <span className="text-[10px] text-zinc-500">Operador: Ordenamiento y Ventana Top-N</span>
                            </div>
                            <p className="text-zinc-400 mb-2 leading-relaxed">
                              Se ejecuta el algoritmo de ordenamiento descendente por <code className="text-[#FFE066]">facturacion_total DESC</code> y el puntero extrae únicamente el top 5 del lote.
                            </p>
                            <div className="text-green-400 text-[11px] font-semibold">
                              ✔ Salida Definitiva: Clausura matemática completada (5 tuplas listas para el dashboard).
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tabla de Salida en Memoria (Tuplas Resultantes) */}
                      <div className="mt-4 p-4 bg-black/80 rounded border border-[#C5A059]/40 shadow-inner">
                        <div className="flex flex-wrap items-center justify-between pb-2 mb-3 border-b border-[#C5A059]/20 text-[11px] font-mono text-[#C5A059] gap-2">
                          <span className="flex items-center gap-1.5">
                            <Table2 size={13} />
                            RESULTADO EN MEMORIA (5 tuplas devueltas en 14ms):
                          </span>
                          <span className="text-green-400 font-bold">
                            ✔ PROPIEDAD DE CLAUSURA CUMPLIDA (TABLA ENTRANTE → TABLA SALIENTE)
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-xs text-zinc-300">
                            <thead>
                              <tr className="border-b border-zinc-700 text-[#FFE066]">
                                <th className="py-1 px-3">pais</th>
                                <th className="py-1 px-3">total_operaciones</th>
                                <th className="py-1 px-3 text-right">facturacion_total (USD)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-zinc-800/60 hover:bg-[#C5A059]/5 transition-colors">
                                <td className="py-1.5 px-3 text-white font-semibold">Colombia</td>
                                <td className="py-1.5 px-3">34,120</td>
                                <td className="py-1.5 px-3 text-right text-green-400 font-semibold">$384,120.50</td>
                              </tr>
                              <tr className="border-b border-zinc-800/60 hover:bg-[#C5A059]/5 transition-colors">
                                <td className="py-1.5 px-3 text-white font-semibold">México</td>
                                <td className="py-1.5 px-3">28,950</td>
                                <td className="py-1.5 px-3 text-right text-green-400 font-semibold">$312,890.00</td>
                              </tr>
                              <tr className="border-b border-zinc-800/60 hover:bg-[#C5A059]/5 transition-colors">
                                <td className="py-1.5 px-3 text-white font-semibold">Chile</td>
                                <td className="py-1.5 px-3">15,400</td>
                                <td className="py-1.5 px-3 text-right text-green-400 font-semibold">$198,400.20</td>
                              </tr>
                              <tr className="border-b border-zinc-800/60 hover:bg-[#C5A059]/5 transition-colors">
                                <td className="py-1.5 px-3 text-white font-semibold">Perú</td>
                                <td className="py-1.5 px-3">11,210</td>
                                <td className="py-1.5 px-3 text-right text-green-400 font-semibold">$145,210.00</td>
                              </tr>
                              <tr className="hover:bg-[#C5A059]/5 transition-colors">
                                <td className="py-1.5 px-3 text-white font-semibold">España</td>
                                <td className="py-1.5 px-3">8,430</td>
                                <td className="py-1.5 px-3 text-right text-green-400 font-semibold">$98,600.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Botón rápido para limpiar y reiniciar desde abajo */}
                        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-500">¿Deseas probar de nuevo la ejecución?</span>
                          <button
                            onClick={handleClearSql}
                            onMouseEnter={() => sfx.playHover()}
                            className="text-[#C5A059] hover:text-[#FFE066] inline-flex items-center gap-1.5 underline decoration-[#C5A059]/40 hover:decoration-[#FFE066] cursor-pointer"
                          >
                            <RotateCcw size={11} />
                            Limpiar simulación y volver al reposo
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Pie de Página / Autor & Siguiente Acción */}
        <footer className="mt-12 pt-8 border-t border-[#C5A059]/30">
          <div className="bg-[#08080c] border border-zinc-800 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider block mb-1">
                Autor
              </span>
              <h4 className="text-lg font-bold text-white">Gustavo De La Rosa</h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Software Factory & Data Analytics • Bogotá, Colombia
              </p>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfx.playPowerUp()}
              onMouseEnter={() => sfx.playHover()}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#FFE066] hover:text-black px-6 py-3 rounded-sm font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer font-bold"
            >
              Iniciar Proyecto
            </a>
          </div>
        </footer>
      </div>
    </motion.article>
  );
}
