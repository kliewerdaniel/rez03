'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string[];
}

interface BlogFilterProps {
  posts: BlogPost[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach(post => {
      post.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories).sort();
  }, [posts]);

  // Filter posts based on selected categories and search query
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      const categoryMatch = selectedCategories.length === 0 ||
        selectedCategories.some(category => post.categories.includes(category));

      // Search filter
      const searchMatch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && searchMatch;
    });
  }, [posts, selectedCategories, searchQuery]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8 p-6 bg-gray-900 rounded-lg">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Posts
            </label>
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
                {selectedCategories.includes(category) && (
                  <span className="ml-1">×</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredPosts.length} of {posts.length} posts
          {selectedCategories.length > 0 && (
            <span className="ml-2">
              (filtered by: {selectedCategories.join(', ')})
            </span>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-white">No posts match your filters</h3>
          <p className="mt-1 text-sm text-gray-400">
            Try adjusting your search or category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Categories */}
                {post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.categories.slice(0, 2).map(category => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-cyan-900 text-cyan-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <h2 className="text-xl font-semibold text-white mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
