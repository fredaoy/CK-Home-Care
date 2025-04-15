// ✅ Payments.jsx - ดึงจาก pending_order ไม่ต้องพึ่ง ck_cart
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Payments() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('pending_order'));
    if (pending) {
      setCartItems(pending.cartItems || []);
      setTotal(parseFloat(pending.totalPrice || 0));
    }
  }, []);

  const handlePayment = () => {
    navigate('/payments/qr');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">💳 หน้าชำระเงิน</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">ไม่มีสินค้าในตะกร้า <Link to="/products" className="text-blue-500 hover:underline">กลับไปเลือกสินค้า</Link></p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {cartItems.map(item => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">฿{item.price} × {item.quantity}</p>
                  </div>
                  <span className="font-bold">฿{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="text-right text-lg font-bold mb-6">รวมทั้งหมด: ฿{total}</div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            >
              ✅ ดำเนินการชำระเงิน
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Payments;
