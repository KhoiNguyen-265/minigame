// Web Audio API zero-dependency sound generator for offline reliability
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentSnippetAudio: HTMLAudioElement | null = null;
  private snippetTimeout: number | null = null;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.currentSnippetAudio) {
      this.currentSnippetAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play crisp tick sound
  public playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context error ignore
    }
  }

  // Play urgent warning tick-tock (last 3 seconds)
  public playWarning() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio context error ignore
    }
  }

  // Play correct chime (+ major triad chord)
  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.07);
        gain.gain.setValueAtTime(0.22, ctx.currentTime + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.07 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.07);
        osc.stop(ctx.currentTime + index * 0.07 + 0.4);
      });
    } catch {
      // Audio context error ignore
    }
  }

  // Play wrong / buzzer error
  public playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio context error ignore
    }
  }

  // Play contest buzzer (team buzz in / giành quyền trả lời)
  public playBuzzer() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // Audio context error ignore
    }
  }

  // Play fanfare / celebratory sequence for winner
  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 }, // C5
        { f: 523.25, t: 0.15, d: 0.15 }, // C5
        { f: 523.25, t: 0.3, d: 0.15 }, // C5
        { f: 659.25, t: 0.45, d: 0.35 }, // E5
        { f: 587.33, t: 0.85, d: 0.15 }, // D5
        { f: 659.25, t: 1.05, d: 0.15 }, // E5
        { f: 783.99, t: 1.25, d: 0.6 },  // G5
        { f: 1046.50, t: 1.9, d: 0.9 }, // C6 High
      ];

      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {
      // Audio context error ignore
    }
  }

  // Play audio snippet (for "Đoán bài hát" game)
  public playMusicSnippet(audioUrl?: string, durationSeconds: number = 4, onEnd?: () => void) {
    if (this.isMuted) return;

    // Clear existing snippet if any
    if (this.currentSnippetAudio) {
      this.currentSnippetAudio.pause();
      this.currentSnippetAudio = null;
    }
    if (this.snippetTimeout) {
      window.clearTimeout(this.snippetTimeout);
      this.snippetTimeout = null;
    }

    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        this.currentSnippetAudio = audio;
        audio.currentTime = 0;
        audio.play().catch(() => {
          // If browser blocked autoplay or url not found, fallback to synth melody
          this.playSynthesizedMelody(durationSeconds, onEnd);
        });

        this.snippetTimeout = window.setTimeout(() => {
          audio.pause();
          this.currentSnippetAudio = null;
          if (onEnd) onEnd();
        }, durationSeconds * 1000);
        return;
      } catch {
        // fallback
      }
    }

    // Synthesized catch melody fallback if no external file
    this.playSynthesizedMelody(durationSeconds, onEnd);
  }

  // Synthesized catchy melody for music quiz demo
  public playSynthesizedMelody(durationSeconds: number, onEnd?: () => void) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const melody = [
        392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 783.99, 880.00
      ];
      const step = (durationSeconds) / 8;
      melody.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        const startTime = ctx.currentTime + idx * step;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + step * 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + step * 0.9);
      });

      if (onEnd) {
        window.setTimeout(onEnd, durationSeconds * 1000);
      }
    } catch {
      // audio error ignore
    }
  }

  public stopSnippet() {
    if (this.currentSnippetAudio) {
      this.currentSnippetAudio.pause();
      this.currentSnippetAudio = null;
    }
    if (this.snippetTimeout) {
      window.clearTimeout(this.snippetTimeout);
      this.snippetTimeout = null;
    }
  }
}

export const sound = new SoundEngine();
