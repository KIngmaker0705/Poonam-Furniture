import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatPrice } from '../utils/shop';
import { getProductWhatsAppUrl } from '../config/business';
import { ShowroomArtwork } from '../components/ShowroomArtwork';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Share2,
  Check,
  ShieldCheck,
  Layers,
  Ruler,
  Truck,
  Plus,
  Minus
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (view: string, slug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const { t, localize, language } = useLanguage();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data.product);
        setRelated(data.related || []);
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    setQuantity(1);
    setAdded(false);
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 h-96 bg-[#ECE7DF] dark:bg-[#202025] rounded-2xl animate-pulse" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 w-32 bg-[#ECE7DF] dark:bg-[#202025] rounded animate-pulse" />
            <div className="h-10 w-full bg-[#ECE7DF] dark:bg-[#202025] rounded animate-pulse" />
            <div className="h-32 w-full bg-[#ECE7DF] dark:bg-[#202025] rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2A2421] dark:text-white">
          Product Not Found
        </h2>
        <button
          onClick={() => onNavigate('products')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const displayPrice = formatPrice(product.pricePaise, language);
  const artworkType = product.categorySlug || 'furniture';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6760] dark:text-[#A8A29A] hover:text-[#2A2421] dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Product Catalogue</span>
        </button>
      </div>

      {/* Main PDP Grid (Contiguous purchase module as per E-Commerce Reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
        
        {/* Left Column: Gallery & Art Surface (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#F4EFEA] dark:bg-[#202025] border border-[#E8E4DC] dark:border-[#28272C] relative shadow-md">
            <ShowroomArtwork type={artworkType} className="w-full h-full object-cover" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/95 dark:bg-black/85 backdrop-blur-sm text-[#2A2421] dark:text-white border border-black/5 dark:border-white/10 shadow-sm">
                {t(product.stockStatus)}
              </span>
            </div>

            {product.isDemoSample && (
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#7A746F] dark:text-[#9A948E] bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/5">
                Demonstration Sample · Store Verification Required for Inventory
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] shadow-sm">
          
          <div className="space-y-2 border-b border-[#E8E4DC] dark:border-[#28272C] pb-5">
            <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
              <span className="uppercase tracking-wider font-semibold text-[#A46843] dark:text-[#DFB270]">
                {product.categorySlug}
              </span>
              <span className="font-mono">{product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white leading-tight">
              {localize(product.name)}
            </h1>

            {/* Price display */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white tabular-nums">
                {displayPrice}
              </span>
              {product.mrpPaise && (
                <span className="text-sm text-[#8C847B] line-through tabular-nums">
                  {formatPrice(product.mrpPaise, language)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs sm:text-sm text-[#5A544F] dark:text-[#A8A29A] leading-relaxed">
            <p>{localize(product.description)}</p>
          </div>

          {/* Specifications (Dimensions & Material) */}
          <div className="space-y-2.5 pt-4 border-t border-[#E8E4DC] dark:border-[#28272C] text-xs">
            {product.dimensions && (
              <div className="flex items-center gap-2.5 text-[#5A544F] dark:text-[#A8A29A]">
                <Ruler className="w-4 h-4 text-[#A46843] dark:text-[#DFB270] shrink-0" />
                <span>
                  <strong className="text-[#2A2421] dark:text-white font-medium">{t('dimensions')}:</strong> {product.dimensions}
                </span>
              </div>
            )}
            {product.material && (
              <div className="flex items-center gap-2.5 text-[#5A544F] dark:text-[#A8A29A]">
                <Layers className="w-4 h-4 text-[#A46843] dark:text-[#DFB270] shrink-0" />
                <span>
                  <strong className="text-[#2A2421] dark:text-white font-medium">{t('material')}:</strong> {product.material}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-[#5A544F] dark:text-[#A8A29A]">
              <Truck className="w-4 h-4 text-[#A46843] dark:text-[#DFB270] shrink-0" />
              <span>Jalna Showroom Pickup & District Home Delivery</span>
            </div>
          </div>

          {/* Quantity and Purchase Actions */}
          <div className="space-y-3 pt-4 border-t border-[#E8E4DC] dark:border-[#28272C]">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#5A544F] dark:text-[#A8A29A]">
                {t('quantity')}
              </label>
              <div className="flex items-center border border-[#E0DBD2] dark:border-[#333139] rounded-lg bg-[#FAF9F5] dark:bg-[#141416] px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#5A544F] hover:text-[#2A2421] dark:hover:text-white cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold tabular-nums text-[#2A2421] dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#5A544F] hover:text-[#2A2421] dark:hover:text-white cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-sm rounded-xl hover:bg-[#3D332D] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? t('addedToCart') : t('addToCart')}</span>
              </button>

              <a
                href={getProductWhatsAppUrl(product.name.en, product.sku, window.location.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1DA851] dark:text-[#25D366] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#25D366]/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('whatsappEnquiry')}</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-[#6E6760] dark:text-[#A8A29A] hover:text-[#2A2421] dark:hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? t('linkCopied') : t('shareProduct')}</span>
              </button>
            </div>
          </div>

          {/* Shop Confirmation Disclaimer */}
          <div className="p-3 bg-[#FAF5ED] dark:bg-[#22201D] rounded-xl border border-[#DFB270]/30 text-[11px] text-[#7A746F] dark:text-[#A8A29A] leading-relaxed">
            {t('shopConfirmationNotice')}
          </div>

        </div>

      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-[#E8E4DC] dark:border-[#28272C]">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2421] dark:text-white">
            {t('relatedProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('product-detail', item.slug)}
                className="bg-white dark:bg-[#1A1A1E] rounded-xl border border-[#E8E4DC] dark:border-[#28272C] p-3 space-y-2 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-[#F4EFEA] dark:bg-[#222126]">
                  <ShowroomArtwork type={item.categorySlug} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#2A2421] dark:text-white truncate">
                  {localize(item.name)}
                </h3>
                <div className="text-xs font-bold text-[#A46843] dark:text-[#DFB270] tabular-nums">
                  {formatPrice(item.pricePaise, language)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
