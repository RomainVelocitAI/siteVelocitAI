import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import Footer from '../../components/layout/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  excerpt: string;
}

interface BlogPageProps {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const BlogPage: React.FC<BlogPageProps> = ({ posts, featuredPosts }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categories = Array.from(new Set(posts.map(post => post.category)));

  return (
    <>
      <Head>
        <title>Blog Automatisation & IA | Conseils d'Experts VelocitAI</title>
        <meta 
          name="description" 
          content="Découvrez nos guides experts en automatisation d'entreprise, chatbots IA et transformation digitale. Conseils pratiques pour optimiser votre productivité."
        />
        <meta name="keywords" content="blog automatisation, IA entreprise, chatbot, transformation digitale, productivité, ROI automatisation" />
        <meta property="og:title" content="Blog Automatisation & IA | VelocitAI" />
        <meta property="og:description" content="Guides experts en automatisation d'entreprise et IA conversationnelle" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velocitai.com/blog" />
        <link rel="canonical" href="https://velocitai.com/blog" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blog VelocitAI",
              "description": "Blog spécialisé en automatisation d'entreprise et intelligence artificielle",
              "url": "https://velocitai.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "VelocitAI",
                "url": "https://velocitai.com"
              },
              "blogPost": posts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.description,
                "url": `https://velocitai.com/blog/${post.slug}`,
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": post.author
                }
              }))
            })
          }}
        />
      </Head>


      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Blog{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Automatisation
                </span>
                {' '}& IA
              </h1>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Découvrez nos guides experts, cas d'usage concrets et stratégies éprouvées pour transformer votre entreprise grâce à l'automatisation et l'intelligence artificielle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Articles à la Une
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"></div>
              </motion.div>

              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {featuredPosts.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={itemVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="group relative"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50"
                        whileHover={{ y: -8 }}
                      >
                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ⭐ À la Une
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{formatDate(post.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                <span>{post.readTime} min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Tous nos Articles
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Categories Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((category) => (
                <span
                  key={category}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </motion.div>

            {/* Posts Grid */}
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {posts.filter(post => !post.featured).map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50"
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              <span>{post.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Restez à la Pointe de l'Automatisation
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Recevez nos derniers guides et cas d'usage directement dans votre boîte mail. 
                Rejoignez +2000 dirigeants qui automatisent leur entreprise.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }}
              >
                S'abonner à la Newsletter
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Lire tous les fichiers markdown du dossier content/blog
    const contentDirectory = path.join(process.cwd(), 'content/blog');
    const filenames = fs.readdirSync(contentDirectory);
    
    const posts: BlogPost[] = filenames
      .filter(name => name.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(contentDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          title: data.title,
          description: data.description || data.excerpt || '',
          excerpt: data.excerpt || data.description || '',
          slug: filename.replace('.md', ''),
          date: data.date,
          author: data.author,
          category: data.category,
          tags: data.tags || [],
          readTime: data.readingTime || data.readTime || 10,
          featured: data.featured || false,
          seo: {
            metaTitle: data.seoTitle || data.title,
            metaDescription: data.seoDescription || data.description || '',
            keywords: data.keywords || data.tags || []
          }
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Trier par date décroissante

    const featuredPosts = posts.filter(post => post.featured);

    return {
      props: {
        posts,
        featuredPosts
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {
      props: {
        posts: [],
        featuredPosts: []
      },
      revalidate: 3600
    };
  }
};

export default BlogPage;