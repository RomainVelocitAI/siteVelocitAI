import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAnimationPreferences, getOptimizedAnimationConfig } from '@/hooks/useAnimationPreferences';

interface EnvelopeAnimationProps {
  isSubmitting: boolean;
  onAnimationComplete?: () => void;
}

export default function EnvelopeAnimation({ isSubmitting, onAnimationComplete }: EnvelopeAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'collect' | 'fold' | 'stamp' | 'fly' | 'complete'>('idle');
  const preferences = useAnimationPreferences();
  const config = getOptimizedAnimationConfig(preferences);

  useEffect(() => {
    if (isSubmitting && animationPhase === 'idle') {
      const baseTime = config.duration * 1000;
      
      if (preferences.prefersReducedMotion) {
        // Animation instantanée pour accessibility
        setAnimationPhase('complete');
        setTimeout(() => onAnimationComplete?.(), 300);
        return;
      }
      
      // Séquence d'animation adaptée à la performance
      setAnimationPhase('collect');
      
      setTimeout(() => setAnimationPhase('fold'), baseTime * 0.23);
      setTimeout(() => setAnimationPhase('stamp'), baseTime * 0.57);
      setTimeout(() => setAnimationPhase('fly'), baseTime * 0.74);
      setTimeout(() => {
        setAnimationPhase('complete');
        onAnimationComplete?.();
      }, baseTime * 0.91);
    } else if (!isSubmitting) {
      setAnimationPhase('idle');
    }
  }, [isSubmitting, animationPhase, onAnimationComplete, config.duration, preferences.prefersReducedMotion]);

  if (!isSubmitting) return null;

  // Fallback simple pour reduced motion
  if (preferences.prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-white px-8 py-4 rounded-lg shadow-2xl border border-gray-200 text-center reduced-motion-fallback">
          <div className="text-xl font-bold text-green-600 mb-2">
            📬 Votre demande est envoyée !
          </div>
          <div className="text-sm text-gray-600">
            Nous vous recontacterons rapidement
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-96 h-72 animation-container">
        
        {/* Formulaire qui se transforme en enveloppe */}
        <motion.div
          className={`absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-200 envelope-fold ${config.gpu ? 'gpu-accelerated' : ''}`}
          style={{ 
            transformStyle: preferences.isMobile ? 'flat' : 'preserve-3d',
            perspective: '1000px'
          }}
          initial={{ 
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0
          }}
          animate={
            animationPhase === 'collect' ? {
              scale: 0.9,
              transition: { duration: 0.8, ease: "easeInOut" }
            } :
            animationPhase === 'fold' ? {
              scale: 0.7,
              rotateX: [0, 15, 0],
              rotateY: [0, 5, 0],
              transition: { duration: 1.2, ease: "easeInOut" }
            } :
            animationPhase === 'stamp' ? {
              scale: 0.7,
              transition: { duration: 0.6 }
            } :
            animationPhase === 'fly' ? {
              scale: 0.3,
              x: 400,
              y: -200,
              rotateZ: 25,
              transition: { duration: 0.6, ease: "easeOut" }
            } : {}
          }
        >
          {/* Contenu du formulaire simplifié */}
          <div className="p-6 space-y-4">
            <div className="text-lg font-bold text-gray-800">Audit Stratégique</div>
            
            {/* Champs qui "flottent" pendant la collecte */}
            <motion.div
              className="space-y-3"
              animate={animationPhase === 'collect' ? {
                y: [-5, 5, 0],
                opacity: [1, 0.7, 1],
                transition: { duration: 0.8, ease: "easeInOut" }
              } : {}}
            >
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div className="h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300"></div>
            </motion.div>
          </div>

          {/* Coins qui se plient - Top Left */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 bg-white border-r border-b border-gray-300"
            style={{ 
              transformOrigin: 'bottom right',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)'
            }}
            animate={animationPhase === 'fold' ? {
              rotateZ: 135,
              transition: { duration: 0.3, delay: 0.2, ease: "easeOut" }
            } : {}}
          />

          {/* Top Right */}
          <motion.div
            className="absolute top-0 right-0 w-16 h-16 bg-white border-l border-b border-gray-300"
            style={{ 
              transformOrigin: 'bottom left',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
            }}
            animate={animationPhase === 'fold' ? {
              rotateZ: -135,
              transition: { duration: 0.3, delay: 0.4, ease: "easeOut" }
            } : {}}
          />

          {/* Bottom Left */}
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 bg-white border-r border-t border-gray-300"
            style={{ 
              transformOrigin: 'top right',
              clipPath: 'polygon(0 0, 0 100%, 100% 100%)'
            }}
            animate={animationPhase === 'fold' ? {
              rotateZ: -135,
              transition: { duration: 0.3, delay: 0.6, ease: "easeOut" }
            } : {}}
          />

          {/* Bottom Right */}
          <motion.div
            className="absolute bottom-0 right-0 w-16 h-16 bg-white border-l border-t border-gray-300"
            style={{ 
              transformOrigin: 'top left',
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
            }}
            animate={animationPhase === 'fold' ? {
              rotateZ: 135,
              transition: { duration: 0.3, delay: 0.8, ease: "easeOut" }
            } : {}}
          />
        </motion.div>

        {/* Timbre qui apparaît */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-16 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm shadow-lg border-2 border-white"
          initial={{ opacity: 0, scale: 0, rotateZ: -10 }}
          animate={animationPhase === 'stamp' ? {
            opacity: 1,
            scale: 1,
            rotateZ: -10,
            transition: { duration: 0.3, ease: "backOut" }
          } : {}}
        >
          {/* Design du timbre */}
          <div className="p-1 text-white text-xs text-center">
            <div className="text-[6px] font-bold">FRANCE</div>
            <div className="text-[8px] mt-1">✈️</div>
            <div className="text-[6px] mt-1">LETTRE</div>
          </div>
          
          {/* Bords dentelés */}
          <div className="absolute inset-0 border border-white border-dashed opacity-50 rounded-sm"></div>
        </motion.div>

        {/* Cachet postal */}
        <motion.div
          className="absolute top-8 left-4 w-16 h-16 rounded-full border-2 border-red-600 bg-red-50/80 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={animationPhase === 'stamp' ? {
            opacity: [0, 1, 0.8],
            scale: [0, 1.2, 1],
            transition: { duration: 0.4, delay: 0.2, ease: "backOut" }
          } : {}}
        >
          <div className="text-center text-red-600 text-xs font-bold">
            <div>LA RÉUNION</div>
            <div className="text-[8px]">ENVOYÉ</div>
            <div className="text-[8px]">{new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</div>
          </div>
        </motion.div>

        {/* Boîte aux lettres de destination */}
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-32"
          initial={{ opacity: 0, x: 100 }}
          animate={animationPhase === 'fly' ? {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          } : {}}
        >
          {/* Boîte aux lettres SVG */}
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className="text-blue-600">
            {/* Poteau */}
            <rect x="35" y="60" width="10" height="35" fill="currentColor" />
            
            {/* Boîte */}
            <rect x="10" y="20" width="60" height="45" rx="8" fill="currentColor" />
            
            {/* Porte */}
            <motion.rect
              x="15" y="30" width="50" height="25" rx="4" 
              fill="white" 
              stroke="currentColor" 
              strokeWidth="2"
              animate={animationPhase === 'fly' ? {
                rotateX: [-10, 0],
                transition: { duration: 0.2, delay: 0.2 }
              } : {}}
              style={{ transformOrigin: 'top center' }}
            />
            
            {/* Fente */}
            <rect x="20" y="25" width="40" height="2" fill="currentColor" />
            
            {/* Drapeau */}
            <motion.rect
              x="70" y="35" width="8" height="6" 
              fill="red"
              animate={animationPhase === 'fly' ? {
                rotateZ: [0, 20, 0],
                transition: { duration: 0.3, delay: 0.3 }
              } : {}}
              style={{ transformOrigin: 'left center' }}
            />
          </svg>
        </motion.div>

        {/* Particules qui accompagnent l'envol */}
        {config.particles > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none particle-container"
            animate={animationPhase === 'fly' ? {
              opacity: [0, 1, 0],
              transition: { duration: 0.6 }
            } : {}}
          >
            {[...Array(config.particles)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full energy-particle"
              style={{
                left: `${30 + i * 5}%`,
                top: `${40 + i * 2}%`,
              }}
              animate={animationPhase === 'fly' ? {
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [1, 0],
                scale: [1, 0],
                transition: { 
                  duration: 0.6, 
                  delay: i * 0.05,
                  ease: "easeOut" 
                }
              } : {}}
            />
          ))}
          </motion.div>
        )}

        {/* Message de confirmation */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={animationPhase === 'complete' ? {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          } : {}}
        >
          <div className="bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200">
            <div className="text-lg font-semibold text-green-600 mb-1">
              📬 Votre demande est envoyée !
            </div>
            <div className="text-sm text-gray-600">
              Nous vous recontacterons rapidement
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}