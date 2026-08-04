import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adrianocaldas.com"),
  title: "Adriano César Moreno Caldas · Technology, product and operations",
  description:
    "Personal website of Adriano César Moreno Caldas: technology leadership, software, artificial intelligence, cloud, telecommunications, automation and digital products — including NordixBIOS, the Agentic AI Factory.",
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
      "Strategy, digital products, artificial intelligence and systems in global operation — including NordixBIOS, the Agentic AI Factory.",
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
      "Strategy, digital products, artificial intelligence and systems in global operation — including NordixBIOS, the Agentic AI Factory.",
    images: ["/adriano-caldas-social.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
