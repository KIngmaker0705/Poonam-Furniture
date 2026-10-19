import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import {
  Phone,
  Mail,
  MapPin,
  Navigation,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !contact.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, subject, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry.');
      setSubmitted(true);
      setName('');
      setContact('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Error submitting enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Page Title */}
      <div className="border-b border-[#E8E4DC] dark:border-[#28272C] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
          Connect With Us
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#2A2421] dark:text-white mt-1">
          {t('aboutTitle')} & {t('navContact')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6A645E] dark:text-[#A8A29A] mt-1 max-w-2xl leading-relaxed">
          {t('aboutParagraph1')}
        </p>
      </div>

      {/* Grid: Details + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Business Details & Map (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#2A2421] dark:text-white">
              {BUSINESS_CONFIG.name}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#5A544F] dark:text-[#A8A29A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2A2421] dark:text-white font-medium">{t('address')}</strong>
                  <span className="leading-relaxed">{BUSINESS_CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0" />
                <div>
                  <strong className="block text-[#2A2421] dark:text-white font-medium">{t('phone')}</strong>
                  <a href={BUSINESS_CONFIG.phoneTel} className="font-mono text-[#2A2421] dark:text-white hover:underline">
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0" />
                <div>
                  <strong className="block text-[#2A2421] dark:text-white font-medium">{t('email')}</strong>
                  <a href={BUSINESS_CONFIG.emailMailto} className="text-[#2A2421] dark:text-white hover:underline">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#A46843] dark:text-[#DFB270] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2A2421] dark:text-white font-medium">Showroom Hours</strong>
                  <span>Mon - Sun: 9:30 AM to 9:00 PM (As configured by showroom)</span>
                </div>
              </div>
            </div>

            {/* Direct Quick Action Buttons */}
            <div className="pt-4 border-t border-[#E8E4DC] dark:border-[#28272C] flex flex-wrap gap-3">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-xs rounded-xl hover:bg-[#3D332D] transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#DFB270] dark:text-[#A46843]" />
                <span>{t('getDirections')}</span>
              </a>

              <a
                href={BUSINESS_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] text-white font-semibold text-xs rounded-xl hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('whatsappEnquiry')}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden border border-[#E8E4DC] dark:border-[#28272C] h-72 bg-[#FAF8F5] dark:bg-[#1A1A1E]">
            <iframe
              title="Showroom Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                BUSINESS_CONFIG.address
              )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            />
          </div>

        </div>

        {/* Right Column: Contact Enquiry Form (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#2A2421] dark:text-white">
              {t('sendEnquiry')}
            </h2>
            <p className="text-xs text-[#7A746F] dark:text-[#9A948E]">
              Have a question about a product, custom furniture dimensions, or bulk orders?
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-[#FAF5ED] dark:bg-[#222126] rounded-xl border border-[#DFB270]/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-base font-bold text-[#2A2421] dark:text-white">
                {t('enquirySuccess')}
              </h3>
              <p className="text-xs text-[#6A645E] dark:text-[#A8A29A]">
                Our staff will review your message and reply via Phone or WhatsApp.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 text-xs">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">
                  {t('enquiryName')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">
                  {t('enquiryContact')} *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Mobile Number or Email"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">
                  {t('enquirySubject')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquiring about King Teak Bed or 3-Door Kapat"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">
                  {t('enquiryMessage')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
                />
              </div>

              <p className="text-[11px] text-[#8C847B] leading-relaxed">
                {t('enquiryPrivacy')}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#3D332D] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending...' : t('submitEnquiry')}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
