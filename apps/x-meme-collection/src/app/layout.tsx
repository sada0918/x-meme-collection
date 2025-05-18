import { Inter } from 'next/font/google';
import './globals.css';
import RecoilProvider from './providers/recoil-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '例のミームまとめ',
  description: 'Xで話題のミームポストをまとめてチェック！',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
