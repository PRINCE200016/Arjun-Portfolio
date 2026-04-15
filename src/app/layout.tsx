import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arjun Rajawat | Java Full Stack Developer',
  description: 'Personal portfolio of Arjun Rajawat, a Java Full Stack Developer.',
  openGraph: {
    title: 'Arjun Rajawat | Java Full Stack Developer',
    description: 'Personal portfolio of Arjun Rajawat, a Java Full Stack Developer.',
    url: 'https://arjunrajawat-portfolio.vercel.app',
    siteName: 'Arjun Rajawat Portfolio',
    images: [
      {
        url: 'https://arjunrajawat-portfolio.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arjun Rajawat - Java Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun Rajawat | Java Full Stack Developer',
    description: 'Personal portfolio of Arjun Rajawat, a Java Full Stack Developer.',
    images: ['https://arjunrajawat-portfolio.vercel.app/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
