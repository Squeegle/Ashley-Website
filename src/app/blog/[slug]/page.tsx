import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from '@/lib/blog';
import { BlogContent, ShareButtons, AuthorBio, RelatedPosts } from '@/components/content';
import { Section, Container } from '@/components/layout';
import { BlogHero } from '@/components/layout';

/**
 * Individual Blog Post Page
 * Features:
 * - Hero image with post title
 * - Full markdown content rendering
 * - Social sharing buttons
 * - Author bio section
 * - Related posts suggestions
 * - Newsletter signup CTA
 */

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  const { posts } = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <div>
      {/* Hero Section with Featured Image */}
      <BlogHero
        title={post.title}
        subtitle={`${post.author} • ${post.publishedAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} • ${post.readTime} min read`}
        imageSrc={post.featuredImage}
        imageAlt={post.title}
      />

      {/* Main Content */}
      <Section spacing="large">
        <Container size="medium">
          <article className="prose prose-lg max-w-none">
            {/* Article Header */}
            <header className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Article Meta */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <time dateTime={post.publishedAt.toISOString()}>
                    {post.publishedAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                
                {/* Share Buttons */}
                <ShareButtons post={post} />
              </div>
            </header>

            {/* Article Content */}
            <BlogContent content={post.content} />
          </article>
        </Container>
      </Section>

      {/* Author Bio */}
      <Section spacing="medium" background="gray">
        <Container size="medium">
          <AuthorBio author={post.author} />
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section spacing="large">
          <Container size="large">
            <RelatedPosts posts={relatedPosts} />
          </Container>
        </Section>
      )}
    </div>
  );
} 