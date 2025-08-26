import { useEffect, useState, PropsWithChildren } from 'react';

interface SafeHydrateProps {
  fallback?: React.ReactNode;
  delay?: number;
}

/**
 * Composant pour gérer l'hydratation en toute sécurité
 * Évite les erreurs d'hydratation et les erreurs 500
 */
export default function SafeHydrate({ 
  children, 
  fallback = null,
  delay = 0 
}: PropsWithChildren<SafeHydrateProps>) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Utiliser requestIdleCallback si disponible, sinon setTimeout
    const hydrate = () => setIsHydrated(true);
    
    if (delay > 0) {
      const timer = setTimeout(hydrate, delay);
      return () => clearTimeout(timer);
    }
    
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(hydrate);
      return () => cancelIdleCallback(id);
    }
    
    // Fallback avec requestAnimationFrame
    const frame = requestAnimationFrame(hydrate);
    return () => cancelAnimationFrame(frame);
  }, [delay]);

  // Pendant le SSR, toujours retourner les enfants
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // Côté client, attendre l'hydratation
  return isHydrated ? <>{children}</> : <>{fallback}</>;
}