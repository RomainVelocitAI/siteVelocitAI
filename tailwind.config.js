/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette Premium
        midnight: '#0A0E27',
        'royal-purple': '#6B46C1',
        'electric-blue': '#0EA5E9',
        platinum: '#F8FAFC',
        graphite: '#1E293B',
        'gold-accent': '#F59E0B',
        'emerald-accent': '#10B981',
        'ruby-accent': '#EF4444',
        
        // Système de couleurs révisé
        primary: {
          50: '#F3F1FF',
          100: '#E9E5FF',
          200: '#D5CCFF',
          300: '#B7A6FF',
          400: '#9478FF',
          500: '#6B46C1', // royal-purple
          600: '#5A3A9F',
          700: '#4A2F82',
          800: '#3D276B',
          900: '#322159',
        },
        secondary: {
          50: '#F0FBFF',
          100: '#E0F6FF',
          200: '#B9EDFF',
          300: '#7DDFFF',
          400: '#38CBFF',
          500: '#0EA5E9', // electric-blue
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          gold: '#F59E0B',
          emerald: '#10B981',
          ruby: '#EF4444',
        },
        dark: {
          bg: '#0A0E27',
          surface: '#1E293B',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #6B46C1 0%, #0EA5E9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0E27 0%, #1E293B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(251, 74%, 52%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(198, 89%, 49%, 0.1) 0px, transparent 50%)',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(107, 70, 193, 0.25)',
        'premium-lg': '0 35px 60px -15px rgba(107, 70, 193, 0.3)',
        'glow': '0 0 30px rgba(107, 70, 193, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(107, 70, 193, 0.2)',
      },
      fontSize: {
        'display-xl': 'clamp(3.5rem, 8vw, 5rem)',
        'display-lg': 'clamp(2.5rem, 6vw, 3.5rem)',
        'display-md': 'clamp(2rem, 4vw, 2.5rem)',
        'display-sm': 'clamp(1.5rem, 3vw, 2rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          'backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(16px)',
          'background': 'rgba(0, 0, 0, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
