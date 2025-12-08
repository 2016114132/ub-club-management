'use client';

import { Search, Filter } from 'lucide-react';
import { Input, Select, Card } from '@/components/ui';

interface RequestFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  clubFilter: string;
  onClubChange: (value: string) => void;
  clubs: { value: string; label: string }[];
}

export default function RequestFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  clubFilter,
  onClubChange,
  clubs,
}: RequestFiltersProps) {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'denied', label: 'Denied' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'join', label: 'Join Requests' },
    { value: 'leave', label: 'Leave Requests' },
  ];

  const clubOptions = [
    { value: '', label: 'All Clubs' },
    ...clubs,
  ];

  return (
    <Card className="flex flex-wrap items-end gap-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="w-40">
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(value) => onStatusChange(value)}
        />
      </div>

      <div className="w-40">
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => onTypeChange(value)}
        />
      </div>

      <div className="w-48">
        <Select
          options={clubOptions}
          value={clubFilter}
          onChange={(value) => onClubChange(value)}
        />
      </div>
    </Card>
  );
}
