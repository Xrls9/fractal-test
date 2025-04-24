import React from "react";

enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
}

interface ButtonProps {
  className?: string;
  label: string;
  onClick: VoidFunction;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  label,
  onClick,
  type = ButtonType.BUTTON,
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
