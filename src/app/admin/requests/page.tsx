'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Card, Spinner, EmptyState, Checkbox, Input } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import {
  RequestRow,
  FilterSidebar,
  ConfirmActionModal,
  BulkActions,
} from '@/components/admin';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { getRequests, updateRequest, getClubs } from '@/lib/storage';
import type { Request } from '@/types';

export default function AdminRequestsPage() {
  const router = useRouter();
  const { isAdmin, isAuthenticated } = useAuth();
  const { success, error } = useToast();

  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filters - updated for checkbox-based filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: 'approve' | 'deny';
    request?: Request;
    isBulk: boolean;
  }>({
    isOpen: false,
    action: 'approve',
    isBulk: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Get clubs for filter dropdown
  const clubs = getClubs();

  useEffect(() => {
    // Redirect non-admins
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(getRequests());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    const filtered = requests.filter((req) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          req.studentName.toLowerCase().includes(query) ||
          req.studentId.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter (multiple selection)
      if (statusFilters.length > 0 && !statusFilters.includes(req.status)) {
        return false;
      }

      // Type filter (multiple selection)
      if (typeFilters.length > 0 && !typeFilters.includes(req.type)) {
        return false;
      }

      // Date range filter
      if (startDate && req.requestDate < startDate) {
        return false;
      }

      if (endDate && req.requestDate > endDate) {
        return false;
      }

      return true;
    });
    
    return filtered;
  }, [requests, searchQuery, statusFilters, typeFilters, startDate, endDate]);

  // Pending requests for bulk selection
  const pendingRequests = filteredRequests.filter((r) => r.status === 'pending');
  const allPendingSelected =
    pendingRequests.length > 0 &&
    pendingRequests.every((r) => selectedIds.has(r.id));
  const somePendingSelected =
    pendingRequests.some((r) => selectedIds.has(r.id)) && !allPendingSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(pendingRequests.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleApprove = (request: Request) => {
    setModalState({
      isOpen: true,
      action: 'approve',
      request,
      isBulk: false,
    });
  };

  const handleDeny = (request: Request) => {
    setModalState({
      isOpen: true,
      action: 'deny',
      request,
      isBulk: false,
    });
  };

  const handleBulkApprove = () => {
    setModalState({
      isOpen: true,
      action: 'approve',
      isBulk: true,
    });
  };

  const handleBulkDeny = () => {
    setModalState({
      isOpen: true,
      action: 'deny',
      isBulk: true,
    });
  };

  const handleConfirmAction = async () => {
    setIsProcessing(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newStatus = modalState.action === 'approve' ? 'approved' : 'denied';

    if (modalState.isBulk) {
      // Update all selected requests
      const updatedRequests = requests.map((req) => {
        if (selectedIds.has(req.id)) {
          const updated = { ...req, status: newStatus as Request['status'] };
          updateRequest(req.id, { status: newStatus as Request['status'] });
          return updated;
        }
        return req;
      });
      setRequests(updatedRequests);
      success(
        `Successfully ${modalState.action}d ${selectedIds.size} request${selectedIds.size > 1 ? 's' : ''}!`
      );
      setSelectedIds(new Set());
    } else if (modalState.request) {
      // Update single request
      const updated = { ...modalState.request, status: newStatus as Request['status'] };
      updateRequest(modalState.request.id, { status: newStatus as Request['status'] });
      setRequests((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      success(`Request ${modalState.action}d successfully!`);
    }

    setIsProcessing(false);
    setModalState({ isOpen: false, action: 'approve', isBulk: false });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilters([]);
    setTypeFilters([]);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Club Requests"
        subtitle="Review and process club membership requests"
      />

      {/* Two Column Layout: Sidebar + Content */}
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <FilterSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilters={statusFilters}
          onStatusChange={setStatusFilters}
          typeFilters={typeFilters}
          onTypeChange={setTypeFilters}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onClearFilters={handleClearFilters}
        />

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedIds.size}
            onApproveAll={handleBulkApprove}
            onDenyAll={handleBulkDeny}
            onClearSelection={() => setSelectedIds(new Set())}
          />

          {/* Requests Table */}
          {filteredRequests.length === 0 ? (
            <EmptyState
              title="No requests found"
              description={
                searchQuery || statusFilters.length > 0 || typeFilters.length > 0 || startDate || endDate
                  ? 'Try adjusting your filters to see more results.'
                  : 'There are no club requests at the moment.'
              }
            />
          ) : (
            <Card padding="none" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={allPendingSelected}
                          indeterminate={somePendingSelected}
                          onChange={(checked) => handleSelectAll(checked)}
                          aria-label="Select all pending requests"
                          disabled={pendingRequests.length === 0}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Requested By
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Club Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Request Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-dark">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <RequestRow
                        key={request.id}
                        request={request}
                        isSelected={selectedIds.has(request.id)}
                        onSelect={handleSelect}
                        onApprove={handleApprove}
                        onDeny={handleDeny}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmActionModal
        isOpen={modalState.isOpen}
        onClose={() =>
          setModalState({ isOpen: false, action: 'approve', isBulk: false })
        }
        onConfirm={handleConfirmAction}
        action={modalState.action}
        request={modalState.request}
        bulkCount={modalState.isBulk ? selectedIds.size : undefined}
        isLoading={isProcessing}
      />
    </div>
  );
}
