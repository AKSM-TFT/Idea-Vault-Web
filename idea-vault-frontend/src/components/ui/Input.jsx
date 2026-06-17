import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 resize-y min-h-[100px] ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
