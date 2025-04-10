import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Checkout() {
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const [email, setEmail] = React.useState('');
  const [emailVerified, setEmailVerified] = React.useState(false);

  React.useEffect(() => {
    const isVerified = localStorage.getItem(`email_verified_${email}`) === 'true';
    setEmailVerified(isVerified);
  }, [email]);

  const sendVerificationEmail = () => {
    if (!email) return alert('กรุณากรอกอีเมลก่อน');
    const verificationLink = `${window.location.origin}/verify?email=${encodeURIComponent(email)}`;
    const templateParams = {
      user_email: email,
      verify_link: verificationLink,
    };

    emailjs.send(
        'service_m51ju29',
        'template_xs476rg',
        {
          user_email: email,
          verify_link: `https://cktoolmart.com/verify?email=example@email.com`
        },
        'gj9Gi7S_sdRLj88Xt' // ← ใส่ public key จาก EmailJS ของคุณ
      )
        .then(() => alert('✅ ส่งลิงก์ยืนยันอีเมลเรียบร้อยแล้ว'))
        .catch((err) => {
          console.error('EmailJS error:', err);
          alert('❌ ไม่สามารถส่งอีเมลได้');
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) {
      alert('กรุณายืนยันอีเมลก่อนทำรายการสั่งซื้อ');
      return;
    }
    alert('✅ การสั่งซื้อเสร็จสมบูรณ์! (ตัวอย่าง)');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">📦 ยืนยันการสั่งซื้อ</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">ไม่มีสินค้าในตะกร้า <Link to="/products" className="text-blue-500 hover:underline">กลับไปหน้ารวมสินค้า</Link></p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">แบรนด์: {item.brand}</p>
                    <p className="text-sm">฿{item.price} × {item.quantity} = ฿{item.price * item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-right font-semibold text-lg mb-6">รวมทั้งหมด: ฿{totalPrice}</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium">ชื่อผู้รับ</label>
                <input type="text" className="mt-1 block w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block font-medium">อีเมล</label>
                <div className="flex gap-2 items-center mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border px-3 py-2 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={sendVerificationEmail}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                  >
                    ส่งลิงก์ยืนยันอีเมล
                  </button>
                </div>
                {emailVerified && <p className="text-green-600 text-sm mt-1">✅ ยืนยันอีเมลแล้ว</p>}
              </div>
              <div>
                <label className="block font-medium">เบอร์โทร</label>
                <input type="tel" className="mt-1 block w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block font-medium">ที่อยู่จัดส่ง</label>
                <textarea className="mt-1 block w-full border px-3 py-2 rounded" rows="3" required></textarea>
              </div>

              <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded w-full">
                ✅ ยืนยันการสั่งซื้อ
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
