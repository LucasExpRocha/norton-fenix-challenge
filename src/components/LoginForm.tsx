'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormData, loginSchema } from '@/validation/login';

import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import PasswordField from './ui/PasswordField';
import TextField from './ui/TextField';

export default function LoginForm() {
  const router = useRouter();
  const saved =
    typeof window !== 'undefined'
      ? localStorage.getItem('rememberUser') || ''
      : '';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: saved || '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const [remember, setRemember] = useState(Boolean(saved));

  function handleRememberChange(val: boolean) {
    setRemember(val);
    if (typeof window === 'undefined') return;
    if (val) {
      const u = getValues('email') ?? '';
      localStorage.setItem('rememberUser', u);
    } else {
      localStorage.removeItem('rememberUser');
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  });

  return (
    <>
      <h1 className="font-normal text-3xl md:text-4xl text-[#E3E3E3] leading-7 tracking-[0.64px] mb-2.5">
        Login
      </h1>
      <p className="text-[#E3E3E3] font-normal text-sm md:text-xl leading-6 tracking-[0.64px] mb-17">
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
          register={register('email', { required: 'Campo obrigatório' })}
          onChange={(val) => {
            if (remember && typeof window !== 'undefined') {
              localStorage.setItem('rememberUser', val);
            }
          }}
          placeholder="Insira o seu e-mail, CPF ou passaporte"
          autoComplete="username"
          autoFocus
          required
          className="mb-5"
          error={errors.email?.message as string}
        />

        <PasswordField
          id="senha"
          label="Senha"
          register={register('password', { required: 'Campo obrigatório' })}
          placeholder="Sua senha"
          required
          className="mb-5"
          error={errors.password?.message as string}
        />

        <div className="flex items-center justify-between h-16 mt-10">
          <Checkbox
            label="Lembrar meu usuário"
            ariaLabel="Lembrar meu usuário"
            checked={remember}
            onChange={handleRememberChange}
          />
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
            Esqueci minha senha
          </a>
        </div>

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </>
  );
}
