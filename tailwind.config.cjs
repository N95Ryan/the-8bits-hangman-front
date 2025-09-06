/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      animation: {
        'pulse': 'neon-pulse 2s infinite',
        'arcade-bounce': 'arcade-bounce 0.3s ease',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards 0.3s',
      },
      keyframes: {
        'arcade-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
      },
      boxShadow: {
        'pixel': '4px 4px 0 rgba(0, 0, 0, 0.8)',
        'pixel-sm': '2px 2px 0 rgba(0, 0, 0, 0.8)',
        'pixel-lg': '6px 6px 0 rgba(0, 0, 0, 0.8)',
        'pixel-inner': 'inset 2px 2px 0 rgba(255, 255, 255, 0.1), inset -2px -2px 0 rgba(0, 0, 0, 0.3)',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 0, 0, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.7) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      letterSpacing: {
        'pixel': '0.05em',
      },
      lineHeight: {
        'pixel': '1.6',
        'pixel-heading': '1.3',
      },
      textShadow: {
        'neon': '0 0 5px rgba(45, 212, 191, 0.7), 0 0 10px rgba(45, 212, 191, 0.5)',
        'neon-strong': '0 0 15px rgba(45, 212, 191, 0.9), 0 0 20px rgba(45, 212, 191, 0.7)',
      },
      transitionProperty: {
        'arcade': 'all',
      },
      transitionDuration: {
        'arcade': '150ms',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 5px rgba(45, 212, 191, 0.7), 0 0 10px rgba(45, 212, 191, 0.5)',
        },
        '.text-shadow-neon-strong': {
          textShadow: '0 0 15px rgba(45, 212, 191, 0.9), 0 0 20px rgba(45, 212, 191, 0.7)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}