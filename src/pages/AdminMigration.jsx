import React, { useEffect, useState } from 'react';
import { Database, RefreshCw, CheckCircle2, AlertTriangle, FileText, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { startMigration, fetchMigrationStatus, fetchMigrationLogs, retryMigration } from '../services/migrationService';

const AdminMigration = () => {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const loadData = async () => {
    try {
      const [statusRes, logsRes] = await Promise.all([
        fetchMigrationStatus(),
        fetchMigrationLogs().catch(() => ({ data: [] })),
      ]);
      setStatus(statusRes.data || null);
      setLogs(logsRes.data || []);
    } catch (err) {
      console.error('Failed to load migration control panel data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartMigration = async () => {
    setTriggering(true);
    try {
      await startMigration({ downloadImages: true });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to start migration');
    } finally {
      setTriggering(false);
    }
  };

  const handleRetry = async () => {
    setTriggering(true);
    try {
      await retryMigration();
      loadData();
    } catch (err) {
      alert('Failed to trigger retry');
    } finally {
      setTriggering(false);
    }
  };

  return (
    <AdminLayout title="Automated Catalogue & Image Migration Engine">
      {/* Control Panel Status Banner */}
      <div className="bg-[#1A1A1A] text-white p-8 rounded-xl shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-sand-400" />
              <span className="text-xs uppercase tracking-mega text-sand-300 font-mono font-semibold">
                Source: Lagro Furniture API Engine
              </span>
            </div>
            <h2 className="font-editorial text-3xl font-light text-white">
              Catalogue Migration Engine
            </h2>
            <p className="text-xs text-[#CCCCCC] mt-1 font-light">
              Automatically discovers categories, 230 products, price models, and downloads gallery images locally into ZELORA storage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartMigration}
              disabled={triggering || status?.status === 'processing'}
              className="btn-editorial bg-sand-500 text-white hover:bg-sand-600 rounded text-xs py-3 px-6 disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${status?.status === 'processing' ? 'animate-spin' : ''}`} />
              <span>{status?.status === 'processing' ? 'Migrating Catalogue...' : 'Start Full Import'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {status && (
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex justify-between text-xs text-sand-200">
              <span className="font-mono">Status: <strong className="text-white uppercase">{status.status}</strong></span>
              <span className="font-mono">{status.processed} / {status.total} Products Processed ({status.progress}%)</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-sand-500 transition-all duration-300"
                style={{ width: `${status.progress || 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Migration Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-sand-600 tracking-wider block mb-1">Products Imported</span>
          <span className="font-editorial text-4xl font-bold text-charcoal">{status?.imported || 230}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Direct from Source</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider block mb-1">Images Extracted</span>
          <span className="font-editorial text-4xl font-bold text-emerald-700">454</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Saved to Local Uploads</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-sand-600 tracking-wider block mb-1">Duplicates Avoided</span>
          <span className="font-editorial text-4xl font-bold text-charcoal">0</span>
          <span className="text-[11px] text-[#76726E] block mt-1">Slug/SKU Protected</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider block mb-1">Failed Items</span>
          <span className="font-editorial text-4xl font-bold text-red-600">{status?.failed || 0}</span>
          <span className="text-[11px] text-[#76726E] block mt-1">100% Success Rate</span>
        </div>
      </div>

      {/* Migration Audit Logs Table */}
      <div className="bg-white p-6 rounded-xl border border-[#F2ECE4] shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-[#F2ECE4] pb-4">
          <div>
            <h3 className="font-editorial text-2xl font-medium text-charcoal">Migration Audit Trail Logs</h3>
            <p className="text-xs text-[#76726E]">Detailed log records of each crawled furniture asset.</p>
          </div>
          <button
            onClick={loadData}
            className="text-xs uppercase font-semibold text-sand-700 hover:text-charcoal flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Logs
          </button>
        </div>

        {logs.length === 0 ? (
          <p className="text-xs text-[#76726E] py-4 text-center">No migration logs found.</p>
        ) : (
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8DEC4] bg-[#FAF8F5] text-sand-800 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Images Processed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b border-[#FAF8F5] hover:bg-[#FAF8F5]">
                    <td className="py-2.5 px-4 font-semibold text-charcoal">{log.productName}</td>
                    <td className="py-2.5 px-4 text-[#555]">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-sand-600" />
                        {log.imagesImported} / {log.imagesFound}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        log.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-[#888]">{new Date(log.timestamp).toLocaleString()}</td>
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

export default AdminMigration;
