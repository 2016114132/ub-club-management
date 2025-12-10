'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ArrowRight } from 'lucide-react';
import { Card, Button, Spinner, EmptyState, Badge } from '@/components/ui';
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
        subtitle={`You're a member of ${myClubs.length} ${myClubs.length === 1 ? 'club' : 'clubs'}`}
      />

      {myClubs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No club memberships"
          description="You haven't joined any clubs yet. Explore clubs and find one that interests you!"
          action={{
            label: 'Explore Clubs',
            onClick: () => router.push('/clubs'),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myClubs.map((club, index) => (
            <div 
              key={club.id} 
              className="stagger-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Card padding="none" className="overflow-hidden flex flex-col h-full">
                {/* Club Image */}
                <div 
                  className="relative h-40 w-full overflow-hidden"
                  role="img"
                  aria-label={`${club.name} club banner`}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: club.image }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  {/* Member badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" size="sm" className="bg-white/95 backdrop-blur-md text-primary border-0 shadow-lg">
                      Member
                    </Badge>
                  </div>
                  
                  {/* Member count badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-text-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    <Users className="w-3.5 h-3.5" />
                    <span>{club.memberCount}</span>
                  </div>
                </div>

                {/* Club Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-base text-text-dark mb-2 line-clamp-1">
                    {club.name}
                  </h3>
                  <p className="text-text-gray text-sm flex-1 mb-4 leading-relaxed line-clamp-2">
                    {club.shortDescription}
                  </p>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100">
                    <Link href={`/clubs/${club.id}?from=my-clubs`}>
                      <Button size="sm" className="w-full">
                        View Club
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
