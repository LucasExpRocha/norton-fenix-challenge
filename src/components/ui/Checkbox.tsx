'use client';

import { twMerge } from 'tailwind-merge';

type RHFRegister = {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.RefCallback<HTMLInputElement>;
};

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  ariaLabel?: string;
  className?: string;
  id?: string;
  register?: RHFRegister;
};

export default function Checkbox({
  checked,
  onChange,
  label,
  ariaLabel,
  className,
  id,
  register,
}: CheckboxProps) {
  const inputName = register?.name ?? id ?? label;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register?.onChange?.(e);
    onChange?.(e.target.checked);
  };
  return (
    <label
      className={twMerge(
        'inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none',
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        {...register}
        id={id}
        name={inputName}
        onChange={handleChange}
        aria-label={ariaLabel ?? label}
        className={twMerge(
          [
            'appearance-none',
            'w-[22px] h-[22px]',
            'rounded-[5px]',
            'border border-slate-600',
            'bg-[#0E1626]',
            'relative',
            'transition-colors',
            'checked:bg-[#c7dd65]',
            'checked:border-[#c7dd65]',
            "after:content-['']",
            "checked:after:content-['✓']",
            'after:absolute',
            'after:inset-0',
            'after:flex',
            'after:items-center',
            'after:justify-center',
            'after:text-[#0e1626]',
            'after:text-[16px]',
          ].join(' ')
        )}
      />
      {label}
    </label>
  );
}
