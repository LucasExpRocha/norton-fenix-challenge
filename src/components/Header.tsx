'use client';

import { usePathname } from 'next/navigation';

import Button from '@/components/ui/Button';

type HeaderAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type HeaderConfig = {
  title: string;
  action?: HeaderAction;
};

const configs: Record<string, HeaderConfig> = {
  '/dashboard': { title: 'Dashboard' },
  '/ticket-management': { title: 'Ticket', action: { label: 'Novo ticket' } },
  '/plan-simulator': { title: 'Plan' },
  '/chat-ia': { title: 'Chat' },
};

export default function Header() {
  const pathname = usePathname();
  const cfg = configs[pathname] ?? { title: 'Dashboard' };
  return (
    <header
      aria-label="Barra superior de navegação"
      className="w-full h-16 md:h-20 bg-[#20273E] flex items-center justify-between px-6 md:px-10"
    >
      <h1 className="text-white text-sm md:text-lg font-medium tracking-wide">
        {cfg.title}
      </h1>
      {cfg.action && (
        <div className="flex items-center gap-3">
          <Button fullWidth={false} className="h-9 md:h-10 px-4 py-2 text-sm">
            {cfg.action.label}
          </Button>
        </div>
      )}
    </header>
  );
}
