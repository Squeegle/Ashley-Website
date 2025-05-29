import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

/**
 * BlogCard Component - Individual blog post preview card
 * Features:
 * - Responsive image with aspect ratio
 * - Post metadata (date, read time, category)
 * - Clean typography and hover effects
 * - Accessible markup with proper semantic structure
 */

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className = '' }: BlogCardProps) {
  return (
    <article className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Category Badge */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full">
                {post.tags[0]}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
          {post.readTime && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-gray-900 mb-3 leading-tight">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-gray-700 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all duration-200 group"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
} 