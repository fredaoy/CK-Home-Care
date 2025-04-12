import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('email_verified_status');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.email === email && parsed.verified === true) {
        setEmailVerified(true);
      } else {
        setEmailVerified(false);
      }
    } else {
      setEmailVerified(false);
    }
  }, [email]);



  const sendVerificationEmail = () => {
    if (!email) return alert('กรุณากรอกอีเมลก่อน');

    const saved = localStorage.getItem('email_verified_status');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.email === email && parsed.verified === true) {
        alert('✅ อีเมลนี้ได้รับการยืนยันแล้ว');
        setEmailVerified(true);
        return;
      }
    }

    const verifyLink = `${window.location.origin}/verify?email=${encodeURIComponent(email)}`;
    emailjs.send(
      'service_m51ju29',
      'template_xs476rg',
      { user_email: email, verify_link: verifyLink },
      'gj9Gi7S_sdRLj88Xt'
    )
      .then(() => alert('✅ ส่งลิงก์ยืนยันอีเมลเรียบร้อยแล้ว'))
      .catch(() => alert('❌ ไม่สามารถส่งอีเมลได้'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) return alert('กรุณายืนยันอีเมลก่อน');

    const orderData = {
      name, email, phone, address,
      cartItems, totalPrice
    };

    localStorage.setItem('pending_order', JSON.stringify(orderData));
    alert('✅ ข้อมูลพร้อม ไปหน้าชำระเงิน!');
    navigate('/payments');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">📦 ยืนยันการสั่งซื้อ</h2>

        {cartItems.length === 0 ? (
          <p>ไม่มีสินค้าในตะกร้า <Link to="/products" className="text-blue-500">← กลับไปเลือกสินค้า</Link></p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>ชื่อผู้รับ</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>อีเมล</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  disabled={emailVerified}
                  className={`px-3 py-2 rounded text-sm ${emailVerified
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                  📩 ยืนยันอีเมล
                </button>

              </div>
              {emailVerified && <p className="text-green-600 text-sm mt-1">✅ อีเมลได้รับการยืนยันแล้ว</p>}
            </div>

            <div>
              <label>เบอร์โทร</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>ที่อยู่</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows="3" className="w-full border p-2 rounded"></textarea>
            </div>

            {emailVerified && (
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">✅ ไปหน้าชำระเงิน</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;
