import { useState } from 'react';
import { Play, Copy, Check, Terminal, CheckCircle2, Code2, RotateCcw } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface PythonCodeBlockProps {
  codeString: string;
  onExecute?: () => void;
}

// Tokenizador de Python con resaltado de sintaxis
export function highlightPythonCode(code: string) {
  const lines = code.split('\n');
  let inMultiDocstring = false;

  return lines.map((line, lineIdx) => {
    // Manejo de Docstrings multilínea """ ... """
    const trimmed = line.trim();
    if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
      if (trimmed.length > 3 && (trimmed.endsWith('"""') || trimmed.endsWith("'''"))) {
        return (
          <div key={lineIdx} className="text-[#a1a1aa] italic">
            {line}
          </div>
        );
      }
      inMultiDocstring = !inMultiDocstring;
      return (
        <div key={lineIdx} className="text-[#a1a1aa] italic">
          {line}
        </div>
      );
    }

    if (inMultiDocstring) {
      if (trimmed.endsWith('"""') || trimmed.endsWith("'''")) {
        inMultiDocstring = false;
      }
      return (
        <div key={lineIdx} className="text-[#a1a1aa] italic">
          {line}
        </div>
      );
    }

    // Líneas que son comentarios puros #
    if (trimmed.startsWith('#')) {
      return (
        <div key={lineIdx} className="text-zinc-500 italic">
          {line}
        </div>
      );
    }

    // Tokenización por expresiones regulares respetando espacios
    const tokens: React.ReactNode[] = [];
    const regex = /(\s+)|(#.*$)|("""[\s\S]*?""")|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(@\w+)|(\b(?:class|def|return|yield|for|in|try|except|continue|if|not|and|or|as|from|import|with|pass|raise|while|lambda|is)\b)|(\b(?:self|cls)\b)|(\b(?:CanonicalProduct|MinHashDeduplicator|ScopedDOMParser|ArcadeTokenAuditor|Dict|BaseModel|Field|HttpUrl|Generator|List|Set|str|float|int|bytes|dict|bool|tuple)\b)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*(?=\())|([a-zA-Z_]\w*)|([^\s\w])/g;

    let match;
    let lastIdx = 0;
    let tokenKey = 0;

    while ((match = regex.exec(line)) !== null) {
      const [
        full,
        spaces,
        comment,
        docstring,
        str,
        decorator,
        keyword,
        selfKeyword,
        typeName,
        numberVal,
        funcName,
        ident,
        punct
      ] = match;

      if (spaces !== undefined) {
        tokens.push(<span key={tokenKey++}>{spaces}</span>);
      } else if (comment !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-zinc-500 italic">{comment}</span>);
      } else if (docstring !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#a1a1aa] italic">{docstring}</span>);
      } else if (str !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#4ade80]">{str}</span>);
      } else if (decorator !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#f43f5e] font-semibold">{decorator}</span>);
      } else if (keyword !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#c084fc] font-semibold">{keyword}</span>);
      } else if (selfKeyword !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#fb923c]">{selfKeyword}</span>);
      } else if (typeName !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#38bdf8] font-semibold">{typeName}</span>);
      } else if (numberVal !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#f472b6]">{numberVal}</span>);
      } else if (funcName !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-[#FFE066]">{funcName}</span>);
      } else if (ident !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-zinc-200">{ident}</span>);
      } else if (punct !== undefined) {
        tokens.push(<span key={tokenKey++} className="text-zinc-400">{punct}</span>);
      }
    }

    return (
      <div key={lineIdx} className="min-h-[1.25rem]">
        {tokens.length > 0 ? tokens : line}
      </div>
    );
  });
}

export function PythonCodeBlock({ codeString }: PythonCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<any | null>(null);

  const isArcade = codeString.includes('ArcadeTokenAuditor');

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    sfx.playBack();
    setOutput(null);
    setIsExecuting(false);
  };

  const handleExecute = () => {
    sfx.playSelect();
    setIsExecuting(true);
    setOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      if (isArcade) {
        setOutput({
          auditor: 'ArcadeTokenAuditor v1.2',
          pricingInputM: 2.50,
          pricingOutputM: 10.00,
          results: [
            {
              lang: 'en',
              sample: 'understanding the computational architecture of deep learning models',
              tokens: 10,
              chars: 69,
              char_per_token_ratio: 6.9,
              estimated_cost_usd_1M_queries: 25.00
            },
            {
              lang: 'es',
              sample: 'entendimiento de la arquitectura computacional de modelos de aprendizaje profundo',
              tokens: 24,
              chars: 80,
              char_per_token_ratio: 3.33,
              estimated_cost_usd_1M_queries: 60.00
            }
          ],
          linguistic_tax_surcharge: '+140% costo en llamadas equivalentes en español',
          recommendation: 'Aplicar podado léxico y codificación densa en formato JSON minificado.'
        });
      } else {
        setOutput({
          recordsExtracted: 2,
          durationMs: 1.18,
          ramUsedKb: 14.8,
          ramSavedPercent: 96.2,
          data: [
            {
              sku: 'MBP-M3M-36GB',
              name: 'Apple MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black',
              price: 3499.0,
              url: 'https://catalog.novux.internal/catalog/MBP-M3M-36GB',
              minhash_signature: [38912, 14209, 8812, 59124, 7120, 9421, 61092, 1284]
            },
            {
              sku: 'DELL-XPS15-OLED',
              name: 'Dell XPS 15 OLED Intel Core i9 32GB RAM 1TB SSD',
              price: 2699.5,
              url: 'https://catalog.novux.internal/catalog/DELL-XPS15-OLED',
              minhash_signature: [4129, 90214, 5521, 19402, 3810, 48129, 7721, 54912]
            }
          ]
        });
      }
      sfx.playPowerUp();
    }, 400);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[#C5A059]/40 bg-[#050509] shadow-2xl font-mono text-xs select-none">
      {/* Barra Superior con Controles */}
      <div className="bg-[#0f0f18] px-4 py-2.5 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="ml-2 text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
            <Code2 size={13} className="text-[#C5A059]" />
            {isArcade ? 'novux_arcade_token_auditor.py' : 'novux_l7_pipeline.py'}
          </span>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">
            {isArcade
              ? '// Python 3.12 • Unicode NFKC • Auditoría de Costos LLM'
              : '// C-Python 3.12 • libxml2 v2.12 • Pydantic v2'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {output && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-zinc-400 hover:text-[#FFE066] px-2.5 py-1 rounded bg-black/60 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer text-xs"
              title="Limpiar salida y devolver proceso"
            >
              <RotateCcw size={11} />
              <span>Limpiar</span>
            </button>
          )}

          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(197,160,89,0.4)] animate-pulse"
          >
            <Play size={11} className="fill-current" />
            <span>
              {isExecuting
                ? (isArcade ? 'Calculando fichas...' : 'Compilando en C...')
                : (isArcade ? '▶ Auditar Fichas & Costos' : '▶ Ejecutar Pipeline')}
            </span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-black/60 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer text-xs"
            title="Copiar código fuente"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* Contenedor del Código con Resaltado de Sintaxis */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-[11.5px] leading-relaxed max-h-[460px] overflow-y-auto selection:bg-[#C5A059]/30">
        <code>{highlightPythonCode(codeString)}</code>
      </pre>

      {/* Salida Interactiva de Ejecución */}
      {output && (
        <div className="p-4 bg-black/95 border-t border-[#C5A059]/40 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <CheckCircle2 size={13} />
              <span>
                {isArcade
                  ? 'STDOUT // AUDITORÍA BPE FINALIZADA: BALANCE ECONÓMICO PROYECTADO'
                  : 'STDOUT // 2 REGISTROS CANÓNICOS EXTRAÍDOS EN MEMORIA C CONTIGUA'}
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 flex items-center gap-2">
              {isArcade ? (
                <span className="text-red-400 font-bold">{output.linguistic_tax_surcharge}</span>
              ) : (
                <>
                  <span>Tiempo: <strong className="text-[#FFE066]">{output.durationMs} ms</strong></span>
                  <span>•</span>
                  <span>Ahorro RAM vs Python puro: <strong className="text-emerald-400">{output.ramSavedPercent}%</strong></span>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#090912] p-2.5 rounded border border-zinc-900 overflow-x-auto text-[10.5px] text-zinc-300">
            <pre>{JSON.stringify(isArcade ? output.results : output.data, null, 2)}</pre>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">// Ejecución completada en tiempo real</span>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[#C5A059] hover:text-[#FFE066] border border-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Limpiar salida y devolver proceso</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
