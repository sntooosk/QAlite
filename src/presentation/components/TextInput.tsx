import { ChangeEvent } from 'react';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export const TextInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder
}: TextInputProps) => (
  <label htmlFor={id} className="flex flex-col gap-1 text-sm font-medium text-slate-700">
    {label}
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="rounded border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  </label>
);
