'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <span className="text-5xl font-bold text-primary">404</span>
      </div>
      <h2 className="text-2xl font-bold text-text-dark mb-3">
        Page Not Found
      </h2>
      <p className="text-text-gray mb-8 max-w-md leading-relaxed">
        Oops! The page you're looking for doesn't exist or may have been moved.
        Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/clubs">
          <Button icon={<Home className="w-4 h-4" />}>
            Explore Clubs
          </Button>
        </Link>
        <Button variant="outline" onClick={() => router.back()} icon={<ArrowLeft className="w-4 h-4" />}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
