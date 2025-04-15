import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 👁 state เปิด/ปิดตา
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            sessionStorage.setItem('adminAuth', 'true');
            navigate('/admin');
        } else {
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    {/* ช่องรหัสผ่าน + ปุ่มเปิดตา */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 pr-10 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                        >
                            {showPassword ? '🙈' : '👁'}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>
            </div>
        </div>
    );
}
