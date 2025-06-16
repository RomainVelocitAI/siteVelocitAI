import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import Seo from '@/components/seo/Seo';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Seo />
      
      {mounted && (
        <CalculatorProvider>
          <Header />
          <main className="pt-20">
            <Component {...pageProps} />
          </main>
          <Footer />
        </CalculatorProvider>
      )}
    </>
  );
}
