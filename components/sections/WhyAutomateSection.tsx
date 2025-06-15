import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ClockIcon, BoltIcon, ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations'; // Assurez-vous que ce chemin est correct

const stats = [
  { 
    value: '70%', 
    label: 'de temps gagné sur les tâches répétitives',
    icon: <ClockIcon className="h-10 w-10 text-indigo-500" />
  },
  { 
    value: '24/7', 
    label: 'disponibilité des processus automatisés',
    icon: <BoltIcon className="h-10 w-10 text-indigo-500" />
  },
  { 
    value: '0%', 
    label: 'erreur humaine avec l\'automatisation',
    icon: <ShieldCheckIcon className="h-10 w-10 text-indigo-500" />
  },
];

const benefits = [
  {
    title: 'Réduction des coûts',
    description: 'Diminuez vos dépenses opérationnelles',
    icon: <CurrencyDollarIcon className="h-8 w-8 text-white" />,
    bgColor: 'bg-green-600'
  },
  {
    title: 'Productivité accrue',
    description: 'Libérez du temps pour des tâches à valeur ajoutée',
    icon: <ChartBarIcon className="h-8 w-8 text-white" />,
    bgColor: 'bg-blue-600'
  },
  {
    title: 'Satisfaction client',
    description: 'Améliorez l\'expérience de vos clients',
    icon: <UserGroupIcon className="h-8 w-8 text-white" />,
    bgColor: 'bg-purple-600'
  },
  {
    title: 'Processus optimisés',
    description: 'Automatisez et optimisez vos flux de travail',
    icon: <ArrowPathIcon className="h-8 w-8 text-white" />,
    bgColor: 'bg-indigo-600'
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
      ease: [0.16, 0.77, 0.33, 0.96]
    }
  }
};

export default function WhyAutomateSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center">
          <StaggerItem>
            <FadeInUp>
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Pourquoi Automatiser vos Tâches Répétitives ?
              </h2>
              <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            </FadeInUp>
          </StaggerItem>
          
          <StaggerItem>
            <FadeInUp delay={0.1}>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div 
                className={`p-4 w-16 h-16 rounded-2xl ${
                  index === 0 ? 'bg-green-50 text-green-600' : 
                  index === 1 ? 'bg-blue-50 text-blue-600' : 
                  'bg-purple-50 text-purple-600'
                } flex items-center justify-center mb-6`}
              >
                {React.cloneElement(stat.icon, { className: 'h-8 w-8' })}
              </div>
              <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-4 text-gray-600 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Les avantages clés de l'automatisation</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative z-10">
                  <div 
                    className={`w-16 h-16 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {React.cloneElement(benefit.icon, { className: 'h-8 w-8' })}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
                <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full ${benefit.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
