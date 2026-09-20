import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';

// Storefront Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import NewArrivals from './pages/NewArrivals';
import Trending from './pages/Trending';
import FeaturedProducts from './pages/FeaturedProducts';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import StoreLocations from './pages/StoreLocations';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';

// Admin CMS Pages
import AdminOverview from './pages/AdminOverview';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminEnquiries from './pages/AdminEnquiries';
import AdminOrders from './pages/AdminOrders';
import AdminMigration from './pages/AdminMigration';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/zelora');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CartDrawer />}
      {!isAdminRoute && <WhatsAppFloat />}
    </div>
  );
};

function App() {
  useEffect(() => {
    // Keep-Alive Anti-Sleep Mechanism (Wakes up free backend instances instantly)
    const pingBackend = async () => {
      try {
        await fetch('/api/health');
      } catch (err) {
        // Silently ignore ping errors
      }
    };

    pingBackend();
    const interval = setInterval(pingBackend, 5 * 60 * 1000); // Ping every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                {/* Storefront Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:slug" element={<CategoryProducts />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/featured" element={<FeaturedProducts />} />
                <Route path="/search" element={<Search />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store-locations" element={<StoreLocations />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faqs" element={<FAQ />} />

                {/* Secret Admin CMS Routes */}
                <Route path="/zelora" element={<AdminOverview />} />
                <Route path="/zelora/products" element={<AdminProducts />} />
                <Route path="/zelora/categories" element={<AdminCategories />} />
                <Route path="/zelora/enquiries" element={<AdminEnquiries />} />
                <Route path="/zelora/orders" element={<AdminOrders />} />
                <Route path="/zelora/migration" element={<AdminMigration />} />
              </Routes>
            </Layout>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
