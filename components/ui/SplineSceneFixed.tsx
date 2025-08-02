'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import SplineWrapper from './SplineWrapper'

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

// Loading component with animation
const SplineLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl">
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  </div>
)

// Export the fixed component
export const SplineScene = ({ scene, className = '', onLoad }: SplineSceneProps) => {
  return (
    <Suspense fallback={<SplineLoader />}>
      <SplineWrapper 
        scene={scene} 
        className={className} 
        onLoad={onLoad}
      />
    </Suspense>
  )
}

export default SplineScene