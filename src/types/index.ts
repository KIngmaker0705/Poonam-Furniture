/**
 * Domain types for Poonam Furniture And Electronic
 */

export type Language = 'en' | 'mr' | 'hi';

export type CategoryType = 'furniture' | 'electronics';

export type StockStatus =
  | 'in_stock'
  | 'limited_stock'
  | 'out_of_stock'
  | 'contact_us';

export type OrderStatus =
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type UserRole = 'owner' | 'manager';

export interface LocalizedString {
  en: string;
  mr: string;
  hi: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  type: CategoryType;
  displayOrder: number;
  isActive: boolean;
  iconName?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  pricePaise?: number; // Override if different from base
  stock?: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  categoryId: string;
  categorySlug: string;
  name: LocalizedString;
  description: LocalizedString;
  pricePaise: number | null; // null means 'Contact us for price' (Do not invent price)
  mrpPaise?: number | null;
  offerPricePaise?: number | null;
  offerStart?: string | null;
  offerEnd?: string | null;
  stock: number;
  lowStockThreshold: number;
  stockStatus: StockStatus;
  dimensions?: string; // e.g. "72 x 78 inches" or "6ft x 4ft"
  material?: string; // e.g. "Solid Teak Wood & Cane" or "Cold Rolled Steel"
  variants?: ProductVariant[];
  images: string[];
  isPublished: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isDemoSample?: boolean; // Clearly labels demo products vs live inventory
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  productSlug: string;
  productName: string;
  sku: string;
  variantId?: string;
  variantName?: string;
  pricePaise: number | null;
  quantity: number;
  image?: string;
  stockAvailable: number;
  stockStatus: StockStatus;
}

export interface OrderItemSnapshot {
  productId: string;
  productName: string;
  sku: string;
  variantName?: string;
  quantity: number;
  unitPricePaise: number | null;
  lineTotalPaise: number | null;
  image?: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  phone: string;
  language: Language;
  fulfillmentType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  customerNotes?: string;
  items: OrderItemSnapshot[];
  subtotalPaise: number;
  deliveryFeePaise: number;
  totalPaise: number;
  status: OrderStatus;
  privacyConsent: boolean;
  createdAt: string;
  updatedAt: string;
  statusHistory: OrderStatusHistoryItem[];
}

export type StockMovementType =
  | 'opening'
  | 'received'
  | 'sold_in_shop'
  | 'damaged'
  | 'correction'
  | 'order_allocated'
  | 'order_cancelled_restock';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  movementType: StockMovementType;
  quantityChange: number; // positive or negative
  beforeQuantity: number;
  afterQuantity: number;
  reason: string;
  staffName: string;
  timestamp: string;
  orderId?: string;
}

export interface PriceHistoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  oldPricePaise: number | null;
  newPricePaise: number | null;
  oldOfferPricePaise?: number | null;
  newOfferPricePaise?: number | null;
  reason: string;
  changedBy: string;
  timestamp: string;
}

export interface Offer {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  discountPercentage?: number;
  discountAmountPaise?: number;
  applicableCategoryIds?: string[];
  applicableProductIds?: string[];
  startDate: string;
  endDate: string;
  conditions: LocalizedString;
  isActive: boolean;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  contact: string; // phone or email
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface StoreSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  directionsUrl: string;
  openingHours: string; // configured by owner
  supportedLanguages: Language[];
  deliveryPolicy: string;
  pickupPolicy: string;
  lowStockDefaultThreshold: number;
  googlePlaceId: string;
  googlePlacesEnabled: boolean;
  announcementText?: LocalizedString;
  announcementActive?: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email?: string;
  createdAt: string;
}

export interface GooglePlaceRatingResponse {
  configured: boolean;
  placeId?: string;
  rating?: number;
  userRatingsTotal?: number;
  businessName?: string;
  reviewsUrl?: string;
  message?: string;
}
