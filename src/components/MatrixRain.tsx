import { useEffect, useRef } from 'react';

const MATRIX_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ<>{}/*+=!#$'.split('');

interface DropColumn {
  y: number;
  speed: number;
  depth: number; // 0: background (dim, slow), 1: midground, 2: foreground (bright, fast)
  char: string;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const getFontSize = (w: number) => (w < 640 ? 14 : 16);
    let fontSize = getFontSize(width);
    let columns = Math.floor(width / fontSize);

    let drops: DropColumn[] = [];
    const initDrops = (cols: number) => {
      drops = [];
      for (let i = 0; i < cols; i++) {
        const depth = Math.random() > 0.8 ? 2 : Math.random() > 0.4 ? 1 : 0;
        drops[i] = {
          y: Math.floor(Math.random() * -80),
          speed: depth === 2 ? 1.4 : depth === 1 ? 1.0 : 0.7,
          depth,
          char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        };
      }
    };

    initDrops(columns);

    // Bucle draw() de la Cascada a 60 FPS
    const draw = () => {
      // Estela oscura suave para estelas limpias
      ctx.fillStyle = 'rgba(6, 6, 8, 0.16)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", Courier, monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize + fontSize / 2;
        const y = drop.y * fontSize;

        // Mutación aleatoria del carácter líder
        if (Math.random() > 0.6) {
          drop.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }

        // Estilizado según la profundidad (3D multi-plane depth)
        if (drop.depth === 2) {
          // Foreground: cabeza brillante marfil y estela dorada intensa
          ctx.fillStyle = '#FFF8DC';
          ctx.shadowColor = '#FFE066';
          ctx.shadowBlur = 8;
          ctx.fillText(drop.char, x, y);
        } else if (drop.depth === 1) {
          // Midground: dorado estándar
          const goldShades = ['#FFE066', '#F5C71A', '#E5B82A', '#C5A059'];
          ctx.fillStyle = goldShades[Math.floor(Math.random() * goldShades.length)];
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 4;
          ctx.fillText(drop.char, x, y);
        } else {
          // Background: dorado atenuado para dar profundidad tridimensional al espacio
          ctx.fillStyle = 'rgba(197, 160, 89, 0.45)';
          ctx.shadowBlur = 0;
          ctx.fillText(drop.char, x, y);
        }

        ctx.shadowBlur = 0;

        // Reinicio con dispersión estocástica
        if (y > height && Math.random() > 0.98) {
          drop.y = Math.floor(Math.random() * -20);
          drop.depth = Math.random() > 0.8 ? 2 : Math.random() > 0.4 ? 1 : 0;
          drop.speed = drop.depth === 2 ? 1.4 : drop.depth === 1 ? 1.0 : 0.7;
        }

        drop.y += drop.speed;
      }
    };

    let animationFrameId: number;
    let lastTime = 0;
    const targetFps = 60;
    const fpsInterval = 1000 / targetFps;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = time - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);
        draw();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Manejo de resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      fontSize = getFontSize(width);
      columns = Math.floor(width / fontSize);
      initDrops(columns);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-70 pointer-events-none"
    />
  );
}
