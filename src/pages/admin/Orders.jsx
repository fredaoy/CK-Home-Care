import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // ✅ ปรับ path ให้ตรงกับของจริง

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(list);
      } catch (err) {
        console.error('❌ ดึงข้อมูล Firestore ล้มเหลว:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 รายการคำสั่งซื้อ (จาก Firestore)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">ชื่อ</th>
              <th className="p-3">เบอร์</th>
              <th className="p-3">Email</th>
              <th className="p-3">รายการสินค้า</th>
              <th className="p-3">ยอดรวม</th>
              <th className="p-3">วันที่</th>
              <th className="p-3">สลิป</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id || index} className="border-t">
               <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">{order.email}</td>
                <td className="p-3">
                  <ul className="list-disc ml-4 text-gray-700">
                    {order.cartItems?.map((item, idx) => (
                      <li key={idx}>{item.name} × {item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 text-green-600">฿{order.totalPrice}</td>
                <td className="p-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleString('th-TH', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </td>
                <td className="p-3">
                  {order.slipBase64 ? (
                    <a href={order.slipBase64} target="_blank" rel="noopener noreferrer">
                      <img
                        src={order.slipBase64}
                        alt="slip"
                        className="w-24 h-auto border rounded hover:scale-110 transition-transform"
                      />
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">ไม่มี</span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
