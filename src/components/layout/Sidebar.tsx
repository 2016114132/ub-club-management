'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Search, ChevronRight, Sparkles } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { getClubs } from '@/lib/storage';

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAuth();
  
  const allClubs = getClubs();
  const userClubs = allClubs.filter((club) => user?.clubs.includes(club.id));

  return (
    <aside className="w-64 flex-shrink-0 space-y-4">
      {/* My Clubs Section */}
      <Card padding="sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-text-dark text-sm">My Clubs</h3>
          <Link 
            href="/my-clubs" 
            className="text-xs text-primary hover:text-primary-dark font-medium"
          >
            View all
          </Link>
        </div>
        
        {userClubs.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-xs text-text-gray mb-2">You haven't joined any clubs yet</p>
            <Button size="sm" variant="outline" onClick={() => router.push('/clubs')}>
              <Search className="w-3 h-3 mr-1" />
              Explore
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {userClubs.map((club) => (
              <Link
                key={club.id}
                href={`/clubs/${club.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div 
                  className="w-8 h-8 rounded-lg shrink-0"
                  style={{ background: club.image }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-dark truncate group-hover:text-primary transition-colors">
                    {club.name}
                  </p>
                  <p className="text-xs text-text-light">{club.memberCount} members</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <Card padding="sm">
        <h3 className="font-semibold text-text-dark text-sm mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Link
            href="/clubs"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-text-dark">Explore Clubs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-light group-hover:text-primary transition-colors" />
          </Link>
          
          <Link
            href="/events"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-info" />
              </div>
              <span className="text-sm text-text-dark">Browse Events</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-light group-hover:text-info transition-colors" />
          </Link>
        </div>
      </Card>

      {/* Join More Clubs CTA */}
      {userClubs.length > 0 && userClubs.length < 5 && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-dark">Discover more!</p>
              <p className="text-xs text-text-gray mt-0.5 mb-2">
                Join more clubs to see more content in your feed.
              </p>
              <Link 
                href="/clubs"
                className="text-xs font-semibold text-primary hover:text-primary-dark"
              >
                Explore clubs →
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
