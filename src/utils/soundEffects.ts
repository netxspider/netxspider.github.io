// High-Performance Zero-Dependency Web Audio API Sound Synthesizer
// Provides instantaneous, tactile, clearly audible futuristic sound effects across all UI components.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// User interaction listener to resume AudioContext
if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('click', unlock);
  };
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });
  window.addEventListener('click', unlock, { passive: true });
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('sound_fx') === 'true';
}

/**
 * Tactile mechanical high-tech click for buttons and links
 * Increased volume (gain 0.38) and crisp cybernetic punch
 */
export function playClickSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(920, now);
  osc.frequency.exponentialRampToValueAtTime(160, now + 0.055);

  gain.gain.setValueAtTime(0.38, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.065);
}

let lastHoverSoundTime = 0;

/**
 * Soft, elegant high-tech harmonic hover blip for buttons, cards, and interactive links
 * Increased volume (gain 0.25) and resonant frequency
 */
export function playHoverSound() {
  if (!isSoundEnabled()) return;
  const nowMs = Date.now();
  if (nowMs - lastHoverSoundTime < 40) return;
  lastHoverSoundTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(680, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.045);

  gain.gain.setValueAtTime(0.24, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.055);
}

/**
 * Cybernetic harmonic blip for tech stack icons
 * Increased volume (gain 0.28)
 */
export function playTechHoverSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1180, now);
  osc.frequency.exponentialRampToValueAtTime(1750, now + 0.05);

  gain.gain.setValueAtTime(0.28, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Tactile friction swoosh when lanyard card is grabbed / dragged
 * Increased volume (gain 0.35)
 */
export function playCardDragSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.09);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.11);
}

/**
 * Spring snap sound when lanyard card is released
 * Increased volume (gain 0.32)
 */
export function playCardReleaseSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

  gain.gain.setValueAtTime(0.32, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Futuristic electronic slide sweep when project index changes
 * Increased volume (gain 0.3)
 */
export function playSlideSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.075);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Ambient sci-fi shimmer when hovering on Connect form card
 * Increased volume (gain 0.25)
 */
export function playFormHoverSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(580, now);
  osc.frequency.exponentialRampToValueAtTime(1020, now + 0.11);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
}

/**
 * Attaches a capture-phase click listener to play tactile clicks for all buttons and interactive links
 */
export function initGlobalClickSound() {
  if (typeof window === 'undefined') return () => {};

  let lastClickTime = 0;
  const handleClick = (e: MouseEvent) => {
    if (!isSoundEnabled()) return;
    const now = Date.now();
    if (now - lastClickTime < 60) return; // Prevent double-triggering

    const target = e.target as HTMLElement | null;
    if (!target) return;

    const isInteractive = target.closest(
      'button, a, [role="button"], .cursor-target, input[type="submit"], input[type="checkbox"], input[type="radio"]'
    );

    if (isInteractive) {
      lastClickTime = now;
      playClickSound();
    }
  };

  window.addEventListener('click', handleClick, { capture: true, passive: true });
  return () => {
    window.removeEventListener('click', handleClick, { capture: true });
  };
}

/**
 * Synthesizes tactile clicks, toggles, or switch sounds using Web Audio API
 */
export function playTactileAudio(type: 'tick' | 'toggle' | 'switch' = 'tick') {
  if (!isSoundEnabled() && type !== 'toggle') return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'tick') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    osc.start(now);
    osc.stop(now + 0.06);
  } else if (type === 'toggle') {
    const isSoundOn = isSoundEnabled();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isSoundOn ? 420 : 640, now);
    osc.frequency.exponentialRampToValueAtTime(isSoundOn ? 280 : 960, now + 0.07);
    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
    osc.start(now);
    osc.stop(now + 0.08);
  } else {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    osc.start(now);
    osc.stop(now + 0.09);
  }
}
