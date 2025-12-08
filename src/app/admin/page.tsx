'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, FileText, Calendar, BarChart3, Settings } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { getRequests, getClubs, getPosts, getEvents } from '@/lib/storage';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAdmin) return null;

  const requests = getRequests();
  const clubs = getClubs();
  const posts = getPosts();
  const events = getEvents();

  const pendingRequests = requests.filter((r) => r.status === 'pending').length;

  const stats = [
    {
      label: 'Pending Requests',
      value: pendingRequests,
      icon: Users,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      href: '/admin/requests',
    },
    {
      label: 'Total Clubs',
      value: clubs.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      href: '#',
    },
    {
      label: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: 'text-success',
      bgColor: 'bg-success/10',
      href: '#',
    },
    {
      label: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'text-info',
      bgColor: 'bg-info/10',
      href: '#',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Requests',
      description: 'Review and process club membership requests',
      icon: Users,
      href: '/admin/requests',
      variant: 'primary' as const,
    },
    {
      title: 'View Analytics',
      description: 'View club activity and engagement metrics',
      icon: BarChart3,
      href: '#',
      variant: 'outline' as const,
      disabled: true,
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences and settings',
      icon: Settings,
      href: '#',
      variant: 'outline' as const,
      disabled: true,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage clubs, requests, and system settings"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card hover className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{stat.value}</p>
                <p className="text-sm text-text-gray">{stat.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-text-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-text-dark">{action.title}</h3>
              </div>
              <p className="text-sm text-text-gray mb-4 flex-1">
                {action.description}
              </p>
              {action.disabled ? (
                <div className="relative">
                  <Button variant="ghost" disabled className="w-full opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-pulse" />
                </div>
              ) : (
                <Link href={action.href}>
                  <Button variant={action.variant} className="w-full">
                    Go to {action.title}
                  </Button>
                </Link>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-text-dark mb-4">Recent Requests</h2>
        <Card>
          <div className="space-y-3">
            {requests.slice(0, 5).map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-text-dark">{request.studentName}</p>
                    <p className="text-sm text-text-gray">
                      {request.type === 'join' ? 'Wants to join' : 'Wants to leave'}{' '}
                      {request.clubName}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    request.status === 'approved'
                      ? 'success'
                      : request.status === 'denied'
                      ? 'danger'
                      : 'warning'
                  }
                >
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
          <Link href="/admin/requests">
            <Button variant="outline" className="w-full mt-4">
              View All Requests
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
