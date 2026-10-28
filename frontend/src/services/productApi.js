import { FALLBACK_PRODUCTS } from '../data/products';

const BASE_URL = 'https://dummyjson.com/products';

let cachedProducts = null;

// Helper to determine sizes based on subcategory or title
const generateSizes = (category, title) => {
  const lower = (title || '').toLowerCase();
  if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('boot')) {
    return ['6', '7', '8', '9', '10', '11'];
  }
  if (category === 'kids') {
    return ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
  }
  if (category === 'home-living' || category === 'beauty') {
    return ['Standard'];
  }
  return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
};

// Map DummyJSON category strings to ShopSphere categories
const mapCategory = (dummyCat, title) => {
  const cat = (dummyCat || '').toLowerCase();
  const lowerTitle = (title || '').toLowerCase();

  if (cat.includes('mens-') || lowerTitle.includes('men')) {
    return 'men';
  }
  if (cat.includes('womens-') || cat === 'tops' || lowerTitle.includes('women')) {
    return 'women';
  }
  if (cat === 'beauty' || cat === 'fragrances' || cat === 'skin-care') {
    return 'beauty';
  }
  if (cat === 'furniture' || cat === 'home-decoration' || cat === 'kitchen-accessories') {
    return 'home-living';
  }
  if (cat === 'sunglasses' || lowerTitle.includes('oversized') || lowerTitle.includes('hoodie')) {
    return 'gen-z';
  }
  return 'men';
};

// Normalize raw product from DummyJSON API
const normalizeProduct = (item) => {
  const category = mapCategory(item.category, item.title);
  const discount = Math.round(item.discountPercentage || 25);
  // Convert USD to INR approximation (1 USD ~ 80 INR)
  const price = Math.round(item.price * 75);
  const originalPrice = Math.round(price / (1 - discount / 100));

  return {
    id: item.id,
    title: item.title,
    brand: (item.brand || 'ShopSphere Collection').toUpperCase(),
    category,
    subCategory: item.category || 'Fashion',
    price,
    originalPrice,
    discountPercentage: discount,
    rating: Number((item.rating || 4.2).toFixed(1)),
    ratingCount: (item.reviews?.length ? item.reviews.length * 42 : Math.floor(Math.random() * 800) + 120),
    image: item.thumbnail || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    images: item.images && item.images.length > 0 ? item.images : [item.thumbnail],
    description: item.description || 'Premium quality apparel and lifestyle item designed for maximum comfort and signature aesthetic.',
    sizes: generateSizes(category, item.title),
    inStock: item.stock > 0,
    trending: item.rating >= 4.2,
    bestseller: item.rating >= 4.5,
    tags: item.tags || [category, 'trending']
  };
};

/**
 * Fetch all products from API, merge with curated fashion items, and cache
 */
export const getAllProducts = async () => {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts;
  }

  try {
    const res = await fetch(`${BASE_URL}?limit=120`);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const data = await res.json();
    const normalized = (data.products || [])
      // Filter out electronics/vehicles/groceries to keep a pure fashion/lifestyle e-commerce catalog
      .filter((p) => {
        const cat = p.category || '';
        return (
          cat.includes('mens-') ||
          cat.includes('womens-') ||
          cat === 'tops' ||
          cat === 'beauty' ||
          cat === 'fragrances' ||
          cat === 'skin-care' ||
          cat === 'sunglasses' ||
          cat === 'home-decoration' ||
          cat === 'furniture'
        );
      })
      .map(normalizeProduct);

    // Merge API products with our rich curated fashion dataset (avoid duplicate IDs)
    const combined = [...FALLBACK_PRODUCTS, ...normalized];
    cachedProducts = combined;
    return combined;
  } catch (error) {
    console.warn('API fetch failed or offline, using fallback products:', error);
    cachedProducts = FALLBACK_PRODUCTS;
    return FALLBACK_PRODUCTS;
  }
};

/**
 * Fetch products filtered by category and optional subcategory
 */
export const getProductsByCategory = async (categoryName, subCategory = null) => {
  const all = await getAllProducts();
  const normalizedCategory = (categoryName || '').toLowerCase().trim();

  return all.filter((product) => {
    const matchCategory = product.category.toLowerCase() === normalizedCategory;
    if (!matchCategory) return false;

    if (subCategory) {
      const targetSub = subCategory.toLowerCase();
      const productSub = (product.subCategory || '').toLowerCase();
      const productTitle = product.title.toLowerCase();
      return productSub.includes(targetSub) || productTitle.includes(targetSub);
    }
    return true;
  });
};

/**
 * Fetch single product by ID
 */
export const getProductById = async (id) => {
  const all = await getAllProducts();
  const numericId = Number(id);
  const found = all.find((p) => p.id === numericId || String(p.id) === String(id));
  if (found) return found;

  // Attempt direct API call if not in local cache
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (res.ok) {
      const data = await res.json();
      return normalizeProduct(data);
    }
  } catch (e) {
    console.error('Error fetching product by ID:', e);
  }

  // Return first fallback as safety net
  return FALLBACK_PRODUCTS[0];
};

/**
 * Search products by query term across title, brand, category, subcategory
 */
export const searchProducts = async (query) => {
  if (!query || query.trim() === '') {
    return getAllProducts();
  }

  const all = await getAllProducts();
  const q = query.toLowerCase().trim();

  return all.filter((product) => {
    return (
      product.title.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q))
    );
  });
};

/**
 * Trending products for homepage
 */
export const getTrendingProducts = async (limit = 8) => {
  const all = await getAllProducts();
  return all.filter((p) => p.trending).slice(0, limit);
};

/**
 * Best sellers for homepage
 */
export const getBestSellers = async (limit = 8) => {
  const all = await getAllProducts();
  return all.filter((p) => p.bestseller).slice(0, limit);
};

/**
 * Deals of the day (highest discounts)
 */
export const getDealsOfTheDay = async (limit = 8) => {
  const all = await getAllProducts();
  return [...all]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, limit);
};
