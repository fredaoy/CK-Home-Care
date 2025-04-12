import React from 'react';
import { useParams } from 'react-router-dom';

const mockProducts = [
  {
    id: 1,
    name: 'สว่านไร้สาย 12V',
    brand: 'Makita',
    description: 'สว่านไร้สายสำหรับงานบ้านและงานช่างเบาๆ',
    price: 1590,
    image: 'https://siamwassadu.com/wp-content/uploads/2021/04/DSTELTHSCD121S2K-B1-A.jpg'
  },
  {
    id: 2,
    name: 'ไขควงชุด 31in1',
    brand: 'Bosch',
    description: 'ไขควงหลากขนาดพร้อมหัวแม่เหล็ก',
    price: 299,
    image: 'https://source.unsplash.com/400x300/?screwdriver-set,tool'
  },
  // ...เพิ่มสินค้าอื่นได้ตามต้องการ
];

function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="p-10 text-center text-red-500">ไม่พบสินค้านี้</div>;
  }

  return (
    <div className="p-10 h-70 max-w-4xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-xl shadow mb-6" />
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="text-gray-600 mt-1">แบรนด์: {product.brand}</p>
      <p className="mt-4 text-lg">{product.description}</p>
      <p className="mt-4 text-xl text-accent font-bold">ราคา: ฿{product.price}</p>
    </div>
  );
}

export default ProductDetail;
