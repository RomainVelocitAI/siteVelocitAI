import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClockIcon, 
  FaceSmileIcon, 
  FaceFrownIcon,
  CalendarDaysIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';

const beforeDay = {
  title: "AVANT : La Journée Galère",
  subtitle: "Vous vous reconnaissez ?",
  mood: "😤",
  timeSlots: [
    {
      time: "07h00",
      activity: "Réveil avec l'angoisse des emails",
      stress: "high",
      description: "50 emails non lus + 3 urgences"
    },
    {
      time: "08h30",
      activity: "Saisie factures en retard",
      stress: "high", 
      description: "2h perdues sur de la paperasse"
    },
    {
      time: "11h00",
      activity: "Réunion annulée (client pas rappelé)",
      stress: "high",
      description: "Prospect perdu faute de suivi"
    },
    {
      time: "14h00",
      activity: "Recherche d'infos dans 10 logiciels",
      stress: "medium",
      description: "Impossible de retrouver les données"
    },
    {
      time: "17h00",
      activity: "Rattrapage des vraies urgences",
      stress: "high",
      description: "Le business passe après l'admin"
    },
    {
      time: "20h00",
      activity: "Travail à la maison (encore)",
      stress: "high", 
      description: "Les enfants se couchent sans papa"
    },
    {
      time: "22h30",
      activity: "Endormissement difficile",
      stress: "high",
      description: "Demain sera pareil..."
    }
  ]
};

const afterDay = {
  title: "APRÈS : La Journée Libérée",
  subtitle: "Votre nouvelle vie",
  mood: "😎",
  timeSlots: [
    {
      time: "07h30",
      activity: "Réveil tranquille",
      stress: "low",
      description: "L'IA a tout géré pendant la nuit"
    },
    {
      time: "09h00", 
      activity: "Focus sur les vrais enjeux",
      stress: "low",
      description: "Stratégie, développement, vision"
    },
    {
      time: "11h00",
      activity: "RDV avec prospect qualifié",
      stress: "low", 
      description: "Le chatbot a fait le tri"
    },
    {
      time: "14h00",
      activity: "Déjeuner d'affaires détendu",
      stress: "low",
      description: "Plus de stress admin"
    },
    {
      time: "16h00",
      activity: "Analyse des rapports auto-générés",
      stress: "low",
      description: "Vision claire en 5 minutes"
    },
    {
      time: "18h00",
      activity: "Fermeture du bureau",
      stress: "low",
      description: "L'entreprise tourne sans vous"
    },
    {
      time: "19h30",
      activity: "Dîner en famille",
      stress: "low",
      description: "Enfin présent pour vos proches"
    }
  ]
};

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const currentDay = activeTab === 'before' ? beforeDay : afterDay;

  const getStressColor = (stress: string) => {
    switch (stress) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500'; 
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStressText = (stress: string) => {
    switch (stress) {
      case 'high': return 'Stress élevé';
      case 'medium': return 'Stress moyen';
      case 'low': return 'Détendu';
      default: return '';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6">
              La{' '}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Vérité Brutale
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Voici à quoi ressemble vraiment votre journée... avant et après l'automatisation IA
            </p>
          </FadeInUp>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 p-2 rounded-2xl backdrop-blur-sm border border-gray-700/50">
            <motion.button
              onClick={() => setActiveTab('before')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'before' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                <FaceFrownIcon className="h-5 w-5" />
                AVANT (La Galère)
              </span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('after')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'after' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                <FaceSmileIcon className="h-5 w-5" />
                APRÈS (La Liberté)
              </span>
            </motion.button>
          </div>
        </div>

        {/* Day Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            
            {/* Day Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{currentDay.mood}</div>
              <h3 className="text-3xl font-bold mb-2">{currentDay.title}</h3>
              <p className="text-lg text-gray-300">{currentDay.subtitle}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {currentDay.timeSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
                >
                  
                  {/* Time */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-sm">
                      {slot.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold">{slot.activity}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStressColor(slot.stress)}`}></div>
                        <span className="text-sm text-gray-400">{getStressText(slot.stress)}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{slot.description}</p>
                  </div>

                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {activeTab === 'before' ? (
                <motion.button
                  onClick={() => setActiveTab('after')}
                  className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Voir la solution</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>
              ) : (
                <motion.a
                  href="#calculateur"
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#calculateur')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span>Je veux cette vie</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.a>
              )}
            </motion.div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}