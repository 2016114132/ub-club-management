'use client';

import { InputHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, indeterminate = false, className = '', id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const internalRef = useRef<HTMLInputElement>(null);
    
    // Handle indeterminate state
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isCheckedOrIndeterminate = checked || indeterminate;

    return (
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-center gap-3 cursor-pointer group ${className}`}
      >
        <div className="relative">
          <input
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
            {...props}
          />
          <div className={`
            w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200
            peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20
            ${isCheckedOrIndeterminate
              ? 'bg-gradient-to-br from-primary to-primary-dark border-primary shadow-sm'
              : 'bg-white border-gray-300 group-hover:border-primary-light'
            }
          `}>
            {indeterminate ? (
              <Minus 
                className="w-3 h-3 text-white transition-all duration-200 opacity-100 scale-100"
                strokeWidth={3} 
              />
            ) : (
              <Check 
                className={`w-3 h-3 text-white transition-all duration-200 ${
                  checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`} 
                strokeWidth={3} 
              />
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium text-text-dark select-none group-hover:text-primary transition-colors duration-200">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
