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
  title: 'naly.dev | Decoding the Economy with Code',
  description: 'A digital garden of interactive financial dashboards and economic analysis.',
  keywords: ['finance', 'economics', 'data visualization', 'dashboards', 'analysis'],
  authors: [{ name: 'Naly' }],
  openGraph: {
    title: 'naly.dev',
    description: 'Decoding the economy with code.',
    url: 'https://naly.dev',
    siteName: 'naly.dev',
    type: 'website',
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
