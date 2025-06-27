import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp as FadeIn, FadeInSide, StaggerContainer, StaggerItem, ParallaxSection } from '../ui/animations';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Mots-clés rotatifs pour l'automatisation IA
const heroWords = [
  "Productivité",
  "Efficacité", 
  "Innovation",
  "Performance",
  "Croissance"
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

// Composant d'animation IA ultra stylisée
const AIAnimation = () => {
  return (
    <div className="relative w-full h-96 xl:h-[500px] flex items-center justify-center">
      {/* Cercle central avec gradient animé */}
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 shadow-2xl"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Effet de lueur */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 opacity-50 blur-xl animate-pulse" />
        
        {/* Centre avec logo ou icône IA */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            className="text-white text-2xl md:text-4xl font-bold tracking-wider"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            AI
          </motion.div>
        </div>
      </motion.div>

      {/* Anneaux orbitaux */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border-2 border-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-full"
          style={{
            width: `${200 + ring * 60}px`,
            height: `${200 + ring * 60}px`,
            borderImage: `linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3)) 1`
          }}
          animate={{
            rotate: ring % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 15 + ring * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Particules sur les anneaux */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              style={{
                top: `${i * 33.33}%`,
                left: "50%",
                transform: "translateX(-50%)"
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Réseau de connexions */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#networkGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3
            }}
          />
        ))}
      </svg>
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
                    Automatisez votre{' '}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        entreprise
                      </span>
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                    </span>
                    {' '}avec l'IA
                  </motion.h1>
                  <RotatingText />
                </FadeIn>
              </StaggerItem>
              
              <StaggerItem>
                <FadeIn delay={0.2}>
                  <motion.p 
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Libérez le potentiel de votre entreprise à La Réunion avec nos solutions d'automatisation intelligentes. 
                    Transformez vos processus, optimisez votre productivité et concentrez-vous sur ce qui compte vraiment.
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
                        🚀 Calculer mes gains
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
                        📞 Prendre RDV
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

          {/* Colonne de droite - Animation IA */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              <AIAnimation />
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
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </ParallaxSection>
  );
}