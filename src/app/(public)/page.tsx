'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ActionCardOverlay from '@/components/ActionCardOverlay';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import PasswordField from '@/components/ui/PasswordField';
import TextField from '@/components/ui/TextField';
import { userSchema } from '@/validation/login';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    user?: string;
    password?: string;
    auth?: string;
  }>({});

  useEffect(() => {
    const saved = localStorage.getItem('rememberUser');
    if (saved) {
      setUser(saved);
      setRemember(true);
    }
  }, []);

  const canSubmit = useMemo(() => {
    const u = userSchema.safeParse(user).success;
    return u && !loading;
  }, [user, loading]);

  function handleUserChange(val: string) {
    setUser(val);
    if (remember) localStorage.setItem('rememberUser', val);
  }

  function handlePasswordChange(val: string) {
    setPassword(val);
  }

  function handleRememberChange(val: boolean) {
    setRemember(val);
    if (val) localStorage.setItem('rememberUser', user);
    else localStorage.removeItem('rememberUser');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const u = userSchema.safeParse(user);
    setErrors({
      user: u.success ? undefined : u.error.issues[0].message,
      auth: undefined,
    });
    if (!u.success) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      router.push('/dashboard');
    } catch {
      setErrors((e) => ({ ...e, auth: 'Erro na autenticação' }));
    } finally {
      setLoading(false);
    }
  }

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
          <h1 className="font-normal text-4xl text-[#E3E3E3] leading-[30.54px] tracking-[0.64px] mb-2.5">
            Login
          </h1>
          <p className="text-[#E3E3E3] font-normal text-[20px] leading-[30.54px] tracking-[0.64px] mb-17">
            Entre com suas credenciais para acessar a sua conta.
          </p>

          <form
            onSubmit={onSubmit}
            className="space-y-4"
            aria-label="Formulário de login"
          >
            <TextField
              id="usuario"
              label="Usuário"
              value={user}
              onChange={handleUserChange}
              placeholder="Insira o seu e-mail, CPF ou passaporte"
              error={errors.user}
              autoComplete="username"
              autoFocus
              required
              className="mb-5"
            />

            <PasswordField
              id="senha"
              label="Senha"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Sua senha"
              error={errors.password}
              required
              className="mb-5"
            />

            <div className="flex items-center justify-between h-16 mt-10">
              <Checkbox
                checked={remember}
                onChange={handleRememberChange}
                label="Lembrar meu usuário"
                ariaLabel="Lembrar meu usuário"
              />
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Esqueci minha senha
              </a>
            </div>

            <Button type="submit" disabled={!canSubmit}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
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
