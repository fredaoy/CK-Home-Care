import React, { useEffect, useState } from 'react';

function UploadSlip() {
  const [file, setFile] = useState(null);
  const [slipBase64, setSlipBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pending_order"));
    if (stored) {
      setName(stored.name);
      setEmail(stored.email);
      setPhone(stored.phone);
      setAddress(stored.address);
      setAmount(parseFloat(stored.totalPrice));
      setCartItems(stored.cartItems);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSlipBase64(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !amount) return alert('กรุณากรอกข้อมูลให้ครบ');

    try {
      setLoading(true);

      const orderId = `order_${Date.now()}`;

      // ✅ ส่งข้อมูลเข้า Google Sheet
      await fetch("https://script.google.com/macros/s/AKfycbx8J6pxVigjZufdAADzW9VSg-NQ35_UaEnrqSOKSvUbEFcpUMDtGUQHHSa0gm-PR650DQ/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          email,
          cartItems,
          totalPrice: amount.toFixed(2),
          orderId,
          date: new Date().toISOString(), // เพิ่ม timestamp (ถ้ารองรับ)
        }),
        mode: "no-cors"
      });

      // ✅ เก็บสลิปไว้ใน localStorage
      localStorage.setItem(`slip_${orderId}`, slipBase64);

      // ✅ ล้างข้อมูล
      localStorage.removeItem('pending_order');
      localStorage.removeItem('ck_cart');

      window.location.href = '/thank-you';

    } catch (err) {
      console.error("❌ ส่งข้อมูลล้มเหลว:", err);
      alert("ไม่สามารถส่งข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">📤 อัปโหลดสลิป (จำลอง)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">ชื่อผู้โอน</label>
            <input type="text" value={name} disabled className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500" />
          </div>
          <div>
            <label className="block font-medium">ยอดที่โอน (บาท)</label>
            <input
              type="number"
              value={amount.toFixed(2)}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block font-medium">แนบรูปสลิป</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
            {slipBase64 && (
              <img src={slipBase64} alt="preview" className="w-32 h-auto mt-2 rounded border" />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {loading ? '⏳ กำลังส่ง...' : '✅ ส่งข้อมูล'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadSlip;






// import React, { useEffect, useState } from 'react';

// function UploadSlip() {
//   const [file, setFile] = useState(null);
//   const [slipBase64, setSlipBase64] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("pending_order"));
//     if (stored) {
//       setName(stored.name);
//       setEmail(stored.email);
//       setPhone(stored.phone);
//       setAddress(stored.address);
//       setAmount(parseFloat(stored.totalPrice));
//       setCartItems(stored.cartItems);
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSlipBase64(reader.result);
//     };
//     if (selectedFile) {
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !name || !amount) return alert('กรุณากรอกข้อมูลให้ครบ');

//     try {
//       setLoading(true);

//       const orderId = `order_${Date.now()}`;

//       // ✅ ส่งข้อมูลไป Google Sheet (ไม่ส่ง slip)
//       await fetch("https://script.google.com/macros/s/AKfycbx8J6pxVigjZufdAADzW9VSg-NQ35_UaEnrqSOKSvUbEFcpUMDtGUQHHSa0gm-PR650DQ/exec", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           phone,
//           address,
//           email,
//           cartItems,
//           totalPrice: amount.toFixed(2),
//           orderId
//         }),
//         mode: "no-cors"
//       });

//       // ✅ เก็บสลิปเฉพาะใน localStorage
//       localStorage.setItem(`slip_${orderId}`, slipBase64);

//       // ✅ ล้างข้อมูล
//       localStorage.removeItem('pending_order');
//       localStorage.removeItem('ck_cart');
//       window.location.href = '/thank-you';

//     } catch (err) {
//       console.error("❌ ส่งข้อมูลล้มเหลว:", err);
//       alert("ไม่สามารถส่งข้อมูลได้");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-bold mb-4">📤 อัปโหลดสลิปเพื่อยืนยันการโอน</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium">ชื่อผู้โอน</label>
//             <input type="text" value={name} disabled className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500" />
//           </div>
//           <div>
//             <label className="block font-medium">ยอดที่โอน (บาท)</label>
//             <input
//               type="number"
//               value={amount.toFixed(2)}
//               disabled
//               className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">แนบรูปสลิป</label>
//             <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
//             {slipBase64 && (
//               <img src={slipBase64} alt="preview" className="w-32 h-auto mt-2 rounded border" />
//             )}
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
//           >
//             {loading ? '⏳ กำลังส่ง...' : '✅ ส่งข้อมูล'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UploadSlip;
