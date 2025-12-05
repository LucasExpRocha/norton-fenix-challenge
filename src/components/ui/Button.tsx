import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export default function Button({
  fullWidth = true,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-2 md:px-5 font-medium transition-colors';
  const width = fullWidth ? 'w-full' : '';
  const pattern = [
    'text-white',
    'text-center',
    'align-middle',
    'text-[18px]',
    'leading-[26px]',
    'tracking-[0.13px]',
    'h-[48px] md:h-[68px]',
    'bg-[#1876D2]',
    'bg-[linear-gradient(0deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.05)),_linear-gradient(35.22deg,_rgba(255,255,255,0.1)_33.61%,_#FFFFFF_89.19%)]',
    'backdrop-blur-xl',
    'shadow-[0px_12.72px_12.72px_0px_#0000001A,0px_5.09px_5.09px_0px_#0000000D,0px_1.27px_0px_0px_#0000000D]',
    'border-[1.27px] border-solid border-white/20',
  ].join(' ');
  const disabledStyles = 'bg-slate-700 cursor-not-allowed';
  const styles = twMerge(
    base,
    width,
    pattern,
    disabled ? disabledStyles : '',
    className
  );
  return (
    <button disabled={disabled} className={styles} {...props}>
      {children}
    </button>
  );
}
