import React, { useEffect, useState } from 'react';

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekSummary, setWeekSummary] = useState([]);

  useEffect(() => {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1IXuieYcQi7AZqn0Phydi41NcUIIQRyi8ymLdDmC3hGQ/gviz/tq?tqx=out:json&gid=0";

    fetch(sheetUrl)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows.map(r =>
          r.c.map(cell => (cell && cell.v !== null ? cell.v : ''))
        );
        setSalesData(rows);
      })
      .catch(err => console.error("โหลดข้อมูลล้มเหลว:", err));
  }, []);

  useEffect(() => {
    const now = new Date();
    const summary = {};
    let todaySum = 0;

    salesData.forEach(order => {
      const rawDate = order[6]; // คอลัมน์ G = วันที่
      const price = parseFloat(order[5]) || 0;

      if (!rawDate) return;

      let orderDate;

      // เช็คว่าเป็น Date อยู่แล้วหรือไม่
      if (typeof rawDate === 'string') {
        // ใช้ split แยกวันที่กับเวลา
        const parts = rawDate.split(/[\s,]+/); // "13/4/2025, 3:13:06"
        if (parts.length >= 2) {
          const [day, month, year] = parts[0].split('/').map(Number);
          const [hour, minute, second] = parts[1].split(':').map(Number);
          orderDate = new Date(year, month - 1, day, hour, minute, second);
        } else {
          orderDate = new Date(rawDate); // fallback
        }
      } else {
        orderDate = new Date(rawDate);
      }

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
  }, [salesData]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500 mb-2">(ยอดขายจาก Google Sheet)</p>
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
