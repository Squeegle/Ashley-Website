import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

/**
 * FeaturedBlogCard Component - Large hero-style blog post card
 * Features:
 * - Large image with overlay text
 * - Prominent display for featured content
 * - Responsive design with mobile-optimized layout
 * - Hover effects and smooth transitions
 */

interface FeaturedBlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function FeaturedBlogCard({ post, className = '' }: FeaturedBlogCardProps) {
  return (
    <article className={`group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Large Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block relative">
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
          
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full">
                {post.tags[0]}
              </span>
            </div>
          )}

          {/* Content Overlay - Uses overlay-text-white class for white text on dark gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl overlay-text-white">
              {/* Meta Information - White text for visibility on dark gradient */}
              <div className="flex items-center gap-4 text-sm font-sans mb-4">
                <time dateTime={post.publishedAt.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.readTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-white" style={{ color: '#ffffff' }} />
                      <span>{post.readTime} min read</span>
                    </div>
                  </>
                )}
              </div>

              {/* Title - White text for visibility on dark gradient */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 leading-tight">
                {post.title}
              </h2>

              {/* Excerpt - White text with slight transparency for visual hierarchy */}
              <p className="text-lg font-sans mb-6 leading-relaxed line-clamp-2 max-w-2xl overlay-text-white-90">
                {post.excerpt}
              </p>

              {/* Read More Button - Dark background with white text for visibility on overlay */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-sans rounded-md hover:bg-primary-dark transition-all duration-200 font-semibold group-hover:gap-3 dark-button-text">
                Read Full Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
} 