'use client';

import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="fade-in mx-52 my-14">
      {children}
    </div>
  );
}
