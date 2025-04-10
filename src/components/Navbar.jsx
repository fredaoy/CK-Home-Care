import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CK Tool Mart</h1>
        <Link
          to="/products"
          className="bg-accent hover:bg-orange-500 px-4 py-2 rounded-lg text-white font-medium"
        >
          ดูสินค้าทั้งหมด
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;