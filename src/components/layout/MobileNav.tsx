'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, Search, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/clubs', label: 'Explore', icon: Search },
  { href: '/my-clubs', label: 'My Clubs', icon: Users },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/profile', label: 'Profile', icon: User },
];

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/requests', label: 'Requests', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();

  // Don't show mobile nav if not authenticated
  if (!isAuthenticated) return null;

  const items = isAdmin ? adminNavItems : navItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== '/feed' && item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-text-gray hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
