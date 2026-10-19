/**
 * Static demo API for GitHub Pages.
 * Replaces the Express backend: catalogue is served from bundled JSON,
 * orders / enquiries are kept only in this browser's localStorage.
 * No admin credentials or private data are included in the demo.
 */
import data from './demo-data.json';
import { filterAndSortProducts, calculateOrderTotals } from '../utils/shop';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const load = (key: string): any[] => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};
const save = (key: string, v: any[]) => {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
};

async function handle(url: URL, method: string, body: any): Promise<Response> {
  const path = url.pathname.replace(/^.*\/api/, '');
  const d: any = data;

  if (method === 'GET') {
    if (path === '/settings') return json({ settings: d.storeSettings });
    if (path === '/categories')
      return json({ categories: d.categories.filter((c: any) => c.isActive).sort((a: any, b: any) => a.displayOrder - b.displayOrder) });
    if (path === '/products') {
      const q = url.searchParams;
      const list = filterAndSortProducts(
        d.products,
        {
          query: q.get('q') || undefined,
          categorySlug: q.get('category') || undefined,
          minPriceRupees: q.get('minPrice') ? parseFloat(q.get('minPrice')!) : undefined,
          maxPriceRupees: q.get('maxPrice') ? parseFloat(q.get('maxPrice')!) : undefined,
          inStockOnly: q.get('inStockOnly') === 'true',
          sortBy: (q.get('sortBy') as any) || undefined,
        },
        (q.get('lang') as any) || 'en'
      );
      return json({ products: list, total: list.length });
    }
    if (path.startsWith('/products/')) {
      const slug = decodeURIComponent(path.slice('/products/'.length));
      const product = d.products.find((p: any) => p.slug === slug && p.isPublished);
      if (!product) return json({ error: 'Product not found or not published.' }, 404);
      const related = d.products.filter((p: any) => p.categoryId === product.categoryId && p.id !== product.id && p.isPublished).slice(0, 4);
      return json({ product, related });
    }
    if (path === '/offers') {
      // Demo: always show offers so the page never looks empty after the date window ends
      return json({ offers: d.offers.filter((o: any) => o.isActive) });
    }
    if (path === '/places/ratings')
      return json({
        configured: false,
        message: 'See what customers are saying about Poonam Wholesale Wala on Google Maps.',
        directionsUrl: d.storeSettings.directionsUrl,
      });
  }

  if (method === 'POST' && path === '/orders') {
    const { customerName, phone, language, fulfillmentType, deliveryAddress, customerNotes, items, privacyConsent } = body || {};
    if (!customerName?.trim()) return json({ error: 'Customer name is required.' }, 400);
    if (!phone || phone.replace(/\D/g, '').length < 10) return json({ error: 'A valid 10-digit mobile phone number is required.' }, 400);
    if (!privacyConsent) return json({ error: 'Consent to store contact details for order processing is required.' }, 400);
    if (!Array.isArray(items) || items.length === 0) return json({ error: 'Order must contain at least one item.' }, 400);

    const snaps: any[] = [];
    for (const it of items) {
      const prod = d.products.find((p: any) => p.id === it.productId && p.isPublished);
      if (!prod) return json({ error: `Product "${it.productName || it.productId}" is not available.` }, 400);
      const qty = Math.max(1, parseInt(it.quantity, 10) || 1);
      const price = prod.offerPricePaise ?? prod.pricePaise;
      snaps.push({
        productId: prod.id, productName: prod.name.en, sku: prod.sku, variantName: it.variantName,
        quantity: qty, unitPricePaise: price, lineTotalPaise: price !== null ? price * qty : null, image: prod.images?.[0] || '',
      });
    }
    const { subtotalPaise, totalPaise } = calculateOrderTotals(snaps.map((s) => ({ unitPricePaise: s.unitPricePaise, quantity: s.quantity })), 0);
    const now = new Date().toISOString();
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const order = {
      id: 'ord-' + Date.now().toString(36), reference: `PFE-${new Date().getFullYear()}-${suffix}`,
      customerName: customerName.trim(), phone: phone.trim(), language: language || 'en',
      fulfillmentType: fulfillmentType === 'delivery' ? 'delivery' : 'pickup',
      deliveryAddress: fulfillmentType === 'delivery' ? (deliveryAddress || '').trim() : undefined,
      customerNotes: customerNotes?.trim() || undefined, items: snaps, subtotalPaise, deliveryFeePaise: 0, totalPaise,
      status: 'pending_confirmation', privacyConsent: true, createdAt: now, updatedAt: now,
      statusHistory: [{ status: 'pending_confirmation', timestamp: now, note: 'Demo order request.' }],
    };
    save('pfe_demo_orders', [order, ...load('pfe_demo_orders')]);
    return json({ order }, 201);
  }

  if (method === 'POST' && path === '/contact') {
    const { name, contact, subject, message } = body || {};
    if (!name?.trim() || !contact?.trim() || !message?.trim())
      return json({ error: 'Please fill in your name, contact information, and message.' }, 400);
    const enquiry = { id: 'enq-' + Date.now().toString(36), name, contact, subject: subject || 'Showroom Inquiry', message, status: 'new', createdAt: new Date().toISOString() };
    save('pfe_demo_enquiries', [enquiry, ...load('pfe_demo_enquiries')]);
    return json({ success: true, enquiry }, 201);
  }

  return json({ error: 'Not available in the static demo.' }, 404);
}

export function installDemoApi() {
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(raw, window.location.href);
    if (/(^|\/)api\//.test(url.pathname) && url.origin === window.location.origin) {
      let body: any;
      try { body = init?.body ? JSON.parse(init.body as string) : undefined; } catch { body = undefined; }
      return handle(url, (init?.method || 'GET').toUpperCase(), body);
    }
    return realFetch(input as any, init);
  };
}
