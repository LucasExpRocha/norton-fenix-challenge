import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { ActionCardOverlay } from '@/components/ActionCardOverlay';
import LoginForm from '@/components/LoginForm';

export default async function Login() {
  const store = await cookies();
  const token = store.get('access_token')?.value;
  if (token) redirect('/dashboard');
  return (
    <main className="min-h-dvh bg-[#0B1125] text-white flex items-center justify-center px-14 py-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,768px)_1fr] gap-16 md:gap-12 justify-start md:ml-10">
        <section className="flex flex-col justify-start max-w-3xl w-full min-w-80">
          <div className="mb-40">
            <div>
              <Image
                src="/svgs/nortus.svg"
                alt="Nortus"
                width={128}
                height={32}
                priority
              />
              <div className="md:hidden">
                <ActionCardOverlay />
              </div>
            </div>
          </div>
          <LoginForm />
        </section>

        <section className="hidden md:flex items-start justify-start min-w-72">
          <div
            className="relative w-full h-[85vh] rounded-[4rem] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background-login.png')" }}
          >
            <ActionCardOverlay />
          </div>
        </section>
      </div>
    </main>
  );
}
