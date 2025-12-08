'use client';

import { Avatar, Badge, Checkbox, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import type { Request } from '@/types';

interface RequestRowProps {
  request: Request;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onApprove: (request: Request) => void;
  onDeny: (request: Request) => void;
}

export default function RequestRow({
  request,
  isSelected,
  onSelect,
  onApprove,
  onDeny,
}: RequestRowProps) {
  const getStatusVariant = (status: Request['status']) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'denied':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <td className="px-4 py-3">
        {request.status === 'pending' && (
          <Checkbox
            checked={isSelected}
            onChange={(checked) => onSelect(request.id, checked)}
            aria-label={`Select request from ${request.studentName}`}
          />
        )}
      </td>

      {/* Student */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={request.studentAvatar}
            name={request.studentName}
            size="sm"
          />
          <div>
            <p className="font-medium text-text-dark">{request.studentName}</p>
            <p className="text-sm text-text-gray">{request.studentId}</p>
          </div>
        </div>
      </td>

      {/* Club */}
      <td className="px-4 py-3">
        <span className="text-text-dark">{request.clubName}</span>
      </td>

      {/* Request Type */}
      <td className="px-4 py-3">
        <Badge variant={request.type === 'join' ? 'primary' : 'info'}>
          {request.type === 'join' ? 'Join' : 'Leave'}
        </Badge>
      </td>

      {/* Request Date */}
      <td className="px-4 py-3">
        <span className="text-text-gray">{formatDate(request.requestDate)}</span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <Badge variant={getStatusVariant(request.status)}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        {request.status === 'pending' ? (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => onApprove(request)}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDeny(request)}
            >
              Deny
            </Button>
          </div>
        ) : (
          <span className="text-sm text-text-gray">—</span>
        )}
      </td>
    </tr>
  );
}
