import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import RelatedArticles from '@/components/blog/RelatedArticles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// Types
interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
  featured: boolean;
  content: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

interface BlogPostPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, allPosts }) => {
  const { isDark } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://velocit-ai.fr/blog/${post.slug}`;
  const shareText = `${post.title} - ${post.description}`;

  const handleShare = async (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Lien copié dans le presse-papiers !');
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <Head>
        <title>{post.seo.metaTitle}</title>
        <meta name="description" content={post.seo.metaDescription} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        {post.image && <meta property="og:image" content={`https://velocit-ai.fr${post.image}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {post.image && <meta name="twitter:image" content={`https://velocit-ai.fr${post.image}`} />}
        <link rel="canonical" href={post.seo.canonicalUrl || shareUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "image": post.image ? `https://velocit-ai.fr${post.image}` : undefined,
              "author": {
                "@type": "Organization",
                "name": post.author,
                "url": "https://velocit-ai.fr"
              },
              "publisher": {
                "@type": "Organization",
                "name": "VelocitAI",
                "url": "https://velocit-ai.fr",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://velocit-ai.fr/favicon.ico"
                }
              },
              "datePublished": post.date,
              "dateModified": post.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": shareUrl
              },
              "keywords": post.tags.join(', '),
              "articleSection": post.category,
              "wordCount": post.content.split(' ').length,
              "timeRequired": `PT${post.readTime}M`
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumbs Navigation */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Breadcrumbs
                items={[
                  { name: 'Accueil', href: '/' },
                  { name: 'Blog', href: '/blog' },
                  { name: post.title, current: true }
                ]}
              />
              <Link 
                href="/blog"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Retour au blog
              </Link>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime} min de lecture</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Partager :</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Partager sur Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Partager sur LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Partager sur Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Copier le lien"
                >
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              '--tw-prose-body': isDark ? '#d1d5db' : '#374151',
              '--tw-prose-headings': isDark ? '#f9fafb' : '#111827',
              '--tw-prose-lead': isDark ? '#9ca3af' : '#6b7280',
              '--tw-prose-links': isDark ? '#8b5cf6' : '#7c3aed',
              '--tw-prose-bold': isDark ? '#f9fafb' : '#111827',
              '--tw-prose-counters': isDark ? '#9ca3af' : '#6b7280',
              '--tw-prose-bullets': isDark ? '#4b5563' : '#d1d5db',
              '--tw-prose-hr': isDark ? '#374151' : '#e5e7eb',
              '--tw-prose-quotes': isDark ? '#f9fafb' : '#111827',
              '--tw-prose-quote-borders': isDark ? '#374151' : '#e5e7eb',
              '--tw-prose-captions': isDark ? '#9ca3af' : '#6b7280',
              '--tw-prose-code': isDark ? '#f9fafb' : '#111827',
              '--tw-prose-pre-code': isDark ? '#d1d5db' : '#374151',
              '--tw-prose-pre-bg': isDark ? '#1f2937' : '#f9fafb',
              '--tw-prose-th-borders': isDark ? '#374151' : '#d1d5db',
              '--tw-prose-td-borders': isDark ? '#2d3748' : '#e5e7eb',
            } as React.CSSProperties}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 p-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-2xl text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Prêt à Automatiser Votre Entreprise ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Découvrez comment VelocitAI peut transformer votre productivité avec un audit gratuit personnalisé.
            </p>
            <motion.a
              href="/#contact"
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Demander un Audit Gratuit
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Related Articles */}
          <RelatedArticles currentPost={post} allPosts={allPosts} />
        </article>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Lire tous les fichiers markdown du dossier content/blog
  const contentDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(contentDirectory);
  
  const paths = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => ({
      params: { slug: filename.replace('.md', '') }
    }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  try {
    const contentDirectory = path.join(process.cwd(), 'content/blog');
    
    // Lire le fichier markdown du post courant
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parser le front matter et le contenu
    const { data, content } = matter(fileContents);
    
    // Convertir le markdown en HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();
    
    // Lire tous les autres posts pour les articles recommandés
    const filenames = fs.readdirSync(contentDirectory);
    const allPosts: BlogPost[] = [];
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        const otherFilePath = path.join(contentDirectory, filename);
        const otherFileContents = fs.readFileSync(otherFilePath, 'utf8');
        const { data: otherData } = matter(otherFileContents);
        
        allPosts.push({
          title: otherData.title,
          description: otherData.description || otherData.excerpt || '',
          slug: filename.replace('.md', ''),
          date: otherData.date,
          author: otherData.author,
          category: otherData.category,
          tags: otherData.tags || [],
          image: otherData.image || null,
          readTime: otherData.readingTime || otherData.readTime || 10,
          featured: otherData.featured || false,
          content: '', // Pas besoin du contenu pour les articles recommandés
          seo: {
            metaTitle: otherData.seoTitle || otherData.title,
            metaDescription: otherData.seoDescription || otherData.description || otherData.excerpt || '',
            keywords: otherData.keywords || otherData.tags || [],
            ...(otherData.canonicalUrl && { canonicalUrl: otherData.canonicalUrl })
          }
        });
      }
    }
    
    const post: BlogPost = {
      title: data.title,
      description: data.description || data.excerpt || '',
      slug: slug,
      date: data.date,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      image: data.image || null,
      readTime: data.readingTime || data.readTime || 10,
      featured: data.featured || false,
      content: contentHtml,
      seo: {
        metaTitle: data.seo?.metaTitle || data.seoTitle || data.title,
        metaDescription: data.seo?.metaDescription || data.seoDescription || data.description || data.excerpt || '',
        keywords: data.seo?.keywords || data.keywords || data.tags || [],
        ...(data.seo?.canonical && { canonicalUrl: data.seo.canonical })
      }
    };

    return {
      props: {
        post,
        allPosts
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return {
      notFound: true
    };
  }
};

export default BlogPostPage;