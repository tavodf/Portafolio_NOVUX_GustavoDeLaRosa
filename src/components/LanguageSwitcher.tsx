import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sfx } from '../utils/soundEffects';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  const handleSwitch = (newLang: 'es' | 'en') => {
    if (newLang !== lang) {
      sfx.playClick();
      setLang(newLang);
    }
  };

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-sm bg-[#0a0a10]/90 border border-[#C5A059]/40 shadow-sm backdrop-blur-md font-mono text-[11px] ${className}`}
      role="group"
      aria-label="Selector de Idioma / Language Selector"
    >
      <div className="px-1.5 py-1 text-zinc-500 hidden sm:flex items-center justify-center">
        <Globe size={12} className="text-[#C5A059]" />
      </div>

      <button
        onClick={() => handleSwitch('es')}
        className={`px-2 py-1 rounded-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
          lang === 'es'
            ? 'bg-[#C5A059] text-black shadow-[0_0_12px_rgba(197,160,89,0.5)]'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
        title="Cambiar a Español"
        aria-pressed={lang === 'es'}
      >
        ES
      </button>

      <span className="text-zinc-700 px-0.5 select-none">|</span>

      <button
        onClick={() => handleSwitch('en')}
        className={`px-2 py-1 rounded-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-[#C5A059] text-black shadow-[0_0_12px_rgba(197,160,89,0.5)]'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
        title="Switch to English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
};
