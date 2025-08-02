'use client'

import React from 'react'
import { SplineScene } from './SplineScene'
import { motion } from 'framer-motion'

export function SplineHeroAnimation() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 via-purple-900/20 to-blue-900/20 backdrop-blur-sm">
      
      {/* Bordure avec gradient animé */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #8B5CF6)',
          backgroundSize: '200% 100%',
          padding: '1px',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full rounded-3xl bg-gray-900/90 dark:bg-gray-950/90" />
      </motion.div>
      
      {/* Scène 3D plein écran */}
      <div className="absolute inset-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
        
        {/* Overlay gradient subtil pour intégration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-900/50 to-transparent" />
        </div>
      </div>

      {/* Particules flottantes pour ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}