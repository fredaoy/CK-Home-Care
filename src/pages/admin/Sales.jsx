import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // ✅ ปรับให้ตรงกับ path firebase

export default function Sales() {
  const [orders, setOrders] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekSummary, setWeekSummary] = useState([]);

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

  useEffect(() => {
    const now = new Date();
    const summary = {};
    let todaySum = 0;

    orders.forEach(order => {
      const price = parseFloat(order.totalPrice) || 0;
      const orderDate = new Date(order.createdAt);

      const dateKey = orderDate.toLocaleDateString('th-TH', { dateStyle: 'short' });
      summary[dateKey] = (summary[dateKey] || 0) + price;

      const isToday = orderDate.toDateString() === now.toDateString();
      if (isToday) todaySum += price;
    });

    const sortedDays = Object.keys(summary)
      .sort((a, b) => {
        const [da, ma, ya] = a.split('/');
        const [db, mb, yb] = b.split('/');
        const dateA = new Date(+ya, +ma - 1, +da);
        const dateB = new Date(+yb, +mb - 1, +db);
        return dateB - dateA;
      })
      .slice(0, 7);

    const weekData = sortedDays.map(date => ({
      date,
      total: summary[date]
    }));

    setTodayTotal(todaySum);
    setWeekSummary(weekData);
  }, [orders]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500 mb-2">(ยอดขายจาก Firestore)</p>
        <div className="text-xl font-semibold text-green-600">
          ยอดขายรวมวันนี้: ฿{todayTotal.toLocaleString()}
        </div>
        <div className="mt-4">
          <p className="text-gray-700 font-medium">ยอดขาย 7 วันที่ผ่านมา</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {weekSummary.map((d, idx) => (
              <li key={idx}>
                {d.date} - ฿{d.total.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}  
