import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATHLON AI – Athlete Mental Fitness & Performance Intelligence",
  description:
    "AI-powered mental fitness platform for sports teams: psychometric assessments, burnout detection, match readiness prediction, and performance analytics.",
  keywords: "athlete mental fitness, sports psychology, AI performance, burnout detection, match readiness",
  openGraph: {
    title: "ATHLON AI",
    description: "Elite Athlete Mental Fitness & Performance Intelligence Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}

