import { Montserrat } from 'next/font/google';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import SidebarNav from '@/components/SidebarNav';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-h-dvh bg-[#0B1125] text-white flex ${montserrat.variable}`}
    >
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
