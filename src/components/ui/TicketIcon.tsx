import Image from 'next/image';

export function SvgIcon({
  className,
  size = 24,
  src,
  alt,
}: {
  className?: string;
  size?: number;
  src: string;
  alt: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function createIcon(src: string, alt: string) {
  return function Icon({ className }: { className?: string }) {
    return <SvgIcon src={src} alt={alt} className={className} />;
  };
}
