import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav 
      className={`flex ${className}`} 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {index > 0 && (
              <ChevronRightIcon 
                className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-2" 
                aria-hidden="true" 
              />
            )}
            
            {item.current ? (
              <span 
                className="text-gray-900 dark:text-white font-medium"
                aria-current="page"
              >
                {index === 0 && (
                  <HomeIcon className="h-4 w-4 inline mr-1" aria-hidden="true" />
                )}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href || '#'}
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center"
              >
                {index === 0 && (
                  <HomeIcon className="h-4 w-4 inline mr-1" aria-hidden="true" />
                )}
                {item.name}
              </Link>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;