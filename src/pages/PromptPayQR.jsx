import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PromptPayQR() {
  const [amount, setAmount] = useState(0);
  const promptpayID = '0954948835'; // เบอร์พร้อมเพย์ของร้าน
  const navigate = useNavigate();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('pending_order'));
    if (order) {
      setAmount(parseFloat(order.totalPrice || 0));
    }
  }, []);

  const handleGoToUpload = () => {
    navigate('/upload-slip');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded shadow text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">📲 ชำระผ่าน PromptPay</h2>

        <p className="text-gray-700 mb-2">
          ยอดที่ต้องชำระ: <strong>฿{amount}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-4">ชื่อบัญชี: CK Tool Mart</p>

        <img
          src={`https://promptpay.io/${promptpayID}/${amount}.png`}
          alt="PromptPay QR"
          className="mx-auto w-64 h-64 rounded shadow"
        />

        <p className="mt-4 text-sm text-gray-600">
          * กรุณาสแกน QR ด้วยแอปธนาคาร หรือแคปหน้าจอไปชำระเงิน
        </p>

        <div className="mt-6 text-left text-sm text-gray-500">
          <p className="font-semibold text-gray-700 mb-2">📌 หมายเหตุ:</p>
          <li className="text-red-700 text-center">
            หากสแกนไม่ผ่านจาก LINE หรือ Facebook แนะนำให้แคปหน้าจอ แล้วเปิดแอปธนาคารไปสแกนจากแกลเลอรี
          </li>
        </div>

        <button
          onClick={handleGoToUpload}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          📤 ฉันโอนแล้ว (แนบสลิป)
        </button>
      </div>
    </div>
  );
}

export default PromptPayQR;
