import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Composant de chargement pendant l'hydratation
const HydrationLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-pulse">
      <div className="h-8 w-32 bg-purple-200 rounded mb-4"></div>
      <div className="h-4 w-48 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Petit délai pour assurer une hydratation correcte
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Rendu SSR-safe
  if (!isHydrated) {
    return <HydrationLoader />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CalculatorProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="relative z-10">
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </CalculatorProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
