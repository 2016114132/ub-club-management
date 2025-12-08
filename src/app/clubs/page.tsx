'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input, Spinner, EmptyState } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import ClubCard from '@/components/clubs/ClubCard';
import { getClubs } from '@/lib/storage';
import type { Club } from '@/types';

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setClubs(getClubs());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discover Clubs"
        subtitle="Find and join clubs that match your interests and passions"
      />

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-lg">
          <Input
            placeholder="Search clubs by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        {filteredClubs.length > 0 && (
          <div className="flex items-center gap-2 text-text-gray px-3 py-1.5 bg-gray-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'}
            </span>
          </div>
        )}
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <EmptyState
          title="No clubs found"
          description={
            searchQuery
              ? `No clubs match "${searchQuery}". Try a different search term.`
              : 'There are no clubs available at the moment.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClubs.map((club, index) => (
            <div 
              key={club.id} 
              className="stagger-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ClubCard club={club} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
