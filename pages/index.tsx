import Head from 'next/head';
import HeroSection from '@/components/sections/HeroSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import ContactSection from '@/components/sections/ContactSection';
import WhyAutomateSection from '@/components/sections/WhyAutomateSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import MethodologySection from '@/components/sections/MethodologySection';

import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Velocit.AI | Automatisation d'entreprise à La Réunion</title>
        <meta 
          name="description" 
          content="Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion. Gagnez du temps et augmentez votre productivité." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Velocit.AI - Automatisation d'entreprise à La Réunion" />
        <meta 
          property="og:description" 
          content="Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velocit-ai.fr" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Balises Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Velocit.AI - Automatisation d'entreprise à La Réunion" />
        <meta 
          name="twitter:description" 
          content="Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion." 
        />
        <meta name="twitter:image" content="/images/twitter-card.jpg" />
      </Head>

      <main>
        <HeroSection />
        <WhyAutomateSection />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
          <CalculatorSection />
        </div>
        <SolutionsSection />
        <MethodologySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </div>
  );
}
