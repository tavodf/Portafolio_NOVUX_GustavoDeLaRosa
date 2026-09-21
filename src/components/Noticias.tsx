import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Share2, 
  Cpu, 
  Layers, 
  Building2, 
  Code2, 
  Database,
  BookOpen,
  CheckCircle2,
  Terminal,
  Bookmark
} from 'lucide-react';
import { techNews } from '../newsData';
import { TechNewsItem, NewsCategory } from '../types';
import { sfx } from '../utils/soundEffects';

interface NoticiasProps {
  onBackToHome: () => void;
}

const CATEGORIES: NewsCategory[] = [
  'Todas',
  'IA & Machine Learning',
  'Apps & Herramientas',
  'Avances Corporativos',
  'Recursos & Open Source',
  'Cloud & Datos'
];

export function Noticias({ onBackToHome }: NoticiasProps) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(techNews[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNews = techNews.filter((item) => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const handleToggleExpand = (id: string) => {
    sfx.playClick();
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSelectCategory = (cat: NewsCategory) => {
    sfx.playSelect();
    setSelectedCategory(cat);
  };

  const handleShare = (item: TechNewsItem) => {
    sfx.playPowerUp();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.title}\n\n${item.summary}\n\nPor: ${item.author || 'Gustavo De La Rosa'}`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'IA & Machine Learning':
        return <Cpu size={14} className="text-[#C5A059]" />;
      case 'Apps & Herramientas':
        return <Layers size={14} className="text-cyan-400" />;
      case 'Avances Corporativos':
        return <Building2 size={14} className="text-emerald-400" />;
      case 'Recursos & Open Source':
        return <Code2 size={14} className="text-amber-400" />;
      case 'Cloud & Datos':
        return <Database size={14} className="text-blue-400" />;
      default:
        return <Radio size={14} className="text-[#C5A059]" />;
    }
  };

  const getImpactBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'DISRUPCIÓN':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'LANZAMIENTO':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'TENDENCIA':
        return 'bg-[#C5A059]/25 text-[#FFE066] border-[#C5A059]/50';
      case 'AVANCE':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'RECURSO':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-5xl">
        
        {/* Barra superior de navegación */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C5A059]/20">
          <button
            onClick={() => {
              sfx.playBack();
              onBackToHome();
            }}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#FFE066] px-4 py-2 rounded-sm bg-[#101017]/90 border border-zinc-800 hover:border-[#C5A059] transition-all duration-300 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]"
          >
            <ArrowLeft size={14} className="text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Menú Principal</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
            <Radio size={14} className="animate-pulse text-[#FFE066]" />
            <span className="hidden sm:inline tracking-wider font-semibold">RADAR TÉCNICO & DESPACHOS</span>
          </div>
        </div>

        {/* Caja de Lectura Principal con Resplandor Dorado */}
        <div className="bg-[#0c0c12] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-sm p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.95)] hover:shadow-[0_0_40px_rgba(197,160,89,0.25)] transition-all duration-300 relative overflow-hidden">
          
          {/* Acentos de esquina */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

          {/* Encabezado editorial */}
          <div className="mb-8 border-b border-[#C5A059]/20 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] uppercase tracking-widest mb-2 font-bold">
              <Sparkles size={14} className="text-[#FFE066]" />
              <span>Observatorio Tecnológico & Artículos de Profundidad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-wide font-bold leading-tight">
              Noticias & Despachos de Ingeniería
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-light">
              Análisis exhaustivos, investigación de tendencias y arquitectura de sistemas curados por Gustavo De La Rosa. Cobertura crítica de avances en IA aplicada, ingeniería de datos y desarrollo de software de alta escala.
            </p>
          </div>

          {/* Controles de Búsqueda y Categorías */}
          <div className="space-y-4 mb-8">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar por tecnología, impacto o concepto (ej: Python, Rust, WebGPU, Agentes)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#111118] border border-zinc-800 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-sm text-zinc-200 placeholder-zinc-500 font-mono transition-all shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white font-mono cursor-pointer"
                >
                  [ Limpiar ]
                </button>
              )}
            </div>

            {/* Filtros de Categoría */}
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-mono transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#C5A059] text-black border-[#FFE066] font-bold shadow-[0_0_15px_rgba(197,160,89,0.4)]'
                        : 'bg-[#12121a] text-zinc-400 border-zinc-800 hover:border-[#C5A059]/60 hover:text-white hover:shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                    }`}
                  >
                    {category !== 'Todas' && getCategoryIcon(category)}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Listado de Noticias con Lectura Profunda y Resplandor al Hover */}
          {filteredNews.length === 0 ? (
            <div className="p-12 text-center border border-zinc-800 rounded-sm bg-[#07070a] text-zinc-400 font-mono text-sm">
              <Radio size={28} className="mx-auto mb-3 text-zinc-600" />
              <p>No se encontraron despachos que coincidan con la búsqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todas');
                }}
                className="mt-3 text-xs text-[#C5A059] hover:underline cursor-pointer"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((item, idx) => {
                const isExpanded = expandedId === item.id;

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative border border-zinc-800/90 hover:border-[#C5A059] bg-[#09090e]/95 rounded-sm p-5 sm:p-7 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
                  >
                    {/* Corner accents on hover */}
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors" />

                    {/* Metadatos superiores */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        {item.impactBadge && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${getImpactBadgeColor(item.impactBadge)}`}>
                            {item.impactBadge}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[#C5A059] font-medium bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/20">
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 flex items-center gap-1">
                          <Calendar size={11} />
                          {item.date}
                        </span>
                        {item.readTime && (
                          <>
                            <span className="text-zinc-600">•</span>
                            <span className="text-[#FFE066] flex items-center gap-1 font-semibold">
                              <Clock size={11} />
                              {item.readTime}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Fuente & Autor */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                        <span className="bg-black/50 px-2.5 py-0.5 rounded border border-zinc-800">
                          Fuente: <strong className="text-zinc-300">{item.source}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Título de la noticia */}
                    <h2 
                      className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug hover:text-[#FFE066] transition-colors cursor-pointer font-serif"
                      onClick={() => handleToggleExpand(item.id)}
                    >
                      {item.title}
                    </h2>

                    {/* Resumen ejecutivo */}
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                      {item.summary}
                    </p>

                    {/* Lectura Profunda Ampliada */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-4 pt-3"
                        >
                          {/* Párrafos de desarrollo profundo */}
                          {item.content && item.content.length > 0 && (
                            <div className="space-y-3.5 pt-2 text-zinc-200 text-sm sm:text-[15px] font-sans leading-relaxed border-t border-zinc-800/80">
                              {item.content.map((paragraph, pIdx) => (
                                <p key={pIdx} className="text-gray-300 font-light">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Puntos clave / Takeaways */}
                          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                            <div className="my-4 p-4 sm:p-5 rounded-sm bg-[#040408] border border-[#C5A059]/30 shadow-inner">
                              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold mb-3">
                                <Bookmark size={14} className="text-[#FFE066]" />
                                <span>Puntos Clave para la Toma de Decisiones:</span>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                                {item.keyTakeaways.map((takeaway, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-2.5">
                                    <CheckCircle2 size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Impacto en Arquitectura */}
                          {item.architectureImpact && (
                            <div className="p-4 rounded-sm bg-[#12121c]/80 border-l-2 border-[#C5A059] text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
                              <span className="text-[#C5A059] text-[11px] block mb-1 uppercase font-bold tracking-wider">
                                // IMPACTO EN ARQUITECTURA & SOFTWARE FACTORY:
                              </span>
                              {item.architectureImpact}
                            </div>
                          )}

                          {/* Firma de Autor */}
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-3 border-t border-zinc-900">
                            <span>Autor: <strong className="text-zinc-300">{item.author || 'Gustavo De La Rosa'}</strong></span>
                            <span className="text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Despacho validado
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Acciones y Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800/80 mt-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-[#FFE066] bg-[#121218] px-2 py-0.5 rounded border border-zinc-800 hover:border-[#C5A059]/40 cursor-pointer transition-colors"
                          >
                            <Tag size={9} />
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Botones de acción con Resplandor */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleExpand(item.id)}
                          onMouseEnter={() => sfx.playHover()}
                          className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A059] hover:text-black bg-[#C5A059]/10 hover:bg-[#C5A059] px-3.5 py-1.5 rounded-sm border border-[#C5A059]/40 hover:border-[#FFE066] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(197,160,89,0.5)] font-semibold"
                        >
                          <BookOpen size={13} className="text-[#C5A059] group-hover:text-black" />
                          <span>{isExpanded ? 'Contraer Despacho' : 'Leer Despacho Completo'}</span>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>

                        <button
                          onClick={() => handleShare(item)}
                          onMouseEnter={() => sfx.playHover()}
                          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-sm bg-black/40 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                          title="Copiar despacho al portapapeles"
                        >
                          <Share2 size={12} />
                          <span>{copiedId === item.id ? '¡Copiado!' : 'Compartir'}</span>
                        </button>

                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sfx.playSelect()}
                            onMouseEnter={() => sfx.playHover()}
                            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-[#FFE066] bg-black/60 px-2.5 py-1.5 rounded-sm border border-zinc-800 hover:border-[#C5A059]/50 transition-colors cursor-pointer"
                            title="Visitar recurso oficial"
                          >
                            <span>Fuente</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Pie informativo de la sección */}
          <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
            <span>// Despachos & Radar de Vanguardia • Curaduría por Gustavo De La Rosa</span>
            <span className="text-[#C5A059] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
              Nuevos artículos y análisis en preparación
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
