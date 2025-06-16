import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp as FadeIn, FadeInSide, StaggerContainer, StaggerItem, ParallaxSection } from '../ui/animations';
import { useEffect, useState } from 'react';

// Liste des mots et de leurs images correspondantes
const heroContent = [
  { 
    word: "Productivité",
    image: "/images/productivité.png"
  },
  { 
    word: "Efficacité",
    image: "/images/efficacite.png"
  },
  { 
    word: "Croissance",
    image: "/images/croissance.png"
  },
  { 
    word: "Innovation",
    image: "/images/innovation.png"
  },
  { 
    word: "Performance",
    image: "/images/performance.png"
  }
];

// Composant de texte et d'image défilants synchronisés
const RotatingContent = ({ 
  currentIndex, 
  setCurrentIndex 
}: { 
  currentIndex: number; 
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>> 
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % heroContent.length);
    }, 3000); // Changement toutes les 3 secondes

    return () => clearInterval(interval);
  }, [setCurrentIndex]);

  const currentContent = heroContent[currentIndex];

  return (
    <div className="relative h-16 md:h-20 mt-2 mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={`word-${currentIndex}`}
          className="absolute left-0 right-0 text-purple-600 font-bold text-4xl md:text-5xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentContent.word}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function HeroSection() {
  // Déplacer l'état currentIndex au niveau du composant parent pour le partager
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ParallaxSection speed={0.3} className="bg-gradient-to-br from-purple-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Colonne de gauche - Contenu */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <StaggerContainer className="text-center lg:text-left">
              <StaggerItem>
                <FadeIn delay={0.1}>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Automatisez votre entreprise à La Réunion
                  </h1>
                  <RotatingContent currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                </FadeIn>
              </StaggerItem>
              
              <StaggerItem>
                <FadeIn delay={0.2}>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                    Gagnez du temps et augmentez votre productivité avec nos solutions d'automatisation sur mesure.
                    Libérez-vous des tâches répétitives et concentrez-vous sur l'essentiel.
                  </p>
                </FadeIn>
              </StaggerItem>
              
              <StaggerItem>
                <FadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.a 
                      href="#calculateur"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Calculer mes gains
                    </motion.a>
                    <motion.a 
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Prendre RDV
                    </motion.a>
                  </div>
                </FadeIn>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Colonne de droite - Image (uniquement sur desktop) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative h-96 xl:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${currentIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={heroContent[currentIndex].image}
                  alt={heroContent[currentIndex].word}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image sur mobile */}
          <div className="lg:hidden relative w-full h-64 mt-8">
            <Image
              src="/Color logo - no background.png"
              alt="Velocit.AI"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Éléments décoratifs animés */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Bulles décoratives animées avec parallaxe */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 opacity-30"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(20px)'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 200 - 100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 40,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Éléments flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </ParallaxSection>
  );
}
