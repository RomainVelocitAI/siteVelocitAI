import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, LightBulbIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'; 

export default function LocalExpertiseSection() {
  const expertisePoints = [
    {
      title: 'Proximité et Réactivité',
      description: 'Support technique local et intervention rapide sur toute l\'île',
      icon: <MapPinIcon className="h-8 w-8 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Connaissance du Marché Local',
      description: 'Compréhension des spécificités économiques et réglementaires locales',
      icon: <LightBulbIcon className="h-8 w-8 text-amber-600" />,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Solutions Sur Mesure',
      description: 'Développement personnalisé selon vos besoins et contraintes',
      icon: <PuzzlePieceIcon className="h-8 w-8 text-green-600" />,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Expertise Locale
            </h2>
            <div className="mt-6 h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Votre partenaire de confiance pour l'automatisation d'entreprise. Basés localement, nous comprenons
              les défis spécifiques des entreprises de la région et proposons des solutions adaptées à votre contexte.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {expertisePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`${point.bgColor} p-8 rounded-2xl h-full flex flex-col items-start`}>
                  <div className={`p-3 rounded-lg ${point.bgColor} mb-4`}>
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
