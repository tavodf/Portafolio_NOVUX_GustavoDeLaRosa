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
  Sparkles,
  CheckCircle2,
  Linkedin,
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
    className: `w-6 h-6 transition-all duration-300 ${
      isActive
        ? "text-[#C5A059] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]"
        : "text-[#FFE066] animate-pulse"
    }`,
    strokeWidth: 1.5,
  };
  const lower = techName.toLowerCase();
  if (lower.includes("python")) return <Terminal {...iconProps} />;
  if (lower.includes("pandas")) return <Table2 {...iconProps} />;
  if (lower.includes("regex") || lower.includes("haversine") || lower.includes("math"))
    return <SearchCode {...iconProps} />;
  if (lower.includes("looker") || lower.includes("d3") || lower.includes("chart"))
    return <ChartColumn {...iconProps} />;
  if (lower.includes("selenium") || lower.includes("shield") || lower.includes("waf") || lower.includes("proxy"))
    return <ShieldCheck {...iconProps} />;
  if (lower.includes("window") || lower.includes("webgl") || lower.includes("pywebview"))
    return <AppWindow {...iconProps} />;
  if (lower.includes("code") || lower.includes("react") || lower.includes("typescript"))
    return <CodeXml {...iconProps} />;
  if (lower.includes("database") || lower.includes("postgre") || lower.includes("sql") || lower.includes("dag"))
    return <Database {...iconProps} />;
  if (lower.includes("cpu") || lower.includes("wasm") || lower.includes("c") || lower.includes("fastapi"))
    return <Cpu {...iconProps} />;
  return <Layers {...iconProps} />;
}

function TechItem({ item, index }: { item: { name: string; iconName: string }; index: number }) {
  const [scrambledText, setScrambledText] = useState("");
  const [isSettled, setIsSettled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const triggerScramble = () => {
    setIsSettled(false);
    setIsHovered(true);
    const glyphs = "01#$<>%&_*/!?アイウエオカキ0123456789XYZ";
    let progress = 0;
    const original = item.name;
    const interval = setInterval(() => {
      setScrambledText(
        original
          .split("")
          .map((char, charIdx) =>
            charIdx < progress
              ? original[charIdx]
              : char === " " || char === "/"
              ? char
              : glyphs[Math.floor(Math.random() * glyphs.length)]
          )
          .join("")
      );
      if (progress >= original.length) {
        clearInterval(interval);
        setIsSettled(true);
        setIsHovered(false);
      }
      progress += 1 / 2.5;
    }, 40);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerScramble();
    }, 180 + index * 100);
    return () => clearTimeout(timer);
  }, [item.name, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.06, duration: 0.35 }}
      onMouseEnter={() => {
        sfx.playHover();
        if (isSettled) triggerScramble();
      }}
      className={`group relative w-full min-h-[110px] rounded-sm p-3.5 flex flex-col items-center justify-between text-center cursor-pointer
      bg-black/50 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059]
      shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]
      transition-all duration-300 ${isHovered ? "ring-1 ring-[#C5A059]/50" : ""}`}
    >
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative flex items-center justify-center pt-1">
        {getTechIcon(item.name || item.iconName, isSettled)}
      </div>
      <div className="w-full px-1 my-1 flex items-center justify-center">
        <span
          className={`font-mono text-xs sm:text-[13px] tracking-wide block transition-colors duration-200 font-semibold text-center leading-tight
          ${isSettled ? "text-zinc-200 group-hover:text-[#FFE066]" : "text-[#C5A059] drop-shadow-[0_0_5px_rgba(197,160,89,0.8)]"}`}
        >
          {scrambledText || item.name}
        </span>
      </div>
      <div
        className={`h-[2px] rounded-full transition-all duration-500 ${
          isSettled ? "w-5 bg-[#C5A059]/60 group-hover:w-10 group-hover:bg-[#C5A059]" : "w-2 bg-[#FFE066] animate-pulse"
        }`}
      />
    </motion.div>
  );
}

function TechStackGrid({ items }: { items?: { name: string; iconName: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="w-full mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A059] flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066] inline-block animate-pulse" />
          TECH STACK IMPLEMENTADO & VERIFICADO
        </span>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[#C5A059]/30 to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
        {items.map((item, i) => (
          <TechItem key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const handleBack = () => {
    sfx.playBack();
    onBack();
  };

  const handlePlayPowerUp = () => {
    sfx.playPowerUp();
  };

  // Render para Laboratorio e Investigación (mantiene vista intacta e independiente)
  if (service.isLab || service.id === "LABORATORIO_INVESTIGACION") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-black/80 via-[#06060c] to-black text-white flex flex-col font-sans select-none"
      >
        <header className="w-full pt-6 sm:pt-8 pb-4 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={handleBack}
            onMouseEnter={() => sfx.playHover()}
            className="group flex items-center gap-2 border border-[#C5A059]/50 text-[#C5A059] px-4 py-2 rounded-sm hover:bg-[#C5A059]/10 transition-all font-mono text-xs uppercase cursor-pointer w-fit"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Menú Principal</span>
          </button>
          <a
            href={getWhatsAppUrl("Hola NOVUX S.A.S., deseo consultar sobre los proyectos del Laboratorio e Investigación.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle size={13} />
            <span>ATENCIÓN WHATSAPP</span>
          </a>
        </header>
        <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:px-8">
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
    );
  }

  // URL del Demo Interactivo Principal
  const targetDemoUrl =
    service.demoUrl ||
    service.externalLink ||
    service.iframeSrc ||
    service.videoDemoUrl ||
    "https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform";

  const isSantaFe = service.id === 'CASE-SANTAFE-BI' || service.id === 'DATA_ANALYTICS';
  const isAres = service.id === 'CASE-ARES-GRID' || service.id === 'WEB_DATA_HARVESTING';
  const isCot = service.id === 'CASE-COT-OPS' || service.id === 'SOFTWARE_FACTORY';
  const isCpc = service.id === 'CASE-CPC-PULSE' || service.id === 'AI_DOCUMENT_NLP';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black/80 via-[#07070d] to-black/90 text-white flex flex-col font-sans"
    >
      {/* Barra de Navegación Superior */}
      <header className="w-full pt-6 pb-4 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            onMouseEnter={() => sfx.playHover()}
            className="group flex items-center gap-2 border border-[#C5A059]/50 text-[#C5A059] px-4 py-2 rounded-sm hover:bg-[#C5A059]/10 transition-all font-mono text-xs uppercase cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Menú</span>
          </button>
          <span className="font-mono text-xs text-[#FFE066] font-bold bg-[#C5A059]/15 border border-[#C5A059]/40 px-3 py-1 rounded">
            {service.shortIdentifier || service.categoryTitle}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href="https://www.linkedin.com/in/tavodelarosaf/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0077b5]/15 hover:bg-[#0077b5]/30 border border-[#0077b5]/50 hover:border-[#0077b5] text-cyan-200 hover:text-white font-mono text-xs font-bold transition-all shadow-sm"
            title="Perfil Oficial de LinkedIn de Gustavo De La Rosa"
          >
            <Linkedin size={13} className="text-[#0077b5]" />
            <span className="hidden sm:inline">LINKEDIN</span>
          </a>

          <a
            href={getWhatsAppUrl(`Hola NOVUX S.A.S., me comunico desde la vista detallada de ${service.shortIdentifier || service.categoryTitle} para cotizar implementación.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            onMouseEnter={() => sfx.playHover()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-xs font-bold transition-all shadow-sm w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle size={13} />
            <span>ATENCIÓN WHATSAPP B2B</span>
          </a>
        </div>
      </header>

      {/* Contenido Principal: INVERSIÓN DEL EMBUDO (Case-First) */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 flex flex-col gap-8">
        
        {/* ========================================================================= */}
        {/* FASE 1: EL CASO DE ÉXITO (EL PROBLEMA Y LA EVIDENCIA TÉCNICA DEMOSTRADA) */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#0a0a10]/90 backdrop-blur-md border border-[#C5A059]/30 rounded-sm p-5 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Cyber Brackets */}
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C5A059]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C5A059]" />

          {/* Cabecera del Caso de Éxito */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-[#FFE066] bg-[#C5A059]/15 border border-[#C5A059]/50 px-3 py-1 rounded uppercase tracking-wider">
                *{service.caseBadge || service.id}*
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-3 py-1 rounded inline-flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{service.statusTag || '[SISTEMA EN LÍNEA // VERIFICADO]'}</span>
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              // PROGRAMA INSIGNIA DESPLEGADO POR NOVUX
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white uppercase tracking-wide mb-3 leading-tight font-bold">
            {service.heading}
          </h1>

          {/* Métrica Clave Prominente */}
          {service.keyMetric && (
            <div className="my-4 p-3 sm:p-4 rounded-sm bg-black/80 border-l-4 border-l-[#FFE066] border-y border-r border-zinc-800 shadow-inner">
              <div className="text-[10px] font-mono text-[#FFE066] uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#FFE066]" />
                <span>MÉTRICA CLAVE COMPROBADA EN PRODUCCIÓN:</span>
              </div>
              <p className="text-sm sm:text-base font-mono text-zinc-100 font-semibold leading-snug">
                {service.keyMetric}
              </p>
            </div>
          )}

          {/* Grilla de 2 Columnas: Izquierda Problema & Evidencia | Derecha Terminal Telemetría & Media */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start my-6">
            
            {/* Columna Izquierda: El Valor de Negocio, el Problema Resuelto y la Arquitectura */}
            <div className="lg:col-span-6 flex flex-col gap-4 text-left">
              
              {/* Valor Comercial y ROI */}
              {service.businessValue && (
                <div className="p-4 rounded-sm bg-emerald-950/30 border border-emerald-500/40 text-left shadow-sm">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1.5 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    // IMPACTO EN EL NEGOCIO & RETORNO DE INVERSIÓN (ROI):
                  </span>
                  <p className="text-sm sm:text-[15px] text-zinc-100 font-sans leading-relaxed font-medium">
                    {service.businessValue}
                  </p>
                </div>
              )}

              {/* El Problema de Negocio que Elimina */}
              {service.businessProblem && (
                <div className="p-3.5 rounded-sm bg-black/70 border-l-2 border-l-amber-500 border-y border-r border-zinc-800 text-left">
                  <span className="text-[10.5px] font-mono text-amber-400 uppercase tracking-wider block mb-1 font-bold">
                    EL DOLOR OPERATIVO QUE ELIMINA:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {service.businessProblem}
                  </p>
                </div>
              )}

              {/* Sectores y Organizaciones Objetivo */}
              {service.targetAudience && (
                <div className="p-3 rounded-sm bg-[#0e0e16]/70 border border-[#C5A059]/30 text-left">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1 font-bold">
                    DIRIGIDO A:
                  </span>
                  <p className="text-xs text-zinc-200 font-sans">
                    {service.targetAudience}
                  </p>
                </div>
              )}

              {/* Arquitectura Técnica */}
              <div className="p-4 rounded-sm bg-[#0e0e16]/80 border border-zinc-800 text-left">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                  // LA SOLUCIÓN TÉCNICA & ARQUITECTURA:
                </span>
                <p className="text-sm sm:text-[15px] text-gray-200 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              {service.technicalArgument && (
                <div className="p-3.5 rounded-sm bg-black/70 border-l-2 border-l-[#C5A059] border-y border-r border-zinc-800 text-left">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    ARGUMENTO DE INGENIERÍA:
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-zinc-200 italic leading-relaxed">
                    "{service.technicalArgument}"
                  </p>
                </div>
              )}

              {/* Grid de Métricas de Rendimiento Logradas */}
              {service.metrics && service.metrics.length > 0 && (
                <div className="mt-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                    // MÉTRICAS DE RENDIMIENTO VERIFICADAS:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {service.metrics.map((m, idx) => (
                      <div key={idx} className="bg-black/90 border border-[#C5A059]/30 rounded p-2.5 text-left">
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase mb-1">
                          {m.label}
                        </span>
                        <span className="text-sm sm:text-base font-mono font-bold text-[#FFE066] block leading-tight">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna Derecha: Terminal en Vivo con Telemetría & Contenedor Visual */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Media Container (Looker Studio iframe, Video Ares, o Imagen COT) */}
              <div className="w-full aspect-[16/9] rounded overflow-hidden shadow-2xl border border-[#C5A059]/40 bg-black relative">
                {isSantaFe && service.iframeSrc ? (
                  <div className="w-full h-full relative group">
                    <iframe
                      src={service.iframeSrc}
                      title="Looker Studio Comando Central Bogotá"
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                    <a
                      href={service.externalLink || service.iframeSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="absolute top-2 right-2 bg-black/85 hover:bg-[#C5A059] text-zinc-200 hover:text-black border border-[#C5A059]/50 rounded px-2.5 py-1 text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <ExternalLink size={12} />
                      <span>Abrir Pantalla Completa</span>
                    </a>
                  </div>
                ) : isAres && service.videoSrc ? (
                  <div className="w-full h-full relative group bg-black">
                    <video
                      src={service.videoSrc}
                      poster={service.image}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-purple-500/50 rounded px-2.5 py-1 text-[10.5px] font-mono text-purple-300 flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>Novux ARES SCRAP // DEMO EN EJECUCIÓN</span>
                    </div>
                  </div>
                ) : isCot && service.image ? (
                  <div className="w-full h-full relative group bg-black">
                    <img
                      src={service.image}
                      alt="Novux COT // Tactical Digital Twin C2 // WebGL 2.0"
                      className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded px-2.5 py-1 text-[10.5px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>NOVUX TACTICAL C2 // GEMELO DIGITAL 3D (60 FPS)</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/90 border border-emerald-500/50 rounded px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-bold">
                      PRECISIÓN SUB-METRO WGS84
                    </div>
                  </div>
                ) : isCpc && service.image ? (
                  <div className="w-full h-full relative group bg-black">
                    <img
                      src={service.image}
                      alt="CONTROL POLÍTICO // ELECTORAL CUBE & HEMICICLO 3D"
                      className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-emerald-500/50 rounded px-2.5 py-1 text-[10.5px] font-mono text-emerald-300 flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Novux CPC // POLITICAL & LEGALTECH INTELLIGENCE</span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/90 border border-emerald-500/50 rounded px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-bold">
                      45/45 CURULES // LIVE HUD
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative group bg-black flex items-center justify-center p-4">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.heading}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center font-mono text-zinc-400">
                        <Terminal size={36} className="mx-auto mb-2 text-[#C5A059]" />
                        <span>MÓDULO INTERACTIVO EN PRODUCCIÓN</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terminal con Telemetría en Vivo */}
              <div className="w-full overflow-hidden rounded-sm border border-zinc-800 bg-[#07090f] p-3.5 font-mono text-left select-none shadow-inner">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-xs text-zinc-300 ml-1 font-semibold truncate">
                      {isSantaFe
                        ? 'santafe_bi_pipeline.py'
                        : isAres
                        ? 'ares_scraper_engine.py'
                        : isCot
                        ? 'novux_cot_engine.wasm'
                        : 'cpc_pulse_dag.py'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                    [TELEMETRÍA: ACTIVA]
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 py-1">
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 shrink-0 w-28">Arquitectura:</span>
                    <span className="text-zinc-200 font-semibold truncate">
                      {isSantaFe
                        ? 'PostgreSQL + PostGIS + React + D3.js'
                        : isAres
                        ? 'Python Asíncrono + Selenium Stealth + libxml2 en RAM'
                        : isCot
                        ? 'WebGL 2.0 + Three.js 3D + Gauss-Haversine WASM'
                        : 'React 19 + Three.js 3D + FastAPI + Kahn DAG'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 shrink-0 w-28">Verificación:</span>
                    <span className="text-[#FFE066] font-medium truncate">
                      {isSantaFe
                        ? 'Auditoría 131k registros territoriales en Bogotá'
                        : isAres
                        ? 'Pipeline continuo de alta disponibilidad y persistencia de sesión'
                        : isCot
                        ? '60 FPS constantes GPU y Hash SHA-256 de custodia'
                        : '45 curules en vivo y validación de actas E-14 vs E-24'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Tech Stack Interactivo con Scrambler Matrix */}
          <TechStackGrid items={service.techStack} />

        </section>

        {/* ========================================================================= */}
        {/* FASE 2: LA OFERTA DE INFRAESTRUCTURA DERIVADA (CÓMO ADAPTARLO AL CLIENTE) */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#0a0a14]/95 border-2 border-[#C5A059]/50 rounded-sm p-6 sm:p-8 shadow-[0_0_35px_rgba(197,160,89,0.18)] text-left relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#FFE066] font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>[ INFRAESTRUCTURA DISPONIBLE PARA IMPLEMENTACIÓN ]</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white uppercase tracking-wide mb-3 font-bold">
            {service.derivedServiceTitle || 'Infraestructura Tecnológica Derivada a Medida'}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans mb-6 max-w-4xl">
            {service.derivedServiceDescription ||
              'A partir de este motor algorítmico y arquitectura ya desplegada, en NOVUX D&D no construimos desde cero: adaptamos, parametrizamos y desplegamos esta misma base tecnológica a las necesidades operativas, comerciales y de datos de su organización con entrega total de código y control propietario.'}
          </p>

          {/* Capacidades Derivadas Listadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {(service.derivedServices || (service.keyServices ? service.keyServices.map(k => `${k.title}${k.detail ? `: ${k.detail}` : ''}`) : [])).map((capText: string, cIdx: number) => (
              <div
                key={cIdx}
                className="flex items-start gap-2.5 p-3 rounded-sm bg-black/60 border border-zinc-800/90 text-left"
              >
                <CheckCircle2 size={16} className="text-[#FFE066] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-200 font-sans">
                  {capText}
                </span>
              </div>
            ))}
          </div>

          {/* Ventajas Comerciales Clave para el Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-sm bg-black/80 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                AHORRO DE COSTES & TIME-TO-MARKET:
              </span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Despliegue hasta 5x más rápido adaptando motores ya probados en producción con cero riesgo de arranque.
              </p>
            </div>
            <div className="p-3.5 rounded-sm bg-black/80 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-[#FFE066] uppercase font-bold block mb-1">
                CERO COSTOS POR USUARIO (NO SAAS):
              </span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Infraestructura propia y escalable: no pague suscripciones mensuales crecientes por asiento de usuario.
              </p>
            </div>
            <div className="p-3.5 rounded-sm bg-black/80 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                100% CESIÓN DE CÓDIGO E IP:
              </span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Control absoluto de su propiedad intelectual y código fuente sin dependencia de terceros (vendor lock-in).
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded bg-black/70 border border-zinc-800 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>MODALIDAD DE ENTREGA: DESPLIEGUE A MEDIDA CON 100% CESIÓN DE CÓDIGO E IP</span>
            <span className="text-emerald-400 font-bold">DISPONIBILIDAD INMEDIATA</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FASE 3: BOTONES DE ACCIÓN (CALL TO ACTION DIRECTOS) */}
        {/* ========================================================================= */}
        <section className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          
          {/* Botón Primario: LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗ */}
          <a
            href={targetDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePlayPowerUp}
            onMouseEnter={() => sfx.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-[#C5A059] via-[#FFE066] to-[#C5A059] hover:from-[#FFE066] hover:to-[#C5A059] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(197,160,89,0.5)] hover:shadow-[0_0_40px_rgba(255,224,102,0.8)] cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <span>{service.ctaText || '[ LANZAR DEMO INTERACTIVO // DEMO ACTIVA ↗ ]'}</span>
            <ExternalLink size={16} />
          </a>

          {/* Botón Secundario: SOLICITAR DESARROLLO A MEDIDA / INICIAR PROYECTO */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfIf2E1nj-Q1fCWGq2xAQlVGhPRItPS2TjMIprrCq33PgweQw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            onMouseEnter={() => sfx.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-sm border-2 border-[#C5A059] hover:bg-[#C5A059] text-[#FFE066] hover:text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <span>{service.secondaryCtaText || '[ SOLICITAR DESARROLLO A MEDIDA ]'}</span>
          </a>

          {/* Botón WhatsApp Directo */}
          <a
            href={getWhatsAppUrl(`Hola NOVUX S.A.S., deseo cotizar e iniciar proyecto sobre ${service.shortIdentifier || service.categoryTitle}.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            onMouseEnter={() => sfx.playHover()}
            className="w-full sm:w-auto px-6 py-4 rounded-sm border border-emerald-500/70 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          >
            <MessageCircle size={16} />
            <span>CONSULTA INMEDIATA WHATSAPP</span>
          </a>

        </section>

      </main>
    </motion.div>
  );
}
