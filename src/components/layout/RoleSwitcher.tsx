'use client';

import { RotateCcw } from 'lucide-react';
import { resetData } from '@/lib/storage';

export default function ResetDataButton() {
  const handleResetData = () => {
    if (confirm('Reset all app data to defaults? This will clear all your changes.')) {
      resetData();
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleResetData}
        className="flex items-center gap-1.5 bg-white rounded-lg shadow-lg border border-border px-3 py-1.5 hover:shadow-xl transition-all text-xs text-text-gray hover:text-danger"
        title="Reset all data to defaults"
      >
        <RotateCcw className="w-3 h-3" />
        Reset Data
      </button>
    </div>
  );
}
