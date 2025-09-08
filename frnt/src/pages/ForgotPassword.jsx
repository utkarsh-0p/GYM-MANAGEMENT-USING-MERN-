import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setSuccess('Password reset instructions have been sent to your email address');
      setEmail('');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {error && <div className="error-message">{error}</div>}
          </div>

          {success && <div className="success-message">{success}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <Link to="/login" className="back-to-login">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword; 