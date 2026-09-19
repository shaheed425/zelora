import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, Search, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
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
    height: '',
    width: '',
    depth: '',
    dimensions: '',
    stockStatus: 'in-stock',
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, featuredImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      height: '110 cm',
      width: '180 cm',
      depth: '210 cm',
      dimensions: '180 W x 210 D x 110 H cm',
      stockStatus: 'in-stock',
      isFeatured: false,
      isTrending: false,
      isNewArrival: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category?._id || product.category || categories[0]?._id || '',
      price: product.price,
      salePrice: product.salePrice || 0,
      description: product.description || '',
      featuredImage: product.featuredImage || '',
      height: product.height || '',
      width: product.width || '',
      depth: product.depth || '',
      dimensions: product.dimensions || '',
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
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
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

              {/* Product Image (File Picker + URL Paste + Instant Preview) */}
              <div className="space-y-2">
                <label className="block font-semibold uppercase tracking-wider mb-1">Product Image</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[10px] text-[#666] mb-1 font-medium">Option A: Choose Image File from Device</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full text-xs bg-white border border-[#E8DEC4] p-1.5 rounded file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#1A1A1A] file:text-white hover:file:bg-[#947455] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#666] mb-1 font-medium">Option B: Paste Image URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                    />
                  </div>
                </div>

                {formData.featuredImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#777]">Image Preview:</span>
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#DCD3BE] bg-white shadow-sm">
                      <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
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
