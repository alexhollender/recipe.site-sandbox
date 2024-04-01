import * as Next from 'next';

import './globals.css';

export const metadata: Next.Metadata = {
  title: 'Recipe Site • Kitchen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
