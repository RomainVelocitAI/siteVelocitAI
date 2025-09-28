import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieBanner from '@/components/CookieBanner';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  // Suppression de la logique d'hydratation complexe qui cause des erreurs
  // Utilisation d'un rendu cohérent entre SSR et client

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
            <CookieBanner />
          </div>
        </CalculatorProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
