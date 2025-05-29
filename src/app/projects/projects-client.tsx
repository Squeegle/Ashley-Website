'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Clock, DollarSign, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';

/**
 * Client-side component for Projects page interactivity
 * Handles filtering, search, and pagination while maintaining URL state
 */

interface ProjectsPageClientProps {
  initialProjects: Project[];
  selectedCategory: string;
  searchTerm: string;
  categories: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function ProjectsPageClient({
  initialProjects,
  selectedCategory: initialCategory,
  searchTerm: initialSearchTerm,
  categories,
  pagination
}: ProjectsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);

  // Update URL when filters change
  const updateURL = useCallback((category: string, search: string) => {
    const params = new URLSearchParams();
    
    if (category !== 'All Projects') {
      params.set('category', category);
    }
    if (search) {
      params.set('search', search);
    }
    
    const url = params.toString() ? `/projects?${params.toString()}` : '/projects';
    router.push(url);
  }, [router]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL(category, searchTerm);
  };

  // Handle search change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL(selectedCategory, searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, updateURL]);

  // Filter projects client-side for immediate feedback
  useEffect(() => {
    let filtered = initialProjects;

    // Filter by category
    if (selectedCategory !== 'All Projects') {
      filtered = filtered.filter(project => 
        project.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.excerpt.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        project.roomType?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProjects(filtered);
  }, [initialProjects, selectedCategory, searchTerm]);

  return (
    <>
      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Category Filters (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600 font-medium">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              {selectedCategory !== 'All Projects' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('All Projects');
                }}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              {pagination.hasPreviousPage && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', (pagination.currentPage - 1).toString());
                    router.push(`/projects?${params.toString()}`);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Previous
                </button>
              )}
              
              <span className="text-sm text-gray-600 font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              {pagination.hasNextPage && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', (pagination.currentPage + 1).toString());
                    router.push(`/projects?${params.toString()}`);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/**
 * Project Card Component - Individual project display card
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
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <Clock className="w-3 h-3" />
                <span>{project.timeline}</span>
              </div>
            )}
            {project.budget && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
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
                <Star className="w-3 h-3" />
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
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 