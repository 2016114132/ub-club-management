'use client';

import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full border-4 border-primary/20`} />
        <Loader2
          className={`absolute inset-0 animate-spin text-primary ${sizes[size]} ${className}`}
          style={{ animationDuration: '0.8s' }}
        />
      </div>
    </div>
  );
}
