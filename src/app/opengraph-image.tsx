import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sorteo Solidario XAMA-ONG";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 0%, #0a2a33 0%, #000 70%)",
          fontFamily: "system-ui, sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 12,
            color: "#22d3ee",
            opacity: 0.7,
          }}
        >
          XAMA-ONG
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            marginTop: 30,
            color: "#e0feff",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Sorteo de Cesta Solidaria
        </div>
        <div
          style={{
            fontSize: 36,
            marginTop: 40,
            color: "#22d3ee",
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          Participación gratuita · 60 números
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 80,
            color: "#22d3ee",
            opacity: 0.5,
          }}
        >
          xama-sorteo.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
