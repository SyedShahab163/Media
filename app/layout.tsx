import type { Metadata } from "next";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Noha & Manqabat",
//   description: "Nadeem Sarwar, Mir Hasan Mir, Ali Shanawar ke nohay, manqabat aur majalis — sab ek jagah",
//   keywords: "noha, manqabat, majlis, nadeem sarwar, mir hasan mir, ali shanawar, karbala, muharram",
//  verification: {
//     google: "google-site-verification=9Yt9fOm3NgJH0bk73titMIi7HU46FYLD1WfEqjNlubQ",
//   },
// };
export const metadata = {
  metadataBase: new URL("https://nohayonline.com"),

  title: {
    default: "Nohay Online",
    template: "%s | Nohay Online",
  },

  description:
    "Listen to beautiful Noha, Manqabat, Majlis and Islamic poetry online.",

  keywords: [
    "nohay",
    "manqabat",
    "majlis",
    "islamic poetry",
    "azadari",
  ],

  openGraph: {
    title: "Nohay Online",
    description:
      "Listen to Noha, Manqabat and Majlis online",
    url: "https://nohayonline.com",
    siteName: "Nohay Online",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nohay Online",
    description: "Listen to Noha and Manqabat",
  },

  verification: {
    google: "google-site-verification=9Yt9fOm3NgJH0bk73titMIi7HU46FYLD1WfEqjNlubQ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
