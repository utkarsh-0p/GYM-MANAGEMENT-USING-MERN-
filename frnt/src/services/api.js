import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getProfile: async () => {
    return await api.get('/auth/profile');
  },

  checkTokenValidity: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    try {
      await api.get('/auth/verify');
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
  },
};

// Class Services
export const classService = {
  getAllClasses: async () => {
    return await api.get('/classes');
  },

  getClassById: async (id) => {
    return await api.get(`/classes/${id}`);
  },

  createClass: async (classData) => {
    return await api.post('/classes', classData);
  },

  updateClass: async (id, classData) => {
    return await api.put(`/classes/${id}`, classData);
  },

  deleteClass: async (id) => {
    return await api.delete(`/classes/${id}`);
  },

  enrollInClass: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await api.post(`/classes/${id}/enroll`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Please log in to enroll in classes');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Unable to enroll in class');
      } else {
        throw new Error('An error occurred while enrolling in the class');
      }
    }
  },
};

// Contact Services
export const contactService = {
  submitContact: async (contactData) => {
    return await api.post('/contact', contactData);
  },

  getAllContacts: async () => {
    return await api.get('/contact');
  },

  updateContactStatus: async (id, status) => {
    return await api.put(`/contact/${id}`, { status });
  },
};
