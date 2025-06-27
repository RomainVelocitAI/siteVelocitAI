import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const navigation = [
  { name: 'Calculateur', href: '#calculateur' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm dark:shadow-gray-800/50 sticky top-0 z-50 transition-all duration-500 border-b border-gray-200/20 dark:border-gray-700/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl">
                <span className="animate-pulse">∞</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-purple-600">
                VelocitAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 cursor-pointer group py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:bg-clip-text transition-all duration-300 group py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl"
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-indigo-600" />
              )}
            </button>
            
            <a
              href="#contact"
              className="ml-6 relative inline-flex items-center px-8 py-3 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-600 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 hover:-translate-y-1 group overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <span className="mr-2">🚀</span>
                Demander un devis
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            <button
              type="button"
              className="bg-white dark:bg-gray-900 p-2 rounded-md text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <a
                href="#contact"
                className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setMobileMenuOpen(false);
                }}
              >
                Demander un devis
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
