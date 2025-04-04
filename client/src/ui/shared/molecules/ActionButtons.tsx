import React from "react";
import Button from "../atoms/Button";

interface ActionOption {
  label: string;
  action: () => void;
  className: string;
}

interface ActionButtonsProps {
  options: ActionOption[];
  className: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  options,
  className = "",
}) => {
  const renderButtons = () => {
    return options.map((option, index) => (
      <Button
        key={index}
        label={option.label}
        onClick={option.action}
        className={option.className}
      />
    ));
  };

  return <div className={className}>{renderButtons()}</div>;
};

export default ActionButtons;
