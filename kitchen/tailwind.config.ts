import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        narrative: ['Times New Roman', 'serif'],
        interface: ['Arial', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-tint': 'var(--color-primary-tint)',
        secondary: 'var(--color-secondary)',
        'secondary-tint': 'var(--color-secondary-tint)',
      },
      aspectRatio: {
        landscape: '16 / 9',
        sd: '4 / 3',
      },
    },
  },
  plugins: [],
};
export default config;
