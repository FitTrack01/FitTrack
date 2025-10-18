import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins'
});


export const metadata: Metadata = {
  title: 'FitTrack',
  description: 'Your daily fitness companion to track exercises and stay motivated.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.variable} font-body antialiased h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
