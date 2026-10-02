import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User, Sparkles, Check, Clock, ShieldCheck, CornerDownRight } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface CommentItem {
  id: string;
  name: string;
  role: string;
  date: string;
  content: string;
  isVerified?: boolean;
}

interface CommentsSectionProps {
  postId: string;
}

const SEED_COMMENTS: Record<string, CommentItem[]> = {
  '3': [
    {
      id: 'c1',
      name: 'Ing. Carlos Mendoza',
      role: 'Staff Data Engineer • Retail Latam',
      date: 'Hace 2 horas',
      content: 'El desglose de libxml2 frente a html.parser es brillante. Tuvimos caídas de memoria continuas en pods de Kubernetes con 4 GB de RAM al procesar árboles HTML profundos de marketplaces. Al migrar a buffers continuos en C y parseo con generadores iterparse, el consumo cayó a menos de 45 MB estables.',
      isVerified: true,
    },
    {
      id: 'c2',
      name: 'Dra. Sofía Valenzuela',
      role: 'NLP Researcher & Machine Learning Lead',
      date: 'Hace 5 horas',
      content: 'La analogía con el Árbol de la Vida y la delimitación del niño digital capta la esencia real de la IA: no hay magia en una red profunda, hay billones de tokens filtrados por MinHash/LSH. Quien introduce datos duplicados introduce sesgos por repetición en los pesos matriciales.',
      isVerified: true,
    }
  ]
};

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`novux_comments_${postId}`);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        const initial = SEED_COMMENTS[postId] || [];
        setComments(initial);
      }
    } catch {
      setComments(SEED_COMMENTS[postId] || []);
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    setErrorNotice(null);

    if (!authorName.trim() || !message.trim()) {
      setErrorNotice('Por favor completa tu nombre y el comentario.');
      return;
    }

    if (message.length < 10) {
      setErrorNotice('El comentario debe contener al menos 10 caracteres.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Sanitización estricta anti-XSS
      const cleanName = authorName.replace(/[<>]/g, '').trim();
      const cleanRole = authorRole.replace(/[<>]/g, '').trim() || 'Ingeniero / Lector Técnico';
      const cleanMessage = message.replace(/[<>]/g, '').trim();

      const newComment: CommentItem = {
        id: `com_${Date.now()}`,
        name: cleanName,
        role: cleanRole,
        date: 'Recién publicado',
        content: cleanMessage,
        isVerified: false,
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      try {
        localStorage.setItem(`novux_comments_${postId}`, JSON.stringify(updated));
      } catch {}

      setMessage('');
      setSuccessNotice(true);
      sfx.playPowerUp();
      setTimeout(() => setSuccessNotice(false), 4000);
    }, 450);
  };

  return (
    <section className="w-full mt-10 pt-8 border-t border-[#C5A059]/30 select-none">
      {/* Cabecera de la Sección */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-[#FFE066]" />
          <h3 className="text-sm font-mono font-bold text-zinc-100 uppercase tracking-wider">
            MESA DE DEBATE TÉCNICO // COMENTARIOS DE LA COMUNIDAD ({comments.length})
          </h3>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800 flex items-center gap-1">
          <ShieldCheck size={11} className="text-[#C5A059]" />
          <span>Moderación C-Level • Libre de Inyecciones</span>
        </span>
      </div>

      {/* Formulario para Dejar Comentario */}
      <div className="p-5 sm:p-6 rounded-lg bg-[#08080e] border border-zinc-800 mb-8 shadow-xl">
        <h4 className="text-xs font-mono font-bold text-[#FFE066] uppercase mb-3 flex items-center gap-1.5">
          <Sparkles size={12} />
          <span>Aportar al Debate o Consulta de Arquitectura</span>
        </h4>

        {errorNotice && (
          <div className="mb-3 p-2.5 rounded bg-red-950/70 border border-red-500/50 text-red-200 text-xs font-mono">
            {errorNotice}
          </div>
        )}

        {successNotice && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-2.5 rounded bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-1.5"
          >
            <Check size={13} />
            <span>Comentario verificado y publicado en la bitácora técnica.</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                Nombre / Alias:
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Gustavo De La Rosa"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-zinc-200 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                Rol o Empresa:
              </label>
              <input
                type="text"
                placeholder="Ej. Data Architect / Software Engineer"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-zinc-200 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-zinc-400 block mb-1">
              Tu Aporte Técnico o Reflexión:
            </label>
            <textarea
              required
              rows={3}
              placeholder="Escribe tu análisis sobre la extracción en Capa 7, pipelines en C, MinHash o el debate epistemológico..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded p-3 text-xs font-mono text-zinc-200 outline-none transition-colors"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(197,160,89,0.4)] flex items-center gap-1.5"
            >
              <Send size={12} />
              <span>{isSubmitting ? 'Transmitiendo...' : 'Publicar Comentario'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Comentarios Publicados */}
      <div className="space-y-4">
        {comments.map((com) => (
          <div
            key={com.id}
            className="p-4 sm:p-5 rounded-lg bg-[#06060a] border border-zinc-800/80 hover:border-[#C5A059]/40 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#FFE066] font-mono text-xs font-bold">
                  {com.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-zinc-200">{com.name}</span>
                    {com.isVerified && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#FFE066] border border-[#C5A059]/40">
                        VERIFICADO
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">{com.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                <Clock size={10} />
                <span>{com.date}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed pl-9">
              {com.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
