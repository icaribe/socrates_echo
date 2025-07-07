/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B4513', // sienna brown
        'primary-foreground': '#FDF6E3', // warm cream
        
        // Secondary Colors
        'secondary': '#2F4F4F', // deep slate gray
        'secondary-foreground': '#F5F5DC', // soft beige
        
        // Accent Colors
        'accent': '#DAA520', // rich goldenrod
        'accent-foreground': '#2C1810', // deep brown
        
        // Background Colors
        'background': '#FDF6E3', // warm cream
        'surface': '#F5F5DC', // soft beige
        
        // Text Colors
        'text-primary': '#2C1810', // deep brown
        'text-secondary': '#5D4E37', // medium brown
        
        // Status Colors
        'success': '#228B22', // forest green
        'success-foreground': '#FDF6E3', // warm cream
        'warning': '#FF8C00', // warm orange
        'warning-foreground': '#2C1810', // deep brown
        'error': '#B22222', // deep red
        'error-foreground': '#FDF6E3', // warm cream
        
        // Border Colors
        'border': '#E6D7C3', // muted tone
        'border-muted': '#F0E6D2', // lighter muted tone
      },
      fontFamily: {
        'heading': ['Crimson Text', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Libre Baskerville', 'serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'soft': '6px',
        'button': '12px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(44, 24, 16, 0.1)',
        'elevated': '0 4px 16px rgba(44, 24, 16, 0.15)',
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-success': 'scaleSuccess 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 150ms ease-out',
      },
      keyframes: {
        scaleSuccess: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        'header': '100',
        'navigation': '200',
        'modal': '300',
        'tooltip': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}