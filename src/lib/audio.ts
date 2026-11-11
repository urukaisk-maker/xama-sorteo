// Sonidos sintéticos con Web Audio API (0 archivos extra)

let audioContext: AudioContext | null = null;

function getContext(): AudioContext {
  if (typeof window === "undefined") {
    throw new Error("Audio solo disponible en el navegador");
  }
  if (!audioContext) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audioContext = new Ctor();
  }
  return audioContext;
}

/** Tick corto de ruleta (click seco) */
export function playTick(): void {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 900;

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/** Fanfarria ascendente al ganar */
export function playFanfare(): void {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Do5, Mi5, Sol5, Do6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  const gaps = [0, 0.12, 0.24, 0.36];
  const durations = [0.1, 0.1, 0.1, 0.5];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    const start = now + gaps[i];
    const end = start + durations[i];

    gain.gain.setValueAtTime(0.12, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(end);
  });
}
