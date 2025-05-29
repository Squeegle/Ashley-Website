'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

/**
 * ProjectFilters Component - Search and category filtering for projects
 * Features:
 * - Real-time search functionality
 * - Category filtering with active states
 * - URL-based state management
 * - Responsive design with mobile-friendly layout
 * - Results count display
 * Styled to match BlogFilters component for consistency
 */

interface ProjectFiltersProps {
  currentCategory: string;
  currentSearch: string;
  totalProjects: number;
}

// Available project categories - these match the categories in your projects
const categories = [
  { id: 'all', label: 'All Projects', description: 'All project content' },
  { id: 'room-makeovers', label: 'Room Makeovers', description: 'Complete room transformations' },
  { id: 'diy-projects', label: 'DIY Projects', description: 'Step-by-step project tutorials' },
  { id: 'decor-styling', label: 'Decor & Styling', description: 'Styling and decoration projects' },
  { id: 'organization', label: 'Organization', description: 'Organization and storage solutions' },
  { id: 'renovations', label: 'Renovations', description: 'Home renovation projects' },
  { id: 'holiday-seasonal', label: 'Holiday & Seasonal', description: 'Seasonal decorating projects' },
  { id: 'outdoor-projects', label: 'Outdoor Projects', description: 'Outdoor and garden projects' },
];

export default function ProjectFilters({ currentCategory, currentSearch, totalProjects }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Convert display category names to URL-friendly format
  const categoryToUrlMap: { [key: string]: string } = {
    'all': 'All Projects',
    'room-makeovers': 'Room Makeovers',
    'diy-projects': 'DIY Projects', 
    'decor-styling': 'Decor & Styling',
    'organization': 'Organization',
    'renovations': 'Renovations',
    'holiday-seasonal': 'Holiday & Seasonal',
    'outdoor-projects': 'Outdoor Projects'
  };

  // Convert URL category back to display format
  const urlToCategoryMap: { [key: string]: string } = {
    'All Projects': 'all',
    'Room Makeovers': 'room-makeovers',
    'DIY Projects': 'diy-projects',
    'Decor & Styling': 'decor-styling',
    'Organization': 'organization',
    'Renovations': 'renovations',
    'Holiday & Seasonal': 'holiday-seasonal',
    'Outdoor Projects': 'outdoor-projects'
  };

  // Get the current category ID for highlighting
  const currentCategoryId = urlToCategoryMap[currentCategory] || 'all';

  // Update URL with new filter parameters
  const updateFilters = (newCategory?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category
    if (newCategory !== undefined) {
      const categoryValue = categoryToUrlMap[newCategory];
      if (newCategory === 'all' || categoryValue === 'All Projects') {
        params.delete('category');
      } else {
        params.set('category', categoryValue);
      }
    }
    
    // Update search
    if (newSearch !== undefined) {
      if (newSearch.trim() === '') {
        params.delete('search');
      } else {
        params.set('search', newSearch.trim());
      }
    }
    
    // Reset to first page when filters change
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/projects${queryString ? `?${queryString}` : ''}`);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(undefined, searchValue);
  };

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    updateFilters(categoryId, undefined);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        </form>
      </div>

      {/* Category Filters */}
      <div className="space-y-4">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>
          <span className="text-sm text-gray-600">
            {totalProjects} {totalProjects === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = currentCategoryId === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title={category.description}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Display */}
      {(currentSearch || currentCategoryId !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {currentSearch && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: &ldquo;{currentSearch}&rdquo;
              <button
                onClick={() => {
                  setSearchValue('');
                  updateFilters(undefined, '');
                }}
                className="ml-1 hover:text-blue-900"
                aria-label="Clear search"
              >
                ×
              </button>
            </span>
          )}
          
          {currentCategoryId !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {categories.find(cat => cat.id === currentCategoryId)?.label}
              <button
                onClick={() => updateFilters('all', undefined)}
                className="ml-1 hover:text-green-900"
                aria-label="Clear category filter"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
} 