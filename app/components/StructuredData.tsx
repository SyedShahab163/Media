export default function StructuredData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nohay.online";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nohay Online",
    "alternateName": ["Noha Online", "Nohay", "Manqabat Online"],
    "url": base,
    "description": "Suno best nohay online — Nadeem Sarwar 2025, Mir Hasan Mir, Ali Shanawar, Shadman Raza. Muharram nohay, manqabat aur majalis free.",
    "inLanguage": ["ur", "en"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${base}/?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nohay Online",
    "url": base,
    "logo": `${base}/logo.png`,
    "sameAs": [],
    "description": "Islamic media platform for Nohay, Manqabat and Majalis"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",      "item": base },
      { "@type": "ListItem", "position": 2, "name": "Nohay",     "item": `${base}/#videos` },
      { "@type": "ListItem", "position": 3, "name": "Manqabat",  "item": `${base}/#manqabat` },
      { "@type": "ListItem", "position": 4, "name": "Majlis",    "item": `${base}/#majlis` },
      { "@type": "ListItem", "position": 5, "name": "Lyrics",    "item": `${base}/#lyrics` },
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Nadeem Sarwar ke nohay kahan se sunein?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nadeem Sarwar ke sare nohay Nohay Online pe free available hain. nohay.online pe jao aur Nadeem Sarwar section mein dekho."
        }
      },
      {
        "@type": "Question",
        "name": "Muharram 2025 ke nohay kahan milenge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Muharram 2025 ke latest nohay nohay.online pe milenge — Nadeem Sarwar, Mir Hasan Mir, Ali Shanawar aur Shadman Raza ke nohay."
        }
      },
      {
        "@type": "Question",
        "name": "Manqabat aur Majlis online kahan dekhein?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "nohay.online pe Manqabat aur Molana Majalis ka complete collection hai — bilkul free."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
