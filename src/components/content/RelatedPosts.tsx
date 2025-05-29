import { BlogPost } from '@/types';
import { BlogCard } from '@/components/content';
import { Grid } from '@/components/layout';

/**
 * RelatedPosts Component - Display related blog posts
 * Features:
 * - Grid layout of related posts
 * - Responsive design
 * - Clear section heading
 */

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPost: BlogPost;
  className?: string;
}

export default function RelatedPosts({ posts, currentPost, className = '' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
          You Might Also Like
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover more DIY projects, decor inspiration, and creative ideas
        </p>
      </div>

      <Grid
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap="large"
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Grid>
    </div>
  );
} 