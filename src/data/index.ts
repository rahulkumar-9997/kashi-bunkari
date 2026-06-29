export type Product = {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  orig?: number;
  disc?: number;
  badge?: string;
  c1: string;
  c2: string;
};

export type Slide = {
  c1: string;
  c2: string;
  line1: string;
  line2: string;
  sub: string;
  cta: string;
};

export type Category = {
  n: string;
  c1: string;
  c2: string;
};

export type Review = {
  rating: number;
  text: string;
  name: string;
  loc: string;
};

export const SLIDES: Slide[] = [
  {
    c1: "#2a1a0e",
    c2: "#7c4a2a",
    line1: "Elegance",
    line2: "Redefined.",
    sub: "Discover a curated collection of artisanal sarees and designer lehengas, where heritage craftsmanship meets modern silhouettes.",
    cta: "Shop Collection →",
  },
  {
    c1: "#3a1a28",
    c2: "#9e3d4c",
    line1: "Heritage",
    line2: "Reimagined.",
    sub: "Every thread tells a story of Banaras — where silk-weaving is a devotion passed through six centuries of artisan families.",
    cta: "Explore Sarees →",
  },
  {
    c1: "#1f2a3a",
    c2: "#2a5c8e",
    line1: "Bridal",
    line2: "Perfection.",
    sub: "Handpicked bridal collections crafted for the most important day of your life. Exquisite, timeless, unforgettable.",
    cta: "View Bridal →",
  },
  {
    c1: "#1f3a2a",
    c2: "#4a7c5e",
    line1: "Festive",
    line2: "Elegance.",
    sub: "Celebrate every occasion draped in handwoven silk and gold zari — straight from the looms of Banaras.",
    cta: "Shop Festive →",
  },
];

export const CATEGORIES: Category[] = [
  { n: "Sarees", c1: "#5c1a2a", c2: "#9e3d4c" },
  { n: "Silk Sarees", c1: "#3d300a", c2: "#c9a227" },
  { n: "Suits & Dresses", c1: "#1f3a2a", c2: "#4a7c5e" },
  { n: "Gowns", c1: "#1a1a3a", c2: "#5a4aa0" },
  { n: "Kurti", c1: "#3a1a2a", c2: "#9e3d6c" },
  { n: "Wedding Collections", c1: "#2a1a0e", c2: "#7c4a2a" },
  { n: "Lehengas", c1: "#1a2a3a", c2: "#2a5c8e" },
  { n: "Anarkali", c1: "#1f3a2a", c2: "#3a7c4e" },
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: "na1",
    name: "Chinon Silk Party Wear - Embroidered",
    type: "Party Wear",
    brand: "KASIBUNKARI",
    price: 1914,
    orig: 2860,
    disc: 33,
    badge: "New",
    c1: "#5c1a2a",
    c2: "#9e3d4c",
  },
  {
    id: "na2",
    name: "Banarasi Soft Silk Saree - White",
    type: "Banarasi Silk",
    brand: "WEAVERS OF INDIA",
    price: 1860,
    c1: "#f0ede0",
    c2: "#c9b090",
  },
  {
    id: "na3",
    name: "Festive Collection Georgette - Red",
    type: "Georgette",
    brand: "KASIBUNKARI",
    price: 1531,
    badge: "New",
    c1: "#5c1a2a",
    c2: "#c94444",
  },
  {
    id: "na4",
    name: "Vishtha Silk - Full Border Work",
    type: "Tissue Silk",
    brand: "DESIGNER EDIT",
    price: 4368,
    orig: 5200,
    disc: 16,
    c1: "#3a2a10",
    c2: "#c9a227",
  },
  {
    id: "na5",
    name: "Pure Cotton Anarkali Suit",
    type: "Anarkali",
    brand: "KASIBUNKARI",
    price: 3100,
    badge: "New",
    c1: "#2a3a3a",
    c2: "#4a8080",
  },
  {
    id: "na6",
    name: "Kanjivaram Silk Saree",
    type: "Kanjivaram",
    brand: "HERITAGE SILK",
    price: 8500,
    c1: "#3d300a",
    c2: "#c9a227",
  },
];

export const FEATURED: Product[] = [
  {
    id: "fe1",
    name: "Embellished Gown",
    type: "Evening Wear",
    brand: "EVENING WEAR",
    price: 5500,
    c1: "#1a2a4a",
    c2: "#2a5c8e",
  },
  {
    id: "fe2",
    name: "Printed Anarkali Suit",
    type: "Anarkali",
    brand: "SUMMER EDIT",
    price: 2450,
    c1: "#3a1a2a",
    c2: "#9e3d6c",
  },
  {
    id: "fe3",
    name: "Bridal Red Lehenga",
    type: "Bridal Collection",
    brand: "WEDDING COLLECTION",
    price: 15999,
    c1: "#5c1a2a",
    c2: "#9e3d4c",
  },
  {
    id: "fe4",
    name: "Kanjivaram Silk",
    type: "Heritage Silk",
    brand: "HERITAGE SILK",
    price: 8500,
    c1: "#3d300a",
    c2: "#c9a227",
  },
  {
    id: "fe5",
    name: "Royal Blue Khaddi Georgette",
    type: "Georgette",
    brand: "DESIGNER EDIT",
    price: 15000,
    c1: "#1a2a4a",
    c2: "#2a5c8e",
  },
  {
    id: "fe6",
    name: "Golden Zari Tissue Silk",
    type: "Tissue Silk",
    brand: "KASIBUNKARI",
    price: 13200,
    c1: "#3a2a10",
    c2: "#c9a227",
  },
];

export const REVIEWS: Review[] = [
  {
    rating: 5,
    text: '"Beautiful dress perfect size. I ordered for my sister\'s wedding and it arrived on time. The fabric quality is exceptional."',
    name: "Hetal Shah",
    loc: "India",
  },
  {
    rating: 5,
    text: '"This is my second jewelry order from GG Fashion. I loved them both. They arrived well packed and exactly as shown in pictures."',
    name: "Indu Valavala",
    loc: "India",
  },
  {
    rating: 5,
    text: '"Beautiful necklace. Good experience shopping here. The customer support was very helpful with size customisation."',
    name: "Rayrr",
    loc: "Delhi India",
  },
  {
    rating: 5,
    text: '"The saree quality is absolutely stunning. The zari work is even more beautiful in person. Very happy with my purchase!"',
    name: "Priya Sharma",
    loc: "Mumbai",
  },
  {
    rating: 5,
    text: '"Fast delivery and excellent packaging. The Banarasi silk saree was exactly as described. Will definitely order again."',
    name: "Anita Gupta",
    loc: "Bangalore",
  },
];

export const OCCASIONS = [
  { label: "Wedding", c1: "#5c1a2a", c2: "#9e3d4c", span: "tall" },
  { label: "Festival", c1: "#3d300a", c2: "#c9a227", span: "normal" },
  { label: "Party", c1: "#1a2a4a", c2: "#2a5c8e", span: "normal" },
  { label: "Office", c1: "#1f3a2a", c2: "#4a7c5e", span: "normal" },
  { label: "Casual", c1: "#3a1a2a", c2: "#9e3d6c", span: "normal" },
];
