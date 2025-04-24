import React from "react";

import Button from "../atoms/Button";

interface ConfirmationModalProps {
  message: string;
  onAccept: VoidFunction;
  onCancel: VoidFunction;
  show: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onAccept,
  onCancel,
  show,
}) => {
  if (!show) return null;

  return (
    <div className="flex justify-center mt-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/90">
        <div className="rounded-lg border border-grey shadow-lg p-6 w-96">
          <div className="flex justify-between items-center pb-2">
            <h5 className="text-2xl font-semibold w-full text-center">
              Confirmation
            </h5>
          </div>
          <div className="py-4">
            <p className="font-semibold text-left py-3">{message}</p>
          </div>
          <div className="flex gap-[10px] justify-center">
            <Button
              label="Ok"
              className="!bg-blue-500 hover:!bg-blue-700"
              onClick={onAccept}
            />
            <Button
              label="Cancel"
              className="!bg-red-500 hover:!bg-red-700"
              onClick={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
