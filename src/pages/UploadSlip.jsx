import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UploadSlip() {
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name || !amount) return alert('กรุณากรอกข้อมูลให้ครบ');

        const formData = new FormData();
        formData.append('files', file);
        formData.append('log', true);
        formData.append('amount', amount);

        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:3001/api/check-slip',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const result = response.data;
            console.log('🧾 SlipOK Response:', result);

            if (result.success && result.data && result.data.success) {
                alert('✅ สลิปผ่านแล้ว');

                try {
                    await fetch("https://script.google.com/macros/s/AKfycbx8J6pxVigjZufdAADzW9VSg-NQ35_UaEnrqSOKSvUbEFcpUMDtGUQHHSa0gm-PR650DQ/exec", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name,
                            phone,
                            address,
                            email,
                            cartItems,
                            totalPrice: amount.toFixed(2)
                        }),
                        mode: "no-cors"
                    });

                    localStorage.removeItem('pending_order');
                    localStorage.removeItem('ck_cart');
                    window.location.href = '/thank-you';

                } catch (sendErr) {
                    console.error('❌ ส่งข้อมูลไป Google Sheet ไม่สำเร็จ', sendErr);
                    alert('⚠️ ตรวจสอบสลิปผ่าน แต่ส่งข้อมูลไม่สำเร็จ');
                }

            } else {
                alert('❌ ข้อมูลไม่ตรง กรุณาตรวจสอบสลิปอีกครั้ง');
            }

        } catch (err) {
            console.error('เกิดข้อผิดพลาด:', err);
            alert('❌ ไม่สามารถตรวจสอบสลิปได้');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">📤 อัปโหลดสลิปเพื่อยืนยันการโอน</h2>
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
                        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full" required />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >
                        {loading ? '⏳ กำลังตรวจสอบ...' : '✅ ส่งตรวจสอบสลิป'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadSlip;