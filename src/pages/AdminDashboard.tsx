import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Product,
  Category,
  Order,
  OrderStatus,
  StockMovement,
  PriceHistoryItem,
  AuditLog,
  StoreSettings,
  UserRole
} from '../types';
import { formatPrice } from '../utils/shop';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Boxes,
  ShoppingBag,
  Megaphone,
  Settings,
  ClipboardList,
  LogOut,
  Plus,
  Edit,
  Trash2,
  FileDown,
  Upload,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  Eye,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  // Authentication State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('pfe_admin_token'));
  const [currentUser, setCurrentUser] = useState<{ username: string; role: UserRole; name: string } | null>(() => {
    const saved = localStorage.getItem('pfe_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('Poonam@Jalna2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'pricing' | 'inventory' | 'orders' | 'marketing' | 'settings' | 'audit'
  >('overview');

  // Data states
  const [overviewMetrics, setOverviewMetrics] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setStoreSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Product modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({
    sku: '',
    categoryId: '',
    nameEn: '',
    nameMr: '',
    nameHi: '',
    descEn: '',
    priceRupees: '',
    mrpRupees: '',
    offerPriceRupees: '',
    stock: '5',
    lowStockThreshold: '2',
    dimensions: '',
    material: '',
    isPublished: true,
    isFeatured: false,
    isNewArrival: false
  });

  // Stock Movement modal
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockForm, setStockForm] = useState({
    productId: '',
    movementType: 'received' as any,
    quantityChange: '1',
    reason: ''
  });

  // Bulk Price modal
  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [bulkForm, setBulkForm] = useState({
    categoryId: 'all',
    adjustmentType: 'percentage',
    value: '5',
    reason: ''
  });

  // CSV Import modal
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvReport, setCsvReport] = useState<any[] | null>(null);

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Notification Banner
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      setToken(data.token);
      setCurrentUser(data.user);
      localStorage.setItem('pfe_admin_token', data.token);
      localStorage.setItem('pfe_admin_user', JSON.stringify(data.user));
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('pfe_admin_token');
    localStorage.removeItem('pfe_admin_user');
  };

  // Fetch admin data on tab change or token update
  useEffect(() => {
    if (!token) return;

    async function loadData() {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      try {
        if (activeTab === 'overview') {
          const res = await fetch('/api/admin/overview', { headers });
          if (res.status === 401) {
            handleLogout();
            return;
          }
          const data = await res.json();
          if (res.ok && data.metrics) {
            setOverviewMetrics(data);
          }
        } else if (activeTab === 'products') {
          const [pRes, cRes] = await Promise.all([
            fetch('/api/admin/products', { headers }),
            fetch('/api/categories')
          ]);
          if (pRes.status === 401) {
            handleLogout();
            return;
          }
          setProducts((await pRes.json()).products || []);
          setCategories((await cRes.json()).categories || []);
        } else if (activeTab === 'pricing') {
          const [pRes, phRes, cRes] = await Promise.all([
            fetch('/api/admin/products', { headers }),
            fetch('/api/admin/pricing/history', { headers }),
            fetch('/api/categories')
          ]);
          if (pRes.status === 401) {
            handleLogout();
            return;
          }
          setProducts((await pRes.json()).products || []);
          setPriceHistory((await phRes.json()).priceHistory || []);
          setCategories((await cRes.json()).categories || []);
        } else if (activeTab === 'inventory') {
          const [pRes, mRes] = await Promise.all([
            fetch('/api/admin/products', { headers }),
            fetch('/api/admin/inventory/movements', { headers })
          ]);
          if (pRes.status === 401) {
            handleLogout();
            return;
          }
          setProducts((await pRes.json()).products || []);
          setMovements((await mRes.json()).movements || []);
        } else if (activeTab === 'orders') {
          const res = await fetch('/api/admin/orders', { headers });
          if (res.status === 401) {
            handleLogout();
            return;
          }
          setOrders((await res.json()).orders || []);
        } else if (activeTab === 'settings') {
          const res = await fetch('/api/settings');
          setStoreSettings((await res.json()).settings);
        } else if (activeTab === 'audit') {
          const res = await fetch('/api/admin/audit-logs', { headers });
          if (res.status === 401) {
            handleLogout();
            return;
          }
          setAuditLogs((await res.json()).auditLogs || []);
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token, activeTab]);

  // Open Product Modal
  const openProductForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProdForm({
        sku: product.sku,
        categoryId: product.categoryId,
        nameEn: product.name.en,
        nameMr: product.name.mr,
        nameHi: product.name.hi,
        descEn: product.description.en,
        priceRupees: product.pricePaise !== null ? (product.pricePaise / 100).toString() : '',
        mrpRupees: product.mrpPaise ? (product.mrpPaise / 100).toString() : '',
        offerPriceRupees: product.offerPricePaise ? (product.offerPricePaise / 100).toString() : '',
        stock: product.stock.toString(),
        lowStockThreshold: product.lowStockThreshold.toString(),
        dimensions: product.dimensions || '',
        material: product.material || '',
        isPublished: product.isPublished,
        isFeatured: product.isFeatured,
        isNewArrival: product.isNewArrival
      });
    } else {
      setEditingProduct(null);
      setProdForm({
        sku: 'PFE-' + Math.floor(100 + Math.random() * 900),
        categoryId: categories[0]?.id || '',
        nameEn: '',
        nameMr: '',
        nameHi: '',
        descEn: '',
        priceRupees: '',
        mrpRupees: '',
        offerPriceRupees: '',
        stock: '5',
        lowStockThreshold: '2',
        dimensions: '',
        material: '',
        isPublished: true,
        isFeatured: false,
        isNewArrival: true
      });
    }
    setShowProductModal(true);
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const payload = {
      sku: prodForm.sku,
      categoryId: prodForm.categoryId || categories[0]?.id,
      name: {
        en: prodForm.nameEn,
        mr: prodForm.nameMr || prodForm.nameEn,
        hi: prodForm.nameHi || prodForm.nameEn
      },
      description: {
        en: prodForm.descEn,
        mr: prodForm.descEn,
        hi: prodForm.descEn
      },
      pricePaise: prodForm.priceRupees ? Math.round(parseFloat(prodForm.priceRupees) * 100) : null,
      mrpPaise: prodForm.mrpRupees ? Math.round(parseFloat(prodForm.mrpRupees) * 100) : null,
      offerPricePaise: prodForm.offerPriceRupees ? Math.round(parseFloat(prodForm.offerPriceRupees) * 100) : null,
      stock: parseInt(prodForm.stock, 10) || 0,
      lowStockThreshold: parseInt(prodForm.lowStockThreshold, 10) || 2,
      dimensions: prodForm.dimensions,
      material: prodForm.material,
      isPublished: prodForm.isPublished,
      isFeatured: prodForm.isFeatured,
      isNewArrival: prodForm.isNewArrival
    };

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      showToast(editingProduct ? 'Product updated successfully.' : 'Product created successfully.');
      setShowProductModal(false);
      // Refresh products
      const pRes = await fetch('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } });
      setProducts((await pRes.json()).products || []);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Product (Owner Only)
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete product');
      showToast('Product deleted.');
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Record Stock Movement
  const handleRecordStockMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/inventory/movement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stockForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record movement');

      showToast('Stock movement logged.');
      setShowStockModal(false);
      // Refresh inventory
      const [pRes, mRes] = await Promise.all([
        fetch('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/inventory/movements', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProducts((await pRes.json()).products || []);
      setMovements((await mRes.json()).movements || []);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Bulk Price Adjust
  const handleBulkPriceAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/pricing/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bulkForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bulk adjustment failed');

      showToast(`Updated prices for ${data.updatedCount} products.`);
      setShowBulkPriceModal(false);
      // Refresh pricing
      const [pRes, phRes] = await Promise.all([
        fetch('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/pricing/history', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProducts((await pRes.json()).products || []);
      setPriceHistory((await phRes.json()).priceHistory || []);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nextStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update order status');

      showToast(`Order status updated to "${nextStatus}".`);
      setOrders(orders.map((o) => (o.id === orderId ? data.order : o)));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(data.order);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['sku', 'nameEn', 'categorySlug', 'priceRupees', 'stock', 'dimensions', 'material'];
    const rows = products.map((p) => [
      p.sku,
      `"${p.name.en.replace(/"/g, '""')}"`,
      p.categorySlug,
      p.pricePaise !== null ? (p.pricePaise / 100).toString() : '',
      p.stock.toString(),
      `"${(p.dimensions || '').replace(/"/g, '""')}"`,
      `"${(p.material || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `poonam_products_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV text
  const handleImportCsv = async () => {
    if (!csvText.trim() || !token) return;

    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      alert('CSV must contain a header row and at least one data row.');
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const parsedRows = lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] || '';
      });
      return obj;
    });

    try {
      const res = await fetch('/api/admin/products/import-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rows: parsedRows })
      });
      const data = await res.json();
      if (!res.ok) {
        setCsvReport(data.validationReport || []);
        alert(data.error || 'Import failed validation');
        return;
      }

      showToast(`Successfully imported ${data.count} products.`);
      setShowCsvModal(false);
      setCsvText('');
      setCsvReport(null);
      // Refresh
      const pRes = await fetch('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } });
      setProducts((await pRes.json()).products || []);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Store Settings (Owner Only)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !token) return;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');

      showToast('Showroom settings updated.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!token || !currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="bg-white dark:bg-[#1A1A1E] p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#FAF5ED] dark:bg-[#252320] flex items-center justify-center text-[#A46843] dark:text-[#DFB270] mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#2A2421] dark:text-white">
              {t('adminLogin')}
            </h1>
            <p className="text-xs text-[#7A746F] dark:text-[#9A948E]">
              Poonam Furniture And Electronic · Staff Portal
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-700 dark:text-rose-300">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('username')}
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">
                {t('password')}
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs sm:text-sm text-[#2A2421] dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 px-4 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#3D332D] transition-colors shadow-md cursor-pointer disabled:opacity-50"
            >
              {loggingIn ? 'Authenticating...' : t('signIn')}
            </button>
          </form>

          {/* Initial Staff Accounts Assistance */}
          <div className="pt-4 border-t border-[#E8E4DC] dark:border-[#28272C] text-[11px] text-[#7A746F] dark:text-[#9A948E] space-y-1.5">
            <p className="font-semibold text-[#2A2421] dark:text-white">Configured Staff Credentials:</p>
            <p>• Owner: <span className="font-mono">admin</span> / <span className="font-mono">Poonam@Jalna2026</span></p>
            <p>• Manager: <span className="font-mono">manager</span> / <span className="font-mono">Manager@Jalna2026</span></p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A2421] text-white dark:bg-[#F3F3F3] dark:text-[#121214] px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-white/10 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Staff Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1A1A1E] p-4 sm:p-6 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A46843] dark:text-[#DFB270]">
            Staff Portal · {currentUser.role === 'owner' ? t('ownerRole') : t('managerRole')}
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#2A2421] dark:text-white">
            {currentUser.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('signOut')}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E8E4DC] dark:border-[#28272C] overflow-x-auto pb-px text-xs font-medium">
        {[
          { id: 'overview', label: t('tabOverview'), icon: LayoutDashboard },
          { id: 'products', label: t('tabProducts'), icon: Package },
          { id: 'pricing', label: t('tabPricing'), icon: TrendingUp },
          { id: 'inventory', label: t('tabInventory'), icon: Boxes },
          { id: 'orders', label: t('tabOrders'), icon: ShoppingBag },
          { id: 'settings', label: t('tabSettings'), icon: Settings, ownerOnly: true },
          { id: 'audit', label: t('tabAudit'), icon: ClipboardList, ownerOnly: true }
        ].map((tab) => {
          if (tab.ownerOnly && currentUser.role !== 'owner') return null;
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-[#A46843] dark:border-[#DFB270] text-[#2A2421] dark:text-white font-bold'
                  : 'border-transparent text-[#6E6760] dark:text-[#A8A29A] hover:text-[#2A2421] dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && overviewMetrics && overviewMetrics.metrics && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1A1A1E] p-5 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
              <span className="text-xs text-[#7A746F] dark:text-[#9A948E] font-medium">{t('publishedCount')}</span>
              <p className="text-2xl font-bold text-[#2A2421] dark:text-white mt-1 tabular-nums">
                {overviewMetrics.metrics.published} / {overviewMetrics.metrics.total}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1E] p-5 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
              <span className="text-xs text-[#7A746F] dark:text-[#9A948E] font-medium">{t('lowStockCount')}</span>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                {overviewMetrics.metrics.lowStock}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1E] p-5 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
              <span className="text-xs text-[#7A746F] dark:text-[#9A948E] font-medium">{t('outOfStockCount')}</span>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                {overviewMetrics.metrics.outOfStock}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1E] p-5 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C]">
              <span className="text-xs text-[#7A746F] dark:text-[#9A948E] font-medium">{t('pendingOrdersCount')}</span>
              <p className="text-2xl font-bold text-[#A46843] dark:text-[#DFB270] mt-1 tabular-nums">
                {overviewMetrics.metrics.pendingOrders}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#2A2421] dark:text-white">
                Recent Order Requests
              </h3>
              <div className="divide-y divide-[#E8E4DC] dark:divide-[#28272C] text-xs">
                {(!overviewMetrics.recentOrders || overviewMetrics.recentOrders.length === 0) ? (
                  <p className="py-4 text-[#8C847B]">No order requests yet.</p>
                ) : (
                  overviewMetrics.recentOrders.map((ord: Order) => (
                    <div key={ord.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-[#2A2421] dark:text-white">{ord.reference}</span>
                        <p className="text-[11px] text-[#7A746F]">{ord.customerName} · {ord.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold tabular-nums">{formatPrice(ord.totalPaise, language)}</span>
                        <p className="text-[10px] uppercase font-bold text-[#A46843] dark:text-[#DFB270]">{ord.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Stock Movements */}
            <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#2A2421] dark:text-white">
                Recent Stock Ledger Movements
              </h3>
              <div className="divide-y divide-[#E8E4DC] dark:divide-[#28272C] text-xs">
                {(!overviewMetrics.recentMovements || overviewMetrics.recentMovements.length === 0) ? (
                  <p className="py-4 text-[#8C847B]">No inventory movements recorded.</p>
                ) : (
                  overviewMetrics.recentMovements.map((sm: StockMovement) => (
                    <div key={sm.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-[#2A2421] dark:text-white">{sm.productName}</span>
                        <p className="text-[11px] text-[#7A746F]">{sm.reason} · by {sm.staffName}</p>
                      </div>
                      <span className={`font-mono font-bold tabular-nums ${sm.quantityChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {sm.quantityChange >= 0 ? `+${sm.quantityChange}` : sm.quantityChange}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Catalogue & Inventory Products ({products.length})
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="px-3.5 py-2 text-xs font-semibold text-[#2A2421] dark:text-white bg-[#EFEAE2] dark:bg-[#25252B] rounded-xl hover:bg-[#E5DFD5] flex items-center gap-1.5 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{t('exportCsv')}</span>
              </button>

              <button
                onClick={() => setShowCsvModal(true)}
                className="px-3.5 py-2 text-xs font-semibold text-[#2A2421] dark:text-white bg-[#EFEAE2] dark:bg-[#25252B] rounded-xl hover:bg-[#E5DFD5] flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{t('importCsv')}</span>
              </button>

              <button
                onClick={() => openProductForm()}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl hover:bg-[#3D332D] flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('createProduct')}</span>
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] dark:bg-[#141416] border-b border-[#E8E4DC] dark:border-[#28272C] text-[#5A544F] dark:text-[#A8A29A]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Product Name</th>
                    <th className="py-3 px-4 font-semibold">SKU</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Selling Price</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC] dark:divide-[#28272C]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-[#202025]">
                      <td className="py-3 px-4 font-medium text-[#2A2421] dark:text-white">
                        {p.name.en}
                        {p.isDemoSample && (
                          <span className="ml-2 text-[10px] text-[#A46843] dark:text-[#DFB270] bg-[#FAF5ED] dark:bg-[#262420] px-1.5 py-0.5 rounded">
                            Demo
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#6E6760]">{p.sku}</td>
                      <td className="py-3 px-4 capitalize">{p.categorySlug}</td>
                      <td className="py-3 px-4 font-semibold tabular-nums">
                        {formatPrice(p.pricePaise, language)}
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums">
                        <span className={p.stock <= p.lowStockThreshold ? 'text-amber-600 font-bold' : ''}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0EDE8] dark:bg-[#2A2A30]">
                          {t(p.stockStatus)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openProductForm(p)}
                          className="p-1 text-[#5A544F] hover:text-[#2A2421] dark:hover:text-white"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {currentUser.role === 'owner' && (
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name.en)}
                            className="p-1 text-rose-600 hover:text-rose-700"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRICE MANAGEMENT TAB */}
      {activeTab === 'pricing' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Price Management & History
            </h2>

            {currentUser.role === 'owner' && (
              <button
                onClick={() => setShowBulkPriceModal(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl hover:bg-[#3D332D] cursor-pointer"
              >
                Bulk Price Adjustment
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#2A2421] dark:text-white">
              Price Change Audit Ledger
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] dark:bg-[#141416] border-b border-[#E8E4DC] dark:border-[#28272C] text-[#5A544F]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                    <th className="py-2.5 px-3 font-semibold">Product</th>
                    <th className="py-2.5 px-3 font-semibold">Old Price</th>
                    <th className="py-2.5 px-3 font-semibold">New Price</th>
                    <th className="py-2.5 px-3 font-semibold">Reason</th>
                    <th className="py-2.5 px-3 font-semibold">Changed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC] dark:divide-[#28272C]">
                  {priceHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-[#8C847B]">
                        No price adjustments recorded yet.
                      </td>
                    </tr>
                  ) : (
                    priceHistory.map((ph) => (
                      <tr key={ph.id}>
                        <td className="py-2.5 px-3 text-[#7A746F]">{new Date(ph.timestamp).toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-medium text-[#2A2421] dark:text-white">{ph.productName}</td>
                        <td className="py-2.5 px-3 tabular-nums">{formatPrice(ph.oldPricePaise, language)}</td>
                        <td className="py-2.5 px-3 font-bold tabular-nums">{formatPrice(ph.newPricePaise, language)}</td>
                        <td className="py-2.5 px-3 text-[#5A544F]">{ph.reason}</td>
                        <td className="py-2.5 px-3 text-[#7A746F]">{ph.changedBy}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. INVENTORY TAB (STOCK LEDGER) */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Stock Movement Ledger
            </h2>

            <button
              onClick={() => {
                setStockForm({
                  productId: products[0]?.id || '',
                  movementType: 'received',
                  quantityChange: '1',
                  reason: ''
                });
                setShowStockModal(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl hover:bg-[#3D332D] cursor-pointer"
            >
              {t('recordStockMovement')}
            </button>
          </div>

          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] dark:bg-[#141416] border-b border-[#E8E4DC] dark:border-[#28272C] text-[#5A544F]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                    <th className="py-2.5 px-3 font-semibold">Product</th>
                    <th className="py-2.5 px-3 font-semibold">Movement Type</th>
                    <th className="py-2.5 px-3 font-semibold">Change</th>
                    <th className="py-2.5 px-3 font-semibold">Balance After</th>
                    <th className="py-2.5 px-3 font-semibold">Reason</th>
                    <th className="py-2.5 px-3 font-semibold">Staff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC] dark:divide-[#28272C]">
                  {movements.map((sm) => (
                    <tr key={sm.id}>
                      <td className="py-2.5 px-3 text-[#7A746F]">{new Date(sm.timestamp).toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-medium text-[#2A2421] dark:text-white">{sm.productName}</td>
                      <td className="py-2.5 px-3 font-mono uppercase text-[10px]">{sm.movementType}</td>
                      <td className={`py-2.5 px-3 font-bold font-mono tabular-nums ${sm.quantityChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {sm.quantityChange >= 0 ? `+${sm.quantityChange}` : sm.quantityChange}
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono tabular-nums">{sm.afterQuantity}</td>
                      <td className="py-2.5 px-3 text-[#5A544F]">{sm.reason}</td>
                      <td className="py-2.5 px-3 text-[#7A746F]">{sm.staffName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Customer Order Requests ({orders.length})
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] dark:bg-[#141416] border-b border-[#E8E4DC] dark:border-[#28272C] text-[#5A544F]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Reference</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Customer</th>
                    <th className="py-3 px-4 font-semibold">Items</th>
                    <th className="py-3 px-4 font-semibold">Total</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC] dark:divide-[#28272C]">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-[#8C847B]">
                        No orders recorded.
                      </td>
                    </tr>
                  ) : (
                    orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-[#202025]">
                        <td className="py-3 px-4 font-mono font-bold text-[#2A2421] dark:text-white">
                          {ord.reference}
                        </td>
                        <td className="py-3 px-4 text-[#7A746F]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-[#2A2421] dark:text-white">{ord.customerName}</span>
                          <p className="text-[11px] text-[#7A746F]">{ord.phone}</p>
                        </td>
                        <td className="py-3 px-4">{ord.items.length} items</td>
                        <td className="py-3 px-4 font-bold tabular-nums">
                          {formatPrice(ord.totalPaise, language)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FAF5ED] dark:bg-[#292723] text-[#A46843] dark:text-[#DFB270]">
                            {ord.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-[#2A2421] dark:text-white bg-[#EFEAE2] dark:bg-[#25252B] rounded-lg hover:bg-[#E5DFD5]"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. SETTINGS TAB (Owner Only) */}
      {activeTab === 'settings' && settings && currentUser.role === 'owner' && (
        <form onSubmit={handleSaveSettings} className="bg-white dark:bg-[#1A1A1E] p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-6 animate-in fade-in duration-150">
          <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
            Showroom Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">Business Name</label>
              <input
                type="text"
                disabled
                value={settings.businessName}
                className="w-full px-3 py-2 bg-[#F4EFEA] dark:bg-[#161619] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs opacity-75"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-[#2A2421] dark:text-white">Phone</label>
              <input
                type="text"
                disabled
                value={settings.phone}
                className="w-full px-3 py-2 bg-[#F4EFEA] dark:bg-[#161619] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs opacity-75"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="font-semibold text-[#2A2421] dark:text-white">Opening Hours</label>
              <input
                type="text"
                value={settings.openingHours}
                onChange={(e) => setStoreSettings({ ...settings, openingHours: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="font-semibold text-[#2A2421] dark:text-white">Google Place ID (For Live Ratings Integration)</label>
              <input
                type="text"
                value={settings.googlePlaceId}
                onChange={(e) => setStoreSettings({ ...settings, googlePlaceId: e.target.value })}
                placeholder="Optional Place ID (e.g. ChIJ...)"
                className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
              />
              <span className="text-[11px] text-[#8C847B]">
                Places API key is kept securely on the server via GOOGLE_MAPS_API_KEY. Leaving this empty keeps the verified directions fallback active.
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2A2421] dark:bg-[#F3F3F3] dark:text-[#121214] rounded-xl hover:bg-[#3D332D] cursor-pointer"
          >
            {t('saveChanges')}
          </button>
        </form>
      )}

      {/* 7. AUDIT LOGS TAB (Owner Only) */}
      {activeTab === 'audit' && currentUser.role === 'owner' && (
        <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-2xl border border-[#E8E4DC] dark:border-[#28272C] space-y-4 animate-in fade-in duration-150">
          <h2 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
            Administrative Audit History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] dark:bg-[#141416] border-b border-[#E8E4DC] dark:border-[#28272C] text-[#5A544F]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-3 font-semibold">User</th>
                  <th className="py-2.5 px-3 font-semibold">Role</th>
                  <th className="py-2.5 px-3 font-semibold">Action</th>
                  <th className="py-2.5 px-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC] dark:divide-[#28272C]">
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="py-2.5 px-3 text-[#7A746F]">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-medium text-[#2A2421] dark:text-white">{log.userName}</td>
                    <td className="py-2.5 px-3 uppercase text-[10px] font-bold">{log.role}</td>
                    <td className="py-2.5 px-3 font-mono">{log.action}</td>
                    <td className="py-2.5 px-3 text-[#5A544F]">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODALS */}
      {/* ----------------------------------------------------------- */}

      {/* Product Form Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-[#E8E4DC] dark:border-[#28272C] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC] dark:border-[#28272C]">
              <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-[#8C847B] hover:text-[#2A2421]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">SKU / Product Code *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.sku}
                    onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">Category *</label>
                  <select
                    value={prodForm.categoryId}
                    onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.en} ({c.type})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multilingual Names */}
              <div className="space-y-3 p-3 bg-[#FAF8F5] dark:bg-[#141416] rounded-xl border border-[#E0DBD2] dark:border-[#333139]">
                <span className="font-bold text-[#2A2421] dark:text-white block">Localized Product Names</span>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="English Name (e.g. Royal Teak Bed)"
                    value={prodForm.nameEn}
                    onChange={(e) => setProdForm({ ...prodForm, nameEn: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#1E1E23] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Marathi Name (मराठी)"
                    value={prodForm.nameMr}
                    onChange={(e) => setProdForm({ ...prodForm, nameMr: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#1E1E23] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Hindi Name (हिंदी)"
                    value={prodForm.nameHi}
                    onChange={(e) => setProdForm({ ...prodForm, nameHi: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#1E1E23] border border-[#E0DBD2] dark:border-[#333139] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Pricing in Rupees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">Selling Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Leave blank for 'Contact for price'"
                    value={prodForm.priceRupees}
                    onChange={(e) => setProdForm({ ...prodForm, priceRupees: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">MRP (₹)</label>
                  <input
                    type="number"
                    placeholder="Original MRP"
                    value={prodForm.mrpRupees}
                    onChange={(e) => setProdForm({ ...prodForm, mrpRupees: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">Stock Count</label>
                  <input
                    type="number"
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Dimensions & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">Dimensions (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 72 x 78 inches"
                    value={prodForm.dimensions}
                    onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2421] dark:text-white">Material (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Solid Teakwood, Cold Rolled Steel"
                    value={prodForm.material}
                    onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isPublished}
                    onChange={(e) => setProdForm({ ...prodForm, isPublished: e.target.checked })}
                  />
                  <span>Published on Website</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                  />
                  <span>Featured Collection</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E4DC] dark:border-[#28272C]">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl text-[#7A746F] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Movement Modal */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E4DC] dark:border-[#28272C] shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Record Stock Movement
            </h3>
            <form onSubmit={handleRecordStockMovement} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Product</label>
                <select
                  value={stockForm.productId}
                  onChange={(e) => setStockForm({ ...stockForm, productId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.en} (Current Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Movement Type</label>
                <select
                  value={stockForm.movementType}
                  onChange={(e) => setStockForm({ ...stockForm, movementType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                >
                  <option value="received">Stock Received (Inbound)</option>
                  <option value="sold_in_shop">Sold In Showroom</option>
                  <option value="damaged">Damaged / Missing</option>
                  <option value="correction">Inventory Correction</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Quantity Change (e.g. +5 or -2)</label>
                <input
                  type="number"
                  required
                  value={stockForm.quantityChange}
                  onChange={(e) => setStockForm({ ...stockForm, quantityChange: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Mandatory Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Factory delivery receipt #841 or Walk-in customer purchase"
                  value={stockForm.reason}
                  onChange={(e) => setStockForm({ ...stockForm, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="px-3 py-1.5 rounded-lg text-[#7A746F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold rounded-lg"
                >
                  Save Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Price Adjustment Modal */}
      {showBulkPriceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E4DC] dark:border-[#28272C] shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Bulk Price Adjustment
            </h3>
            <form onSubmit={handleBulkPriceAdjust} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Category Scope</label>
                <select
                  value={bulkForm.categoryId}
                  onChange={(e) => setBulkForm({ ...bulkForm, categoryId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                >
                  <option value="all">All Products with Verified Pricing</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name.en}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Adjustment Type</label>
                <select
                  value={bulkForm.adjustmentType}
                  onChange={(e) => setBulkForm({ ...bulkForm, adjustmentType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                >
                  <option value="percentage">Percentage (e.g. +5% or -10%)</option>
                  <option value="flat_rupees">Flat Rupees (e.g. +500 or -1000)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Adjustment Value</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={bulkForm.value}
                  onChange={(e) => setBulkForm({ ...bulkForm, value: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2421] dark:text-white">Mandatory Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Seasonal festive tariff update"
                  value={bulkForm.reason}
                  onChange={(e) => setBulkForm({ ...bulkForm, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowBulkPriceModal(false)}
                  className="px-3 py-1.5 rounded-lg text-[#7A746F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold rounded-lg"
                >
                  Apply Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E8E4DC] dark:border-[#28272C] shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
              Import Products from CSV
            </h3>
            <p className="text-xs text-[#7A746F] dark:text-[#9A948E]">
              Paste CSV text with columns: <span className="font-mono">sku, nameEn, categorySlug, priceRupees, stock</span>
            </p>

            <textarea
              rows={8}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="sku,nameEn,categorySlug,priceRupees,stock&#10;PFE-BED-99,Solid Wood Bed,beds,28000,4"
              className="w-full px-3 py-2 font-mono text-xs bg-[#FAF9F5] dark:bg-[#141416] border border-[#E0DBD2] dark:border-[#333139] rounded-xl"
            />

            {csvReport && (
              <div className="max-h-36 overflow-y-auto p-2 bg-rose-50 dark:bg-rose-950/40 text-[11px] rounded border border-rose-200">
                {csvReport.map((r, i) => (
                  <div key={i} className="text-rose-700">
                    Row {r.rowIndex}: {r.errors.join('; ')}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCsvModal(false)}
                className="px-3 py-1.5 rounded-lg text-[#7A746F]"
              >
                Cancel
              </button>
              <button
                onClick={handleImportCsv}
                className="px-4 py-1.5 bg-[#2A2421] dark:bg-[#F3F3F3] text-white dark:text-[#121214] font-semibold rounded-lg"
              >
                Validate & Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-[#E8E4DC] dark:border-[#28272C] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC] dark:border-[#28272C]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A46843] dark:text-[#DFB270]">Order Details</span>
                <h3 className="font-serif text-lg font-bold text-[#2A2421] dark:text-white">
                  {selectedOrder.reference}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#8C847B] hover:text-[#2A2421]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] dark:bg-[#141416] rounded-xl">
                <div>
                  <span className="text-[#8C847B]">Customer Name</span>
                  <p className="font-semibold text-[#2A2421] dark:text-white">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className="text-[#8C847B]">Phone Number</span>
                  <p className="font-mono font-semibold text-[#2A2421] dark:text-white">{selectedOrder.phone}</p>
                </div>
                <div>
                  <span className="text-[#8C847B]">Fulfilment</span>
                  <p className="capitalize font-semibold text-[#2A2421] dark:text-white">{selectedOrder.fulfillmentType}</p>
                </div>
                <div>
                  <span className="text-[#8C847B]">Status</span>
                  <p className="uppercase font-bold text-[#A46843] dark:text-[#DFB270]">{selectedOrder.status.replace('_', ' ')}</p>
                </div>
              </div>

              {selectedOrder.deliveryAddress && (
                <div className="p-3 bg-[#FAF8F5] dark:bg-[#141416] rounded-xl">
                  <span className="text-[#8C847B]">Delivery Address</span>
                  <p className="text-[#2A2421] dark:text-white mt-0.5">{selectedOrder.deliveryAddress}</p>
                </div>
              )}

              {/* Items */}
              <div className="space-y-1.5 pt-2">
                <span className="font-bold text-[#2A2421] dark:text-white">Items Ordered</span>
                <div className="divide-y divide-[#E8E4DC] dark:divide-[#28272C] border border-[#E8E4DC] dark:border-[#28272C] rounded-xl p-3">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-2 flex justify-between">
                      <div>
                        <p className="font-semibold text-[#2A2421] dark:text-white">{it.productName}</p>
                        <span className="text-[11px] text-[#7A746F]">Qty: {it.quantity} · SKU: {it.sku}</span>
                      </div>
                      <span className="font-semibold tabular-nums">{formatPrice(it.lineTotalPaise, language)}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between font-bold text-sm">
                    <span>Total Amount</span>
                    <span className="tabular-nums">{formatPrice(selectedOrder.totalPaise, language)}</span>
                  </div>
                </div>
              </div>

              {/* Transition actions */}
              <div className="pt-3 border-t border-[#E8E4DC] dark:border-[#28272C] space-y-2">
                <span className="font-bold text-[#2A2421] dark:text-white block">Update Order Status</span>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.status === 'pending_confirmation' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'confirmed')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer"
                    >
                      Confirm Order & Allocate Stock
                    </button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processing')}
                      className="px-3 py-1.5 bg-[#2A2421] text-white rounded-lg font-semibold cursor-pointer"
                    >
                      Set to Processing
                    </button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <>
                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'ready_for_pickup')}
                        className="px-3 py-1.5 bg-[#A46843] text-white rounded-lg font-semibold cursor-pointer"
                      >
                        Ready for Pickup
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'out_for_delivery')}
                        className="px-3 py-1.5 bg-[#A46843] text-white rounded-lg font-semibold cursor-pointer"
                      >
                        Out for Delivery
                      </button>
                    </>
                  )}
                  {['ready_for_pickup', 'out_for_delivery'].includes(selectedOrder.status) && (
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold cursor-pointer"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {!['completed', 'cancelled'].includes(selectedOrder.status) && (
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg font-semibold cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
