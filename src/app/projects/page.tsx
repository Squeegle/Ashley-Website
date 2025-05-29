import { getAllProjects, PROJECT_CATEGORIES } from '@/lib/projects';
import { ProjectsPageClient } from './projects-client';

/**
 * Projects Page - Main projects gallery showcasing all project transformations
 * Features inspired by Chris Loves Julia's projects page:
 * - Filterable project categories
 * - Search functionality  
 * - Beautiful project cards with hover effects
 * - Before/after badges
 * - Project metadata (timeline, budget, difficulty)
 * - Responsive grid layout
 * - Pagination support
 */

interface ProjectsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const category = params.category || 'All Projects';
  const search = params.search || '';
  const page = parseInt(params.page || '1');

  const { projects, pagination } = await getAllProjects({
    category: category !== 'All Projects' ? category : undefined,
    search,
    page,
    limit: 12
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 font-medium">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Explore our collection of home transformations, from complete room makeovers 
              to simple styling updates. Each project tells a unique story of style, 
              function, and personal expression.
            </p>
          </div>
        </div>
      </section>

      {/* Client-side filtering and search */}
      <ProjectsPageClient 
        initialProjects={projects}
        selectedCategory={category}
        searchTerm={search}
        categories={PROJECT_CATEGORIES}
        pagination={pagination}
      />
    </div>
  );
} 