'use client';

import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { getEvents, getClubs } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function UpcomingEvents() {
  const events = getEvents();
  const clubs = getClubs();

  // Get upcoming events (sorted by date, limited to 3)
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const getClubName = (clubId: string) => {
    return clubs.find((c) => c.id === clubId)?.name || 'Unknown Club';
  };

  return (
    <aside className="w-72 shrink-0">
      <Card variant="elevated" padding="lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-text-dark">Upcoming Events</h3>
        </div>

        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-text-gray">No upcoming events</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Badge variant="primary" size="sm" className="mb-2">
                  {getClubName(event.clubId)}
                </Badge>
                <h4 className="font-medium text-sm text-text-dark mb-1 line-clamp-1">
                  {event.title}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-text-gray">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-gray">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-gray">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/events"
          className="block mt-4 text-sm text-primary hover:text-primary-dark font-medium text-center"
        >
          View all events →
        </Link>
      </Card>
    </aside>
  );
}
