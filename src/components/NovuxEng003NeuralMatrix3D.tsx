import { useState, useEffect, useRef } from 'react';
import { 
  Cpu, RotateCcw, Sparkles,
  Layers, Gauge, Activity, Compass, Orbit,
  Sliders
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

interface SemanticNode {
  id: string;
  name: string;
  nameEn: string;
  cluster: 'pricing' | 'territorial' | 'legal' | 'cognitive';
  x: number;
  y: number;
  z: number;
  weight: number;
  description: string;
  descriptionEn: string;
  tags: string[];
}

const CLUSTERS = {
  pricing: { name: 'Pricing & Scraping Core', nameEn: 'Pricing & Scraping Core', color: '#C5A059', glow: 'rgba(197, 160, 89, 0.4)' },
  territorial: { name: 'Inteligencia Territorial RNEC', nameEn: 'RNEC Territorial Intelligence', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)' },
  legal: { name: 'LegalTech & CST Compliance', nameEn: 'LegalTech & CST Compliance', color: '#A78BFA', glow: 'rgba(167, 139, 250, 0.4)' },
  cognitive: { name: 'Telemetría Cognitiva & LLM', nameEn: 'Cognitive Telemetry & LLM', color: '#34D399', glow: 'rgba(52, 211, 153, 0.4)' }
};

const SEMANTIC_NODES: SemanticNode[] = [
  // Cluster Pricing
  { id: 'p1', name: 'ARES Scraper Engine', nameEn: 'ARES Scraper Engine', cluster: 'pricing', x: -140, y: -80, z: 90, weight: 1.2, description: 'Crawler asíncrono distribuido con alta concurrencia y persistencia de sesión.', descriptionEn: 'Distributed async crawler with high concurrency and session persistence.', tags: ['Scraping', 'HTTP/2', 'FastAPI'] },
  { id: 'p2', name: 'Dynamic Pricing Matcher', nameEn: 'Dynamic Pricing Matcher', cluster: 'pricing', x: -180, y: -20, z: 40, weight: 1.0, description: 'Motor de casamiento difuso de catálogos y normalización de SKUs.', descriptionEn: 'Fuzzy catalog matching and SKU normalization engine.', tags: ['E-Commerce', 'NLP', 'Pricing'] },
  { id: 'p3', name: 'Elasticidad & Margen B2B', nameEn: 'B2B Elasticity & Margin', cluster: 'pricing', x: -110, y: -120, z: -30, weight: 0.9, description: 'Modelo econométrico de elasticidad de demanda y umbrales de margen.', descriptionEn: 'Econometric demand elasticity and margin threshold model.', tags: ['Econometría', 'Elasticidad'] },
  { id: 'p4', name: 'Retail Scraper Alkosto/Éxito', nameEn: 'Retail Scraper Alkosto/Éxito', cluster: 'pricing', x: -90, y: -40, z: 120, weight: 1.1, description: 'Adaptadores específicos de extracción DOM y renderizado headless.', descriptionEn: 'Specialized DOM extraction and headless rendering adapters.', tags: ['DOM', 'Playwright'] },

  // Cluster Territorial
  { id: 't1', name: 'Censo RNEC Oficial 2026', nameEn: 'Official 2026 RNEC Census', cluster: 'territorial', x: 130, y: -90, z: 80, weight: 1.3, description: 'Padrón electoral certificado con 6.12M votantes y hash SHA-256.', descriptionEn: 'Certified electoral roll with 6.12M voters and SHA-256 hash.', tags: ['Registraduría', 'Censo 2026', 'Demografía'] },
  { id: 't2', name: 'Bogotá Santa Fe Hub', nameEn: 'Bogotá Santa Fe Hub', cluster: 'territorial', x: 170, y: -30, z: 30, weight: 1.0, description: 'Micro-segmentación de 91 puestos de votación y 36 barrios.', descriptionEn: 'Micro-segmentation of 91 polling stations and 36 neighborhoods.', tags: ['Santa Fe', 'Alcaldía', 'GeoJSON'] },
  { id: 't3', name: 'GeoJSON Manifold Local', nameEn: 'Local GeoJSON Manifold', cluster: 'territorial', x: 120, y: -130, z: -40, weight: 0.9, description: 'Polígonos espaciales vectorizados con indexación R-Tree.', descriptionEn: 'Vectorized spatial polygons with R-Tree indexing.', tags: ['GIS', 'Mapas', 'Leaflet'] },
  { id: 't4', name: 'Densidad Ponderada', nameEn: 'Weighted Density Estimator', cluster: 'territorial', x: 90, y: -40, z: 130, weight: 1.0, description: 'Estimador de afluencia y potencial de movilización electoral.', descriptionEn: 'Turnout estimator and territorial mobilization potential.', tags: ['Telemetría', 'Analítica'] },

  // Cluster Legal
  { id: 'l1', name: 'CST Art. 23 Subordinación', nameEn: 'CST Art. 23 Subordination', cluster: 'legal', x: -120, y: 110, z: 70, weight: 1.2, description: 'Auditor algorítmico de riesgo de contrato realidad y primacía de hechos.', descriptionEn: 'Algorithmic auditor for de-facto employment risk and primacy of facts.', tags: ['CST', 'Laboral', 'Compliance'] },
  { id: 'l2', name: 'Firma & Hash SHA-256', nameEn: 'SHA-256 Signature & Hash', cluster: 'legal', x: -160, y: 70, z: -50, weight: 1.0, description: 'Inmutabilidad criptográfica de reportes de auditoría y evidencias.', descriptionEn: 'Cryptographic immutability for audit reports and evidence logs.', tags: ['Criptografía', 'Integridad'] },
  { id: 'l3', name: 'MinHash Deduplicator L7', nameEn: 'L7 MinHash Deduplicator', cluster: 'legal', x: -80, y: 150, z: 20, weight: 1.1, description: 'Detección de cláusulas abusivas mediante Jaccard hashing en memoria.', descriptionEn: 'Abusive clause detection via in-memory Jaccard hashing.', tags: ['MinHash', 'Deduplicación'] },
  { id: 'l4', name: 'Contrato Prestación de Servicios', nameEn: 'Independent Contractor Shield', cluster: 'legal', x: -70, y: 80, z: 120, weight: 0.9, description: 'Validación de autonomía técnica y no fijación de horarios estrictos.', descriptionEn: 'Validation of technical autonomy and non-subordinated scheduling.', tags: ['Jurisprudencia', 'CSJ'] },

  // Cluster Cognitivo & LLM
  { id: 'c1', name: 'Variedad Latente 768d', nameEn: '768d Latent Manifold', cluster: 'cognitive', x: 120, y: 100, z: 80, weight: 1.3, description: 'Proyección 3D de alta fidelidad del espacio de Hilbert de embeddings.', descriptionEn: 'High-fidelity 3D projection of the Hilbert embedding space.', tags: ['Embeddings', 'PCA', 'Álgebra'] },
  { id: 'c2', name: 'Thinking Token Engine', nameEn: 'Thinking Token Engine', cluster: 'cognitive', x: 160, y: 60, z: -40, weight: 1.2, description: 'Telemetría de la cadena interna de razonamiento previo al output.', descriptionEn: 'Telemetry of the internal reasoning chain prior to final output.', tags: ['Reasoning', 'Tokens', 'Inferencia'] },
  { id: 'c3', name: 'Scaled Dot-Product Attention', nameEn: 'Scaled Dot-Product Attention', cluster: 'cognitive', x: 80, y: 140, z: 30, weight: 1.1, description: 'Matriz softmax de atención cruzada entre vectores de consulta y clave.', descriptionEn: 'Cross-attention softmax matrix between query and key vectors.', tags: ['Transformers', 'Atención'] },
  { id: 'c4', name: 'KV Cache Compressor', nameEn: 'KV Cache Compressor', cluster: 'cognitive', x: 90, y: 70, z: 130, weight: 1.0, description: 'Optimización de memoria VRAM para contextos masivos en producción.', descriptionEn: 'VRAM memory optimization for massive production contexts.', tags: ['VRAM', 'Cuantización'] }
];

export function NovuxEng003NeuralMatrix3D() {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<'3d_manifold' | 'attention_matrix' | 'fine_tuning'>('3d_manifold');

  // Estados de cámara y rotación 3D
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.6 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedNode, setSelectedNode] = useState<SemanticNode | null>(SEMANTIC_NODES[0]);
  const [hoveredNode] = useState<SemanticNode | null>(null);

  // Parámetros de Inferencia y Telemetría
  const [temperature, setTemperature] = useState(0.25);
  const [topP, setTopP] = useState(0.85);
  const [activePreset, setActivePreset] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [telemetry, setTelemetry] = useState({
    thinkingTokens: 684,
    outputTokens: 218,
    latencyMs: 14.2,
    compressionRatio: 76.4,
    cosineCoherence: 0.941
  });

  const PRESETS = [
    {
      title: lang === 'en' ? 'Retail Price Audit' : 'Auditoría Precios Retail',
      prompt: lang === 'en'
        ? 'Compare Éxito and Alkosto SKUs using MinHash and calibrate price elasticity.'
        : 'Comparar SKUs de Éxito y Alkosto con MinHash y calibrar elasticidad de precios.',
      targetCluster: 'pricing'
    },
    {
      title: lang === 'en' ? 'Santa Fe Electoral Census' : 'Censo Electoral Santa Fe',
      prompt: lang === 'en'
        ? 'Cross-reference official 2026 RNEC voter roll with 91 Bogotá polling stations.'
        : 'Cruzar padrón oficial RNEC 2026 con 91 puestos de votación de Bogotá.',
      targetCluster: 'territorial'
    },
    {
      title: lang === 'en' ? 'CST Art. 23 Compliance' : 'Compliance CST Art. 23',
      prompt: lang === 'en'
        ? 'Audit disguised labor subordination and certify SHA-256 contract hash.'
        : 'Auditar subordinación laboral encubierta y certificar hash SHA-256 en contratos.',
      targetCluster: 'legal'
    },
    {
      title: lang === 'en' ? '768d Manifold Compression' : 'Compresión de Variedad 768d',
      prompt: lang === 'en'
        ? 'Measure thinking tokens and cross-attention dispersion in reasoning model.'
        : 'Medir thinking tokens y dispersión de atención cruzada en modelo de razonamiento.',
      targetCluster: 'cognitive'
    }
  ];

  // Motor de Renderizado 3D en Canvas HTML5 Nativo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let localRot = { ...rotation };

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      if (autoRotate && !isDragging) {
        localRot.y += 0.004;
        localRot.x = Math.sin(Date.now() * 0.0005) * 0.2 + 0.3;
      }

      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      const cosX = Math.cos(localRot.x);
      const sinX = Math.sin(localRot.x);
      const cosY = Math.cos(localRot.y);
      const sinY = Math.sin(localRot.y);

      const projected = SEMANTIC_NODES.map(node => {
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        const distance = 420;
        const scale = fov / (distance + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        return {
          node,
          px,
          py,
          scale,
          z2,
          color: CLUSTERS[node.cluster].color
        };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];

          const sameCluster = a.node.cluster === b.node.cluster;
          const isSelected = selectedNode && (a.node.id === selectedNode.id || b.node.id === selectedNode.id);
          const isHovered = hoveredNode && (a.node.id === hoveredNode.id || b.node.id === hoveredNode.id);

          let opacity = sameCluster ? 0.22 : 0.04;
          if (isSelected) opacity = sameCluster ? 0.8 : 0.4;
          if (isHovered) opacity = 0.6;
          if (isSimulating) opacity = sameCluster ? 0.6 + Math.sin(Date.now() * 0.01 + i) * 0.3 : 0.15;

          if (opacity > 0.05) {
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = isSelected 
              ? '#FFE066' 
              : sameCluster ? a.color : 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = isSelected ? 1.8 : 1.0;
            ctx.globalAlpha = Math.max(0.05, Math.min(1, opacity));
            ctx.stroke();

            if (isSimulating && sameCluster) {
              const progress = ((Date.now() * 0.002 + (i + j) * 0.2) % 1);
              const photonX = a.px + (b.px - a.px) * progress;
              const photonY = a.py + (b.py - a.py) * progress;
              ctx.beginPath();
              ctx.arc(photonX, photonY, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.shadowColor = '#FFE066';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      projected.forEach(p => {
        const radius = Math.max(3, (5 + p.node.weight * 2.5) * p.scale);
        const isSel = selectedNode?.id === p.node.id;
        const isHov = hoveredNode?.id === p.node.id;

        ctx.globalAlpha = 1;

        if (isSel || isHov || isSimulating) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isSel ? 'rgba(255, 224, 102, 0.25)' : CLUSTERS[p.node.cluster].glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSel ? '#FFE066' : p.color;
        ctx.shadowColor = isSel ? '#FFE066' : p.color;
        ctx.shadowBlur = isSel ? 15 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (isSel || isHov || p.scale > 0.95) {
          ctx.font = `${Math.max(9, Math.round(11 * p.scale))}px monospace`;
          ctx.fillStyle = isSel ? '#FFE066' : '#E4E4E7';
          ctx.fillText(lang === 'en' ? p.node.nameEn : p.node.name, p.px + radius + 6, p.py + 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation, autoRotate, isDragging, selectedNode, hoveredNode, isSimulating, lang]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x + dy * 0.008)),
      y: prev.y + dx * 0.008
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRunSimulation = () => {
    sfx.playClick();
    setIsSimulating(true);

    const preset = PRESETS[activePreset];
    const matchNode = SEMANTIC_NODES.find(n => n.cluster === preset.targetCluster) || SEMANTIC_NODES[0];
    setSelectedNode(matchNode);

    setTimeout(() => {
      setTelemetry({
        thinkingTokens: Math.floor(650 + Math.random() * 320),
        outputTokens: Math.floor(190 + Math.random() * 90),
        latencyMs: Number((12.5 + Math.random() * 4).toFixed(1)),
        compressionRatio: Number((72 + Math.random() * 8).toFixed(1)),
        cosineCoherence: Number((0.92 + Math.random() * 0.06).toFixed(3))
      });
      setIsSimulating(false);
      sfx.playSelect();
    }, 1800);
  };

  return (
    <div className="w-full bg-[#0b0b10] border border-[#C5A059]/30 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.8)]">
      {/* Barra de Título Superior L7 */}
      <div className="bg-[#0e0e16] border-b border-zinc-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#C5A059]">
            <Orbit size={18} className="animate-spin" style={{ animationDuration: '14s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A059] font-bold tracking-widest uppercase">NVX-ENG-003</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono">LIVE 3D</span>
            </div>
            <h3 className="text-sm sm:text-base font-serif text-white font-medium">
              {lang === 'en'
                ? 'NeuralMatrix 3D // Semantic Manifolds & Cognitive Telemetry'
                : 'NeuralMatrix 3D // Variedades Semánticas & Telemetría Cognitiva'}
            </h3>
          </div>
        </div>

        {/* Pestañas del Lab */}
        <div className="flex items-center gap-1.5 bg-[#08080d] p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => { sfx.playHover(); setActiveTab('3d_manifold'); }}
            className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === '3d_manifold' ? 'bg-[#C5A059] text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass size={13} />
            <span>Manifold 3D</span>
          </button>
          <button
            onClick={() => { sfx.playHover(); setActiveTab('attention_matrix'); }}
            className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'attention_matrix' ? 'bg-[#C5A059] text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>{lang === 'en' ? 'Softmax Attention' : 'Atención Softmax'}</span>
          </button>
          <button
            onClick={() => { sfx.playHover(); setActiveTab('fine_tuning'); }}
            className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fine_tuning' ? 'bg-[#C5A059] text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Activity size={13} />
            <span>Loss Monitor</span>
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[520px]">
        {/* Columna Izquierda / Centro: Canvas 3D Interactivo */}
        <div className="lg:col-span-8 relative bg-radial from-[#12121e] to-[#08080d] border-b lg:border-b-0 lg:border-r border-zinc-800/80 flex flex-col">
          {/* Overlay de Leyenda de Clusters */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 pointer-events-none">
            {Object.entries(CLUSTERS).map(([key, item]) => (
              <div 
                key={key} 
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0b0b14]/85 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{lang === 'en' ? item.nameEn : item.name}</span>
              </div>
            ))}
          </div>

          {/* Controles de Vista de Cámara */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <button
              onClick={() => {
                sfx.playHover();
                setAutoRotate(!autoRotate);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoRotate 
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]' 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400'
              }`}
            >
              <RotateCcw size={12} className={autoRotate ? 'animate-spin' : ''} />
              <span>
                {autoRotate
                  ? (lang === 'en' ? 'Auto-Orbit: ON' : 'Auto-Órbita: ON')
                  : (lang === 'en' ? 'Auto-Orbit: PAUSE' : 'Auto-Órbita: PAUSA')}
              </span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
              {lang === 'en' ? '[Drag with mouse to rotate in 3D]' : '[Arrastre con el mouse para rotar en 3D]'}
            </span>
          </div>

          {/* Canvas WebGL / 3D */}
          <div className="flex-1 w-full h-[360px] sm:h-[460px] relative cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full block"
            />
          </div>

          {/* Inspector de Nodo Seleccionado */}
          {selectedNode && (
            <div className="p-3 bg-[#0d0d17] border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
                  style={{ backgroundColor: CLUSTERS[selectedNode.cluster].color }} 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-mono font-bold text-white uppercase">
                      {lang === 'en' ? selectedNode.nameEn : selectedNode.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#C5A059]">
                      Cluster: {lang === 'en' ? CLUSTERS[selectedNode.cluster].nameEn : CLUSTERS[selectedNode.cluster].name}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 max-w-xl line-clamp-1">
                    {lang === 'en' ? selectedNode.descriptionEn : selectedNode.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  x: {selectedNode.x}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  y: {selectedNode.y}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  z: {selectedNode.z}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Cuaderno de Mando & Telemetría en Vivo */}
        <div className="lg:col-span-4 bg-[#0a0a0f] p-4 flex flex-col justify-between gap-4">
          <div>
            {/* Encabezado Telemetría */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <div className="flex items-center gap-1.5">
                <Activity size={16} className="text-[#34D399]" />
                <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                  {lang === 'en' ? 'Cognitive Telemetry' : 'Telemetría Cognitiva'}
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                {lang === 'en' ? '60 Hz Sampling' : 'Muestreo a 60 Hz'}
              </span>
            </div>

            {/* Presets de Consulta */}
            <div className="mb-4">
              <label className="text-[11px] font-mono text-zinc-400 mb-1.5 block">
                {lang === 'en' ? 'Semantic Query / Prompt Test:' : 'Consulta Semántica / Prompt Test:'}
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sfx.playHover();
                      setActivePreset(idx);
                      const target = SEMANTIC_NODES.find(n => n.cluster === preset.targetCluster);
                      if (target) setSelectedNode(target);
                    }}
                    className={`p-2 rounded text-left transition-all cursor-pointer border text-[11px] font-mono ${
                      activePreset === idx
                        ? 'bg-[#C5A059]/15 border-[#C5A059] text-white font-medium shadow-[0_0_10px_rgba(197,160,89,0.2)]'
                        : 'bg-[#0f0f18] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="truncate">{preset.title}</div>
                  </button>
                ))}
              </div>
              <div className="p-2 rounded bg-black/40 border border-zinc-800/80 text-[11px] font-mono text-zinc-300">
                "{PRESETS[activePreset].prompt}"
              </div>
            </div>

            {/* Controles de Inferencia */}
            <div className="space-y-3 mb-4 p-3 rounded-lg bg-[#0e0e16] border border-zinc-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Sliders size={12} className="text-[#C5A059]" /> {lang === 'en' ? 'Temperature (Entropy):' : 'Temperatura (Entropy):'}
                </span>
                <span className="text-[#C5A059] font-bold">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />

              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="text-zinc-400">Nucleus Sampling (Top-P):</span>
                <span className="text-white font-bold">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={e => setTopP(parseFloat(e.target.value))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
            </div>

            {/* Cuadros de Métricas Vivas */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-lg bg-[#0e0e16] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Thinking Tokens</div>
                <div className="text-lg font-mono font-bold text-[#FFE066] flex items-center gap-1.5 mt-0.5">
                  <Cpu size={15} />
                  <span>{isSimulating ? '...' : telemetry.thinkingTokens}</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 mt-1">
                  {lang === 'en' ? 'Pre-output reasoning chain' : 'Cadena previa a output'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0e0e16] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                  {lang === 'en' ? 'Latency / Token' : 'Latencia / Token'}
                </div>
                <div className="text-lg font-mono font-bold text-[#34D399] flex items-center gap-1.5 mt-0.5">
                  <Gauge size={15} />
                  <span>{telemetry.latencyMs} ms</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 mt-1">
                  {lang === 'en' ? 'Quantized L7 engine' : 'Motor L7 cuantizado'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0e0e16] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                  {lang === 'en' ? 'Context Compression' : 'Compresión Contexto'}
                </div>
                <div className="text-lg font-mono font-bold text-[#38BDF8] flex items-center gap-1.5 mt-0.5">
                  <Layers size={15} />
                  <span>{telemetry.compressionRatio}%</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 mt-1">
                  {lang === 'en' ? 'MinHash + Deduplication' : 'MinHash + Deduplicación'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0e0e16] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                  {lang === 'en' ? 'Cosine Similarity' : 'Similitud Coseno'}
                </div>
                <div className="text-lg font-mono font-bold text-[#A78BFA] flex items-center gap-1.5 mt-0.5">
                  <Compass size={15} />
                  <span>{telemetry.cosineCoherence}</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 mt-1">
                  {lang === 'en' ? 'Semantic coherence' : 'Coherencia semántica'}
                </div>
              </div>
            </div>
          </div>

          {/* Botón de Ejecución */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSimulating
                ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#C5A059] to-[#E5C07B] text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:shadow-[0_0_30px_rgba(197,160,89,0.7)]'
            }`}
          >
            {isSimulating ? (
              <>
                <Cpu size={16} className="animate-spin text-zinc-400" />
                <span>{lang === 'en' ? 'Computing Vector Manifold...' : 'Computando Variedad Vectorial...'}</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>{lang === 'en' ? 'Simulate Cognitive Reasoning' : 'Simular Razonamiento Cognitivo'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
