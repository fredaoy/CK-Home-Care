import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // ปรับ path ให้ตรงกับโปรเจกต์ของ TVD



function Products() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('ck_cart')) || [];
  });
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // โหลดสินค้าจาก localStorage เมื่อหน้า Products เปิดขึ้น
  React.useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
  
    fetchProducts();
  }, []);
  

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (err) {
        console.error("❌ โหลดสินค้าไม่สำเร็จ:", err);
      }
    };
  
    fetchProducts();
  }, []);
  
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };


  return (
    <div className="bg-gray-50 min-h-screen relative">
      <header className="bg-gradient-to-r from-primary to-blue-500 text-white py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold">หน้ารวมสินค้า</h2>
            <nav className="text-sm text-blue-100 mt-1">
              <Link to="/" className="hover:underline">หน้าแรก</Link> &gt; สินค้าทั้งหมด
            </nav>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="text-sm text-white bg-accent hover:bg-orange-600 px-4 py-2 rounded-lg shadow"
          >
            🛒 ตะกร้าสินค้า ({cartItems.reduce((total, item) => total + item.quantity, 0)} รายการ)
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
      {showCart && (
        <div className="absolute top-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-xl font-bold mb-4">🛍️ ตะกร้าของคุณ</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            <>
              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 border-b pb-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">รหัส: {item.code}</p>
                      <p className="text-xs text-gray-500">แบรนด์: {item.brand}</p>
                      <p className="text-primary font-bold">฿{item.price * item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-2 rounded">–</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-2 rounded">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-600 hover:underline text-xs">ลบ</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <p className="text-base font-semibold text-gray-700">รวมทั้งหมด: ฿{totalPrice}</p>
                <button onClick={handleCheckout} className="mt-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded">
                  ชำระเงิน
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';





// function Products() {
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     return JSON.parse(localStorage.getItem('ck_cart')) || [];
//   });
//   const [showCart, setShowCart] = useState(false);
//   const navigate = useNavigate();

//   // โหลดสินค้าจาก localStorage เมื่อหน้า Products เปิดขึ้น
//   React.useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('ck_products')) || [];
//     setProducts(stored);
//   }, []);

//   React.useEffect(() => {
//     localStorage.setItem('ck_cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleAddToCart = (product) => {
//     setCartItems(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const increaseQuantity = (id) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleCheckout = () => {
//     navigate('/checkout', { state: { cartItems, totalPrice } });
//   };


//   return (
//     <div className="bg-gray-50 min-h-screen relative">
//       <header className="bg-gradient-to-r from-primary to-blue-500 text-white py-10 px-6">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-3xl font-bold">หน้ารวมสินค้า</h2>
//             <nav className="text-sm text-blue-100 mt-1">
//               <Link to="/" className="hover:underline">หน้าแรก</Link> &gt; สินค้าทั้งหมด
//             </nav>
//           </div>
//           <button
//             onClick={() => setShowCart(!showCart)}
//             className="text-sm text-white bg-accent hover:bg-orange-600 px-4 py-2 rounded-lg shadow"
//           >
//             🛒 ตะกร้าสินค้า ({cartItems.reduce((total, item) => total + item.quantity, 0)} รายการ)
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {products.map(product => (
//             <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
//           ))}
//         </div>
//       </main>
//       {showCart && (
//         <div className="absolute top-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
//           <h3 className="text-xl font-bold mb-4">🛍️ ตะกร้าของคุณ</h3>
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
//           ) : (
//             <>
//               <ul className="space-y-3 max-h-96 overflow-y-auto">
//                 {cartItems.map((item) => (
//                   <li key={item.id} className="flex items-start gap-3 border-b pb-3">
//                     <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-sm">{item.name}</h4>
//                       <p className="text-xs text-gray-500">รหัส: {item.code}</p>
//                       <p className="text-xs text-gray-500">แบรนด์: {item.brand}</p>
//                       <p className="text-primary font-bold">฿{item.price * item.quantity}</p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-2 rounded">–</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-2 rounded">+</button>
//                         <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-600 hover:underline text-xs">ลบ</button>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4 text-right">
//                 <p className="text-base font-semibold text-gray-700">รวมทั้งหมด: ฿{totalPrice}</p>
//                 <button onClick={handleCheckout} className="mt-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded">
//                   ชำระเงิน
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;
