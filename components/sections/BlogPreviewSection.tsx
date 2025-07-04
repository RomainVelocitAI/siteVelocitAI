import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FadeInUp, StaggerContainer, StaggerItem } from '../ui/animations';

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
}

interface BlogPreviewSectionProps {
  posts?: BlogPost[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ posts }) => {
  // Default posts data (in production, these would come from props or API)
  const defaultPosts: BlogPost[] = [
    {
      title: "10 Processus à Automatiser en Priorité dans votre Entreprise",
      description: "Découvrez les 10 processus les plus impactants à automatiser en priorité pour transformer votre entreprise et gagner jusqu'à 70% de temps sur vos tâches répétitives.",
      slug: "10-processus-automatiser-priorite-entreprise",
      date: "2024-06-24",
      author: "Équipe VelocitAI",
      category: "Automatisation",
      tags: ["automatisation", "processus", "productivité"],
      readTime: 8,
      featured: true
    },
    {
      title: "Chatbots IA : Révolutionnez votre Service Client en 2025",
      description: "Découvrez comment les chatbots IA transforment le service client. Guide complet avec cas d'usage, ROI et meilleures pratiques pour votre entreprise.",
      slug: "chatbots-ia-service-client-2025",
      date: "2024-06-20",
      author: "Équipe VelocitAI",
      category: "Intelligence Artificielle",
      tags: ["chatbot", "IA", "service client"],
      readTime: 10,
      featured: true
    },
    {
      title: "Guide Stratégique de l'Automatisation d'Entreprise 2025",
      description: "Guide complet pour développer une stratégie d'automatisation efficace. Méthodes éprouvées, outils recommandés et étapes clés pour transformer votre entreprise.",
      slug: "automatisation-entreprise-guide-strategique-2025",
      date: "2024-06-18",
      author: "Équipe VelocitAI",
      category: "Automatisation",
      tags: ["automatisation", "stratégie", "guide"],
      readTime: 12,
      featured: false
    }
  ];

  const displayPosts = posts || defaultPosts;
  const featuredPosts = displayPosts.filter(post => post.featured).slice(0, 2);
  const regularPosts = displayPosts.filter(post => !post.featured).slice(0, 1);
  const allPosts = [...featuredPosts, ...regularPosts].slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'automatisation':
        return 'from-purple-500 to-purple-600';
      case 'intelligence artificielle':
        return 'from-blue-500 to-blue-600';
      case 'roi & performance':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" id="blog-preview">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <StaggerContainer className="text-center mb-16">
          <StaggerItem>
            <FadeInUp>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Nos Derniers{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Insights
                </span>
              </motion.h2>
              <motion.div
                className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </FadeInUp>
          </StaggerItem>
          
          <StaggerItem>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Découvrez nos guides experts, cas d'usage concrets et stratégies éprouvées 
                <br className="hidden md:block" />
                pour automatiser et transformer votre entreprise avec l'IA.
              </p>
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>

        {/* Posts Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {allPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                  whileHover={{ y: -8 }}
                >
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <motion.span
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.5, 
                          type: "spring", 
                          stiffness: 200 
                        }}
                        viewport={{ once: true }}
                      >
                        <SparklesIcon className="h-3 w-3" />
                        À la Une
                      </motion.span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <motion.span
                        className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-sm font-medium px-3 py-1 rounded-full`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {post.category}
                      </motion.span>
                    </div>

                    {/* Title */}
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {post.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {post.description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Meta Info */}
                    <motion.div
                      className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
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
                      
                      {/* Read More Arrow */}
                      <motion.div
                        className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span>Lire</span>
                        <ArrowRightIcon className="h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover Gradient Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  />

                  {/* Premium glow effect */}
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10"
                  />
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blog CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-6">
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Plus de guides experts, cas d'usage et conseils pratiques vous attendent
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/blog">
                <motion.div
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    📚 Découvrir tous nos articles
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogPreviewSection;