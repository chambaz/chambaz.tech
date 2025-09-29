import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { Background } from "./components/background";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    url: baseUrl,
    siteName: "Adam Chambers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og`,
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

const cx = (...classes) => classes.filter(Boolean).join(" ");

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable,
        instrumentSerif.variable
      )}
    >
      <body className="antialiased">
        <Background />
        <main className="relative max-w-2xl mx-4 mt-8 lg:mx-auto flex-auto min-w-0 flex flex-col px-2 md:px-0 z-10">
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
