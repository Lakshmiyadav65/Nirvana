import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: 'Nirvana Builders & Developers | Luxury Real Estate & Construction Hyderabad',
  description:
    'Nirvana Builders & Developers is a premium real estate and construction company based in Hyderabad. Building architectural excellence with trust, quality, and modern living.',
  keywords:
    'Nirvana Builders, Nirvana Developers, Luxury Apartments Hyderabad, Construction Company Khammam, Real Estate Hyderabad, Residential Apartments, Independent Houses, Commercial Spaces',
  authors: [{ name: 'Nirvana Builders & Developers' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..900&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal-dark text-cream antialiased overflow-x-hidden">
        <SmoothScroll>
          <ScrollProgress />
          <div className="flex flex-col min-h-screen bg-charcoal-dark text-cream">
            <ScrollToTop />
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow">{children}</main>

            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
