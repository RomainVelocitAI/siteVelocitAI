import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Qu'est-ce que l'automatisation d'entreprise ?",
    answer: "L'automatisation d'entreprise consiste à utiliser des technologies pour automatiser les processus métier répétitifs et chronophages. Cela permet aux entreprises d'augmenter leur productivité, de réduire les erreurs humaines et de libérer du temps pour des tâches à plus forte valeur ajoutée."
  },
  {
    question: "Combien de temps faut-il pour mettre en place une automatisation ?",
    answer: "Le temps de mise en place varie en fonction de la complexité du processus à automatiser. Certaines solutions peuvent être mises en place en quelques jours, tandis que des projets plus complexes peuvent prendre plusieurs semaines. Notre audit initial nous permet de vous fournir un calendrier précis."
  },
  {
    question: "Quel est le retour sur investissement (ROI) attendu ?",
    answer: "La plupart de nos clients constatent un retour sur investissement en moins de 6 mois. Les économies proviennent de la réduction du temps passé sur les tâches répétitives, de la diminution des erreurs et de l'augmentation de la productivité de vos équipes."
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer: "La sécurité de vos données est notre priorité absolue. Nous utilisons des protocoles de chiffrement avancés et des solutions hébergées en Europe conformes au RGPD. Nous pouvons également travailler avec vos infrastructures existantes si nécessaire."
  },
  {
    question: "Avez-vous des solutions pour les petites entreprises ?",
    answer: "Absolument ! Nous proposons des solutions adaptées à tous les types d'entreprises, des TPE aux grands groupes. Notre approche modulaire permet de commencer petit et d'étendre l'automatisation progressivement en fonction de vos besoins et de votre budget."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Questions Fréquentes
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Trouvez des réponses aux questions les plus courantes sur l'automatisation
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 text-indigo-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Vous avez d'autres questions ?
          </p>
          <motion.a
            href="#contact"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactez-nous
          </motion.a>
        </div>
      </div>
    </section>
  );
};
