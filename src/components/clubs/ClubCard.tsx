'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import type { Club } from '@/types';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
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
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link 
            href={`/clubs/${club.id}`} 
            className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 group transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href={`/clubs/${club.id}/join`}>
            <Button size="sm">
              Join
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
