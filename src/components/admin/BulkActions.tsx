'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';

interface BulkActionsProps {
  selectedCount: number;
  onApproveAll: () => void;
  onDenyAll: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedCount,
  onApproveAll,
  onDenyAll,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <Card className="flex items-center justify-between bg-primary/5 border-primary/20">
      <div className="flex items-center gap-4">
        <span className="font-medium text-text-dark">
          {selectedCount} request{selectedCount > 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-sm text-primary hover:underline"
        >
          Clear selection
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="success"
          onClick={onApproveAll}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Approve All
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={onDenyAll}
        >
          <XCircle className="w-4 h-4 mr-1" />
          Deny All
        </Button>
      </div>
    </Card>
  );
}
