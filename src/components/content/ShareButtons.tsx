'use client';

import { BlogPost } from '@/types';
import { Twitter, Facebook, Link2, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * ShareButtons Component - Social media sharing buttons
 * Features:
 * - Share to Twitter, Facebook
 * - Copy link functionality
 * - Visual feedback for actions
 */

interface ShareButtonsProps {
  post: BlogPost;
  className?: string;
}

export default function ShareButtons({ post, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = post.title;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/share/1Cpr5LSvy6/`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      
      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      
      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
} 