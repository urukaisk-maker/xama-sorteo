"use client";
import { useState } from "react";

export default function ShareButtons({ ganador }: { ganador: number | null }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = "https://xama-sorteo.vercel.app";
  const shareText = ganador
    ? `El número ganador del Sorteo Solidario de XAMA-ONG es el ${ganador}. ¡Enhorabuena! 🎉`
    : "Sorteo Solidario de Cesta de Comida de XAMA-ONG. Participación gratuita.";

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function nativeShare() {
    try {
      await navigator.share({
        title: "Sorteo XAMA-ONG",
        text: shareText,
        url: shareUrl,
      });
    } catch {
      /* usuario canceló */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    shareText + " " + shareUrl
  )}`;

  const btnCls =
    "px-4 py-2 rounded-xl text-sm font-medium border border-cyan-400/40 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 transition";

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={btnCls}>
          📤 Compartir
        </button>
      )}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnCls}
      >
        𝕏 Compartir en X
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnCls}
      >
        💬 WhatsApp
      </a>
      <button type="button" onClick={copyLink} className={btnCls}>
        {copied ? "✅ Copiado" : "🔗 Copiar enlace"}
      </button>
    </div>
  );
}
