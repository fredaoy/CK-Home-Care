import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  useEffect(() => {
    if (email) {
      localStorage.setItem(
        'email_verified_status',
        JSON.stringify({ email, verified: true })
      );
      setTimeout(() => {
        navigate('/checkout');
      }, 2500);
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        {email ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✅ ยืนยันอีเมลเรียบร้อยแล้ว
            </h2>
            <p className="text-gray-700">
              กำลังพากลับไปที่หน้ากรอกข้อมูลการจัดส่ง...
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ❌ ไม่สามารถยืนยันได้
            </h2>
            <p className="text-gray-600">ลิงก์ไม่ถูกต้องหรือข้อมูลหาย</p>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
