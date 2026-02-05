/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F11',
        surface: '#232325',
        primary: '#681826',
        text: '#E0D5C9',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      // ADD THIS NEW TYPOGRAPHY CONFIGURATION:
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // General Color Overrides
            color: theme('colors.text'),
            
            // Headings (H1, H2, H3)
            'h1, h2, h3': {
              color: '#ffffff',
              fontFamily: theme('fontFamily.sans'),
              fontWeight: '700',
              marginTop: '2em', // More breathing room above headings
            },

            // Horizontal Rules (The '---' dividers)
            hr: {
              borderColor: theme('colors.primary'), // Make lines Wine Red
              opacity: '0.3',
              marginTop: '3em',
              marginBottom: '3em',
              borderTopWidth: '1px',
            },

            // Images
            img: {
              borderRadius: '0.25rem', // rounded-sm
              border: `1px solid ${theme('colors.surface')}`,
            },

            // Strong/Bold text
            strong: {
              color: theme('colors.primary'), // Highlight bold text in Red
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}