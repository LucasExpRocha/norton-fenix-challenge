import { twMerge } from 'tailwind-merge'

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: string;
  required?: boolean;
  className?: string;
};

export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  autoFocus,
  type = 'text',
  required = true,
  className,
}: TextFieldProps) {
  const hasValue = value && value.length > 0;

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative w-full">
        <div className="w-full rounded-2xl border border-slate-700 bg-[#0E1626] focus-within:border-blue-500 font-normal">
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder={placeholder}
            className="peer w-full bg-transparent font-inter font-normal text-lg leading-[26px] tracking-[0.32px] px-5 py-5 rounded-2xl outline-none placeholder-transparent peer-focus:placeholder-slate-400"
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
        </div>
      </div>

      {placeholder && (
        <span
          id={`${id}-placeholder`}
          className="mt-1 mx-4 block font-inter font-normal text-base leading-5 tracking-[0.51px]"
          aria-live="polite"
        >
          {placeholder}
        </span>
      )}

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
