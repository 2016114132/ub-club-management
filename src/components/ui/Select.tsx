'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, onChange, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-text-dark mb-2"
          >
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-3 pr-12 border-2 rounded-xl text-text-dark bg-white
              appearance-none cursor-pointer
              transition-all duration-200 ease-out
              focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
              hover:border-gray-300
              disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-text-light
              ${error ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-gray-200'}
              ${className}
            `}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none p-1 rounded-lg bg-gray-100 group-focus-within:bg-primary/10 transition-colors duration-200">
            <ChevronDown className="w-4 h-4 text-text-gray group-focus-within:text-primary transition-colors duration-200" />
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-danger flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
