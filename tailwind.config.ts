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
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
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
