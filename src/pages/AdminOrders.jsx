import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fetchOrders, updateOrderStatus } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetchOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to load orders for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, orderStatus) => {
    try {
      await updateOrderStatus(id, { orderStatus });
      loadOrders();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <AdminLayout title="Customer Orders & Dispatch">
      <div className="bg-white rounded-xl border border-[#F2ECE4] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#76726E]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#76726E]">No orders submitted yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] bg-[#FAF8F5] text-sand-800 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Address</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4 font-mono font-bold text-charcoal">{ord.orderNumber}</td>
                    <td className="py-3 px-4">
                      <strong className="block text-charcoal">{ord.customer?.name}</strong>
                      <span className="text-[#666] font-mono">{ord.customer?.phone}</span>
                    </td>
                    <td className="py-3 px-4 text-[#555] max-w-xs truncate">
                      {ord.shippingAddress?.city}, {ord.shippingAddress?.state}
                    </td>
                    <td className="py-3 px-4 font-bold text-charcoal">
                      {formatCurrency(ord.total)}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className="bg-[#FAF8F5] border border-[#E8DEC4] text-xs font-semibold px-2 py-1 rounded cursor-pointer"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-[#888]">{new Date(ord.createdAt).toLocaleDateString()}</td>
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

export default AdminOrders;
