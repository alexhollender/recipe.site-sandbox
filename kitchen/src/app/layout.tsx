// import '@mantine/core/styles.css';
import '@/app/globals.css';

// import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>{/* <ColorSchemeScript /> */}</head>
      <body>{children}</body>
    </html>
  );
}
