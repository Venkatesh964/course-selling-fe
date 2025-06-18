import { type ChangeEvent } from "react";

interface inputProps {
  placeholder: string;
  type: string;
  id: string;
  name: string;
  className: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  placeholder,
  type,
  className,
  value,
  id,
  name,
  onChange,
}: inputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
