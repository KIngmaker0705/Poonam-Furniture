import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, Mail, MapPin, Navigation, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#211C19] text-[#E5DFD6] dark:bg-[#0C0B0B] dark:text-[#D1CBC3] border-t border-[#382F2A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Business Overview */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-tight">
              {BUSINESS_CONFIG.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A097] leading-relaxed">
              {t('brandTagline')}. Handcrafted wooden beds, heavy gauge steel kapat almirahs, modular sofas, and home electronics at direct showroom wholesale value.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DFB270]/15 text-[#DFB270] hover:bg-[#DFB270]/25 text-xs font-semibold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#DFB270]">
              Digital Showroom
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B8B0A7]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navProducts')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navOffers')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navContact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#DFB270] transition-colors cursor-pointer"
                >
                  {t('navAdmin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#DFB270]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B8B0A7]">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Solid Teak Beds & Bedroom Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Steel Kapat Almirahs & Wardrobes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rotating Vanity Dressing Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smart LED TVs & Appliances
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Inverter Refrigerators & Fans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Store Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#DFB270]">
              Showroom Location
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#B8B0A7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFB270] shrink-0 mt-0.5" />
                <span className="leading-snug">{BUSINESS_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFB270] shrink-0" />
                <a href={BUSINESS_CONFIG.phoneTel} className="hover:text-white transition-colors font-mono">
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFB270] shrink-0" />
                <a href={BUSINESS_CONFIG.emailMailto} className="hover:text-white transition-colors truncate">
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#DFB270] hover:underline"
                >
                  <span>{t('getDirections')}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#382F2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8177]">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. {t('footerRights')}
          </div>
          <div className="text-center sm:text-right">
            {t('footerLegal')}
          </div>
        </div>
      </div>
    </footer>
  );
};
