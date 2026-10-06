import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import LenisProvider from '@/components/ui/LenisProvider';
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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster />
      </body>
    </html>
  );
}
