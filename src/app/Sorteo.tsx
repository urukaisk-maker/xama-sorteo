"use client";
import InstallButton from "./InstallButton";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { playTick, playFanfare } from "@/lib/audio";
import ShareButtons from "./ShareButtons";

export default function Sorteo({ numeros }: { numeros: number[] }) {
  const [ganador, setGanador] = useState<number | null>(null);
  const [displayNumber, setDisplayNumber] = useState<number>(numeros[0] ?? 1);
  const [cantidad, setCantidad] = useState(numeros.length);
  const [pending, setPending] = useState(false);
  const [finished, setFinished] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const soundRef = useRef(true);

  const maximo = numeros.length;
  const numerosActivos = numeros.slice(0, cantidad);

  function dispararConfeti() {
    const colors = ["#22d3ee", "#06b6d4", "#0ea5e9", "#ffffff", "#a855f7"];

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
      });
    }, 400);
  }

  function sortear() {
    if (pending || numerosActivos.length === 0) return;

    setPending(true);
    setGanador(null);
    setFinished(false);

    const ganadorFinal =
      numerosActivos[Math.floor(Math.random() * numerosActivos.length)];
    const totalTicks = 30;
    let tick = 0;

    function nextTick() {
      if (tick >= totalTicks) {
        setDisplayNumber(ganadorFinal);
        setGanador(ganadorFinal);
        setPending(false);
        setFinished(true);
        if (soundRef.current) {
          try {
            playFanfare();
          } catch {
            /* autoplay bloqueado */
          }
        }
        dispararConfeti();
        return;
      }

      if (tick < totalTicks - 1) {
        setDisplayNumber(
          numerosActivos[Math.floor(Math.random() * numerosActivos.length)]
        );
      }

      if (soundRef.current) {
        try {
          playTick();
        } catch {
          /* autoplay bloqueado */
        }
      }

      tick++;

      // Desaceleración progresiva (60ms → 360ms)
      const progress = tick / totalTicks;
      const delay = 60 + Math.pow(progress, 3) * 300;
      setTimeout(nextTick, delay);
    }

    nextTick();
  }

  function toggleSound() {
    setSoundOn((prev) => {
      soundRef.current = !prev;
      return !prev;
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-cyan-50">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12">
        {/* Cabecera */}
        <div className="mb-10 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400/70">
            XAMA-ONG
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-cyan-100">
            Sorteo de Cesta Solidaria
          </h1>
        </div>

        {/* Controles */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <label className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">
            Números participantes
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              disabled={pending || cantidad <= 1}
              className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 text-xl font-bold hover:bg-cyan-500/20 disabled:opacity-30 transition"
              aria-label="Quitar un número"
            >
              −
            </button>
            <span className="w-16 text-center text-2xl font-black text-cyan-100">
              {cantidad}
            </span>
            <button
              type="button"
              onClick={() => setCantidad((c) => Math.min(maximo, c + 1))}
              disabled={pending || cantidad >= maximo}
              className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 text-xl font-bold hover:bg-cyan-500/20 disabled:opacity-30 transition"
              aria-label="Añadir un número"
            >
              +
            </button>
          </div>
          <span className="text-xs text-cyan-400/50">
            del 1 al {cantidad} · máx {maximo}
          </span>
        </div>

        {/* Ruleta / Slot machine */}
        <div className="w-full rounded-3xl border border-cyan-400/30 bg-cyan-500/5 backdrop-blur-sm p-6 md:p-8 text-center shadow-[0_0_60px_-15px_rgba(34,211,238,0.6)]">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-400/70 mb-4">
            {finished ? "Ganador" : pending ? "Sorteando…" : "Resultado"}
          </div>

          <div className="relative h-40 overflow-hidden">
            <div
              key={displayNumber}
              className={`absolute inset-0 flex items-center justify-center text-7xl md:text-9xl font-black ${
                finished && ganador !== null
                  ? "text-cyan-100 winner-number"
                  : "text-cyan-200 slot-number"
              }`}
            >
              {pending ? displayNumber : ganador ?? "—"}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={sortear}
            disabled={pending}
            className="px-14 py-6 rounded-2xl text-xl font-black tracking-widest text-cyan-100 bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-500/20 hover:border-cyan-300 transition-all disabled:opacity-50 shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)] hover:shadow-[0_0_60px_-5px_rgba(34,211,238,0.9)]"
          >
            {pending ? "SORTEANDO…" : "SORTEAR"}
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className="text-xs text-cyan-400/60 hover:text-cyan-200 transition"
            aria-label={soundOn ? "Silenciar sonidos" : "Activar sonidos"}
          >
            {soundOn ? "🔊 Sonido activo" : "🔇 Sonido silenciado"}
          </button>
                    <button
            type="button"
            onClick={toggleSound}
            className="text-xs text-cyan-400/60 hover:text-cyan-200 transition"
            aria-label={soundOn ? "Silenciar sonidos" : "Activar sonidos"}
          >
            {soundOn ? "🔊 Sonido activo" : "🔇 Sonido silenciado"}
          </button>

          <InstallButton />

          {finished && ganador !== null && (
            <ShareButtons ganador={ganador} />
          )}
        </div>

          {finished && ganador !== null && (
            <ShareButtons ganador={ganador} />
          )}
        </div>
      </div>
    </main>
  );
}
