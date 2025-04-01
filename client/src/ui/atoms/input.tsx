import React from "react";

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="form-control"
      placeholder={placeholder}
    />
  );
};

export default Input;
