/**
 * Motor de Efectos de Sonido Retro Arcade / Cyberpunk usando Web Audio API
 * No requiere descargas externas, latencia cero y compatible con todos los navegadores modernos.
 */

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled: boolean = true;

  constructor() {
    // Lazy initialize on first user gesture
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arcade_sfx_enabled');
      if (saved !== null) {
        this.sfxEnabled = saved === 'true';
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.sfxEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('arcade_sfx_enabled', String(enabled));
    }
  }

  public toggle(): boolean {
    const next = !this.sfxEnabled;
    this.setEnabled(next);
    if (next) {
      this.playSelect();
    }
    return next;
  }

  /**
   * Sonido de Seleccionar / Coin / Botón de Acción Principal (Estilo Arcade Neo-Geo / Capcom)
   * Tono doble ascendente con onda cuadrada brillante.
   */
  public playSelect() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.setValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      // Filtro para suavizar un poco el sonido arcade
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(4500, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignorar restricciones de audio del navegador
    }
  }

  /**
   * Sonido sutil al pasar el mouse por botones o tarjetas (Arcade hover cursor)
   */
  public playHover() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.04);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Audio context guard
    }
  }

  /**
   * Clic clásico de botón de arcade (punchy & crisp)
   */
  public playClick() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.07);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio context guard
    }
  }

  /**
   * Sonido de Retroceso / Volver al Menú (Tono descendente)
   */
  public playBack() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(440, now + 0.07); // A4
      osc.frequency.setValueAtTime(329.63, now + 0.14); // E4

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio context guard
    }
  }

  /**
   * Sonido de Power-Up / Fanfarria 8-Bit (Para el botón "INICIAR PROYECTO")
   * Clásico acorde rápido de triunfo arcade
   */
  public playPowerUp() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const noteDuration = 0.06;
      const now = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * noteDuration);

        gain.gain.setValueAtTime(0.08, now + i * noteDuration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * noteDuration + 0.08);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(4000, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * noteDuration);
        osc.stop(now + (i + 1) * noteDuration + 0.1);
      });
    } catch {
      // Audio context guard
    }
  }

  /**
   * Sonido de Warp / Transición de Página Cyberpunk
   */
  public playWarp() {
    if (!this.sfxEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.28);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.Q.setValueAtTime(3, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Audio context guard
    }
  }
}

export const sfx = new SoundEffectsEngine();
