/**
 * Business Configuration for Poonam Furniture And Electronic
 * Single source of truth for business contact details, locations, and defaults.
 * NEVER invent or alter these verified details.
 */

export const BUSINESS_CONFIG = {
  name: 'Poonam Furniture And Electronic',
  shortName: 'Poonam Furniture',
  phone: '+91 9373265743',
  phoneRaw: '919373265743',
  phoneTel: 'tel:+919373265743',
  email: 'Poonamfurniture@gmail.com',
  emailMailto: 'mailto:Poonamfurniture@gmail.com',
  address: 'Poonam Wholesale Wala, Naveen Munda Pati, near Mage Kushi Park, Jalna, Maharashtra 431203, India.',
  locationShort: 'Jalna, Maharashtra 431203',
  googleMapsUrl:
    'https://www.google.com/maps/dir/19.8346659,75.8816345/Poonam+wholesale+wala,+Naveen+Munda+Pati,+mage+kushi+park,+Jalna,+Maharashtra+431203/@19.8806715,75.8921459,21z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bda519d7681bbe9:0x85ec0920be4fd079!2m2!1d75.8922864!2d19.8807853?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
  whatsAppBaseUrl: 'https://wa.me/919373265743',

  // Google Maps Embed query
  googleMapsEmbedQuery:
    'Poonam+Wholesale+Wala+Naveen+Munda+Pati+Mage+Kushi+Park+Jalna+Maharashtra+431203',

  // Currencies & Locales
  currencySymbol: '₹',
  locale: 'en-IN',
  timeZone: 'Asia/Kolkata',

  // Verified Benefits
  verifiedBenefits: [
    {
      id: 'direct-wholesale',
      titleEn: 'Direct Showroom Value',
      titleMr: 'थेट शोरूम दर',
      titleHi: 'सीधे शोरूम मूल्य',
      descEn: 'Authentic furniture and branded home appliances directly at competitive showroom rates in Jalna.',
      descMr: 'जालना येथे थेट स्पर्धात्मक शोरूम दरात अस्सल फर्निचर आणि ब्रँडेड घरगुती उपकरणे.',
      descHi: 'जालना में सीधे प्रतिस्पर्धी शोरूम दरों पर प्रामाणिक फर्नीचर और ब्रांडेड घरेलू उपकरण।'
    },
    {
      id: 'quality-materials',
      titleEn: 'Crafted Solid Wood & Durability',
      titleMr: 'मजबूत लाकूड आणि टिकाऊपणा',
      titleHi: 'मजबूत लकड़ी और टिकाऊपन',
      descEn: 'Premium grade teakwood, engineered wood, and durable steel kapat built for generations of Indian households.',
      descMr: 'भारतीय घरांसाठी पिढ्यानपिढ्या टिकणारे प्रीमियम सागवान लाकूड, इंजिनिअर्ड वुड आणि मजबूत स्टील कपाट.',
      descHi: 'भारतीय घरों के लिए पीढ़ियों तक चलने वाला प्रीमियम सागवान, इंजीनियर्ड वुड और मजबूत स्टील कपाट।'
    },
    {
      id: 'local-service',
      titleEn: 'Trusted Jalna Support',
      titleMr: 'जालना स्थानिक विश्वास',
      titleHi: 'जालना का विश्वसनीय समर्थन',
      descEn: 'Dedicated customer care, in-person consultation, and dependable delivery across Jalna district.',
      descMr: 'जालना जिल्हाभरात समर्पित ग्राहक सेवा, प्रत्यक्ष सल्लामसलत आणि विश्वासार्ह वितरण.',
      descHi: 'जालना जिले में समर्पित ग्राहक सेवा, व्यक्तिगत परामर्श और भरोसेमंद डिलीवरी।'
    }
  ]
} as const;

/**
 * Generate a WhatsApp chat URL with prefilled text
 */
export function getWhatsAppUrl(message: string): string {
  return `${BUSINESS_CONFIG.whatsAppBaseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a product enquiry WhatsApp link
 */
export function getProductWhatsAppUrl(productName: string, sku: string, currentUrl?: string): string {
  const text = `Hello Poonam Furniture And Electronic, I am interested in inquiring about "${productName}" (Code: ${sku}). ${currentUrl ? `Link: ${currentUrl}` : ''} Please share price, availability, and delivery details.`;
  return getWhatsAppUrl(text);
}

/**
 * Generate order confirmation WhatsApp link
 */
export function getOrderWhatsAppUrl(reference: string, customerName: string, totalFormatted: string): string {
  const text = `Namaste Poonam Furniture And Electronic, I have placed an order request: ${reference} for ${customerName}. Total: ${totalFormatted}. Please confirm availability and delivery arrangements.`;
  return getWhatsAppUrl(text);
}
