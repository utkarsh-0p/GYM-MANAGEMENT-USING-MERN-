import React from 'react';
import { Link } from 'react-router-dom';
import './VideoBanner.css';

const VideoBanner = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="video-banner">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="banner-video"
      >
        <source src="/videos/gym-background.mp4" type="video/mp4" />
      </video>
      
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>Transform Your Life</h1>
          <p>Join Pulse Gym and start your fitness journey today</p>
          <div className="banner-buttons">
            <Link to="/signup" className="join-now-btn">
              Join Now
            </Link>
            <button onClick={scrollToServices} className="learn-more-btn">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner; 