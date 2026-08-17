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
          DEFAULT: 'var(--primary-color, #FF4D00)',
          light: 'var(--primary-light, #FF7332)',
          dark: 'var(--primary-dark, #E03E00)',
        },
        darkBg: '#180D08',
        darkSurface: '#2B170E',
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
