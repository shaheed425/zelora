import React, { useEffect, useState } from 'react';
import { Trash2, Phone, Mail, CheckCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/enquiryService';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries();
      setEnquiries(res.data || []);
    } catch (err) {
      console.error('Failed to load enquiries for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      loadEnquiries();
    } catch (err) {
      alert('Failed to update enquiry status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enquiry record?')) {
      try {
        await deleteEnquiry(id);
        loadEnquiries();
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
  };

  return (
    <AdminLayout title="Customer Enquiries & Leads">
      <div className="bg-white rounded-xl border border-[#F2ECE4] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#76726E]">Loading customer enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#76726E]">No enquiries submitted yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] bg-[#FAF8F5] text-sand-800 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Product / Context</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4">
                      <strong className="font-editorial text-base text-charcoal block">{enq.customerName}</strong>
                      <div className="flex items-center gap-3 text-[11px] text-[#666] mt-0.5">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-sand-600" /> {enq.phone}</span>
                        {enq.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-sand-600" /> {enq.email}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-charcoal font-medium">
                      {enq.productName || 'General Consultation'}
                    </td>
                    <td className="py-3 px-4 text-[#555] max-w-xs truncate">
                      {enq.message || 'No additional note'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className="bg-[#FAF8F5] border border-[#E8DEC4] text-xs font-semibold px-2 py-1 rounded cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="FOLLOW_UP">FOLLOW_UP</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete"
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
    </AdminLayout>
  );
};

export default AdminEnquiries;
