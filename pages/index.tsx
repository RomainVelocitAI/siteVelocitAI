import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import WhyAutomateSection from '@/components/sections/WhyAutomateSection';
import StructuredData from '@/components/StructuredData';
import { organizationSchema, localBusinessSchema, websiteSchema, serviceSchema, productSchema, faqSchema } from '@/lib/structured-data';
import { getSimpleTestimonials, SimpleFormattedTestimonial } from '@/lib/airtable-simple';

// Import SEO-critical sections directly (no state, no client-only APIs)
import SolutionsSection from '@/components/sections/SolutionsSection';
import MethodologySection from '@/components/sections/MethodologySection';
import FAQSection from '@/components/sections/FAQSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';

// Dynamic imports - CalculatorSection now SSR compatible with client hydration
const CalculatorSection = dynamic(() => import('@/components/sections/CalculatorSection'), {
  ssr: true, // CRITICAL SEO FIX: Enable SSR for crawlers
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-400">Chargement du calculateur...</p>
      </div>
    </div>
  )
});

const InstagramTestimonialsSection = dynamic(() => import('@/components/sections/InstagramTestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: true, // CRITICAL SEO FIX: Enable SSR for crawlers (uses useEffect for client-side logic)
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const BeforeAfterSection = dynamic(() => import('@/components/sections/BeforeAfterSection'), {
  ssr: true, // CRITICAL SEO FIX: Enable SSR for crawlers (GSAP already has SSR guards)
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

interface HomeProps {
  testimonials: SimpleFormattedTestimonial[];
}

// FAQ data for structured data
const faqData = [
  {
    question: "Comment mesurer concrètement le ROI de vos agents IA ?",
    answer: "Nous garantissons un ROI positif dès le premier mois d'utilisation. Calcul concret : à partir de 197€/mois par agent, si vous économisez seulement 5h/semaine à 25€/h, c'est 500€ d'économies mensuelles pour 197€ d'investissement. Avec 10h/semaine économisées, c'est 1000€ d'économies. Nos clients constatent en moyenne 8 à 15h/semaine libérées par processus automatisé, 40% de réduction des coûts opérationnels, 90% de réduction des erreurs. ROI minimum : 150% dès le premier mois, souvent bien plus."
  },
  {
    question: "Quelle est la complexité d'intégration avec nos systèmes existants ?",
    answer: "Nos agents IA s'intègrent nativement avec plus de 500 outils business : ERP, CRM, comptabilité, e-commerce. Déploiement progressif sur 2 semaines avec formation complète de vos équipes. Aucune interruption de service pendant la migration. Nos experts techniques vous accompagnent à chaque étape avec une garantie de bon fonctionnement dès la mise en service."
  },
  {
    question: "Quel niveau d'autonomie peuvent atteindre nos processus métier ?",
    answer: "Nos écosystèmes d'agents IA permettent 80% d'autonomie sur vos processus récurrents : gestion administrative, relation client, logistique, reporting. Vos agents apprennent en continu et s'améliorent automatiquement. Vous gardez le contrôle stratégique tout en libérant 25h/semaine minimum pour vous concentrer sur le développement business et l'innovation."
  },
  {
    question: "Quelles garanties de sécurité et de continuité de service ?",
    answer: "Infrastructure cloud sécurisée avec certification ISO 27001 et conformité RGPD native. Disponibilité garantie 99.9% avec sauvegardes automatisées toutes les heures. Restauration complète garantie. Vos données restent en Europe, chiffrées de bout en bout. Support technique 24h/24 avec serveur VPS dédié. Aucune perte de données en 5 ans d'activité."
  },
  {
    question: "Quel est l'investissement nécessaire pour une PME de notre taille ?",
    answer: "Nos solutions sont dimensionnées pour les PME de 5 à 200 personnes. Investissement à partir de 197€/mois par agent IA, soit l'équivalent de 10% du coût d'un salarié. Retour sur investissement immédiat dès le premier mois : même avec seulement 5h économisées × 25€/h = 500€ d'économies pour 197€ d'investissement. ROI minimum de 150% garanti, souvent 300-500% selon les processus automatisés. Financement échelonné possible, sans engagement de durée."
  },
  {
    question: "Quel niveau de support et d'accompagnement proposez-vous ?",
    answer: "Nous visons un véritable partenariat à long terme avec nos clients. Support premium francophone avec temps de réponse sous 24h. Meetings réguliers organisés pour analyser et améliorer continuellement vos processus automatisés. Notre objectif : vous amener toujours plus loin dans votre transformation. Formation complète de vos équipes et accompagnement personnalisé. Mises à jour et optimisations continues incluses. Taux de satisfaction client 98%."
  }
];

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

      <StructuredData data={[organizationSchema, localBusinessSchema, websiteSchema, serviceSchema, productSchema, faqSchema(faqData)]} />

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

// Utiliser getStaticProps avec ISR pour réduire les appels API
// Revalidation toutes les heures (3600 secondes)
export const getStaticProps: GetStaticProps = async () => {
  const testimonials = await getSimpleTestimonials();
  
  return {
    props: {
      testimonials,
    },
    // Revalider la page toutes les heures
    revalidate: 3600, // 1 heure en secondes
  };
};