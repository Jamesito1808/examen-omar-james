/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        surface: '#F8FAFC',
        ink: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
          muted: '#475569',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          dark: '#152A45',
          light: '#E8EEF4',
        },
        gold: {
          DEFAULT: '#8A7535',
          soft: '#F5F0DF',
        },
        line: '#E2E8F0',
      },
      fontFamily: {
        serif: ['"EB Garamond"', '"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', '"Lato"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '6px',
        sm: '4px',
      },
      screens: {
        xs: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}
