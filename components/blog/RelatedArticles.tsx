import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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
  image?: string;
}

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  maxResults?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentPost,
  allPosts,
  maxResults = 3
}) => {
  const getRelatedPosts = () => {
    // Filtrer les autres articles (pas le courant)
    const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
    
    // Calculer un score de pertinence pour chaque article
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // +3 points si même catégorie
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // +1 point par tag en commun
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length;
      
      // +2 points si article featured
      if (post.featured) {
        score += 2;
      }
      
      return { ...post, score };
    });
    
    // Trier par score décroissant puis par date
    return scoredPosts
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, maxResults);
  };

  const relatedPosts = getRelatedPosts();

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

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Articles Recommandés
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50"
                whileHover={{ y: -4 }}
              >
                {/* Image placeholder ou véritable image */}
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                    {post.description}
                  </p>
                  
                  {/* Meta info */}
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
                    
                    <motion.div
                      className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all duration-300"
                      whileHover={{ x: 3 }}
                    >
                      <span>Lire</span>
                      <ArrowRightIcon className="h-3 w-3" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                />
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </div>
      
      {/* Voir tous les articles */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
        >
          Découvrir tous nos articles
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </motion.div>
        </Link>
      </motion.div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default RelatedArticles;