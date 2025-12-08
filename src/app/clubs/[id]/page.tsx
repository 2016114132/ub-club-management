'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Users, Calendar, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { Button, Card, Spinner, Badge, Avatar } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import ClubGallery from '@/components/clubs/ClubGallery';
import { getClubs } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import type { Club } from '@/types';

export default function ClubDetailPage() {
  const params = useParams();
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const clubs = getClubs();
      const foundClub = clubs.find((c) => c.id === params.id);
      setClub(foundClub || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!club) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={club.name}
        showBack
        backHref="/clubs"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <ClubGallery images={club.gallery} clubName={club.name} />

          {/* Description */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-text-dark">
                About {club.name}
              </h2>
            </div>
            <p className="text-text-gray whitespace-pre-line leading-relaxed">
              {club.fullDescription}
            </p>
          </Card>

          {/* Projects */}
          {club.projects.length > 0 && (
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-bold text-text-dark mb-5">
                Recent Projects
              </h2>
              <ul className="space-y-3">
                {club.projects.map((project, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-text-dark font-medium">{project}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Card */}
          <Card variant="elevated" padding="lg" className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-text-dark mb-2">
              Interested in joining?
            </h3>
            <p className="text-text-gray text-sm mb-5">
              Become a member and participate in club activities!
            </p>
            <Link href={`/clubs/${club.id}/join`}>
              <Button className="w-full shadow-lg shadow-primary/25">Join This Club</Button>
            </Link>
          </Card>

          {/* Club Info */}
          <Card variant="elevated" padding="lg">
            <h3 className="font-bold text-text-dark mb-5">Club Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-gray">Members</p>
                  <p className="font-semibold text-text-dark">{club.memberCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-gray">Founded</p>
                  <p className="font-semibold text-text-dark">{formatDate(club.createdAt)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Members Preview */}
          {club.members.length > 0 && (
            <Card variant="elevated" padding="lg">
              <h3 className="font-bold text-text-dark mb-5">Members</h3>
              <div className="space-y-4">
                {club.members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <Avatar
                      src={member.avatar}
                      fallback={member.name}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-dark truncate">
                        {member.name}
                      </p>
                      <Badge
                        variant={member.role === 'president' ? 'primary' : 'default'}
                        size="sm"
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                ))}
                {club.members.length > 5 && (
                  <p className="text-sm text-text-gray text-center pt-2 font-medium">
                    +{club.members.length - 5} more members
                  </p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
