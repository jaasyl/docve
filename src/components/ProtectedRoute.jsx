import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Protects routes by checking if user has a valid token in localStorage
 * If no token exists, redirects to /login
 */
const ProtectedRoute = ({ children }) => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the protected component
    return children;
};

export default ProtectedRoute;
