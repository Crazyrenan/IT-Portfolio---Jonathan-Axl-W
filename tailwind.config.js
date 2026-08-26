/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-glow': 'rgb(var(--color-primary-glow) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgba(var(--color-border), 0.12)',
        grid: 'rgba(var(--color-grid), 0.05)',
        'nav-bg': 'rgba(var(--color-nav-bg), 0.85)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'rgb(var(--color-text))', // Dynamic text
            'h1, h2, h3': {
              color: 'rgb(var(--color-text))', // Dynamic headings
              fontFamily: theme('fontFamily.sans'),
              fontWeight: '700',
              marginTop: '2em',
            },
            hr: {
              borderColor: 'rgb(var(--color-primary))', // Dynamic border
              opacity: '0.3',
              marginTop: '3em',
              marginBottom: '3em',
            },
            strong: {
              color: 'rgb(var(--color-primary-glow))', // Dynamic bold
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              color: 'rgb(var(--color-primary-glow))',
              backgroundColor: 'rgb(var(--color-surface))',
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
