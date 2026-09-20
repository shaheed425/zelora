import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, Search, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const ALL_COLOR_SUGGESTIONS = [
  { name: 'Natural Teak', hex: '#C5A880' },
  { name: 'Walnut Brown', hex: '#5C4033' },
  { name: 'Honey Oak', hex: '#D4A373' },
  { name: 'Ebony Black', hex: '#1F1F1F' },
  { name: 'Cream Beige', hex: '#E3DAC9' },
  { name: 'Slate Grey', hex: '#708090' },
  { name: 'Royal Blue', hex: '#1B365D' },
  { name: 'Emerald Green', hex: '#0A5C36' },
  { name: 'Rosewood Red', hex: '#65000B' },
  { name: 'Matte White', hex: '#FFFFFF' },
  { name: 'Charcoal Grey', hex: '#333333' },
  { name: 'Mahogany Wood', hex: '#4A2511' },
  { name: 'Golden Brass', hex: '#D4AF37' },
  { name: 'Terracotta Orange', hex: '#E2725B' },
  { name: 'Olive Green', hex: '#556B2F' },
  { name: 'Dusty Pink', hex: '#DCAE96' },
  { name: 'Mustard Yellow', hex: '#FFDB58' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Wine Red', hex: '#722F37' },
  { name: 'Pearl White', hex: '#F0EAD6' },
  { name: 'Golden Teak', hex: '#D49B4B' },
  { name: 'Dark Ash Wood', hex: '#403833' },
  { name: 'Cognac Leather', hex: '#9E4624' },
  { name: 'Sage Green', hex: '#87A96B' },
];

export const getColorHex = (colorName) => {
  if (!colorName) return '#C5A880';
  const nameLower = colorName.trim().toLowerCase();

  const matched = ALL_COLOR_SUGGESTIONS.find((c) => c.name.toLowerCase() === nameLower);
  if (matched) return matched.hex;

  if (nameLower.includes('navy')) return '#000080';
  if (nameLower.includes('royal blue')) return '#1B365D';
  if (nameLower.includes('blue')) return '#2563EB';
  if (nameLower.includes('emerald') || nameLower.includes('dark green')) return '#0A5C36';
  if (nameLower.includes('green') || nameLower.includes('olive') || nameLower.includes('sage')) return '#556B2F';
  if (nameLower.includes('wine') || nameLower.includes('maroon') || nameLower.includes('burgundy')) return '#722F37';
  if (nameLower.includes('red') || nameLower.includes('rosewood')) return '#65000B';
  if (nameLower.includes('black') || nameLower.includes('ebony') || nameLower.includes('dark')) return '#1F1F1F';
  if (nameLower.includes('white') || nameLower.includes('cream') || nameLower.includes('ivory')) return '#F5F5DC';
  if (nameLower.includes('grey') || nameLower.includes('gray') || nameLower.includes('slate')) return '#708090';
  if (nameLower.includes('teak') || nameLower.includes('beige')) return '#C5A880';
  if (nameLower.includes('walnut') || nameLower.includes('brown') || nameLower.includes('wood')) return '#5C4033';
  if (nameLower.includes('oak')) return '#D4A373';
  if (nameLower.includes('yellow') || nameLower.includes('gold') || nameLower.includes('brass')) return '#D4AF37';
  if (nameLower.includes('orange') || nameLower.includes('terracotta')) return '#E2725B';
  if (nameLower.includes('pink')) return '#DCAE96';

  return '#5C4033';
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [customColorInput, setCustomColorInput] = useState('');
  
  // Modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    salePrice: '',
    description: '',
    featuredImage: '',
    images: [],
    imagesUrlInput: '',
    height: '',
    width: '',
    depth: '',
    dimensions: '',
    colors: ['Natural Teak', 'Walnut Brown'],
    colorVariants: [],
    stockStatus: 'in-stock',
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
  });

  const updateColorVariantImage = (colorName, imageUrl) => {
    setFormData((prev) => {
      const existing = prev.colorVariants || [];
      const idx = existing.findIndex((v) => v.color === colorName);
      let updated;
      if (idx > -1) {
        updated = [...existing];
        updated[idx] = { ...updated[idx], image: imageUrl };
      } else {
        updated = [...existing, { color: colorName, image: imageUrl }];
      }
      return { ...prev, colorVariants: updated };
    });
  };

  const handleAddCustomColor = (e) => {
    e.preventDefault();
    if (!customColorInput.trim()) return;
    const trimmed = customColorInput.trim();
    const existing = formData.colors || [];
    if (!existing.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, colors: [...existing, trimmed] }));
    }
    setCustomColorInput('');
  };

  const compressImage = (file, maxWidth = 1200, quality = 0.82) => {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) {
        resolve('');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Multiple Image Files Upload Handler (Option A)
  const handleMultipleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const compressedResults = await Promise.all(
        files.map((file) => compressImage(file))
      );
      const validObjs = compressedResults.filter(Boolean).map((url) => ({ url }));

      if (validObjs.length > 0) {
        setFormData((prev) => {
          const existing = prev.images || [];
          const combined = [...existing, ...validObjs];
          return {
            ...prev,
            images: combined,
            featuredImage: combined[0]?.url || prev.featuredImage,
          };
        });
      }
    }
  };

  // Comma-separated or single URL paste handler (Option B)
  const handleAddUrlsFromInput = (rawString) => {
    if (!rawString.trim()) return;
    const splitUrls = rawString
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (splitUrls.length > 0) {
      const newObjs = splitUrls.map((u) => ({ url: u }));
      setFormData((prev) => {
        const existing = prev.images || [];
        const combined = [...existing, ...newObjs];
        return {
          ...prev,
          images: combined,
          featuredImage: combined[0]?.url || prev.featuredImage,
          imagesUrlInput: '',
        };
      });
    }
  };

  const setAsMainImage = (indexToMain) => {
    setFormData((prev) => {
      const existing = [...(prev.images || [])];
      if (indexToMain >= 0 && indexToMain < existing.length) {
        const [target] = existing.splice(indexToMain, 1);
        existing.unshift(target);
      }
      return {
        ...prev,
        images: existing,
        featuredImage: existing[0]?.url || prev.featuredImage,
      };
    });
  };

  const removeImageAtIndex = (indexToRemove) => {
    setFormData((prev) => {
      const existing = (prev.images || []).filter((_, i) => i !== indexToRemove);
      return {
        ...prev,
        images: existing,
        featuredImage: existing[0]?.url || '',
      };
    });
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchProducts({ limit: 100 }),
        fetchCategories(),
      ]);
      setProducts(prodRes.products || []);
      setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load products for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0]?._id || '',
      price: '45000',
      salePrice: '0',
      description: 'Solid teak wood furniture crafted for luxury living.',
      featuredImage: '/images/image.png',
      images: [{ url: '/images/image.png' }],
      imagesUrlInput: '',
      height: '110 cm',
      width: '180 cm',
      depth: '210 cm',
      dimensions: '180 W x 210 D x 110 H cm',
      colors: ['Natural Teak', 'Walnut Brown', 'Cream Beige'],
      colorVariants: [],
      stockStatus: 'in-stock',
      isFeatured: false,
      isTrending: false,
      isNewArrival: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    const existingImages = Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : (product.featuredImage ? [{ url: product.featuredImage }] : []);

    setFormData({
      name: product.name,
      category: product.category?._id || product.category || categories[0]?._id || '',
      price: product.price,
      salePrice: product.salePrice || 0,
      description: product.description || '',
      featuredImage: product.featuredImage || existingImages[0]?.url || '',
      images: existingImages,
      imagesUrlInput: '',
      height: product.height || '',
      width: product.width || '',
      depth: product.depth || '',
      dimensions: product.dimensions || '',
      colors: Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : ['Natural Teak', 'Walnut Brown'],
      colorVariants: Array.isArray(product.colorVariants) ? product.colorVariants : [],
      stockStatus: product.stockStatus || 'in-stock',
      isFeatured: !!product.isFeatured,
      isTrending: !!product.isTrending,
      isNewArrival: !!product.isNewArrival,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        featuredImage: formData.images?.[0]?.url || formData.featuredImage || '',
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadData();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category?.name && p.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Products Catalogue Management">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-[#F2ECE4]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs pl-9 pr-4 py-2 rounded focus:outline-none"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded text-xs py-2.5 px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#F2ECE4] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#76726E]">Loading catalogue...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] bg-[#FAF8F5] text-sand-800 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Flags</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.featuredImage || p.images?.[0]?.url || ''}
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded bg-sand-50 border"
                        />
                        <div>
                          <strong className="font-editorial text-base text-charcoal block">{p.name}</strong>
                          <span className="text-[10px] text-[#888] font-mono">SKU: {p.sku || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#555]">{p.category?.name || 'Unassigned'}</td>
                    <td className="py-3 px-4 font-semibold text-charcoal">
                      {formatCurrency(p.salePrice > 0 ? p.salePrice : p.price)}
                    </td>
                    <td className="py-3 px-4 space-x-1">
                      {p.isNewArrival && <span className="bg-[#1A1A1A] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">NEW</span>}
                      {p.isTrending && <span className="bg-sand-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">TRENDING</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        p.stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {p.stockStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-sand-700 hover:text-charcoal hover:bg-sand-100 rounded"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-xl shadow-2xl border border-[#E8DEC4] p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8DEC4] pb-4 mb-6">
              <h3 className="font-editorial text-3xl font-light text-charcoal">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Create New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Regular Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Sale Price (Optional ₹)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Size & Dimensions Section */}
              <div className="bg-[#FAF6EE] border border-[#E8DEC4] p-3.5 rounded-lg space-y-3">
                <span className="block font-bold uppercase tracking-wider text-[11px] text-[#886633]">
                  Product Dimensions & Size Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#555] mb-1">Height (e.g. 110 cm)</label>
                    <input
                      type="text"
                      placeholder="110 cm"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full bg-white border border-[#E8DEC4] px-2.5 py-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#555] mb-1">Width (e.g. 180 cm)</label>
                    <input
                      type="text"
                      placeholder="180 cm"
                      value={formData.width}
                      onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                      className="w-full bg-white border border-[#E8DEC4] px-2.5 py-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#555] mb-1">Depth / Length (e.g. 210 cm)</label>
                    <input
                      type="text"
                      placeholder="210 cm"
                      value={formData.depth}
                      onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                      className="w-full bg-white border border-[#E8DEC4] px-2.5 py-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#555] mb-1">Dimensions Summary</label>
                  <input
                    type="text"
                    placeholder="180 W x 210 D x 110 H cm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] px-2.5 py-1.5 rounded text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Colors & Finishes Selector (Flipkart / Amazon Style Variant Picker) */}
              <div className="bg-[#FAF6EE] border border-[#E8DEC4] p-3.5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="block font-bold uppercase tracking-wider text-[11px] text-[#886633]">
                    Available Product Colors & Wood Finishes
                  </span>
                  <span className="text-[10px] text-[#777]">Select or add finishes available for this product</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { name: 'Natural Teak', hex: '#C5A880' },
                    { name: 'Walnut Brown', hex: '#5C4033' },
                    { name: 'Honey Oak', hex: '#D4A373' },
                    { name: 'Ebony Black', hex: '#1F1F1F' },
                    { name: 'Cream Beige', hex: '#E3DAC9' },
                    { name: 'Slate Grey', hex: '#708090' },
                    { name: 'Royal Blue', hex: '#1B365D' },
                    { name: 'Emerald Green', hex: '#0A5C36' },
                    { name: 'Rosewood Red', hex: '#65000B' },
                  ].map((finish) => {
                    const selectedColors = formData.colors || [];
                    const isChecked = selectedColors.includes(finish.name);
                    return (
                      <button
                        key={finish.name}
                        type="button"
                        onClick={() => {
                          const updated = isChecked
                            ? selectedColors.filter((c) => c !== finish.name)
                            : [...selectedColors, finish.name];
                          setFormData({ ...formData, colors: updated });
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                            : 'bg-white text-charcoal border-[#E8DEC4] hover:bg-sand-100'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0" style={{ backgroundColor: finish.hex }}></span>
                        <span>{finish.name}</span>
                        {isChecked && <Check className="w-3 h-3 text-sand-300" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input Form with Instant Auto-Suggest Dropdown */}
                <div className="pt-2 border-t border-[#E8DEC4] relative">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search / type custom color finish (e.g. Teak, Navy, Oak)..."
                      value={customColorInput}
                      onChange={(e) => setCustomColorInput(e.target.value)}
                      className="flex-1 bg-white border border-[#E8DEC4] px-2.5 py-1.5 rounded text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomColor}
                      className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded text-xs font-semibold hover:bg-sand-600 transition-colors cursor-pointer"
                    >
                      + Add Finish
                    </button>
                  </div>

                  {/* Instant Auto-Suggest Dropdown */}
                  {customColorInput.trim().length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E8DEC4] rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto p-1.5 space-y-1">
                      {ALL_COLOR_SUGGESTIONS.filter(
                        (c) =>
                          c.name.toLowerCase().includes(customColorInput.trim().toLowerCase()) &&
                          !(formData.colors || []).includes(c.name)
                      ).length === 0 ? (
                        <div
                          onClick={handleAddCustomColor}
                          className="p-2 text-xs text-[#666] hover:bg-sand-100 rounded cursor-pointer flex items-center justify-between"
                        >
                          <span>Add custom finish: <strong>"{customColorInput}"</strong></span>
                          <span className="text-[10px] font-bold text-sand-700 bg-sand-200 px-2 py-0.5 rounded">+ Add</span>
                        </div>
                      ) : (
                        ALL_COLOR_SUGGESTIONS.filter(
                          (c) =>
                            c.name.toLowerCase().includes(customColorInput.trim().toLowerCase()) &&
                            !(formData.colors || []).includes(c.name)
                        ).map((sug) => (
                          <button
                            key={sug.name}
                            type="button"
                            onClick={() => {
                              const existing = formData.colors || [];
                              if (!existing.includes(sug.name)) {
                                setFormData((prev) => ({ ...prev, colors: [...existing, sug.name] }));
                              }
                              setCustomColorInput('');
                            }}
                            className="w-full flex items-center justify-between p-2 hover:bg-[#1A1A1A] hover:text-white rounded text-xs transition-colors cursor-pointer group text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 group-hover:border-white/40 flex-shrink-0"
                                style={{ backgroundColor: sug.hex }}
                              />
                              <span className="font-medium">{sug.name}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-sand-600 group-hover:text-sand-300">
                              + Select
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Show Selected Colors Summary Badges */}
                {formData.colors && formData.colors.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#886633]">Selected ({formData.colors.length}):</span>
                    {formData.colors.map((col) => (
                      <span key={col} className="inline-flex items-center gap-1 bg-[#1A1A1A] text-white text-[10px] px-2 py-0.5 rounded font-medium">
                        {col}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, colors: formData.colors.filter((c) => c !== col) })}
                          className="hover:text-red-300 font-bold ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Per-Color Specific Image Upload Cards (Flipkart / Amazon Style Color Image Mapping) */}
                {formData.colors && formData.colors.length > 0 && (
                  <div className="pt-3 border-t border-[#E8DEC4] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="block font-bold uppercase tracking-wider text-[11px] text-[#886633]">
                        Upload Specific Photo for Each Color Finish
                      </span>
                      <span className="text-[10px] text-[#777]">Assign individual photos per color finish</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formData.colors.map((colorName) => {
                        const variantObj = (formData.colorVariants || []).find((v) => v.color === colorName) || { color: colorName, image: '' };
                        const hex = getColorHex(colorName);

                        const handleVariantImgUpload = async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const compressed = await compressImage(file);
                            if (compressed) {
                              updateColorVariantImage(colorName, compressed);
                            }
                          }
                        };

                        return (
                          <div key={colorName} className="bg-white border border-[#E8DEC4] p-2.5 rounded-lg space-y-2 text-xs shadow-sm">
                            <div className="flex items-center justify-between border-b border-[#F2ECE4] pb-1.5">
                              <div className="flex items-center gap-1.5 font-bold text-charcoal">
                                <span className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0" style={{ backgroundColor: hex }}></span>
                                <span>{colorName}</span>
                              </div>
                              {variantObj.image ? (
                                <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  Image Uploaded ✓
                                </span>
                              ) : (
                                <span className="text-[9px] uppercase font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                  Default Main Image
                                </span>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <div>
                                <label className="block text-[9px] text-[#777] mb-0.5 font-medium">Option A: Upload Image File</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleVariantImgUpload}
                                  className="w-full text-[10px] text-[#666] file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-[#1A1A1A] file:text-white hover:file:bg-sand-600 cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] text-[#777] mb-0.5 font-medium">Option B: Paste Image URL</label>
                                <input
                                  type="text"
                                  placeholder={`Paste ${colorName} image URL...`}
                                  value={variantObj.image || ''}
                                  onChange={(e) => updateColorVariantImage(colorName, e.target.value)}
                                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] px-2 py-1 rounded text-[11px] focus:outline-none"
                                />
                              </div>
                            </div>

                            {variantObj.image && (
                              <div className="flex items-center gap-2 pt-1 border-t border-[#F2ECE4]">
                                <span className="text-[9px] uppercase text-[#777] font-semibold">Color Preview:</span>
                                <img src={variantObj.image} alt={colorName} className="w-10 h-10 object-cover rounded border border-[#E8DEC4] bg-sand-50" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Images & Gallery Section (Multiple Images & Comma-Separated URL Support) */}
              <div className="bg-[#FAF6EE] border border-[#E8DEC4] p-3.5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="block font-bold uppercase tracking-wider text-[11px] text-[#886633]">
                    Product Images & Gallery (Multiple Photos Support)
                  </span>
                  <span className="text-[10px] text-[#777]">Upload multiple photos or paste comma-separated URLs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[10px] text-[#666] mb-1 font-medium">Option A: Select Multiple Files from Device</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleFileUpload}
                      className="w-full text-xs bg-white border border-[#E8DEC4] p-1.5 rounded file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#1A1A1A] file:text-white hover:file:bg-sand-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#666] mb-1 font-medium">Option B: Paste URLs (Separate multiple with comma ,)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://img1.jpg, https://img2.jpg..."
                        value={formData.imagesUrlInput || ''}
                        onChange={(e) => setFormData({ ...formData, imagesUrlInput: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddUrlsFromInput(formData.imagesUrlInput || '');
                          }
                        }}
                        className="flex-1 bg-white border border-[#E8DEC4] px-3 py-1.5 rounded text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddUrlsFromInput(formData.imagesUrlInput || '')}
                        className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded text-xs font-semibold hover:bg-sand-600 transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Multiple Image Preview Grid */}
                {formData.images && formData.images.length > 0 && (
                  <div className="pt-2 border-t border-[#E8DEC4]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-[#886633]">
                        Gallery Photos ({formData.images.length}):
                      </span>
                      <span className="text-[9px] text-[#777] italic">First photo is used as Main Product Image</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {formData.images.map((imgObj, idx) => {
                        const isMain = idx === 0;
                        return (
                          <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-[#DCD3BE] bg-white shadow-sm flex-shrink-0">
                            <img src={imgObj.url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            
                            {/* Main Badge */}
                            {isMain && (
                              <span className="absolute top-1 left-1 bg-[#1A1A1A] text-white text-[8px] uppercase font-bold px-1.5 py-0.5 rounded shadow">
                                Main
                              </span>
                            )}

                            {/* Action Buttons Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                              {!isMain && (
                                <button
                                  type="button"
                                  onClick={() => setAsMainImage(idx)}
                                  className="bg-white text-black text-[9px] font-bold px-1.5 py-1 rounded hover:bg-sand-200"
                                  title="Set as Main Image"
                                >
                                  Main
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => removeImageAtIndex(idx)}
                                className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                                title="Remove Image"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-[#E8DEC4]">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  />
                  <span>Mark as Trending</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8DEC4]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-charcoal rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded py-2 px-6"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
