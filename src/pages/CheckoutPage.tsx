import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/shop';
import { Order, Language } from '../types';
import { getOrderWhatsAppUrl } from '../config/business';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Truck,
  Store,
  ShieldCheck,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (view: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotalPaise, clearCart } = useCart();
  const { t, language } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLang, setPreferredLang] = useState<Language>(language);
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage(t('fullNamePlaceholder'));
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please provide your delivery address in the Jalna area.');
      return;
    }
    if (!privacyConsent) {
      setErrorMessage('Please accept the privacy consent to allow us to process your request.');
      return;
    }
    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before checking out.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          language: preferredLang,
          fulfillmentType,
          deliveryAddress,
          customerNotes,
          privacyConsent,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            quantity: i.quantity,
            variantName: i.variantName
          }))
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order request.');
      }

      setConfirmedOrder(data.order);
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your order.');
    } finally {
      setSubmitting(false);
    }
  };

  // Order Confirmation View
  if (confirmedOrder) {
    const totalFormatted = formatPrice(confirmedOrder.totalPaise, language);
    const whatsappUrl = getOrderWhatsAppUrl(
      confirmedOrder.reference,
      confirmedOrder.customerName,
      totalFormatted
    );

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-6 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
              {t('orderStatusPending')}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white">
              {t('orderConfirmedTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A]">
              {t('orderConfirmationNextSteps', { phone: confirmedOrder.phone })}
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-[#FAF8F5] dark:bg-[#202025] p-5 rounded-xl border border-[#E5E0D5] dark:border-[#2C2B32] max-w-md mx-auto space-y-2 text-left">
            <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
              <span>{t('orderReference')}</span>
              <span className="font-mono font-bold text-sm text-[#2A2421] dark:text-white">
                {confirmedOrder.reference}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
              <span>Customer Name</span>
              <span className="font-semibold text-[#2A2421] dark:text-white">
                {confirmedOrder.customerName}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#7A746F] dark:text-[#9A948E]">
              <span>Fulfilment</span>
              <span className="capitalize font-semibold text-[#2A2421] dark:text-white">
                {confirmedOrder.fulfillmentType === 'pickup' ? t('storePickup') : t('homeDelivery')}
              </span>
            </div>
            <div className="pt-2 border-t border-[#E5E0D5] dark:border-[#2C2B32] flex items-center justify-between text-xs">
              <span className="font-medium text-[#2A2421] dark:text-white">{t('subtotal')}</span>
              <span className="font-bold text-base text-[#2A2421] dark:text-white tabular-nums">
                {totalFormatted}
              </span>
            </div>
          </div>

          {/* WhatsApp Direct Notification CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('sendWhatsAppConfirmation')}</span>
            </a>

            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-[#2A2421] dark:text-white bg-[#EFEAE2] dark:bg-[#25252B] hover:bg-[#E5DFD5] rounded-xl transition-colors cursor-pointer"
            >
              {t('backToHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart checkout redirection
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2A2421] dark:text-white">
          {t('cartEmpty')}
        </h2>
        <button
          onClick={() => onNavigate('products')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl cursor-pointer"
        >
          {t('startShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="border-b border-[#E8E4DC] dark:border-[#28272C] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
          Order Request
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
          {t('orderRequestHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A] mt-1">
          {t('orderRequestNotice')}
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Customer Information (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
          <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
            {t('customerDetails')}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('fullName')} *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t('fullNamePlaceholder')}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#A46843]"
              />
            </div>

            {/* Mobile Phone */}
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('phoneNumber')} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phoneNumberPlaceholder')}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#A46843]"
              />
              <span className="text-[11px] text-[#8C847B]">
                We will contact you at this number to confirm stock and fulfilment.
              </span>
            </div>

            {/* Language Preference */}
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('preferredLanguage')}
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as Language)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
              >
                <option value="en">English</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* Fulfilment Method */}
            <div className="space-y-2 pt-2 border-t border-[#E8E4DC] dark:border-[#28272C]">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('fulfillmentMethod')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'border-[#A46843] dark:border-[#DFB270] bg-[#FAF5ED] dark:bg-[#252320]'
                      : 'border-[#E0DBD2] dark:border-[#333139] bg-white dark:bg-[#141416]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-xs text-[#2A2421] dark:text-white">
                      {t('storePickup')}
                    </span>
                    <span className="text-[11px] text-[#7A746F] dark:text-[#9A948E]">
                      Collect from Jalna Showroom
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'border-[#A46843] dark:border-[#DFB270] bg-[#FAF5ED] dark:bg-[#252320]'
                      : 'border-[#E0DBD2] dark:border-[#333139] bg-white dark:bg-[#141416]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-xs text-[#2A2421] dark:text-white">
                      {t('homeDelivery')}
                    </span>
                    <span className="text-[11px] text-[#7A746F] dark:text-[#9A948E]">
                      Jalna & Nearby Talukas
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery Address if selected */}
            {fulfillmentType === 'delivery' && (
              <div className="space-y-1 animate-in fade-in duration-200">
                <label className="font-semibold text-[#2A2421] dark:text-white">
                  {t('deliveryAddress')} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder={t('deliveryAddressPlaceholder')}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#A46843]"
                />
              </div>
            )}

            {/* Optional Customer Notes */}
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('orderNotes')}
              </label>
              <textarea
                rows={2}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder={t('orderNotesPlaceholder')}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#A46843]"
              />
            </div>

            {/* Privacy Consent (Section 4E) */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5A544F] dark:text-[#A8A29A]">
                <input
                  type="checkbox"
                  required
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#E0DBD2] text-[#A46843] focus:ring-[#A46843]"
                />
                <span className="leading-relaxed">{t('privacyConsent')}</span>
              </label>
            </div>

          </div>
        </div>

        {/* Order Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
          <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
            {t('orderSummary')}
          </h2>

          <div className="divide-y divide-[#E8E4DC] dark:divide-[#28272C] max-h-72 overflow-y-auto space-y-2 pr-1">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId || 'b'}`} className="pt-2 flex justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-[#2A2421] dark:text-white">
                    {item.productName}
                  </h4>
                  <span className="text-[11px] text-[#7A746F] dark:text-[#9A948E]">
                    Qty: {item.quantity} · {item.sku}
                  </span>
                </div>
                <span className="font-semibold tabular-nums text-[#2A2421] dark:text-white">
                  {formatPrice(item.pricePaise !== null ? item.pricePaise * item.quantity : null, language)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E4DC] dark:border-[#28272C] text-xs">
            <div className="flex justify-between text-[#5A544F] dark:text-[#A8A29A]">
              <span>{t('subtotal')}</span>
              <span className="font-semibold text-sm text-[#2A2421] dark:text-white tabular-nums">
                {formatPrice(subtotalPaise, language)}
              </span>
            </div>
            <div className="flex justify-between text-[#5A544F] dark:text-[#A8A29A]">
              <span>{t('deliveryFee')}</span>
              <span className="text-[11px] text-[#A46843] dark:text-[#DFB270]">
                {t('deliveryTbd')}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF5ED] dark:bg-[#202025] rounded-xl border border-[#E5E0D5] dark:border-[#2C2B32] text-[11px] text-[#7A746F] dark:text-[#A8A29A] leading-relaxed">
            {t('shopConfirmationNotice')}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-sm rounded-xl hover:bg-[#3D332D] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{submitting ? t('submitting') : t('submitOrderRequest')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
