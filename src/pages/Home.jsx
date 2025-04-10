import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const mockProducts = [
  {
    id: 1,
    name: 'สว่านไฟฟ้า 650W',
    description: 'กำลังสูง เหมาะสำหรับงานหนัก',
    price: 1290,
    image: 'https://source.unsplash.com/400x300/?drill,tool'
  },
  {
    id: 2,
    name: 'เครื่องตัดเหล็ก',
    description: 'ใช้งานสะดวก แข็งแรง',
    price: 1990,
    image: 'https://source.unsplash.com/400x300/?metal-cutter,tool'
  },
  {
    id: 3,
    name: 'ไขควงชุด 24in1',
    description: 'เหมาะสำหรับช่างมืออาชีพ',
    price: 399,
    image: 'https://source.unsplash.com/400x300/?screwdriver,tool'
  },
];

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-blue-500 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ CK Tool Mart</h2>
        <p className="text-xl">แหล่งรวมเครื่องมือช่างคุณภาพ สำหรับมือโปรและมือใหม่</p>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">สินค้าแนะนำ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;