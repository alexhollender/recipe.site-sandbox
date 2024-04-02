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
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        subdued: 'var(--color-subdued)',
        overlay: 'var(--color-overlay)',
        background: 'var(--color-background)',
        panel: 'var(--color-panel)',
        emphasis: 'var(--color-emphasis)',
        outline: 'var(--color-outline)',
      },
      aspectRatio: {
        landscape: '16 / 9',
        sd: '4 / 3',
        portrait: '3 / 4',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
export default config;
