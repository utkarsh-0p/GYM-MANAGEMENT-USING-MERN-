import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './EnrollmentForm.css';

const EnrollmentForm = ({ classId, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    healthConditions: '',
    preferredSchedule: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to enroll in classes');
      return;
    }

    // Validate classId
    if (!classId) {
      toast.error('Invalid class selection');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          classId: classId, // Using the MongoDB ObjectId
          ...formData
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          localStorage.removeItem('token');
          toast.error('Your session has expired. Please log in again.');
          return;
        }
        throw new Error(data.message || 'Failed to enroll');
      }

      toast.success('Successfully enrolled in class!');
      onSuccess?.(data);
      onClose?.();
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.message || 'Failed to enroll in class');
    }
  };

  return (
    <div className="enrollment-form-container">
      <form onSubmit={handleSubmit} className="enrollment-form">
        <div className="form-header">
          <button type="button" className="back-btn" onClick={onClose}>
            ← Back
          </button>
          <h2>Class Enrollment Form</h2>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact Number</label>
          <input
            type="tel"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="healthConditions">Health Conditions/Concerns</label>
          <textarea
            id="healthConditions"
            name="healthConditions"
            value={formData.healthConditions}
            onChange={handleChange}
            placeholder="Please list any health conditions or concerns..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferredSchedule">Preferred Schedule *</label>
          <select
            id="preferredSchedule"
            name="preferredSchedule"
            value={formData.preferredSchedule}
            onChange={handleChange}
            required
          >
            <option value="">Select a schedule</option>
            <option value="morning">Morning (6 AM - 10 AM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (5 PM - 9 PM)</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit Enrollment
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
