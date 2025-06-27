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
    "addressRegion": "La Réunion",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "French"
  },
  "sameAs": [
    // Add social media links when available
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
  "areaServed": "La Réunion",
  "serviceType": "Business Process Automation",
  "offers": {
    "@type": "Offer",
    "description": "Solutions d'automatisation sur mesure adaptées aux besoins de votre entreprise"
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