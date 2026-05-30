// Defines the root shell, provider wiring, and site-wide SEO for the Nexcord Connect demo.
import type { Metadata } from "next";
import "./globals.css";
import { NexcordProvider } from "@nexcord-oss/connect";

export const metadata: Metadata = {
  metadataBase: new URL("https://connect.nexcord.app"),

  title: {
    default: "Nexcord Connect — Wallet connection for Next.js",
    template: "%s | Nexcord Connect",
  },

  description:
    "The simplest way to add wallet connection to any Next.js app. Default UI or headless hooks — your choice.",

  keywords: [
    "wallet connect",
    "web3",
    "Next.js",
    "wagmi",
    "ethereum",
    "Discord",
    "Nexcord",
  ],

  authors: [{ name: "Nexcord", url: "https://nexcord.app" }],
  creator: "Nexcord",
  publisher: "Nexcord",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://connect.nexcord.app",
    siteName: "Nexcord Connect",
    title: "Nexcord Connect — Wallet connection for Next.js",
    description:
      "The simplest way to add wallet connection to any Next.js app. Default UI or headless hooks — your choice.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexcord Connect",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexcord Connect — Wallet connection for Next.js",
    description:
      "The simplest way to add wallet connection to any Next.js app. Default UI or headless hooks — your choice.",
    images: ["/og-image.png"],
    creator: "@nexcordapp",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <NexcordProvider
          projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""}
          appName="Nexcord Connect Demo"
        >
          {children}
        </NexcordProvider>
      </body>
    </html>
  );
}
