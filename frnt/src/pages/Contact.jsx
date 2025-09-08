import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { contactService } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactService.submitContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            {submitStatus === 'success' && (
              <div className="form-message success">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="form-message error">
                Something went wrong. Please try again later.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                  placeholder="Enter message subject"
                />
                {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? 'error' : ''}
                  placeholder="Your message"
                  rows="5"
                />
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          <div className="contact-info-container">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                <h3>Our Location</h3>
                <p>123 Fitness Street</p>
                <p>Surat, Gujarat 395001</p>
                <p>India</p>
              </div>

              <div className="info-item">
                <FontAwesomeIcon icon={faPhone} className="info-icon" />
                <h3>Phone Numbers</h3>
                <p>+91 123 456 7890</p>
                <p>+91 987 654 3210</p>
              </div>

              <div className="info-item">
                <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                <h3>Email Address</h3>
                <p>info@pulsegym.com</p>
                <p>support@pulsegym.com</p>
              </div>

              <div className="info-item">
                <FontAwesomeIcon icon={faClock} className="info-icon" />
                <h3>Opening Hours</h3>
                <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                <p>Saturday: 7:00 AM - 8:00 PM</p>
                <p>Sunday: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29518.52852948371!2d70.7987144!3d22.360572949999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c972761ce515%3A0x3651e3fe1e9df4f8!2z4KSu4KS-4KSw4KS14KS-4KWc4KWAIOCkr-ClgeCkqOCkv-CkteCksOCljeCkuOCkv-Ckn-ClgA!5e0!3m2!1shi!2sin!4v1742922170952!5m2!1shi!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pulse Gym Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 