'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Card, Button, Spinner, EmptyState, Badge } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { getEvents, getClubs } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allEvents = getEvents();
      // Sort by date ascending
      allEvents.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(allEvents);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const clubs = getClubs();
  const getClubName = (clubId: string) => {
    return clubs.find((c) => c.id === clubId)?.name || 'Unknown Club';
  };

  const isUpcoming = (date: string) => {
    return new Date(date) >= new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const upcomingEvents = events.filter((e) => isUpcoming(e.date));
  const pastEvents = events.filter((e) => !isUpcoming(e.date));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        subtitle="Upcoming club events and activities"
      />

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events scheduled"
          description="There are no club events at the moment. Check back later!"
        />
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text-dark">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} hover className="flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="primary">{getClubName(event.clubId)}</Badge>
                      <Badge variant="success" size="sm">Upcoming</Badge>
                    </div>
                    <h3 className="font-semibold text-text-dark mb-2">{event.title}</h3>
                    <p className="text-sm text-text-gray mb-4 flex-1">{event.description}</p>
                    <div className="space-y-2 text-sm text-text-gray">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <div className="relative group">
                      <Button className="mt-4 w-full" size="sm" disabled>
                        RSVP
                      </Button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        RSVP coming soon
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text-dark">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="flex flex-col opacity-75">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="default">{getClubName(event.clubId)}</Badge>
                      <Badge variant="default" size="sm">Past</Badge>
                    </div>
                    <h3 className="font-semibold text-text-dark mb-2">{event.title}</h3>
                    <p className="text-sm text-text-gray mb-4 flex-1">{event.description}</p>
                    <div className="space-y-2 text-sm text-text-gray">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
