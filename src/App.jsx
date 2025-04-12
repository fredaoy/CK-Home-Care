import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/qr" element={<PromptPayQR />} />
        <Route path="/upload-slip" element={<UploadSlip />} />
        <Route path="/thank-you" element={<ThankYou />} />

      </Routes>
    </Router>
  );
}

export default App;
