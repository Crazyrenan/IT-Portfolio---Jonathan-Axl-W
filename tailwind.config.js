/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // 1. ENABLE CLASS-BASED DARK MODE
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // 2. CONNECT TO CSS VARIABLES
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        text: 'var(--color-text)',
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