import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color, #E90C0C)',
          light: 'var(--primary-light, #FF2F2F)',
          dark: 'var(--primary-dark, #CD0808)',
        },
        darkBg: '#0F172A',
        darkSurface: '#1E293B',
      },
      spacing: {
        // custom spacing can be added here
      },
      borderRadius: {
        // custom radius tokens
      },
      fontSize: {
        // custom font sizes
      },
    },
  },
  plugins: [],
}

export default config
