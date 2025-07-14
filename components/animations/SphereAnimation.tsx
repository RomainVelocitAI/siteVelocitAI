import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAnimationPreferences, getOptimizedAnimationConfig } from '@/hooks/useAnimationPreferences';

interface SphereAnimationProps {
  isSubmitting: boolean;
  onAnimationComplete?: () => void;
}

export default function SphereAnimation({ isSubmitting, onAnimationComplete }: SphereAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'attract' | 'compress' | 'pulse' | 'explode' | 'complete'>('idle');
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
      setAnimationPhase('attract');
      
      setTimeout(() => setAnimationPhase('compress'), baseTime * 0.29);
      setTimeout(() => setAnimationPhase('pulse'), baseTime * 0.51);
      setTimeout(() => setAnimationPhase('explode'), baseTime * 0.71);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white px-8 py-4 rounded-lg shadow-2xl border border-gray-200 text-center reduced-motion-fallback">
          <div className="text-xl font-bold text-green-600 mb-2">
            ⚡ Votre demande est envoyée !
          </div>
          <div className="text-sm text-gray-600">
            Énergie transmise avec succès
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-96 h-72 animation-container">
        
        {/* Conteneur principal du formulaire */}
        <motion.div
          className="absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          initial={{ scale: 1, opacity: 1 }}
          animate={
            animationPhase === 'attract' ? {
              scale: 0.95,
              transition: { duration: 0.8, ease: "easeInOut" }
            } :
            animationPhase === 'compress' ? {
              scale: 0.1,
              borderRadius: '50%',
              transition: { duration: 0.6, ease: "easeIn" }
            } :
            animationPhase === 'pulse' || animationPhase === 'explode' ? {
              scale: 0.1,
              borderRadius: '50%',
              opacity: 0,
              transition: { duration: 0.2 }
            } : {}
          }
        >
          {/* Contenu du formulaire */}
          <div className="p-6 space-y-4">
            <div className="text-lg font-bold text-gray-800">Audit Stratégique</div>
            
            {/* Éléments qui convergent vers le centre */}
            <motion.div
              className="space-y-3"
              animate={animationPhase === 'attract' ? {
                scale: 0.8,
                opacity: 0.7,
                transition: { duration: 0.8, ease: "easeInOut" }
              } : {}}
            >
              {/* Champs du formulaire stylisés */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-3 bg-gradient-to-r ${
                    i % 2 === 0 ? 'from-purple-200 to-blue-200' : 'from-blue-200 to-purple-200'
                  } rounded`}
                  style={{ width: `${100 - i * 15}%` }}
                  animate={animationPhase === 'attract' ? {
                    x: [0, (200 - i * 50), 0],
                    y: [0, (100 - i * 25), 0],
                    opacity: [1, 0.5, 0.3],
                    transition: { 
                      duration: 0.8, 
                      ease: "easeInOut",
                      delay: i * 0.1 
                    }
                  } : {}}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Sphère énergétique */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 energy-sphere ${config.gpu ? 'gpu-accelerated' : ''}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            animationPhase === 'compress' ? {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            } :
            animationPhase === 'pulse' ? {
              scale: [1, 1.3, 1, 1.5, 1, 1.8, 1],
              opacity: [1, 0.8, 1, 0.6, 1, 0.4, 1],
              transition: { 
                duration: 0.6, 
                ease: "easeInOut",
                times: [0, 0.15, 0.3, 0.45, 0.6, 0.85, 1]
              }
            } :
            animationPhase === 'explode' ? {
              scale: 3,
              opacity: 0,
              transition: { duration: 0.4, ease: "easeOut" }
            } : {}
          }
        >
          {/* Sphère principale avec gradient énergétique */}
          <div className="relative">
            <div 
              className={`w-16 h-16 rounded-full shadow-2xl ${
                config.complexEffects ? 'radial-energy energy-glow' : 'bg-purple-500'
              }`}
              style={config.complexEffects ? {
                background: 'radial-gradient(circle at 30% 30%, #60a5fa, #8b5cf6, #7c3aed)',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
              } : {}}
            />
            
            {/* Anneaux énergétiques */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-300/50"
                style={{
                  width: `${64 + i * 20}px`,
                  height: `${64 + i * 20}px`,
                }}
                animate={animationPhase === 'pulse' ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0, 0.6],
                  transition: { 
                    duration: 0.6, 
                    repeat: 2,
                    delay: i * 0.1,
                    ease: "easeOut" 
                  }
                } : {}}
              />
            ))}

            {/* Particules orbitales */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                }}
                animate={animationPhase === 'compress' || animationPhase === 'pulse' ? {
                  x: [
                    Math.cos(i * 60 * Math.PI / 180) * 40,
                    Math.cos((i * 60 + 180) * Math.PI / 180) * 40
                  ],
                  y: [
                    Math.sin(i * 60 * Math.PI / 180) * 40,
                    Math.sin((i * 60 + 180) * Math.PI / 180) * 40
                  ],
                  opacity: [1, 0.5, 1],
                  scale: [1, 0.5, 1],
                  transition: { 
                    duration: 1.2, 
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1
                  }
                } : {}}
              />
            ))}
          </div>
        </motion.div>

        {/* Explosion de particules */}
        {config.particles > 0 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 particle-container"
            animate={animationPhase === 'explode' ? {
              opacity: [0, 1, 0],
              transition: { duration: 0.8 }
            } : {}}
          >
            {[...Array(config.particles)].map((_, i) => {
            const angle = (i * 15) * Math.PI / 180;
            const distance = 150 + Math.random() * 100;
            const size = 3 + Math.random() * 4;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#d97706',
                  width: `${size}px`,
                  height: `${size}px`,
                  top: '50%',
                  left: '50%',
                  marginTop: `-${size/2}px`,
                  marginLeft: `-${size/2}px`,
                }}
                animate={animationPhase === 'explode' ? {
                  x: [0, Math.cos(angle) * distance],
                  y: [0, Math.sin(angle) * distance],
                  opacity: [1, 0.8, 0],
                  scale: [1, 1.5, 0],
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: i * 0.02
                  }
                } : {}}
              />
            );
          })}
          </motion.div>
        )}

        {/* Onde de choc */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-yellow-400/60"
          initial={{ scale: 0, opacity: 0 }}
          animate={animationPhase === 'explode' ? {
            scale: [0, 6],
            opacity: [0.8, 0],
            transition: { duration: 0.6, ease: "easeOut" }
          } : {}}
          style={{ width: '80px', height: '80px' }}
        />

        {/* Message de confirmation qui cristallise */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={animationPhase === 'complete' ? {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "backOut" }
          } : {}}
        >
          <div className="bg-white px-8 py-4 rounded-lg shadow-2xl border border-gray-200 text-center relative overflow-hidden">
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={animationPhase === 'complete' ? {
                x: '100%',
                transition: { duration: 0.6, delay: 0.2 }
              } : {}}
            />
            
            <div className="relative z-10">
              <div className="text-xl font-bold text-green-600 mb-2">
                ⚡ Votre demande est envoyée !
              </div>
              <div className="text-sm text-gray-600">
                Énergie transmise avec succès
              </div>
            </div>
          </div>
        </motion.div>

        {/* Particules de cristallisation pour le message */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={animationPhase === 'complete' ? {
            opacity: [0, 1, 0],
            transition: { duration: 0.8 }
          } : {}}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                top: `${-20 + Math.random() * 40}px`,
                left: `${-20 + Math.random() * 40}px`,
              }}
              animate={animationPhase === 'complete' ? {
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                y: [Math.random() * 40 - 20, 0],
                x: [Math.random() * 40 - 20, 0],
                transition: { 
                  duration: 0.6, 
                  delay: i * 0.05,
                  ease: "easeOut" 
                }
              } : {}}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}