'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, IdCard, Calendar, Shield } from 'lucide-react';
import { Card, Avatar, Badge, Button } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { getClubs } from '@/lib/storage';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const clubs = getClubs();
  const userClubs = clubs.filter((club) => user.clubs.includes(club.id));

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="text-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar src={user.avatar} name={user.name} size="xl" />
            <div>
              <h2 className="text-2xl font-semibold text-text-dark">{user.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant={isAdmin ? 'danger' : 'primary'}>
                  {isAdmin ? 'Administrator' : 'Student'}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card>
          <h3 className="font-semibold text-text-dark mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-gray">Full Name</p>
                <p className="font-medium text-text-dark">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-gray">Email</p>
                <p className="font-medium text-text-dark">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IdCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-gray">Student ID</p>
                <p className="font-medium text-text-dark">{user.studentId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-gray">Member Since</p>
                <p className="font-medium text-text-dark">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-gray">Role</p>
                <p className="font-medium text-text-dark capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Club Memberships */}
        <Card>
          <h3 className="font-semibold text-text-dark mb-4">
            Club Memberships ({userClubs.length})
          </h3>
          {userClubs.length === 0 ? (
            <p className="text-text-gray text-sm">No club memberships yet.</p>
          ) : (
            <div className="space-y-3">
              {userClubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0"
                    style={{ background: club.image }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-dark">{club.name}</p>
                    <p className="text-sm text-text-gray truncate">
                      {club.shortDescription}
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    Member
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Actions */}
        <Card className="flex gap-3">
          <Button variant="outline" className="flex-1" disabled>
            Edit Profile
          </Button>
          <Button variant="outline" className="flex-1" disabled>
            Change Password
          </Button>
        </Card>

        <p className="text-center text-sm text-text-gray">
          Profile editing is disabled in this prototype.
        </p>
      </div>
    </div>
  );
}
