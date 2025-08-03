import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ClockIcon, BoltIcon, ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';
import { RocketIcon, ArrowRightIcon } from '../ui/Icons';

const stats = [
  { 
    value: '70%', 
    label: 'de temps gagné sur les tâches répétitives',
    icon: <ClockIcon className="h-10 w-10 text-purple-600" />
  },
  { 
    value: '24/7', 
    label: 'disponibilité des processus automatisés',
    icon: <BoltIcon className="h-10 w-10 text-blue-600" />
  },
  { 
    value: '0%', 
    label: 'erreur humaine avec l\'automatisation',
    icon: <ShieldCheckIcon className="h-10 w-10 text-cyan-600" />
  },
];

const benefits = [
  {
    title: 'ROI Immédiat',
    description: 'Rentabilisez votre investissement dès le premier mois',
    detail: 'Nos clients économisent en moyenne 10h par semaine',
    metric: '400%',
    metricLabel: '10h/semaine',
    icon: CurrencyDollarIcon,
    color: 'from-green-500 to-emerald-600',
    pattern: 'cash'
  },
  {
    title: 'Productivité Maximale',
    description: 'Multipliez par 5 votre efficacité opérationnelle',
    detail: 'Automatisation intelligente des tâches répétitives',
    metric: '+500%',
    metricLabel: 'productivité',
    icon: ChartBarIcon,
    color: 'from-blue-500 to-blue-600',
    pattern: 'growth'
  },
  {
    title: 'Solutions Sur Mesure',
    description: 'Automatisation personnalisée selon vos besoins',
    detail: 'Chaque solution est adaptée à votre secteur et processus',
    metric: '100%',
    metricLabel: 'personnalisé',
    icon: UserGroupIcon,
    color: 'from-purple-500 to-purple-600',
    pattern: 'star'
  },
  {
    title: 'Zéro Erreur Garantie',
    description: 'Éliminez 100% des erreurs humaines',
    detail: 'Processus parfaitement reproductibles',
    metric: '99.9%',
    metricLabel: 'fiabilité',
    icon: ShieldCheckIcon,
    color: 'from-cyan-500 to-cyan-600',
    pattern: 'shield'
  }
];

// Variantes d'animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function WhyAutomateSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center">
          <StaggerItem>
            <FadeInUp>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                Pourquoi Automatiser vos Tâches Répétitives ?
              </h2>
              <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"></div>
            </FadeInUp>
          </StaggerItem>
          
          <StaggerItem>
            <FadeInUp delay={0.1}>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Dans un monde où la productivité est essentielle, l'automatisation d'entreprise devient indispensable. 
                Les entreprises qui automatisent leurs processus gagnent en moyenne 70% de temps sur leurs tâches 
                répétitives et réduisent leurs coûts opérationnels de manière significative.
              </p>
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>

        <motion.div 
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div 
                className={`p-4 w-16 h-16 rounded-2xl ${
                  index === 0 ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' : 
                  index === 1 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 
                  'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600'
                } flex items-center justify-center mb-6`}
              >
                {React.cloneElement(stat.icon, { className: 'h-8 w-8' })}
              </div>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact visuel moderne */}
        <motion.div 
          className="mt-32 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background decorative */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.h3 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Transformez votre{' '}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Business
              </span>
            </motion.h3>
            <motion.div
              className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Des résultats concrets et mesurables qui révolutionnent votre façon de travailler
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                className="group relative"
                variants={itemVariants}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Gradient animé en arrière-plan */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Métrique en grand */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      className={`bg-gradient-to-r ${benefit.color} text-white text-lg font-bold px-4 py-2 rounded-xl shadow-lg`}
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.15 + 0.5, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      viewport={{ once: true }}
                    >
                      {benefit.metric}
                    </motion.div>
                  </div>

                  {/* Icône avec effet animé */}
                  <div className="mb-6">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} shadow-xl`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <benefit.icon className="h-10 w-10 text-white" />
                    </motion.div>
                  </div>

                  {/* Contenu */}
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    
                    <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {benefit.detail}
                    </p>

                    {/* Label métrique */}
                    <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {benefit.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Effet de particules au hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${benefit.color} rounded-full opacity-0 group-hover:opacity-70`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          x: [0, Math.random() * 20 - 10, 0],
                          scale: [0, 1, 0],
                          opacity: [0, 0.7, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Glow effect premium */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action en bas */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#calculateur"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#calculateur')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <RocketIcon className="w-6 h-6" />
                <span>Calculer mon potentiel</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
