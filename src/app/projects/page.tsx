import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/layout';
import { ProjectFilters } from '@/components/content';
import { getAllProjects } from '@/lib/projects';
import { Project } from '@/types';

/**
 * Projects Page - Main projects gallery with filtering and search
 * Features:
 * - Search functionality
 * - Category filtering 
 * - Responsive grid layout
 * - Consistent styling with blog page
 * - URL-based state management
 * - Pagination support
 */

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore our collection of home transformations, from complete room makeovers to simple styling updates. Each project tells a unique story of style, function, and personal expression.',
};

interface ProjectsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  // Await the searchParams Promise to get the actual parameters
  const params = await searchParams;
  
  // Get filter parameters
  const category = params.category || 'All Projects';
  const searchQuery = params.search || '';
  const currentPage = parseInt(params.page || '1');
  
  // Get filtered projects
  const { projects, pagination } = await getAllProjects({
    category: category === 'All Projects' ? undefined : category,
    search: searchQuery,
    page: currentPage,
    limit: 12, // 12 projects per page
  });

  return (
    <div>
      {/* Page Header */}
      <Section spacing="large" background="gray">
        <Container size="large">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-contrast mb-6">
              Projects
            </h1>
            <p className="text-xl md:text-2xl text-contrast font-medium leading-relaxed">
              Explore our collection of home transformations, from complete room makeovers 
              to simple styling updates. Each project tells a unique story of style, 
              function, and personal expression.
            </p>
          </div>
        </Container>
      </Section>

      {/* Project Filters */}
      <Section spacing="medium">
        <Container size="large">
          <ProjectFilters 
            currentCategory={category}
            currentSearch={searchQuery}
            totalProjects={pagination.totalProjects}
          />
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section spacing="medium">
        <Container size="large">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            /* No Projects Found */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-serif text-contrast mb-4">
                No projects found
              </h3>
              <p className="text-contrast font-medium">
                {searchQuery 
                  ? `No projects match "${searchQuery}"`
                  : `No projects in the "${category}" category yet`
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-16">
              <ProjectPagination 
                currentPage={currentPage}
                totalPages={pagination.totalPages}
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
 * Project Card Component - Individual project preview card
 */
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Before/After Badge */}
          {project.isBeforeAfter && (
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-900">Before & After</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">{project.category}</span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-serif text-gray-900 mb-3 group-hover:text-gray-700 transition-colors font-medium">
            {project.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
            {project.excerpt}
          </p>

          {/* Project Metadata */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
            {project.timeline && (
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>{project.timeline}</span>
              </div>
            )}
            {project.budget && (
              <div className="flex items-center gap-1">
                <span>💰</span>
                <span>
                  {project.budget.min === project.budget.max 
                    ? `$${project.budget.min}`
                    : `$${project.budget.min} - $${project.budget.max}`
                  }
                </span>
              </div>
            )}
            {project.difficulty && (
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{project.difficulty}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              {project.readTime} min read
            </span>
            <div className="flex items-center gap-1 text-gray-700 group-hover:text-gray-900 group-hover:gap-2 transition-all duration-200">
              <span className="text-sm font-medium">View Project</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/**
 * Project Pagination Component
 */
interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  search: string;
}

function ProjectPagination({ currentPage, totalPages, category, search }: ProjectPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category !== 'All Projects') params.set('category', category);
    if (search) params.set('search', search);
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    return `/projects${queryString ? `?${queryString}` : ''}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(page => {
    return Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
  });

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Project pagination">
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