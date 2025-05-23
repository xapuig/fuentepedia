import './ui/global.css';
import { inter } from './ui/fonts';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: '%s | Fuentepedia',
    default: 'Fuentepedia',
  },
  description: 'Fuentepedia, conoce tus fuentes.',
  metadataBase: new URL('https://fuentepedia.vercel.app/'),
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
