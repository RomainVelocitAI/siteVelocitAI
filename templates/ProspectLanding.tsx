import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { trackSectionView } from '@/lib/analytics';
import { useEffect } from 'react';

interface ProspectLandingProps {
  // Données obligatoires
  prospectName: string;
  companyName: string;
  email: string;
  phone?: string;
  
  // Données optionnelles pour personnalisation
  industry?: string;
  companySize?: string;
  challenges?: string[];
  goals?: string[];
  currentTools?: string[];
  budget?: string;
  timeline?: string;
  
  // Métadonnées
  leadSource?: string;
  leadScore?: number;
  assignedTo?: string;
  
  // Configuration de la page
  customMessage?: string;
  offerType?: 'standard' | 'premium' | 'enterprise';
  ctaText?: string;
  ctaUrl?: string;
  slug?: string;
  createdAt?: string;
}

const ProspectLanding: NextPage<ProspectLandingProps> = ({
  prospectName,
  companyName,
  email,
  phone,
  industry,
  companySize,
  challenges = [],
  goals = [],
  currentTools = [],
  budget,
  timeline,
  leadSource,
  leadScore = 0,
  customMessage,
  offerType = 'standard',
  ctaText = 'Découvrir l\'offre personnalisée',
  ctaUrl = '#contact',
  slug,
}) => {
  useEffect(() => {
    trackSectionView(`prospect_page_${slug || 'unknown'}`);
  }, [slug]);

  const getOfferDetails = () => {
    switch (offerType) {
      case 'premium':
        return {
          title: 'Offre Premium',
          subtitle: 'Solution complète avec accompagnement dédié',
          features: ['Audit approfondi gratuit', 'Implémentation prioritaire', 'Support 24/7', 'Formation équipe'],
          highlight: 'Économies estimées : jusqu\'à 40 000€/an'
        };
      case 'enterprise':
        return {
          title: 'Offre Enterprise',
          subtitle: 'Transformation digitale complète',
          features: ['Audit + roadmap stratégique', 'Intégrations avancées', 'Account manager dédié', 'SLA garanti'],
          highlight: 'ROI moyen : 300% en 12 mois'
        };
      default:
        return {
          title: 'Offre Starter',
          subtitle: 'Première automatisation pour tester',
          features: ['Audit gratuit', 'Première automatisation', 'Formation de base', 'Support email'],
          highlight: 'Résultats visibles en 30 jours'
        };
    }
  };

  const offer = getOfferDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Head>
        <title>Offre Personnalisée pour {prospectName} - {companyName} | VelocitAI</title>
        <meta name="description" content={`Solution d'automatisation sur mesure pour ${companyName}. ${offer.highlight}`} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/prospect/${slug}`} />
      </Head>

      {/* Header avec logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">VelocitAI</span>
            </div>
            <div className="text-sm text-gray-500">
              Page personnalisée pour {companyName}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bonjour <span className="text-purple-600">{prospectName}</span> ! 👋
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 mb-8">
            <p>Nous avons préparé une solution d'automatisation</p>
            <p>spécialement conçue pour <strong className="text-purple-600">{companyName}</strong></p>
            {industry && <p className="text-lg mt-2 text-gray-500">Secteur {industry}</p>}
          </div>
          
          {customMessage && (
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mx-auto max-w-2xl mb-8">
              <p className="text-purple-700 italic">"{customMessage}"</p>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Offre personnalisée */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
              <div className="flex items-center mb-4">
                <TrophyIcon className="w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold">{offer.title}</h2>
              </div>
              <p className="text-purple-100 text-lg">{offer.subtitle}</p>
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-lg">{offer.highlight}</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Inclus dans votre offre :</h3>
              <div className="space-y-4">
                {offer.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {timeline && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium text-gray-900">Timeline souhaité :</span>
                    <span className="ml-2 text-purple-600">{timeline}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Informations personnalisées */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Défis identifiés */}
            {challenges.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4">
                  Défis identifiés pour {companyName}
                </h3>
                <ul className="space-y-2">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="text-red-700 flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Objectifs */}
            {goals.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4">
                  Objectifs à atteindre
                </h3>
                <ul className="space-y-2">
                  {goals.map((goal, index) => (
                    <li key={index} className="text-green-700 flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Informations de contact */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Vos informations de contact
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Entreprise :</span>
                  <span className="ml-2 text-gray-900">{companyName}</span>
                  {companySize && (
                    <span className="ml-2 text-sm text-gray-500">({companySize})</span>
                  )}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contact :</span>
                  <span className="ml-2 text-purple-600">{prospectName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email :</span>
                  <a href={`mailto:${email}`} className="ml-2 text-purple-600 hover:underline">
                    {email}
                  </a>
                </div>
                {phone && (
                  <div>
                    <span className="font-medium text-gray-700">Téléphone :</span>
                    <a href={`tel:${phone}`} className="ml-2 text-purple-600 hover:underline">
                      {phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Principal */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-center"
            >
              <a
                href={ctaUrl}
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => trackSectionView(`cta_clicked_${slug}`)}
              >
                {ctaText}
              </a>
              <p className="text-sm text-gray-500 mt-3">
                Réponse garantie sous 2h ouvrées
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>Cette page a été créée spécialement pour {companyName}</p>
          {leadSource && (
            <p className="text-sm mt-1">Source : {leadSource}</p>
          )}
        </footer>
      </main>
    </div>
  );
};

export default ProspectLanding;
