import React from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  LightBulbIcon, 
  WrenchScrewdriverIcon, 
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem, ParallaxSection } from '../ui/animations';
import { CheckIcon, LightningIcon, TargetIcon } from '../ui/Icons';

const steps = [
  {
    number: '01',
    name: 'Audit IA Gratuit',
    title: 'Diagnostic IA complet',
    description: 'Analyse détaillée par IA de vos processus pour identifier les gains d\'automatisation potentiels',
    icon: MagnifyingGlassIcon,
    color: 'from-purple-600 to-blue-600',
    duration: '1-2 jours',
    deliverables: [
      'Cartographie IA des processus actuels',
      'Identification prédictive des goulots d\'étranglement',
      'Calcul du ROI d\'automatisation IA',
      'Recommandations IA prioritaires personnalisées'
    ],
    highlight: 'Gratuit et sans engagement'
  },
  {
    number: '02',
    name: 'Stratégie IA',
    title: 'Plan d\'automatisation IA sur mesure',
    description: 'Conception d\'une roadmap d\'automatisation IA personnalisée avec objectifs et KPIs mesurables',
    icon: LightBulbIcon,
    color: 'from-blue-600 to-cyan-500',
    duration: '3-5 jours',
    deliverables: [
      'Stratégie d\'automatisation IA détaillée',
      'Planning de déploiement IA phasé',
      'Budget et ressources IA nécessaires',
      'KPIs et métriques de performance IA'
    ],
    highlight: 'Approche méthodique'
  },
  {
    number: '03',
    name: 'Développement IA',
    title: 'Mise en œuvre IA experte',
    description: 'Développement et intégration des solutions d\'automatisation IA avec tests rigoureux',
    icon: WrenchScrewdriverIcon,
    color: 'from-cyan-500 to-green-500',
    duration: '2-6 semaines',
    deliverables: [
      'Solutions d\'automatisation IA fonctionnelles',
      'Tests IA complets et validation prédictive',
      'Documentation technique IA détaillée',
      'Intégration intelligente avec vos outils existants'
    ],
    highlight: 'Qualité garantie'
  },
  {
    number: '04',
    name: 'Formation IA',
    title: 'Autonomie IA assurée',
    description: 'Formation complète aux outils IA et accompagnement pour une adoption réussie',
    icon: AcademicCapIcon,
    color: 'from-green-500 to-purple-600',
    duration: '1-2 semaines',
    deliverables: [
      'Formation IA utilisateurs personnalisée',
      'Guide d\'utilisation IA détaillé',
      'Support technique IA 3 mois',
      'Optimisations IA continues et évolutives'
    ],
    highlight: 'Support inclus'
  }
];

export default function MethodologySection() {
  return (
    <ParallaxSection speed={0.1} className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <StaggerContainer className="text-center mb-20">
          <StaggerItem>
            <FadeInUp>
              <motion.h2 
                className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Notre{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Méthode d'Automatisation IA
                </span>
                {' '}en 4 Étapes
              </motion.h2>
              <motion.div
                className="w-28 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </FadeInUp>
          </StaggerItem>
          
          <StaggerItem>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Une approche éprouvée et structurée pour transformer votre entreprise avec l'intelligence artificielle
                <br className="hidden md:block" />
                avec des résultats mesurables et un ROI garanti à chaque étape.
              </p>
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 dark:from-purple-600/30 dark:via-blue-600/30 dark:to-cyan-600/30 transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                {/* Step Card */}
                <motion.div
                  className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 pt-12 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-500 overflow-visible min-h-[500px]"
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white dark:border-gray-800`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.2 + 0.3, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      viewport={{ once: true }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {step.name}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>

                    {/* Duration badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${step.color} text-white`}>
                      {step.duration}
                    </div>

                    {/* Deliverables (show on hover) */}
                    <motion.div
                      className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial="closed"
                      whileHover="open"
                    >
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Livrables :
                      </h5>
                      {step.deliverables.slice(0, 2).map((deliverable, delIndex) => (
                        <motion.div
                          key={delIndex}
                          className="flex items-start gap-2"
                          variants={{
                            open: { opacity: 1, x: 0 },
                            closed: { opacity: 0, x: -10 }
                          }}
                        >
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {deliverable}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Highlight */}
                    <motion.div
                      className={`mt-4 p-3 rounded-xl bg-gradient-to-r ${step.color} bg-opacity-10 border border-purple-200/30 dark:border-purple-600/30`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <SparklesIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                          {step.highlight}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting arrow (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        <ArrowRightIcon className="h-3 w-3 text-white" />
                      </motion.div>
                    </div>
                  )}

                  {/* Premium glow effect */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-6">
            <motion.a
              href="#contact"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-12 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <MagnifyingGlassIcon className="h-6 w-6" />
                Commencer par un audit IA gratuit
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.p
              className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="flex items-center gap-1">
                <CheckIcon className="w-4 h-4 text-green-500" />
                Sans engagement
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="flex items-center gap-1">
                <LightningIcon className="w-4 h-4 text-yellow-500" />
                Réponse sous 24h
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="flex items-center gap-1">
                <TargetIcon className="w-4 h-4 text-purple-600" />
                100% personnalisé
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};
