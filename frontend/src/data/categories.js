export const NAV_CATEGORIES = [
  { id: 'men', name: 'MEN', path: '/men', accent: 'text-indigo-600', border: 'hover:border-indigo-600' },
  { id: 'women', name: 'WOMEN', path: '/women', accent: 'text-pink-600', border: 'hover:border-pink-600' },
  { id: 'kids', name: 'KIDS', path: '/kids', accent: 'text-orange-500', border: 'hover:border-orange-500' },
  { id: 'home-living', name: 'HOME', path: '/home-living', accent: 'text-amber-600', border: 'hover:border-amber-600' },
  { id: 'beauty', name: 'BEAUTY', path: '/beauty', accent: 'text-teal-600', border: 'hover:border-teal-600' },
  { id: 'gen-z', name: 'GEN Z', path: '/products?category=gen-z', badge: 'NEW', accent: 'text-rose-500', border: 'hover:border-rose-500' },
];

export const SHOP_BY_CATEGORIES = [
  {
    id: 'men-shirts',
    title: "Men's Casual Shirts",
    category: 'men',
    subCategory: 'Shirts',
    discount: '40-70% OFF',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
    link: '/men?sub=Shirts'
  },
  {
    id: 'women-ethnic',
    title: 'Women Ethnic Wear',
    category: 'women',
    subCategory: 'Kurtas & Suits',
    discount: '50-80% OFF',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    link: '/women?sub=Kurtas'
  },
  {
    id: 'women-western',
    title: 'Western Dresses & Tops',
    category: 'women',
    subCategory: 'Dresses',
    discount: 'Up to 60% OFF',
    tag: 'Hot Drop',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80',
    link: '/women?sub=Dresses'
  },
  {
    id: 'men-tshirts',
    title: "Men's Graphic T-Shirts",
    category: 'men',
    subCategory: 'T-Shirts',
    discount: 'Min 50% OFF',
    tag: 'Under ₹599',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    link: '/men?sub=T-Shirts'
  },
  {
    id: 'footwear-sneakers',
    title: 'Sneakers & Sports Shoes',
    category: 'men',
    subCategory: 'Shoes',
    discount: '40-60% OFF',
    tag: 'Top Brands',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    link: '/products?search=shoes'
  },
  {
    id: 'kids-wear',
    title: 'Kids Festive & Casuals',
    category: 'kids',
    subCategory: 'Clothing',
    discount: 'Min 50% OFF',
    tag: 'Cute Styles',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=700&q=80',
    link: '/kids'
  },
  {
    id: 'beauty-makeup',
    title: 'Beauty & Skincare Glow',
    category: 'beauty',
    subCategory: 'Skincare',
    discount: 'Up to 50% OFF',
    tag: 'Must Haves',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    link: '/beauty'
  },
  {
    id: 'home-decor',
    title: 'Home Furnishings & Decor',
    category: 'home-living',
    subCategory: 'Decor',
    discount: 'Starting ₹399',
    tag: 'Cozy Vibes',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    link: '/home-living'
  },
  {
    id: 'watches-accessories',
    title: 'Luxury Watches & Shades',
    category: 'men',
    subCategory: 'Accessories',
    discount: 'Flat 50% OFF',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
    link: '/products?search=watch'
  },
  {
    id: 'gen-z-streetwear',
    title: 'Gen Z Streetwear',
    category: 'gen-z',
    subCategory: 'Streetwear',
    discount: 'Starting ₹499',
    tag: 'Viral Hits',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
    link: '/products?category=gen-z'
  }
];

export const CATEGORY_FILTERS = {
  men: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Shoes', 'Watches'],
  women: ['Kurtas & Suits', 'Dresses', 'Tops & Tees', 'Sarees', 'Jeans', 'Handbags', 'Jewellery', 'Shoes'],
  kids: ['T-Shirts', 'Dresses', 'Clothing Sets', 'Footwear', 'Jeans'],
  'home-living': ['Bed Linen', 'Curtains', 'Cushions', 'Wall Decor', 'Lamps & Lighting', 'Kitchenware'],
  beauty: ['Makeup', 'Skincare', 'Fragrances', 'Haircare', 'Lipsticks', 'Bath & Body'],
  'gen-z': ['Oversized Tees', 'Cargo Pants', 'Hoodies', 'Sneakers', 'Sunglasses', 'Accessories']
};
