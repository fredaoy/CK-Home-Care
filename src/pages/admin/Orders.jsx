import React, { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1IXuieYcQi7AZqn0Phydi41NcUIIQRyi8ymLdDmC3hGQ/gviz/tq?tqx=out:json&gid=0";

    fetch(sheetUrl)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows.map(r =>
          r.c.map(cell => (cell && cell.v !== null ? cell.v : ''))
        );
        setOrders(rows);
      })
      .catch(err => console.error("โหลดข้อมูลล้มเหลว:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Orders (จาก Google Sheet)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">ชื่อ</th>
              <th className="p-3">เบอร์</th>
              <th className="p-3">Email</th>
              <th className="p-3">รายการสินค้า</th>
              <th className="p-3">ยอดรวม</th>
              <th className="p-3">วันที่</th> {/* ✅ เปลี่ยนชื่อคอลัมน์ */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="p-3">{index + 1}</td> {/* 🟢 Order ID ใหม่ ไล่จาก 1 ขึ้นไป */}
                <td className="p-3">{order[0]}</td>
                <td className="p-3">{order[1]}</td>
                <td className="p-3">{order[3]}</td>
                <td className="p-3">
                  {(() => {
                    try {
                      const items = JSON.parse(order[4]);
                      return (
                        <ul className="list-disc ml-4 text-sm text-gray-700">
                          {items.map((item, idx) => (
                            <li key={idx}>{item.name} × {item.quantity}</li>
                          ))}
                        </ul>
                      );
                    } catch {
                      return <span className="text-gray-400 italic">ไม่สามารถแสดงได้</span>;
                    }
                  })()}
                </td>
                <td className="p-3 text-green-600">฿{order[5]}</td>
                <td className="p-3 text-gray-600">
  {(() => {
    try {
      const dateMatch = order[6].match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
      if (!dateMatch) throw new Error('รูปแบบไม่ถูกต้อง');
      
      const [_, y, m, d, h, min, s] = dateMatch.map(Number);
      const realDate = new Date(y, m, d, h, min, s);
      
      return realDate.toLocaleString('th-TH', {
        dateStyle: 'short',
        timeStyle: 'short'
      });
    } catch {
      return <span className="text-gray-400">ไม่ระบุ</span>;
    }
  })()}
</td>

              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
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
