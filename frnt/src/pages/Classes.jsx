import React, { useState, useEffect } from 'react';
import ClassModal from '../components/ClassModal';
import EnrollmentForm from '../components/EnrollmentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Classes.css';

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes');
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <div className="classes-loading">Loading classes...</div>;
  }

  if (error) {
    return <div className="classes-error">{error}</div>;
  }

  const displayClasses = classes.length > 0 ? classes : [
    {
      _id: '65f9a1234b5f1234567890ab',
      name: 'Spin Class',
      trainer: 'Emma Davis',
      time: '7:00 PM - 8:00 PM',
      capacity: '18 people',
      description: 'High-energy indoor cycling class with intervals and resistance training.',
      image: 'https://images.pexels.com/photos/4162435/pexels-photo-4162435.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '65f9a1234b5f1234567890ac',
      name: 'Yoga Flow',
      trainer: 'Sarah Wilson',
      time: '8:00 AM - 9:00 AM',
      capacity: '15 people',
      description: 'Dynamic yoga sequences that improve flexibility, strength, and mental clarity.',
      image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '65f9a1234b5f1234567890ad',
      name: 'HIIT Training',
      trainer: 'Mike Johnson',
      time: '6:00 AM - 7:00 AM',
      capacity: '20 people',
      description: 'High-intensity interval training that combines cardio and strength exercises.',
      image: 'https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '65f9a1234b5f1234567890ae',
      name: 'Strength & Conditioning',
      trainer: 'John Smith',
      time: '5:00 PM - 6:00 PM',
      capacity: '12 people',
      description: 'Comprehensive strength training program focusing on proper form and progressive overload.',
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="classes">
      <div className="classes-hero" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="classes-hero-content">
          <h1>Our Classes</h1>
          <p>Find the perfect class to achieve your fitness goals</p>
        </div>
      </div>

      <div className="classes-content">
        <div className="classes-grid">
          {displayClasses.map((classItem) => (
            <div 
              key={classItem._id} 
              className="class-card"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${classItem.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3>{classItem.name}</h3>
              <p className="class-description">{classItem.description}</p>
              <div className="class-info">
                <p>
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  {classItem.trainer}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  {`${classItem.schedule.dayOfWeek} ${classItem.schedule.timeSlot}`}
                </p>
                <p>
                  <FontAwesomeIcon icon={faUsers} className="icon" />
                  {`${classItem.capacity} people`}
                </p>
              </div>
              <button 
                className="enroll-btn" 
                onClick={() => {
                  setSelectedClass(classItem);
                  setIsModalOpen(true);
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
      <ClassModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onEnroll={() => {
          setIsModalOpen(false);
          setShowEnrollmentForm(true);
        }}
      />
      {showEnrollmentForm && selectedClass && (
        <EnrollmentForm
          classId={selectedClass._id}
          onSuccess={() => {
            setShowEnrollmentForm(false);
            setSelectedClass(null);
          }}
          onClose={() => setShowEnrollmentForm(false)}
        />
      )}
    </div>
  );
};

export default Classes; 