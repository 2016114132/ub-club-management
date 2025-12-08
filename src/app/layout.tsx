import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar, MobileNav, RoleSwitcher } from '@/components/layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'UB Clubs - University of Belize Club Management',
  description: 'University of Belize Club Management System - Join clubs, create posts, and manage your campus community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <MobileNav />
          </div>
          <RoleSwitcher />
        </Providers>
      </body>
    </html>
  );
}
