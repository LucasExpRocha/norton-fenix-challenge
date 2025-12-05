import React from 'react';
import { twMerge } from 'tailwind-merge';

type AvatarProps = {
  initials: string;
  ariaLabel?: string;
  className?: string;
};

export default function Avatar({
  initials,
  ariaLabel = 'Perfil',
  className,
}: AvatarProps) {
  const styles = twMerge(
    [
      'w-16 h-16',
      'rounded-full',
      'border border-white/20',
      'shadow-[0px_12px_12px_0px_#0000001A,0px_5px_5px_0px_#0000000D]',
      'backdrop-blur-xl',
      'bg-[#1876D2]',
      'bg-[linear-gradient(0deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.05)),_linear-gradient(35.22deg,_rgba(255,255,255,0.1)_33.61%,_#FFFFFF_89.19%)]',
      'text-white',
    ].join(' '),
    className
  );
  return (
    <button type="button" aria-label={ariaLabel} className={styles}>
      <span className="font-medium">{initials}</span>
    </button>
  );
}
