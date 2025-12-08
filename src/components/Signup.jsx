import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/usersApi';
import './signup.css';

export default function Signup() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    /**
     * Handle input change
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear general error
        if (error) {
            setError('');
        }
    };

    /**
     * Validate form data
     */
    const validateForm = () => {
        const errors = {};

        // Username validation
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        } else if (formData.username.length > 50) {
            errors.username = 'Username must be less than 50 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (formData.password.length > 100) {
            errors.password = 'Password must be less than 100 characters';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Create user data object
            const userData = {
                username: formData.username.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                role: 'EndUser', // Fixed role for signup
            };

            // Call API to create user
            const response = await createUser(userData);

            // Success
            setSuccess(true);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // Navigate to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Signup error:', err);

            // Handle different error types
            if (err.response) {
                // Server responded with error
                const errorMessage = err.response.data?.message
                    || err.response.data?.error
                    || 'Registration failed. Please try again.';
                setError(errorMessage);

                // Handle specific validation errors from backend
                if (err.response.data?.errors) {
                    setValidationErrors(err.response.data.errors);
                }
            } else if (err.request) {
                // Request made but no response
                setError('Unable to connect to server. Please check your internet connection.');
            } else {
                // Other errors
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Navigate to login page
     */
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Header */}
                <div className="signup-header">
                    <div className="signup-icon">
                        <span className="material-symbols-outlined">person_add</span>
                    </div>
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Sign up to get started with Docve</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="success-banner">
                        <span className="material-symbols-outlined">check_circle</span>
                        <div>
                            <strong>Account created successfully!</strong>
                            <p>Redirecting to login page...</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="error-banner">
                        <span className="material-symbols-outlined">error</span>
                        <div>
                            <strong>Registration Failed</strong>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {/* Signup Form */}
                <form className="signup-form" onSubmit={handleSubmit} noValidate>
                    {/* Username Field */}
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">person</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={`form-input ${validationErrors.username ? 'error' : ''}`}
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={loading || success}
                                autoComplete="username"
                            />
                        </div>
                        {validationErrors.username && (
                            <span className="error-text">{validationErrors.username}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">email</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading || success}
                                autoComplete="email"
                            />
                        </div>
                        {validationErrors.email && (
                            <span className="error-text">{validationErrors.email}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">lock</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-input ${validationErrors.password ? 'error' : ''}`}
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading || success}
                                autoComplete="new-password"
                            />
                        </div>
                        {validationErrors.password && (
                            <span className="error-text">{validationErrors.password}</span>
                        )}
                        <span className="help-text">Must be at least 6 characters</span>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password <span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined input-icon">lock_check</span>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading || success}
                                autoComplete="new-password"
                            />
                        </div>
                        {validationErrors.confirmPassword && (
                            <span className="error-text">{validationErrors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading || success}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Creating Account...
                            </>
                        ) : success ? (
                            <>
                                <span className="material-symbols-outlined">check</span>
                                Account Created
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">person_add</span>
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="signup-footer">
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleLoginClick}
                            disabled={loading}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
