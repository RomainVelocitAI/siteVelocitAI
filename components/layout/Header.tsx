import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GlassCard } from '@/components/ui/GlassCard';
import { HomeIcon, LightningIcon, CalculatorIcon, TargetIcon, PhoneIcon, RocketIcon } from '@/components/ui/Icons';

// Composant d'animation réutilisable
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animation pour le menu mobile
const menuVariants: Variants = {
  open: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 300, 
      damping: 30,
      staggerChildren: 0.1
    } 
  },
  closed: { 
    opacity: 0, 
    scale: 0.95,
    y: -20,
    transition: { 
      type: 'spring',
      stiffness: 300, 
      damping: 30
    } 
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#hero', icon: HomeIcon },
    { name: 'Solutions', href: '#solutions', icon: LightningIcon },
    { name: 'Calculateur', href: '#calculateur', icon: CalculatorIcon },
    { name: 'À propos', href: '#about', icon: TargetIcon },
    { name: 'Contact', href: '#contact', icon: PhoneIcon },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-800/50' 
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo avec animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Link href="/" className="flex items-center group">
            <div className="relative">
              {/* Logo principal */}
              <div className="relative h-12 w-auto">
                <Image
                  src="/images/Color logo - no background.png"
                  alt="Velocit.AI Logo"
                  width={120}
                  height={48}
                  className="object-contain transition-all duration-300 group-hover:brightness-110"
                  priority
                />
              </div>
              
              {/* Effet de lueur */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              {/* Particules animées */}
              <SparklesIcon className="absolute -top-1 -right-1 w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2 + (index * 0.1),
                duration: 0.5
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="relative px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 group flex items-center space-x-2"
              >
                <link.icon className="w-4 h-4" />
                <span className="font-medium">{link.name}</span>
                
                {/* Effet de survol glassmorphism */}
                <div className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
                
                {/* Bordure animée */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/30 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                />
              </Link>
            </motion.div>
          ))}
          
          {/* Bouton CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#contact"
              className="relative ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group overflow-hidden"
            >
              <RocketIcon className="w-5 h-5" />
              <span>Prendre RDV</span>
              
              {/* Effet de lueur */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
          
          {/* Toggle de thème */}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          
          <motion.div 
            className="z-50"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-all duration-300"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 180, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div 
              initial="closed"
              animate={isMenuOpen ? 'open' : 'closed'}
              exit="closed"
              variants={menuVariants}
              className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] z-40 md:hidden"
            >
              <GlassCard className="p-6 rounded-2xl" blur="lg">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.name}</span>
                        
                        {/* Effet de hover */}
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.02 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Séparateur */}
                  <div className="my-4 border-t border-white/20 dark:border-white/10" />
                  
                  {/* Bouton CTA mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      href="#contact"
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <RocketIcon className="w-5 h-5" />
                      <span>Prendre RDV</span>
                      
                      {/* Effet de lueur */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
