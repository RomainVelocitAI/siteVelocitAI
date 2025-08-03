import { useScroll, motionValue } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

/**
 * Hook sécurisé pour utiliser useScroll de Framer Motion avec SSR
 * Pour les cas simples où le composant peut gérer le montage lui-même
 */
export const useSafeScroll = (options?: Parameters<typeof useScroll>[0]) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Créer des MotionValues par défaut stables
  const defaultScrollInfo = useMemo(() => ({
    scrollY: motionValue(0),
    scrollYProgress: motionValue(0),
    scrollX: motionValue(0),
    scrollXProgress: motionValue(0)
  }), []);

  // Si pas monté, retourner les valeurs par défaut
  if (!mounted || typeof window === 'undefined') {
    return defaultScrollInfo;
  }

  // Sinon, utiliser le vrai hook
  // Note: Pour éviter l'erreur d'hydratation, le composant parent
  // doit gérer le montage et ne pas utiliser useScroll avant
  const scrollInfo = useScroll(options);
  return scrollInfo;
};