// JSON-LD structured data for better SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VelocitAI",
  "description": "Agence d'automatisation d'entreprise spécialisée dans l'optimisation des processus métier à La Réunion",
  "url": "https://velocit-ai.fr",
  "logo": "https://velocit-ai.fr/images/Color logo - no background.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "77b Rue Adrien Lagourgue",
    "addressLocality": "Piton Saint Leu",
    "postalCode": "97424",
    "addressRegion": "La Réunion",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+262693111538",
    "email": "direction@velocit-ai.fr",
    "contactType": "customer service",
    "availableLanguage": "French"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=100089911241589",
    "https://www.instagram.com/velocit_ai/"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VelocitAI",
  "image": "https://velocit-ai.fr/images/Color logo - no background.png",
  "description": "Expert en automatisation d'entreprise à La Réunion. Solutions IA sur mesure pour doubler votre productivité.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "77b Rue Adrien Lagourgue",
    "addressLocality": "Piton Saint Leu",
    "postalCode": "97424",
    "addressRegion": "La Réunion",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -21.1828,
    "longitude": 55.2892
  },
  "telephone": "+262693111538",
  "email": "direction@velocit-ai.fr",
  "priceRange": "€€",
  "openingHours": "Mo-Fr 09:00-18:00",
  "url": "https://velocit-ai.fr",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": -21.1828,
      "longitude": 55.2892
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=100089911241589",
    "https://www.instagram.com/velocit_ai/"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "VelocitAI - Automatisation d'entreprise à La Réunion",
  "url": "https://velocit-ai.fr",
  "description": "Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion. Gagnez du temps et augmentez votre productivité.",
  "publisher": {
    "@type": "Organization",
    "name": "VelocitAI"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://velocit-ai.fr/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automatisation d'entreprise",
  "description": "Services d'automatisation des processus métier, création de chatbots intelligents et optimisation des workflows pour les entreprises à La Réunion",
  "provider": {
    "@type": "Organization",
    "name": "VelocitAI"
  },
  "areaServed": {
    "@type": "Place",
    "name": "La Réunion",
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -21.1828,
        "longitude": 55.2892
      },
      "geoRadius": "50000"
    }
  },
  "serviceType": "Business Process Automation",
  "offers": {
    "@type": "Offer",
    "description": "Solutions d'automatisation sur mesure adaptées aux besoins de votre entreprise",
    "priceCurrency": "EUR",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "197",
      "priceCurrency": "EUR",
      "price": "197",
      "unitText": "par agent IA par mois"
    },
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  },
  "serviceOutput": {
    "@type": "Thing",
    "name": "Processus automatisés et agents IA"
  },
  "termsOfService": "https://velocit-ai.fr/cgv"
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Écosystème d'Agents IA VelocitAI",
  "description": "Solution complète d'automatisation d'entreprise avec agents IA spécialisés pour libérer 25h/semaine et optimiser vos processus métier",
  "image": "https://velocit-ai.fr/images/Color logo - no background.png",
  "brand": {
    "@type": "Brand",
    "name": "VelocitAI"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "197",
    "highPrice": "997",
    "priceCurrency": "EUR",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "15",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});