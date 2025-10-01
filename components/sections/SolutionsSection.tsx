import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CpuChipIcon, ChatBubbleLeftRightIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';

const solutions = [
  {
    title: 'Agents Administratifs IA',
    description: 'Vos processus administratifs fonctionnent en autonomie complète avec nos agents spécialisés par métier.',
    icon: <CpuChipIcon className="h-12 w-12 text-purple-600" />,
    bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    features: [
      'Agent Comptable IA : saisie automatique et reporting financier',
      'Agent RH IA : gestion paie et processus recrutement',
      'Agent Juridique IA : contrats et conformité RGPD native',
      'Agent Communication IA : réponses client personnalisées',
      'Agent Logistique IA : optimisation stock et approvisionnement'
    ],
    backTitle: 'Excellence Opérationnelle',
    benefits: [
      'Réduction de 90% des erreurs administratives mesurée',
      'Conformité réglementaire automatique et traçable',
      'Reporting métier en temps réel et prédictif',
      'Libération de votre équipe pour la valeur ajoutée'
    ],
    ctaText: 'Déployer les agents administratifs'
  },
  {
    title: 'Agents Commerciaux IA',
    description: 'Votre écosystème de vente autonome fonctionne 24h/24 pour qualifier, convertir et développer votre portefeuille client.',
    icon: <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600" />,
    bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    features: [
      'Agent Prospection IA : génération et qualification automatisée',
      'Agent Support IA : service client multicanal intelligent',
      'Agent Commercial IA : devis automatiques et suivi personnalisé',
      'Agent Fidélisation IA : upselling et customer success',
      'Orchestration omnicanale : site web, WhatsApp, CRM intégrés'
    ],
    backTitle: 'Performance Commerciale Mesurable',
    benefits: [
      'Multiplication par 3 des leads qualifiés documentée',
      'Service client 24h/24 avec taux de résolution 85%',
      'Processus de vente optimisé avec analytics avancés',
      'Prédictions de chiffre d\'affaires fiables à 90%'
    ],
    ctaText: 'Déployer les agents commerciaux'
  },
  {
    title: 'Écosystème Orchestré',
    description: 'Tous vos agents IA collaborent de manière intelligente pour créer une organisation auto-optimisante et évolutive.',
    icon: <ArrowsRightLeftIcon className="h-12 w-12 text-cyan-600" />,
    bgColor: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20',
    features: [
      'Orchestration intelligente multi-agents coordonnée',
      'Optimisation continue des processus métier critiques',
      'Intégration native avec 500+ outils business existants',
      'Analytics prédictifs et tableaux de bord exécutifs',
      'Déploiement professionnel et formation équipe incluse'
    ],
    backTitle: 'Transformation Digitale Complète',
    benefits: [
      'Scalabilité maîtrisée sans complexité opérationnelle',
      'Amélioration continue mesurée et documentée',
      'ROI mesurable et suivi transparent sur 12 mois',
      'Autonomie opérationnelle avec supervision stratégique'
    ],
    ctaText: 'Déployer l\'\u00e9cosystème complet'
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

  // Gestion du clic - fonctionne sur tous les appareils
  const handleTap = () => {
    setIsTapped(!isTapped);
  };
  
  // Détermine si la carte doit être retournée (survol ou clic)
  return (
    <motion.div
      className="relative h-full w-full perspective-1000 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
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
            className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col absolute border border-gray-100 dark:border-gray-700"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
          >
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${solution.bgColor} mb-4 md:mb-6`}>
                  {React.cloneElement(solution.icon, { className: 'h-6 w-6 md:h-8 md:w-8' })}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                  {solution.description}
                </p>
                
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">
                    Fonctionnalités clés :
                  </h4>
                  <ul className="space-y-1 md:space-y-2">
                    {solution.features.slice(0, 3).map((feature: string) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Bande d'instruction */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white py-2 md:py-3 px-3 md:px-4 text-center">
              <span className="text-xs md:text-sm font-medium">
                <span className="hidden md:inline">Survolez</span>
                <span className="md:hidden">Appuyez</span> pour en savoir plus
              </span>
            </div>
          </div>
          
          {/* Face arrière */}
          <div 
            className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl shadow-lg flex flex-col absolute"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  {solution.backTitle}
                </h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm md:text-base">Avantages clés :</h4>
                    <ul className="space-y-1 md:space-y-2 text-white/90">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-sm md:text-base">✓</span>
                          <span className="text-xs md:text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 md:pt-4 border-t border-white/10">
                    <p className="text-xs md:text-sm text-white/80">
                      Solution personnalisable selon vos besoins spécifiques et intégrée à vos outils existants.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-purple-600 py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 block text-center text-sm md:text-base"
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
              Écosystème d'Agents IA Spécialisés par Métier
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transformez votre organisation avec des agents IA intelligents dédiés à chaque fonction business.
              Architecture évolutive : démarrez par vos processus prioritaires, étendez selon votre croissance.
            </p>
          </FadeInUp>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
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
            Audit stratégique personnalisé
          </motion.a>
        </div>
      </div>
    </section>
  );
};