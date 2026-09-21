import { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Award,
  CheckCircle,
  Terminal,
  Brain,
  Cpu,
  ShieldAlert,
  Zap,
  Radio,
  BarChart,
  FileSpreadsheet,
  PieChart,
  Code
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

export interface VerifiedCredential {
  id: string;
  name: string;
  issuer: 'IBM SkillsBuild' | 'Coursera • IBM';
  issueDate: string;
  issueTimestamp: string; // Para ordenamiento cronológico preciso (más reciente a más antigua)
  category: string;
  type: 'IBM SkillsBuild' | 'Coursera';
  skills: string[];
  credlyUrl: string;
  iconType: 'python-web' | 'deep-learning' | 'ml-python' | 'cybersecurity' | 'agile' | 'emerging-tech' | 'python-ai' | 'data-viz' | 'excel-analytics' | 'analytics-essentials';
}

export const CREDLY_PROFILE_URL = 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564';

// Lista de credenciales ordenadas cronológicamente (de la más reciente a la más antigua) con sus URLs directas en Credly
export const VERIFIED_CREDENTIALS: VerifiedCredential[] = [
  {
    id: 'web-dev-python',
    name: 'Web Development with Python',
    issuer: 'IBM SkillsBuild',
    issueDate: '17 Dic, 2025',
    issueTimestamp: '2025-12-17',
    category: 'SOFTWARE FACTORY',
    type: 'IBM SkillsBuild',
    skills: ['Python Web', 'Backend Architecture', 'APIs & Microservicios', 'HTTP & MVC'],
    credlyUrl: 'https://www.credly.com/badges/77abc3dd-4012-4943-98a6-2f3ad5f3a8dc/public_url',
    iconType: 'python-web'
  },
  {
    id: 'deep-learning-keras',
    name: 'Deep Learning Essentials with Keras',
    issuer: 'Coursera • IBM',
    issueDate: '21 Oct, 2025',
    issueTimestamp: '2025-10-21',
    category: 'DEEP LEARNING',
    type: 'Coursera',
    skills: ['Keras', 'Redes Neuronales', 'TensorFlow', 'Modelos Predictivos'],
    credlyUrl: 'https://www.credly.com/badges/c19ffcca-ba12-4498-a726-cb619e87c2a9',
    iconType: 'deep-learning'
  },
  {
    id: 'machine-learning-python-v2',
    name: 'Machine Learning with Python (V2)',
    issuer: 'Coursera • IBM',
    issueDate: '4 Sep, 2025',
    issueTimestamp: '2025-09-04',
    category: 'MACHINE LEARNING',
    type: 'Coursera',
    skills: ['Scikit-Learn', 'Clasificación & Regresión', 'Clustering', 'Model Evaluation'],
    credlyUrl: 'https://www.credly.com/badges/9e8343b5-7f4e-4359-a657-5a33f0db5cb9',
    iconType: 'ml-python'
  },
  {
    id: 'cybersecurity-fundamentals',
    name: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    issueDate: '29 Oct, 2024',
    issueTimestamp: '2024-10-29',
    category: 'SEGURIDAD & WAF',
    type: 'IBM SkillsBuild',
    skills: ['Seguridad en Redes', 'Defensa Perimetral', 'Threat Modeling', 'Criptografía'],
    credlyUrl: 'https://www.credly.com/badges/cb02eb3b-c3e6-4d02-943b-4eed3abce34d',
    iconType: 'cybersecurity'
  },
  {
    id: 'agile-explorer',
    name: 'Agile Explorer',
    issuer: 'IBM SkillsBuild',
    issueDate: '9 Oct, 2024',
    issueTimestamp: '2024-10-09',
    category: 'GESTIÓN & PROYECTOS',
    type: 'IBM SkillsBuild',
    skills: ['Metodología Scrum', 'Sprint Planning', 'Iterative Delivery', 'CI/CD Flow'],
    credlyUrl: 'https://www.credly.com/badges/602c8139-5374-4119-b51f-6a494403f64e',
    iconType: 'agile'
  },
  {
    id: 'explore-emerging-tech',
    name: 'Explore Emerging Tech',
    issuer: 'IBM SkillsBuild',
    issueDate: '27 Sep, 2024',
    issueTimestamp: '2024-09-27',
    category: 'VANGUARDIA TECH',
    type: 'IBM SkillsBuild',
    skills: ['Cloud Computing', 'IA Aplicada', 'IoT & Edge', 'Blockchain & Edge Data'],
    credlyUrl: 'https://www.credly.com/badges/80ddf7e8-db8e-40f8-8e87-d84173ec4e24',
    iconType: 'emerging-tech'
  },
  {
    id: 'python-data-science-ai',
    name: 'Python for Data Science and AI',
    issuer: 'Coursera • IBM',
    issueDate: '14 Jul, 2024',
    issueTimestamp: '2024-07-14',
    category: 'DATA SCIENCE & IA',
    type: 'Coursera',
    skills: ['Pandas & NumPy', 'Data Structures', 'Data Cleansing', 'Inferencia Estadística'],
    credlyUrl: 'https://www.credly.com/badges/9ba69581-c97d-4c07-8e9c-9a067798150b',
    iconType: 'python-ai'
  },
  {
    id: 'data-viz-dashboards',
    name: 'Data Visualization & Dashboard Essentials',
    issuer: 'Coursera • IBM',
    issueDate: '18 Jun, 2024',
    issueTimestamp: '2024-06-18',
    category: 'BI & ANALÍTICA',
    type: 'Coursera',
    skills: ['Dashboards Ejecutivos', 'Narrativa de Datos', 'KPI Design', 'Looker/Plotly'],
    credlyUrl: 'https://www.credly.com/users/gustavo-de-la-rosa.abf5f564',
    iconType: 'data-viz'
  },
  {
    id: 'excel-essentials-analytics',
    name: 'Excel Essentials for Data Analytics',
    issuer: 'Coursera • IBM',
    issueDate: '9 Jun, 2024',
    issueTimestamp: '2024-06-09',
    category: 'HERRAMIENTAS BI',
    type: 'Coursera',
    skills: ['Modelado Financiero', 'Pivot Tables', 'Power Query', 'Tratamiento de Datos'],
    credlyUrl: 'https://www.credly.com/badges/7ca4a1f0-15f2-4381-a754-c452c09b7583',
    iconType: 'excel-analytics'
  },
  {
    id: 'data-analytics-essentials',
    name: 'Data Analytics Essentials',
    issuer: 'Coursera • IBM',
    issueDate: '2 Jun, 2024',
    issueTimestamp: '2024-06-02',
    category: 'ANALÍTICA DE DATOS',
    type: 'Coursera',
    skills: ['Ciclo de Vida del Dato', 'Minería de Datos', 'Toma de Decisiones', 'Reportes de Negocio'],
    credlyUrl: 'https://www.credly.com/badges/7ca4a1f0-15f2-4381-a754-c452c09b7583',
    iconType: 'analytics-essentials'
  }
];

function getCredentialIcon(iconType: string) {
  const iconProps = {
    className: 'w-4 h-4 text-[#C5A059] group-hover:text-[#FFE066] transition-colors',
    strokeWidth: 1.8
  };

  switch (iconType) {
    case 'python-web':
      return <Code {...iconProps} />;
    case 'deep-learning':
      return <Brain {...iconProps} />;
    case 'ml-python':
      return <Cpu {...iconProps} />;
    case 'cybersecurity':
      return <ShieldAlert {...iconProps} />;
    case 'agile':
      return <Zap {...iconProps} />;
    case 'emerging-tech':
      return <Radio {...iconProps} />;
    case 'python-ai':
      return <Terminal {...iconProps} />;
    case 'data-viz':
      return <BarChart {...iconProps} />;
    case 'excel-analytics':
      return <FileSpreadsheet {...iconProps} />;
    case 'analytics-essentials':
      return <PieChart {...iconProps} />;
    default:
      return <Award {...iconProps} />;
  }
}

export function CredentialsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Actualiza los estados de las flechas izquierda/derecha al hacer scroll
  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 5;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setCanScrollLeft(!atLeft);
    setCanScrollRight(!atRight);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    sfx.playClick();
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 350);
    }
  };

  const handleOpenCredly = (url: string) => {
    sfx.playPowerUp();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-6xl mb-12 flex flex-col items-center">
      {/* Barra superior de Credenciales */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between px-2 mb-3 gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold flex items-center gap-1.5">
            Credenciales Oficiales Verificadas
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="hidden sm:inline-flex text-zinc-600 font-mono text-xs">//</span>
          <span className="hidden sm:inline-flex text-[11px] font-mono text-zinc-400">
            Orden Cronológico • IBM & Coursera
          </span>
        </div>

        {/* Acceso a Credly */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <a
            href={CREDLY_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            onMouseEnter={() => sfx.playHover()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#FFE066] hover:text-black border border-[#C5A059]/50 hover:border-[#FFE066] text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] font-semibold"
          >
            <CheckCircle size={12} className="text-emerald-400 group-hover:text-black" />
            <span>Perfil Oficial en Credly</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Contenedor del Carrusel con Flechas Grandes en los Costados Izquierda y Derecha */}
      <div className="w-full relative py-1 px-1 sm:px-2 flex items-center">
        
        {/* Flecha Flotante Izquierda */}
        <button
          onClick={() => handleManualScroll('left')}
          onMouseEnter={() => sfx.playHover()}
          disabled={!canScrollLeft}
          aria-label="Desplazar credenciales hacia la izquierda"
          className={`absolute left-0 sm:-left-3 z-20 p-2.5 sm:p-3 rounded-full border transition-all duration-200 shadow-xl cursor-pointer flex items-center justify-center ${
            canScrollLeft
              ? 'bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_20px_rgba(0,0,0,0.85)] hover:shadow-[0_0_20px_rgba(197,160,89,0.6)] scale-100 hover:scale-110 active:scale-95'
              : 'bg-zinc-950/60 text-zinc-600 border-zinc-800/60 opacity-30 cursor-not-allowed'
          }`}
          title="Ver credenciales anteriores"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Pista estática de tarjetas desplazable por el usuario */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-8 sm:px-10 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VERIFIED_CREDENTIALS.map((item) => {
            const isIBMBuild = item.type === 'IBM SkillsBuild';

            return (
              <div
                key={item.id}
                onClick={() => handleOpenCredly(item.credlyUrl)}
                onMouseEnter={() => sfx.playHover()}
                className="group relative flex-shrink-0 w-[245px] sm:w-[270px] min-h-[160px] rounded-sm p-4 flex flex-col justify-between
                  bg-[#0a0a10]/95 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059]
                  shadow-[0_6px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(197,160,89,0.45)]
                  transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Esquinas Cibernéticas */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A059]/40 group-hover:border-[#FFE066] transition-colors duration-300" />

                {/* Resplandor ambiental al pasar el ratón */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Cabecera de la tarjeta: Emisor y Categoría */}
                <div className="flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 rounded bg-black/80 border border-zinc-800 group-hover:border-[#C5A059]/60 transition-colors">
                      {getCredentialIcon(item.iconType)}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 font-semibold tracking-wide">
                      {item.issuer}
                    </span>
                  </div>

                  <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded font-bold transition-colors ${
                    isIBMBuild 
                      ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30 group-hover:bg-blue-500/20' 
                      : 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 group-hover:bg-[#C5A059]/20 group-hover:text-[#FFE066]'
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Centro: Nombre de la credencial y fecha de emisión */}
                <div className="my-2.5 z-10">
                  <h4 className="font-mono text-[13px] font-bold text-white group-hover:text-[#FFE066] transition-colors leading-snug line-clamp-2">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-1.5">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle size={10} />
                      {item.issueDate}
                    </span>
                    <span className="text-[#C5A059] group-hover:text-[#FFE066] flex items-center gap-0.5 text-[9px] font-bold underline decoration-[#C5A059]/50">
                      Ver Insignia <ExternalLink size={8} />
                    </span>
                  </div>
                </div>

                {/* Pie: Etiquetas de habilidades validadas */}
                <div className="z-10 pt-2 border-t border-zinc-800/80 group-hover:border-[#C5A059]/40 transition-colors">
                  <div className="flex flex-wrap gap-1">
                    {item.skills.slice(0, 3).map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[9px] font-mono text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800/80 group-hover:border-zinc-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flecha Flotante Derecha */}
        <button
          onClick={() => handleManualScroll('right')}
          onMouseEnter={() => sfx.playHover()}
          disabled={!canScrollRight}
          aria-label="Desplazar credenciales hacia la derecha"
          className={`absolute right-0 sm:-right-3 z-20 p-2.5 sm:p-3 rounded-full border transition-all duration-200 shadow-xl cursor-pointer flex items-center justify-center ${
            canScrollRight
              ? 'bg-[#0e0e14] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border-[#C5A059]/60 hover:border-[#FFE066] shadow-[0_0_20px_rgba(0,0,0,0.85)] hover:shadow-[0_0_20px_rgba(197,160,89,0.6)] scale-100 hover:scale-110 active:scale-95'
              : 'bg-zinc-950/60 text-zinc-600 border-zinc-800/60 opacity-30 cursor-not-allowed'
          }`}
          title="Ver credenciales siguientes"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Indicador de ayuda y navegación en el pie */}
      <div className="text-center mt-1 flex items-center justify-center gap-2">
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
          // Usa las flechas laterales <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">◀</kbd> <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">▶</kbd> para explorar las 10 credenciales en orden cronológico
        </span>
      </div>
    </div>
  );
}
