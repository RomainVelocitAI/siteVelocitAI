import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem, ParallaxSection } from '../ui/animations';

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
    answer: "L'automatisation d'entreprise consiste à utiliser des technologies intelligentes pour automatiser les processus métier répétitifs et chronophages. Cela permet d'augmenter la productivité, de réduire les erreurs humaines et de libérer du temps pour des tâches à plus forte valeur ajoutée. Nos solutions s'intègrent parfaitement avec vos outils existants.",
    icon: 'AI'
  },
  {
    id: 2,
    question: "Combien de temps pour mettre en place une automatisation ?",
    answer: "Le temps de mise en place varie selon la complexité du projet. Pour des automatisations simples, nous pouvons avoir des résultats en 2-3 jours. Les projets plus complexes nécessitent généralement 2 à 6 semaines. Nous privilégions toujours une approche progressive pour des résultats rapides.",
    icon: '⚡'
  },
  {
    id: 3,
    question: "Quel est le retour sur investissement (ROI) ?",
    answer: "La plupart de nos clients constatent un retour sur investissement en moins de 30 jours grâce à la réduction drastique du temps passé sur les tâches répétitives. En moyenne, nos solutions permettent d'économiser 25h par semaine et d'augmenter la productivité de 300%. Le ROI moyen est de 400% la première année.",
    icon: '📊'
  },
  {
    id: 4,
    question: "Mes données sont-elles en sécurité ?",
    answer: "Absolument. La sécurité est notre priorité. Nous utilisons des protocoles de chiffrement de niveau bancaire, des solutions hébergées en Europe conformes au RGPD, et des sauvegardes automatiques. Vos données restent toujours sous votre contrôle et ne sont jamais partagées avec des tiers.",
    icon: '🛡️'
  },
  {
    id: 5,
    question: "Avez-vous des solutions pour petites entreprises ?",
    answer: "Bien sûr ! Nous sommes spécialisés dans l'accompagnement des TPE et PME. Nos solutions sont modulaires et évolutives, s'adaptant parfaitement à votre budget et à vos besoins. Nous proposons des formules sur mesure, des paiements échelonnés et un accompagnement personnalisé pour chaque entreprise.",
    icon: '🏢'
  },
  {
    id: 6,
    question: "Que se passe-t-il si j'ai besoin d'aide après la mise en place ?",
    answer: "Chaque projet inclut 3 mois de support technique gratuit. Nous proposons également de la formation pour votre équipe, une documentation complète et un accès à notre équipe d'experts. Notre objectif est de vous rendre autonome tout en restant disponible quand vous en avez besoin.",
    icon: '🎯'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-white via-purple-50/20 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/20 overflow-hidden"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-label="Questions fréquemment posées"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
                Questions{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Fréquentes
                </span>
              </motion.h2>
              <motion.div
                className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-8"
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
                Trouvez rapidement les réponses à vos questions sur l'automatisation d'entreprise.
                <br className="hidden md:block" />
                Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale.
              </p>
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Info */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <QuestionMarkCircleIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nous sommes là pour vous
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Nos experts en automatisation répondent à toutes vos questions et vous accompagnent 
                dans votre projet de transformation digitale.
              </p>
              
              <motion.a 
                href="#contact" 
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5" />
                  Poser une question
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - FAQ */}
          <motion.div 
            className="lg:col-span-8 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openIndex === index 
                      ? 'border-purple-300 dark:border-purple-600/50 shadow-lg ring-1 ring-purple-200 dark:ring-purple-600/30' 
                      : 'border-gray-200/50 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-600/30 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {/* Question */}
                  <motion.div 
                    className="p-6 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleFaq(index)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          openIndex === index 
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20'
                        }`}
                      >
                        <span className="text-sm font-bold">{faq.icon}</span>
                      </div>
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                        openIndex === index 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-colors duration-300 ${
                        openIndex === index 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                      }`}
                    >
                      <ChevronDownIcon className="w-6 h-6" />
                    </motion.div>
                  </motion.div>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: "easeOut",
                          opacity: { duration: 0.25 }
                        }}
                        className="overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="p-6 pt-4">
                          <motion.p 
                            className="text-gray-600 dark:text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gradient border effect */}
                  {openIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-20 blur-sm rounded-2xl -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Notre équipe d'experts est disponible pour répondre à toutes vos questions personnalisées.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <QuestionMarkCircleIcon className="h-5 w-5" />
              Contactez-nous maintenant
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
