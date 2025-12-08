'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, EmptyState, Badge } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { Mail } from 'lucide-react';

export default function InvitesPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    // Redirect admins - this is a student-only page
    if (isAdmin) {
      router.push('/admin');
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  // Placeholder - no actual invites in the prototype
  const invites: never[] = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Club Invites"
        subtitle="Invitations to join clubs"
      />

      {invites.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No pending invites"
          description="You don't have any club invitations at the moment. When a club officer invites you to join, it will appear here."
        />
      ) : (
        <div className="space-y-4">
          {/* Invites would render here */}
        </div>
      )}
    </div>
  );
}
