import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import NeonCursor from '@/components/ui/NeonCursor';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <ThemeProvider>
          <CalculatorProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <NeonCursor />
              <Header />
              <main className="relative z-10">
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>
          </CalculatorProvider>
        </ThemeProvider>
      )}
    </>
  );
}
