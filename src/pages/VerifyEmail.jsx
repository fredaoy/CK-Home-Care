import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (email) {
      // บันทึกสถานะยืนยันอีเมลไว้ใน localStorage
      localStorage.setItem(`email_verified_${email}`, 'true');
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-8 rounded-lg max-w-md w-full text-center">
        {status === 'loading' && <p>กำลังตรวจสอบ...</p>}

        {status === 'success' && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">✅ ยืนยันอีเมลเรียบร้อยแล้ว!</h2>
            <p className="text-gray-700 mb-6">คุณสามารถกลับไปสั่งซื้อสินค้าต่อได้เลย</p>
            <Link
              to="/checkout"
              className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              กลับไปหน้าชำระเงิน
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">❌ ลิงก์ไม่ถูกต้อง</h2>
            <p className="text-gray-700 mb-6">ไม่พบอีเมลในลิงก์ กรุณากลับไปหน้า Checkout เพื่อขอลิงก์ใหม่</p>
            <Link
              to="/checkout"
              className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded"
            >
              กลับไป
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
