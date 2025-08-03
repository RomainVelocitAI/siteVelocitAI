import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClockIcon, 
  FaceSmileIcon, 
  FaceFrownIcon,
  CalendarDaysIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const comparisonData = [
  {
    category: "GESTION DES EMAILS",
    before: {
      title: "CHAOS QUOTIDIEN",
      value: "100+ EMAILS",
      description: "Noyé sous les spams",
      icon: XMarkIcon,
      color: "red"
    },
    after: {
      title: "INBOX ZERO",
      value: "100% TRIÉS",
      description: "IA filtre et répond",
      icon: CheckIcon,
      color: "green"
    }
  },
  {
    category: "ADMINISTRATION",
    before: {
      title: "PAPERASSE INFINIE",
      value: "2H/JOUR",
      description: "Saisie manuelle répétitive",
      icon: XMarkIcon,
      color: "red"
    },
    after: {
      title: "TOUT AUTOMATISÉ",
      value: "0H/JOUR",
      description: "Factures auto-générées",
      icon: CheckIcon,
      color: "green"
    }
  },
  {
    category: "SUIVI CLIENT",
    before: {
      title: "PROSPECTS PERDUS",
      value: "60% D'OUBLIS",
      description: "Pas de relance systématique",
      icon: XMarkIcon,
      color: "red"
    },
    after: {
      title: "RELANCE AUTO",
      value: "100% SUIVIS",
      description: "CRM intelligent 24/7",
      icon: CheckIcon,
      color: "green"
    }
  },
  {
    category: "TEMPS LIBRE",
    before: {
      title: "WEEK-END AU BUREAU",
      value: "70H/SEMAINE",
      description: "Burn-out garanti",
      icon: XMarkIcon,
      color: "red"
    },
    after: {
      title: "VIE ÉQUILIBRÉE",
      value: "35H/SEMAINE",
      description: "Famille et loisirs",
      icon: CheckIcon,
      color: "green"
    }
  }
];

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate comparison cards on scroll
      gsap.from('.comparison-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block mb-2">LA DIFFÉRENCE QUE</span>
            <span className="text-red-600">PERSONNE</span>{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NE VOUS MONTRE
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Glissez pour découvrir comment l'IA transforme votre quotidien d'entrepreneur
          </motion.p>
        </div>

        {/* Interactive Comparison Slider */}
        <div ref={comparisonRef} className="mb-16 max-w-6xl mx-auto">
          <div 
            className="relative h-[800px] md:h-[900px] rounded-2xl overflow-hidden cursor-ew-resize shadow-2xl border-8 border-gray-900"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* Left side - AVANT (La Galère) */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              <div className="p-6 md:p-10 h-full flex flex-col">
                {/* Effet sombre */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-3xl animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">
                  VOTRE QUOTIDIEN
                </h3>
                <h4 className="text-3xl md:text-5xl font-bold text-red-600 mb-6 animate-pulse">
                  SANS IA
                </h4>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
                    {comparisonData.map((item, index) => (
                      <div 
                        key={index}
                        className="comparison-card bg-gray-900 border-2 border-red-600 p-3 md:p-4 rounded-xl transform hover:scale-105 transition-transform"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <item.before.icon className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0" strokeWidth={3} />
                          <h5 className="font-bold text-white text-sm md:text-base">{item.category}</h5>
                        </div>
                        <div className="text-center mb-2">
                          <p className="text-xl md:text-2xl font-bold text-red-500 mb-1">{item.before.value}</p>
                          <p className="text-xs text-gray-400">{item.before.title}</p>
                        </div>
                        <p className="text-red-400 text-xs text-center font-medium">
                          {item.before.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-3xl md:text-4xl font-bold text-red-600 mb-2 animate-pulse">ÉPUISEMENT TOTAL</p>
                  <p className="text-gray-400 uppercase tracking-wider">
                    Vous survivez au lieu de vivre
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - APRÈS (La Liberté) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="p-6 md:p-10 h-full flex flex-col">
                {/* Effet brillant */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">
                  VOTRE NOUVEAU
                </h3>
                <h4 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>
                  QUOTIDIEN AVEC L'IA
                </h4>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
                    {comparisonData.map((item, index) => (
                      <div 
                        key={index}
                        className="comparison-card bg-white/20 backdrop-blur-md border-2 border-white p-3 md:p-4 rounded-xl transform hover:scale-105 transition-transform shadow-xl"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <item.after.icon className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" strokeWidth={3} />
                          <h5 className="font-bold text-white text-sm md:text-base">{item.category}</h5>
                        </div>
                        <div className="text-center mb-2">
                          <p className="text-xl md:text-2xl font-bold text-white mb-1">{item.after.value}</p>
                          <p className="text-xs text-white/80">{item.after.title}</p>
                        </div>
                        <p className="text-white/90 text-xs text-center font-medium">
                          {item.after.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                    LIBERTÉ RETROUVÉE
                  </p>
                  <p className="text-white/90 uppercase tracking-wider">
                    Enfin du temps pour ce qui compte vraiment
                  </p>
                </div>
              </div>
            </div>

            {/* Slider handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-900">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-900">
                  <path d="M8 9L5 12L8 15M16 9L19 12L16 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Final CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            STOP À LA SOUFFRANCE INUTILE
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chaque jour sans automatisation = du temps perdu avec votre famille
          </p>
          
          <motion.a
            href="#calculateur"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#calculateur')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <CalendarDaysIcon className="w-6 h-6" />
            Je veux récupérer ma vie
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
          
          <p className="mt-6 text-sm text-gray-500">
            Découvrez votre potentiel de temps libéré en 2 minutes
          </p>
        </motion.div>

      </div>
    </section>
  );
}