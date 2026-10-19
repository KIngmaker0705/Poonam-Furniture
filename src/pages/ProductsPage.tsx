import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Product, Category } from '../types';
import { formatPrice } from '../utils/shop';
import { getProductWhatsAppUrl } from '../config/business';
import { ShowroomArtwork } from '../components/ShowroomArtwork';
import {
  Search,
  Filter,
  RotateCcw,
  MessageCircle,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (view: string, slug?: string) => void;
  initialCategorySlug?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, initialCategorySlug }) => {
  const { t, localize, language } = useLanguage();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategorySlug) {
      setSelectedCategory(initialCategorySlug);
    }
  }, [initialCategorySlug]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) queryParams.set('q', searchQuery.trim());
        if (selectedCategory && selectedCategory !== 'all') queryParams.set('category', selectedCategory);
        if (minPrice) queryParams.set('minPrice', minPrice);
        if (maxPrice) queryParams.set('maxPrice', maxPrice);
        if (inStockOnly) queryParams.set('inStockOnly', 'true');
        queryParams.set('sortBy', sortBy);
        queryParams.set('lang', language);

        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/products?${queryParams.toString()}`),
          fetch('/api/categories')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData.products || []);
        setCategories(catData.categories || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadData();
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy, language]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setSortBy('newest');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'all' ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E4DC] dark:border-[#28272C] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
            Digital Showroom
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
            {t('navProducts')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A]">
            {t('showingProducts', { count: products.length })}
          </p>
        </div>

        {/* Search input with SKU & Name matching */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C847B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-[#1A1A1E] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white placeholder-[#8C847B] focus:outline-hidden focus:ring-2 focus:ring-[#A46843] dark:focus:ring-[#DFB270]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C847B] hover:text-[#2A2421]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-3 py-2.5 bg-white dark:bg-[#1A1A1E] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs font-medium flex items-center gap-1.5"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('filterBy')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Filters Sidebar */}
        <aside
          className={`md:col-span-3 space-y-6 bg-white dark:bg-[#1A1A1E] p-5 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC] dark:border-[#28272C]">
            <h3 className="font-serif text-sm font-bold text-[#2A2421] dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#A46843] dark:text-[#DFB270]" />
              <span>{t('filterBy')}</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-[#A46843] dark:text-[#DFB270] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('resetFilters')}</span>
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5A544F] dark:text-[#A8A29A]">
              {t('category')}
            </label>
            <div className="flex flex-col space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#2A2421] text-white dark:bg-[#F3F3F3] dark:text-[#121214] font-semibold'
                    : 'text-[#5A544F] dark:text-[#A8A29A] hover:bg-[#F4EFE6] dark:hover:bg-[#25252B]'
                }`}
              >
                {t('allCategories')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-[#2A2421] text-white dark:bg-[#F3F3F3] dark:text-[#121214] font-semibold'
                      : 'text-[#5A544F] dark:text-[#A8A29A] hover:bg-[#F4EFE6] dark:hover:bg-[#25252B]'
                  }`}
                >
                  {localize(cat.name)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E8E4DC] dark:border-[#28272C]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5A544F] dark:text-[#A8A29A]">
              {t('priceRange')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t('minPrice')}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs"
              />
              <input
                type="number"
                placeholder={t('maxPrice')}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs"
              />
            </div>
          </div>

          {/* In-Stock Filter */}
          <div className="pt-2 border-t border-[#E8E4DC] dark:border-[#28272C]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2A2421] dark:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#E0DBD2] text-[#A46843] focus:ring-[#A46843]"
              />
              <span>{t('inStockOnly')}</span>
            </label>
          </div>

          {/* Sorting */}
          <div className="space-y-2 pt-2 border-t border-[#E8E4DC] dark:border-[#28272C]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5A544F] dark:text-[#A8A29A]">
              {t('sortBy')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs text-[#2A2421] dark:text-white"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="price_asc">{t('sortPriceLowHigh')}</option>
              <option value="price_desc">{t('sortPriceHighLow')}</option>
              <option value="name_asc">{t('sortName')}</option>
            </select>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="md:col-span-9 space-y-6">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-88 bg-white dark:bg-[#1A1A1E] rounded-xl animate-pulse border border-[#E8E4DC] dark:border-[#28272C]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5ED] dark:bg-[#232328] flex items-center justify-center text-[#8C847B]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
                {t('noProductsFound')}
              </h3>
              <p className="text-xs text-[#7A746F] dark:text-[#9A948E] max-w-sm mx-auto">
                Try adjusting your search terms, changing the category, or clearing the price filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg hover:bg-[#3D332D] transition-colors cursor-pointer"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const displayPrice = formatPrice(product.pricePaise, language);
                const artworkType = product.categorySlug || 'furniture';

                return (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-[#1A1A1E] rounded-xl border border-[#E8E4DC] dark:border-[#28272C] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="cursor-pointer"
                    >
                      {/* Visual Surface */}
                      <div className="w-full aspect-4/3 bg-[#F4EFEA] dark:bg-[#222126] relative overflow-hidden">
                        <ShowroomArtwork type={artworkType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-sm text-[#2A2421] dark:text-white border border-black/5 dark:border-white/10 shadow-xs">
                            {t(product.stockStatus)}
                          </span>
                        </div>

                        {product.isDemoSample && (
                          <div className="absolute bottom-3 left-3 right-3 text-[10px] text-[#7A746F] dark:text-[#9A948E] bg-white/80 dark:bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded truncate">
                            Demo Sample · Confirm with Store
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
                          <span className="uppercase tracking-wider font-medium">{product.categorySlug}</span>
                          <span className="font-mono">{product.sku}</span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-[#2A2421] dark:text-white group-hover:text-[#A46843] dark:group-hover:text-[#DFB270] transition-colors line-clamp-1">
                          {localize(product.name)}
                        </h3>

                        <p className="text-xs text-[#6A645E] dark:text-[#A8A29A] line-clamp-2 leading-relaxed">
                          {localize(product.description)}
                        </p>

                        <div className="pt-2 flex items-baseline gap-2">
                          <span className="text-base font-bold text-[#2A2421] dark:text-white tabular-nums">
                            {displayPrice}
                          </span>
                          {product.mrpPaise && (
                            <span className="text-xs text-[#8A847E] line-through tabular-nums">
                              {formatPrice(product.mrpPaise, language)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 pt-0 border-t border-[#F0ECE4] dark:border-[#26262B] grid grid-cols-2 gap-2 mt-3">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg hover:bg-[#3D332D] transition-colors cursor-pointer"
                      >
                        {t('addToCart')}
                      </button>

                      <a
                        href={getProductWhatsAppUrl(product.name.en, product.sku)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
