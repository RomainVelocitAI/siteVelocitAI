import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import WhyAutomateSection from '@/components/sections/WhyAutomateSection';
import StructuredData from '@/components/StructuredData';
import { organizationSchema, websiteSchema, serviceSchema } from '@/lib/structured-data';
import { getSimpleTestimonials, SimpleFormattedTestimonial } from '@/lib/airtable-simple';

// Dynamic imports for better performance
const CalculatorSection = dynamic(() => import('@/components/sections/CalculatorSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const SolutionsSection = dynamic(() => import('@/components/sections/SolutionsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const MethodologySection = dynamic(() => import('@/components/sections/MethodologySection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const InstagramTestimonialsSection = dynamic(() => import('@/components/sections/InstagramTestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const BeforeAfterSection = dynamic(() => import('@/components/sections/BeforeAfterSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const BlogPreviewSection = dynamic(() => import('@/components/sections/BlogPreviewSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

interface HomeProps {
  testimonials: SimpleFormattedTestimonial[];
}

export default function Home({ testimonials }: HomeProps) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Velocit.AI | Automatisation IA sur Mesure pour Entreprises</title>
        <meta 
          name="description" 
          content="Solutions d'automatisation IA sur mesure pour votre entreprise. Dashboard intelligent, processus automatisés, prédictions IA - libérez le potentiel de votre business." 
        />
        <meta name="keywords" content="automatisation IA, intelligence artificielle entreprise, dashboard IA, processus automatisés, solutions IA sur mesure, productivité IA, automatisation entreprise, écosystème IA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://velocit-ai.fr" />
        
        {/* Balises Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Velocit.AI - Automatisation IA sur Mesure pour Entreprises" />
        <meta 
          property="og:description" 
          content="Solutions d'automatisation IA sur mesure : dashboard intelligent, processus automatisés, prédictions IA. Libérez le potentiel de votre entreprise." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velocit-ai.fr" />
        <meta property="og:image" content="https://velocit-ai.fr/images/og/velocitai-og.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="VelocitAI" />
        
        {/* Balises Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Velocit.AI - Automatisation IA sur Mesure pour Entreprises" />
        <meta 
          name="twitter:description" 
          content="Solutions d'automatisation IA sur mesure : dashboard intelligent, processus automatisés, prédictions IA. Libérez le potentiel de votre entreprise." 
        />
        <meta name="twitter:image" content="https://velocit-ai.fr/images/og/velocitai-og.jpg" />
        
        {/* Données structurées */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="VelocitAI" />
        <meta name="last-modified" content={new Date().toISOString()} />
      </Head>

      <StructuredData data={[organizationSchema, websiteSchema, serviceSchema]} />

      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="pourquoi">
          <WhyAutomateSection />
        </section>
        <section id="calculateur" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
          <CalculatorSection />
        </section>
        <section id="solutions">
          <SolutionsSection />
        </section>
        <section id="avant-apres">
          <BeforeAfterSection />
        </section>
        <section id="methodologie">
          <MethodologySection />
        </section>
        <section id="temoignages">
          <InstagramTestimonialsSection testimonials={testimonials} />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
        <section id="blog">
          <BlogPreviewSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const testimonials = await getSimpleTestimonials();
  
  return {
    props: {
      testimonials,
    },
  };
};
