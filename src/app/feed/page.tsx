'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Rss } from 'lucide-react';
import { Button, Spinner, EmptyState, Card, Avatar, Select } from '@/components/ui';
import { PageHeader, Sidebar, UpcomingEvents } from '@/components/layout';
import { PostCard, CreatePostModal } from '@/components/posts';
import { useAuth } from '@/context/AuthContext';
import { getPosts, updatePost, getClubs } from '@/lib/storage';
import type { Post } from '@/types';

export default function FeedPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audienceFilter, setAudienceFilter] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const clubs = getClubs();

  useEffect(() => {
    // Redirect non-authenticated users to home page
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    // Redirect admins to admin dashboard
    if (isAdmin) {
      router.push('/admin');
      return;
    }

    const timer = setTimeout(() => {
      const allPosts = getPosts();
      setPosts(allPosts);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, router]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by audience/club
    if (audienceFilter) {
      result = result.filter((post) => post.clubId === audienceFilter);
    }

    // Sort posts
    if (sortBy === 'latest') {
      result.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [posts, audienceFilter, sortBy]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          const updated = {
            ...post,
            isLiked: newIsLiked,
            likes: newLikes,
          };
          updatePost(post.id, { isLiked: newIsLiked, likes: newLikes });
          return updated;
        }
        return post;
      })
    );
  };

  const audienceOptions = [
    { value: '', label: 'All Clubs' },
    ...clubs.map((club) => ({ value: club.id, label: club.name })),
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Feed"
        subtitle="See what's happening in your clubs"
      />

      {/* Three Column Layout */}
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Feed */}
        <div className="flex-1 min-w-0 max-w-2xl space-y-4">
          {/* Create Post Prompt */}
          {isAuthenticated && user && (
            <Card variant="elevated" className="flex items-center gap-3 p-3">
              <Avatar src={user.avatar} fallback={user.name} size="md" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 text-left px-4 py-2.5 bg-gray-50 rounded-lg text-text-gray hover:bg-gray-100 hover:text-text-dark transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
              >
                What's on your mind, {user.name.split(' ')[0]}?
              </button>
              <Button onClick={() => setIsModalOpen(true)} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Post
              </Button>
            </Card>
          )}

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3">
            <div className="w-40">
              <Select
                options={audienceOptions}
                value={audienceFilter}
                onChange={(value) => setAudienceFilter(value)}
              />
            </div>
            <div className="w-32">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          {/* Posts Feed */}
          {filteredPosts.length === 0 ? (
            <EmptyState
              icon={Rss}
              title="No posts yet"
              description={audienceFilter ? "No posts in this club yet." : "Be the first to share something with the community!"}
              action={
                isAuthenticated ? {
                  label: 'Create Post',
                  onClick: () => setIsModalOpen(true),
                } : undefined
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="stagger-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PostCard post={post} onLike={handleLike} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar - Upcoming Events */}
        <div className="hidden xl:block">
          <UpcomingEvents />
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
