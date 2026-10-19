import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPrice,
  calculateLineTotal,
  calculateOrderTotals,
  computeStockStatus,
  applyStockMovement,
  canTransitionOrderStatus,
  validateCsvProductRow,
  filterAndSortProducts
} from './shop.ts';
import type { Product } from '../types/index.ts';

test('formatPrice: formats paise correctly to Indian Rupee representation', () => {
  // 220000 paise = ₹2,200
  const formatted = formatPrice(220000, 'en');
  assert.ok(formatted.includes('2,200'), `Expected ₹2,200 but got ${formatted}`);

  // null price displays 'Contact us for price'
  assert.equal(formatPrice(null), 'Contact us for price');
  assert.equal(formatPrice(undefined), 'Contact us for price');
});

test('calculateLineTotal: computes line total in paise', () => {
  assert.equal(calculateLineTotal(150000, 3), 450000);
  assert.equal(calculateLineTotal(null, 2), null);
  assert.equal(calculateLineTotal(150000, 0), null);
});

test('calculateOrderTotals: sums items correctly and accounts for delivery fee', () => {
  const items = [
    { unitPricePaise: 200000, quantity: 2 }, // 400000
    { unitPricePaise: 50000, quantity: 1 }   // 50000
  ];
  const result = calculateOrderTotals(items, 30000); // 30000 delivery fee
  assert.equal(result.subtotalPaise, 450000);
  assert.equal(result.deliveryFeePaise, 30000);
  assert.equal(result.totalPaise, 480000);
  assert.equal(result.hasUnpricedItems, false);

  // With unpriced item
  const unpricedItems = [
    { unitPricePaise: 100000, quantity: 1 },
    { unitPricePaise: null, quantity: 1 }
  ];
  const unpricedResult = calculateOrderTotals(unpricedItems, 0);
  assert.equal(unpricedResult.subtotalPaise, 100000);
  assert.equal(unpricedResult.hasUnpricedItems, true);
});

test('computeStockStatus: returns accurate status based on stock count', () => {
  assert.equal(computeStockStatus(0), 'out_of_stock');
  assert.equal(computeStockStatus(-1), 'out_of_stock');
  assert.equal(computeStockStatus(2, 3), 'limited_stock');
  assert.equal(computeStockStatus(3, 3), 'limited_stock');
  assert.equal(computeStockStatus(4, 3), 'in_stock');
});

test('applyStockMovement: verifies positive addition and prevents negative balance', () => {
  // Adding stock
  const added = applyStockMovement(10, 5);
  assert.equal(added.valid, true);
  assert.equal(added.afterQuantity, 15);

  // Reducing valid stock
  const reduced = applyStockMovement(10, -4);
  assert.equal(reduced.valid, true);
  assert.equal(reduced.afterQuantity, 6);

  // Attempting to reduce below 0
  const invalid = applyStockMovement(3, -5);
  assert.equal(invalid.valid, false);
  assert.equal(invalid.afterQuantity, 3);
  assert.ok(invalid.error);
});

test('canTransitionOrderStatus: enforces legitimate state machine flow', () => {
  // Pending can move to confirmed or cancelled
  assert.equal(canTransitionOrderStatus('pending_confirmation', 'confirmed'), true);
  assert.equal(canTransitionOrderStatus('pending_confirmation', 'cancelled'), true);
  assert.equal(canTransitionOrderStatus('pending_confirmation', 'completed'), false);

  // Confirmed can move to processing or cancelled
  assert.equal(canTransitionOrderStatus('confirmed', 'processing'), true);
  assert.equal(canTransitionOrderStatus('confirmed', 'cancelled'), true);

  // Completed is a terminal state
  assert.equal(canTransitionOrderStatus('completed', 'pending_confirmation'), false);
  assert.equal(canTransitionOrderStatus('completed', 'cancelled'), false);
});

test('validateCsvProductRow: validates required columns and types', () => {
  // Valid row
  const validRow = {
    sku: 'PFE-BED-001',
    nameEn: 'Teak Double Bed',
    categorySlug: 'beds',
    priceRupees: '24500',
    stock: '5'
  };
  const resValid = validateCsvProductRow(validRow, 1);
  assert.equal(resValid.valid, true);
  assert.equal(resValid.product?.sku, 'PFE-BED-001');
  assert.equal(resValid.product?.pricePaise, 2450000);

  // Invalid row (missing SKU and negative price)
  const invalidRow = {
    sku: '',
    nameEn: 'Broken Bed',
    categorySlug: 'beds',
    priceRupees: '-100',
    stock: 'abc'
  };
  const resInvalid = validateCsvProductRow(invalidRow, 2);
  assert.equal(resInvalid.valid, false);
  assert.ok(resInvalid.errors.length >= 2);
});

test('filterAndSortProducts: searches SKU and localized names, sorts properly', () => {
  const dummyProducts: Product[] = [
    {
      id: '1',
      slug: 'royal-teak-bed',
      sku: 'PFE-BED-101',
      categoryId: 'cat-beds',
      categorySlug: 'beds',
      name: { en: 'Royal Teak Bed', mr: 'शाही सागवान पलंग', hi: 'शाही सागवान बेड' },
      description: { en: '', mr: '', hi: '' },
      pricePaise: 3500000,
      stock: 4,
      lowStockThreshold: 2,
      stockStatus: 'in_stock',
      images: [],
      isPublished: true,
      isFeatured: true,
      isNewArrival: false,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    },
    {
      id: '2',
      slug: 'steel-almirah-kapat',
      sku: 'PFE-KAPAT-202',
      categoryId: 'cat-wardrobes',
      categorySlug: 'wardrobes',
      name: { en: 'Steel Kapat Wardrobe', mr: 'मजबूत स्टील कपाट', hi: 'मजबूत स्टील कपाट' },
      description: { en: '', mr: '', hi: '' },
      pricePaise: 1800000,
      stock: 1,
      lowStockThreshold: 2,
      stockStatus: 'limited_stock',
      images: [],
      isPublished: true,
      isFeatured: false,
      isNewArrival: true,
      createdAt: '2026-02-01T00:00:00Z',
      updatedAt: '2026-02-01T00:00:00Z'
    }
  ];

  // Search by Marathi name
  const filteredMr = filterAndSortProducts(dummyProducts, { query: 'सागवान' }, 'mr');
  assert.equal(filteredMr.length, 1);
  assert.equal(filteredMr[0].id, '1');

  // Search by SKU
  const filteredSku = filterAndSortProducts(dummyProducts, { query: 'KAPAT-202' }, 'en');
  assert.equal(filteredSku.length, 1);
  assert.equal(filteredSku[0].id, '2');

  // Sort by price ascending
  const sorted = filterAndSortProducts(dummyProducts, { sortBy: 'price_asc' }, 'en');
  assert.equal(sorted[0].id, '2'); // 1800000 before 3500000
});
