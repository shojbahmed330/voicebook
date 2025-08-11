
import React, { useState } from 'react';
import type { Post } from '../types';
import Icon from './Icon';
import Waveform from './Waveform';

interface PostCardProps {
  post: Post;
  isActive: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
  onLike: () => void;
  onComment: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isActive, isPlaying, onPlayPause, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const timeAgo = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const handleLike = () => {
      setIsLiked(!isLiked);
      onLike();
  }

  return (
    <div
      className={`
        bg-slate-800 rounded-2xl p-6 w-full max-w-lg mx-auto transition-all duration-300 ease-in-out
        ${isActive ? 'transform scale-105 shadow-2xl shadow-rose-500/10' : 'opacity-70 scale-95'}
      `}
    >
      <div className="flex items-center mb-4">
        <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold text-slate-100 text-lg">{post.author.name}</p>
          <p className="text-slate-400 text-sm">{timeAgo} &middot; {post.duration}s</p>
        </div>
      </div>

      <p className="text-slate-300 mb-4 text-base italic">"{post.caption}"</p>

      <div className="relative h-24 bg-slate-700/50 rounded-lg overflow-hidden mb-4">
        <Waveform isPlaying={isPlaying && isActive} />
        <button
          onClick={onPlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/20 text-white opacity-0 hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? "Pause post" : "Play post"}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} className="w-16 h-16" />
        </button>
      </div>

      <div className="flex items-center text-slate-400 gap-6">
        <button onClick={handleLike} className={`flex items-center gap-2 hover:text-rose-400 transition-colors ${isLiked ? 'text-rose-500' : ''}`}>
          <Icon name="like" className="w-6 h-6" />
          <span className="font-medium">{post.likeCount + (isLiked ? 1 : 0)}</span>
        </button>
        <button onClick={onComment} className="flex items-center gap-2 hover:text-sky-400 transition-colors">
          <Icon name="comment" className="w-6 h-6" />
          <span className="font-medium">{post.commentCount}</span>
        </button>
        <div className="flex items-center gap-2">
          <Icon name="share" className="w-6 h-6" />
          <span className="font-medium">Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
