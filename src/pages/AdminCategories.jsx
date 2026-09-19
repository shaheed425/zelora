import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, X, Layers } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Failed to load categories for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCat(null);
    setFormData({ name: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCat(cat);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await updateCategory(editingCat._id, formData);
      } else {
        await createCategory(formData);
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  return (
    <AdminLayout title="Categories Management">
      <div className="flex justify-end mb-8">
        <button
          onClick={openCreateModal}
          className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded text-xs py-2.5 px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#F2ECE4] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#76726E]">Loading categories...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] bg-[#FAF8F5] text-sand-800 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Category Name</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Product Count</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4 font-editorial text-lg font-medium text-charcoal">{c.name}</td>
                    <td className="py-3 px-4 text-[#888] font-mono">{c.slug}</td>
                    <td className="py-3 px-4 font-semibold text-sand-700">{c.productCount || 0} Products</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 text-sand-700 hover:text-charcoal hover:bg-sand-100 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-md w-full rounded-xl shadow-2xl border border-[#E8DEC4] p-6">
            <div className="flex items-center justify-between border-b border-[#E8DEC4] pb-4 mb-4">
              <h3 className="font-editorial text-2xl font-light text-charcoal">
                {editingCat ? `Edit Category` : 'New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white border border-[#E8DEC4] px-3 py-2 rounded focus:outline-none"
                />
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

              <div className="pt-4 flex justify-end gap-2 border-t border-[#E8DEC4]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-charcoal rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded py-2 px-6"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCategories;
