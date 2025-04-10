import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation(); // ป้องกันไม่ให้ Card ทำงาน
    onAddToCart(product);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform duration-300 flex flex-col justify-between"
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">แบรนด์: {product.brand}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-primary font-bold text-lg">฿{product.price}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-blue-600">ดูรายละเอียด</span>
          <button
            onClick={handleCartClick}
            className="text-sm text-white bg-accent hover:bg-orange-600 px-3 py-1 rounded"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
