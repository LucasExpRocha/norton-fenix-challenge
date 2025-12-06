import React from 'react';
import { twMerge } from 'tailwind-merge';

type TitleProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'default' | 'h1' | 'h2' | 'subtitle';
  as?: keyof React.JSX.IntrinsicElements;
};

export default function Title({
  children,
  className,
  variant = 'default',
  as = 'h1',
  ...props
}: TitleProps) {
  const variants: Record<NonNullable<TitleProps['variant']>, string> = {
    default: [
      'text-[20px]',
      'leading-[16px]',
      'tracking-normal',
      'font-bold',
    ].join(' '),
    h1: [
      'text-3xl',
      'md:text-4xl',
      'leading-7',
      'tracking-[0.64px]',
      'font-normal',
    ].join(' '),
    h2: [
      'text-[20px]',
      'leading-[16px]',
      'tracking-normal',
      'font-semibold',
    ].join(' '),
    subtitle: [
      'text-base',
      'leading-5',
      'tracking-normal',
      'font-medium',
      'opacity-80',
    ].join(' '),
  };

  const styles = twMerge(variants[variant], className);
  const Component = as as React.ElementType;
  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
}
