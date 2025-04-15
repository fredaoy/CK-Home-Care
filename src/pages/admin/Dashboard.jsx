import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ck_products')) || [];
    setProducts(stored);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem('ck_products', JSON.stringify(updated));
    setProducts(updated);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-item/${id}`);
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          ออกจากระบบ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/admin/add-item" className="bg-white shadow rounded-xl p-4 hover:bg-gray-50">
          <h2 className="text-lg font-semibold">Add Item</h2>
          <p className="text-sm text-gray-500">เพิ่มสินค้าใหม่เข้าระบบ</p>
        </Link>
        <Link to="/admin/sales" className="bg-white shadow rounded-xl p-4 hover:bg-gray-50">
          <h2 className="text-lg font-semibold">Sales</h2>
          <p className="text-sm text-gray-500">ดูยอดขายทั้งหมด</p>
        </Link>
        <Link to="/admin/orders" className="bg-white shadow rounded-xl p-4 hover:bg-gray-50">
          <h2 className="text-lg font-semibold">Customer Orders</h2>
          <p className="text-sm text-gray-500">ข้อมูลลูกค้าและคำสั่งซื้อ</p>
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-4">📦 สินค้าทั้งหมด</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-sm text-left text-gray-600">
              <th className="p-3">รูป</th>
              <th className="p-3">ชื่อ</th>
              <th className="p-3">แบรนด์</th>
              <th className="p-3">ราคา</th>
              <th className="p-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t text-sm">
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3 text-green-600">฿{product.price}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-600 hover:underline"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">ไม่มีสินค้าที่จะแสดง</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
