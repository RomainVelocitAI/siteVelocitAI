import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

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
    x: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 40 
    } 
  },
  closed: { 
    opacity: 0, 
    x: '100%',
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 40 
    } 
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Calculateur', href: '#calculateur' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`bg-white shadow-sm ${isScrolled ? 'shadow-md' : ''} fixed w-full z-50`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo avec animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-auto">
              <Image
                src="/images/Color logo - no background.png"
                alt="Velocit.AI Logo"
                width={120}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
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
                className="relative text-gray-700 hover:text-purple-600 transition-colors group"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            </motion.div>
          ))}
          <Link
            href="#contact"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Prendre RDV
          </Link>
        </div>

        {/* Mobile menu button */}
        <motion.div 
          className="md:hidden z-50"
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-purple-600 focus:outline-none p-2"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.svg 
                  key="close"
                  initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 180, scale: 1, opacity: 1 }}
                  exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="menu"
                  initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed"
            animate={isMenuOpen ? 'open' : 'closed'}
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-20 bg-white z-40 shadow-lg md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
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
                    className="block px-3 py-3 rounded-md text-lg font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="#contact"
                className="block px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Prendre RDV
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
