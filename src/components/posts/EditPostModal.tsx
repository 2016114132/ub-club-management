'use client';

import { useState, useEffect } from 'react';
import { Globe, Lock } from 'lucide-react';
import { Modal, Button, Textarea } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { updatePost } from '@/lib/storage';
import type { Post, PostVisibility } from '@/types';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onPostUpdated: (post: Post) => void;
}

export default function EditPostModal({
  isOpen,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) {
  const { success } = useToast();
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<PostVisibility>('public');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ content?: string }>({});

  // Populate form when post changes
  useEffect(() => {
    if (post) {
      setContent(post.content);
      setVisibility(post.visibility || 'public');
    }
  }, [post]);

  const validateForm = (): boolean => {
    const newErrors: { content?: string } = {};

    if (!content.trim()) {
      newErrors.content = 'Post content is required';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Post must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !post) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updatedPost: Post = {
      ...post,
      content: content.trim(),
      visibility: visibility,
    };

    updatePost(post.id, { content: content.trim(), visibility: visibility });
    onPostUpdated(updatedPost);
    success('Post updated successfully!');

    setIsLoading(false);
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Post"
      size="md"
    >
      <div className="space-y-4">
        {/* Visibility Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-dark">
            Post Visibility
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors flex-1 cursor-pointer ${
                visibility === 'public'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 text-text-gray hover:border-primary hover:text-primary'
              }`}
            >
              <Globe className="w-4 h-4" />
              <div className="text-left">
                <span className="text-sm font-medium">Public</span>
                <p className="text-xs opacity-75">Anyone can see this post</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors flex-1 cursor-pointer ${
                visibility === 'private'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 text-text-gray hover:border-primary hover:text-primary'
              }`}
            >
              <Lock className="w-4 h-4" />
              <div className="text-left">
                <span className="text-sm font-medium">Private</span>
                <p className="text-xs opacity-75">Only signed-in users</p>
              </div>
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-1">
          <Textarea
            label="Content"
            placeholder="Share something with your club members..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            error={errors.content}
            maxLength={500}
          />
          <div className="flex justify-end">
            <span className={`text-xs ${content.length > 450 ? 'text-warning' : 'text-text-gray'} ${content.length >= 500 ? 'text-danger font-medium' : ''}`}>
              {content.length}/500
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
