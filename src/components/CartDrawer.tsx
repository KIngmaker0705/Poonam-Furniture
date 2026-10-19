import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/shop';
import { ShowroomArtwork } from './ShowroomArtwork';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
  onBrowse: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onBrowse }) => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotalPaise } = useCart();
  const { t, language } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] dark:bg-[#161619] shadow-2xl flex flex-col border-l border-[#E5E0D5] dark:border-[#28272C]">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E5E0D5] dark:border-[#28272C] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#A46843] dark:text-[#DFB270]" />
              <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
                {t('shoppingCart')} ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#6E6760] hover:text-[#2A2421] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE5DC] dark:bg-[#232328] flex items-center justify-center text-[#8C847B]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#2A2421] dark:text-white">
                    {t('cartEmpty')}
                  </p>
                  <p className="text-xs text-[#7A746F] dark:text-[#9A948E]">
                    Explore handcrafted beds, steel kapat almirahs and electronics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onBrowse();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg hover:bg-[#3D332D] transition-colors"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const artworkType = item.sku.toLowerCase().includes('bed')
                  ? 'beds'
                  : item.sku.toLowerCase().includes('kapat')
                  ? 'wardrobes'
                  : item.sku.toLowerCase().includes('rot') || item.sku.toLowerCase().includes('drs')
                  ? 'rotating-dressing-tables'
                  : item.sku.toLowerCase().includes('tv')
                  ? 'televisions'
                  : item.sku.toLowerCase().includes('ref')
                  ? 'refrigerators'
                  : item.sku.toLowerCase().includes('sof')
                  ? 'sofas'
                  : 'furniture';

                return (
                  <div
                    key={`${item.productId}-${item.variantId || 'base'}`}
                    className="p-3 bg-white dark:bg-[#1E1E23] rounded-xl border border-[#E5E0D5] dark:border-[#2C2B32] flex gap-3.5 items-start"
                  >
                    <div className="w-18 h-18 rounded-lg overflow-hidden bg-[#F0EDE8] dark:bg-[#25252B] shrink-0 border border-[#E2DDD5] dark:border-[#333139]">
                      <ShowroomArtwork type={artworkType} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#2A2421] dark:text-[#F3F3F3] truncate">
                        {item.productName}
                      </h4>
                      <p className="text-[11px] text-[#7A746F] dark:text-[#9A948E] font-mono">
                        {item.sku} {item.variantName ? `· ${item.variantName}` : ''}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#2A2421] dark:text-white tabular-nums">
                          {formatPrice(item.pricePaise, language)}
                        </span>

                        <div className="flex items-center gap-1.5 bg-[#FAF9F5] dark:bg-[#161619] border border-[#E2DDD5] dark:border-[#333139] rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            className="p-0.5 text-[#5A544F] hover:text-[#2A2421] dark:hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium tabular-nums px-1.5 text-[#2A2421] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            className="p-0.5 text-[#5A544F] hover:text-[#2A2421] dark:hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-[#9A938A] hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E5E0D5] dark:border-[#28272C] bg-white/50 dark:bg-[#1A1A1E]/50 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#5A544F] dark:text-[#A8A29A]">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-sm text-[#2A2421] dark:text-white tabular-nums">
                    {formatPrice(subtotalPaise, language)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5A544F] dark:text-[#A8A29A]">
                  <span>{t('deliveryFee')}</span>
                  <span className="text-[11px] text-[#A46843] dark:text-[#DFB270]">
                    {t('deliveryTbd')}
                  </span>
                </div>
              </div>

              {/* Shop Confirmation Disclaimer (Section 4D) */}
              <p className="text-[11px] text-[#7A746F] dark:text-[#9A948E] leading-relaxed bg-[#F4EFE6] dark:bg-[#202025] p-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#2E2D34]">
                {t('shopConfirmationNotice')}
              </p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-sm rounded-xl hover:bg-[#3E342F] transition-colors shadow-md cursor-pointer"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
