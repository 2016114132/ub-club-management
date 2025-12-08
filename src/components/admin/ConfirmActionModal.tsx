'use client';

import { CheckCircle, XCircle, AlertTriangle, UserCheck, UserX } from 'lucide-react';
import { Modal, Button } from '@/components/ui';
import type { Request } from '@/types';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'approve' | 'deny';
  request?: Request;
  bulkCount?: number;
  isLoading?: boolean;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  request,
  bulkCount,
  isLoading,
}: ConfirmActionModalProps) {
  const isApprove = action === 'approve';
  const isBulk = bulkCount !== undefined && bulkCount > 0;

  const Icon = isApprove ? UserCheck : UserX;
  const iconColor = isApprove ? 'text-success' : 'text-danger';
  const bgColor = isApprove ? 'bg-success/10' : 'bg-danger/10';
  const borderColor = isApprove ? 'border-success/30' : 'border-danger/30';

  const title = isBulk
    ? `${isApprove ? 'Approve' : 'Deny'} ${bulkCount} Request${bulkCount > 1 ? 's' : ''}`
    : `${isApprove ? 'Approve' : 'Deny'} Request`;

  const message = isBulk
    ? `Are you sure you want to ${action} ${bulkCount} selected request${bulkCount > 1 ? 's' : ''}?`
    : `Are you sure you want to ${action} this membership request?`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      headerColor={isApprove ? 'success' : 'danger'}
      headerIcon={<Icon className="w-5 h-5" />}
    >
      <div className="space-y-4">
        {/* Request details card (for single request) */}
        {!isBulk && request && (
          <div className={`p-4 rounded-xl ${bgColor} border ${borderColor}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${isApprove ? 'bg-success/20' : 'bg-danger/20'} flex items-center justify-center`}>
                <span className="text-lg font-bold text-text-dark">
                  {request.studentName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-text-dark">{request.studentName}</p>
                <p className="text-sm text-text-gray">
                  {request.type === 'join' ? 'Wants to join' : 'Requesting'} <span className="font-medium">{request.clubName}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bulk action message */}
        {isBulk && (
          <div className={`p-4 rounded-xl ${bgColor} border ${borderColor} text-center`}>
            <div className={`w-12 h-12 mx-auto rounded-full ${isApprove ? 'bg-success/20' : 'bg-danger/20'} flex items-center justify-center mb-2`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <p className="text-text-dark font-medium">{message}</p>
          </div>
        )}

        {/* Single request confirmation message */}
        {!isBulk && (
          <p className="text-text-gray text-center text-sm">{message}</p>
        )}

        {/* Warning for deny action */}
        {!isApprove && (
          <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-text-dark">
              The student{isBulk && 's'} will be notified that their request{isBulk && 's'} ha{isBulk ? 've' : 's'} been denied.
            </p>
          </div>
        )}

        {/* Success note for approve action */}
        {isApprove && (
          <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <p className="text-sm text-text-dark">
              The student{isBulk && 's'} will be added to the club and notified of their approval.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant={isApprove ? 'success' : 'danger'}
            onClick={onConfirm}
            loading={isLoading}
            className="flex-1"
          >
            {isApprove ? 'Approve' : 'Deny'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
