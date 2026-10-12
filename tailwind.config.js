/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
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
        // Cinematic hero tokens
        navy: {
          950: 'var(--color-navy-950)',
          900: 'var(--color-navy-900)',
          800: 'var(--color-navy-800)',
          700: 'var(--color-navy-700)',
        },
        'accent-orange': {
          DEFAULT: 'var(--color-orange-500)',
          hover: 'var(--color-orange-400)',
          glow: 'var(--color-orange-glow)',
        },
        // Windows XP Luna design tokens
        xp: {
          blue: {
            900: 'var(--xp-blue-900)',
            700: 'var(--xp-blue-700)',
            600: 'var(--xp-blue-600)',
            300: 'var(--xp-blue-300)',
            100: 'var(--xp-blue-100)',
          },
          start: {
            900: 'var(--xp-start-900)',
            700: 'var(--xp-start-700)',
            400: 'var(--xp-start-400)',
          },
          surface: {
            DEFAULT: 'var(--xp-surface)',
            raised: 'var(--xp-surface-raised)',
          },
          content: 'var(--xp-content)',
          text: {
            DEFAULT: 'var(--xp-text)',
            muted: 'var(--xp-text-muted)',
          },
          border: {
            DEFAULT: 'var(--xp-border)',
            control: 'var(--xp-control-border)',
          },
          selected: {
            DEFAULT: 'var(--xp-selected)',
            text: 'var(--xp-selected-text)',
          },
          focus: 'var(--xp-focus)',
          danger: {
            DEFAULT: 'var(--xp-danger)',
            light: 'var(--xp-danger-light)',
          },
          success: 'var(--xp-success)',
          inactive: 'var(--xp-inactive)',
        },
      },
      borderRadius: {
        'xp-ctrl': '3px',
        'xp-pane': '4px',
        'xp-window-top': '8px',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Tahoma', 'Arial', 'sans-serif'],
        tahoma: ['Tahoma', '"Segoe UI"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
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
