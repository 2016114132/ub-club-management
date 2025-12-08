'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { Card, Button, Spinner, EmptyState, Badge, Avatar } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { getClubs } from '@/lib/storage';
import type { Club } from '@/types';
import Link from 'next/link';

export default function MyClubsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [myClubs, setMyClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    // Redirect admins to admin dashboard - this is a student-only page
    if (isAdmin) {
      router.push('/admin');
      return;
    }

    const timer = setTimeout(() => {
      const allClubs = getClubs();
      const userClubs = allClubs.filter((club) =>
        user?.clubs.includes(club.id)
      );
      setMyClubs(userClubs);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, user, router]);

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
        title="My Clubs"
        subtitle="Clubs you are a member of"
      />

      {myClubs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No club memberships"
          description="You haven't joined any clubs yet. Explore clubs and find one that interests you!"
          action={{
            label: 'Browse Clubs',
            onClick: () => router.push('/clubs'),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myClubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <Card hover className="flex gap-4 group cursor-pointer">
                <div
                  className="w-20 h-20 rounded-lg shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: club.image }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-dark mb-1 group-hover:text-primary transition-colors">{club.name}</h3>
                  <p className="text-sm text-text-gray mb-2 line-clamp-2">
                    {club.shortDescription}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">Member</Badge>
                    <span className="text-xs text-text-gray">
                      {club.memberCount} members
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
