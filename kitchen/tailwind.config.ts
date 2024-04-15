import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        subdued: 'var(--color-subdued)',
        overlay: 'var(--color-overlay)',
        background: 'var(--color-background)',
        panel: 'var(--color-panel)',
        emphasis: 'var(--color-emphasis)',
        outline: 'var(--color-outline)',
      },
    },
  },
  plugins: [],
};
export default config;
