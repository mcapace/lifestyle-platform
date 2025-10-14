"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X,
  Camera,
  Image as ImageIcon,
  Smiley,
  Hash,
  At,
  Bold,
  Italic,
  Link,
  PaperPlane,
  Eye,
  EyeSlash,
  Lock,
  Pin,
  Users,
  Globe,
  Calendar,
  MapPin,
  Tag,
  Plus,
  Trash,
  Check,
  Warning,
  Settings
} from "@phosphor-icons/react";
import { useHaptics } from "@/lib/haptics/advanced-feedback";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  communityName: string;
  onPostCreated?: (post: any) => void;
}

interface PostDraft {
  title: string;
  content: string;
  media: string[];
  tags: string[];
  visibility: 'public' | 'members' | 'moderators';
  isPinned: boolean;
  isLocked: boolean;
  scheduledFor?: Date;
}

export default function CreatePostModal({ 
  isOpen, 
  onClose, 
  communityId, 
  communityName,
  onPostCreated 
}: CreatePostModalProps) {
  const { trigger } = useHaptics();
  const [draft, setDraft] = useState<PostDraft>({
    title: '',
    content: '',
    media: [],
    tags: [],
    visibility: 'public',
    isPinned: false,
    isLocked: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (draft.content.trim() || draft.title.trim() || draft.media.length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!draft.content.trim() && !draft.media.length) {
      trigger('ERROR');
      return;
    }

    setIsSubmitting(true);
    trigger('SUCCESS');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPost = {
      id: Date.now().toString(),
      communityId,
      title: draft.title || undefined,
      content: draft.content,
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        tier: 'explorer' as const,
        verified: true,
        isModerator: false
      },
      createdAt: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      media: draft.media,
      tags: draft.tags,
      isPinned: draft.isPinned,
      isLocked: draft.isLocked,
      isLiked: false,
      isBookmarked: false
    };

    onPostCreated?.(newPost);
    onClose();
    setIsSubmitting(false);
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMedia = files.map(file => URL.createObjectURL(file));
    setDraft(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
    
    setIsUploading(false);
  };

  const removeMedia = (index: number) => {
    setDraft(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !draft.tags.includes(currentTag.trim())) {
      setDraft(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setDraft(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const formatText = (format: 'bold' | 'italic' | 'link') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = draft.content.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
    }

    const newContent = draft.content.substring(0, start) + formattedText + draft.content.substring(end);
    setDraft(prev => ({ ...prev, content: newContent }));
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-neutral-900 border-t sm:border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Create Post</h3>
                <p className="text-neutral-400 text-sm">in {communityName}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <Settings weight="bold" size={20} />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <X weight="bold" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-white font-medium mb-2">Title (Optional)</label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your post a compelling title..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-white font-medium mb-2">What's on your mind?</label>
                
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-neutral-800 rounded-lg">
                  <button
                    onClick={() => formatText('bold')}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Bold weight="bold" size={16} />
                  </button>
                  <button
                    onClick={() => formatText('italic')}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Italic weight="bold" size={16} />
                  </button>
                  <button
                    onClick={() => formatText('link')}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Link weight="bold" size={16} />
                  </button>
                  <div className="w-px h-6 bg-neutral-700 mx-2" />
                  <button
                    onClick={() => document.querySelector('textarea')?.focus()}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Hash weight="bold" size={16} />
                  </button>
                  <button
                    onClick={() => document.querySelector('textarea')?.focus()}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <At weight="bold" size={16} />
                  </button>
                </div>

                <textarea
                  value={draft.content}
                  onChange={(e) => setDraft(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, experiences, or ask questions..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  rows={6}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral-500 text-sm">{draft.content.length} characters</span>
                  <span className="text-neutral-500 text-sm">Markdown supported</span>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-white font-medium mb-2">Media (Optional)</label>
                
                {/* Upload Buttons */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-300 rounded-lg transition-colors"
                  >
                    <Camera weight="bold" size={16} />
                    Camera
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-300 rounded-lg transition-colors"
                  >
                    <ImageIcon weight="bold" size={16} />
                    Gallery
                  </button>
                </div>

                {/* Media Preview */}
                {draft.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {draft.media.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash weight="bold" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-white font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                  >
                    <Plus weight="bold" size={16} />
                  </button>
                </div>
                
                {draft.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {draft.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-brand-400 hover:text-brand-300 transition-colors"
                        >
                          <X weight="bold" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-t border-neutral-800 pt-4"
                >
                  <h4 className="text-white font-medium">Advanced Options</h4>
                  
                  {/* Visibility */}
                  <div>
                    <label className="block text-white font-medium mb-2">Visibility</label>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Public', icon: Globe, desc: 'Everyone can see' },
                        { value: 'members', label: 'Members Only', icon: Users, desc: 'Only community members' },
                        { value: 'moderators', label: 'Moderators Only', icon: Lock, desc: 'Only moderators and admins' }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <label key={option.value} className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg cursor-pointer">
                            <input
                              type="radio"
                              name="visibility"
                              value={option.value}
                              checked={draft.visibility === option.value}
                              onChange={(e) => setDraft(prev => ({ ...prev, visibility: e.target.value as any }))}
                              className="text-brand-500"
                            />
                            <Icon weight="bold" size={16} className="text-neutral-400" />
                            <div>
                              <div className="text-white text-sm font-medium">{option.label}</div>
                              <div className="text-neutral-400 text-xs">{option.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Moderation Options */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.isPinned}
                        onChange={(e) => setDraft(prev => ({ ...prev, isPinned: e.target.checked }))}
                        className="text-brand-500"
                      />
                      <Pin weight="bold" size={16} className="text-neutral-400" />
                      <span className="text-white text-sm">Pin this post</span>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.isLocked}
                        onChange={(e) => setDraft(prev => ({ ...prev, isLocked: e.target.checked }))}
                        className="text-brand-500"
                      />
                      <Lock weight="bold" size={16} className="text-neutral-400" />
                      <span className="text-white text-sm">Lock comments</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Globe weight="bold" size={16} />
                <span>
                  {draft.visibility === 'public' && 'Public'}
                  {draft.visibility === 'members' && 'Members Only'}
                  {draft.visibility === 'moderators' && 'Moderators Only'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (!draft.content.trim() && draft.media.length === 0)}
                  className="flex items-center gap-2 px-6 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <PaperPlane weight="bold" size={16} />
                      Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
