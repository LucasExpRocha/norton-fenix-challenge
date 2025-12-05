import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { twMerge } from 'tailwind-merge';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  className?: string;
};

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete = 'current-password',
  autoFocus,
  required = true,
  className,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative w-full">
        <div className="w-full rounded-2xl border border-slate-700 bg-[#0E1626] focus-within:border-blue-500 font-normal">
          <input
            id={id}
            name={id}
            type={show ? 'text' : 'password'}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder={placeholder}
            className="peer w-full bg-transparent font-inter font-normal text-lg leading-[26px] tracking-[0.32px] px-5 py-5 pr-14 rounded-2xl outline-none placeholder-transparent peer-focus:placeholder-slate-400"
          />

          <label
            htmlFor={id}
            className={twMerge(
              'absolute left-4 transition-all pointer-events-none',
              hasValue
                ? '-top-2 translate-y-0 z-10 px-1 text-xs'
                : 'top-1/2 -translate-y-1/2',
              'peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:z-10 peer-focus:px-1 peer-focus:text-xs'
            )}
          >
            {label} {required && <span className="text-[#FFB4AB]">*</span>}
          </label>

          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={show}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-slate-300 hover:text-white"
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {error && (
        <span
          id={`${id}-error`}
          className="mt-1 block text-sm text-red-500"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
}
