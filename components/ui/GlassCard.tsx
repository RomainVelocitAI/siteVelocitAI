import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  blur = 'md',
  border = true,
  shadow = 'xl'
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const baseClasses = `
    relative
    bg-white/10 dark:bg-black/10
    ${blurClasses[blur]}
    ${border ? 'border border-white/20 dark:border-white/10' : ''}
    ${shadowClasses[shadow]}
    transition-all duration-300
    ${className}
  `;

  const hoverClasses = hover ? `
    hover:bg-white/20 dark:hover:bg-black/20
    hover:border-white/30 dark:hover:border-white/20
    hover:shadow-2xl
    hover:scale-[1.02]
  ` : '';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {/* Effet de lueur interne */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Bordure animée */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};