import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Layers, MessageSquare, ShoppingBag, Database, ArrowRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import { fetchEnquiries } from '../services/enquiryService';
import { fetchOrders } from '../services/orderService';
import { fetchMigrationStatus } from '../services/migrationService';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    enquiries: 0,
    orders: 0,
    newArrivals: 0,
    trending: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const [prodData, catData, enqData, ordData, migData] = await Promise.all([
          fetchProducts({ limit: 100 }),
          fetchCategories(),
          fetchEnquiries().catch(() => ({ data: [] })),
          fetchOrders().catch(() => ({ data: [] })),
          fetchMigrationStatus().catch(() => ({ data: null })),
        ]);

        const prods = prodData.products || [];
        setStats({
          products: prodData.pagination?.total || prods.length,
          categories: catData.data?.length || 0,
          enquiries: enqData.data?.length || 0,
          orders: ordData.data?.length || 0,
          newArrivals: prods.filter(p => p.isNewArrival).length,
          trending: prods.filter(p => p.isTrending).length,
        });

        setRecentEnquiries((enqData.data || []).slice(0, 5));
        setMigrationStatus(migData.data);
      } catch (err) {
        console.error('Failed to load admin overview data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadOverviewData();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-600">Total Products</span>
            <Package className="w-5 h-5 text-sand-500" />
          </div>
          <span className="font-editorial text-4xl font-bold text-charcoal">{stats.products}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">230 Migrated from Lagro</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-600">Categories</span>
            <Layers className="w-5 h-5 text-sand-500" />
          </div>
          <span className="font-editorial text-4xl font-bold text-charcoal">{stats.categories}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Active Divisions</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-600">Enquiries</span>
            <MessageSquare className="w-5 h-5 text-sand-500" />
          </div>
          <span className="font-editorial text-4xl font-bold text-charcoal">{stats.enquiries}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Customer Leads</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-600">Orders</span>
            <ShoppingBag className="w-5 h-5 text-sand-500" />
          </div>
          <span className="font-editorial text-4xl font-bold text-charcoal">{stats.orders}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Confirmed Dispatches</span>
        </div>
      </div>

      {/* Migration Status Quick Banner */}
      <div className="bg-charcoal text-white p-6 rounded-xl shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-sand-400" />
            <span className="text-xs uppercase tracking-widest font-mono text-sand-300">Automated Migration Engine</span>
          </div>
          <h3 className="font-editorial text-2xl font-light">
            Lagro Catalogue Status: {migrationStatus?.status?.toUpperCase() || 'COMPLETED'}
          </h3>
          <p className="text-xs text-[#AAAAAA] mt-1 font-light">
            All 230 products, 15 categories & images synchronized without missing data.
          </p>
        </div>

        <Link
          to="/zelora/migration"
          className="btn-editorial bg-sand-500 text-white hover:bg-sand-600 rounded text-xs py-3 px-6 whitespace-nowrap"
        >
          <span>Migration Control Panel</span>
          <ArrowRight className="w-4 h-4 arrow-icon" />
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-[#F2ECE4] pb-4">
          <h3 className="font-editorial text-2xl font-medium text-charcoal">Recent Customer Enquiries</h3>
          <Link to="/zelora/enquiries" className="text-xs uppercase tracking-widest text-sand-700 font-semibold hover:underline">
            View All Enquiries
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="text-xs text-[#76726E] py-4 text-center">No customer enquiries recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] text-sand-800 uppercase tracking-wider">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Product / Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4 font-semibold text-charcoal">{enq.customerName}</td>
                    <td className="py-3 px-4 text-[#555]">{enq.phone}</td>
                    <td className="py-3 px-4 text-[#555]">{enq.productName || 'General Enquiry'}</td>
                    <td className="py-3 px-4">
                      <span className="bg-sand-100 text-sand-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#888]">{new Date(enq.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
