'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, User, IdCard, Send, RotateCcw } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { addRequest } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import type { Club, JoinClubFormData } from '@/types';

interface JoinFormProps {
  club: Club;
}

export default function JoinForm({ club }: JoinFormProps) {
  const router = useRouter();
  const { success } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<JoinClubFormData>({
    studentId: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<Partial<JoinClubFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<JoinClubFormData> = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!/^\d{10}$/.test(formData.studentId.trim())) {
      newErrors.studentId = 'Student ID must be 10 digits';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create join request
    const request = {
      id: generateId('req'),
      type: 'join' as const,
      status: 'pending' as const,
      studentId: formData.studentId.trim(),
      studentName: formData.fullName.trim(),
      studentAvatar: '',
      clubId: club.id,
      clubName: club.name,
      requestDate: new Date().toISOString().split('T')[0],
    };

    addRequest(request);
    success('Request submitted successfully!');
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ studentId: '', fullName: '' });
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <Card className="text-center py-8">
        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-bounce-subtle">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-dark">
              Request Submitted!
            </h2>
            <p className="text-text-gray mt-2">
              Your request to join <strong className="text-primary">{club.name}</strong> has been submitted successfully.
            </p>
          </div>
          <div className="bg-info/10 rounded-lg p-4 text-sm text-info w-full">
            <p>📧 You will receive an email notification within 2-3 business days once your request is reviewed.</p>
          </div>
          <div className="flex gap-3 mt-2">
            <Button onClick={() => router.push('/clubs')} variant="outline">
              Browse Other Clubs
            </Button>
            <Button onClick={() => router.push(`/clubs/${club.id}`)}>
              View {club.name}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-dark">Membership Request Form</h3>
        <p className="text-sm text-text-gray mt-1">
          Fill out the fields below to request membership. Your request will be reviewed by the club administrator.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute left-3 top-9 text-text-light">
              <IdCard className="w-5 h-5" />
            </div>
            <Input
              label="Student ID"
              placeholder="2025123456"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              error={errors.studentId}
              required
              maxLength={10}
              aria-describedby="studentId-hint"
              className="pl-10"
            />
          </div>
          <p id="studentId-hint" className="text-xs text-text-light pl-1">
            Enter your 10-digit UB student ID number
          </p>
        </div>

        <div className="space-y-1">
          <div className="relative">
            <div className="absolute left-3 top-9 text-text-light">
              <User className="w-5 h-5" />
            </div>
            <Input
              label="Full Name"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={errors.fullName}
              required
              className="pl-10"
            />
          </div>
          <p className="text-xs text-text-light pl-1">
            Enter your name as it appears on your student ID
          </p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            loading={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              'Submitting...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
            title="Clear form"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Clear</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
