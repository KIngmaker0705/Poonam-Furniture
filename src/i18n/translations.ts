/**
 * Comprehensive trilingual dictionary for English, Marathi (मराठी), and Hindi (हिंदी).
 * Strictly preserves verified business information, phone numbers, email addresses, and codes.
 */

import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    // Brand & Common
    brandName: 'Poonam Furniture And Electronic',
    brandTagline: 'Quality Furniture & Home Electronics in Jalna',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    directions: 'Directions',
    getDirections: 'Get Directions',
    contactUs: 'Contact Us',
    whatsappEnquiry: 'WhatsApp Enquiry',
    callNow: 'Call Now',
    demoNotice: 'Demonstration Catalog — Confirm with store for live stock',

    // Top Bar & Navigation
    navHome: 'Home',
    navProducts: 'Products',
    navOffers: 'Offers',
    navAbout: 'About',
    navContact: 'Contact',
    navAdmin: 'Staff Portal',
    navCart: 'Cart',
    searchPlaceholder: 'Search by furniture, TV, fridge or SKU...',
    selectLanguage: 'Language',
    themeLight: 'Light Theme',
    themeDark: 'Dark Theme',

    // Hero & Home
    heroHeading: 'Premium Living, Handcrafted & Branded for Your Home',
    heroSubheading:
      'Explore crafted wooden beds, durable steel kapat wardrobes, modular sofas, and certified home electronics directly at our Jalna showroom.',
    heroCtaProducts: 'Explore Products',
    heroCtaOffers: 'View Offers',
    heroCtaContact: 'Contact Showroom',
    furnitureShowcase: 'Furniture Collections',
    electronicsShowcase: 'Electronics & Appliances',
    featuredTitle: 'Featured Showroom Pieces',
    featuredSubtitle: 'Handpicked designs crafted for durability and everyday comfort',
    whyShopWithUs: 'Why Shop With Us',
    storeLocation: 'Visit Our Showroom in Jalna',
    googleRatingsTitle: 'Customer Reviews on Google',
    googleRatingsFallbackText: 'See what customers are saying about Poonam Wholesale Wala on Google Maps.',
    readGoogleReviews: 'Read Reviews on Google Maps',

    // Product Catalogue & Filters
    allCategories: 'All Categories',
    furniture: 'Furniture',
    electronics: 'Electronics',
    filterBy: 'Filter By',
    category: 'Category',
    priceRange: 'Price Range',
    minPrice: 'Min (₹)',
    maxPrice: 'Max (₹)',
    availability: 'Availability',
    allAvailability: 'All Stock Levels',
    inStockOnly: 'In Stock Only',
    sortBy: 'Sort By',
    sortNewest: 'Newest Arrivals',
    sortPriceLowHigh: 'Price: Low to High',
    sortPriceHighLow: 'Price: High to Low',
    sortName: 'Product Name (A-Z)',
    resetFilters: 'Reset Filters',
    showingProducts: 'Showing {count} products',
    noProductsFound: 'No products match your current filters.',
    clearFilters: 'Clear All Filters',

    // Stock Statuses
    in_stock: 'In Stock',
    limited_stock: 'Limited Stock',
    out_of_stock: 'Out of Stock',
    contact_us: 'Contact Us to Confirm Availability',
    contactForPrice: 'Contact us for price',

    // Product Detail
    productCode: 'Product Code',
    sku: 'SKU',
    dimensions: 'Dimensions',
    material: 'Material',
    variants: 'Variants',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    shareProduct: 'Share Product',
    linkCopied: 'Product link copied to clipboard!',
    relatedProducts: 'Related Products in this Category',
    shopConfirmationNotice:
      'Note: Order submission reserves your request. Our staff will confirm final inventory, delivery schedules, and payment terms before dispatch.',

    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your shopping cart is empty.',
    startShopping: 'Browse Catalog',
    itemTotal: 'Item Total',
    subtotal: 'Estimated Subtotal',
    deliveryFee: 'Delivery Charges',
    deliveryTbd: 'To be confirmed by store upon request',
    proceedToCheckout: 'Proceed to Order Request',
    removeItem: 'Remove',
    clearCart: 'Clear Cart',

    // Checkout
    orderRequestHeading: 'Checkout & Order Request',
    orderRequestNotice:
      'Zero upfront payment required online. We will review your request and contact you to confirm stock, delivery, and payment.',
    customerDetails: 'Customer Details',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your name',
    phoneNumber: 'Mobile Phone Number',
    phoneNumberPlaceholder: 'e.g. 9876543210',
    preferredLanguage: 'Preferred Communication Language',
    fulfillmentMethod: 'Fulfilment Method',
    storePickup: 'Store Pickup (Jalna Showroom)',
    homeDelivery: 'Home Delivery (Jalna & Nearby)',
    deliveryAddress: 'Delivery Address',
    deliveryAddressPlaceholder: 'Full address with landmark in Jalna area...',
    orderNotes: 'Customer Notes (Optional)',
    orderNotesPlaceholder: 'Specific requirements, preferred timings, or questions...',
    privacyConsent:
      'I consent to Poonam Furniture And Electronic storing my contact details to process this order request and communicate with me via Phone or WhatsApp.',
    submitOrderRequest: 'Submit Order Request',
    submitting: 'Submitting Request...',
    orderSummary: 'Order Summary',

    // Order Confirmation
    orderConfirmedTitle: 'Order Request Received',
    orderReference: 'Order Reference',
    orderStatusPending: 'Pending Confirmation',
    orderConfirmationNextSteps:
      'Thank you! Your request has been logged. Our showroom manager will contact you at {phone} to verify stock and arrange fulfilment.',
    sendWhatsAppConfirmation: 'Notify Store on WhatsApp',
    backToHome: 'Back to Home',
    browseMore: 'Browse More Products',

    // Contact & About
    aboutTitle: 'About Poonam Furniture And Electronic',
    aboutParagraph1:
      'Poonam Furniture And Electronic is a premier retail destination in Jalna, Maharashtra, offering a comprehensive selection of household wooden furniture, durable steel kapat, modern home electronics, and appliances.',
    aboutParagraph2:
      'Operating from Naveen Munda Pati, near Mage Kushi Park, we are committed to direct, transparent pricing, solid craftsmanship, and dedicated local customer service for families across Jalna and neighbouring regions.',
    sendEnquiry: 'Send Us an Enquiry',
    enquiryName: 'Your Name',
    enquiryContact: 'Phone Number or Email',
    enquirySubject: 'Subject',
    enquiryMessage: 'Message or Question',
    submitEnquiry: 'Submit Enquiry',
    enquirySuccess: 'Thank you! Your enquiry has been received. We will get back to you shortly.',
    enquiryPrivacy: 'Your contact details are strictly used to respond to your inquiry and never shared.',

    // Admin Dashboard
    adminPortal: 'Staff Portal',
    adminLogin: 'Admin Sign In',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    loggedInAs: 'Logged in as',
    ownerRole: 'Owner',
    managerRole: 'Marketing Manager',
    tabOverview: 'Overview',
    tabProducts: 'Products',
    tabPricing: 'Price Management',
    tabInventory: 'Stock Ledger',
    tabOrders: 'Order Requests',
    tabMarketing: 'Marketing & Banners',
    tabSettings: 'Store Settings',
    tabAudit: 'Audit Logs',

    // Admin Metrics
    totalProducts: 'Total Products',
    publishedCount: 'Published Products',
    lowStockCount: 'Low Stock Alerts',
    outOfStockCount: 'Out of Stock',
    pendingOrdersCount: 'Pending Requests',
    confirmedOrdersCount: 'Confirmed Orders',

    // Admin Actions
    createProduct: 'Add New Product',
    editProduct: 'Edit',
    deleteProduct: 'Delete',
    publish: 'Publish',
    unpublish: 'Unpublish',
    exportCsv: 'Export to CSV',
    importCsv: 'Import from CSV',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    recordStockMovement: 'Record Stock Movement',
    updatePrice: 'Update Price',
    confirmOrder: 'Confirm Order',
    cancelOrder: 'Cancel Order',
    updateStatus: 'Update Status',

    // Footer
    footerRights: 'All rights reserved.',
    footerLegal: 'Verified retail business in Jalna, Maharashtra, India.'
  },

  mr: {
    // Brand & Common
    brandName: 'पूनम फर्निचर अँड इलेक्ट्रॉनिक',
    brandTagline: 'जालन्यातील दर्जेदार फर्निचर आणि इलेक्ट्रॉनिक्स',
    phone: 'फोन',
    email: 'ईमेल',
    address: 'पत्ता',
    directions: 'रस्ता / दिशा',
    getDirections: 'गुगल मॅप्सवर दिशा पहा',
    contactUs: 'आमच्याशी संपर्क साधा',
    whatsappEnquiry: 'व्हॉट्सॲप चौकशी',
    callNow: 'कॉल करा',
    demoNotice: 'प्रात्यक्षिक कॅटलॉग — थेट साठ्यासाठी शोरूमशी संपर्क साधा',

    // Top Bar & Navigation
    navHome: 'मुख्यपृष्ठ',
    navProducts: 'उत्पादने',
    navOffers: 'ऑफर',
    navAbout: 'आमच्याबद्दल',
    navContact: 'संपर्क',
    navAdmin: 'कर्मचारी पोर्टल',
    navCart: 'कार्ट',
    searchPlaceholder: 'फर्निचर, टीव्ही, कपाट, फ्रीज किंवा कोड शोधा...',
    selectLanguage: 'भाषा',
    themeLight: 'लाइट थीम',
    themeDark: 'डार्क थीम',

    // Hero & Home
    heroHeading: 'उत्कृष्ट राहणीमान, आपल्या घरासाठी दर्जेदार व टिकाऊ वस्तू',
    heroSubheading:
      'सागवानी लाकडी पलंग, मजबूत स्टील कपाट, आधुनिक सोफा सेट आणि ब्रँडेड घरगुती इलेक्ट्रॉनिक्स उपकरणे थेट जालन्यातील आमच्या शोरूममधून मिळवा.',
    heroCtaProducts: 'उत्पादने पहा',
    heroCtaOffers: 'ऑफर तपासा',
    heroCtaContact: 'शोरूमशी संपर्क साधा',
    furnitureShowcase: 'फर्निचर संग्रह',
    electronicsShowcase: 'इलेक्ट्रॉनिक्स आणि उपकरणे',
    featuredTitle: 'शोरूममधील विशेष निवडक उत्पादने',
    featuredSubtitle: 'टिकाऊपणा आणि दैनंदिन सोयीसाठी बनवलेले उत्तम डिझाइन',
    whyShopWithUs: 'आमच्याकडूनच का खरेदी करावी?',
    storeLocation: 'जालना येथील आमच्या शोरूमला भेट द्या',
    googleRatingsTitle: 'गुगलवरील ग्राहकांचे अभिप्राय',
    googleRatingsFallbackText: 'गुगल मॅप्सवर पूनम होलसेल वालाबद्दल ग्राहकांची मते पहा.',
    readGoogleReviews: 'गुगल मॅप्सवर परीक्षणे वाचा',

    // Product Catalogue & Filters
    allCategories: 'सर्व श्रेणी',
    furniture: 'फर्निचर',
    electronics: 'इलेक्ट्रॉनिक्स',
    filterBy: 'फिल्टर करा',
    category: 'श्रेणी',
    priceRange: 'किंमत श्रेणी',
    minPrice: 'किमान (₹)',
    maxPrice: 'कमाल (₹)',
    availability: 'उपलब्धता',
    allAvailability: 'सर्व साठा',
    inStockOnly: 'केवळ उपलब्ध वस्तू',
    sortBy: 'क्रमवारी',
    sortNewest: 'नवीनतम',
    sortPriceLowHigh: 'किंमत: कमी ते जास्त',
    sortPriceHighLow: 'किंमत: जास्त ते कमी',
    sortName: 'नावानुसार (अ ते ज्ञ)',
    resetFilters: 'फिल्टर रीसेट करा',
    showingProducts: '{count} उत्पादने दर्शवित आहे',
    noProductsFound: 'निवडलेल्या निकषांनुसार कोणतीही उत्पादने आढळली नाहीत.',
    clearFilters: 'सर्व फिल्टर काढा',

    // Stock Statuses
    in_stock: 'साठ्यात उपलब्ध',
    limited_stock: 'मर्यादित साठा',
    out_of_stock: 'साठा संपला आहे',
    contact_us: 'उपलब्धतेची पुष्टी करण्यासाठी संपर्क करा',
    contactForPrice: 'किमतीसाठी संपर्क करा',

    // Product Detail
    productCode: 'उत्पादन कोड',
    sku: 'एसकेयू (SKU)',
    dimensions: 'माप / आकार',
    material: 'साहित्य (Material)',
    variants: 'प्रकार / व्हेरिएंट्स',
    quantity: 'प्रमाण (नग)',
    addToCart: 'कार्टमध्ये जोडा',
    addedToCart: 'कार्टमध्ये जोडले',
    shareProduct: 'उत्पादन शेअर करा',
    linkCopied: 'उत्पादन लिंक क्लिपबोर्डवर कॉपी केली!',
    relatedProducts: 'या श्रेणीतील संबंधित उत्पादने',
    shopConfirmationNotice:
      'नोंद: ऑर्डर पाठवल्यावर तुमची विनंती नोंदवली जाते. वस्तू पाठवण्यापूर्वी आमचे कर्मचारी साठा, डिलिव्हरी आणि देयकाची पुष्टी करतील.',

    // Cart
    shoppingCart: 'खरेदी कार्ट',
    cartEmpty: 'तुमची खरेदी कार्ट रिकामी आहे.',
    startShopping: 'कॅटलॉग ब्राउझ करा',
    itemTotal: 'एकूण वस्तू',
    subtotal: 'अंदाजे उपएकूण',
    deliveryFee: 'डिलिव्हरी शुल्क',
    deliveryTbd: 'विनंतीनंतर दुकानाद्वारे निश्चित केले जाईल',
    proceedToCheckout: 'ऑर्डर विनंतीसाठी पुढे जा',
    removeItem: 'काढून टाका',
    clearCart: 'कार्ट रिकामी करा',

    // Checkout
    orderRequestHeading: 'चेकआउट आणि ऑर्डर विनंती',
    orderRequestNotice:
      'ऑनलाइन आगाऊ पेमेंट आवश्यक नाही. आम्ही तुमची विनंती तपासून साठा, वितरण आणि पेमेंटची पुष्टी करण्यासाठी तुमच्याशी संपर्क साधू.',
    customerDetails: 'ग्राहकाचा तपशील',
    fullName: 'पूर्ण नाव',
    fullNamePlaceholder: 'आपले नाव प्रविष्ट करा',
    phoneNumber: 'मोबाईल फोन नंबर',
    phoneNumberPlaceholder: 'उदा. ९८७६५४३२१०',
    preferredLanguage: 'संभाषणाची पसंतीची भाषा',
    fulfillmentMethod: 'वितरण पद्धत',
    storePickup: 'शोरूममधून थेट उचल (जालना शोरूम)',
    homeDelivery: 'होम डिलिव्हरी (जालना आणि परिसर)',
    deliveryAddress: 'डिलिव्हरीचा पत्ता',
    deliveryAddressPlaceholder: 'जालना परिसरातील लँडमार्कसह पूर्ण पत्ता...',
    orderNotes: 'ग्राहकाची विशेष सूचना (पर्यायी)',
    orderNotesPlaceholder: 'विशिष्ट गरजा, सोयीस्कर वेळ किंवा प्रश्न...',
    privacyConsent:
      'मी पूनम फर्निचर अँड इलेक्ट्रॉनिकला ही ऑर्डर प्रक्रिया करण्यासाठी आणि फोन किंवा व्हॉट्सॲपवर संपर्क करण्यासाठी माझा संपर्क तपशील जतन करण्याची संमती देतो/देते.',
    submitOrderRequest: 'ऑर्डर विनंती सबमिट करा',
    submitting: 'विनंती सबमिट होत आहे...',
    orderSummary: 'ऑर्डर सारांश',

    // Order Confirmation
    orderConfirmedTitle: 'ऑर्डर विनंती प्राप्त झाली',
    orderReference: 'ऑर्डर संदर्भ क्रमांक',
    orderStatusPending: 'पुष्टी प्रलंबित',
    orderConfirmationNextSteps:
      'धन्यवाद! तुमची विनंती नोंदवली गेली आहे. आमचे शोरूम व्यवस्थापक साठ्याची पडताळणी करण्यासाठी आणि वितरणाची व्यवस्था करण्यासाठी {phone} वर संपर्क करतील.',
    sendWhatsAppConfirmation: 'व्हॉट्सॲपवर दुकानाला सूचित करा',
    backToHome: 'मुख्यपृष्ठावर परत या',
    browseMore: 'आणखी उत्पादने पहा',

    // Contact & About
    aboutTitle: 'पूनम फर्निचर अँड इलेक्ट्रॉनिक बद्दल',
    aboutParagraph1:
      'पूनम फर्निचर अँड इलेक्ट्रॉनिक हे जालन्यातील एक अग्रगण्य किरकोळ दालन आहे, जिथे लाकडी फर्निचर, मजबूत स्टील कपाट, आधुनिक टीव्ही आणि घरगुती इलेक्ट्रॉनिक्स उपकरणांची विस्तृत श्रेणी उपलब्ध आहे.',
    aboutParagraph2:
      'नवीन मुंडा पाटी, मगे खुशी पार्क जवळ, जालना येथून कार्यरत असताना, आम्ही थेट रास्त दर, दर्जेदार कारागिरी आणि जालन्यातील ग्राहकांसाठी समर्पित स्थानिक सेवेसाठी कटिबद्ध आहोत.',
    sendEnquiry: 'चौकशी पाठवा',
    enquiryName: 'आपले नाव',
    enquiryContact: 'फोन नंबर किंवा ईमेल',
    enquirySubject: 'विषय',
    enquiryMessage: 'संदेश किंवा प्रश्न',
    submitEnquiry: 'चौकशी सबमिट करा',
    enquirySuccess: 'धन्यवाद! तुमची चौकशी आम्हाला मिळाली आहे. आम्ही लवकरच आपल्याशी संपर्क करू.',
    enquiryPrivacy: 'आपला संपर्क तपशील फक्त चौकशीला उत्तर देण्यासाठी वापरला जातो.',

    // Admin Dashboard
    adminPortal: 'कर्मचारी पोर्टल',
    adminLogin: 'प्रशासक लॉगिन',
    username: 'वापरकर्ता नाव',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    loggedInAs: 'या नावाने लॉग इन केले',
    ownerRole: 'मालक (Owner)',
    managerRole: 'मार्केटिंग मॅनेजर',
    tabOverview: 'आढावा',
    tabProducts: 'उत्पादने',
    tabPricing: 'किंमत व्यवस्थापन',
    tabInventory: 'साठा नोंदवही',
    tabOrders: 'ऑर्डर विनंत्या',
    tabMarketing: 'विपणन आणि बॅनर',
    tabSettings: 'दुकान सेटिंग्ज',
    tabAudit: 'ऑडिट नोंदी',

    // Admin Metrics
    totalProducts: 'एकूण उत्पादने',
    publishedCount: 'प्रकाशित उत्पादने',
    lowStockCount: 'कमी साठा सूचना',
    outOfStockCount: 'साठा संपला',
    pendingOrdersCount: 'प्रलंबित विनंत्या',
    confirmedOrdersCount: 'निश्चित ऑर्डर्स',

    // Admin Actions
    createProduct: 'नवीन उत्पादन जोडा',
    editProduct: 'संपादित करा',
    deleteProduct: 'हटवा',
    publish: 'प्रकाशित करा',
    unpublish: 'अप्रकाशित करा',
    exportCsv: 'सीएसव्ही (CSV) निर्यात',
    importCsv: 'सीएसव्ही (CSV) आयात',
    saveChanges: 'बदल जतन करा',
    cancel: 'रद्द करा',
    recordStockMovement: 'साठा नोंद करा',
    updatePrice: 'किंमत बदला',
    confirmOrder: 'ऑर्डर निश्चित करा',
    cancelOrder: 'ऑर्डर रद्द करा',
    updateStatus: 'स्थिती बदला',

    // Footer
    footerRights: 'सर्व हक्क राखीव.',
    footerLegal: 'जालना, महाराष्ट्र, भारत येथील अधिकृत किरकोळ व्यवसाय.'
  },

  hi: {
    // Brand & Common
    brandName: 'पूनम फर्नीचर एंड इलेक्ट्रॉनिक',
    brandTagline: 'जालना में उच्च गुणवत्ता वाला फर्नीचर और होम इलेक्ट्रॉनिक्स',
    phone: 'फ़ोन',
    email: 'ईमेल',
    address: 'पता',
    directions: 'दिशा-निर्देश',
    getDirections: 'गूगल मैप्स पर दिशा देखें',
    contactUs: 'हमसे संपर्क करें',
    whatsappEnquiry: 'व्हाट्सएप पूछताछ',
    callNow: 'कॉल करें',
    demoNotice: 'डेमो कैटलॉग — वास्तविक स्टॉक के लिए शोरूम से संपर्क करें',

    // Top Bar & Navigation
    navHome: 'होम',
    navProducts: 'उत्पाद',
    navOffers: 'ऑफ़र्स',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क',
    navAdmin: 'स्टाफ पोर्टल',
    navCart: 'कार्ट',
    searchPlaceholder: 'फर्नीचर, टीवी, कपाट, फ्रिज या कोड खोजें...',
    selectLanguage: 'भाषा',
    themeLight: 'लाइट थीम',
    themeDark: 'डार्क थीम',

    // Hero & Home
    heroHeading: 'प्रीमियम लिविंग, आपके घर के लिए उत्कृष्ट फर्नीचर और इलेक्ट्रॉनिक्स',
    heroSubheading:
      'मजबूत सागवान लकड़ी के पलंग, टिकाऊ स्टील कपाट अलमारी, मॉड्यूलर सोफे और प्रमाणित घरेलू इलेक्ट्रॉनिक्स सीधे जालना शोरूम से प्राप्त करें।',
    heroCtaProducts: 'उत्पाद देखें',
    heroCtaOffers: 'ऑफ़र्स देखें',
    heroCtaContact: 'शोरूम से संपर्क करें',
    furnitureShowcase: 'फर्नीचर संग्रह',
    electronicsShowcase: 'इलेक्ट्रॉनिक्स और उपकरण',
    featuredTitle: 'शोरूम के विशेष उत्पाद',
    featuredSubtitle: 'टिकाऊपन और रोजमर्रा के आराम के लिए तैयार किए गए आकर्षक डिजाइन',
    whyShopWithUs: 'हमसे खरीदारी क्यों करें?',
    storeLocation: 'जालना में हमारे शोरूम पर पधारें',
    googleRatingsTitle: 'गूगल पर ग्राहकों की समीक्षाएं',
    googleRatingsFallbackText: 'गूगल मैप्स पर पूनम होलसेल वाला के बारे में ग्राहकों की प्रतिक्रिया देखें।',
    readGoogleReviews: 'गूगल मैप्स पर समीक्षाएं पढ़ें',

    // Product Catalogue & Filters
    allCategories: 'सभी श्रेणियां',
    furniture: 'फर्नीचर',
    electronics: 'इलेक्ट्रॉनिक्स',
    filterBy: 'फ़िल्टर करें',
    category: 'श्रेणी',
    priceRange: 'मूल्य सीमा',
    minPrice: 'न्यूनतम (₹)',
    maxPrice: 'अधिकतम (₹)',
    availability: 'उपलब्धता',
    allAvailability: 'सभी स्टॉक स्तर',
    inStockOnly: 'केवल उपलब्ध वस्तुएं',
    sortBy: 'क्रमबद्ध करें',
    sortNewest: 'नवीनतम',
    sortPriceLowHigh: 'मूल्य: कम से ज्यादा',
    sortPriceHighLow: 'मूल्य: ज्यादा से कम',
    sortName: 'उत्पाद नाम (A-Z)',
    resetFilters: 'फ़िल्टर रीसेट करें',
    showingProducts: '{count} उत्पाद दिखाए जा रहे हैं',
    noProductsFound: 'आपके फ़िल्टर के अनुसार कोई उत्पाद नहीं मिला।',
    clearFilters: 'सभी फ़िल्टर हटाएं',

    // Stock Statuses
    in_stock: 'स्टॉक में उपलब्ध',
    limited_stock: 'सीमित स्टॉक',
    out_of_stock: 'स्टॉक समाप्त',
    contact_us: 'उपलब्धता की पुष्टि के लिए संपर्क करें',
    contactForPrice: 'मूल्य के लिए संपर्क करें',

    // Product Detail
    productCode: 'उत्पाद कोड',
    sku: 'एसकेयू (SKU)',
    dimensions: 'माप / आकार',
    material: 'सामग्री (Material)',
    variants: 'प्रकार / वेरिएंट',
    quantity: 'मात्रा (संख्या)',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'कार्ट में जोड़ा गया',
    shareProduct: 'उत्पाद साझा करें',
    linkCopied: 'उत्पाद लिंक क्लिपबोर्ड पर कॉपी हो गया!',
    relatedProducts: 'इस श्रेणी के अन्य उत्पाद',
    shopConfirmationNotice:
      'नोट: ऑर्डर सबमिट करने पर आपका अनुरोध दर्ज होता है। डिस्पैच से पहले हमारे स्टाफ द्वारा स्टॉक, डिलीवरी और भुगतान की पुष्टि की जाएगी।',

    // Cart
    shoppingCart: 'शॉपिंग कार्ट',
    cartEmpty: 'आपकी शॉपिंग कार्ट खाली है।',
    startShopping: 'कैटलॉग देखें',
    itemTotal: 'कुल वस्तुएं',
    subtotal: 'अनुमानित उप-योग',
    deliveryFee: 'डिलीवरी शुल्क',
    deliveryTbd: 'अनुरोध के बाद स्टोर द्वारा तय किया जाएगा',
    proceedToCheckout: 'ऑर्डर अनुरोध के लिए आगे बढ़ें',
    removeItem: 'हटाएं',
    clearCart: 'कार्ट खाली करें',

    // Checkout
    orderRequestHeading: 'चेकआउट और ऑर्डर अनुरोध',
    orderRequestNotice:
      'ऑनलाइन अग्रिम भुगतान की आवश्यकता नहीं है। हम आपका अनुरोध देखकर स्टॉक और डिलीवरी की पुष्टि करने के लिए आपसे संपर्क करेंगे।',
    customerDetails: 'ग्राहक विवरण',
    fullName: 'पूरा नाम',
    fullNamePlaceholder: 'अपना नाम दर्ज करें',
    phoneNumber: 'मोबाइल फोन नंबर',
    phoneNumberPlaceholder: 'उदा. 9876543210',
    preferredLanguage: 'पसंदीदा संपर्क भाषा',
    fulfillmentMethod: 'वितरण का तरीका',
    storePickup: 'स्टोर से पिकअप (जालना शोरूम)',
    homeDelivery: 'होम डिलीवरी (जालना और निकटवर्ती क्षेत्र)',
    deliveryAddress: 'डिलीवरी का पता',
    deliveryAddressPlaceholder: 'जालना क्षेत्र में लैंडमार्क सहित पूरा पता...',
    orderNotes: 'ग्राहक टिप्पणी (वैकल्पिक)',
    orderNotesPlaceholder: 'विशिष्ट आवश्यकताएं, सुविधाजनक समय या प्रश्न...',
    privacyConsent:
      'मैं पूनम फर्नीचर एंड इलेक्ट्रॉनिक को इस ऑर्डर को संसाधित करने और फोन या व्हाट्सएप के माध्यम से संपर्क करने के लिए मेरा संपर्क विवरण सहेजने की सहमति देता/देती हूँ।',
    submitOrderRequest: 'ऑर्डर अनुरोध सबमिट करें',
    submitting: 'अनुरोध सबमिट हो रहा है...',
    orderSummary: 'ऑर्डर सारांश',

    // Order Confirmation
    orderConfirmedTitle: 'ऑर्डर अनुरोध प्राप्त हुआ',
    orderReference: 'ऑर्डर संदर्भ संख्या',
    orderStatusPending: 'पुष्टि प्रतीक्षित',
    orderConfirmationNextSteps:
      'धन्यवाद! आपका अनुरोध दर्ज कर लिया गया है। हमारे शोरूम प्रबंधक स्टॉक की पुष्टि और डिलीवरी की व्यवस्था के लिए {phone} पर आपसे संपर्क करेंगे।',
    sendWhatsAppConfirmation: 'व्हाट्सएप पर स्टोर को सूचित करें',
    backToHome: 'होम पर वापस जाएं',
    browseMore: 'और उत्पाद देखें',

    // Contact & About
    aboutTitle: 'पूनम फर्नीचर एंड इलेक्ट्रॉनिक के बारे में',
    aboutParagraph1:
      'पूनम फर्नीचर एंड इलेक्ट्रॉनिक जालना, महाराष्ट्र में एक प्रमुख खुदरा शोरूम है, जो घरेलू लकड़ी के फर्नीचर, मजबूत स्टील कपाट, आधुनिक टीवी और घरेलू उपकरणों का समृद्ध संग्रह पेश करता है।',
    aboutParagraph2:
      'नवीन मुंडा पाटी, मगे खुशी पार्क के पास, जालना से संचालित, हम उचित मूल्य, टिकाऊ कारीगरी और जालना क्षेत्र के ग्राहकों के लिए विश्वसनीय सेवा प्रदान करने के लिए प्रतिबद्ध हैं।',
    sendEnquiry: 'हमें पूछताछ भेजें',
    enquiryName: 'आपका नाम',
    enquiryContact: 'फोन नंबर या ईमेल',
    enquirySubject: 'विषय',
    enquiryMessage: 'संदेश या प्रश्न',
    submitEnquiry: 'पूछताछ भेजें',
    enquirySuccess: 'धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। हम शीघ्र ही आपसे संपर्क करेंगे।',
    enquiryPrivacy: 'आपके संपर्क विवरण का उपयोग केवल आपकी पूछताछ का उत्तर देने के लिए किया जाता है।',

    // Admin Dashboard
    adminPortal: 'स्टाफ पोर्टल',
    adminLogin: 'प्रशासक लॉगिन',
    username: 'यूज़रनेम',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    loggedInAs: 'के रूप में लॉग इन हैं',
    ownerRole: 'मालिक (Owner)',
    managerRole: 'मार्केटिंग मैनेजर',
    tabOverview: 'अवलोकन',
    tabProducts: 'उत्पाद',
    tabPricing: 'मूल्य प्रबंधन',
    tabInventory: 'स्टॉक लेजर',
    tabOrders: 'ऑर्डर अनुरोध',
    tabMarketing: 'मार्केटिंग और बैनर',
    tabSettings: 'स्टोर सेटिंग्स',
    tabAudit: 'ऑडिट लॉग्स',

    // Admin Metrics
    totalProducts: 'कुल उत्पाद',
    publishedCount: 'प्रकाशित उत्पाद',
    lowStockCount: 'कम स्टॉक अलर्ट',
    outOfStockCount: 'स्टॉक समाप्त',
    pendingOrdersCount: 'प्रतीक्षित अनुरोध',
    confirmedOrdersCount: 'स्वीकृत ऑर्डर्स',

    // Admin Actions
    createProduct: 'नया उत्पाद जोड़ें',
    editProduct: 'संपादित करें',
    deleteProduct: 'हटाएं',
    publish: 'प्रकाशित करें',
    unpublish: 'अप्रकाशित करें',
    exportCsv: 'सीएसवी (CSV) निर्यात',
    importCsv: 'सीएसवी (CSV) आयात',
    saveChanges: 'बदलाव सहेजें',
    cancel: 'रद्द करें',
    recordStockMovement: 'स्टॉक दर्ज करें',
    updatePrice: 'मूल्य बदलें',
    confirmOrder: 'ऑर्डर कन्फर्म करें',
    cancelOrder: 'ऑर्डर रद्द करें',
    updateStatus: 'स्थिति अपडेट करें',

    // Footer
    footerRights: 'सर्वाधिकार सुरक्षित।',
    footerLegal: 'जालना, महाराष्ट्र, भारत में सत्यापित खुदरा व्यवसाय।'
  }
} as const;

export function getTranslation(lang: Language, key: keyof typeof TRANSLATIONS.en, params?: Record<string, string | number>): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let text = (dict as Record<string, string>)[key] || (TRANSLATIONS.en as Record<string, string>)[key] || String(key);
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
    });
  }
  return text;
}
