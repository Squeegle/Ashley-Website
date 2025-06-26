import { Metadata } from 'next';
import Link from 'next/link';
import { BlogGrid, Section, Container } from '@/components/layout';
import { BlogCard, FeaturedBlogCard, BlogFilters } from '@/components/content';
import { getAllBlogPosts } from '@/lib/blog';
import { BlogPost } from '@/types';

/**
 * Blog Page - Main blog listing with featured posts and filtering
 * Features:
 * - Featured hero post
 * - Category filtering
 * - Search functionality
 * - Responsive grid layout
 * - Pagination
 */

export const metadata: Metadata = {
  title: 'Interior Design Blog',
  description: 'DIY tutorials, decor tips, and lifestyle inspiration. Transform your space with creative projects and design ideas.',
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Await the searchParams Promise to get the actual parameters
  const params = await searchParams;
  
  // Get filter parameters
  const category = params.category || 'all';
  const searchQuery = params.search || '';
  const currentPage = parseInt(params.page || '1');
  
  // Get filtered blog posts
  const { posts, totalPages, totalPosts } = await getAllBlogPosts({
    category: category === 'all' ? undefined : category,
    search: searchQuery,
    page: currentPage,
    limit: 9, // 9 posts per page (1 featured + 8 in grid)
  });

  // Separate featured post (first post) from the rest
  const [featuredPost, ...regularPosts] = posts;

  return (
    <div>
      {/* Page Header */}
      <Section spacing="large" background="gray">
        <Container size="large">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-contrast mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-contrast font-medium leading-relaxed">
              DIY tutorials, decor tips, and lifestyle inspiration to help you create 
              a home that tells your story
            </p>
          </div>
        </Container>
      </Section>

      {/* Blog Filters */}
      <Section spacing="medium">
        <Container size="large">
          <BlogFilters 
            currentCategory={category}
            currentSearch={searchQuery}
            totalPosts={totalPosts}
          />
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section spacing="medium">
        <Container size="large">
          {posts.length > 0 ? (
            <BlogGrid featured={true}>
              {/* Featured Post */}
              {featuredPost && (
                <FeaturedBlogCard post={featuredPost} />
              )}
              
              {/* Regular Posts Grid */}
              {regularPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </BlogGrid>
          ) : (
            /* No Posts Found */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-serif text-contrast mb-4">
                No posts found
              </h3>
              <p className="text-contrast font-medium">
                {searchQuery 
                  ? `No posts match "${searchQuery}"`
                  : `No posts in the "${category}" category yet`
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <BlogPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                category={category}
                search={searchQuery}
              />
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}

/**
 * Blog Pagination Component
 */
interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  search: string;
}

function BlogPagination({ currentPage, totalPages, category, search }: BlogPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    return `/blog${queryString ? `?${queryString}` : ''}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(page => {
    return Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
  });

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Blog pagination">
      {/* Previous Page */}
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 text-contrast border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      {showPages.map((page, index) => {
        const prevPage = showPages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="px-2 text-contrast">...</span>
            )}
            <Link
              href={createPageUrl(page)}
              className={`px-4 py-2 rounded-md transition-colors ${
                page === currentPage
                  ? 'bg-gray-900 text-white'
                  : 'text-contrast border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          </div>
        );
      })}

      {/* Next Page */}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 text-contrast border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
} 