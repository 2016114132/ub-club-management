'use client';

import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  name?: string; // Alias for fallback
  className?: string;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  name,
  className = '',
}: AvatarProps) {
  // Use name as fallback if fallback not provided
  const displayFallback = fallback || name;
  
  const sizes = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color from string with modern gradients
  const getGradientFromString = (str: string) => {
    const gradients = [
      'bg-gradient-to-br from-primary to-primary-light',
      'bg-gradient-to-br from-success to-success-light',
      'bg-gradient-to-br from-info to-info-light',
      'bg-gradient-to-br from-warning to-warning-light',
      'bg-gradient-to-br from-danger to-danger-light',
      'bg-gradient-to-br from-gold to-gold-light',
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-sm ${className}`}
      />
    );
  }

  if (displayFallback) {
    const gradient = getGradientFromString(displayFallback);
    return (
      <div
        className={`${sizes[size]} ${gradient} rounded-full flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white ${className}`}
      >
        {getInitials(displayFallback)}
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-500 shadow-sm ring-2 ring-white ${className}`}
    >
      <User className={iconSizes[size]} />
    </div>
  );
}
