import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: 'naly.dev | Interactive Financial Research',
  description: 'Interactive dashboards, economic analysis tools, and The Money Game.',
  keywords: ['finance', 'economics', 'data visualization', 'dashboards', 'analysis'],
  authors: [{ name: 'Naly' }],
  metadataBase: new URL('https://app.naly.dev'),
  openGraph: {
    title: 'naly.dev | Interactive Financial Research',
    description: 'Interactive dashboards, economic analysis tools, and The Money Game.',
    url: 'https://app.naly.dev',
    siteName: 'naly.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'naly.dev | Interactive Financial Research',
    description: 'Interactive dashboards, economic analysis tools, and The Money Game.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-terminal-bg text-white">
        {children}
      </body>
    </html>
  );
}
