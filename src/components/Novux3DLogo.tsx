import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { sfx } from '../utils/soundEffects';

interface Novux3DLogoProps {
  className?: string;
  imageSrc?: string;
}

export function Novux3DLogo({
  className = '',
  imageSrc = 'https://lh3.googleusercontent.com/d/14YSecawix_ogB7wJocutwLOwSXtztcKU=w1000?v=2',
}: Novux3DLogoProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Manejador del 3D Tilt interactivo
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rango de rotación tridimensional (-18deg a +18deg)
    const rotateY = ((x - centerX) / centerX) * 18;
    const rotateX = -((y - centerY) / centerY) * 18;

    // Posición del reflejo especular en porcentaje
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sfx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Relieve 3D con Parallax, Extrusión Física y Reflejo Especular */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
        }}
        className="relative cursor-pointer select-none py-1"
      >
        {/* Halo de resplandor volumétrico dorado */}
        <div
          className={`absolute -inset-4 rounded-full bg-[#C5A059]/15 blur-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-40'
          }`}
        />

        {/* Anillo Orbital de Energía Tridimensional */}
        <div
          className={`absolute inset-0 border border-[#C5A059]/30 rounded-full pointer-events-none transition-all duration-700 ${
            isHovered ? 'scale-125 opacity-70 border-[#FFE066]' : 'scale-95 opacity-20'
          }`}
          style={{
            transform: `rotateX(${65 + tilt.x * 0.5}deg) rotateZ(${tilt.y}deg)`,
            boxShadow: isHovered ? '0 0 25px rgba(197, 160, 89, 0.4)' : 'none',
          }}
        />

        {/* Tarjeta 3D Rotable con Extrusión Física */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
              isHovered ? 1.05 : 1
            }, ${isHovered ? 1.05 : 1}, 1)`,
            transition: isHovered
              ? 'transform 0.1s ease-out'
              : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-48 sm:w-56 md:w-64 flex items-center justify-center"
        >
          {/* Sombra profunda 3D proyectada detrás */}
          <div
            className="absolute inset-0 rounded-lg filter blur-md opacity-60 bg-black pointer-events-none"
            style={{
              transform: `translateZ(-25px) translate(${tilt.y * -0.6}px, ${
                tilt.x * 0.6 + 12
              }px)`,
            }}
          />

          {/* Capa Base de Extrusión Dorada */}
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter brightness-50 opacity-40 absolute pointer-events-none select-none"
            style={{
              transform: 'translateZ(-8px) scale(0.98)',
            }}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('googleusercontent.com/d/')) {
                const match = target.src.match(/googleusercontent\.com\/d\/([^=?&]+)/);
                if (match && match[1]) {
                  target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000&v=2`;
                }
              }
            }}
          />

          {/* Imagen Oficial de NOVUX con Resplandor Multicapa */}
          <img
            src={imageSrc}
            alt="NOVUX"
            className="w-full h-auto object-contain relative z-10 select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(197,160,89,0.38)]"
            style={{
              transform: 'translateZ(18px)',
            }}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('googleusercontent.com/d/')) {
                const match = target.src.match(/googleusercontent\.com\/d\/([^=?&]+)/);
                if (match && match[1]) {
                  target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000&v=2`;
                }
              }
            }}
          />

          {/* Reflejo Especular Dinámico (Efecto Cristal de Roca / Oro Pulido) */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none mix-blend-overlay transition-opacity duration-300 z-20"
            style={{
              opacity: isHovered ? 0.75 : 0,
              background: `radial-gradient(circle 120px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.85), transparent 75%)`,
              transform: 'translateZ(24px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
