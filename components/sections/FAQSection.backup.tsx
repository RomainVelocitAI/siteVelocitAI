import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Qu'est-ce que l'automatisation d'entreprise ?",
    answer: "L'automatisation d'entreprise consiste à utiliser des technologies pour automatiser les processus métier répétitifs et chronophages. Cela permet d'augmenter la productivité, de réduire les erreurs et de libérer du temps pour des tâches à plus forte valeur ajoutée.",
    icon: '🤖'
  },
  {
    id: 2,
    question: "Combien de temps pour mettre en place une automatisation ?",
    answer: "Le temps de mise en place varie selon la complexité. Certaines solutions sont opérationnelles en quelques jours, tandis que des projets plus complexes peuvent prendre plusieurs semaines.",
    icon: '⏱️'
  },
  {
    id: 3,
    question: "Quel est le retour sur investissement (ROI) ?",
    answer: "La plupart de nos clients constatent un retour sur investissement en moins de 6 mois grâce à la réduction du temps passé sur les tâches répétitives et à l'augmentation de la productivité.",
    icon: '📈'
  },
  {
    id: 4,
    question: "Mes données sont-elles en sécurité ?",
    answer: "Absolument. Nous utilisons des protocoles de chiffrement avancés et des solutions hébergées en Europe conformes au RGPD pour assurer la sécurité de vos données.",
    icon: '🔒'
  },
  {
    id: 5,
    question: "Solutions pour petites entreprises ?",
    answer: "Bien sûr ! Nous proposons des solutions adaptées à tous, des TPE aux grands groupes, avec une approche modulaire qui s'adapte à vos besoins et votre budget.",
    icon: '🏢'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-gradient-to-br from-purple-600/5 to-indigo-600/10 -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-600/10 to-transparent -z-10"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Questions Fréquentes
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment l'automatisation peut transformer votre entreprise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Tout savoir sur nos solutions
            </h3>
            <p className="text-gray-600">
              Nous avons rassemblé les questions les plus fréquemment posées par nos clients. 
              Si vous ne trouvez pas de réponse à votre question, n'hésitez pas à nous contacter.
            </p>
            <div className="mt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Poser une question
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="relative group overflow-hidden"
                initial={false}
                animate={openIndex === index ? 'open' : 'collapsed'}
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 'auto' }
                }}
              >
                <motion.div 
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 flex items-start ${openIndex === index ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600' : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
                  onClick={() => toggleFaq(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${openIndex === index ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                    <span className="text-lg">{faq.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 flex justify-between items-center">
                      {faq.question}
                      {openIndex === index ? (
                        <ChevronUpIcon className="w-5 h-5 text-purple-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      )}
                    </h3>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2"
                        >
                          <p className="text-gray-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
