
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-center">
      <p className="font-semibold">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
