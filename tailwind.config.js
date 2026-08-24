/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        crimson: 'rgb(var(--color-crimson) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        ada: {
          bg: '#0F0F11',
          surface: '#1B1B1E',
          crimson: '#681826',
          red: '#D12636',
          bone: '#E0D5C9',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color-text)', // Dynamic text
            'h1, h2, h3': {
              color: 'var(--color-text)', // Dynamic headings
              fontFamily: theme('fontFamily.sans'),
              fontWeight: '700',
              marginTop: '2em',
            },
            hr: {
              borderColor: 'var(--color-primary)', // Dynamic border
              opacity: '0.3',
              marginTop: '3em',
              marginBottom: '3em',
            },
            strong: {
              color: 'var(--color-primary)', // Dynamic bold
            },
            // Fix code blocks in light mode
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-surface)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}