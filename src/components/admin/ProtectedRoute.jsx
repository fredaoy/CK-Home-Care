import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem('adminAuth') === 'true';
    return isAuthenticated ? children : <Navigate to="/admin/login" />;
}
