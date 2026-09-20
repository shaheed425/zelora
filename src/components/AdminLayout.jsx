import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Layers, MessageSquare, ShoppingBag, Database, LayoutDashboard, LogOut, ArrowLeft, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children, title = 'Admin CMS' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden bg-charcoal text-white px-4 py-3 border-b border-[#2D2D2D] flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Link to="/zelora" className="flex items-center gap-2">
          <span className="font-editorial text-2xl font-bold tracking-tight text-white">ZELORA</span>
          <span className="text-[9px] uppercase tracking-wider text-sand-500 font-mono bg-white/10 px-1.5 py-0.5 rounded">
            CMS
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161616] text-white p-4 border-b border-[#2D2D2D] space-y-4 animate-fadeIn sticky top-[53px] z-30 shadow-2xl">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive ? 'bg-sand-600 text-white shadow-sm' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sand-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Clean Styled Admin Profile Card Box */}
          <div className="bg-[#222222] p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sand-600/30 text-sand-300 flex items-center justify-center font-bold text-xs border border-sand-500/30 shrink-0">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-white/50 truncate font-mono">{user?.email || 'admin@zelora.com'}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Session"></span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold py-2 px-2.5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sand-400" />
                <span>Site View</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center justify-center gap-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 text-[11px] font-semibold py-2 px-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-charcoal text-white flex-shrink-0 p-6 flex-col justify-between border-r border-[#2D2D2D] min-h-screen sticky top-0 h-screen">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
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

        {/* Desktop Admin Profile & Logout Box Card */}
        <div className="pt-6 border-t border-[#333333] space-y-3">
          <div className="bg-[#1F1F1F] p-3.5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sand-600/30 text-sand-300 flex items-center justify-center font-bold text-xs border border-sand-500/30 shrink-0">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-white/50 truncate font-mono">{user?.email || 'admin@zelora.com'}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Session"></span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <Link
                to="/"
                className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold py-2 px-2.5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sand-400" />
                <span>Site View</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center justify-center gap-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 text-[11px] font-semibold py-2 px-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8 border-b border-[#E8DEC4] pb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="font-editorial text-2xl sm:text-4xl font-light text-charcoal">{title}</h1>
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
