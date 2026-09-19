import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Layers, MessageSquare, ShoppingBag, Database, LayoutDashboard, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children, title = 'Admin CMS' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard Overview', path: '/zelora', icon: LayoutDashboard },
    { name: 'Products Catalogue', path: '/zelora/products', icon: Package },
    { name: 'Categories', path: '/zelora/categories', icon: Layers },
    { name: 'Customer Enquiries', path: '/zelora/enquiries', icon: MessageSquare },
    { name: 'Orders Management', path: '/zelora/orders', icon: ShoppingBag },
    { name: 'Catalogue Migration Engine', path: '/zelora/migration', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal text-white flex-shrink-0 p-6 flex flex-col justify-between border-r border-[#2D2D2D]">
        <div>
          <div className="mb-8 border-b border-[#333333] pb-6">
            <Link to="/" className="inline-block">
              <span className="font-editorial text-3xl font-bold tracking-tight text-white">ZELORA</span>
              <span className="block text-[9px] uppercase tracking-mega text-sand-500 font-mono mt-0.5">
                Business CMS Portal
              </span>
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive ? 'bg-sand-600 text-white shadow-sm' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-[#333333] space-y-3 text-xs text-[#A0A0A0]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="truncate">Admin: {user?.email || 'admin@zelora.com'}</span>
          </div>

          <Link to="/" className="flex items-center gap-2 hover:text-white transition-colors py-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Site</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full text-left py-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 border-b border-[#E8DEC4] pb-4 flex items-center justify-between">
            <h1 className="font-editorial text-4xl font-light text-charcoal">{title}</h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-sand-700 bg-sand-100 px-3 py-1 rounded">
              ZELORA Engine v1.0
            </span>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
