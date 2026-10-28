/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B18', // deepest background
          900: '#0B132B', // primary dark background
          850: '#0F1A3A',
          800: '#14214D', // card background
          700: '#1C2E66', // border / lighter card
          600: '#2A438C',
        },
        neon: {
          green: '#00F59B', // vibrant neon green
          emerald: '#10B981',
          glow: 'rgba(0, 245, 155, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 25px rgba(0, 245, 155, 0.35)',
        'neon-sm': '0 0 12px rgba(0, 245, 155, 0.25)',
        'neon-lg': '0 0 45px rgba(0, 245, 155, 0.45)',
        'card-glow': '0 10px 30px -10px rgba(0, 245, 155, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
