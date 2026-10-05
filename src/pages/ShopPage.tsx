import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X, ChevronDown, Check, SlidersHorizontal, Sparkles, RotateCcw, ArrowLeftRight } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { CompareProductsModal } from '../components/shop/CompareProductsModal';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory, FragranceFamily } from '../types';
import { useShop } from '../context/ShopContext';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'all';
  initialSubcategory?: string;
  initialFilter?: string;
  onNavigateToDetail: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  initialSubcategory,
  initialFilter,
  onNavigateToDetail
}) => {
  const { showNotification } = useShop();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    initialSubcategory ? [initialSubcategory] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFragranceFamily, setSelectedFragranceFamily] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(5500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Compare Products State (up to 2 items)
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
      showNotification(`"${product.name}" removed from comparison.`);
    } else {
      if (compareList.length === 0) {
        setCompareList([product]);
        showNotification(`"${product.name}" selected (1/2). Choose one more item to compare.`);
      } else if (compareList.length === 1) {
        const nextList = [...compareList, product];
        setCompareList(nextList);
        setIsCompareModalOpen(true);
      } else {
        // Already 2 selected: replace the 2nd item and open modal
        setCompareList([compareList[0], product]);
        setIsCompareModalOpen(true);
      }
    }
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleSwapCompare = (slot: 1 | 2, newProduct: Product) => {
    if (slot === 1) {
      setCompareList((prev) => [newProduct, ...(prev[1] ? [prev[1]] : [])]);
    } else {
      setCompareList((prev) => [prev[0], newProduct]);
    }
  };

  // Sync props if URL params change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSubcategory) setSelectedSubcategories([initialSubcategory]);
    if (initialFilter === 'new') setSortBy('newest');
    if (initialFilter === 'under999') setPriceMax(999);
    if (initialFilter === 'under1499') setPriceMax(1499);
  }, [initialCategory, initialSubcategory, initialFilter]);

  // Available Subcategories based on chosen Category
  const subcategoriesByCategory: Record<string, string[]> = {
    men: [
      'Winter Jackets',
      'Oversized Hoodies',
      'Sweatshirts',
      'Knitwear',
      'Cargo Pants',
      'Winter Accessories'
    ],
    women: [
      'Winter Jackets',
      'Oversized Sweaters',
      'Hoodies',
      'Knitwear',
      'Co-ord Sets',
      'Winter Accessories'
    ],
    fragrances: [
      'Men’s Perfumes',
      'Women’s Perfumes',
      'Unisex Perfumes',
      'Eau de Parfum',
      'Travel Size',
      'Gift Sets'
    ],
    accessories: ['Caps', 'Beanies', 'Bags', 'Watches', 'Sunglasses', 'Scarves']
  };

  const handleSubcategoryToggle = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleGenderToggle = (gen: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategories([]);
    setSelectedGenders([]);
    setSelectedSizes([]);
    setSelectedFragranceFamily('');
    setPriceMax(5500);
    setMinRating(0);
    setInStockOnly(false);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter: Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter: Subcategory
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    // Filter: Gender
    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender) || p.gender === 'unisex');
    }

    // Filter: Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((sz) => selectedSizes.includes(sz)));
    }

    // Filter: Fragrance Family
    if (selectedFragranceFamily) {
      result = result.filter((p) => p.fragranceFamily === selectedFragranceFamily);
    }

    // Filter: Max Price
    result = result.filter((p) => p.price <= priceMax);

    // Filter: Rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Filter: Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Special quick filter: Sale
    if (initialFilter === 'sale') {
      result = result.filter((p) => p.discount > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [
    selectedCategory,
    selectedSubcategories,
    selectedGenders,
    selectedSizes,
    selectedFragranceFamily,
    priceMax,
    minRating,
    inStockOnly,
    sortBy,
    initialFilter
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedSubcategories.length +
    selectedGenders.length +
    selectedSizes.length +
    (selectedFragranceFamily ? 1 : 0) +
    (priceMax < 5500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] pb-24">
      {/* Header Banner */}
      <div className="bg-[#111317] border-b border-[#212632] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase">
                COLLECTIONS 2026
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide uppercase mt-1">
                {selectedCategory === 'all'
                  ? 'All Winter Drops & Fragrances'
                  : selectedCategory === 'men'
                  ? 'Men’s Winter Collection'
                  : selectedCategory === 'women'
                  ? 'Women’s Winter Collection'
                  : selectedCategory === 'fragrances'
                  ? 'Haute Perfume Atelier'
                  : 'Winter Accessories'}
              </h1>
              <p className="text-xs text-[#88909e] mt-1 max-w-xl">
                Precision layers, heavy-GSM streetwear, and pure French-macerated Extraits de Parfum.
              </p>
            </div>

            {/* Quick Price Drops */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPriceMax(999)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  priceMax === 999
                    ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e]'
                    : 'bg-[#161820] text-[#88909e] border-[#252b38] hover:text-white'
                }`}
              >
                Under ₹999
              </button>
              <button
                onClick={() => setPriceMax(1499)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  priceMax === 1499
                    ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e]'
                    : 'bg-[#161820] text-[#88909e] border-[#252b38] hover:text-white'
                }`}
              >
                Under ₹1,499
              </button>
              <button
                onClick={() => setPriceMax(2499)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  priceMax === 2499
                    ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e]'
                    : 'bg-[#161820] text-[#88909e] border-[#252b38] hover:text-white'
                }`}
              >
                Under ₹2,499
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Total count, Mobile filter button, Sort dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#1f232d] gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#14161f] border border-[#262c3a] text-xs font-semibold uppercase tracking-wider text-white"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#c9a96e]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <span className="text-xs text-[#88909e] font-mono">
              Showing <strong className="text-white font-semibold">{filteredProducts.length}</strong> items
            </span>

            {/* Compare Bar Action */}
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                compareList.length > 0
                  ? 'bg-[#dfbe7d]/10 border-[#dfbe7d] text-[#dfbe7d] hover:bg-[#dfbe7d]/20'
                  : 'bg-[#14161f] border-[#262c3a] text-[#88909e] hover:text-white'
              }`}
              title="Compare up to 2 items side-by-side"
            >
              <ArrowLeftRight className="h-3.5 w-3.5 text-[#dfbe7d]" />
              <span>
                Compare ({compareList.length}/2)
              </span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-[#88909e] uppercase tracking-wider font-mono">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#14161f] border border-[#272d3a] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e] cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="newest">Newest Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-4 border-b border-[#1b1f28]">
            <span className="text-xs text-[#88909e]">Active:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1a1c24] border border-[#2a2f3d] text-xs text-white uppercase font-mono">
                {selectedCategory}
                <X className="h-3 w-3 cursor-pointer text-[#88909e] hover:text-white" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedSubcategories.map((sub) => (
              <span key={sub} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1a1c24] border border-[#2a2f3d] text-xs text-white uppercase font-mono">
                {sub}
                <X className="h-3 w-3 cursor-pointer text-[#88909e] hover:text-white" onClick={() => handleSubcategoryToggle(sub)} />
              </span>
            ))}
            {selectedFragranceFamily && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1a1c24] border border-[#2a2f3d] text-xs text-[#dfbe7d] uppercase font-mono">
                {selectedFragranceFamily}
                <X className="h-3 w-3 cursor-pointer text-[#88909e] hover:text-white" onClick={() => setSelectedFragranceFamily('')} />
              </span>
            )}
            {priceMax < 5500 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1a1c24] border border-[#2a2f3d] text-xs text-white uppercase font-mono">
                Max ₹{priceMax}
                <X className="h-3 w-3 cursor-pointer text-[#88909e] hover:text-white" onClick={() => setPriceMax(5500)} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#dfbe7d] hover:underline ml-2 flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset All
            </button>
          </div>
        )}

        {/* Content Layout: Left Sidebar Filters + Right Product Grid */}
        <div className="flex gap-8 pt-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            {/* Department */}
            <div className="border-b border-[#212632] pb-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d] mb-3">
                Department
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'men', label: 'Men’s Winter' },
                  { id: 'women', label: 'Women’s Winter' },
                  { id: 'fragrances', label: 'Haute Fragrances' },
                  { id: 'accessories', label: 'Accessories' }
                ].map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => {
                      setSelectedCategory(dept.id);
                      setSelectedSubcategories([]);
                    }}
                    className={`w-full text-left py-1.5 px-2 transition-colors flex justify-between items-center ${
                      selectedCategory === dept.id
                        ? 'bg-[#181a24] text-[#dfbe7d] font-semibold border-l-2 border-[#dfbe7d]'
                        : 'text-[#88909e] hover:text-white'
                    }`}
                  >
                    <span>{dept.label}</span>
                    <span className="text-[10px] font-mono text-[#5c6270]">
                      {dept.id === 'all'
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === dept.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories (Dynamic) */}
            {selectedCategory !== 'all' && subcategoriesByCategory[selectedCategory] && (
              <div className="border-b border-[#212632] pb-5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d] mb-3">
                  Categories
                </h3>
                <div className="space-y-2 text-xs">
                  {subcategoriesByCategory[selectedCategory].map((sub) => {
                    const isChecked = selectedSubcategories.includes(sub);
                    return (
                      <label
                        key={sub}
                        className="flex items-center gap-2.5 cursor-pointer text-[#88909e] hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSubcategoryToggle(sub)}
                          className="h-3.5 w-3.5 rounded-none bg-[#14161f] border-[#292f3d] text-[#c9a96e] focus:ring-0 cursor-pointer"
                        />
                        <span className={isChecked ? 'text-white font-medium' : ''}>{sub}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fragrance Families (if in fragrance or all) */}
            {(selectedCategory === 'all' || selectedCategory === 'fragrances') && (
              <div className="border-b border-[#212632] pb-5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d] mb-3">
                  Fragrance Family
                </h3>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {['woody', 'fresh', 'musky', 'spicy', 'sweet', 'aquatic'].map((fam) => (
                    <button
                      key={fam}
                      onClick={() =>
                        setSelectedFragranceFamily((curr) => (curr === fam ? '' : fam))
                      }
                      className={`px-2 py-1.5 uppercase font-mono text-[10px] tracking-wider border transition-colors ${
                        selectedFragranceFamily === fam
                          ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e] font-bold'
                          : 'bg-[#15171f] text-[#88909e] border-[#252b38] hover:text-white'
                      }`}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Slider */}
            <div className="border-b border-[#212632] pb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d]">
                  Max Price
                </h3>
                <span className="text-xs font-semibold text-white font-mono">
                  ₹{priceMax.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="699"
                max="5500"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1 bg-[#252b38] accent-[#c9a96e] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#606674] font-mono mt-1">
                <span>₹699</span>
                <span>₹5,500</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="border-b border-[#212632] pb-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d] mb-3">
                Size / Volume
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '50ml', '100ml'].map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSizeToggle(sz)}
                      className={`min-w-9 px-2 py-1 text-[11px] font-mono uppercase border transition-colors ${
                        isSelected
                          ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e] font-bold'
                          : 'bg-[#15171f] text-[#88909e] border-[#252b38] hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pb-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#88909e] hover:text-white">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-3.5 w-3.5 rounded-none bg-[#14161f] border-[#292f3d] text-[#c9a96e] focus:ring-0 cursor-pointer"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#12141a] border border-[#212632] p-8">
                <p className="text-base font-serif text-white mb-2">No matching products found</p>
                <p className="text-xs text-[#88909e] max-w-sm mx-auto mb-6">
                  Try adjusting your filter options or clearing the current selection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigateToDetail={onNavigateToDetail}
                    onToggleCompare={handleToggleCompare}
                    isComparing={compareList.some((p) => p.id === product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Comparison Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-fadeIn">
          <div className="bg-[#101219]/95 backdrop-blur-md border border-[#2b3346] shadow-2xl p-3 sm:px-5 sm:py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 pointer-events-auto max-w-2xl w-full">
            {/* Left: Info */}
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-[#dfbe7d]/10 border border-[#dfbe7d]/30 flex items-center justify-center text-[#dfbe7d] flex-shrink-0">
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Compare Pieces ({compareList.length}/2)
                </div>
                <div className="text-[10px] text-[#88909e] font-mono">
                  {compareList.length === 1
                    ? 'Pick 1 more piece from the shop'
                    : '2 items ready for full side-by-side spec comparison'}
                </div>
              </div>
            </div>

            {/* Middle: Previews */}
            <div className="flex items-center gap-2">
              {/* Item 1 */}
              <div className="flex items-center gap-1.5 bg-[#171a24] border border-[#272f42] p-1 pr-2 max-w-[140px] relative">
                <img
                  src={compareList[0].images[0]}
                  alt={compareList[0].name}
                  className="h-7 w-7 object-cover bg-black flex-shrink-0"
                />
                <span className="text-[11px] text-white truncate font-medium">
                  {compareList[0].name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFromCompare(compareList[0].id)}
                  className="text-[#88909e] hover:text-white p-0.5 cursor-pointer ml-1"
                  aria-label="Remove item 1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Item 2 */}
              {compareList[1] ? (
                <div className="flex items-center gap-1.5 bg-[#171a24] border border-[#272f42] p-1 pr-2 max-w-[140px] relative">
                  <img
                    src={compareList[1].images[0]}
                    alt={compareList[1].name}
                    className="h-7 w-7 object-cover bg-black flex-shrink-0"
                  />
                  <span className="text-[11px] text-white truncate font-medium">
                    {compareList[1].name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFromCompare(compareList[1].id)}
                    className="text-[#88909e] hover:text-white p-0.5 cursor-pointer ml-1"
                    aria-label="Remove item 2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-[#343d52] px-2.5 py-1 text-[10px] font-mono text-[#717b91]">
                  + 2nd Item
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearCompare}
                className="px-2 py-1.5 text-[11px] font-mono text-[#88909e] hover:text-white uppercase transition-colors cursor-pointer"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                disabled={compareList.length < 2}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  compareList.length === 2
                    ? 'bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] shadow-lg shadow-[#dfbe7d]/20 cursor-pointer'
                    : 'bg-[#1b1f2b] text-[#555d70] border border-[#282f40] cursor-not-allowed'
                }`}
              >
                <span>Compare</span>
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Products Side-by-Side Modal */}
      <CompareProductsModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        product1={compareList[0] || null}
        product2={compareList[1] || null}
        onRemoveProduct={handleRemoveFromCompare}
        onNavigateToDetail={onNavigateToDetail}
        onSwapProduct={handleSwapCompare}
        allProducts={PRODUCTS}
      />

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#111317] border-l border-[#242832] h-full flex flex-col p-6 overflow-y-auto text-[#f5f3ef] z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#212632] mb-4">
              <h3 className="font-serif text-lg font-bold text-white uppercase">Filter Pieces</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-[#88909e] p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Department */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[#dfbe7d] mb-2">Department</h4>
              <div className="space-y-1 text-xs">
                {['all', 'men', 'women', 'fragrances', 'accessories'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedCategory(dept);
                      setSelectedSubcategories([]);
                    }}
                    className={`w-full text-left py-1.5 px-2 uppercase font-mono ${
                      selectedCategory === dept
                        ? 'bg-[#c9a96e] text-[#0a0b0d] font-bold'
                        : 'text-[#88909e]'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[#dfbe7d] font-mono mb-2">
                <span>MAX PRICE</span>
                <span className="text-white">₹{priceMax}</span>
              </div>
              <input
                type="range"
                min="699"
                max="5500"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#c9a96e]"
              />
            </div>

            <div className="mt-auto pt-4 border-t border-[#212632] flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 bg-[#1e222b] text-xs font-semibold uppercase text-white"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#c9a96e] text-xs font-bold uppercase text-[#0a0b0d]"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
