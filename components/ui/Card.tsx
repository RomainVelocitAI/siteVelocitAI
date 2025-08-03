import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'gradient' | 'outline';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  hover = true,
  padding = 'lg',
  className = '',
  onClick,
  as = 'div'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const variantClasses = {
    glass: `
      bg-white/5 dark:bg-black/5
      backdrop-blur-xl
      border border-white/10 dark:border-white/5
      shadow-xl
    `,
    solid: `
      bg-white dark:bg-graphite
      shadow-lg
      border border-gray-100 dark:border-gray-800
    `,
    gradient: `
      bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-transparent
      backdrop-blur-md
      border border-white/20 dark:border-white/10
      shadow-premium
    `,
    outline: `
      bg-transparent
      border-2 border-primary-500/20
      hover:border-primary-500/40
    `
  };
  
  const baseClasses = `
    relative rounded-2xl overflow-hidden
    transition-all duration-500 transform-gpu
    ${onClick ? 'cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  const Component = motion[as];
  
  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Effet de lueur premium au hover */}
      {variant === 'glass' && (
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Effet de shimmer pour les cartes gradient */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
        </div>
      )}
      
      {/* Noise texture overlay pour plus de sophistication */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      {/* Contenu de la carte */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
};

// Composants enfants pour une structure cohérente
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`font-display text-2xl font-bold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <p className={`mt-2 text-gray-600 dark:text-gray-300 ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export default Card;