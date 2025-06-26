import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { InstagramPost } from '@/types';

interface InstagramGridProps {
  posts: InstagramPost[];
  className?: string;
}

/**
 * InstagramGrid Component - Displays a grid of Instagram posts
 * Features:
 * - Responsive grid layout
 * - Hover effects with post caption
 * - Link to Instagram post
 * - Fallback for empty state
 */
export default function InstagramGrid({ posts, className = '' }: InstagramGridProps) {
  if (posts.length === 0) {
    return (
      <div className={`text-center ${className}`}>
        <Link
          href="https://www.instagram.com/ashleyrosep?igsh=eDhtaWRlcTY2MXpz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold"
        >
          <Instagram className="w-5 h-5" />
          Follow on Instagram
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-gray-100 rounded-lg"
          >
            <Image
              src={post.mediaUrl}
              alt={post.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            
            {/* Overlay with caption on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
              <p className="text-white text-sm line-clamp-3">
                {post.caption}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 