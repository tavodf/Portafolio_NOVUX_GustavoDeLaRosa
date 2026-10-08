import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MessageCircle,
  ExternalLink,
  Play,
  FlaskConical,
  Terminal,
  Table2,
  SearchCode,
  ChartColumn,
  ShieldCheck,
  AppWindow,
  CodeXml,
  Database,
  Cpu,
  Layers,
} from "lucide-react";
import { Service } from "../types";
import { sfx } from "../utils/soundEffects";
import { getWhatsAppUrl } from "../data";

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
}

function getTechIcon(techName: string, isActive: boolean) {
  const iconProps = {
    className: `w-6 h-6 transition-all duration-300 ${isActive ? "text-[#C5A059] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]" : "text-[#FFE066] animate-pulse"}`,
    strokeWidth: 1.5,
  };
  switch (techName) {
    case "python":
      return <Terminal {...iconProps} />;
    case "pandas":
      return <Table2 {...iconProps} />;
    case "regex":
      return <SearchCode {...iconProps} />;
    case "looker":
      return <ChartColumn {...iconProps} />;
    case "selenium":
    case "shield":
      return <ShieldCheck {...iconProps} />;
    case "pywebview":
    case "window":
      return <AppWindow {...iconProps} />;
    case "code":
      return <CodeXml {...iconProps} />;
    case "database":
      return <Database {...iconProps} />;
    case "cpu":
      return <Cpu {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
}
function TechItem({ item, index }: { item: { name: string; iconName: string }; index: number }) {
  const [scrambledText, setScrambledText] = useState(""),
    [isSettled, setIsSettled] = useState(!1),
    [isHovered, setIsHovered] = useState(!1),
    triggerScramble = () => {
      (setIsSettled(!1), setIsHovered(!0));
      const g = "01#$<>%&_*/!?アイウエオカキ0123456789XYZ";
      let b = 0;
      const x = item.name,
        y = setInterval(() => {
          (setScrambledText(
            x
              .split("")
              .map((N, C) =>
                C < b
                  ? x[C]
                  : N === " " || N === "/"
                    ? N
                    : g[Math.floor(Math.random() * g.length)],
              )
              .join(""),
          ),
            b >= x.length &&
              (clearInterval(y), setIsSettled(!0), setIsHovered(!1)),
            (b += 1 / 2.5));
        }, 40);
      return () => clearInterval(y);
    };
  return (
    useEffect(() => {
      const g = setTimeout(
        () => {
          triggerScramble();
        },
        200 + index * 120,
      );
      return () => clearTimeout(g);
    }, [item.name, index]),
    (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15 + index * 0.08,
          duration: 0.4,
        }}
        onMouseEnter={() => {
          (sfx.playHover(), isSettled && triggerScramble());
        }}
        className={`group relative w-full min-h-[112px] sm:min-h-[120px] rounded-sm p-4 flex flex-col items-center justify-between text-center cursor-pointer
        bg-black/40 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059]
        shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]
        transition-all duration-300
        ${isHovered ? "ring-1 ring-[#C5A059]/50" : ""}`}
      >
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="relative flex items-center justify-center pt-1">
          {getTechIcon(item.iconName, isSettled)}
        </div>
        <div className="w-full px-1 my-1.5 flex items-center justify-center">
          <span
            className={`font-mono text-xs sm:text-sm tracking-wide block transition-colors duration-200 font-semibold text-center leading-tight
            ${isSettled ? "text-zinc-200 group-hover:text-[#FFE066]" : "text-[#C5A059] drop-shadow-[0_0_5px_rgba(197,160,89,0.8)]"}`}
          >
            {scrambledText || item.name}
          </span>
        </div>
        <div
          className={`h-[2px] rounded-full transition-all duration-500 ${isSettled ? "w-5 bg-[#C5A059]/60 group-hover:w-10 group-hover:bg-[#C5A059]" : "w-2 bg-[#FFE066] animate-pulse"}`}
        />
      </motion.div>
    )
  );
}
function TechStackGrid({ items }: { items?: { name: string; iconName: string }[] }) {
  return !items || items.length === 0 ? null : (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A059] flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse" />
          Stack Tecnológico
        </span>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[#C5A059]/30 to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full justify-center">
        {items.map((a, i) => (
          <TechItem key={a.name} item={a} index={i} />
        ))}
      </div>
    </div>
  );
}
export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const [softwarePillar, setSoftwarePillar] = useState("NOVUX_COT"),
    handleBack = () => {
      (sfx.playBack(), onBack());
    },
    handlePlayPowerUp = () => {
      sfx.playPowerUp();
    };
  return service.isLab || service.id === "LABORATORIO_INVESTIGACION" ? (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="min-h-screen bg-gradient-to-b from-black/80 via-[#06060c] to-black text-white flex flex-col font-sans select-none"
    >
      <header className="w-full pt-12 pb-6 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            onMouseEnter={() => sfx.playHover()}
            className="group inline-flex items-center gap-2 border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0e0e12]/80 hover:bg-[#C5A059]/15 text-[#C5A059] px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Volver al Menú Principal</span>
          </button>
          <a
            href={getWhatsAppUrl(
              "Hola NOVUX S.A.S., deseo consultar sobre los proyectos del Laboratorio e Investigación.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle size={13} />
            <span>ATENCIÓN WHATSAPP</span>
          </a>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-[#C5A059] tracking-widest uppercase">
          {service.categoryTitle}
        </h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-6 md:px-16 lg:px-32">
        <div className="w-full max-w-2xl bg-[#090910]/95 border border-[#C5A059]/40 rounded-sm p-8 sm:p-12 shadow-[0_0_60px_rgba(197,160,89,0.18)] text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C5A059]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C5A059]" />
          <div className="w-16 h-16 rounded-full border border-[#C5A059]/50 flex items-center justify-center mx-auto mb-6 bg-[#C5A059]/10 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            <FlaskConical size={28} className="text-[#FFE066] animate-pulse" />
          </div>
          <div className="inline-block px-3 py-1 rounded bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#FFE066] font-mono text-xs uppercase tracking-widest mb-6 font-bold">
            NOVUX D&D // DIVISIÓN DE INVESTIGACIÓN Y LABORATORIO
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-wide mb-6 leading-snug">
            Investigación técnica y desarrollo de productos y conceptos.
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ESTADO: INVESTIGACIÓN ACTIVA & EXPERIMENTACIÓN EN CURSO</span>
          </div>
          <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleBack}
              onMouseEnter={() => sfx.playHover()}
              className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#FFE066] text-black px-6 py-2.5 rounded-sm font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
            >
              <ArrowLeft size={14} />
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  ) : (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="min-h-screen bg-gradient-to-b from-black/60 via-black/30 to-black/70 text-white flex flex-col font-sans"
    >
      <header className="w-full pt-12 pb-8 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-black/80 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-serif text-[#C5A059] tracking-widest uppercase drop-shadow-md">
          {service.categoryTitle}
        </h1>
        <a
          href={getWhatsAppUrl(
            `Hola NOVUX S.A.S., me comunico desde la vista detallada de ${service.categoryTitle}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sfx.playSelect()}
          onMouseEnter={() => sfx.playHover()}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <MessageCircle size={13} />
          <span>ATENCIÓN WHATSAPP</span>
        </a>
      </header>
      <main className="flex-grow flex items-start justify-center p-8 md:px-16 lg:px-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-4">
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className={`flex flex-col items-start bg-[#0e0e11]/80 backdrop-blur-md p-8 rounded-sm border shadow-[0_12px_40px_rgba(0,0,0,0.8)] ${service.id === "SOFTWARE_FACTORY" ? (softwarePillar === "NOVUX_COT" ? "border-cyan-500/40" : "border-purple-500/40") : "border-[#C5A059]/25"}`}
          >
            <div
              className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6 bg-black/40 border font-mono ${service.id === "SOFTWARE_FACTORY" ? (softwarePillar === "NOVUX_COT" ? "border-cyan-500 text-cyan-300" : "border-purple-500 text-purple-300") : "border-[#C5A059] text-[#C5A059]"}`}
            >
              {service.id === "SOFTWARE_FACTORY"
                ? softwarePillar === "NOVUX_COT"
                  ? "SOFTWARE FACTORY // MISIÓN CRÍTICA"
                  : "SOFTWARE FACTORY // INGENIERÍA DE DATOS"
                : "Portafolio de Servicio"}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-100 uppercase tracking-wide">
              {service.id === "SOFTWARE_FACTORY"
                ? softwarePillar === "NOVUX_COT"
                  ? "NOVUX COT // DIGITAL TWIN OPS"
                  : "ARES SCRAPER // HARVESTER & DATA GRID"
                : service.heading}
            </h2>
            {service.id === "SOFTWARE_FACTORY" && (
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span
                  className={`inline-block text-[11px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm ${softwarePillar === "NOVUX_COT" ? "text-cyan-300 bg-cyan-950/70 border border-cyan-500/50" : "text-purple-300 bg-purple-950/70 border border-purple-500/50"}`}
                >
                  {softwarePillar === "NOVUX_COT"
                    ? "*CASE-TACTICAL-TWIN*"
                    : "*CASE-PRICING-GRID & CASE-DATA-FACTORY*"}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold px-3 py-1 rounded ${softwarePillar === "NOVUX_COT" ? "text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.35)]" : "text-[#FFE066] bg-amber-950/80 border border-[#C5A059]/50 shadow-[0_0_15px_rgba(197,160,89,0.35)]"}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  <span>
                    {softwarePillar === "NOVUX_COT"
                      ? "[ENGINE ONLINE // 60 FPS]"
                      : "[PIPELINE READY // LOW LATENCY]"}
                  </span>
                </span>
              </div>
            )}
            {service.id === "SOFTWARE_FACTORY" &&
            softwarePillar === "ARES_SCRAPER" ? (
              <div className="space-y-4 mb-6 max-w-xl text-left font-mono">
                <div className="p-3 rounded bg-black/60 border border-purple-500/30">
                  <span className="text-purple-300 font-bold block mb-1 text-xs">
                    CASE-PRICING-GRID // NOVUX ARES SCRAPER
                  </span>
                  <p className="text-gray-300 text-xs font-sans leading-relaxed">
                    Motor Industrial de Extracción y Minería de Precios
                    E-Commerce (Python + PyWebView + Undetected-ChromeDriver +
                    Pandas Data Lake Pipeline). Orquestación híbrida de
                    transporte adaptable (HTTP/SSR estático vs. WebDriver
                    dinámico), evasión perimetral de WAFs con herencia de
                    sesiones persistentes, flujo operativo gobernado por máquina
                    de estados finitos (FSM) con compuertas de validación humana
                    e ingesta masiva con deduplicación por clave canónica hacia
                    Data Lake local bajo interfaz táctica HUD Tron Red.
                  </p>
                </div>
                <div className="p-3 rounded bg-black/60 border border-zinc-800">
                  <span className="text-[#FFE066] font-bold block mb-0.5 text-[10px] uppercase tracking-wider">
                    Alternativa focalizada en analítica y arquitectura de datos:
                  </span>
                  <span className="text-cyan-300 font-bold block mb-1 text-xs">
                    CASE-DATA-FACTORY // NOVUX ARES GRID
                  </span>
                  <p className="text-gray-300 text-xs font-sans leading-relaxed">
                    Plataforma Desktop de Inteligencia de Mercado y
                    Normalización de Catálogos (Python 3.12 + PyWebView GUI +
                    BeautifulSoup4 + Pandas Core). Enrutamiento polimórfico de
                    adaptadores de marketplace desacoplados, captura asíncrona
                    tolerante a SPA/CSR ofuscadas, auditoría tabular en memoria
                    volátil y persistencia atómica multiformato con saneamiento
                    monetario en tiempo real.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                {service.id === "SOFTWARE_FACTORY"
                  ? "Ingeniería de software a la medida para operaciones complejas de campo y misión crítica. Centro de Comando y Control (C2) con renderizado tridimensional interactivo, trazado de perímetros poligonales con cálculo dinámico de áreas y distancias geodésicas en tiempo real, despacho táctico de personal con drag-and-drop, captura estricta de incidentes con evidencia fotográfica obligatoria y auditoría integral exportable sin dependencias de terceros."
                  : service.description}
              </p>
            )}
            {service.id === "SOFTWARE_FACTORY" ? (
              <div
                className={`w-full mb-6 p-4 rounded-sm bg-black/60 border-l-2 border-y border-r border-zinc-800 shadow-inner ${softwarePillar === "NOVUX_COT" ? "border-l-cyan-400" : "border-l-purple-400"}`}
              >
                <p className="text-zinc-200 text-sm font-mono italic leading-relaxed">
                  {softwarePillar === "NOVUX_COT"
                    ? '"No desarrollamos software ni plantillas genéricas. Construimos plataformas de Control de grado técnico para el mercado empresarial operativo."'
                    : '"Ingeniería de datos de alto rendimiento y evasión perimetral: orquestación híbrida de transporte, deduplicación canónica en memoria y entrega con 100% de cesión de código y propiedad intelectual."'}
                </p>
              </div>
            ) : service.technicalArgument && !service.isLab ? (
              <div className="w-full mb-6 p-4 rounded-sm bg-black/60 border-l-2 border-y border-r border-zinc-800 shadow-inner border-l-[#C5A059]">
                <p className="text-zinc-200 text-sm font-mono italic leading-relaxed">
                  "{service.technicalArgument}"
                </p>
              </div>
            ) : null}
            {service.id === "SOFTWARE_FACTORY" ? (
              <div
                className={`w-full mb-6 bg-black/40 backdrop-blur-md rounded-sm border p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ${softwarePillar === "NOVUX_COT" ? "border-cyan-500/30" : "border-purple-500/30"}`}
              >
                <div
                  className={`text-[11px] font-mono uppercase tracking-widest flex items-center gap-2 mb-2.5 ${softwarePillar === "NOVUX_COT" ? "text-cyan-300" : "text-purple-300"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block ${softwarePillar === "NOVUX_COT" ? "bg-cyan-400" : "bg-purple-400"}`}
                  />
                  {softwarePillar === "NOVUX_COT"
                    ? "Servicios Clave de Arquitectura C2"
                    : "Servicios Clave de Extracción & Data Lake"}
                </div>
                <ul className="space-y-2 text-sm text-gray-300 font-sans">
                  {softwarePillar === "NOVUX_COT" ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-cyan-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            WebGL 2.0 & Three.js 3D (60 FPS):
                          </strong>{" "}
                          Renderizado tridimensional y gemelos digitales con
                          aceleración GPU.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-cyan-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Motor Geodésico Gauss-Haversine:
                          </strong>{" "}
                          Cálculo submétrico dinámico de distancias y polígonos
                          perimetrales.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-cyan-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Despacho Táctico Drag-and-Drop:
                          </strong>{" "}
                          Telemetría radar 360°, avatares 3D y asignación
                          espacial en tiempo real.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-cyan-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Cadena de Custodia con Hash:
                          </strong>{" "}
                          Captura estricta de incidentes georreferenciados sin
                          dependencias externas.
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-purple-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Orquestación Híbrida de Transporte:
                          </strong>{" "}
                          Conmutación adaptativa HTTP/SSR vs. WebDriver
                          dinámico.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-purple-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Evasión Perimetral de WAFs:
                          </strong>{" "}
                          Bypass de Cloudflare Turnstile y DataDome con sesiones
                          persistentes.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-purple-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Máquina de Estados Finitos (FSM):
                          </strong>{" "}
                          Flujo determinista con compuertas de validación
                          humana.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-purple-400 mt-0.5">
                          •
                        </span>
                        <div>
                          <strong className="text-zinc-100">
                            Data Lake con Clave Canónica:
                          </strong>{" "}
                          Ingesta masiva, saneamiento monetario y deduplicación
                          atómica.
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ) : service.keyServices && service.keyServices.length > 0 ? (
              <div className="w-full mb-6 bg-black/40 backdrop-blur-md rounded-sm border p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 border-[#C5A059]/25 hover:border-[#C5A059] hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]">
                <div className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-2 mb-2.5 text-[#C5A059]">
                  <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#C5A059]" />
                  Servicios Clave de Arquitectura
                </div>
                <ul className="space-y-2 text-sm text-gray-300 font-sans">
                  {service.keyServices.map((g, b) => (
                    <li className="flex items-start gap-2">
                      <span className="font-mono select-none mt-0.5 text-[#C5A059]">
                        •
                      </span>
                      <div className="leading-snug">
                        <span className="text-zinc-100 font-medium">
                          {g.title}
                        </span>
                        {g.detail && (
                          <span className="text-gray-400 text-xs block sm:inline sm:before:content-[':_']">
                            {g.detail}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="w-full flex flex-col gap-3 mb-6">
              {service.id === "SOFTWARE_FACTORY" ? (
                softwarePillar === "NOVUX_COT" ? (
                  <>
                    <a
                      href="https://demo-c2.novuxops.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playPowerUp()}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 hover:from-cyan-400 hover:to-emerald-300 text-black px-8 py-3.5 font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                    >
                      <span>LANZAR DEMO INTERACTIVO // COT</span>
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href={getWhatsAppUrl(
                        "Hola NOVUX S.A.S., deseo cotizar y solicitar desarrollo a la medida de la plataforma NOVUX COT // Gemelos Digitales 3D.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="w-full inline-flex items-center justify-center gap-2 border border-cyan-500/60 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white px-8 py-3.5 font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-sm"
                    >
                      SOLICITAR DESARROLLO A MEDIDA
                    </a>
                    <a
                      href={getWhatsAppUrl(
                        "Hola NOVUX S.A.S., me comunico desde la vista de NOVUX COT para consultas técnicas.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="w-full inline-flex items-center justify-center gap-2 border border-emerald-500/60 bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 hover:text-white px-6 py-2.5 font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    >
                      <MessageCircle size={14} />
                      <span>ATENCIÓN INMEDIATA VÍA WHATSAPP</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playPowerUp()}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 hover:from-purple-400 hover:to-amber-300 text-black px-8 py-3.5 font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    >
                      <span>
                        SOLICITAR DEMO APLICACIÓN DESKTOP // ARES GRID
                      </span>
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href={getWhatsAppUrl(
                        "Hola NOVUX S.A.S., deseo cotizar desarrollo e ingeniería de extracción con ARES SCRAPER.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="w-full inline-flex items-center justify-center gap-2 border border-purple-500/60 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 hover:text-white px-8 py-3.5 font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-sm"
                    >
                      SOLICITAR DESARROLLO A MEDIDA
                    </a>
                    <a
                      href={getWhatsAppUrl(
                        "Hola NOVUX S.A.S., me comunico desde la vista de ARES SCRAPER para consultas técnicas.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="w-full inline-flex items-center justify-center gap-2 border border-emerald-500/60 bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 hover:text-white px-6 py-2.5 font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    >
                      <MessageCircle size={14} />
                      <span>ATENCIÓN INMEDIATA VÍA WHATSAPP</span>
                    </a>
                  </>
                )
              ) : (
                <>
                  <a
                    href={getWhatsAppUrl(
                      `Hola NOVUX S.A.S., deseo cotizar e iniciar propuesta para ${service.categoryTitle}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playPowerUp()}
                    onMouseEnter={() => sfx.playHover()}
                    className="w-full inline-flex items-center justify-center gap-2 border border-emerald-500/60 bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 hover:text-white px-6 py-3.5 font-mono font-bold tracking-wider uppercase transition-all duration-300 rounded-sm text-xs cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  >
                    <MessageCircle size={15} />
                    <span>ATENCIÓN INMEDIATA VÍA WHATSAPP</span>
                  </a>
                  {service.externalLink && (
                    <a
                      href={service.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handlePlayPowerUp}
                      onMouseEnter={() => sfx.playHover()}
                      className="w-full inline-flex items-center justify-center border border-[#C5A059] text-[#C5A059] px-8 py-3.5 font-mono font-bold tracking-widest uppercase hover:bg-[#C5A059] hover:text-[#141414] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 rounded-sm text-center cursor-pointer text-xs"
                    >
                      {service.ctaText || "INICIAR PROYECTO / SOW"}
                    </a>
                  )}
                </>
              )}
            </div>
            <button
              onClick={handleBack}
              onMouseEnter={() => sfx.playHover()}
              className="group flex items-center gap-3 border border-[#C5A059]/50 text-[#C5A059] px-6 py-3 rounded-sm hover:bg-[#C5A059]/10 transition-all duration-300 tracking-wider text-xs uppercase cursor-pointer mt-2"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Volver al Menú Principal
            </button>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="w-full flex flex-col items-center lg:items-end gap-6"
          >
            {service.id === "SOFTWARE_FACTORY" && (
              <div className="w-full max-w-2xl bg-black/90 p-1.5 rounded border border-cyan-500/40 flex items-center justify-between gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    (sfx.playSelect(), setSoftwarePillar("NOVUX_COT"));
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-sm text-center transition-all cursor-pointer font-bold ${softwarePillar === "NOVUX_COT" ? "bg-cyan-500/25 text-cyan-300 border border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.35)]" : "text-zinc-400 hover:text-white"}`}
                >
                  NOVUX COT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    (sfx.playSelect(), setSoftwarePillar("ARES_SCRAPER"));
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-sm text-center transition-all cursor-pointer font-bold ${softwarePillar === "ARES_SCRAPER" ? "bg-purple-500/25 text-purple-300 border border-purple-500/70 shadow-[0_0_15px_rgba(168,85,247,0.35)]" : "text-zinc-400 hover:text-white"}`}
                >
                  ARES SCRAPER
                </button>
              </div>
            )}
            {service.id === "SOFTWARE_FACTORY" ? (
              softwarePillar === "NOVUX_COT" ? (
                <div className="w-full max-w-2xl flex flex-col gap-3">
                  <div className="aspect-[16/9] w-full rounded-md overflow-hidden shadow-2xl shadow-black/80 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 bg-black relative group">
                    <img
                      src="/novux-cot-platform.png"
                      alt="NOVUX COT // Plataforma de Comando y Gemelo Digital 3D"
                      className="w-full h-full object-cover rounded border border-cyan-500/30 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded px-2.5 py-1 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>
                        NOVUX TACTICAL C2 // GEMELO DIGITAL 3D & TELEMETRÍA
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/85 border border-zinc-800 rounded px-2.5 py-1 text-[10px] font-mono text-zinc-300">
                      <span>Datum WGS84 • Precisión Submétrica</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-950/80 border border-emerald-500/50 rounded px-2.5 py-1 text-[10px] font-mono text-emerald-300 font-bold">
                      60 FPS CONSTANTES // GPU
                    </div>
                  </div>
                  <div className="w-full overflow-hidden rounded-sm border border-cyan-500/50 bg-[#07090f] p-3.5 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/90 pb-2 relative z-10 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="text-xs text-zinc-200 ml-1.5 font-semibold truncate">
                          novux_cot_engine.wasm
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-cyan-950/80 border border-cyan-500/50 px-2.5 py-0.5 rounded text-[10.5px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                        <span>[SYS: READY]</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 my-3 relative z-10 text-[11px] border-b border-zinc-800/80 pb-3 leading-snug">
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Arquitectura:
                        </span>
                        <span className="text-zinc-200 font-semibold truncate">
                          WebGL 2.0 + Three.js 3D + MapLibre GL Engine
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Cálculo:
                        </span>
                        <span className="text-cyan-300 font-medium truncate">
                          Motor Geodésico Gauss-Haversine (m / m² / km²)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Telemetría:
                        </span>
                        <span className="text-emerald-300 font-medium truncate">
                          Radar 360° + Avatares 3D Interactivos + Despacho C2
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Auditoría:
                        </span>
                        <span className="text-zinc-300 truncate">
                          Cadena de Custodia Fotográfica + Hash Georreferenciado
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="bg-black/90 border border-cyan-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          RENDIMIENTO:
                        </span>
                        <span className="text-xs font-bold text-cyan-300 block leading-tight">
                          60 FPS CONSTANTES
                        </span>
                      </div>
                      <div className="bg-black/90 border border-emerald-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          PRECISIÓN ESPACIAL:
                        </span>
                        <span className="text-xs font-bold text-emerald-400 block leading-tight">
                          MÉTRICA SUB-METRO
                        </span>
                      </div>
                      <div className="bg-black/90 border border-cyan-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          CARGA GRÁFICA:
                        </span>
                        <span className="text-xs font-bold text-cyan-300 block leading-tight">
                          GPU ACCELERATED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl flex flex-col gap-3">
                  <div className="aspect-[16/9] w-full rounded-md overflow-hidden shadow-2xl shadow-black/80 border border-purple-500/40 hover:border-purple-400 transition-all duration-300 bg-black relative">
                    <video
                      src="/AresGrid.mp4"
                      poster="/novux-cot-platform.png"
                      controls={!0}
                      autoPlay={!0}
                      loop={!0}
                      muted={!0}
                      playsInline={!0}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-purple-500/40 rounded px-2.5 py-1 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 shadow-lg pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>ARES SCRAPER // DEMO EN PRODUCCIÓN</span>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden rounded-sm border border-purple-500/50 bg-[#08060d] p-3.5 flex flex-col justify-between font-mono relative shadow-inner text-left select-none">
                    <div className="flex items-center justify-between border-b border-zinc-800/90 pb-2 relative z-10 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
                        <span className="text-xs text-zinc-200 ml-1.5 font-semibold truncate">
                          ares_scraper_engine.py
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-purple-950/80 border border-purple-500/50 px-2.5 py-0.5 rounded text-[10.5px] font-bold text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                        <span>[SYS: READY]</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 my-3 relative z-10 text-[11px] border-b border-zinc-800/80 pb-3 leading-snug">
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Arquitectura:
                        </span>
                        <span className="text-zinc-200 font-semibold truncate">
                          Python 3.12 + PyWebView + Undetected-ChromeDriver
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Transporte:
                        </span>
                        <span className="text-purple-300 font-medium truncate">
                          Orquestación Híbrida (HTTP/SSR vs. WebDriver Dinámico)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Evasión WAF:
                        </span>
                        <span className="text-emerald-300 font-medium truncate">
                          Herencia de Sesiones Persistentes + FSM con Validación
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 shrink-0 w-28">
                          Data Lake:
                        </span>
                        <span className="text-zinc-300 truncate">
                          Ingesta Masiva + Deduplicación Clave Canónica
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="bg-black/90 border border-purple-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          EXTRACCIÓN:
                        </span>
                        <span className="text-xs font-bold text-purple-300 block leading-tight">
                          L7 MASIVA RAM
                        </span>
                      </div>
                      <div className="bg-black/90 border border-emerald-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          EVASIÓN WAF:
                        </span>
                        <span className="text-xs font-bold text-emerald-400 block leading-tight">
                          STEALTH PERSISTENTE
                        </span>
                      </div>
                      <div className="bg-black/90 border border-cyan-500/30 rounded p-2 text-center">
                        <span className="text-[9px] text-zinc-400 block uppercase leading-none mb-1">
                          PIPELINE DATA:
                        </span>
                        <span className="text-xs font-bold text-cyan-300 block leading-tight">
                          CANÓNICA DEDUPLICADA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="aspect-[16/9] w-full max-w-2xl rounded-md overflow-hidden shadow-2xl shadow-black/80 border border-[#C5A059]/30 hover:border-[#C5A059] hover:shadow-[0_0_35px_rgba(197,160,89,0.35)] transition-all duration-300 bg-black relative">
                {service.videoSrc ? (
                  <div className="w-full h-full relative group bg-black">
                    <video
                      src={service.videoSrc}
                      poster={service.image}
                      controls={!0}
                      autoPlay={!0}
                      loop={!0}
                      muted={!0}
                      playsInline={!0}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-[#C5A059]/40 rounded px-2.5 py-1 text-[11px] font-mono text-[#C5A059] flex items-center gap-1.5 shadow-lg pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                      <span>DEMO EN PRODUCCIÓN</span>
                    </div>
                  </div>
                ) : service.iframeSrc &&
                  !service.iframeSrc.includes("drive.google.com") ? (
                  <div className="w-full h-full relative group">
                    <iframe
                      src={service.iframeSrc}
                      title={service.heading}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen={!0}
                    />
                    <a
                      href={service.iframeSrc.replace("/preview", "/play")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playClick()}
                      onMouseEnter={() => sfx.playHover()}
                      className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/85 hover:bg-[#C5A059] text-zinc-300 hover:text-black border border-[#C5A059]/40 rounded px-2.5 py-1 text-[11px] font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer"
                      title="Abrir en pestaña nueva"
                    >
                      <ExternalLink size={12} />
                      <span>Ver externo</span>
                    </a>
                  </div>
                ) : service.image ? (
                  <div className="w-full h-full relative group overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.heading}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(g) => {
                        const b = g.currentTarget;
                        if (b.src.includes("googleusercontent.com/d/")) {
                          const x = b.src.match(
                            /googleusercontent\.com\/d\/([^=?&]+)/,
                          );
                          x &&
                            x[1] &&
                            (b.src = `https://drive.google.com/thumbnail?id=${x[1]}&sz=w1000`);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-[#C5A059]/40 rounded px-2.5 py-1 text-[11px] font-mono text-[#C5A059] flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                      <span>INTERFAZ & ARQUITECTURA EN PRODUCCIÓN</span>
                    </div>
                    {(service.videoDemoUrl ||
                      (service.iframeSrc &&
                        service.iframeSrc.includes("drive.google.com"))) && (
                      <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-3">
                        <span className="hidden sm:inline text-[11px] font-mono text-zinc-400 bg-black/80 px-2.5 py-1 rounded border border-zinc-800">
                          // DEMO DE EXTRACCIÓN
                        </span>
                        <a
                          href={
                            service.videoDemoUrl ||
                            service.iframeSrc?.replace("/preview", "/view?usp=sharing") ||
                            "https://drive.google.com/file/d/10kYGZWx0Yp-_UE_a3PaXyjoo0O5lt0rW/view?usp=sharing"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playPowerUp()}
                          onMouseEnter={() => sfx.playHover()}
                          className="ml-auto inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs px-3.5 py-2 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:shadow-[0_0_25px_rgba(255,224,102,0.8)] transition-all cursor-pointer"
                          title="Abrir video demostrativo en Google Drive"
                        >
                          <Play size={12} className="fill-current" />
                          <span>Ver Demo en Video (Drive) ↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : service.id === "NOVUX_MARKETPULSE" ? (
                  <div className="w-full h-full bg-[#07090e] p-5 flex flex-col justify-between font-mono relative text-left select-none overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="text-xs text-zinc-400 ml-1.5">
                          novux_marketpulse_engine.sh
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-1 rounded text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                        <span>[STATUS: ACTIVE MONITORING]</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 my-auto relative z-10 py-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="text-zinc-500">Target:</span>
                        <span className="text-zinc-200 font-semibold">
                          Competidor Alpha Retail
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="text-zinc-500">Item:</span>
                        <span className="text-white font-medium">
                          Laptop Pro 16" - Core Ultra
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-3">
                        <span>• Frecuencia: Cada 10 min</span>
                        <span>• Proxy: Residencial Stealth</span>
                        <span>• SKU: 94821-ALP</span>
                      </div>
                    </div>
                    <div className="bg-black/80 border border-zinc-800 rounded p-3 flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase">
                          Precio Actual:
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#FFE066] tracking-tight">
                          $4,607,500 COP
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block uppercase">
                          Variación Detectada:
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded inline-flex items-center gap-1">
                          <span>↓</span>
                          <span>-5.0% (DESCUENTO DETECTADO)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#121217] to-black text-center relative">
                    <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 flex items-center justify-center mb-3 bg-[#C5A059]/10">
                      <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-pulse" />
                    </div>
                    <span className="font-mono text-sm tracking-widest text-[#C5A059] font-semibold uppercase mb-1">
                      REPRODUCTOR DEMO
                    </span>
                    <span className="font-mono text-xs text-zinc-400 max-w-xs">
                      [ Enlace multimedia listo para vincular ]
                    </span>
                  </div>
                )}
              </div>
            )}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="w-full max-w-2xl bg-[#0e0e11]/85 backdrop-blur-md p-6 rounded-sm border border-[#C5A059]/30 hover:border-[#C5A059] shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(197,160,89,0.38)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A059]/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A059]/50" />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#C5A059] font-semibold">
                  {service.id === "SOFTWARE_FACTORY"
                    ? softwarePillar === "NOVUX_COT"
                      ? "CASE-TACTICAL-TWIN // NOVUX TACTICAL C2"
                      : "CASE-PRICING-GRID & CASE-DATA-FACTORY"
                    : (service.caseStudy?.title) ||
                      "CASO DE ÉXITO"}
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {service.id === "SOFTWARE_FACTORY"
                  ? softwarePillar === "NOVUX_COT"
                    ? "Centro de Comando y Control Geodésico y Gemelo Digital 3D (WebGL 2.0 + Three.js + MapLibre GL Engine). Procesamiento espacial métrico submétrico Gauss-Haversine, telemetría radar 360°, despacho interactivo de personal y cadena de custodia fotográfica con hash georreferenciado sin dependencias de terceros."
                    : "Motor Industrial de Extracción y Minería de Precios E-Commerce y Normalización de Catálogos. Orquestación híbrida de transporte adaptable, evasión perimetral de WAFs con herencia de sesiones persistentes y persistencia atómica multiformato."
                  : service.caseStudy?.description || ""}
              </p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="w-full max-w-2xl"
            >
              <TechStackGrid
                items={
                  service.id === "SOFTWARE_FACTORY"
                    ? softwarePillar === "NOVUX_COT"
                      ? [
                          {
                            name: "WebGL 2.0 / Three.js",
                            iconName: "window",
                          },
                          {
                            name: "MapLibre GL Engine",
                            iconName: "database",
                          },
                          {
                            name: "WASM Geodésico",
                            iconName: "cpu",
                          },
                          {
                            name: "Gauss-Haversine Math",
                            iconName: "regex",
                          },
                          {
                            name: "React 19 / TypeScript",
                            iconName: "code",
                          },
                        ]
                      : [
                          {
                            name: "Python 3.12",
                            iconName: "python",
                          },
                          {
                            name: "PyWebView GUI",
                            iconName: "window",
                          },
                          {
                            name: "Undetected-ChromeDriver",
                            iconName: "selenium",
                          },
                          {
                            name: "BeautifulSoup4",
                            iconName: "code",
                          },
                          {
                            name: "Pandas Core",
                            iconName: "database",
                          },
                          {
                            name: "libxml2 en RAM",
                            iconName: "cpu",
                          },
                        ]
                    : service.techStack || []
                }
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
