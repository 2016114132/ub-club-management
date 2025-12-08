'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { initializeData } from '@/lib/storage';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
