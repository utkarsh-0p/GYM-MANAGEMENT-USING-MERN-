import React from 'react';
import './About.css';

const About = () => {
  const trainers = [
    {
      name: 'John Smith',
      role: 'Head Trainer',
      expertise: ['Strength Training', 'Weight Loss', 'Sports Performance'],
      image: 'https://images.pexels.com/photos/4164512/pexels-photo-4164512.jpeg?auto=compress&cs=tinysrgb&w=600',
      certifications: ['NASM Certified Personal Trainer', 'CrossFit Level 3']
    },
    {
      name: 'Sarah Wilson',
      role: 'Yoga Instructor',
      expertise: ['Yoga', 'Pilates', 'Mindfulness'],
      image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600',
      certifications: ['RYT 500', 'Pilates Mat Certification']
    },
    {
      name: 'Mike Johnson',
      role: 'Group Fitness Specialist',
      expertise: ['HIIT', 'Cardio', 'Circuit Training'],
      image: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=600',
      certifications: ['ACE Group Fitness Instructor', 'TRX Certified']
    }
  ];

  const facilities = [
    {
      title: 'Modern Equipment',
      description: 'State-of-the-art cardio and strength training equipment from leading manufacturers.',
      image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Group Class Studios',
      description: 'Spacious studios equipped for various group fitness classes and training sessions.',
      image: 'https://images.pexels.com/photos/3984359/pexels-photo-3984359.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Locker Rooms',
      description: 'Clean and well-maintained locker rooms with showers and changing facilities.',
      image: 'https://images.pexels.com/photos/261039/pexels-photo-261039.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="about-hero-content">
          <h1>About Pulse Gym</h1>
          <p>Your journey to fitness starts here</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="history-content">
            <div className="history-text">
              <p>Founded in 2015, Pulse Gym has been at the forefront of fitness innovation and personal transformation. What started as a small local gym has grown into a comprehensive fitness center serving thousands of members.</p>
              <p>Our mission is to empower individuals to achieve their fitness goals through expert guidance, state-of-the-art facilities, and a supportive community environment.</p>
            </div>
            <div className="history-image">
              <img 
                src="https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Athlete showing dynamic movement at Pulse Gym" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="trainers-section">
        <div className="container">
          <h2>Our Expert Trainers</h2>
          <div className="trainers-grid">
            {trainers.map((trainer, index) => (
              <div key={index} className="trainer-card">
                <div className="trainer-image">
                  <img src={trainer.image} alt={trainer.name} />
                </div>
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p className="trainer-role">{trainer.role}</p>
                  <div className="trainer-expertise">
                    <h4>Expertise</h4>
                    <ul>
                      {trainer.expertise.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="trainer-certifications">
                    <h4>Certifications</h4>
                    <ul>
                      {trainer.certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <h2>Our Facilities</h2>
          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div key={index} className="facility-card">
                <div className="facility-image">
                  <img src={facility.image} alt={facility.title} />
                </div>
                <div className="facility-info">
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 