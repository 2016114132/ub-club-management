'use client';

import { Search, X, Calendar } from 'lucide-react';
import { Input, Card, Checkbox, Button } from '@/components/ui';

interface FilterSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilters: string[];
  onStatusChange: (statuses: string[]) => void;
  typeFilters: string[];
  onTypeChange: (types: string[]) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  searchQuery,
  onSearchChange,
  statusFilters,
  onStatusChange,
  typeFilters,
  onTypeChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onClearFilters,
}: FilterSidebarProps) {
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'denied', label: 'Denied' },
  ];

  const typeOptions = [
    { value: 'join', label: 'Join Club' },
    { value: 'create', label: 'Create Club' },
    { value: 'update', label: 'Update Club' },
  ];

  const handleStatusToggle = (status: string) => {
    if (statusFilters.includes(status)) {
      onStatusChange(statusFilters.filter((s) => s !== status));
    } else {
      onStatusChange([...statusFilters, status]);
    }
  };

  const handleTypeToggle = (type: string) => {
    if (typeFilters.includes(type)) {
      onTypeChange(typeFilters.filter((t) => t !== type));
    } else {
      onTypeChange([...typeFilters, type]);
    }
  };

  const hasActiveFilters =
    statusFilters.length > 0 ||
    typeFilters.length > 0 ||
    startDate ||
    endDate ||
    searchQuery;

  return (
    <Card variant="elevated" className="w-64 shrink-0 p-4 space-y-6">
      {/* Search */}
      <div>
        <Input
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Request Type */}
      <div>
        <h3 className="text-sm font-semibold text-text-dark mb-3">Request Type</h3>
        <div className="space-y-2">
          {typeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={typeFilters.includes(option.value)}
                onChange={() => handleTypeToggle(option.value)}
              />
              <span className="text-sm text-text-gray">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-sm font-semibold text-text-dark mb-3">Status</h3>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={statusFilters.includes(option.value)}
                onChange={() => handleStatusToggle(option.value)}
              />
              <span className="text-sm text-text-gray">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <h3 className="text-sm font-semibold text-text-dark mb-3">Date Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-text-gray mb-1 block">Start Date</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-text-gray mb-1 block">End Date</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onClearFilters}
        >
          <X className="w-4 h-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </Card>
  );
}
