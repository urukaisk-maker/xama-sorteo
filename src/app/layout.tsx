import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sorteo de Cesta Solidaria · XAMA-ONG",
  description:
    "Sorteo solidario de una cesta de comida. Participación gratuita. Sin compra de boletos.",
  metadataBase: new URL("https://xama-sorteo.vercel.app"),
  openGraph: {
    title: "Sorteo de Cesta Solidaria · XAMA-ONG",
    description:
      "Sorteo solidario de una cesta de comida. Participación gratuita.",
    type: "website",
    locale: "es_ES",
    siteName: "XAMA-ONG",
    url: "https://xama-sorteo.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorteo de Cesta Solidaria · XAMA-ONG",
    description:
      "Sorteo solidario de una cesta de comida. Participación gratuita.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
