import Image from 'next/image';

import ActionCardOverlay from '@/components/ActionCardOverlay';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className="min-h-dvh bg-[#0B1125] text-white flex items-center justify-center px-14 py-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,768px)_1fr] gap-16 md:gap-12 justify-start md:ml-10">
        <section className="flex flex-col justify-start max-w-3xl w-full ">
          <div className="mb-40">
            <Image
              src="/svgs/nortus.svg"
              alt="Nortus"
              width={128}
              height={32}
              priority
            />
          </div>
          <LoginForm />
        </section>

        <section className="hidden md:flex items-start justify-start">
          <div
            className="relative w-[934px] h-[951px] rounded-[4rem] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background-login.png')" }}
          >
            <ActionCardOverlay />
          </div>
        </section>
      </div>
    </main>
  );
}
