import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';
import { Language } from '../types';
import {
  Sun,
  Moon,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Globe
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, slug?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome') },
    { id: 'products', label: t('navProducts') },
    { id: 'offers', label: t('navOffers') },
    { id: 'contact', label: t('navContact') },
    { id: 'admin', label: t('navAdmin') }
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 dark:bg-[#121214]/95 backdrop-blur-md border-b border-[#E8E4DC] dark:border-[#26262B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-serif text-base sm:text-xl font-bold tracking-tight text-[#2A2421] dark:text-[#F3F3F3] hover:text-[#A46843] dark:hover:text-[#DFB270] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Poonam Furniture</span>
          <span className="hidden sm:inline"> And Electronic</span>
        </button>

        {/* Zone 2: 4–5 single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A544F] dark:text-[#A39E98]">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#2A2421] dark:text-white font-semibold'
                    : 'hover:text-[#2A2421] dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A46843] dark:bg-[#DFB270] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Bag + Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Primary Action Button: Direct Phone Call */}
          <a
            href={BUSINESS_CONFIG.phoneTel}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg hover:bg-[#433833] dark:hover:bg-[#E2DFD8] transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFB270] dark:text-[#A46843]" />
            <span>{BUSINESS_CONFIG.phone}</span>
          </a>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#4A4540] dark:text-[#C5BFB8] hover:text-[#2A2421] dark:hover:text-white border border-[#E0DBD2] dark:border-[#333139] rounded-lg bg-white/60 dark:bg-[#1E1E22]/60 transition-colors"
              aria-label="Select website language"
            >
              <Globe className="w-3.5 h-3.5 text-[#A46843] dark:text-[#DFB270]" />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1A1A1E] rounded-xl shadow-xl border border-[#E0DBD2] dark:border-[#333139] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => handleLanguageSelect('en')}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                    language === 'en'
                      ? 'bg-[#FAF5ED] dark:bg-[#2A2724] text-[#A46843] dark:text-[#DFB270] font-semibold'
                      : 'text-[#4A4540] dark:text-[#C5BFB8] hover:bg-slate-50 dark:hover:bg-[#222126]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageSelect('mr')}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors font-devanagari ${
                    language === 'mr'
                      ? 'bg-[#FAF5ED] dark:bg-[#2A2724] text-[#A46843] dark:text-[#DFB270] font-semibold'
                      : 'text-[#4A4540] dark:text-[#C5BFB8] hover:bg-slate-50 dark:hover:bg-[#222126]'
                  }`}
                >
                  मराठी (Marathi)
                </button>
                <button
                  onClick={() => handleLanguageSelect('hi')}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors font-devanagari ${
                    language === 'hi'
                      ? 'bg-[#FAF5ED] dark:bg-[#2A2724] text-[#A46843] dark:text-[#DFB270] font-semibold'
                      : 'text-[#4A4540] dark:text-[#C5BFB8] hover:bg-slate-50 dark:hover:bg-[#222126]'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#4A4540] dark:text-[#C5BFB8] hover:text-[#2A2421] dark:hover:text-white border border-[#E0DBD2] dark:border-[#333139] rounded-lg bg-white/60 dark:bg-[#1E1E22]/60 transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#DFB270]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Shopping Bag Icon with Live Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#4A4540] dark:text-[#C5BFB8] hover:text-[#2A2421] dark:hover:text-white border border-[#E0DBD2] dark:border-[#333139] rounded-lg bg-white/60 dark:bg-[#1E1E22]/60 transition-colors cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A46843] dark:bg-[#DFB270] text-white dark:text-[#121214] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A4540] dark:text-[#C5BFB8] hover:text-[#2A2421] dark:hover:text-white border border-[#E0DBD2] dark:border-[#333139] rounded-lg"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4DC] dark:border-[#26262B] bg-[#FAF9F5] dark:bg-[#141416] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.id
                    ? 'bg-[#EFEAE2] dark:bg-[#202024] text-[#2A2421] dark:text-white font-semibold'
                    : 'text-[#5A544F] dark:text-[#A39E98] hover:bg-[#F4EFE6] dark:hover:bg-[#1A1A1E]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#E8E4DC] dark:border-[#26262B] flex flex-col gap-2">
            <a
              href={BUSINESS_CONFIG.phoneTel}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#DFB270] dark:text-[#A46843]" />
              <span>Call: {BUSINESS_CONFIG.phone}</span>
            </a>
            <div className="text-center text-xs text-[#7A746F] dark:text-[#88837E] pt-1">
              <span>{BUSINESS_CONFIG.locationShort}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
