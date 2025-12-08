'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  backLabel = 'Back',
  action,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  // Show back button if showBack is true OR if backHref is provided
  const shouldShowBack = showBack || !!backHref;

  return (
    <div>
      {shouldShowBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-3 -ml-2"
        >
          {backLabel}
        </Button>
      )}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-2 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-text-gray text-base max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
