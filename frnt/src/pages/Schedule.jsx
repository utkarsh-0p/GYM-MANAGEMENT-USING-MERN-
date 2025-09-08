import React, { useState, useEffect } from 'react';
import './Schedule.css';
import ClassModal from '../components/ClassModal';
import EnrollmentForm from '../components/EnrollmentForm';
import { classService } from '../services/api';
import { toast } from 'react-toastify';

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    trainer: 'all',
    dayOfWeek: 'all',
    timeSlot: 'all'
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/classes');
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollment = async (classData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to enroll in classes');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          classId: classData._id
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to enroll');
      }

      toast.success('Successfully enrolled in class!');
      setIsModalOpen(false);
      fetchClasses(); // Refresh class list
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.message || 'Failed to enroll in class');
    }
  };

  const daysOfWeek = [
    'All Days',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const timeSlots = [
    'All Time Slots',
    'Morning (6AM - 12PM)',
    'Afternoon (12PM - 5PM)',
    'Evening (5PM - 10PM)'
  ];

  // Get unique class types from the classes data
  const classTypes = [
    'All Types',
    ...new Set(classes.map(cls => cls.type))
  ];

  const trainers = [
    'All Trainers',
    ...new Set(classes.map(cls => cls.trainer))
  ];

  const organizedClasses = classes.length > 0 ? daysOfWeek.slice(1).map(day => {
    const dayClasses = classes.filter(cls => cls.schedule?.dayOfWeek === day);
    return {
      day,
      classes: dayClasses
    };
  }) : [];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Backup static data in case API fails
  const staticClassData = [{
      day: 'Monday',
      classes: [
        {
          time: '6:00 AM - 7:00 AM',
          name: 'HIIT Training',
          trainer: 'Mike Johnson',
          capacity: '15/20',
          type: 'HIIT Training'
        },
        {
          time: '8:00 AM - 9:00 AM',
          name: 'Yoga Flow',
          trainer: 'Sarah Wilson',
          capacity: '12/15',
          type: 'Yoga Flow'
        },
        {
          time: '10:00 AM - 11:00 AM',
          name: 'Strength & Conditioning',
          trainer: 'John Smith',
          capacity: '8/12',
          type: 'Strength & Conditioning'
        },
        {
          time: '5:00 PM - 6:00 PM',
          name: 'Boxing',
          trainer: 'Emma Davis',
          capacity: '10/12',
          type: 'Boxing'
        },
        {
          time: '7:00 PM - 8:00 PM',
          name: 'Pilates',
          trainer: 'Sarah Wilson',
          capacity: '10/15',
          type: 'Pilates'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          time: '7:00 AM - 8:00 AM',
          name: 'Spin Class',
          trainer: 'Emma Davis',
          capacity: '12/18',
          type: 'Spin Class'
        },
        {
          time: '9:00 AM - 10:00 AM',
          name: 'Pilates',
          trainer: 'Sarah Wilson',
          capacity: '10/15',
          type: 'Pilates'
        },
        {
          time: '4:00 PM - 5:00 PM',
          name: 'HIIT Training',
          trainer: 'Mike Johnson',
          capacity: '15/20',
          type: 'HIIT Training'
        },
        {
          time: '6:00 PM - 7:00 PM',
          name: 'Boxing',
          trainer: 'Mike Johnson',
          capacity: '8/10',
          type: 'Boxing'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        {
          time: '6:00 AM - 7:00 AM',
          name: 'Strength & Conditioning',
          trainer: 'John Smith',
          capacity: '8/12',
          type: 'Strength & Conditioning'
        },
        {
          time: '8:00 AM - 9:00 AM',
          name: 'Yoga Flow',
          trainer: 'Sarah Wilson',
          capacity: '12/15',
          type: 'Yoga Flow'
        },
        {
          time: '5:00 PM - 6:00 PM',
          name: 'Spin Class',
          trainer: 'Emma Davis',
          capacity: '12/18',
          type: 'Spin Class'
        },
        {
          time: '7:00 PM - 8:00 PM',
          name: 'HIIT Training',
          trainer: 'Mike Johnson',
          capacity: '15/20',
          type: 'HIIT Training'
        }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        {
          time: '7:00 AM - 8:00 AM',
          name: 'Boxing',
          trainer: 'Mike Johnson',
          capacity: '8/10',
          type: 'Boxing'
        },
        {
          time: '9:00 AM - 10:00 AM',
          name: 'Pilates',
          trainer: 'Sarah Wilson',
          capacity: '10/15',
          type: 'Pilates'
        },
        {
          time: '4:00 PM - 5:00 PM',
          name: 'Strength & Conditioning',
          trainer: 'John Smith',
          capacity: '8/12',
          type: 'Strength & Conditioning'
        },
        {
          time: '6:00 PM - 7:00 PM',
          name: 'Spin Class',
          trainer: 'Emma Davis',
          capacity: '12/18',
          type: 'Spin Class'
        }
      ]
    },
    {
      day: 'Friday',
      classes: [
        {
          time: '6:00 AM - 7:00 AM',
          name: 'HIIT Training',
          trainer: 'Mike Johnson',
          capacity: '15/20',
          type: 'HIIT Training'
        },
        {
          time: '8:00 AM - 9:00 AM',
          name: 'Yoga Flow',
          trainer: 'Sarah Wilson',
          capacity: '12/15',
          type: 'Yoga Flow'
        },
        {
          time: '5:00 PM - 6:00 PM',
          name: 'Boxing',
          trainer: 'Mike Johnson',
          capacity: '8/10',
          type: 'Boxing'
        },
        {
          time: '7:00 PM - 8:00 PM',
          name: 'Strength & Conditioning',
          trainer: 'John Smith',
          capacity: '8/12',
          type: 'Strength & Conditioning'
        }
      ]
    },
    {
      day: 'Saturday',
      classes: [
        {
          time: '8:00 AM - 9:00 AM',
          name: 'Yoga Flow',
          trainer: 'Sarah Wilson',
          capacity: '12/15',
          type: 'Yoga Flow'
        },
        {
          time: '10:00 AM - 11:00 AM',
          name: 'Pilates',
          trainer: 'Sarah Wilson',
          capacity: '10/15',
          type: 'Pilates'
        },
        {
          time: '4:00 PM - 5:00 PM',
          name: 'Spin Class',
          trainer: 'Emma Davis',
          capacity: '12/18',
          type: 'Spin Class'
        },
        {
          time: '6:00 PM - 7:00 PM',
          name: 'HIIT Training',
          trainer: 'Mike Johnson',
          capacity: '15/20',
          type: 'HIIT Training'
        }
      ]
    },
    {
      day: 'Sunday',
      classes: [
        {
          time: '9:00 AM - 10:00 AM',
          name: 'Yoga Flow',
          trainer: 'Sarah Wilson',
          capacity: '12/15',
          type: 'Yoga Flow'
        },
        {
          time: '11:00 AM - 12:00 PM',
          name: 'Pilates',
          trainer: 'Sarah Wilson',
          capacity: '10/15',
          type: 'Pilates'
        },
        {
          time: '4:00 PM - 5:00 PM',
          name: 'Strength & Conditioning',
          trainer: 'John Smith',
          capacity: '8/12',
          type: 'Strength & Conditioning'
        }
      ]
    }
  ];


  const getTimeSlot = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'Morning (6AM - 12PM)';
    if (hour >= 12 && hour < 17) return 'Afternoon (12PM - 5PM)';
    return 'Evening (5PM - 10PM)';
  };

  const filteredSchedule = organizedClasses.map(day => ({
    ...day,
    classes: day.classes.filter(cls => {
      const typeMatch = selectedFilters.classType === 'all' || selectedFilters.classType === 'All Types' || cls.type === selectedFilters.classType;
      const trainerMatch = selectedFilters.trainer === 'all' || selectedFilters.trainer === 'All Trainers' || cls.trainer === selectedFilters.trainer;
      const dayMatch = selectedFilters.dayOfWeek === 'all' || selectedFilters.dayOfWeek === 'All Days' || cls.schedule.dayOfWeek === selectedFilters.dayOfWeek;
      const timeMatch = selectedFilters.timeSlot === 'all' || selectedFilters.timeSlot === 'All Time Slots' || getTimeSlot(cls.schedule.timeSlot) === selectedFilters.timeSlot;
      return trainerMatch && dayMatch && timeMatch && typeMatch;
    })
  }));

  // Only use the filtered schedule, remove static data fallback
  const displayClasses = filteredSchedule;

  return (
    <div className="schedule">
      <section className="schedule-hero">
        <div className="schedule-hero-content">
          <h1>Class Schedule</h1>
          <p>Find and book your next workout session</p>
        </div>
      </section>

      <section className="schedule-content">
        <div className="container">
          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <label>Trainer:</label>
              <select
                value={selectedFilters.trainer}
                onChange={(e) => handleFilterChange('trainer', e.target.value)}
              >
                {trainers.map((trainer, index) => (
                  <option key={index} value={trainer}>{trainer}</option>
                ))}
              </select>
            </div>


            <div className="filter-group">
              <label>Time Slot:</label>
              <select
                value={selectedFilters.timeSlot}
                onChange={(e) => handleFilterChange('timeSlot', e.target.value)}
              >
                <option value="all">All Time Slots</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading classes...</div>
          ) : (
            <div className="schedule-table">
              {displayClasses.map((day, index) => (
                <div key={index} className="day-schedule">
                  <h2>{day.day}</h2>
                  <div className="classes-list">
                    {day.classes.length > 0 ? (
                      day.classes.map((cls, idx) => (
                        <div key={cls._id || idx} className="class-item">
                          <div className="class-time">{cls.schedule?.timeSlot || cls.time}</div>
                          <div className="class-details">
                            <h3>{cls.name}</h3>
                            <p>Trainer: {cls.trainer}</p>
                            <p>Capacity: {cls.enrolledUsers ? `${cls.enrolledUsers.length}/${cls.capacity}` : cls.capacity}</p>
                            {cls.description && <p>{cls.description}</p>}
                          </div>
                          <button 
                            className="enroll-btn" 
                            onClick={() => {
                              setSelectedClass(cls);
                              setIsModalOpen(true);
                            }}
                            disabled={cls.enrolledUsers ? cls.enrolledUsers.length >= cls.capacity : false}
                          >
                            {cls.enrolledUsers && cls.enrolledUsers.length >= cls.capacity ? 'Full' : 'Enroll'}
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="no-classes">No classes match your filters</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <ClassModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onEnroll={() => {
          if (!selectedClass) return;
          setIsModalOpen(false);
          setShowEnrollmentForm(true);
        }}
      />
      {showEnrollmentForm && selectedClass && (
        <div className="enrollment-modal-overlay">
          <EnrollmentForm
            classId={selectedClass._id}
            onSuccess={() => {
              setShowEnrollmentForm(false);
              setSelectedClass(null);
              fetchClasses(); // Refresh the classes list
              toast.success('Successfully enrolled in class!');
            }}
            onClose={() => {
              setShowEnrollmentForm(false);
              setSelectedClass(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Schedule;