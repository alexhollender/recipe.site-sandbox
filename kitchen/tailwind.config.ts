import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          tint: 'var(--color-primary-tint)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          tint: 'var(--color-secondary-tint)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
