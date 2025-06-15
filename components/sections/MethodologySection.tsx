import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ClipboardDocumentCheckIcon, CodeBracketIcon, UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    name: 'Audit Gratuit',
    description: 'Analyse approfondie de vos processus actuels et identification des opportunités d\'automatisation.',
    icon: <MagnifyingGlassIcon className="h-10 w-10 text-indigo-600" />,
    color: 'from-indigo-50 to-indigo-100',
    delay: 0.1
  },
  {
    name: 'Stratégie',
    description: 'Élaboration d\'un plan d\'action personnalisé avec des objectifs clairs et des indicateurs de performance.',
    icon: <ClipboardDocumentCheckIcon className="h-10 w-10 text-blue-600" />,
    color: 'from-blue-50 to-blue-100',
    delay: 0.2
  },
  {
    name: 'Développement',
    description: 'Mise en œuvre des solutions d\'automatisation avec des tests approfondis pour garantir la qualité.',
    icon: <CodeBracketIcon className="h-10 w-10 text-purple-600" />,
    color: 'from-purple-50 to-purple-100',
    delay: 0.3
  },
  {
    name: 'Formation',
    description: 'Accompagnement de votre équipe pour une prise en main rapide et efficace des nouveaux outils.',
    icon: <UserGroupIcon className="h-10 w-10 text-green-600" />,
    color: 'from-green-50 to-green-100',
    delay: 0.4
  }
];

export default function MethodologySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Notre Méthode en 4 Étapes
            </h2>
            <div className="mt-4 h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Une approche structurée pour garantir le succès de votre projet d'automatisation
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  <a 
                    href="#contact" 
                    className="mt-6 text-indigo-600 font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-indigo-800"
                  >
                    En savoir plus
                    <ArrowPathIcon className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="#contact"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 w-full">
              Commencer par un audit gratuit
            </button>
          </a>
          <p className="mt-4 text-sm text-gray-500">Sans engagement - Délai de réponse sous 24h</p>
        </motion.div>
      </div>
    </section>
  );
};
