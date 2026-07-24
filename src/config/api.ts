export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
  banners: `${API_BASE_URL}/api/home/banner`,
  collections: `${API_BASE_URL}/api/home/collections`,
  occasion: `${API_BASE_URL}/api/home/occasion`,
  popularProducts: `${API_BASE_URL}/api/home/popular-products`,
  newArrivals: `${API_BASE_URL}/api/home/new-arrivals`,
  homeBlogs: `${API_BASE_URL}/api/home/blog`,
  blogList: `${API_BASE_URL}/api/blog`,
  blogDetail: (slug: string) => `${API_BASE_URL}/api/blog/${slug}`,
  testimonials: `${API_BASE_URL}/api/testimonials`,
  faqs: `${API_BASE_URL}/api/faq`,
  menu: `${API_BASE_URL}/api/menu`,
  productDetail: (parentSlug: string, attributeValueSlug: string) =>
  `${API_BASE_URL}/api/products/${parentSlug}/${attributeValueSlug}`,
  searchSuggestion: `${API_BASE_URL}/api/search-suggestion`,
  search: `${API_BASE_URL}/api/search`,
  cart: {
    add: `${API_BASE_URL}/api/cart/add`,
    list: `${API_BASE_URL}/api/cart/list`,
    update: (productId: number | string) => `${API_BASE_URL}/api/cart/${productId}`,
    remove: (productId: number | string) => `${API_BASE_URL}/api/cart/${productId}`,
    clear: `${API_BASE_URL}/api/cart`,
  },
  wishlist: {
    add: `${API_BASE_URL}/api/customer/wishlist/add`,
    list: `${API_BASE_URL}/api/customer/wishlist/list`,
    remove: (productId: number | string) => `${API_BASE_URL}/api/customer/wishlist/${productId}`,
    toggle: `${API_BASE_URL}/api/customer/wishlist/toggle`,
  },
  addresses: {
    list: `${API_BASE_URL}/api/customer/addresses`,
    create: `${API_BASE_URL}/api/customer/addresses`,
    update: (id: number) => `${API_BASE_URL}/api/customer/addresses/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/customer/addresses/${id}`,
    setDefault: (id: number) => `${API_BASE_URL}/api/customer/addresses/${id}/set-default`,
  },
  states: `${API_BASE_URL}/api/states`,
  checkout: {
    placeOrder: `${API_BASE_URL}/api/checkout/place-order`,
    verifyPayment: `${API_BASE_URL}/api/checkout/verify-payment`,
  },
  orderDetail: (orderNumber: string) => `${API_BASE_URL}/api/order-success/${orderNumber}`,
  orders: {
    list: `${API_BASE_URL}/api/customer/orders`,
  },
  quickView: (parentSlug: string, attributeValueSlug?: string) =>
    attributeValueSlug
      ? `${API_BASE_URL}/api/quick-view/${parentSlug}/${attributeValueSlug}`
      : `${API_BASE_URL}/api/quick-view/${parentSlug}`,

  contactFormEnquiry: `${API_BASE_URL}/api/contact-form/enquiry`,
  bulkOrderEnquiry: `${API_BASE_URL}/api/bulk-form/enquiry`,
};


export const AUTH_ENDPOINTS = {
  login: `${API_BASE_URL}/api/customer/login`,
  verifyOtp: `${API_BASE_URL}/api/customer/verify-otp`,
  resendOtp: `${API_BASE_URL}/api/customer/resend-otp`,
  logout: `${API_BASE_URL}/api/customer/logout`,
  profile: `${API_BASE_URL}/api/customer/profile`,
  updateProfile: `${API_BASE_URL}/api/customer/update-profile`,
};

