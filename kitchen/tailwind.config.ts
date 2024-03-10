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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
