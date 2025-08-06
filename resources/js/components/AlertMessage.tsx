import React from 'react';

interface AlertMessageProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({ type = 'info', message, onClose }: AlertMessageProps) {
  const colors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${colors[type]} relative`}>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          ×
        </button>
      )}
    </div>
  );
}
