/**
 * Pure shop utilities for pricing, stock calculations, validation, and CSV processing.
 * Decoupled from React UI components for high performance and testability.
 */

import type { Product, StockStatus, OrderStatus, Language } from '../types/index.ts';

/**
 * Format price in paise to Indian Rupees string format (e.g. ₹2,200)
 */
export function formatPrice(paise: number | null | undefined, _lang: Language = 'en'): string {
  if (paise === null || paise === undefined) {
    return 'Contact us for price';
  }
  const rupees = paise / 100;
  // Format to standard Indian grouping: ₹X,XX,XXX
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  return formatter.format(rupees);
}

/**
 * Calculate line item total in paise safely
 */
export function calculateLineTotal(unitPricePaise: number | null, quantity: number): number | null {
  if (unitPricePaise === null || unitPricePaise === undefined || quantity <= 0) {
    return null;
  }
  return Math.round(unitPricePaise * quantity);
}

/**
 * Calculate order subtotal and validate items
 */
export function calculateOrderTotals(
  items: Array<{ unitPricePaise: number | null; quantity: number }>,
  deliveryFeePaise: number = 0
): {
  subtotalPaise: number;
  deliveryFeePaise: number;
  totalPaise: number;
  hasUnpricedItems: boolean;
} {
  let subtotal = 0;
  let hasUnpricedItems = false;

  for (const item of items) {
    if (item.unitPricePaise === null || item.unitPricePaise === undefined) {
      hasUnpricedItems = true;
    } else {
      subtotal += calculateLineTotal(item.unitPricePaise, item.quantity) || 0;
    }
  }

  const fee = Math.max(0, deliveryFeePaise);
  const total = subtotal + fee;

  return {
    subtotalPaise: subtotal,
    deliveryFeePaise: fee,
    totalPaise: total,
    hasUnpricedItems
  };
}

/**
 * Determine stock status from inventory count and low-stock threshold
 */
export function computeStockStatus(stock: number, lowStockThreshold: number = 3): StockStatus {
  if (stock <= 0) {
    return 'out_of_stock';
  }
  if (stock <= lowStockThreshold) {
    return 'limited_stock';
  }
  return 'in_stock';
}

/**
 * Calculate quantity after a stock movement
 */
export function applyStockMovement(
  currentStock: number,
  quantityChange: number
): { afterQuantity: number; valid: boolean; error?: string } {
  const after = currentStock + quantityChange;
  if (after < 0) {
    return {
      afterQuantity: currentStock,
      valid: false,
      error: 'Cannot reduce stock below zero.'
    };
  }
  return {
    afterQuantity: after,
    valid: true
  };
}

/**
 * Valid order status transitions
 */
export const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_confirmation: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['ready_for_pickup', 'out_for_delivery', 'cancelled'],
  ready_for_pickup: ['completed', 'cancelled'],
  out_for_delivery: ['completed', 'cancelled'],
  completed: [], // Terminal state
  cancelled: [] // Terminal state
};

export function canTransitionOrderStatus(current: OrderStatus, next: OrderStatus): boolean {
  if (current === next) return true;
  const allowed = ALLOWED_STATUS_TRANSITIONS[current] || [];
  return allowed.includes(next);
}

/**
 * Filter and search products
 */
export interface ProductFilterOptions {
  query?: string;
  categorySlug?: string;
  categoryType?: 'furniture' | 'electronics';
  minPriceRupees?: number;
  maxPriceRupees?: number;
  inStockOnly?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'name_asc';
}

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions,
  lang: Language = 'en'
): Product[] {
  let results = products.filter((p) => p.isPublished);

  // Search query (matches title in any language or SKU)
  if (options.query && options.query.trim()) {
    const q = options.query.toLowerCase().trim();
    results = results.filter((p) => {
      const matchNameEn = p.name.en.toLowerCase().includes(q);
      const matchNameMr = p.name.mr.toLowerCase().includes(q);
      const matchNameHi = p.name.hi.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      return matchNameEn || matchNameMr || matchNameHi || matchSku;
    });
  }

  // Category filter
  if (options.categorySlug && options.categorySlug !== 'all') {
    results = results.filter((p) => p.categorySlug === options.categorySlug);
  }

  // Min price filter
  if (options.minPriceRupees !== undefined && !isNaN(options.minPriceRupees)) {
    const minPaise = options.minPriceRupees * 100;
    results = results.filter((p) => p.pricePaise !== null && p.pricePaise >= minPaise);
  }

  // Max price filter
  if (options.maxPriceRupees !== undefined && !isNaN(options.maxPriceRupees)) {
    const maxPaise = options.maxPriceRupees * 100;
    results = results.filter((p) => p.pricePaise !== null && p.pricePaise <= maxPaise);
  }

  // In-stock only
  if (options.inStockOnly) {
    results = results.filter((p) => p.stock > 0 && p.stockStatus !== 'out_of_stock');
  }

  // Sorting
  switch (options.sortBy) {
    case 'price_asc':
      results.sort((a, b) => (a.pricePaise ?? Infinity) - (b.pricePaise ?? Infinity));
      break;
    case 'price_desc':
      results.sort((a, b) => (b.pricePaise ?? -Infinity) - (a.pricePaise ?? -Infinity));
      break;
    case 'name_asc':
      results.sort((a, b) => (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en));
      break;
    case 'newest':
    default:
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return results;
}

/**
 * Validate imported CSV rows
 */
export interface CsvProductRow {
  sku: string;
  nameEn: string;
  nameMr?: string;
  nameHi?: string;
  categorySlug: string;
  priceRupees: string;
  stock: string;
  lowStockThreshold?: string;
  dimensions?: string;
  material?: string;
}

export interface CsvValidationResult {
  valid: boolean;
  errors: string[];
  product?: Partial<Product>;
}

export function validateCsvProductRow(row: Record<string, string>, rowIndex: number): CsvValidationResult {
  const errors: string[] = [];
  const sku = (row.sku || row.SKU || '').trim();
  const nameEn = (row.nameEn || row.name || row.Name || '').trim();
  const categorySlug = (row.categorySlug || row.category || row.Category || '').trim().toLowerCase();
  const priceStr = (row.priceRupees || row.price || row.Price || '').trim();
  const stockStr = (row.stock || row.Stock || '0').trim();

  if (!sku) {
    errors.push(`Row ${rowIndex}: SKU is required.`);
  }
  if (!nameEn) {
    errors.push(`Row ${rowIndex}: English Name is required.`);
  }
  if (!categorySlug) {
    errors.push(`Row ${rowIndex}: Category is required.`);
  }

  let pricePaise: number | null = null;
  if (priceStr && priceStr !== 'null' && priceStr !== 'contact') {
    const num = parseFloat(priceStr);
    if (isNaN(num) || num < 0) {
      errors.push(`Row ${rowIndex}: Invalid price "${priceStr}". Must be positive number or leave empty for contact.`);
    } else {
      pricePaise = Math.round(num * 100);
    }
  }

  const stock = parseInt(stockStr, 10);
  if (isNaN(stock) || stock < 0) {
    errors.push(`Row ${rowIndex}: Invalid stock "${stockStr}". Must be an integer >= 0.`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    product: {
      sku,
      categorySlug,
      name: {
        en: nameEn,
        mr: (row.nameMr || nameEn).trim(),
        hi: (row.nameHi || nameEn).trim()
      },
      pricePaise,
      stock: isNaN(stock) ? 0 : stock,
      dimensions: (row.dimensions || '').trim(),
      material: (row.material || '').trim()
    }
  };
}
