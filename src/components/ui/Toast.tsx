'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import type { ToastType } from '@/types';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type,
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: 'bg-gradient-to-r from-success to-success-light text-white shadow-success/30',
    error: 'bg-gradient-to-r from-danger to-danger-light text-white shadow-danger/30',
    warning: 'bg-gradient-to-r from-warning to-warning-light text-yellow-900 shadow-warning/30',
    info: 'bg-gradient-to-r from-info to-info-light text-white shadow-info/30',
  };

  return (
    <div
      className={`
        flex items-center gap-4 px-5 py-4 rounded-2xl shadow-xl min-w-[320px] max-w-md backdrop-blur-sm
        ${styles[type]}
        ${isExiting ? 'toast-exit' : 'toast-enter'}
      `}
      role="alert"
    >
      <span className="flex-shrink-0 p-1 bg-white/20 rounded-lg">{icons[type]}</span>
      <p className="flex-1 text-sm font-semibold leading-snug">{message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1.5 rounded-xl hover:bg-white/20 transition-colors duration-200"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
