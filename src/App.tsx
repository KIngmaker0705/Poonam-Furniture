import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DemoAdminNotice } from './demo/DemoAdminNotice';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);
  const [initialCategorySlug, setInitialCategorySlug] = useState<string | undefined>(undefined);

  // Sync state with browser location hash / query parameters
  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const parts = hash.split('/');
      const view = parts[0] || 'home';
      const slug = parts[1];

      setCurrentView(view);
      setCurrentSlug(slug);
    };

    handleLocation();
    window.addEventListener('hashchange', handleLocation);
    return () => window.removeEventListener('hashchange', handleLocation);
  }, []);

  const navigateTo = (view: string, slug?: string, categorySlug?: string) => {
    setCurrentView(view);
    setCurrentSlug(slug);
    if (categorySlug) {
      setInitialCategorySlug(categorySlug);
    }
    const hash = slug ? `#${view}/${slug}` : `#${view}`;
    window.history.pushState(null, '', hash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E1E1E] dark:bg-[#121214] dark:text-[#F3F3F3] transition-colors">
            
            {/* Announcement bar */}
            <AnnouncementBar />

            {/* Top Bar Header */}
            <Header currentView={currentView} onNavigate={navigateTo} />

            {/* Dynamic Page Views */}
            <main className="flex-1">
              {currentView === 'home' && (
                <HomePage onNavigate={navigateTo} />
              )}
              {currentView === 'products' && (
                <ProductsPage onNavigate={navigateTo} initialCategorySlug={initialCategorySlug} />
              )}
              {currentView === 'product-detail' && currentSlug && (
                <ProductDetailPage slug={currentSlug} onNavigate={navigateTo} />
              )}
              {currentView === 'offers' && (
                <OffersPage onNavigate={navigateTo} />
              )}
              {currentView === 'contact' && (
                <ContactPage />
              )}
              {currentView === 'checkout' && (
                <CheckoutPage onNavigate={navigateTo} />
              )}
              {currentView === 'admin' && (
                <DemoAdminNotice onBack={() => navigateTo('home')} />
              )}
            </main>

            {/* Shopping Cart Drawer */}
            <CartDrawer
              onCheckout={() => navigateTo('checkout')}
              onBrowse={() => navigateTo('products')}
            />

            {/* Footer */}
            <Footer onNavigate={navigateTo} />

          </div>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
