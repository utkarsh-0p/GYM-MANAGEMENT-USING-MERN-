import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { 
  faFacebookF, 
  faInstagram, 
  faYoutube, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Footer.css';

// Prevent FontAwesome from dynamically adding its CSS
config.autoAddCss = false;

const Footer = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Pulse Gym</h3>
          <p>Transform your life through fitness and wellness.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://wa.me/7061740112" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>123 Fitness Street</li>
            <li>City, State 12345</li>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@pulsegym.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Opening Hours</h4>
          <ul className="opening-hours">
            <li>Monday - Friday: 6:00 AM - 10:00 PM</li>
            <li>Saturday: 7:00 AM - 8:00 PM</li>
            <li>Sunday: 8:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Pulse Gym. All rights reserved.</p>
          <div className="footer-auth-buttons">
            {isAuthenticated && user ? (
              <Link to="/my-account" className="footer-button">My Account</Link>
            ) : (
              <>
                <Link to="/login" className="footer-button">Login/Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 