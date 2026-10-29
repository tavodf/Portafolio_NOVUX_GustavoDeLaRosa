import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, FileText, CheckCircle2, ShieldCheck, Cpu, Terminal, Compass, Layers, Calculator, ShieldAlert, Sparkles } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface TechnicalBook {
  id: string;
  unitCode: string;
  unitName: string;
  title: string;
  tag: string;
  code: string;
  version: string;
  norm: string;
  pages: string;
  filesize: string;
  pdfUrl: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  syncRate: string;
  tacticalMetric: string;
  summary: string;
  modules: string[];
}

const TACTICAL_BOOKS: TechnicalBook[] = [
  {
    id: 'NOVUX_CPC',
    unitCode: 'EVA-01',
    unitName: 'TEST TYPE',
    title: 'NOVUX CPC // Political Intelligence & Kahn DAG',
    tag: '[ UNIDAD 01 // REGULATORY GRAPH ]',
    code: 'NOVUX-MAN-CPC-2026-V2',
    version: 'v2.0 Producción',
    norm: 'ICONTEC NTC 1486 // MinTIC Datos',
    pages: '13 Páginas Técnicas',
    filesize: '162 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_CPC.pdf',
    primaryColor: '#7C3AED', // Púrpura NERV
    secondaryColor: '#10B981', // Verde Neón
    glowColor: 'rgba(124, 58, 237, 0.35)',
    syncRate: 'SYNC RATE: 100%',
    tacticalMetric: 'TOPOLOGY: KAHN DAG // 45 CURULES',
    summary: 'Hemiciclo legislativo tridimensional (45/45 curules) y ordenación topológica Kahn DAG para resolución de dependencias normativas y cruce algorítmico forense de actas electorales E-14 vs E-24.',
    modules: ['Hemiciclo 3D Three.js', 'Motor Topológico Kahn DAG', 'Conciliador E-14 vs E-24', 'Minería Social 3.86M Audiencia']
  },
  {
    id: 'ARES_SCRAPER',
    unitCode: 'EVA-02',
    unitName: 'PRODUCTION MODEL',
    title: 'ARES SCRAPER // Resilient L7 Data Harvesting',
    tag: '[ UNIDAD 02 // INGESTA CONCURRENTE L7 ]',
    code: 'NOVUX-MAN-ARES-2026-V4',
    version: 'v4.0 Producción',
    norm: 'ICONTEC NTC 1486 // RFC 9110',
    pages: '13 Páginas Técnicas',
    filesize: '181 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_ARES_SCRAPER.pdf',
    primaryColor: '#EF4444', // Rojo Táctico
    secondaryColor: '#F59E0B', // Ámbar
    glowColor: 'rgba(239, 68, 68, 0.35)',
    syncRate: 'PERIMETER: HARDENED A+',
    tacticalMetric: 'SLA: 99.98% // RAM C PARSER',
    summary: 'Infraestructura de recolección web masiva con alta disponibilidad, parsing en memoria nativa en lenguaje C (libxml2) y protocolos de resguardo perimetral.',
    modules: ['Extracción Concurrente L7', 'DOM Parser Nativo C en RAM', 'Resguardo Perimetral Seguro', 'Pydantic Data Lake Pipeline']
  },
  {
    id: 'NOVUX_COT',
    unitCode: 'EVA-00',
    unitName: 'PROTO-TYPE',
    title: 'NOVUX COT // Tactical Digital Twin C2',
    tag: '[ UNIDAD 00 // GEMELO DIGITAL 3D ]',
    code: 'NOVUX-MAN-COT-2026-V2',
    version: 'v2.4 Producción',
    norm: 'ICONTEC NTC 1486 // NTC 4490',
    pages: '14 Páginas Técnicas',
    filesize: '194 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_COT.pdf',
    primaryColor: '#06B6D4', // Cian Holográfico
    secondaryColor: '#EAB308', // Amarillo
    glowColor: 'rgba(6, 182, 212, 0.35)',
    syncRate: 'SYNC RATE: 100%',
    tacticalMetric: 'GPU CLOCK: 60 FPS // SUB-METRO WGS84',
    summary: 'Especificación de ingeniería del motor 3D WebGL 2.0 (60 FPS GPU), cálculo geodésico submétrico Gauss-Haversine y cadena de custodia fotográfica con hash inmutable SHA-256.',
    modules: ['Renderizado Orbital WebGL', 'Telemetría Radar 360°', 'Sellado Criptográfico SHA-256', 'Integridad de Sesión']
  },
  {
    id: 'SANTAFE_BI',
    unitCode: 'MAGI',
    unitName: 'TRI-SUPERCOMPUTER',
    title: 'SANTA FE BI // Comando Central & Analítica Territorial',
    tag: '[ SISTEMA MAGI // INTELIGENCIA TERRITORIAL ]',
    code: 'NOVUX-MAN-SFBI-2026-V2',
    version: 'v2.2 Producción',
    norm: 'ICONTEC NTC 1486 // OGC PostGIS',
    pages: '13 Páginas Técnicas',
    filesize: '157 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_SANTAFE_BI.pdf',
    primaryColor: '#059669', // Esmeralda
    secondaryColor: '#3B82F6', // Azul Profundo
    glowColor: 'rgba(5, 150, 105, 0.35)',
    syncRate: 'MAGI CONSENSUS: 3/3',
    tacticalMetric: '+131k REGISTROS // 245k m² AUDITADOS',
    summary: 'Centro de Inteligencia de Negocios y Analítica Territorial para la Alcaldía de Santa Fe: ingesta de +131,000 registros, cubicaje de 245,000 m² de espacio público y tableros Looker Studio.',
    modules: ['Base de Datos PostGIS', 'Pipelines Python ETL', 'Looker Studio Embebido', 'Filtros Multidimensionales UPZ']
  },
  {
    id: 'NOVUX_PCD',
    unitCode: 'EVA-04',
    unitName: 'PRICING CORE',
    title: 'NOVUX PCD // Market Pricing Engine & Elasticidad',
    tag: '[ MOTOR DE COSTEO // ARBITRAJE B2B ]',
    code: 'NOVUX-MAN-PCD-2026-V3',
    version: 'v3.1 Producción',
    norm: 'ICONTEC NTC 1486 // ISO/IEC 25010',
    pages: '13 Páginas Técnicas',
    filesize: '185 KB',
    pdfUrl: '/manuales/LIBRO_FUNCIONAMIENTO_NOVUX_PCD.pdf',
    primaryColor: '#D97706', // Dorado/Ámbar
    secondaryColor: '#94A3B8', // Plata/Titanio
    glowColor: 'rgba(217, 119, 6, 0.35)',
    syncRate: 'SYNC RATE: 100%',
    tacticalMetric: 'BUY-BOX ALGO: ACTIVE // REGEX NOMINAL',
    summary: 'Arquitectura matemática de arbitraje financiero adaptado a retail: normalización dimensional unitaria ($/g, $/ml, $/ud) y modelo de elasticidad dinámica para optimización de Buy-Box.',
    modules: ['Normalizador Regex Dimensional', 'Auditoría Multi-Nodo Paralela', 'Simulador de Margen Óptimo', 'Recharts Visual Ticker']
  }
];

export function TechnicalBookshelf() {
  const handleDownload = (_book: TechnicalBook) => {
    sfx.playPowerUp();
  };

  return (
    <section className="w-full max-w-6xl px-3 sm:px-6 my-12 flex flex-col items-center">
      {/* Marcador Superior Estilo NERV C2 / MAGI Tactical Terminal */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#C5A059]/25 pb-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a0c14] border border-[#C5A059]/50 text-[#C5A059] font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(197,160,89,0.2)]">
          <BookOpen size={13} className="text-[#FFE066] animate-pulse" />
          <span>// NERV C2 • BIBLIOTECA EDITORIAL DE OPERACIÓN Y VENTAS</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>MAGI SYNC RATE: 100%</span>
          </span>
          <span className="hidden md:inline text-zinc-500">•</span>
          <span className="hidden md:inline text-zinc-400">[ ICONTEC NTC 1486 // PDF DISPONIBLES ]</span>
        </div>
      </div>

      <div className="w-full text-left mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 font-bold tracking-widest uppercase">
            ESTÁNDAR TÁCTICO NERV // MAGI SYSTEM
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
            5 UNIDADES OPERATIVAS
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 flex items-center gap-2.5">
          <span>Manuales Tácticos de Funcionamiento & Resguardo Documental</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-3xl">
          Especificaciones formales de ingeniería, topología matemática, arquitectura de microservicios y protocolos de alta disponibilidad de las 5 Unidades del ecosistema NOVUX, codificados bajo normas ICONTEC NTC 1486 y NTC 4490.
        </p>
      </div>

      {/* Estantería Editorial en Cuadrícula Táctica NERV */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TACTICAL_BOOKS.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group relative bg-[#07090f] border border-zinc-800 hover:border-[#C5A059] rounded-md p-5 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(197,160,89,0.25)] transition-all duration-300 overflow-hidden text-left"
          >
            {/* Lomo Táctico Iluminado con Colores de la Unidad */}
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2.5"
              style={{ backgroundColor: book.primaryColor }}
            />

            {/* Corner Cyber Brackets de Unidad */}
            <div
              className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 pointer-events-none transition-colors"
              style={{ borderColor: book.primaryColor }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 pointer-events-none transition-colors"
              style={{ borderColor: book.secondaryColor }}
            />

            {/* Brillo de fondo al hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${book.primaryColor}, transparent 70%)` }}
            />

            <div>
              {/* Header Táctico: Designación de Unidad + Indicador Hexagonal */}
              <div className="flex items-center justify-between gap-2 mb-2 pl-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider"
                    style={{
                      color: book.primaryColor,
                      borderColor: `${book.primaryColor}60`,
                      backgroundColor: `${book.primaryColor}15`
                    }}
                  >
                    {book.unitCode} // {book.unitName}
                  </span>
                </div>
                <span
                  className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border"
                  style={{
                    color: book.secondaryColor,
                    borderColor: `${book.secondaryColor}40`,
                    backgroundColor: `${book.secondaryColor}10`
                  }}
                >
                  {book.syncRate}
                </span>
              </div>

              {/* Portada Táctica Ilustrada en Miniatura (Blueprint NERV) */}
              <div
                className="w-full h-24 mb-3 rounded border relative overflow-hidden flex flex-col justify-between p-2.5 font-mono select-none"
                style={{
                  borderColor: `${book.primaryColor}30`,
                  backgroundColor: '#040509',
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                  backgroundSize: '12px 12px'
                }}
              >
                {/* Overlay sutil de acento cromático */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{ background: `linear-gradient(135deg, ${book.primaryColor}20, transparent 60%)` }}
                />

                <div className="flex items-center justify-between text-[9px] relative z-10">
                  <span className="text-zinc-500 font-semibold">{book.code}</span>
                  <span
                    className="px-1.5 py-0.2 rounded text-[8.5px] font-bold"
                    style={{ color: book.secondaryColor, backgroundColor: `${book.secondaryColor}15` }}
                  >
                    {book.version}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="text-[11px] font-bold tracking-wider uppercase truncate" style={{ color: book.primaryColor }}>
                    {book.tag}
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono truncate mt-0.5">
                    {book.tacticalMetric}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[8px] text-zinc-500 border-t border-zinc-900 pt-1 relative z-10">
                  <span>NORMA: {book.norm.split('//')[0]}</span>
                  <span>{book.pages}</span>
                </div>
              </div>

              {/* Título Principal */}
              <div className="pl-2 mb-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#FFE066] transition-colors leading-snug">
                  {book.title}
                </h3>
              </div>

              {/* Resumen del Manual */}
              <p className="pl-2 text-xs text-zinc-300 font-sans leading-relaxed mb-4 line-clamp-3">
                {book.summary}
              </p>

              {/* Módulos Clave del Índice ICONTEC */}
              <div className="pl-2 mb-4 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                  MÓDULOS DE ARQUITECTURA TÁCTICA:
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {book.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 truncate">
                      <CheckCircle2 size={10} style={{ color: book.secondaryColor }} className="shrink-0" />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones de Descarga Directa con Feedback Táctico */}
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
                <span>Descargar Manual</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Respaldo Institucional NERV / MAGI & Certificación ICONTEC */}
      <div className="w-full mt-6 p-4 rounded bg-[#07090f] border border-zinc-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#FFE066] shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>ICONTEC NTC 1486 &amp; NTC 4490 // CODIFICACIÓN DOCUMENTAL CERTIFICADA</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                VALIDADO
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
              Protocolo editorial formal: numeración de páginas, tablas de contenido, diagramas de arquitectura C2 y cadena de custodia técnica para licitaciones públicas y compras corporativas.
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">
          NERV C2 DIVISION // NOVUX OPS 2026
        </div>
      </div>
    </section>
  );
}
