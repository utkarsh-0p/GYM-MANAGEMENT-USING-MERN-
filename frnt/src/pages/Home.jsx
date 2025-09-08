import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDumbbell, 
  faHeartPulse, 
  faPersonRunning, 
  faUsers,
  faStar,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Train Like A Warrior',
      subtitle: 'High-Intensity Training',
      description: 'Push your limits with our intensive workout programs and expert trainers',
      buttonText: 'Start Training',
      buttonIcon: '→'
    },
    {
      url: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Strength & Power',
      subtitle: 'Professional Weight Training',
      description: 'Build strength and muscle with our comprehensive weight training programs',
      buttonText: 'Start Lifting',
      buttonIcon: '→'
    },
    {
      url: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg',
      title: 'Modern Equipment',
      subtitle: 'Premium Facilities',
      description: 'Access to cutting-edge fitness technology and equipment for the best workout experience',
      buttonText: 'Explore Facilities',
      buttonIcon: '→'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: 1,
      icon: faDumbbell,
      title: 'Strength Training',
      description: 'Build muscle and increase strength with our state-of-the-art equipment and expert trainers.'
    },
    {
      id: 2,
      icon: faHeartPulse,
      title: 'Cardio Classes',
      description: 'Boost your endurance and burn calories with our high-energy cardio sessions.'
    },
    {
      id: 3,
      icon: faPersonRunning,
      title: 'Personal Training',
      description: 'Get personalized workout plans and one-on-one guidance from certified trainers.'
    },
    {
      id: 4,
      icon: faUsers,
      title: 'Group Classes',
      description: 'Join our motivating group sessions for a fun and effective workout experience.'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Member since 2022',
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?w=150&h=150&fit=crop',
      text: "Joining Pulse Gym was the best decision I made for my fitness journey. The trainers are exceptional and the community is so supportive!",
      rating: 5
    },
    {
      id: 2,
      name: 'Mike Thompson',
      role: 'Member since 2021',
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?w=150&h=150&fit=crop',
      text: "The facilities are top-notch and the variety of classes keeps me motivated. I have seen amazing results in just a few months!",
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Member since 2023',
      image: 'https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?w=150&h=150&fit=crop',
      text: "The personal training program here is incredible. My trainer understands my goals and pushes me to achieve them.",
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section with Carousel */}
      <section className="hero">
        <div className="carousel">
          {carouselImages.map((image, index) => (
            <div 
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="carousel-overlay"></div>
              <div className="carousel-content">
                <div className="carousel-text">
                  <span className="carousel-subtitle">{image.subtitle}</span>
                  <h1>{image.title}</h1>
                  <p>{image.description}</p>
                  <div className="carousel-buttons">
                    <Link to="/signup" className="carousel-cta-button">
                      <span className="button-text">{image.buttonText}</span>
                      <span className="button-icon">{image.buttonIcon}</span>
                    </Link>
                    <a href="#services" className="carousel-secondary-button">
                      <span className="button-text">Discover More</span>
                      <span className="button-icon">→</span>
                    </a>
                  </div>
                </div>
                <div className="carousel-progress">
                  <div className="progress-bar" style={{ width: `${((currentSlide + 1) / carouselImages.length) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
          <div className="carousel-navigation">
            <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div className="carousel-dots">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive fitness solutions for every goal</p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <FontAwesomeIcon icon={service.icon} className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/classes" className="service-link">
                Explore More
                <span className="arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>What our members say about us</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="star" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="testimonial-content">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <p>{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join Pulse Gym today and transform your life with our expert guidance</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 