import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nohay.online"),

  title: {
    default: "Nohay Online — Nadeem Sarwar, Mir Hasan Mir, Ali Shanawar | Noha & Manqabat 2025",
    template: "%s | Nohay Online",
  },

  description:
    "Suno best nohay online — Nadeem Sarwar 2025, Mir Hasan Mir, Ali Shanawar, Shadman Raza. Muharram nohay, manqabat aur majalis — sab free, sab ek jagah. Karbala nohay HD.",

  keywords: [
    "nohay online", "nadeem sarwar nohay 2025", "mir hasan mir nohay",
    "ali shanawar nohay", "shadman raza nohay", "muharram nohay",
    "karbala nohay", "manqabat", "majlis", "noha 2025",
    "nadeem sarwar new noha", "free nohay", "nohay mp3",
    "islamic nohay", "azadari nohay", "ya hussain nohay",
    "noha khan", "nohay lyrics", "punjabi nohay", "urdu nohay",
  ],

  authors: [{ name: "Nohay Online", url: "https://nohay.online" }],
  creator: "Nohay Online",
  publisher: "Nohay Online",

  openGraph: {
    type: "website",
    locale: "ur_PK",
    alternateLocale: ["en_US"],
    url: "https://nohay.online",
    siteName: "Nohay Online",
    title: "Nohay Online — Nadeem Sarwar, Mir Hasan Mir | Noha & Manqabat 2025",
    description:
      "Suno best nohay online — Nadeem Sarwar 2025, Mir Hasan Mir, Ali Shanawar. Muharram nohay, manqabat aur majalis free.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nohay Online — Noha & Manqabat 2025",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nohay Online — Nadeem Sarwar, Mir Hasan Mir | Noha 2025",
    description: "Best nohay online — Nadeem Sarwar, Mir Hasan Mir, Ali Shanawar. Free nohay aur manqabat.",
    images: ["/og-image.jpg"],
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

  alternates: {
    canonical: "https://nohay.online",
    languages: {
      "ur-PK": "https://nohay.online",
      "en-US": "https://nohay.online/en",
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },

  category: "religion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
