'use client';

import { useState, useEffect } from 'react';
import { Image, X, Globe, Lock } from 'lucide-react';
import { Modal, Button, Textarea, Select, Avatar } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { addPost, getClubs } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { CLUB_GRADIENTS } from '@/lib/constants';
import type { Post, PostVisibility } from '@/types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [content, setContent] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [visibility, setVisibility] = useState<PostVisibility>('public');
  const [includeImage, setIncludeImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ content?: string; club?: string }>({});

  const clubs = getClubs();
  const userClubs = clubs.filter((club) =>
    user?.clubs.includes(club.id)
  );

  const clubOptions = userClubs.map((club) => ({
    value: club.id,
    label: club.name,
  }));

  // Auto-select first club when modal opens
  useEffect(() => {
    if (isOpen && userClubs.length > 0 && !selectedClub) {
      setSelectedClub(userClubs[0].id);
    }
  }, [isOpen, userClubs, selectedClub]);

  const validateForm = (): boolean => {
    const newErrors: { content?: string; club?: string } = {};

    if (!content.trim()) {
      newErrors.content = 'Post content is required';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Post must be at least 10 characters';
    }

    if (!selectedClub) {
      newErrors.club = 'Please select a club';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !user) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const club = clubs.find((c) => c.id === selectedClub);
    const gradientIndex = clubs.findIndex((c) => c.id === selectedClub) % CLUB_GRADIENTS.length;

    const newPost: Post = {
      id: generateId('post'),
      authorId: user.id,
      authorName: user.name,
      authorRole: 'member',
      authorAvatar: user.avatar,
      title: '',
      clubId: selectedClub,
      clubName: club?.name || '',
      content: content.trim(),
      visibility: visibility,
      audience: 'public',
      audienceName: 'Everyone',
      taggedMembers: [],
      media: [],
      image: includeImage ? CLUB_GRADIENTS[gradientIndex] : undefined,
      likes: 0,
      likedBy: [],
      comments: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
    onPostCreated(newPost);
    success('Post created successfully!');

    // Reset form - set to first club for next time
    setContent('');
    setSelectedClub(userClubs.length > 0 ? userClubs[0].id : '');
    setVisibility('public');
    setIncludeImage(false);
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  const handleClose = () => {
    setContent('');
    setSelectedClub(userClubs.length > 0 ? userClubs[0].id : '');
    setVisibility('public');
    setIncludeImage(false);
    setErrors({});
    onClose();
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create a Post"
      size="md"
    >
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.name} size="md" />
          <div>
            <p className="font-medium text-text-dark">{user.name}</p>
            <p className="text-sm text-text-gray">What's on your mind, {user.name.split(' ')[0]}?</p>
          </div>
        </div>

        {/* Club Selection */}
        <Select
          label="Post to Club"
          options={clubOptions}
          value={selectedClub}
          onChange={(value) => setSelectedClub(value)}
          error={errors.club}
          required
        />

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

        {/* Image Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIncludeImage(!includeImage)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              includeImage
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 text-text-gray hover:border-primary hover:text-primary'
            }`}
          >
            <Image className="w-5 h-5" />
            <span className="text-sm">
              {includeImage ? 'Image Added' : 'Add Image'}
            </span>
            {includeImage && (
              <X
                className="w-4 h-4 ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIncludeImage(false);
                }}
              />
            )}
          </button>
          <span className="text-xs text-text-gray">
            (Placeholder image will be used for demo)
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
}
