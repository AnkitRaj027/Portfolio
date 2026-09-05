import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const SoundContext = createContext(null);

/**
 * Web Audio API – synthesize sounds with zero external files.
 * All sounds are generated on-the-fly using oscillators.
 */
function createSoundEngine(ctx) {
  return {
    /**
     * Soft tick – short sine blip at high frequency.
     * Used on nav link hover.
     */
    tick() {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    },

    /**
     * Warm pop – short sine at medium frequency with quick decay.
     * Used on button clicks.
     */
    pop() {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.18);
    },

    /**
     * Whoosh – filtered noise sweep for a futuristic feel.
     * Used for section transitions / scroll snap.
     */
    whoosh() {
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.18);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
      source.stop(ctx.currentTime + 0.2);
    },
  };
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem('portfolio-sound') === 'true';
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef(null);
  const engineRef = useRef(null);
  const isMobile = useRef(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  // Lazy-init AudioContext on first user interaction
  const ensureCtx = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      engineRef.current = createSoundEngine(ctx);
      return ctx;
    } catch {
      return null;
    }
  }, []);

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem('portfolio-sound', String(next)); } catch {}
      // Ensure context exists so the first sound can play right away
      if (next) ensureCtx();
      return next;
    });
  }, [ensureCtx]);

  const playSound = useCallback(
    (type) => {
      if (!enabled || isMobile.current) return;
      const ctx = ensureCtx();
      if (!ctx || !engineRef.current) return;
      // Resume if suspended (browser policy)
      if (ctx.state === 'suspended') ctx.resume();
      try {
        engineRef.current[type]?.();
      } catch {}
    },
    [enabled, ensureCtx]
  );

  return (
    <SoundContext.Provider value={{ enabled, toggleEnabled, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
