'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    disabled,
    className = '',
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-lg
      transition-all duration-150 ease-out cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-gradient-to-br from-primary to-primary-dark text-white
        hover:from-primary-light hover:to-primary hover:shadow-md
        focus:ring-primary
      `,
      secondary: `
        bg-gradient-to-br from-gray-600 to-gray-700 text-white
        hover:from-gray-500 hover:to-gray-600 hover:shadow-md
        focus:ring-gray-500
      `,
      success: `
        bg-gradient-to-br from-success to-success-dark text-white
        hover:from-success-light hover:to-success hover:shadow-md
        focus:ring-success
      `,
      danger: `
        bg-gradient-to-br from-danger to-danger-dark text-white
        hover:from-danger-light hover:to-danger hover:shadow-md
        focus:ring-danger
      `,
      outline: `
        border-2 border-primary text-primary bg-transparent
        hover:bg-primary hover:text-white hover:shadow-sm
        focus:ring-primary
      `,
      ghost: `
        text-text-gray bg-transparent
        hover:bg-gray-100 hover:text-text-dark
        focus:ring-gray-300 shadow-none
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-2.5 text-lg gap-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
