
import React, { useState, useEffect, useRef } from 'react';
import type { Post } from '../types';
import PostCard from './PostCard';
import { geminiService } from '../services/geminiService';

interface FeedScreenProps {
  onSetTtsMessage: (message: string) => void;
  currentCommand: string;
}

const FeedScreen: React.FC<FeedScreenProps> = ({ onSetTtsMessage, currentCommand }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      const feedPosts = await geminiService.getFeed();
      setPosts(feedPosts);
      setIsLoading(false);
      onSetTtsMessage(`Feed loaded. Say "play" to start.`);
    };
    fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(feedContainerRef.current && posts.length > 0) {
        const cardElement = feedContainerRef.current.children[currentPostIndex] as HTMLElement;
        if(cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [currentPostIndex, posts]);

  const handlePlayPause = () => {
      setIsPlaying(prev => !prev);
  }

  const handleNext = () => {
      setCurrentPostIndex(prev => (prev + 1) % posts.length);
      setIsPlaying(true);
  }
  
  const handlePrevious = () => {
      setCurrentPostIndex(prev => (prev - 1 + posts.length) % posts.length);
      setIsPlaying(true);
  }

  const handleLike = () => {
      if(posts[currentPostIndex]) {
        onSetTtsMessage(`You liked ${posts[currentPostIndex].author.name}'s post.`);
      }
  }

  const handleComment = () => {
      if(posts[currentPostIndex]) {
        onSetTtsMessage(`Leaving a comment on ${posts[currentPostIndex].author.name}'s post. Start recording your comment.`);
        // In a real app, this would navigate to a comment recording view.
      }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-300 text-xl">Loading your feed...</p>
      </div>
    );
  }

  return (
    <div ref={feedContainerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth p-8">
        <div className="flex flex-col items-center justify-start gap-12">
        {posts.map((post, index) => (
            <div key={post.id} className="w-full snap-center">
                <PostCard 
                    post={post} 
                    isActive={index === currentPostIndex}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onLike={handleLike}
                    onComment={handleComment}
                />
            </div>
        ))}
        </div>
    </div>
  );
};

export default FeedScreen;
