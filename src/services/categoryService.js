import API from './api';

const categoryCache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes cache

export const clearCategoryCache = () => {
  categoryCache.clear();
};

export const fetchCategories = async () => {
  const cacheKey = 'categories_all';
  const cached = categoryCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.data;
  }

  const response = await API.get('/categories');
  categoryCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
};

export const fetchCategoryBySlug = async (slug) => {
  const cacheKey = `category_${slug}`;
  const cached = categoryCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.data;
  }

  const response = await API.get(`/categories/${slug}`);
  categoryCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
};

export const createCategory = async (categoryData) => {
  clearCategoryCache();
  const response = await API.post('/categories', categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  clearCategoryCache();
  const response = await API.put(`/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  clearCategoryCache();
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};
