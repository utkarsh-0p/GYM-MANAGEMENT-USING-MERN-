# Pulse Gym

A modern gym management system with a full-stack implementation featuring a React frontend and Node.js backend.

## Project Structure

```
Pulse Gym/
├── frnt/          # Frontend React application
├── backend/       # Backend Node.js server
└── docs/          # Documentation files
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for database)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with necessary environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frnt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Features

### User Management
- Secure user authentication with JWT
- Role-based authorization (Admin, Trainer, Member)
- Password recovery and reset functionality
- User profile management with avatar upload
- Email notifications for important updates

### Member Features
- Personal dashboard with progress tracking
- Class booking and cancellation
- Trainer appointment scheduling
- Workout history and statistics
- BMI calculator and fitness tracking
- Membership plan management
- Online payment integration

### Trainer Features
- Class schedule management
- Member progress tracking
- Workout plan creation
- Attendance management
- Personal training session scheduling
- Performance analytics

### Admin Features
- Comprehensive dashboard with analytics
- Member and trainer management
- Membership plan configuration
- Financial reporting and analytics
- Equipment inventory management
- Facility maintenance scheduling

### General Features
- Responsive design for all devices
- Real-time notifications
- Dark/Light theme support
- Offline capability with PWA
- Multi-language support
- Advanced search and filtering
- Data export functionality

## Tech Stack

### Frontend
- React.js (v18+) for building user interfaces
- React Router (v6+) for client-side routing and navigation
- Material-UI/Tailwind CSS for modern, responsive UI components
- Redux Toolkit for state management
- Axios for API requests
- React Query for server state management
- React Hook Form for form handling and validation
- Jest and React Testing Library for unit testing
- ESLint and Prettier for code formatting

### Backend
- Node.js (v16+) runtime environment
- Express.js for RESTful API development
- MongoDB with Mongoose ODM for database operations
- JWT (JSON Web Tokens) for secure authentication
- Bcrypt for password hashing
- Express-validator for input validation
- Multer for file uploads
- Nodemailer for email notifications
- Morgan for HTTP request logging
- Cors for cross-origin resource sharing
- Jest for unit testing
- Swagger/OpenAPI for API documentation

## Development

### Code Standards
- Follow Airbnb JavaScript Style Guide
- Maintain consistent code formatting using Prettier
- Use ESLint for code quality
- Write meaningful commit messages following conventional commits
- Maintain code coverage above 80%

### Branch Strategy
1. Main branch: `main` (production)
2. Development branch: `dev`
3. Feature branches: `feature/feature-name`
4. Bug fixes: `fix/bug-name`
5. Hotfixes: `hotfix/issue-name`

### Development Workflow
1. Create a new branch from `dev`
2. Implement features/fixes with appropriate tests
3. Run local tests and ensure code quality
4. Submit pull request to `dev`
5. Undergo code review process
6. Merge to `dev` after approval
7. Periodic releases to `main`

### Testing Requirements
- Write unit tests for all new features
- Include integration tests for API endpoints
- Add E2E tests for critical user flows
- Test across different browsers and devices
- Performance testing for critical features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
