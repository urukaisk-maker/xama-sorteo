"use client";
import { useState } from "react";

export default function Sorteo({ numeros }: { numeros: number[] }) {
  const [ganador, setGanador] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(numeros.length);
  const [pending, setPending] = useState(false);

  const maximo = numeros.length;
  const numerosActivos = numeros.slice(0, cantidad);

  function sortear() {
    setPending(true);
    setGanador(null);
    let ticks = 0;
    const intervalo = setInterval(() => {
      setGanador(numerosActivos[Math.floor(Math.random() * numerosActivos.length)]);
      ticks++;
      if (ticks > 12) {
        clearInterval(intervalo);
        setGanador(numerosActivos[Math.floor(Math.random() * numerosActivos.length)]);
        setPending(false);
      }
    }, 80);
  }

  return (
    <main className="min-h-screen bg-black text-cyan-100 relative overflow-hidden flex flex-col items-center px-6 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-3xl" />

      <header className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 mb-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.2em] text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]">
            XAMA ONG
          </h1>
          <p className="mt-3 text-sm md:text-base uppercase tracking-[0.3em] text-cyan-400/70">
            Sorteo de Cesta Solidaria
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">
            Números participantes
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              disabled={pending || cantidad <= 1}
              className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 text-xl font-bold hover:bg-cyan-500/20 disabled:opacity-30 transition"
            >
              −
            </button>
            <span className="text-3xl font-black text-cyan-200 tabular-nums w-16 text-center">
              {cantidad}
            </span>
            <button
              onClick={() => setCantidad(Math.min(maximo, cantidad + 1))}
              disabled={pending || cantidad >= maximo}
              className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 text-xl font-bold hover:bg-cyan-500/20 disabled:opacity-30 transition"
            >
              +
            </button>
          </div>
          <span className="text-xs text-cyan-400/50">
            del 1 al {cantidad} · máx {maximo}
          </span>
        </div>

        <div className="w-full rounded-3xl border border-cyan-400/30 bg-cyan-500/5 backdrop-blur-sm p-6 md:p-8 text-center shadow-[0_0_60px_-15px_rgba(34,211,238,0.6)]">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-400/70 mb-4">
            Resultado
          </div>
          <div className="text-6xl md:text-8xl font-black text-cyan-200 tabular-nums drop-shadow-[0_0_35px_rgba(34,211,238,0.9)] min-h-[1em]">
            {ganador ?? "—"}
          </div>
        </div>

        <button
          onClick={sortear}
          disabled={pending}
          className="px-14 py-6 rounded-2xl text-xl font-black tracking-widest text-cyan-100 bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-500/20 hover:border-cyan-300 transition-all disabled:opacity-50 shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)] hover:shadow-[0_0_60px_-5px_rgba(34,211,238,0.9)]"
        >
          {pending ? "SORTEANDO..." : "SORTEAR"}
        </button>
      </header>

      <section className="relative z-10 w-full max-w-4xl">
        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 md:gap-3">
          {numerosActivos.map((n) => {
            const esGanador = ganador === n;
            return (
              <div
                key={n}
                className={
                  "aspect-square flex items-center justify-center rounded-xl text-xl md:text-2xl font-bold tabular-nums border transition-all duration-300 " +
                  (esGanador
                    ? "bg-cyan-400 text-black border-cyan-200 scale-110 shadow-[0_0_40px_0_rgba(34,211,238,1)] z-10"
                    : "bg-cyan-500/5 border-cyan-400/20 text-cyan-300/60")
                }
              >
                {n}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
