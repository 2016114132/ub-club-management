'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card, Avatar, Badge } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
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
          </div>
          <span className="text-sm text-text-gray">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
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
