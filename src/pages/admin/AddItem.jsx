import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [preview, setPreview] = useState(null);

  // แปลงรูปเป็น base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);  // base64
      setPreview(reader.result);      // แสดง preview
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      code,
      brand,
      description,
      price: parseFloat(price),
      image: imageBase64
    };

    const existingProducts = JSON.parse(localStorage.getItem('ck_products')) || [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('ck_products', JSON.stringify(updatedProducts));

    alert('✅ เพิ่มสินค้าเรียบร้อยแล้ว!');
    navigate('/admin');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">เพิ่มสินค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="ชื่อสินค้า" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-xl" required />
        <input type="text" placeholder="รหัสสินค้า" value={code} onChange={(e) => setCode(e.target.value)} className="w-full p-2 border rounded-xl" />
        <input type="text" placeholder="แบรนด์" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-2 border rounded-xl" />
        <textarea placeholder="คำอธิบาย" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-xl" />
        <input type="number" placeholder="ราคา" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded-xl" required />

        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-xl" />
          {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
          ➕ เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
}
