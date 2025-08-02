import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp as FadeIn, FadeInSide, StaggerContainer, StaggerItem, ParallaxSection } from '../ui/animations';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import VaporizeTextCycle, { Tag } from '../ui/VaporizeTextEffect';

// Bénéfices business rotatifs - focus transformation
const heroWords = [
  "Performance",
  "Autonomie",
  "Efficacité", 
  "Croissance",
  "Excellence"
];

// Composant de texte rotatif stylisé
const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % heroWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 md:h-20 mt-2 mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="absolute left-0 right-0 text-center lg:text-left font-bold text-4xl md:text-5xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: -90 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          {heroWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};


export default function HeroSection() {
  const { isDark } = useTheme();

  return (
    <ParallaxSection speed={0.3} className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Colonne de gauche - Contenu */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <StaggerContainer className="text-center lg:text-left">
              <StaggerItem>
                <FadeIn delay={0.1}>
                  <motion.h1 
                    className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      Écosystème d'Agents IA
                    </span>
                    <br className="hidden md:block" />
                    <span className="inline-block">pour Diriger avec</span>
                  </motion.h1>
                </FadeIn>
              </StaggerItem>
              
              <StaggerItem>
                <RotatingText />
              </StaggerItem>
              
              <StaggerItem>
                <FadeIn delay={0.2}>
                  <motion.p 
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Nos agents IA spécialisés libèrent 25h par semaine à votre équipe et font tourner votre entreprise 24h/24. 
                    Votre business devient autonome, vos processus s'optimisent en continu, vos équipes se concentrent sur la valeur ajoutée.
                  </motion.p>
                </FadeIn>
              </StaggerItem>
              
              <StaggerItem>
                <FadeIn delay={0.3}>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <motion.a 
                      href="#calculateur"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl group"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#calculateur')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        📊 Calculer mon ROI et gains de temps
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                    <motion.a 
                      href="#contact"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:text-white px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl group overflow-hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        🎯 Diagnostic gratuit personnalisé
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>
                </FadeIn>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Colonne de droite - Effet Vaporize */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] md:h-[500px] lg:h-[600px]">
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              {/* Phrase statique avec design percutant */}
              <motion.div
                className="relative mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {/* Effet de glow en arrière-plan */}
                <div className="absolute inset-0 blur-2xl opacity-50">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-full" />
                </div>
                
                {/* Texte principal avec gradient animé */}
                <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Nous faisons disparaître
                  </motion.span>
                  <motion.span
                    className="inline-block ml-2 text-gray-900 dark:text-white"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    :
                  </motion.span>
                </h2>
                
                {/* Lignes décoratives animées */}
                <motion.div
                  className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-600"
                  animate={{
                    scaleX: [0, 1],
                    opacity: [0, 1],
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-gradient-to-l from-transparent to-cyan-500"
                  animate={{
                    scaleX: [0, 1],
                    opacity: [0, 1],
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              {/* Texte qui s'évapore avec animation améliorée */}
              <motion.div 
                className="w-full h-32 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                {/* Particules flottantes subtiles autour du texte */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-500/20"
                    style={{
                      width: 4 + Math.random() * 4,
                      height: 4 + Math.random() * 4,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: (3 + Math.random() * 2) / 2,  // Divisé par 2 pour accélérer x2
                      repeat: Infinity,
                      delay: Math.random() * 1,  // Délai aussi divisé par 2
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                <VaporizeTextCycle
                  key="vaporize-effect"
                  texts={["Les erreurs", "Les tâches récurrentes", "La charge mentale", "Les limites"]}
                  font={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "45px",
                    fontWeight: 800
                  }}
                  color="rgb(147, 51, 234)" // Purple color matching VelocitAI
                  spread={6}
                  density={8}
                  animation={{
                    vaporizeDuration: 1.5,  // Vaporisation rapide
                    fadeInDuration: 0.5,    // Apparition rapide
                    waitDuration: 1         // Courte pause
                  }}
                  direction="left-to-right"
                  alignment="center"
                  tag={Tag.H2}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Gradient de fondu en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
      
      {/* Arrière-plan animé amélioré */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mesh gradient animé */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Particules flottantes améliorées */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`enhanced-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(147, 51, 234, ${Math.random() * 0.5 + 0.2}), rgba(6, 182, 212, ${Math.random() * 0.5 + 0.2}))`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: (10 + Math.random() * 10) / 2,  // Divisé par 2 pour accélérer x2
              repeat: Infinity,
              delay: Math.random() * 2.5,  // Délai aussi divisé par 2
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </ParallaxSection>
  );
}