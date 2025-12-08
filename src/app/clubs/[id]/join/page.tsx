'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Users, Calendar, Sparkles, Shield, Clock, CheckCircle } from 'lucide-react';
import { Spinner, Card, Avatar } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import JoinForm from '@/components/clubs/JoinForm';
import { getClubs } from '@/lib/storage';
import type { Club } from '@/types';

export default function JoinClubPage() {
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

  const benefits = [
    { icon: Users, text: 'Connect with like-minded students' },
    { icon: Calendar, text: 'Access exclusive events & activities' },
    { icon: Sparkles, text: 'Develop new skills & experiences' },
    { icon: Shield, text: 'Be part of a supportive community' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Join ${club.name}`}
        subtitle="Submit your membership request"
        showBack
        backLabel="Back"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Club Info Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Club Preview Card */}
          <Card className="overflow-hidden">
            <div 
              className="h-32 w-full"
              style={{ background: club.image }}
            />
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-text-dark">{club.name}</h3>
                <p className="text-sm text-text-gray mt-1">{club.shortDescription}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-text-gray">
                  <Users className="w-4 h-4" />
                  <span>{club.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-gray">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {new Date(club.createdAt).getFullYear()}</span>
                </div>
              </div>

              {/* Member Avatars */}
              {club.members && club.members.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-text-light mb-2">Club Leadership</p>
                  <div className="flex flex-wrap gap-2">
                    {club.members.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center gap-2 bg-gray-50 rounded-full pr-3 py-1 pl-1">
                        <Avatar name={member.name} size="sm" />
                        <div className="text-xs">
                          <p className="font-medium text-text-dark">{member.name.split(' ')[0]}</p>
                          <p className="text-text-light">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Benefits Card */}
          <Card>
            <h4 className="font-semibold text-text-dark mb-3">Why Join?</h4>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-text-gray pt-1">{benefit.text}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Process Timeline */}
          <Card>
            <h4 className="font-semibold text-text-dark mb-3">What Happens Next?</h4>
            <div className="relative space-y-4 pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200" />
              
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">Submit Request</p>
                  <p className="text-xs text-text-light">Fill out the form with your details</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                  <Clock className="w-2.5 h-2.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">Review Period</p>
                  <p className="text-xs text-text-light">2-3 business days for processing</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">Get Approved</p>
                  <p className="text-xs text-text-light">Receive confirmation via email</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Join Form */}
        <div className="lg:col-span-3">
          <JoinForm club={club} />
        </div>
      </div>
    </div>
  );
}
