import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/chart.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Western Astrology Chart Analyzer",
  description: "Comprehensive natal chart analysis, interpretations, and forecasts with rectification, astrocartography, mundane analysis, and relationship compatibility",
  keywords: [
    "astrology",
    "natal chart",
    "horoscope",
    "western astrology",
    "birth chart",
    "astrocartography",
    "synastry",
    "rectification",
    "personal growth",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
