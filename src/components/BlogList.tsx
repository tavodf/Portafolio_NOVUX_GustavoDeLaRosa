import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, ChevronRight, Search } from 'lucide-react';
import { BlogPost } from '../types';
import { sfx } from '../utils/soundEffects';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onBackToHome: () => void;
  initialTag?: string | null;
}

export function BlogList({ posts, onSelectPost, onBackToHome, initialTag = null }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const [searchQuery, setSearchQuery] = useState('');

  // Extraer todos los tags únicos
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  );

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  const handlePostClick = (post: BlogPost) => {
    sfx.playSelect();
    onSelectPost(post);
  };

  const handleTagFilter = (tag: string | null) => {
    sfx.playClick();
    setSelectedTag(tag);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12"
    >
      {/* Botón de Regreso al Home */}
      <div className="mb-8">
        <button
          onClick={() => {
            sfx.playBack();
            onBackToHome();
          }}
          onMouseEnter={() => sfx.playHover()}
          className="group inline-flex items-center gap-2 border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0e0e12]/80 hover:bg-[#C5A059]/15 text-[#C5A059] px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </button>
      </div>

      {/* Cabecera del Blog / Radar */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-mono mb-3">
          <BookOpen size={12} />
          <span>RADAR TÉCNICO & DISPATCHES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Bitácora & Artículos
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-light">
          Reflexiones sobre ingeniería de software, arquitectura de datos, álgebra lineal y deconstrucción de sistemas.
        </p>
      </div>

      {/* Barra de Búsqueda y Filtros de Tags */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e0e13]/70 border border-zinc-800 p-4 rounded-lg backdrop-blur-sm">
        {/* Filtros de tags */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => handleTagFilter(null)}
            onMouseEnter={() => sfx.playHover()}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedTag === null
                ? 'bg-[#C5A059] text-black font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilter(selectedTag === tag ? null : tag)}
              onMouseEnter={() => sfx.playHover()}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-[#C5A059] border border-zinc-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Input de Búsqueda */}
        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar artículo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-zinc-800 focus:border-[#C5A059] text-zinc-200 text-xs font-mono rounded pl-9 pr-3 py-2 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Lista de Artículos */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 font-mono text-sm border border-zinc-900 rounded-lg">
            No se encontraron artículos con los criterios seleccionados.
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
              onClick={() => handlePostClick(post)}
              onMouseEnter={() => sfx.playHover()}
              className="group bg-[#0e0e13]/85 hover:bg-[#13131c] border border-zinc-800 hover:border-[#C5A059] rounded-lg p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.18)] flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Imagen en miniatura si existe */}
              {post.image && (
                <div className="w-full md:w-48 h-44 rounded overflow-hidden border border-zinc-800 shrink-0 bg-black/80">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('googleusercontent.com/d/')) {
                        const match = target.src.match(/googleusercontent\.com\/d\/([^=]+)/);
                        if (match && match[1]) {
                          target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
                        }
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Contenido de la tarjeta */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 mb-2">
                    <span className="flex items-center gap-1 text-[#C5A059]">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFE066] transition-colors mb-2.5 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 mb-4 font-light">
                    {post.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C5A059] group-hover:translate-x-1 transition-transform">
                    <span>Leer Artículo</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </motion.div>
  );
}
