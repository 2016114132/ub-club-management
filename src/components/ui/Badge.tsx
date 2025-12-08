'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-600 border-gray-200',
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success-dark border-success/20',
    danger: 'bg-danger/10 text-danger-dark border-danger/20',
    warning: 'bg-warning/10 text-yellow-700 border-warning/20',
    info: 'bg-info/10 text-info border-info/20',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
