'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { getClubs } from '@/lib/storage';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const clubs = getClubs();

  // Redirect authenticated users to their appropriate home
  useEffect(() => {
    if (isAuthenticated) {
      router.push(isAdmin ? '/admin' : '/feed');
    }
  }, [isAuthenticated, isAdmin, router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Logo */}
      <div className="mb-8 w-[700px] h-[233px] mx-auto" style={{ minWidth: '700px', minHeight: '233px' }}>
        <Image 
          src="/ubcms-logo.png" 
          alt="UBCMS Logo" 
          width={700} 
          height={233}
          className="w-full h-full"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
        UB Club Management
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-text-gray max-w-md mb-8">
        Discover and join student clubs at the University of Belize.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/clubs">
          <Button size="lg">
            Explore Clubs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">
            Sign In
          </Button>
        </Link>
      </div>

      {/* Quick stat */}
      <p className="mt-10 text-sm text-text-light">
        {clubs.length} clubs available
      </p>
    </div>
  );
}
