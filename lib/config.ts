// Configuration centralisée pour l'application

export const config = {
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'VelocitAI',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://velocit-ai.fr',
    description: 'Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion.',
  },
  
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@velocit-ai.fr',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+33123456789',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33123456789',
  },
  
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
  },
  
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validation des variables d'environnement requises
export const validateConfig = () => {
  const required = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_CONTACT_EMAIL',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};