import "./global.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "./components/footer";
import { Mesh, Grid } from "./components/background/";
import { cn } from "../lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
  title: {
    default:
      "Adam Chambers - Product engineer, ux designer, and creative technologist",
    template: "%s",
  },
  openGraph: {
    title:
      "Adam Chambers - Product engineer, ux designer, and creative technologist",
    description:
      "Exploring the intersection of blockchain, decentralized finance, and ai.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Adam Chambers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("dark", GeistMono.variable, instrumentSerif.variable)}
    >
      <body className="antialiased">
        <Mesh />
        <Grid />

        <main className="relative max-w-4xl mx-auto flex flex-col px-4 z-10 min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
