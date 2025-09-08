import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCalendarAlt, 
  faDumbbell, 
  faChartLine,
  faEdit,
  faSignOutAlt,
  faCalculator,
  faWeight,
  faRuler
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './MyAccount.css';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [bmiData, setBmiData] = useState({
    height: '',
    weight: '',
    bmi: null,
    category: ''
  });
  const { user, logout } = useAuth();

  const calculateBMI = () => {
    if (bmiData.height && bmiData.weight) {
      const heightInMeters = bmiData.height / 100;
      const bmi = (bmiData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setBmiData(prev => ({
        ...prev,
        bmi,
        category
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBmiData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-image">
                <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?w=150&h=150&fit=crop" alt={user?.name} />
                
              </div>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p className="email">{user?.email}</p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <FontAwesomeIcon icon={faDumbbell} />
                    <span>{user?.stats?.workoutsCompleted || 10} Workouts</span>
                  </div>
                  <div className="stat-card">
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>{user?.stats?.averageRating || 4.5} Rating</span>
                  </div>
                  <div className="stat-card">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{user?.stats?.totalHours || 48} Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'membership':
        return (
          <div className="membership-content">
            <div className="membership-card">
              <h3>Membership Details</h3>
              <div className="membership-info">
                <div className="info-item">
                  <span className="label">Membership Type:</span>
                  <span className="value">{user?.membershipType || 'Basic'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Join Date:</span>
                  <span className="value">{user?.joinDate || '1/4/2025'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Next Payment:</span>
                  <span className="value">{user?.nextPayment || '₹1500'}</span>
                </div>
              </div>
             
            </div>
          </div>
        );
      case 'workouts':
        const sampleWorkouts = [
          {
            id: 1,
            date: '2025-04-15',
            type: 'Strength Training',
            duration: '45 mins',
            calories: 320,
            rating: 4.5
          },
          {
            id: 2, 
            date: '2025-04-13',
            type: 'Cardio',
            duration: '30 mins', 
            calories: 250,
            rating: 4.0
          },
          {
            id: 3,
            date: '2025-04-10',
            type: 'Yoga',
            duration: '60 mins',
            calories: 180,
            rating: 5.0
          }
        ];

        return (
          <div className="workouts-content">
            <h3>Recent Workouts</h3>
            <div className="workouts-list">
              {(user?.recentWorkouts || sampleWorkouts).map(workout => (
                <div key={workout.id} className="workout-card">
                  <div className="workout-date">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{workout.date}</span>
                  </div>
                  <div className="workout-details">
                    <h4>{workout.type}</h4>
                    <div className="workout-stats">
                      <span>Duration: {workout.duration}</span>
                      <span>Calories: {workout.calories}</span>
                      <span>Rating: {workout.rating}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'bmi':
        return (
          <div className="bmi-content">
            <h3>BMI Calculator</h3>
            <div className="bmi-calculator">
              <div className="bmi-inputs">
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faRuler} />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={bmiData.height}
                    onChange={handleInputChange}
                    placeholder="Enter height"
                  />
                </div>
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faWeight} />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={bmiData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter weight"
                  />
                </div>
                <button className="calculate-btn" onClick={calculateBMI}>
                  Calculate BMI
                </button>
              </div>
              {bmiData.bmi && (
                <div className="bmi-result">
                  <h4>Your BMI: {bmiData.bmi}</h4>
                  <p>Category: {bmiData.category}</p>
                  <div className="bmi-categories">
                    <p>Underweight: &lt; 18.5</p>
                    <p>Normal weight: 18.5 - 24.9</p>
                    <p>Overweight: 25 - 29.9</p>
                    <p>Obese: ≥ 30</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-account">
      <div className="account-container">
        <div className="sidebar">
          <div className="user-card">
            <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?w=150&h=150&fit=crop" alt={user?.name} />
            <h3>{user?.name}</h3>
            <p>{user?.membershipType || 'Basic'} Member</p>
          </div>
          <nav className="account-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'membership' ? 'active' : ''}`}
              onClick={() => setActiveTab('membership')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Membership</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'workouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('workouts')}
            >
              <FontAwesomeIcon icon={faDumbbell} />
              <span>Workouts</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'bmi' ? 'active' : ''}`}
              onClick={() => setActiveTab('bmi')}
            >
              <FontAwesomeIcon icon={faCalculator} />
              <span>BMI Calculator</span>
            </button>
            <button className="nav-item logout" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
        <div className="main-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MyAccount; 