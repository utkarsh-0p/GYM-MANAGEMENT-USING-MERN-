import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // We can reuse the same styles

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setSuccess('Password has been reset successfully');
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Password</h2>
        <p>Please enter your new password.</p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
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
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
