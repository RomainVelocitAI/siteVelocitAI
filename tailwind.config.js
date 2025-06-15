/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Bleu plus vif
        secondary: '#7C3AED', // Violet
        accent: '#10B981',    // Vert émeraude
        dark: '#111827',     // Gris très foncé
        light: '#F9FAFB',    // Blanc cassé
        background: '#F3F4F6', // Gris clair pour fond
        text: '#1F2937',     // Gris foncé pour texte
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      gradientColorStops: theme => ({
        'primary-accent': [theme('colors.primary'), theme('colors.accent')],
        'secondary-accent': [theme('colors.secondary'), theme('colors.accent')],
      }),
    },
  },
  plugins: [],
  darkMode: 'class',
}
