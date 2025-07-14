import { useState, useEffect } from 'react';

interface AnimationPreferences {
  prefersReducedMotion: boolean;
  isMobile: boolean;
  supportsWebGL: boolean;
  performanceLevel: 'high' | 'medium' | 'low';
}

export function useAnimationPreferences(): AnimationPreferences {
  const [preferences, setPreferences] = useState<AnimationPreferences>({
    prefersReducedMotion: false,
    isMobile: false,
    supportsWebGL: false,
    performanceLevel: 'high',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Détection des préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Détection mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Détection WebGL
    let supportsWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      supportsWebGL = !!gl;
    } catch (e) {
      supportsWebGL = false;
    }

    // Estimation du niveau de performance
    let performanceLevel: 'high' | 'medium' | 'low' = 'high';
    
    // Facteurs de performance
    const memoryInfo = (navigator as any).deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    if (isMobile || prefersReducedMotion) {
      performanceLevel = 'low';
    } else if (memoryInfo && memoryInfo < 4) {
      performanceLevel = 'medium';
    } else if (hardwareConcurrency < 4) {
      performanceLevel = 'medium';
    }

    // Détection de la connexion lente
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === '2g' || connection.saveData)) {
      performanceLevel = 'low';
    }

    setPreferences({
      prefersReducedMotion,
      isMobile,
      supportsWebGL,
      performanceLevel,
    });

    // Écouter les changements de préférences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        performanceLevel: e.matches ? 'low' : prev.performanceLevel,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return preferences;
}

export function getOptimizedAnimationConfig(preferences: AnimationPreferences) {
  const { prefersReducedMotion, isMobile, performanceLevel } = preferences;

  if (prefersReducedMotion) {
    return {
      duration: 0.3,
      particles: 0,
      complexEffects: false,
      gpu: false,
    };
  }

  if (performanceLevel === 'low' || isMobile) {
    return {
      duration: 2,
      particles: 8,
      complexEffects: false,
      gpu: true,
    };
  }

  if (performanceLevel === 'medium') {
    return {
      duration: 3,
      particles: 16,
      complexEffects: true,
      gpu: true,
    };
  }

  // High performance
  return {
    duration: 3.5,
    particles: 24,
    complexEffects: true,
    gpu: true,
  };
}