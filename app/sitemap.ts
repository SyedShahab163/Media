import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://nohay.online").replace(/\/$/, "");

  return [
    { url: base,                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/#videos`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.95 },
    { url: `${base}/#noha-khan`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/#manqabat`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${base}/#majlis`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/#lyrics`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/#contact`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
