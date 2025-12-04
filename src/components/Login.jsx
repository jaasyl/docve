import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // User is already logged in, redirect to dashboard
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    // Validate form inputs
    const validateForm = () => {
        const errors = {};

        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setError('');
        setValidationErrors({});

        // Validate inputs
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Call authService login
            const response = await authService.login(username, password);

            // Check if login was successful
            if (response && response.token) {
                setSuccess(true);

                // Redirect to dashboard after a brief success animation
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            // Handle API errors
            if (err.response) {
                // Server responded with error
                const status = err.response.status;
                const message = err.response.data?.message || err.response.data?.error;

                if (status === 401) {
                    setError('Invalid username or password');
                } else if (status === 400) {
                    setError(message || 'Invalid request. Please check your input.');
                } else if (status === 500) {
                    setError('Server error. Please try again later.');
                } else {
                    setError(message || 'An error occurred. Please try again.');
                }
            } else if (err.request) {
                // Request made but no response
                setError('Unable to connect to server. Please check your internet connection.');
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes and clear errors
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (validationErrors.username) {
            setValidationErrors({ ...validationErrors, username: '' });
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (validationErrors.password) {
            setValidationErrors({ ...validationErrors, password: '' });
        }
    };

    return (
        <div className="login-container">
            <div className={`login-card ${success ? 'success-state' : ''}`}>
                <div className="login-header">
                    <div className="login-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue to your dashboard</p>
                </div>

                {success && (
                    <div className="success-message">
                        <svg className="success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Login successful! Redirecting...</span>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <svg className="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={validationErrors.username ? 'error' : ''}
                                placeholder="Enter your username"
                                disabled={loading || success}
                                autoComplete="username"
                            />
                        </div>
                        {validationErrors.username && (
                            <span className="validation-error">{validationErrors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={validationErrors.password ? 'error' : ''}
                                placeholder="Enter your password"
                                disabled={loading || success}
                                autoComplete="current-password"
                            />
                        </div>
                        {validationErrors.password && (
                            <span className="validation-error">{validationErrors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`login-button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
                        disabled={loading || success}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Logging in...</span>
                            </>
                        ) : success ? (
                            <>
                                <svg className="button-success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Success!</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
