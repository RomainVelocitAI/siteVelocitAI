import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CpuChipIcon, ChatBubbleLeftRightIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';

const solutions = [
  {
    title: 'Automatisation des Tâches',
    description: 'Libérez votre équipe des tâches chronophages et répétitives',
    icon: <CpuChipIcon className="h-12 w-12 text-purple-600" />,
    bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    features: [
      'Automatiser la saisie de données',
      'Générer des rapports automatiquement',
      'Synchroniser vos systèmes',
      'Traiter les emails et documents',
      'Gérer les stocks et commandes'
    ],
    backTitle: 'Automatisation Avancée',
    benefits: [
      'Jusqu\'à 80% de temps gagné',
      'Réduction des erreurs de saisie',
      'Processus standardisés',
      'Rapports en temps réel'
    ],
    ctaText: 'Automatiser maintenant'
  },
  {
    title: 'Chatbots Intelligents',
    description: 'Optimisez votre service client avec des chatbots disponibles 24/7',
    icon: <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600" />,
    bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    features: [
      'Répondre aux questions fréquentes',
      'Qualifier et orienter les prospects',
      'Prendre des rendez-vous automatiquement',
      'Traiter les demandes de support',
      'Intégrer WhatsApp, Facebook, site web'
    ],
    backTitle: 'Service Client Automatisé',
    benefits: [
      'Réponse immédiate 24/7',
      'Taux de résolution accru',
      'Qualification des leads',
      'Réduction des coûts support'
    ],
    ctaText: 'Démarrer avec un chatbot'
  },
  {
    title: 'Optimisation des Processus',
    description: 'Analysez et optimisez vos processus métier pour un gain de temps maximal',
    icon: <ArrowsRightLeftIcon className="h-12 w-12 text-cyan-600" />,
    bgColor: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20',
    features: [
      'Audit des processus existants',
      'Identification des goulots d\'étranglement',
      'Workflows automatisés sur mesure',
      'Intégration avec vos outils actuels',
      'Formation et accompagnement'
    ],
    backTitle: 'Excellence Opérationnelle',
    benefits: [
      'Gains de productivité',
      'Processus optimisés',
      'Réduction des coûts',
      'Meilleure expérience employé'
    ],
    ctaText: 'Optimiser mes processus'
  }
];

interface Solution {
  title: string;
  description: string;
  icon: React.ReactElement;
  bgColor: string;
  features: string[];
  backTitle: string;
  benefits: string[];
  ctaText: string;
}

interface SolutionCardProps {
  solution: Solution;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const SolutionCard = ({ solution, isHovered, onHoverStart, onHoverEnd }: SolutionCardProps) => {
  // État pour gérer le clic sur mobile
  const [isTapped, setIsTapped] = useState(false);
  
  // Gestion du clic sur mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Vérifier si nous sommes côté client
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      // Vérifier au chargement
      checkIfMobile();
      
      // Écouter les changements de taille
      window.addEventListener('resize', checkIfMobile);
      
      // Nettoyer l'écouteur d'événement
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);
  
  const handleTap = () => {
    if (isMobile) {
      setIsTapped(!isTapped);
    }
  };
  
  // Détermine si la carte doit être retournée (survol ou clic)
  return (
    <motion.div
      className="relative h-full w-full perspective-1000 min-h-[500px]"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={handleTap}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      aria-expanded={isTapped || isHovered}
      aria-label={`${solution.title}. Cliquez pour plus d'informations`}
      style={{ height: '500px' }}
    >
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        <motion.div 
          className="w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            height: '100%',
            transition: 'transform 0.7s ease-in-out',
            transform: (isHovered || isTapped) ? 'rotateY(180deg)' : 'rotateY(0)'
          }}
        >
          {/* Face avant */}
          <div 
            className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden absolute border border-gray-100 dark:border-gray-700"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.bgColor} mb-6`}>
                {React.cloneElement(solution.icon, { className: 'h-8 w-8' })}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {solution.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {solution.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Fonctionnalités clés :
                </h4>
                <ul className="space-y-2">
                  {solution.features.slice(0, 3).map((feature: string) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Bande d'instruction */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white py-3 px-4 text-center mt-auto">
              <span className="text-sm font-medium">
                <span className="hidden md:inline">Survolez</span>
                <span className="md:hidden">Appuyez</span> pour en savoir plus
              </span>
            </div>
          </div>
          
          {/* Face arrière */}
          <div 
            className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl shadow-lg flex flex-col overflow-hidden absolute"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="p-6 flex-1 flex flex-col text-white">
              <h3 className="text-2xl font-bold mb-6">
                {solution.backTitle}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Avantages clés :</h4>
                  <ul className="space-y-2 text-white/90">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/80">
                    Solution personnalisable selon vos besoins spécifiques et intégrée à vos outils existants.
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-purple-600 py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {solution.ctaText}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function SolutionsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <FadeInUp>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Nos Solutions d'Automatisation
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment nos solutions sur mesure peuvent transformer votre entreprise et booster votre productivité.
              Choisissez l'option qui correspond le mieux à vos besoins.
            </p>
          </FadeInUp>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white py-4 px-8 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            En discuter avec nous
          </motion.a>
        </div>
      </div>
    </section>
  );
};