import { twMerge } from 'tailwind-merge';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-16 rounded-3xl p-6 border border-white/10 bg-white/5 overflow-hidden',
        'bg-linear-[25deg,rgba(255,255,255,0.05),transparent_30%,transparent_70%,rgba(255,255,255,0.05)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
