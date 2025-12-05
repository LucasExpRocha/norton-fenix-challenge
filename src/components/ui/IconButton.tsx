import React from 'react';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  ariaLabel?: string;
};

export default function IconButton({
  isActive,
  ariaLabel,
  className,
  children,
  ...props
}: IconButtonProps) {
  const base = [
    'w-16 h-16',
    'rounded-xl',
    'bg-[#FFFFFF0D]',
    'opacity-100',
    'flex items-center justify-center',
    'transition-all',
    'focus:outline-none focus:ring-2 focus:ring-white/30',
  ].join(' ');
  const activeCls = [
    'bg-[#1876D2]',
    'shadow-[0_0_10px_0_#1876D2]',
    'text-white',
  ].join(' ');
  const styles = twMerge(base, isActive ? activeCls : '', className);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
}
