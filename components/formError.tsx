import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-error/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-error">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
