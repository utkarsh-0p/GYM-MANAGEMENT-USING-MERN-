import React from 'react';
import './ClassModal.css';

const ClassModal = ({ isOpen, onClose, classData, onEnroll }) => {
  if (!isOpen || !classData) return null;



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{classData.name}</h2>
          <button 
            onClick={onClose}
            className="close-button"
          >
            ✕
          </button>
        </div>
        
        <div className="class-info">
          <p className="class-description">{classData.description}</p>
          <div className="class-details">
            <p>Trainer: {classData.trainer}</p>
            <p>Time: {classData.schedule?.timeSlot || classData.time}</p>
            <p>Capacity: {classData.capacity}</p>
            <p>Day: {classData.schedule?.dayOfWeek || classData.day || 'Flexible'}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onEnroll} className="enroll-button">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
