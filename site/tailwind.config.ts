import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        narrative: 'var(--font-family-narrative)',
        interface: 'var(--font-family-interface)',
        display: 'var(--font-family-display)',
      },
      fontWeight: {
        'narrative-normal': 'var(--font-weight-narrative-normal)',
        'narrative-bold': 'var(--font-weight-narrative-bold)',
        'interface-normal': 'var(--font-weight-interface-normal)',
        'interface-bold': 'var(--font-weight-interface-bold)',
        'display-normal': 'var(--font-weight-display-normal)',
        'display-bold': 'var(--font-weight-display-bold)',
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
