import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const accent = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adrianocaldas.com"),
  title: "Adriano César Moreno Caldas · Technology, product and operations",
  description:
    "Personal website of Adriano César Moreno Caldas: technology leadership, software, artificial intelligence, cloud, telecommunications, automation and digital products.",
  alternates: {
    canonical: "https://adrianocaldas.com",
    languages: {
      en: "https://adrianocaldas.com/?lang=en",
      pt: "https://adrianocaldas.com/?lang=pt",
      es: "https://adrianocaldas.com/?lang=es",
      nb: "https://adrianocaldas.com/?lang=nb",
      "x-default": "https://adrianocaldas.com",
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES", "nb_NO"],
    url: "https://adrianocaldas.com",
    siteName: "Adriano César Moreno Caldas",
    title: "Adriano César Moreno Caldas · Technology, product and operations",
    description:
      "Strategy, digital products, artificial intelligence and systems in global operation.",
    images: [
      {
        url: "/adriano-caldas-social.png",
        width: 1731,
        height: 909,
        alt: "Adriano César Moreno Caldas — Technology, product and operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adriano César Moreno Caldas · Technology, product and operations",
    description:
      "Strategy, digital products, artificial intelligence and systems in global operation.",
    images: ["/adriano-caldas-social.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#e6edf2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${accent.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
