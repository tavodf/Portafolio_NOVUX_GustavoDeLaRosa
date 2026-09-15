import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Database, 
  SearchCode, 
  BarChart3, 
  Code2, 
  Cpu, 
  Table2, 
  Layers,
  ShieldCheck,
  AppWindow
} from 'lucide-react';
import { TechItem } from '../types';
import { sfx } from '../utils/soundEffects';

interface TechStackProps {
  items?: TechItem[];
}

// Icon mapper for tech items
function getTechIcon(iconName: string, isDecoded: boolean) {
  const iconProps = {
    className: `w-6 h-6 transition-all duration-300 ${
      isDecoded 
        ? 'text-[#C5A059] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]' 
        : 'text-[#FFE066] animate-pulse'
    }`,
    strokeWidth: 1.5
  };

  switch (iconName) {
    case 'python':
      return <Terminal {...iconProps} />;
    case 'pandas':
      return <Table2 {...iconProps} />;
    case 'regex':
      return <SearchCode {...iconProps} />;
    case 'looker':
      return <BarChart3 {...iconProps} />;
    case 'selenium':
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'pywebview':
    case 'window':
      return <AppWindow {...iconProps} />;
    case 'code':
      return <Code2 {...iconProps} />;
    case 'database':
      return <Database {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
}

interface TechCardProps {
  key?: string | number;
  item: TechItem;
  index: number;
}

function TechCard({ item, index }: TechCardProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDecoded, setIsDecoded] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const startDecoding = () => {
    setIsDecoded(false);
    setIsGlitching(true);
    const chars = '01#$<>%&_*/!?アイウエオカキ0123456789XYZ';
    let iteration = 0;
    const target = item.name;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, charIdx) => {
            if (charIdx < iteration) {
              return target[charIdx];
            }
            if (char === ' ' || char === '/') return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsDecoded(true);
        setIsGlitching(false);
      }

      iteration += 1 / 2.5;
    }, 40);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Initial staggered decoding animation
    const timeout = setTimeout(() => {
      startDecoding();
    }, 200 + index * 120);

    return () => clearTimeout(timeout);
  }, [item.name, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
      onMouseEnter={() => {
        sfx.playHover();
        if (isDecoded) {
          startDecoding();
        }
      }}
      className={`group relative w-full min-h-[112px] sm:min-h-[120px] rounded-sm p-4 flex flex-col items-center justify-between text-center cursor-pointer
        bg-black/40 backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059]
        shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]
        transition-all duration-300
        ${isGlitching ? 'ring-1 ring-[#C5A059]/50' : ''}`}
    >
      {/* Subtle top corner accent */}
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A059]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Cyber/Matrix Scanline effect overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon */}
      <div className="relative flex items-center justify-center pt-1">
        {getTechIcon(item.iconName, isDecoded)}
      </div>

      {/* Decoded/Glitch Text */}
      <div className="w-full px-1 my-1.5 flex items-center justify-center">
        <span 
          className={`font-mono text-xs sm:text-sm tracking-wide block transition-colors duration-200 font-semibold text-center leading-tight
            ${isDecoded 
              ? 'text-zinc-200 group-hover:text-[#FFE066]' 
              : 'text-[#C5A059] drop-shadow-[0_0_5px_rgba(197,160,89,0.8)]'
            }`}
        >
          {displayText || item.name}
        </span>
      </div>

      {/* Status indicator line */}
      <div 
        className={`h-[2px] rounded-full transition-all duration-500 ${
          isDecoded 
            ? 'w-5 bg-[#C5A059]/60 group-hover:w-10 group-hover:bg-[#C5A059]' 
            : 'w-2 bg-[#FFE066] animate-pulse'
        }`} 
      />
    </motion.div>
  );
}

export function TechStack({ items }: TechStackProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A059] flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse" />
          Stack Tecnológico
        </span>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[#C5A059]/30 to-transparent" />
      </div>

      {/* 4 small square boxes in horizontal grid centered */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full justify-center">
        {items.map((item, idx) => (
          <TechCard key={item.name} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}
