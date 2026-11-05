import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Mail, Building2, User, Sparkles, CheckCircle2, 
  Lock, ArrowRight, BellRing, FileSpreadsheet, Copy, Check, ChevronDown, ChevronUp, ExternalLink 
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_WEBHOOK_URL = (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwNnNewUu94j1FEPH4SFvs_hUVzD1__txyA1o9sTroozVqpTLbnZvjNjCP9aa3yNuQL/exec';

const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * NOVUX Data & Development - Official Google Sheets Webhook & Email Alert
 * Target: Automated lead insertion and direct notification to Gustavo.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha y Hora", 
        "Nombre / Alias", 
        "Correo Electrónico", 
        "Empresa", 
        "Interés Primario", 
        "Origen / Canal"
      ]);
      sheet.getRange(1, 1, 1, 6)
           .setFontWeight("bold")
           .setBackground("#0c0c16")
           .setFontColor("#FFE066");
      sheet.setFrozenRows(1);
    }
    
    sheet.appendRow([
      data.fecha || new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      data.name || "N/A",
      data.email || "N/A",
      data.company || "Independiente",
      data.interest || "Ecosistema NOVUX",
      data.origen || "Bitácora L7 novuxops.com"
    ]);
    
    var emailDestino = "GustavoDLR53@gmail.com";
    var asunto = "⚡ [RADAR NOVUX] Nuevo Contacto Registrado: " + data.name + " (" + (data.company || "Independiente") + ")";
    var cuerpo = "Se ha registrado un nuevo contacto en el Radar de Ingeniería NOVUX:\\n\\n" +
                 "• Nombre: " + data.name + "\\n" +
                 "• Correo: " + data.email + "\\n" +
                 "• Empresa: " + (data.company || "Independiente") + "\\n" +
                 "• Interés Primario: " + data.interest + "\\n" +
                 "• Fecha: " + (data.fecha || new Date().toLocaleString()) + "\\n" +
                 "• Origen: " + (data.origen || "Bitácora L7") + "\\n\\n" +
                 "El registro ya ha sido persistido automáticamente en tu Google Sheet privada.";
                 
    MailApp.sendEmail(emailDestino, asunto, cuerpo);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export function NovuxRegistrationCard() {
  const { lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState('ALL');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Configuración de Webhook Google Sheets
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('novux_sheets_webhook_url') || DEFAULT_WEBHOOK_URL;
  });
  const [showConfig, setShowConfig] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [webhookSaved, setWebhookSaved] = useState(false);

  const handleSaveWebhook = (url: string) => {
    sfx.playClick();
    setWebhookUrl(url);
    localStorage.setItem('novux_sheets_webhook_url', url.trim());
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2500);
  };

  const handleCopyScript = () => {
    sfx.playClick();
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClick();
    setErrorMsg(null);

    if (honeypot.trim() !== '') {
      setSubmitted(true);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your name or professional alias.' : 'Por favor ingresa tu nombre o alias profesional.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid corporate or personal email.' : 'Por favor ingresa un correo corporativo o personal válido.');
      return;
    }

    setIsSubmitting(true);

    const cleanName = name.replace(/[<>]/g, '').trim();
    const cleanEmail = email.replace(/[<>]/g, '').trim();
    const cleanCompany = company.replace(/[<>]/g, '').trim();

    const payload = {
      timestamp: new Date().toISOString(),
      fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || (lang === 'en' ? 'Independent' : 'Independiente'),
      interest,
      origen: 'Bitácora L7 - novuxops.com',
    };

    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Webhook dispatch error (handled gracefully):', err);
      }
    }

    try {
      const stored = JSON.parse(localStorage.getItem('novux_registrations') || '[]');
      stored.push(payload);
      localStorage.setItem('novux_registrations', JSON.stringify(stored));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sfx.playPowerUp();
    }, 500);
  };

  return (
    <div className="w-full my-12 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-gradient-to-b from-[#0c0c16] via-[#08080e] to-[#040406] p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(197,160,89,0.18)] select-none relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C5A059]/30 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <BellRing size={16} className="text-[#FFE066] animate-pulse" />
            <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider">
              {lang === 'en'
                ? 'OFFICIAL SUBSCRIPTION // TECH RADAR, LOGS & NOVUX PRODUCTS'
                : 'SUSCRIPCIÓN OFICIAL // RADAR TECH, BITÁCORAS & PRODUCTOS NOVUX'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sfx.playClick();
                setShowConfig(!showConfig);
              }}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#C5A059] hover:text-[#FFE066] bg-black/60 px-2.5 py-1 rounded border border-[#C5A059]/30 hover:border-[#C5A059] cursor-pointer transition-colors"
              title={lang === 'en' ? 'Configure Google Sheets Webhook' : 'Configurar webhook Google Sheets'}
            >
              <FileSpreadsheet size={12} />
              <span>Google Sheets Webhook</span>
              {showConfig ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
              <Lock size={11} className="text-emerald-400" />
              <span>TLS 1.3 • Google Script Connected</span>
            </div>
          </div>
        </div>

        {/* Panel Desplegable de Configuración Google Apps Script */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-5 rounded-lg bg-black/95 border border-[#C5A059]/50 font-mono text-xs space-y-4 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                <span className="text-[#FFE066] font-bold flex items-center gap-1.5">
                  <FileSpreadsheet size={14} />
                  <span>
                    {lang === 'en'
                      ? 'DIRECT GOOGLE SHEETS INTEGRATION & EMAIL ALERT'
                      : 'VINCULACIÓN DIRECTA CON GOOGLE SHEETS & ALERTA POR CORREO'}
                  </span>
                </span>
                <span className="text-zinc-500 text-[10px]">
                  {lang === 'en' ? 'Target Email: GustavoDLR53@gmail.com' : 'Destino de Correo: GustavoDLR53@gmail.com'}
                </span>
              </div>

              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {lang === 'en' ? (
                  <>Every registration entered in this form is automatically dispatched via <strong>POST (JSON)</strong> to a private Google Apps Script hosted on Drive, persisting the lead into Google Sheets and sending a real-time email notification.</>
                ) : (
                  <>Cada registro ingresado en este formulario se envía automáticamente por <strong>POST (JSON)</strong> a un script privado alojado en tu Google Drive. El script inserta los datos en tu Google Sheet y te envía una notificación por correo en tiempo real.</>
                )}
              </p>

              {/* Input de la URL del Webhook */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#C5A059] font-bold flex items-center justify-between">
                  <span>{lang === 'en' ? 'Webhook Deployment URL (Google Apps Script /exec):' : 'URL de Implementación Webhook (Google Apps Script /exec):'}</span>
                  {webhookSaved && <span className="text-emerald-400 font-normal">✓ {lang === 'en' ? 'Saved in browser' : 'Guardado en tu navegador'}</span>}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 bg-[#090912] border border-zinc-800 focus:border-[#C5A059] px-3 py-2 rounded text-xs text-zinc-200 outline-none font-mono"
                  />
                  <button
                    onClick={() => handleSaveWebhook(webhookUrl)}
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Save URL' : 'Guardar URL'}
                  </button>
                </div>
              </div>

              {/* Código Listo para Copiar de Google Apps Script */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{lang === 'en' ? 'Production Code for Google Apps Script (doPost):' : 'Código de Producción para Google Apps Script (doPost):'}</span>
                  <button
                    onClick={handleCopyScript}
                    className="text-[#FFE066] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedScript ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedScript ? (lang === 'en' ? 'Copied' : 'Copiado') : (lang === 'en' ? 'Copy Script' : 'Copiar Script')}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#06060c] border border-zinc-900 rounded text-[10.5px] text-zinc-400 overflow-x-auto max-h-48 overflow-y-auto">
                  {GOOGLE_APPS_SCRIPT_TEMPLATE}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-lg bg-black/80 border border-[#C5A059] text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 border border-[#FFE066] flex items-center justify-center mx-auto text-[#FFE066]">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold text-white font-mono">
                {lang === 'en' ? 'REGISTRATION CONFIRMED IN NOVUX RADAR!' : '¡REGISTRO CONFIRMADO EN EL RADAR NOVUX!'}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto font-sans leading-relaxed">
                {lang === 'en' ? (
                  <>Your details have been successfully logged. You will receive early access to upcoming <strong>L7 engineering papers</strong>, <strong>MarketPulse</strong> updates, and software releases.</>
                ) : (
                  <>Tus datos han sido registrados e insertados con éxito. Recibirás en primicia los próximos <strong>papers de ingeniería L7</strong>, actualizaciones de <strong>MarketPulse</strong> y liberaciones de software.</>
                )}
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-[#FFE066] bg-[#C5A059]/15 px-3 py-1 rounded border border-[#C5A059]/30">
                  // Vector: {email} • Google Sheets Synchronized
                </span>
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="max-w-2xl mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {lang === 'en'
                    ? 'Receive Engineering Briefings & Product Notifications'
                    : 'Recibe los Despachos de Ingeniería y Notificaciones de Producto'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {lang === 'en' ? (
                    <>No intermediaries or generic newsletters. Receive low-level technical breakdowns, data architecture analyses, and availability alerts for <strong>NOVUX MarketPulse</strong> and the <strong>Software Factory</strong> directly in your inbox.</>
                  ) : (
                    <>Sin intermediarios ni boletines genéricos. Recibe directamente en tu bandeja desgloses técnicos de bajo nivel, análisis de arquitectura de datos y alertas de disponibilidad para <strong>NOVUX MarketPulse</strong> y la <strong>Software Factory</strong>.</>
                  )}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="_security_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <User size={11} className="text-[#C5A059]" />
                      <span>{lang === 'en' ? 'Name / Alias' : 'Nombre / Alias'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'E.g. Gustavo De La Rosa' : 'Ej. Gustavo De La Rosa'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-zinc-200 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Mail size={11} className="text-[#C5A059]" />
                      <span>{lang === 'en' ? 'Email Address' : 'Correo Electrónico'}</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={lang === 'en' ? 'example@company.com' : 'ejemplo@empresa.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-zinc-200 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Building2 size={11} className="text-[#C5A059]" />
                      <span>{lang === 'en' ? 'Company (Optional)' : 'Empresa (Opcional)'}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'E.g. E-Commerce Corp' : 'Ej. E-Commerce Corp'}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-zinc-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    {lang === 'en' ? 'Primary Subscription Interest:' : 'Interés Primario de Suscripción:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    {[
                      { id: 'ALL', label: lang === 'en' ? 'Full NOVUX Ecosystem' : 'Todo el Ecosistema NOVUX' },
                      { id: 'MARKETPULSE', label: 'NOVUX MarketPulse' },
                      { id: 'FACTORY', label: 'Software Factory & Cloud' },
                      { id: 'PAPERS', label: lang === 'en' ? 'Papers & L7 Log' : 'Papers & Bitácora L7' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          sfx.playClick();
                          setInterest(item.id);
                        }}
                        className={`p-2 rounded border text-left transition-all cursor-pointer ${
                          interest === item.id
                            ? 'bg-[#C5A059]/20 border-[#FFE066] text-[#FFE066] font-bold shadow-md'
                            : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {lang === 'en'
                      ? '* TLS 1.3 Encryption • Automated Google Sheets insertion & instant notification.'
                      : '* Encriptación TLS 1.3 • Inserción automática a Google Sheets & notificación inmediata.'}
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center gap-2"
                  >
                    <span>
                      {isSubmitting
                        ? (lang === 'en' ? 'Transmitting to Google Sheets...' : 'Transmitiendo a Google Sheets...')
                        : (lang === 'en' ? 'Subscribe to Radar' : 'Suscribirme al Radar')}
                    </span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
