import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0d1a44',
        navy2: '#16265c',
        blue: '#1f3fa8',
        gold: '#c9a24a',
        'gold-soft': '#e6cd8e',
        ivory: '#fbf7ee',
        ink: '#1b2340',
        muted: '#6b7391',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
};

export default config;
