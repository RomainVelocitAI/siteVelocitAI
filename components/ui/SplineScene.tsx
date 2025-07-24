'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <motion.div 
            className="relative w-32 h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo animé pendant le chargement */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-gray-900/90 dark:bg-gray-900/70 flex items-center justify-center">
              <motion.div
                className="text-white text-2xl font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
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
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400/30"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          <p className="absolute bottom-4 text-sm text-gray-400">Chargement de l'IA...</p>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}