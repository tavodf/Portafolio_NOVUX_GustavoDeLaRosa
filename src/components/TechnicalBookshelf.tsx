import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, FileText, CheckCircle2, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface TechnicalBook {
  id: string;
  title: string;
  tag: string;
  code: string;
  version: string;
  norm: string;
  pages: string;
  filesize: string;
  pdfUrl: string;
  accentColor: string;
  glowColor: string;
  summary: string;
  modules: string[];
}

const BOOKS: TechnicalBook[] = [
  {
    id: 'NOVUX_COT',
    title: 'NOVUX COT // Tactical Digital Twin C2',
    tag: '[ CONTROL OPERATIVO 3D ]',
    code: 'NOVUX-MAN-COT-2026-V2',
    version: 'v2.4 Producción',
    norm: 'ICONTEC NTC 1486 // NTC 4490',
    pages: '14 Páginas Técnicas',
    filesize: '194 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_COT.pdf',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.35)',
    summary: 'Especificación de ingeniería del motor 3D WebGL 2.0 (60 FPS GPU), cálculo geodésico submétrico Gauss-Haversine y cadena de custodia fotográfica con hash inmutable SHA-256.',
    modules: ['Renderizado Orbital WebGL', 'Telemetría Radar 360°', 'Sellado Criptográfico SHA-256', 'Anti-Tamper DOM Guard']
  },
  {
    id: 'NOVUX_PCD',
    title: 'NOVUX PCD // Market Pricing Engine',
    tag: '[ ARBITRAJE DE PRECIOS ]',
    code: 'NOVUX-MAN-PCD-2026-V3',
    version: 'v3.1 Producción',
    norm: 'ICONTEC NTC 1486 // ISO/IEC 25010',
    pages: '13 Páginas Técnicas',
    filesize: '185 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_PCD.pdf',
    accentColor: '#FFE066',
    glowColor: 'rgba(255, 224, 102, 0.35)',
    summary: 'Arquitectura matemática de arbitraje financiero adaptado a retail: normalización dimensional unitaria ($/g, $/ml, $/ud) y modelo de elasticidad dinámica para optimización de Buy-Box.',
    modules: ['Normalizador Regex Dimensional', 'Auditoría Multi-Nodo Paralela', 'Simulador de Margen Óptimo', 'Recharts Visual Ticker']
  },
  {
    id: 'ARES_SCRAPER',
    title: 'ARES SCRAPER // Resilient L7 Extraction',
    tag: '[ EXTRACCIÓN INDUSTRIAL ]',
    code: 'NOVUX-MAN-ARES-2026-V4',
    version: 'v4.0 Producción',
    norm: 'ICONTEC NTC 1486 // RFC 9110',
    pages: '13 Páginas Técnicas',
    filesize: '181 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_ARES_SCRAPER.pdf',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    summary: 'Infraestructura de recolección web masiva con bypass verificado de WAFs (Cloudflare/DataDome), parsing en memoria nativa en lenguaje C (libxml2) y escudo defensivo anti-SSRF.',
    modules: ['Evasión WAF & JA3 Spoofing', 'DOM Parser Nativo C en RAM', 'Escudo Defensivo Anti-SSRF', 'Pydantic Data Lake Pipeline']
  },
  {
    id: 'NOVUX_CPC',
    title: 'NOVUX CPC // Political Intelligence',
    tag: '[ REGULATORY GRAPH // DAG ]',
    code: 'NOVUX-MAN-CPC-2026-V2',
    version: 'v2.0 Producción',
    norm: 'ICONTEC NTC 1486 // MinTIC Datos',
    pages: '13 Páginas Técnicas',
    filesize: '162 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_CPC.pdf',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    summary: 'Hemiciclo legislativo tridimensional (45/45 curules) y ordenación topológica Kahn DAG para resolución de dependencias normativas y cruce algorítmico forense de actas electorales E-14 vs E-24.',
    modules: ['Hemiciclo 3D Three.js', 'Motor Topológico Kahn DAG', 'Conciliador E-14 vs E-24', 'Minería Social de 3.86M Audiencia']
  },
  {
    id: 'SANTAFE_BI',
    title: 'SANTA FE BI // Comando Central Bogotá',
    tag: '[ ANALÍTICA GUBERNAMENTAL ]',
    code: 'NOVUX-MAN-SFBI-2026-V2',
    version: 'v2.2 Producción',
    norm: 'ICONTEC NTC 1486 // OGC PostGIS',
    pages: '13 Páginas Técnicas',
    filesize: '157 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_SANTAFE_BI.pdf',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    summary: 'Centro de Inteligencia de Negocios y Analítica Territorial para la Alcaldía de Santa Fe: ingesta de +131,000 registros, cubicaje de 245,000 m² de espacio público y tableros Looker Studio.',
    modules: ['Base de Datos PostGIS', 'Pipelines Python ETL', 'Looker Studio Embebido', 'Filtros Multidimensionales UPZ']
  }
];

export function TechnicalBookshelf() {
  const [selectedBook, setSelectedBook] = useState<TechnicalBook | null>(null);

  const handleDownload = (book: TechnicalBook) => {
    sfx.playPowerUp();
  };

  return (
    <section className="w-full max-w-6xl px-3 sm:px-6 my-12 flex flex-col items-center">
      {/* Marcador Superior Estilo Terminal NOVUX */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#C5A059]/25 pb-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(197,160,89,0.15)]">
          <BookOpen size={13} className="text-[#FFE066] animate-pulse" />
          <span>// BIBLIOTECA EDITORIAL & ESPECIFICACIONES TÉCNICAS</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>[ NORMAS ICONTEC NTC 1486 // PDF DISPONIBLES ]</span>
        </div>
      </div>

      <div className="w-full text-left mb-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 flex items-center gap-2.5">
          <span>Libros de Funcionamiento & Gobernanza de Software</span>
          <span className="text-xs font-mono font-normal text-[#FFE066] bg-[#C5A059]/15 border border-[#C5A059]/40 px-2 py-0.5 rounded">
            5 Volúmenes Oficiales
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-3xl">
          Consulte y descargue formalmente los manuales de ingeniería, modelado matemático, arquitectura de microservicios y protocolos de ciberseguridad correspondientes a cada aplicación del ecosistema NOVUX.
        </p>
      </div>

      {/* Estantería Editorial en Cuadrícula 3D */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOOKS.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group relative bg-[#0b0c14]/95 border border-zinc-800 hover:border-[#C5A059] rounded-md p-5 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(197,160,89,0.25)] transition-all duration-300 overflow-hidden"
          >
            {/* Lomo Iluminado 3D del Libro */}
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
              style={{ backgroundColor: book.accentColor }}
            />

            {/* Brillo de fondo al hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${book.accentColor}, transparent 70%)` }}
            />

            <div>
              {/* Metadatos Superiores ICONTEC */}
              <div className="flex items-center justify-between gap-2 mb-2 pl-2">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border"
                  style={{
                    color: book.accentColor,
                    borderColor: `${book.accentColor}55`,
                    backgroundColor: `${book.accentColor}15`
                  }}
                >
                  {book.tag}
                </span>
                <span className="font-mono text-[9px] text-zinc-500 uppercase">
                  {book.pages}
                </span>
              </div>

              {/* Título Principal y Código */}
              <div className="pl-2 mb-3">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#FFE066] transition-colors leading-snug">
                  {book.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-400">
                  <span className="text-zinc-500 font-semibold">{book.code}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{book.version}</span>
                </div>
              </div>

              {/* Resumen del Libro */}
              <p className="pl-2 text-xs text-zinc-300 font-sans leading-relaxed mb-4 line-clamp-3">
                {book.summary}
              </p>

              {/* Módulos Clave del Índice ICONTEC */}
              <div className="pl-2 mb-4 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                  MÓDULOS NORMATIVOS NTC 1486:
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {book.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 truncate">
                      <CheckCircle2 size={10} style={{ color: book.accentColor }} className="shrink-0" />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones de Descarga Directa */}
            <div className="pl-2 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                <FileText size={11} />
                <span>PDF ({book.filesize})</span>
              </span>

              <a
                href={book.pdfUrl}
                download
                onClick={() => handleDownload(book)}
                onMouseEnter={() => sfx.playHover()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-[#C5A059] border border-zinc-700 hover:border-[#C5A059] text-zinc-200 hover:text-black font-mono text-xs font-bold transition-all shadow cursor-pointer no-underline"
              >
                <Download size={13} />
                <span>Descargar PDF</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Respaldo de Metodología de Entrega Editorial */}
      <div className="w-full mt-6 p-4 rounded bg-[#0b0c14]/80 border border-zinc-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#FFE066] shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white">
              NORMA TÉCNICA COLOMBIANA ICONTEC NTC 1486 & NTC 4490
            </div>
            <div className="text-[11px] text-zinc-400 font-sans">
              Estructura formal con portada institucional, numeración oficial, diagramas de flujo y referencias técnicas válidas para contratación pública y auditoría judicial.
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">
          DIVISIÓN DE INGENIERÍA // BOGOTÁ D.C. 2026
        </div>
      </div>
    </section>
  );
}
