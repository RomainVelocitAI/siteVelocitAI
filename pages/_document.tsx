import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon optimisé */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        
        {/* PWA Meta */}
        <meta name="theme-color" content="#d500f9" />
        <meta name="msapplication-TileColor" content="#d500f9" />
      </Head>
      <body className="min-h-screen bg-light dark:bg-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
