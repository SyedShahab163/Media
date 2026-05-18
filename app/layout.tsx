import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noha & Manqabat",
  description: "Nadeem Sarwar, Mir Hasan Mir, Ali Shanawar ke nohay, manqabat aur majalis — sab ek jagah",
  keywords:  " nohay.online ,noha, manqabat,nohay,no,nohay2026,majis  majlis, nadeem sarwar, mir hasan mir, ali shanawar, karbala, muharram",
verification: {
    google: "google-site-verification=9Yt9fOm3NgJH0bk73titMIi7HU46FYLD1WfEqjNlubQ", // Jo code humne pehle lagaya tha
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
