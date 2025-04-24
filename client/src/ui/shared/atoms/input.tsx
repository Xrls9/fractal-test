import React from "react";

interface InputProps {
  className?: string;
  disabled?: boolean;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value: string | number;
}

const Input: React.FC<InputProps> = ({
  className = "",
  disabled = false,
  name = "",
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
