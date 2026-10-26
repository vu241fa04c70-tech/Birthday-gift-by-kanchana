/**
 * Audio Engine using Web Audio API and HTML5 Audio
 * Features:
 * - Built-in ethereal music box / ambient synthesizer chords (zero external file required)
 * - Safe fallback if custom MP3 file is used but missing
 * - Sound effects for interactions (candle blow, gift unwrap, card flip, chimes)
 * - Autoplay safety: only starts upon user gesture
 */

import { birthdayConfig } from "../data/birthdayConfig";

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.customAudio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = birthdayConfig?.audio?.defaultVolume ?? 0.5;
    this.synthInterval = null;
    this.listeners = new Set();
  }

  // Initialize Audio Context on user gesture
  initAudio() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) =>
      cb({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        volume: this.volume,
      })
    );
  }

  // Toggle Play / Pause
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Toggle Mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    this.notify();
  }

  // Set Volume (0.0 to 1.0)
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
    this.notify();
  }

  // Start background ambient music
  play() {
    this.initAudio();

    if (birthdayConfig?.audio?.customAudioUrl) {
      this.playCustomAudio();
    } else if (birthdayConfig?.audio?.useSynthesizer ?? true) {
      this.startSynthesizer();
    }

    this.isPlaying = true;
    this.notify();
  }

  // Pause music
  pause() {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isPlaying = false;
    this.notify();
  }

  // Custom audio element playback with fallback to synthesizer
  playCustomAudio() {
    if (!this.customAudio) {
      this.customAudio = new Audio(birthdayConfig?.audio?.customAudioUrl);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      this.customAudio.muted = this.isMuted;

      // Fallback if file fails to load
      this.customAudio.onerror = () => {
        console.warn("Custom audio failed to load. Falling back to built-in ambient music synthesizer.");
        this.customAudio = null;
        this.startSynthesizer();
      };
    }
    this.customAudio.play().catch(() => {
      // If browser prevented autoplay, synthesizer is ready on next click
    });
  }

  // Gentle, ethereal ambient music box chords synthesizer
  startSynthesizer() {
    if (this.synthInterval) return;

    // Heavenly ambient progression (frequencies in Hz):
    // Cmaj7 -> Gmaj7 -> Am7 -> Fmaj7
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // C E G B
      [196.0, 246.94, 293.66, 392.0],  // G B D G
      [220.0, 261.63, 329.63, 392.0],  // A C E G
      [174.61, 220.0, 261.63, 329.63], // F A C E
    ];

    let chordIndex = 0;
    let step = 0;

    const playNextNote = () => {
      if (!this.isPlaying || this.isMuted || !this.audioCtx) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[step % currentChord.length];

      this.playTone(freq, 1.8, "sine", 0.08 * this.volume);

      step++;
      if (step % currentChord.length === 0) {
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    // Play initial note immediately
    playNextNote();
    // Play every 750ms for a dreamy music-box lullaby
    this.synthInterval = setInterval(playNextNote, 750);
  }

  // Core tone generator for notes and SFX
  playTone(freq, duration = 1.0, type = "sine", gainAmount = 0.1) {
    if (!this.audioCtx || this.isMuted) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Low pass filter for soft music-box feel
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainAmount, this.audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // AudioCtx might be unavailable
    }
  }

  // Sound Effects
  playSfx(type) {
    if (!birthdayConfig?.audio?.enableSoundEffects && birthdayConfig?.audio?.enableSoundEffects !== undefined) return;
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    try {
      switch (type) {
        case "click":
        case "chime": {
          this.playTone(659.25, 0.4, "sine", 0.1 * this.volume); // E5
          setTimeout(() => {
            this.playTone(987.77, 0.6, "sine", 0.08 * this.volume); // B5
          }, 80);
          break;
        }

        case "blow": {
          const bufferSize = this.audioCtx.sampleRate * 0.4;
          const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
          }
          const noise = this.audioCtx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.audioCtx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(400, now);
          const gain = this.audioCtx.createGain();
          gain.gain.setValueAtTime(0.15 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx.destination);

          noise.start();
          break;
        }

        case "celebrate":
        case "confetti": {
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((n, idx) => {
            setTimeout(() => {
              this.playTone(n, 0.7, "triangle", 0.12 * this.volume);
            }, idx * 100);
          });
          break;
        }

        case "unwrap": {
          const notes = [440, 554.37, 659.25, 880];
          notes.forEach((n, idx) => {
            setTimeout(() => {
              this.playTone(n, 0.5, "sine", 0.09 * this.volume);
            }, idx * 70);
          });
          break;
        }

        case "flip": {
          this.playTone(320, 0.1, "triangle", 0.15 * this.volume);
          break;
        }

        case "paper": {
          this.playTone(587.33, 0.3, "sine", 0.05 * this.volume);
          setTimeout(() => {
            this.playTone(783.99, 0.4, "sine", 0.05 * this.volume);
          }, 120);
          break;
        }

        default:
          this.playTone(440, 0.2, "sine", 0.05 * this.volume);
      }
    } catch {
      // Audio fallback safe
    }
  }
}

export const soundManager = new SoundManager();
