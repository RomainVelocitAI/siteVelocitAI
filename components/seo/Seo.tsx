import Head from 'next/head';
import { useRouter } from 'next/router';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

export default function Seo({
  title = 'VelocitAI | Automatisation d\'entreprise à La Réunion',
  description = 'Automatisez vos tâches répétitives et créez des chatbots intelligents pour votre entreprise à La Réunion. Gagnez du temps et augmentez votre productivité.',
  image = 'https://velocit-ai.fr/images/og/velocitai-og.jpg',
  article = false,
}: SeoProps) {
  const router = useRouter();
  const url = `https://velocit-ai.fr${router.asPath}`;
  const siteName = 'VelocitAI';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="automatisation, entreprise, productivité, solutions business, optimisation" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
