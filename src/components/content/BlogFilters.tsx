'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

/**
 * BlogFilters Component - Search and category filtering for blog posts
 * Features:
 * - Real-time search functionality
 * - Category filtering with active states
 * - URL-based state management
 * - Responsive design with mobile-friendly layout
 * - Results count display
 */

interface BlogFiltersProps {
  currentCategory: string;
  currentSearch: string;
  totalPosts: number;
}

// Available blog categories - these match the tags in your blog posts
const categories = [
  { id: 'all', label: 'All Posts', description: 'All blog content' },
  { id: 'diy', label: 'DIY Projects', description: 'Step-by-step tutorials' },
  { id: 'decor', label: 'Home Decor', description: 'Styling and decoration tips' },
  { id: 'inspiration', label: 'Inspiration', description: 'Design ideas and mood boards' },
  { id: 'lifestyle', label: 'Lifestyle', description: 'Personal stories and tips' },
  { id: 'shopping', label: 'Shopping Guides', description: 'Product recommendations' },
  { id: 'before-after', label: 'Before & After', description: 'Room transformations' },
];

export default function BlogFilters({ currentCategory, currentSearch, totalPosts }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Update URL with new filter parameters
  const updateFilters = (newCategory?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category
    if (newCategory !== undefined) {
      if (newCategory === 'all') {
        params.delete('category');
      } else {
        params.set('category', newCategory);
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
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
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
              placeholder="Search blog posts..."
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
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = currentCategory === category.id;
            
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
      {(currentSearch || currentCategory !== 'all') && (
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
          
          {currentCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {categories.find(cat => cat.id === currentCategory)?.label}
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