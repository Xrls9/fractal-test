import React from "react";
import Button from "../atoms/Button";

interface ActionOption {
  action: VoidFunction;
  className: string;
  label: string;
}

interface ActionButtonsProps {
  className: string;
  options: ActionOption[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  className = "",
  options,
}) => {
  return (
    <div className={className}>
      {options.map((option, index) => (
        <Button
          key={index}
          label={option.label}
          onClick={option.action}
          className={option.className}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
