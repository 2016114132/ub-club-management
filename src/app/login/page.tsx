'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Shield } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(isAdmin ? '/admin' : '/feed');
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleLogin = (role: 'student' | 'admin') => {
    login(role);
    router.push(role === 'admin' ? '/admin' : '/feed');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image 
              src="/ubcms-logo.png" 
              alt="UBCMS Logo" 
              width={280} 
              height={93}
              className="w-auto h-24 mx-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-text-dark mb-2">Welcome to UB Clubs</h1>
          <p className="text-text-gray">Select a role to explore the demo</p>
        </div>

        <Card variant="elevated" padding="lg" className="space-y-4">
          <p className="text-sm text-text-gray text-center mb-2">
            This is a prototype demo. Choose a role to log in:
          </p>

          <button
            onClick={() => handleLogin('student')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-text-dark">Student</p>
              <p className="text-sm text-text-gray">Browse clubs, join, and create posts</p>
            </div>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-info hover:bg-info/5 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
              <Shield className="w-6 h-6 text-info" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-text-dark">Administrator</p>
              <p className="text-sm text-text-gray">Manage requests and club settings</p>
            </div>
          </button>

          <p className="text-xs text-text-light text-center pt-2">
            Log out from the profile menu to switch roles.
          </p>
        </Card>
      </div>
    </div>
  );
}
