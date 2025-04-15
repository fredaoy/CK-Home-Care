  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../../firebase";


  export default function AddItem() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [preview, setPreview] = useState(null);

    // 🔄 แปลงรูปภาพเป็น base64
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const newProduct = {
        name,
        code,
        brand,
        description,
        price: price ? parseFloat(price) : 0,
        image: imageBase64,
        createdAt: Date.now()
      };

      console.log("🚀 ส่งสินค้าเข้า Firebase:", newProduct);

    
      try {
        await addDoc(collection(db, "products"), newProduct);
        alert("✅ เพิ่มสินค้าเข้า Firebase เรียบร้อยแล้ว!");
        navigate("/products");
      }catch (err) {
        console.error("❌ เกิดข้อผิดพลาด Firebase:", err);
      }
    

      const existingProducts = JSON.parse(localStorage.getItem('ck_products')) || [];
      const updatedProducts = [...existingProducts, { id: Date.now(), ...newProduct }];
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


  