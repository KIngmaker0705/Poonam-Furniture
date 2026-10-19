import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG, getProductWhatsAppUrl } from '../config/business';
import { Product, Category, GooglePlaceRatingResponse } from '../types';
import { formatPrice } from '../utils/shop';
import { ShowroomArtwork } from '../components/ShowroomArtwork';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Package
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string, slug?: string, categorySlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, localize, language } = useLanguage();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [googleRating, setGoogleRating] = useState<GooglePlaceRatingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes, ratingRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/places/ratings')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        const ratingData = await ratingRes.json();

        setFeaturedProducts((prodData.products || []).filter((p: Product) => p.isFeatured).slice(0, 6));
        setCategories(catData.categories || []);
        setGoogleRating(ratingData);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const furnitureCategories = categories.filter((c) => c.type === 'furniture');
  const electronicsCategories = categories.filter((c) => c.type === 'electronics');

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Storefront Hero Section */}
      <section className="relative overflow-hidden bg-[#241E1B] text-[#FAF8F5] pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-[#3D332D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Copy (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFB270]/15 text-[#DFB270] text-xs font-semibold tracking-wide border border-[#DFB270]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Poonam Wholesale Wala · Jalna</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance">
                {t('heroHeading')}
              </h1>

              <p className="text-sm sm:text-base text-[#C7BEB5] leading-relaxed">
                {t('heroSubheading')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-5 py-3 text-sm font-semibold text-[#181412] bg-[#DFB270] hover:bg-[#EAD09F] rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('heroCtaProducts')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('offers')}
                  className="px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors cursor-pointer"
                >
                  {t('heroCtaOffers')}
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-3 text-sm font-medium text-[#C7BEB5] hover:text-white transition-colors cursor-pointer"
                >
                  {t('heroCtaContact')}
                </button>
              </div>

              {/* Key Trust Strip */}
              <div className="pt-4 border-t border-[#3D332D] grid grid-cols-3 gap-3 text-xs text-[#A89E94]">
                <div>
                  <span className="block font-semibold text-white">Direct Wholesale</span>
                  <span>Jalna Showroom</span>
                </div>
                <div>
                  <span className="block font-semibold text-white">Solid Teak & Steel</span>
                  <span>Authentic Materials</span>
                </div>
                <div>
                  <span className="block font-semibold text-white">District Delivery</span>
                  <span>Safe Dispatch</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Asset (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#4A3D36] bg-[#181412] aspect-16/10">
                <ShowroomArtwork type="hero" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/15">
                  Showroom Digital Collection
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Furniture & Electronics Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Furniture Collections */}
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#E8E4DC] dark:border-[#28272C] pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
                Crafted Wood & Steel
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
                {t('furnitureShowcase')}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs sm:text-sm font-semibold text-[#A46843] dark:text-[#DFB270] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('allCategories')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {furnitureCategories.slice(0, 8).map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('products', undefined, cat.slug)}
                className="group p-4 bg-white dark:bg-[#1A1A1E] rounded-xl border border-[#E8E4DC] dark:border-[#28272C] hover:border-[#A46843] dark:hover:border-[#DFB270] transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-[#F7F4EE] dark:bg-[#222126] mb-3 border border-[#ECE7DE] dark:border-[#2D2C33]">
                  <ShowroomArtwork type={cat.slug} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#2A2421] dark:text-white group-hover:text-[#A46843] dark:group-hover:text-[#DFB270] transition-colors">
                    {localize(cat.name)}
                  </h3>
                  <span className="text-xs text-[#7A746F] dark:text-[#A39E98] mt-0.5 block">
                    Direct Showroom
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Electronics Collections */}
        <div className="space-y-6 pt-6">
          <div className="flex items-end justify-between border-b border-[#E8E4DC] dark:border-[#28272C] pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
                Home Appliances & TV
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
                {t('electronicsShowcase')}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs sm:text-sm font-semibold text-[#A46843] dark:text-[#DFB270] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('allCategories')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {electronicsCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('products', undefined, cat.slug)}
                className="group p-4 bg-white dark:bg-[#1A1A1E] rounded-xl border border-[#E8E4DC] dark:border-[#28272C] hover:border-[#A46843] dark:hover:border-[#DFB270] transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-[#F7F4EE] dark:bg-[#222126] mb-3 border border-[#ECE7DE] dark:border-[#2D2C33]">
                  <ShowroomArtwork type={cat.slug} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#2A2421] dark:text-white group-hover:text-[#A46843] dark:group-hover:text-[#DFB270] transition-colors">
                    {localize(cat.name)}
                  </h3>
                  <span className="text-xs text-[#7A746F] dark:text-[#A39E98] mt-0.5 block">
                    Certified Brand
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. Featured Showroom Pieces (PDP route & Cart Action) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
            Curated Showroom
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white">
            {t('featuredTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A]">
            {t('featuredSubtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-[#ECE7DF] dark:bg-[#202025] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
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
                      
                      {/* Stock Status Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-sm text-[#2A2421] dark:text-white border border-black/5 dark:border-white/10 shadow-xs">
                          {t(product.stockStatus)}
                        </span>
                      </div>

                      {product.isDemoSample && (
                        <div className="absolute bottom-3 left-3 right-3 text-[10px] text-[#7A746F] dark:text-[#9A948E] bg-white/80 dark:bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded truncate">
                          Demonstration Sample · Store Verification Required
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
                        <span className="uppercase tracking-wider font-medium">{product.categorySlug}</span>
                        <span className="font-mono">{product.sku}</span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#2A2421] dark:text-white group-hover:text-[#A46843] dark:group-hover:text-[#DFB270] transition-colors line-clamp-1">
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

                  {/* Actions Bar */}
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
      </section>

      {/* 4. Verified Business Benefits ("Why Shop With Us") */}
      <section className="bg-[#F3EFE9] dark:bg-[#161619] py-14 border-y border-[#E2DDD5] dark:border-[#28272C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
              Verified Trust
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white">
              {t('whyShopWithUs')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BUSINESS_CONFIG.verifiedBenefits.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-[#1E1E23] p-6 rounded-xl border border-[#E5E0D5] dark:border-[#2C2B32] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF5ED] dark:bg-[#262422] flex items-center justify-center text-[#A46843] dark:text-[#DFB270]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
                  {language === 'mr' ? b.titleMr : language === 'hi' ? b.titleHi : b.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A] leading-relaxed">
                  {language === 'mr' ? b.descMr : language === 'hi' ? b.descHi : b.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Google Customer Ratings & Reviews Section (Section 5 compliance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A46843] dark:text-[#DFB270]">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Google Business Listing</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white">
                {t('googleRatingsTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A] leading-relaxed max-w-2xl">
                {googleRating?.configured && googleRating.rating
                  ? `Poonam Wholesale Wala holds an average star rating of ${googleRating.rating} (${googleRating.userRatingsTotal} Google reviews).`
                  : t('googleRatingsFallbackText')}
              </p>
              <div className="text-[11px] text-[#8C847B] dark:text-[#7A746F]">
                Address: {BUSINESS_CONFIG.address}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl hover:bg-[#3D332D] transition-colors shadow-sm"
              >
                <span>{t('readGoogleReviews')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-[#8C847B]">
                Opens Google Maps directions & reviews
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Showroom Location & Navigation Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
            Showroom Directions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white">
            {t('storeLocation')}
          </h2>
        </div>

        <div className="bg-[#FAF8F5] dark:bg-[#18181C] rounded-2xl border border-[#E5E0D5] dark:border-[#2C2B32] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#2A2421] dark:text-white">
                  {BUSINESS_CONFIG.name}
                </h3>
                <p className="text-xs text-[#A46843] dark:text-[#DFB270] font-medium">
                  Poonam Wholesale Wala, Naveen Munda Pati
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A544F] dark:text-[#A8A29A]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A46843] dark:text-[#DFB270] shrink-0 mt-0.5" />
                  <span>{BUSINESS_CONFIG.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#A46843] dark:text-[#DFB270] shrink-0" />
                  <a href={BUSINESS_CONFIG.phoneTel} className="font-mono text-[#2A2421] dark:text-white hover:underline">
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4DC] dark:border-[#28272C] space-y-3">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#A46843] dark:bg-[#DFB270] text-white dark:text-[#141211] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#8D5837] transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('getDirections')}</span>
              </a>
              <p className="text-[11px] text-[#8C847B] text-center">
                Near Mage Kushi Park, Jalna, Maharashtra 431203
              </p>
            </div>
          </div>

          {/* Interactive Directions Preview */}
          <div className="lg:col-span-7 bg-[#EFEAE2] dark:bg-[#202025] min-h-[300px] flex items-center justify-center relative border-t lg:border-t-0 lg:border-l border-[#E5E0D5] dark:border-[#2C2B32]">
            <iframe
              title="Poonam Furniture And Electronic Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                BUSINESS_CONFIG.address
              )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            />
          </div>

        </div>
      </section>

    </div>
  );
};
