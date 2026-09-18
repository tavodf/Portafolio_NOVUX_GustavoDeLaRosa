import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Tag, User, Play, Check, Copy, Terminal, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { sfx } from '../utils/soundEffects';
import ReactMarkdown from 'react-markdown';

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

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(pythonCode);
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

  const handleShare = () => {
    sfx.playClick();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
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
          className="group inline-flex items-center gap-2 border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0e0e12]/80 hover:bg-[#C5A059]/15 text-[#C5A059] px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-md"
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

      {/* Tarjeta / Caja sólida para lectura sin distracción de la lluvia Matrix */}
      <div className="w-full bg-[#0c0c12] border border-[#C5A059]/35 rounded-xl p-6 sm:p-10 md:p-12 shadow-[0_16px_60px_rgba(0,0,0,0.95)] relative z-10">
        
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
                onClick={() => onSelectTag && onSelectTag(tag)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#16161f] border border-zinc-800 text-[#C5A059] text-xs font-mono cursor-pointer hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
              >
                <Tag size={10} />
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Imagen Principal */}
        {post.image && !imageError && (
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
              // Archivo fotográfico • Espacio de deconstrucción
            </div>
          </div>
        )}

        {/* Caja de Lectura del Cuerpo del Artículo */}
        <div className="bg-[#08080c] border border-zinc-800/80 rounded-lg p-6 sm:p-8 md:p-10 shadow-inner">
          <div className="prose prose-invert max-w-none text-zinc-200 text-base md:text-lg leading-relaxed space-y-6 font-normal">
            <p>
              Python se cruzó en mi camino allá por 2023. Me estalló en la cara como un lenguaje que venía a cambiar paradigmas —y así fue: transformó la industria hasta convertirse en el pilar fundamental de la inteligencia artificial moderna.
            </p>

            <p>
              Tenía bases de programación por mis estudios de ingeniería; una carrera que no terminé, pero que dejó una puerta permanentemente abierta en mi conciencia. Después de todo, no hay nada que disfrute más que pasar horas frente al teclado. El teclado se siente como un piano: cada pulsación genera una música circundante, un compás rítmico que me produce un bienestar difícil de explicar. Me recuerda a mi madre frente a su máquina de escribir redactando ensayos universitarios; me recuerda a mi padre con sus giros creativos y palabras meticulosamente buscadas, a las que hoy admiro con método. Somos una familia de ideólogos.
            </p>

            <p>
              En ese punto, Python llegó como el vehículo exacto para expresar mis ideas lógicas y deconstruir conceptos. Me permitió modelar objetos y flujos estructurados que evocaban el fondo metafórico de <em className="text-[#FFE066] not-italic font-medium">The Matrix</em>: un torrente de datos en caída continua donde quien domina la sintaxis es quien realmente moldea la realidad.
            </p>

            <p>
              Ahí nació una ambición clara: construir metodologías prácticas a partir de condicionales y bucles, recorriendo métodos e iteradores donde el código no se define por la complejidad innecesaria, sino por el minimalismo de su sintaxis. Hay una belleza singular en la idea de que una palabra sea un objeto, un objeto adquiera una forma y esa forma defina un contexto. Así se estructuró Python en mi mente.
            </p>

            <p>
              A esto se sumó mi materia favorita en la universidad: <span className="text-[#C5A059] font-medium">álgebra lineal</span>. Ver cómo las matrices y los espacios vectoriales transformaban el plano teórico en dimensiones operativas convirtió mi realidad en la analogía de un arreglo matricial. Python no llegó a mi vida por azar; llegó por la necesidad de interpretar el mundo desde la tridimensionalidad semántica de las palabras y los datos.
            </p>

            <div className="my-10 border-t border-zinc-800" />

            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#C5A059] font-mono">###</span> La Representación: Del Concepto al Espacio Vectorial
            </h3>

            <p>
              Para materializar esta analogía en código reproducible, proyectamos cada idea hacia un tensor tridimensional donde cada eje representa un componente operativo (<span className="text-[#C5A059] font-mono">X</span>: Lógica / Sintaxis, <span className="text-[#C5A059] font-mono">Y</span>: Cadencia / Ritmo, <span className="text-[#C5A059] font-mono">Z</span>: Estructura / Abstracción).
            </p>

            <p>
              A continuación, el script en NumPy que modela la proyección espacial y calcula el centroide semántico resultante. Presiona el botón <span className="text-[#FFE066] font-mono font-bold">[ Ejecutar ]</span> para compilar la transformación y desplegar el plano vectorial directamente en la terminal:
            </p>

            {/* Bloque Interactivo de Código Python */}
            <div className="my-6 rounded-lg overflow-hidden border border-[#C5A059]/40 bg-[#0a0a0f] shadow-2xl">
              {/* Barra superior de terminal */}
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
                    title="Ejecutar transformación y renderizar plano vectorial"
                  >
                    <Play size={11} className="fill-current" />
                    <span>{isExecuting ? 'Calculando...' : showTerminalOutput ? 'Re-ejecutar' : 'Ejecutar'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    onMouseEnter={() => sfx.playHover()}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white px-2.5 py-1 rounded text-xs font-mono hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Copiar código fuente"
                  >
                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Código Fuente con estilo terminal */}
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed selection:bg-[#C5A059]/30">
                <code>{pythonCode}</code>
              </pre>

              {/* Salida de Terminal Interactiva & Despliegue del Plano Vectorial */}
              {showTerminalOutput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                  className="border-t border-[#C5A059]/40 bg-[#040406] p-5 font-mono text-xs"
                >
                  {/* Línea de comando simulada */}
                  <div className="flex items-center justify-between text-zinc-500 text-[11px] mb-2 pb-2 border-b border-zinc-800/80">
                    <span className="text-[#C5A059] flex items-center gap-1.5">
                      <Terminal size={12} />
                      $ python -u proyeccion_semantica.py
                    </span>
                    <span className="text-zinc-600">// Runtime: Python 3.11 • NumPy Engine</span>
                  </div>

                  {/* Salida estándar del print(Esto_es_vida) */}
                  <div className="mb-4 bg-black/60 p-3 rounded border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block mb-1">
                      SALIDA ESTÁNDAR (stdout):
                    </span>
                    <div className="text-[#FFE066] font-bold text-sm">
                      Vector de Estado: [1.378, 1.408, 1.341] | Dim: (4, 3)
                    </div>
                  </div>

                  {/* Plano Vectorial Proyectado en R^3 */}
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

                    <div className="mt-3 pt-2.5 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-wrap gap-4">
                      <span><strong className="text-zinc-300">X (Lógica):</strong> 1.378</span>
                      <span><strong className="text-zinc-300">Y (Cadencia):</strong> 1.408</span>
                      <span><strong className="text-zinc-300">Z (Estructura):</strong> 1.341</span>
                      <span className="text-[#C5A059] font-bold">Estado: 'Esto_es_vida'</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
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
