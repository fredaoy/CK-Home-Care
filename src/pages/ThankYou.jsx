import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pending_order');
    if (stored) {
      setOrder(JSON.parse(stored));
      localStorage.removeItem('pending_order'); // ✅ ล้างข้อมูลหลังแสดง
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-gray-100 p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 คำสั่งซื้อเสร็จสมบูรณ์!</h2>
        <p className="text-gray-700 mb-2">ขอบคุณที่สั่งซื้อสินค้ากับ CK Tool Mart</p>
        <p className="text-gray-600 mb-6">เราได้รับข้อมูลของคุณเรียบร้อยแล้ว และจะติดต่อกลับผ่านอีเมลที่ให้ไว้</p>

        {order && (
          <div className="text-left text-sm bg-white p-4 rounded border border-gray-300">
            <p><strong>👤 ชื่อ:</strong> {order.name}</p>
            <p><strong>📧 อีเมล:</strong> {order.email}</p>
            <p><strong>📞 เบอร์โทร:</strong> {order.phone}</p>
            <p><strong>🏠 ที่อยู่:</strong> {order.address}</p>
            <p className="mt-2"><strong>🛒 รายการสินค้า:</strong></p>
            <ul className="ml-4 list-disc text-gray-700">
              {order.cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} = ฿{(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold text-right">💰 รวม: ฿{parseFloat(order.totalPrice).toFixed(2)}</p>
          </div>
        )}

        <Link to="/products">
          <button className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
            🛒 กลับไปเลือกสินค้าต่อ
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
