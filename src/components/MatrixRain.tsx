import { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters: katakana, latin, numbers and symbols
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ<>{}/*+=!#$'.split('');
    const fontSize = 18;
    let columns = Math.floor(width / fontSize);

    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const draw = () => {
      // Trail effect with deep dark background
      ctx.fillStyle = 'rgba(6, 6, 8, 0.14)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", Courier, monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        const isLead = Math.random() > 0.88;
        if (isLead) {
          // Bright white-gold glowing head of the stream
          ctx.fillStyle = '#FFF8DC';
          ctx.shadowColor = '#FFE066';
          ctx.shadowBlur = 10;
        } else {
          // Rich vibrant gold trail
          const goldShades = ['#FFDF00', '#F5C71A', '#E5B82A', '#D4AF37', '#C5A059'];
          ctx.fillStyle = goldShades[Math.floor(Math.random() * goldShades.length)];
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 4;
        }

        ctx.fillText(char, x, y);

        // Reset shadow for next draw
        ctx.shadowBlur = 0;

        // Reset drop to top with randomized timing
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 32;

    const render = (time: number) => {
      if (time - lastTime > fpsInterval) {
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);

      const newDrops: number[] = [];
      for (let i = 0; i < columns; i++) {
        newDrops[i] = drops[i] !== undefined ? drops[i] : Math.floor(Math.random() * -100);
      }
      drops = newDrops;
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
      className="fixed inset-0 z-0 opacity-85 pointer-events-none"
    />
  );
}
