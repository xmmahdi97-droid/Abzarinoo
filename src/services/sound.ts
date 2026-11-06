class SoundService {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicOscillators: OscillatorNode[] = [];
  private musicInterval: number | null = null;

  private soundVolume: number = 0.8;
  private musicVolume: number = 0.4;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.soundEnabled ? this.soundVolume : 0;
        this.sfxGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicEnabled ? this.musicVolume : 0;
        this.musicGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public updateSettings(soundEnabled: boolean, musicEnabled: boolean, soundVolume: number, musicVolume: number) {
    this.soundEnabled = soundEnabled;
    this.musicEnabled = musicEnabled;
    this.soundVolume = soundVolume;
    this.musicVolume = musicVolume;

    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(soundEnabled ? soundVolume : 0, this.ctx.currentTime);
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(musicEnabled ? musicVolume : 0, this.ctx.currentTime);
    }

    if (musicEnabled && !this.isMusicPlaying) {
      this.startAmbientMusic();
    } else if (!musicEnabled && this.isMusicPlaying) {
      this.stopAmbientMusic();
    }
  }

  // Pentatonic notes for letter connection drag
  private pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  public playLetterSelect(index: number) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const noteFreq = this.pentatonicNotes[index % this.pentatonicNotes.length] * (1 + Math.floor(index / this.pentatonicNotes.length) * 0.5);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    // Filter for warm soft chime
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  public playWordSuccess() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    // Major 7th arpeggio chord sweep: C5, E5, G5, B5, C6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, now + idx * 0.06);
      filter.Q.value = 3;

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.65);
    });
  }

  public playWordError() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.22);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  public playCoin() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc1.stop(now + 0.4);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.45);
  }

  public playHint() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.46);
  }

  public playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const chords = [
      [523.25, 659.25, 783.99], // C major
      [587.33, 739.99, 880.00], // D major
      [659.25, 830.61, 987.77], // E major
      [783.99, 987.77, 1174.66, 1567.98] // G major triumphant
    ];

    chords.forEach((chord, step) => {
      const stepTime = now + step * 0.22;
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, stepTime);

        gain.gain.setValueAtTime(0.001, stepTime);
        gain.gain.linearRampToValueAtTime(0.25, stepTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.55);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(stepTime);
        osc.stop(stepTime + 0.6);
      });
    });
  }

  public playTap() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Mysterious, dark ambient background drone synthesizer
  public startAmbientMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    this.isMusicPlaying = true;
    this.stopAmbientMusic(); // Clean any previous

    // Base dark drone chords (D minor / Atmospheric pads)
    const baseFreqs = [73.42, 110.00, 146.83, 220.00]; // D2, A2, D3, A3
    this.musicOscillators = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Lowpass filter for smooth ambient warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280 + idx * 60, this.ctx!.currentTime);

      // Slow breathing LFO effect
      oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.musicGain!);

      osc.start();
      this.musicOscillators.push(osc);
    });

    // Gentle periodic subtle harmonic chime (every 8 seconds)
    this.musicInterval = window.setInterval(() => {
      if (!this.ctx || !this.musicEnabled || !this.musicGain) return;
      const notes = [440, 523.25, 587.33, 659.25];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 4.6);
    }, 7000);
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.musicOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore already stopped
      }
    });
    this.musicOscillators = [];
  }
}

export const soundManager = new SoundService();
