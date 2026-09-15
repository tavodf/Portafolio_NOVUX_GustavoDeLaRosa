import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, Zap } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface AudioPlayerProps {
  videoId?: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayerInstance }) => void;
            onStateChange?: (e: { data: number }) => void;
            onError?: (e: unknown) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (vol: number) => void;
  getVolume?: () => number;
  getPlayerState?: () => number;
}

export function AudioPlayer({ videoId = 'Dy080SqIEMU' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(45);
  const [sfxActive, setSfxActive] = useState<boolean>(true);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Cargar estado inicial de SFX
  useEffect(() => {
    setSfxActive(sfx.isEnabled());
  }, []);

  // Inicializar YouTube Iframe Player API
  useEffect(() => {
    let isMounted = true;

    const initYT = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        new window.YT.Player('retro-bgm-container', {
          videoId,
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              ytPlayerRef.current = event.target;
              try {
                event.target.setVolume(volume);
              } catch {
                // ignore
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            }
          }
        });
      } catch {
        // Fallback
      }
    };

    if (!window.YT) {
      const existingScript = document.getElementById('yt-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevHandler = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevHandler) prevHandler();
        initYT();
      };
    } else {
      initYT();
    }

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  const sendIframeCommand = (func: string, args: (string | number | boolean)[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const handleTogglePlay = () => {
    sfx.playClick();
    if (isPlaying) {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          sendIframeCommand('pauseVideo');
        }
      } else {
        sendIframeCommand('pauseVideo');
      }
      setIsPlaying(false);
    } else {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume);
          ytPlayerRef.current.playVideo();
        } catch {
          sendIframeCommand('unMute');
          sendIframeCommand('setVolume', [volume]);
          sendIframeCommand('playVideo');
        }
      } else {
        sendIframeCommand('unMute');
        sendIframeCommand('setVolume', [volume]);
        sendIframeCommand('playVideo');
      }
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    sfx.playClick();
    if (isMuted) {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume);
        } catch {
          sendIframeCommand('unMute');
        }
      } else {
        sendIframeCommand('unMute');
      }
      setIsMuted(false);
    } else {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.mute();
        } catch {
          sendIframeCommand('mute');
        }
      } else {
        sendIframeCommand('mute');
      }
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(newVol);
      } catch {
        sendIframeCommand('setVolume', [newVol]);
      }
    } else {
      sendIframeCommand('setVolume', [newVol]);
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.unMute();
        } catch {
          sendIframeCommand('unMute');
        }
      }
    }
  };

  const handleToggleSfx = () => {
    const next = sfx.toggle();
    setSfxActive(next);
  };

  return (
    <>
      {/* Contenedor del reproductor de YouTube (renderizado offscreen) */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <div id="retro-bgm-container" />
        <iframe
          ref={iframeRef}
          id="retro-bgm-iframe-fallback"
          title="Background Ambient Music Fallback"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&loop=1&playlist=${videoId}&autoplay=0&controls=0&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Control Flotante Cyberpunk / Arcade HUD */}
      <div 
        className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none"
        onMouseEnter={() => sfx.playHover()}
      >
        <div className="bg-[#0e0e13]/90 backdrop-blur-md border border-[#C5A059]/40 hover:border-[#C5A059] rounded px-3 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-3 transition-all duration-300">
          
          {/* Indicador de Sintetizador / Equalizador Animado */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-[#C5A059]/20">
            <Radio 
              size={14} 
              className={isPlaying ? "text-[#C5A059] animate-pulse" : "text-zinc-600"} 
            />
            <div className="flex items-end gap-[2px] h-3.5 w-4">
              <span 
                className={`w-[2px] rounded-xs transition-all ${
                  isPlaying ? "bg-[#FFE066] animate-[bounce_0.6s_infinite_alternate] h-3.5" : "h-1 bg-zinc-600"
                }`} 
              />
              <span 
                className={`w-[2px] rounded-xs transition-all ${
                  isPlaying ? "bg-[#C5A059] animate-[bounce_0.4s_infinite_0.1s_alternate] h-2.5" : "h-1 bg-zinc-600"
                }`} 
              />
              <span 
                className={`w-[2px] rounded-xs transition-all ${
                  isPlaying ? "bg-[#FFE066] animate-[bounce_0.7s_infinite_0.2s_alternate] h-3" : "h-1 bg-zinc-600"
                }`} 
              />
            </div>
          </div>

          {/* Botón Play / Pausa MÚSICA */}
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              isPlaying 
                ? 'bg-[#C5A059]/25 text-[#FFE066] border border-[#C5A059]/60 shadow-[0_0_12px_rgba(197,160,89,0.35)]' 
                : 'bg-zinc-800/80 hover:bg-[#C5A059]/15 text-zinc-300 hover:text-[#C5A059] border border-zinc-700'
            }`}
            title={isPlaying ? "Pausar música de fondo" : "Reproducir música ambiental"}
          >
            {isPlaying ? (
              <>
                <Pause size={12} className="fill-current" />
                <span className="text-[11px]">BGM: ON</span>
              </>
            ) : (
              <>
                <Play size={12} className="fill-current" />
                <span className="text-[11px]">MÚSICA</span>
              </>
            )}
          </button>

          {/* Botón Silenciar / Desilenciar */}
          {isPlaying && (
            <button
              onClick={handleToggleMute}
              className="p-1 text-zinc-400 hover:text-[#C5A059] transition-colors cursor-pointer"
              title={isMuted ? "Activar sonido" : "Silenciar música"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          )}

          {/* Botón SFX (Efectos Arcade) */}
          <button
            onClick={handleToggleSfx}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
              sfxActive 
                ? 'border-[#C5A059]/40 bg-black/40 text-[#C5A059] hover:bg-[#C5A059]/20' 
                : 'border-zinc-800 bg-black/20 text-zinc-600 hover:text-zinc-400'
            }`}
            title="Efectos de sonido retro de videojuegos para clics y botones"
          >
            <Zap size={11} className={sfxActive ? "fill-[#C5A059]" : "opacity-40"} />
            <span className="font-bold">SFX</span>
            <span>{sfxActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Control deslizable de volumen en pantallas medianas */}
          {isPlaying && (
            <div className="hidden md:flex items-center gap-1.5 pl-1 border-l border-zinc-800">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-16 h-1 bg-zinc-700 accent-[#C5A059] rounded cursor-pointer"
                title={`Volumen: ${volume}%`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
