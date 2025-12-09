'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Globe, Lock, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Card, Avatar, Badge } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: (postId: string) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export default function PostCard({ post, currentUserId, onLike, onEdit, onDelete }: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isOwner = currentUserId && post.authorId === currentUserId;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit?.(post);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete?.(post.id);
  };

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <Avatar src={post.authorAvatar} name={post.authorName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text-dark">
              {post.authorName}
            </span>
            <Badge variant="primary" size="sm">
              {post.clubName}
            </Badge>
            {post.visibility === 'private' ? (
              <span className="flex items-center gap-1 text-xs text-text-gray" title="Only visible to signed-in users">
                <Lock className="w-3 h-3" />
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-text-gray" title="Visible to everyone">
                <Globe className="w-3 h-3" />
              </span>
            )}
          </div>
          <span className="text-sm text-text-gray">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
        
        {/* More Options Menu (only for post owner) */}
        {isOwner && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-text-gray hover:bg-gray-100 transition-colors cursor-pointer"
              title="More options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-text-dark whitespace-pre-line leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div
          className="w-full h-72 transition-transform duration-300 hover:opacity-95"
          style={{ background: post.image }}
        />
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-1">
        <button
          onClick={() => onLike?.(post.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
            post.isLiked 
              ? 'bg-danger/10 text-danger' 
              : 'text-text-gray hover:bg-gray-100'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              post.isLiked ? 'fill-danger scale-110' : 'hover:scale-110'
            }`}
          />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-gray hover:bg-gray-100 transition-colors duration-200">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-light cursor-not-allowed transition-colors duration-200 ml-auto group relative"
          disabled
          title="Share feature coming soon"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Coming soon
          </span>
        </button>
      </div>
    </Card>
  );
}
