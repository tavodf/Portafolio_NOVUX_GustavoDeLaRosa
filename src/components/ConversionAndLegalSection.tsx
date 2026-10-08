import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, ShieldCheck, Lock, CheckCircle2, Send, 
  ArrowUpRight, Phone, MessageSquare, Download, Scale
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { getWhatsAppUrl, WHATSAPP_CORPORATE_NUMBER, WHATSAPP_DISPLAY_NUMBER } from '../data';

export function ConversionAndLegalSection() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceChoice, setServiceChoice] = useState('NOVUX_MARKETPULSE');
  const [habeasDataAccepted, setHabeasDataAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habeasDataAccepted) {
      alert('Debe aceptar la Política de Tratamiento de Datos (Ley 1581 de 2012) para continuar.');
      return;
    }
    sfx.playPowerUp();
    setSubmitted(true);

    const message = `Hola NOVUX S.A.S., soy de la empresa ${companyName || 'Interesada'} (${email}). Deseo iniciar contacto comercial para el servicio de ${serviceChoice}.`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  const legalKit = [
    {
      code: 'NOVUX_F3.1.2',
      name: 'Oferta Mercantil Comercial v1.0',
      desc: 'Propuesta formal vinculante con desglose de entregables, SLA y cronograma financiero.',
      type: 'Propuesta Comercial'
    },
    {
      code: 'NOVUX_F3.1.3',
      name: 'Alcance del Servicio (SOW) v1.0',
      desc: 'Definición de requerimientos técnicos, hitos de sprint y criterios de aceptación cerrados.',
      type: 'Alcance Técnico'
    },
    {
      code: 'NOVUX_F3.1.4',
      name: 'Contrato Marco B2B Tech Services v1.0',
      desc: 'Cláusulas de cumplimiento, limitación de responsabilidad y 100% transferencia patrimonial de IP.',
      type: 'Contrato Marco'
    },
    {
      code: 'NOVUX_F3.2.1',
      name: 'Acuerdo de Confidencialidad (NDA) v1.0',
      desc: 'Blindaje estricto de secretos industriales, bases de datos propietarias y algoritmos mutuos.',
      type: 'Confidencialidad'
    }
  ];

  return (
    <section className="w-full max-w-6xl my-16">
      {/* Encabezado del Bloque 4 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0e0e13]/90 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(197,160,89,0.18)] mb-3">
          <Scale size={14} className="text-[#FFE066]" />
          <span>// BLOQUE 4: CIERRE DE CONVERSIÓN & KIT LEGAL COMPLIANCE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
          Compliance-by-Design & Contratación Inmediata
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto mt-2">
          Operamos bajo el marco legal de la República de Colombia con blindaje contractual en cesión de propiedad intelectual, acuerdos de confidencialidad y tratamiento de datos personales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Formulario Radar de Cotización Inmediata */}
        <div className="bg-[#0b0b12] border border-[#C5A059]/40 rounded-xl p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-[#C5A059] block uppercase tracking-wider">
                FORMULARIO RADAR B2B
              </span>
              <h3 className="text-lg font-bold text-white font-serif">
                Solicitar Cotización y SOW Técnico
              </h3>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#FFE066]">
              <MessageSquare size={16} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-zinc-300 block mb-1">Nombre de la Empresa / Contacto:</label>
              <input
                type="text"
                required
                placeholder="Ej: Distribuidora Andina S.A.S. / Carlos Ramos"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] text-zinc-100 rounded px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Correo Corporativo:</label>
              <input
                type="email"
                required
                placeholder="carlos@tuempresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] text-zinc-100 rounded px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Servicio B2B de Interés:</label>
              <select
                value={serviceChoice}
                onChange={(e) => setServiceChoice(e.target.value)}
                className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] text-zinc-100 rounded px-3 py-2.5 outline-none transition-colors"
              >
                <option value="NOVUX MarketPulse (Monitoreo Precios)">NOVUX MarketPulse (Setup $450 USD | Retainer $350-$450/mes)</option>
                <option value="DataOps & RPA (Conciliación CST 23)">DataOps & RPA (Setup $600 USD | Retainer $250/mes)</option>
                <option value="Web Data Harvesting (Ares Scraper WAF)">Web Data Harvesting (Base $500 USD / dataset)</option>
                <option value="Data Analytics & BI (Looker Studio)">Data Analytics & BI ($1,200 - $2,500 USD por fase)</option>
                <option value="AI Document & NLP (Auditoría BPE)">AI Document & NLP ($950 USD Setup + Fee volumen)</option>
                <option value="Software Factory (Tactical C2 3D & Ares Stack)">Software Factory // Tactical C2 Twin & Ares ($1,500 - $3,500 USD / Sprint)</option>
              </select>
            </div>

            {/* Checkbox Obligatorio Ley 1581 de 2012 */}
            <div className="pt-2 border-t border-zinc-800/80">
              <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-zinc-400 font-sans leading-relaxed">
                <input
                  type="checkbox"
                  checked={habeasDataAccepted}
                  onChange={(e) => setHabeasDataAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#C5A059] rounded cursor-pointer"
                />
                <span>
                  Autorizo el tratamiento de mis datos de contacto conforme a la <strong className="text-zinc-200">Ley 1581 de 2012</strong> de la República de Colombia y la Política de Tratamiento de Información (PTI) de NOVUX S.A.S. para fines exclusivos de cotización y relacionamiento comercial.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!habeasDataAccepted}
              className={`w-full py-3 px-4 rounded font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                habeasDataAccepted
                  ? 'bg-[#C5A059] hover:bg-[#FFE066] text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] animate-pulse'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Send size={13} />
              <span>Enviar Solicitud a WhatsApp Corporativo</span>
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-3 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 size={14} />
              <span>Redirigiendo a WhatsApp corporativo con su solicitud pre-llenada...</span>
            </div>
          )}
        </div>

        {/* Kit Documental Legal Blindado */}
        <div className="space-y-4">
          <div className="bg-[#0e0e15] border border-zinc-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE066] mb-3">
              <Lock size={14} className="text-[#C5A059]" />
              <span>KIT DOCUMENTAL LEGAL BLINDADO // NOVUX S.A.S.</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans mb-4 leading-relaxed">
              Disponemos de contratos tipo estandarizados que aceleran el cierre comercial B2B a menos de 48 horas con estricto apego al Código de Comercio y leyes colombianas:
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              {legalKit.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 hover:border-[#C5A059]/40 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <FileText size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 uppercase">{doc.code}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">{doc.type}</span>
                      </div>
                      <h4 className="text-white font-bold text-xs mt-0.5">{doc.name}</h4>
                      <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{doc.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold shrink-0">LISTO</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Datos Corporativos Oficiales */}
          <div className="p-4 rounded-xl bg-black/80 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px]">RAZÓN SOCIAL:</span>
              <strong className="text-zinc-200">NOVUX S.A.S.</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">JURISDICCIÓN:</span>
              <strong className="text-zinc-200">Bogotá D.C., Colombia</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">WHATSAPP B2B:</span>
              <strong className="text-emerald-400">Canal Oficial Verificado</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">TASA BASE:</span>
              <strong className="text-[#FFE066]">1 USD = $4,000 COP</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
