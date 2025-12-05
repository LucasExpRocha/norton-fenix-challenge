'use client';

import { twMerge } from 'tailwind-merge';

type CheckboxProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  ariaLabel?: string;
  className?: string;
};

export default function Checkbox({ checked, onChange, label, ariaLabel, className }: CheckboxProps) {
  return (
    <label className={twMerge('inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel ?? label}
        className="
          appearance-none
          w-[22px] h-[22px]
          rounded-[5px]
          border border-slate-600
          bg-[#0E1626]
          relative
          transition-colors

          checked:bg-[#c7dd65]
          checked:border-[#c7dd65]

          after:content-['']
          checked:after:content-['✓']
          after:absolute
          after:inset-0
          after:flex
          after:items-center
          after:justify-center
          after:text-[#0e1626]
          after:text-[16px]
        "
      />
      {label}
    </label>
  );
}
