/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--bg)',
        surface: 'var(--surface)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: 'var(--ink-muted)',
        },
        navy: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary)',
          light: 'var(--surface)',
        },
        gold: {
          DEFAULT: 'var(--clay)',
          soft: 'var(--surface)',
        },
        line: 'var(--border)',
      },
      fontFamily: {
        serif: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
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
