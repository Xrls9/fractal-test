import React from "react";
import Button from "../atoms/Button"; // Usamos el componente Button que definimos previamente

interface ActionOption {
  label: string;
  action: () => void;
}

interface ActionButtonsProps {
  options: ActionOption[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ options }) => {
  const renderButtons = () => {
    return options.map((option, index) => (
      <Button
        key={index}
        label={option.label}
        onClick={option.action}
        className="btn btn-secondary mb-2"
      />
    ));
  };

  return (
    <td>
      <div>{renderButtons()}</div>
    </td>
  );
};

export default ActionButtons;
