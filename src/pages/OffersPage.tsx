import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Offer } from '../types';
import { Sparkles, Calendar, Tag, ArrowRight } from 'lucide-react';

interface OffersPageProps {
  onNavigate: (view: string, slug?: string, categorySlug?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onNavigate }) => {
  const { t, localize } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await fetch('/api/offers');
        const data = await res.json();
        setOffers(data.offers || []);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      <div className="border-b border-[#E8E4DC] dark:border-[#28272C] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
          Verified Promotions
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
          {t('navOffers')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A] mt-1">
          Direct showroom packages and seasonal savings available at Poonam Wholesale Wala, Jalna.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-44 bg-white dark:bg-[#1A1A1E] rounded-2xl animate-pulse" />
        </div>
      ) : offers.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-8 space-y-3">
          <Tag className="w-8 h-8 text-[#8C847B] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
            No Active Public Promotions at this Time
          </h3>
          <p className="text-xs text-[#7A746F] dark:text-[#9A948E]">
            Please visit our showroom or contact us directly on WhatsApp for ongoing package pricing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFB270]/15 text-[#A46843] dark:text-[#DFB270] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Showroom Special</span>
                  </div>
                  {offer.discountPercentage && (
                    <span className="text-xs font-bold px-2.5 py-1 bg-[#2A2421] text-white dark:bg-[#F3F3F3] dark:text-[#121214] rounded-md tabular-nums">
                      {offer.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2421] dark:text-white">
                  {localize(offer.title)}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A544F] dark:text-[#A8A29A] leading-relaxed">
                  {localize(offer.description)}
                </p>

                <div className="p-3 bg-[#FAF8F5] dark:bg-[#202025] rounded-xl border border-[#E5E0D5] dark:border-[#2C2B32] space-y-1.5 text-xs text-[#6A645E] dark:text-[#A8A29A]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#A46843] dark:text-[#DFB270]" />
                    <span>
                      Valid until: <strong className="text-[#2A2421] dark:text-white">{offer.endDate}</strong>
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    <strong>Conditions:</strong> {localize(offer.conditions)}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E4DC] dark:border-[#28272C]">
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full py-2.5 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-xs rounded-xl hover:bg-[#3D332D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Eligible Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
