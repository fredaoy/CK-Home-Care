import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const allProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const topThree = allProducts.slice(0, 3); // หรือสุ่มก็ได้
        setFeaturedProducts(topThree);
      } catch (err) {
        console.error('❌ ดึงสินค้าไม่สำเร็จ:', err);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <header className="bg-gradient-to-r from-primary to-blue-500 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ CK Tool Mart</h2>
        <p className="text-xl">แหล่งรวมเครื่องมือช่างคุณภาพ สำหรับมือโปรและมือใหม่</p>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">สินค้าแนะนำ</h3>
        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีสินค้าสำหรับแสดง</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
