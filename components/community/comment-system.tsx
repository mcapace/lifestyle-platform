"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart,
  Chat,
  ShareNetwork,
  Reply,
  MoreHorizontal,
  Flag,
  Trash,
  Edit,
  Crown,
  Star,
  Clock,
  ArrowUp,
  ArrowDown,
  Plus,
  X,
  PaperPlane
} from "@phosphor-icons/react";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    tier: 'curious' | 'explorer' | 'connoisseur';
    verified: boolean;
    isModerator: boolean;
  };
  createdAt: string;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
  isReply?: boolean;
  parentId?: string;
}

interface CommentSystemProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
  onCommentLiked: (commentId: string) => void;
  onCommentDeleted: (commentId: string) => void;
  isLocked?: boolean;
}

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This place looks amazing! I\'ve been looking for a good rooftop bar in Wynwood. What\'s the dress code like?',
    author: {
      name: 'Sarah K.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      tier: 'explorer',
      verified: true,
      isModerator: false
    },
    createdAt: '1 hour ago',
    likes: 5,
    replies: [
      {
        id: '1-1',
        content: 'Dress code is smart casual. No shorts or flip flops, but you don\'t need to be super formal.',
        author: {
          name: 'Alex M.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          tier: 'explorer',
          verified: true,
          isModerator: false
        },
        createdAt: '45 minutes ago',
        likes: 2,
        replies: [],
        isLiked: false,
        isReply: true,
        parentId: '1'
      }
    ],
    isLiked: false
  },
  {
    id: '2',
    content: 'Great recommendation! I went there last weekend and the sunset views were incredible. The cocktails are also top-notch.',
    author: {
      name: 'Jordan L.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      tier: 'connoisseur',
      verified: true,
      isModerator: true
    },
    createdAt: '2 hours ago',
    likes: 8,
    replies: [],
    isLiked: true
  }
];

export default function CommentSystem({ 
  postId, 
  comments, 
  onCommentAdded, 
  onCommentLiked, 
  onCommentDeleted,
  isLocked = false 
}: CommentSystemProps) {
  const { trigger } = useHaptics();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    trigger('SUCCESS');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        tier: 'explorer',
        verified: true,
        isModerator: false
      },
      createdAt: 'Just now',
      likes: 0,
      replies: [],
      isLiked: false
    };

    onCommentAdded(comment);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    trigger('SUCCESS');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      content: replyContent.trim(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        tier: 'explorer',
        verified: true,
        isModerator: false
      },
      createdAt: 'Just now',
      likes: 0,
      replies: [],
      isLiked: false,
      isReply: true,
      parentId
    };

    // In a real app, this would be handled by the parent component
    setReplyContent('');
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const toggleReplies = (commentId: string) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(commentId)) {
      newShowReplies.delete(commentId);
    } else {
      newShowReplies.add(commentId);
    }
    setShowReplies(newShowReplies);
  };

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 ${isReply ? 'ml-8' : ''}`}
    >
      <div className="flex items-start gap-3">
        <img 
          src={comment.author.avatar} 
          alt={comment.author.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium text-sm">{comment.author.name}</h4>
            {comment.author.tier !== 'curious' && (
              <Crown weight="fill" size={12} className="text-amber-400" />
            )}
            {comment.author.verified && (
              <Star weight="fill" size={12} className="text-blue-400" />
            )}
            {comment.author.isModerator && (
              <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs">
                Mod
              </span>
            )}
            <span className="text-neutral-500 text-xs">• {comment.createdAt}</span>
          </div>
          
          <p className="text-neutral-200 text-sm mb-3 leading-relaxed">{comment.content}</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onCommentLiked(comment.id)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                comment.isLiked ? 'text-red-400' : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              <Heart weight={comment.isLiked ? "fill" : "regular"} size={14} />
              {comment.likes}
            </button>
            
            {!isReply && !isLocked && (
              <button 
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-blue-400 transition-colors"
              >
                <Reply weight="regular" size={14} />
                Reply
              </button>
            )}
            
            <button className="p-1 text-neutral-400 hover:text-white transition-colors">
              <MoreHorizontal weight="bold" size={14} />
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-neutral-800"
            >
              <div className="flex items-start gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="You"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${comment.author.name}...`}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors resize-none text-sm"
                    rows={2}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                      className="text-neutral-400 hover:text-white text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim() || isSubmitting}
                      className="flex items-center gap-1 px-3 py-1 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-lg text-xs transition-colors"
                    >
                      {isSubmitting ? (
                        <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <PaperPlane weight="bold" size={12} />
                          Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => toggleReplies(comment.id)}
                className="flex items-center gap-1 text-neutral-400 hover:text-white text-xs transition-colors mb-2"
              >
                {showReplies.has(comment.id) ? (
                  <>
                    <ArrowUp weight="bold" size={12} />
                    Hide {comment.replies.length} repl{comment.replies.length === 1 ? 'y' : 'ies'}
                  </>
                ) : (
                  <>
                    <ArrowDown weight="bold" size={12} />
                    Show {comment.replies.length} repl{comment.replies.length === 1 ? 'y' : 'ies'}
                  </>
                )}
              </button>
              
              <AnimatePresence>
                {showReplies.has(comment.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    {comment.replies.map((reply) => (
                      <CommentCard key={reply.id} comment={reply} isReply />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {/* New Comment Form */}
      {!isLocked && (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="You"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <Clock weight="bold" size={12} />
                  <span>Be respectful and constructive</span>
                </div>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-lg text-sm transition-colors"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <PaperPlane weight="bold" size={14} />
                      Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Locked Comments Message */}
      {isLocked && (
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
            <Lock weight="bold" size={16} />
            <span className="text-sm font-medium">Comments are locked</span>
          </div>
          <p className="text-neutral-500 text-xs">
            This post has been locked by a moderator
          </p>
        </div>
      )}
    </div>
  );
}
