import { twMerge } from 'tailwind-merge';

type RHFRegister = {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.RefCallback<HTMLInputElement>;
};

type TextFieldProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: string;
  required?: boolean;
  className?: string;
  register?: RHFRegister;
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
  register,
}: TextFieldProps) {
  const inputName = register?.name ?? id;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register?.onChange?.(e);
    onChange?.(e.target.value);
  };

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative w-full">
        <div className="w-full rounded-2xl border border-slate-700 bg-[#0E1626] focus-within:border-blue-500 font-normal">
          <input
            {...register}
            id={id}
            name={inputName}
            type={type}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder={placeholder}
            className={twMerge(
              'peer w-full bg-transparent font-inter font-normal',
              'text-lg md:leading-7 tracking-[0.32px] py-2 px-5 md:py-5 rounded-2xl',
              'outline-none placeholder-transparent peer-focus:placeholder-slate-400'
            )}
          />

          <label
            htmlFor={id}
            className={twMerge(
              'absolute left-4 transition-all pointer-events-none',
              'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
              'peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:z-10 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs',
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
          className="mt-1 mx-4 block font-inter font-normal leading-5 tracking-[0.51px] text-sm text-red-500"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
}
