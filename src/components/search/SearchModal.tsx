import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowRight, Sparkles, Clock, Flame } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

interface SearchModalProps {
  onNavigateToDetail: (slug: string) => void;
  onNavigateToCategory: (category: string) => void;
}

const TRENDING_SEARCHES = [
  'Midnight Noir',
  'Arctic Puffer',
  'Acid Frost Hoodie',
  'Velvet Night',
  'Tactical Cargos',
  'Discovery Set',
  'Cashmere Coat',
  'Merino Beanie'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  onNavigateToDetail,
  onNavigateToCategory
}) => {
  const { products, isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saksox_recent_searches');
      return saved ? JSON.parse(saved) : ['Puffer Jacket', 'Midnight Noir', 'Hoodie'];
    } catch {
      return ['Puffer Jacket', 'Midnight Noir', 'Hoodie'];
    }
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('saksox_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('saksox_recent_searches');
  };

  // Instant multi-field search filtering
  const qLower = query.toLowerCase().trim();
  const searchResults: Product[] = qLower
    ? products.filter((p) => {
        return (
          p.name.toLowerCase().includes(qLower) ||
          p.description.toLowerCase().includes(qLower) ||
          p.subcategory.toLowerCase().includes(qLower) ||
          p.category.toLowerCase().includes(qLower) ||
          (p.fragranceFamily && p.fragranceFamily.toLowerCase().includes(qLower)) ||
          (p.materials && p.materials.toLowerCase().includes(qLower)) ||
          p.tags?.some((t) => t.toLowerCase().includes(qLower)) ||
          p.colors?.some((c) => c.name.toLowerCase().includes(qLower)) ||
          (p.winterCollection && p.winterCollection.toLowerCase().includes(qLower))
        );
      })
    : [];

  const handleProductClick = (slug: string) => {
    if (query) saveRecentSearch(query);
    setIsSearchOpen(false);
    onNavigateToDetail(slug);
  };

  const handleCategoryClick = (cat: string) => {
    setIsSearchOpen(false);
    onNavigateToCategory(cat);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen px-4 pt-12 pb-20 sm:px-6 md:px-8 max-w-4xl mx-auto flex flex-col z-10">
        {/* Search Input Bar */}
        <div className="relative w-full bg-[#14161d] border border-[#272d3b] shadow-2xl">
          <div className="flex items-center px-4 py-3 sm:py-4">
            <SearchIcon className="h-5 w-5 text-[#c9a96e] mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jackets, hoodies, signature scents, beanies..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-[#5f6676] focus:outline-none tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#88909e] hover:text-white px-2 py-1 uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 p-1.5 text-[#88909e] hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-4 bg-[#111317] border border-[#222733] p-5 sm:p-6 shadow-2xl text-[#f5f3ef]">
          {/* If no query, show Recent Searches & Trending */}
          {!query ? (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#88909e] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#c9a96e]" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecent}
                      className="text-[10px] text-[#636977] hover:text-white"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1.5 bg-[#181a22] hover:bg-[#232733] border border-[#262c3a] text-xs text-[#d1d5db] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#88909e] mb-3">
                  <Flame className="h-3.5 w-3.5 text-[#e11d48]" />
                  Trending Searches in Winter 2026
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectSearch(term)}
                      className="px-3 py-1.5 bg-[#181a22] hover:bg-[#232733] border border-[#262c3a] text-xs text-[#d1d5db] transition-colors flex items-center gap-1"
                    >
                      <span>{term}</span>
                      <ArrowRight className="h-3 w-3 text-[#c9a96e] opacity-70" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div className="pt-4 border-t border-[#222733]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#88909e] mb-3">
                  Explore by Department
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Men’s Winter', cat: 'men' },
                    { label: 'Women’s Winter', cat: 'women' },
                    { label: 'Luxury Perfumes', cat: 'fragrances' },
                    { label: 'Winter Accessories', cat: 'accessories' }
                  ].map((dept) => (
                    <button
                      key={dept.cat}
                      onClick={() => handleCategoryClick(dept.cat)}
                      className="p-3 text-left bg-[#15171e] hover:bg-[#1f232c] border border-[#262b37] transition-all group"
                    >
                      <p className="text-xs font-medium text-white group-hover:text-[#c9a96e]">
                        {dept.label}
                      </p>
                      <span className="text-[10px] text-[#636977] uppercase tracking-wider">
                        Browse Collection →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results View */
            <div>
              <div className="flex items-center justify-between text-xs text-[#88909e] mb-4 pb-2 border-b border-[#222733]">
                <span>
                  Showing {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} for "{query}"
                </span>
                {searchResults.length > 0 && (
                  <span className="text-[11px] text-[#c9a96e]">Instant SAKSOX Search</span>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm font-medium text-white mb-1">No products found for "{query}"</p>
                  <p className="text-xs text-[#88909e] max-w-sm mx-auto mb-4">
                    Try searching for "puffer", "fragrance", "hoodie", "cargos" or "beanie".
                  </p>
                  <button
                    onClick={() => setQuery('')}
                    className="px-4 py-2 bg-[#1d212b] hover:bg-[#282d3b] text-xs uppercase tracking-wider text-white border border-[#313747]"
                  >
                    View Trending
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="flex gap-3 bg-[#15171f] p-2.5 border border-[#222733] hover:border-[#383e4d] transition-all cursor-pointer group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-16 w-14 object-cover flex-shrink-0 bg-[#0c0d10]"
                      />
                      <div className="flex flex-col justify-center overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest text-[#88909e]">
                          {product.subcategory}
                        </span>
                        <h4 className="text-xs font-medium text-white group-hover:text-[#c9a96e] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-white">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-[10px] text-[#22c55e]">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
