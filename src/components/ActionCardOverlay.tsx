'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';

import Button from '@/components/ui/Button';

function Container() {
  const [lang, setLang] = useState('pt-br');
  const srcByLang: Record<string, string> = {
    'pt-br': '/svgs/flag-br.svg',
    en: '/svgs/flag-en.svg',
    esp: '/svgs/flag-es.svg',
  };
  const altByLang: Record<string, string> = {
    'pt-br': 'Português (Brasil)',
    en: 'English',
    esp: 'Español',
  };
  return (
    <div
      className="absolute top-0 right-0 z-10 rounded-bl-2xl
      p-4 flex items-center gap-3 bg-[#0B1125] backdrop-blur-md
      before:content-[''] before:absolute before:w-6 before:aspect-square before:bg-no-repeat before:[background:radial-gradient(circle_24px_at_left_bottom,_transparent_98%,_#0B1125)_left_bottom] before:top-0 before:-left-6 
      after:content-[''] after:absolute after:w-6 after:aspect-square after:bg-no-repeat after:[background:radial-gradient(circle_24px_at_left_bottom,_transparent_98%,_#0B1125)_left_bottom] after:right-0 after:-bottom-6"
      aria-label="Ações rápidas"
    >
      <Button fullWidth={false} className="text-sm px-3 py-2 h-[36px]">
        Suporte
      </Button>
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2">
          <Image
            src={srcByLang[lang]}
            alt={`Bandeira ${altByLang[lang]}`}
            width={20}
            height={20}
            className="rounded-full"
            priority
          />
        </span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Selecionar idioma"
          className="text-sm pl-9 pr-8 py-4 bg-[#141a2f] px-4 rounded-4xl  text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
        >
          <option value="pt-br">PT-BR</option>
          <option value="en">EN</option>
          <option value="esp">ESP</option>
        </select>
        <svg
          viewBox="0 0 16 16"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-80 pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function ActionCardOverlay() {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
}
