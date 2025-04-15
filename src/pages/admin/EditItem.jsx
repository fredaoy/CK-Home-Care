// EditItem.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('ck_products')) || [];
        const target = stored.find(p => p.id === parseInt(id));
        if (target) {
            setProduct(target);
            setPreview(target.image);
        } else {
            alert('ไม่พบสินค้าที่ต้องการแก้ไข');
            navigate('/admin');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct(prev => ({ ...prev, image: reader.result }));
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem('ck_products')) || [];
        const updated = stored.map(p => p.id === product.id ? product : p);
        localStorage.setItem('ck_products', JSON.stringify(updated));
        alert('✅ แก้ไขสินค้าเรียบร้อยแล้ว!');
        navigate('/admin');
    };

    if (!product) {
        return <p className="text-center py-8 text-gray-500">กำลังโหลดข้อมูลสินค้า...</p>;
    }
    ;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h1>
            <button onClick={() => navigate('/admin')} className="text-blue-500 underline text-sm mb-4 block">
                ← กลับหน้าหลักแอดมิน
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={product.name} onChange={handleChange} placeholder="ชื่อสินค้า" className="w-full p-2 border rounded-xl" required />
                <input name="code" value={product.code} onChange={handleChange} placeholder="รหัสสินค้า" className="w-full p-2 border rounded-xl" />
                <input name="brand" value={product.brand} onChange={handleChange} placeholder="แบรนด์" className="w-full p-2 border rounded-xl" />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="คำอธิบาย" className="w-full p-2 border rounded-xl" />
                <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="ราคา" className="w-full p-2 border rounded-xl" required />

                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-xl" />
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />}
                </div>

                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
                    💾 บันทึกการแก้ไข
                </button>

            </form>
        </div>
    );
}
