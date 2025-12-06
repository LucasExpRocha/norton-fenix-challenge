'use client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Avatar from './ui/Avatar';
import IconButton from './ui/IconButton';
import { createIcon } from './ui/TicketIcon';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  disabled?: boolean;
};

type SidebarNavProps = {
  items?: NavItem[];
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  initials?: string;
  className?: string;
};

const DashboardIcon = createIcon('/svgs/dashboard.svg', 'Dashboard');
const TicketIcon = createIcon('/svgs/ticket.svg', 'Ticket');
const ChatIcon = createIcon('/svgs/chat.svg', 'Chat');
const ProfileIcon = createIcon('/svgs/profile.svg', 'Profile');
const PlanIcon = createIcon('/svgs/plan.svg', 'Plan');

export default function SidebarNav({
  items = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: DashboardIcon,
      href: '/dashboard',
    },
    {
      id: 'ticket',
      label: 'Ticket',
      icon: TicketIcon,
      href: '/ticket-management',
    },
    { id: 'chat', label: 'Chat', icon: ChatIcon, href: '/chat-ia' },
    {
      id: 'users',
      label: 'Users',
      icon: ProfileIcon,
      href: '/users',
      disabled: true,
    },
    { id: 'plan', label: 'Plan', icon: PlanIcon, href: '/plan-simulator' },
  ],
  defaultActiveId = 'dashboard',
  onSelect,
  initials = 'AC',
  className,
}: SidebarNavProps) {
  const pathname = usePathname();

  function handleSelect(item: NavItem) {
    onSelect?.(item.id);
  }

  return (
    <aside
      aria-label="Barra lateral de navegação"
      className={twMerge(
        'flex flex-col justify-between items-center min-w-[82px] h-dvh bg-[#20273E] pl-10 pr-11 pt-9 pb-20 shadow-[4px_0px_20px_0px_#00000033] rounded-br-4xl',
        className
      )}
    >
      <div className="flex flex-col items-center justify-between gap-6 h-full ">
        <div aria-hidden="true" className="flex-center">
          <Image
            src="/svgs/nortusIcon.svg"
            alt="Nortus"
            width={40}
            height={40}
          />
        </div>

        <nav aria-label="Principal">
          <ul className="flex flex-col items-center gap-6">
            {items.map((item) => {
              const isActive = item.href === pathname;

              return (
                <li key={item.id} className="list-none">
                  <Link href={item.href} passHref prefetch>
                    <IconButton
                      onClick={() => handleSelect(item)}
                      ariaLabel={item.label}
                      isActive={isActive}
                      disabled={item.disabled}
                    >
                      <item.icon className="mx-auto text-[22px]" />
                    </IconButton>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pb-2">
          <Avatar initials={initials} />
        </div>
      </div>
    </aside>
  );
}
