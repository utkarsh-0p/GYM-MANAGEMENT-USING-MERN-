import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    if (isAuthenticated && user) {
      navigate('/my-account');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Pulse Gym
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/classes" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              CLASSES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              SCHEDULE
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            ABOUT
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/" 
              className="nav-link" 
              onClick={(e) => {
                setIsMenuOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              SERVICES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </Link>
          </li>
          
        
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="profile-menu">
              <div className="nav-profile" onClick={handleProfileClick} title={user?.name || 'My Account'}>
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
              </div>
              <button className="logout-button desktop-only" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-profile" onClick={handleProfileClick} title="Login">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 