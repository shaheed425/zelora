import API from './api';

const cache = new Map();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes cache

export const clearProductCache = () => {
  cache.clear();
};

export const fetchProducts = async (params = {}) => {
  const cacheKey = `products_${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const response = await API.get('/products', { params });
  cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
};

export const fetchProductBySlug = async (slug) => {
  const cacheKey = `product_${slug}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const response = await API.get(`/products/${slug}`);
  cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
};

export const createProduct = async (productData) => {
  clearProductCache();
  const response = await API.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  clearProductCache();
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  clearProductCache();
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
