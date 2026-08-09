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
          DEFAULT: 'var(--primary-color, #089699)',
          light: 'var(--primary-light, #24D6D3)',
          dark: 'var(--primary-dark, #0B777A)',
        },
        darkBg: '#022D31',
        darkSurface: '#114D50',
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
