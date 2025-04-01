import React from "react";

import Button from "../atoms/Button";

interface ActionOption {
  label: string;
  action: () => void;
  className: string;
}

interface AlertModalProps {
  show: boolean;
  message: string;
  option: ActionOption;
}

const AlertModal: React.FC<AlertModalProps> = ({ show, message, option }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90">
      <div className="rounded-lg border border-grey shadow-lg p-6 w-96">
        <div className="flex justify-between items-center pb-2">
          <h5 className="text-2xl font-semibold w-full text-center">Alert</h5>
        </div>
        <div className="py-4">
          <p className="font-semibold text-left py-3">{message}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            label={option.label}
            onClick={option.action}
            className={
              option.className + "flex py-2 px-1 justify-center w-full"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
