'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  headerColor?: 'default' | 'success' | 'danger';
  headerIcon?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  headerColor = 'default',
  headerIcon,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  const headerColors = {
    default: 'bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 text-text-dark',
    success: 'bg-success/10 border-b border-success/20 text-success-dark',
    danger: 'bg-danger/10 border-b border-danger/20 text-danger-dark',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`${sizes[size]} w-full bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        style={{
          animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {title && (
          <div className={`px-6 py-5 flex items-center justify-between ${headerColors[headerColor]}`}>
            <div className="flex items-center gap-3">
              {headerIcon && (
                <span className={`p-2 rounded-xl ${
                  headerColor === 'default' ? 'bg-primary/10 text-primary' 
                  : headerColor === 'success' ? 'bg-success/20 text-success'
                  : 'bg-danger/20 text-danger'
                }`}>
                  {headerIcon}
                </span>
              )}
              <h2 id="modal-title" className="text-xl font-bold">
                {title}
              </h2>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  headerColor === 'default'
                    ? 'hover:bg-gray-100 text-text-gray hover:text-text-dark'
                    : headerColor === 'success'
                    ? 'hover:bg-success/20 text-success-dark'
                    : 'hover:bg-danger/20 text-danger-dark'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
