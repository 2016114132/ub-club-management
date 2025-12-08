'use client';

import { LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      {Icon && (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 shadow-sm">
          <Icon className="w-10 h-10 text-primary" />
        </div>
      )}
      <h3 className="text-xl font-bold text-text-dark mb-3">{title}</h3>
      {description && (
        <p className="text-text-gray max-w-md mb-6 leading-relaxed">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="shadow-lg shadow-primary/20">
          {action.label}
        </Button>
      )}
    </div>
  );
}
