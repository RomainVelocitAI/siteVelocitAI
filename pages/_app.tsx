import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CalculatorProvider } from '@/contexts/CalculatorContext';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Agence d'Automatisation</title>
        <meta name="description" content="Votre partenaire en solutions d'automatisation sur mesure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
