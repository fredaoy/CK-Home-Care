import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ฝั่งลูกค้า
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import VerifyEmail from './pages/VerifyEmail';
import Payments from './pages/Payments';
import PromptPayQR from './pages/PromptPayQR';
import UploadSlip from './pages/UploadSlip';
import ThankYou from './pages/ThankYou';

// ฝั่งแอดมิน
import AdminDashboard from './pages/admin/Dashboard';
import AddItem from './pages/admin/AddItem';
import Sales from './pages/admin/Sales';
import Orders from './pages/admin/Orders';
import EditItem from './pages/admin/EditItem';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/Login';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ลูกค้า */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/qr" element={<PromptPayQR />} />
        <Route path="/upload-slip" element={<UploadSlip />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* แอดมิน */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
        <Route path="/admin/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/admin/edit-item/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
