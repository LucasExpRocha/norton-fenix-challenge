'use client';

import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      className="fade-in mx-6 xl:mx-20 2xl:mx-52 my-6 xl:my-14"
    >
      {children}
    </div>
  );
}
