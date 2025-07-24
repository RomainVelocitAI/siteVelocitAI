'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SplineWrapperProps {
  scene: string
  className?: string
  onLoad?: () => void
}

export default function SplineWrapper({ scene, className = '', onLoad }: SplineWrapperProps) {
  const [SplineComponent, setSplineComponent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Dynamically import Spline only on client side
    const loadSpline = async () => {
      try {
        const SplineModule = await import('@splinetool/react-spline')
        setSplineComponent(() => SplineModule.default)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load Spline:', err)
        setError('Failed to load 3D scene')
        setIsLoading(false)
      }
    }

    loadSpline()
  }, [])

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl`}>
        <p className="text-gray-500">3D scene unavailable</p>
      </div>
    )
  }

  if (isLoading || !SplineComponent) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl`}>
        <motion.div
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <SplineComponent
      scene={scene}
      className={className}
      onLoad={onLoad}
    />
  )
}