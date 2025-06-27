import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/5 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <SunIcon className="w-6 h-6 text-amber-500" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <MoonIcon className="w-6 h-6 text-blue-400" />
        </motion.div>
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.button>
  );
};