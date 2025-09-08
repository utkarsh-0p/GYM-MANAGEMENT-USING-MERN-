# 🏋️ Gym Website - Project Web Flow

## 📚 Overview
The project is a full-stack gym website built using the MERN stack (MongoDB, Express, React, and Node.js). It will be a **Single Page Application (SPA)** where routing is handled by `react-router-dom` and dynamic content is loaded based on the route.

---

## 🗂️ Page Flow

### 1. 🏠 Home Page
- **Hero Section:**
  - Engaging banner with a background video
  - Action buttons: **Join Now** and **Learn More** with smooth scroll to relevant sections
  - Video autoplay with mute option
- **Services Offered:**
  - List of key services with icons and descriptions
  - Option to explore individual classes
- **Testimonials:**
  - Client reviews and success stories
  - Carousel/Slider format
- **Footer:**
  - Quick links, social media, and contact info
  - Brand Name: **Pulse Gym** used as text logo

**Route:** `/`

---

### 2. 📖 About Page
- **Gym History:**
  - Overview of gym’s journey and vision
- **Trainer Profiles:**
  - Showcase trainers with expertise and certifications
  - Option to view detailed profiles
- **Facilities & Equipment:**
  - High-resolution images of the gym
  - Description of equipment and amenities

**Route:** `/about`

---

### 3. 🕒 Classes Page
- **Class List:**
  - Grid layout of available classes
  - Basic details like time, trainer, and capacity
- **Class Details:**
  - In-depth description, benefits, and prerequisites
  - Enroll/Book button with availability info

**Route:** `/classes`

---

### 4. 📅 Schedule Page
- **Weekly Schedule:**
  - Table view with classes, trainers, and timings
- **Filter Options:**
  - Filter by trainer, class type, and time slots
- **Enroll Option:**
  - Quick link to enroll in selected classes

**Route:** `/schedule`

---

### 5. 📞 Contact Us Page
- **Contact Form:**
  - Input fields: Name, Email, Subject, Message
  - Submission with success/failure alert
- **Location Map:**
  - Embedded Google Map
- **Contact Info:**
  - Address, phone number, and email

**Route:** `/contact`

---

### 6. 🔐 Sign Up / Login Page
- **Sign Up Form:**
  - Name, Email, Password, Confirm Password
  - Password validation
- **Login Form:**
  - Email and Password
  - Forgot Password option
- **Redirect to Dashboard:**
  - Successful login redirects to the user dashboard

**Routes:** `/login` and `/signup`

---

## 📂 File Structure

```
/gymsite
├── /backend
│   ├── /config
│   │   └── db.js          # MongoDB Connection
│   ├── /controllers
│   │   ├── authController.js
│   │   ├── classController.js
│   │   └── contactController.js
│   ├── /models
│   │   ├── User.js
│   │   ├── Class.js
│   │   └── Contact.js
│   ├── /routes
│   │   ├── authRoutes.js
│   │   ├── classRoutes.js
│   │   └── contactRoutes.js
│   ├── /middleware
│   │   └── authMiddleware.js
│   ├── server.js         # Main server file
│   └── .env
├── /frontend
│   ├── /public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── /src
│   │   ├── /assets
│   │   │   ├── /images   # Images for classes, trainers, etc.
│   │   │   └── /videos   # Video for homepage banner
│   │   ├── /components
│   │   │   ├── Navbar.js  # Navbar with 'Pulse Gym' text as logo
│   │   │   ├── Footer.js  # Footer with 'Pulse Gym' text as logo
│   │   │   └── VideoBanner.js
│   │   ├── /pages
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Classes.js
│   │   │   ├── Schedule.js
│   │   │   ├── Contact.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── /context
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── routes.js
│   └── package.json
├── /node_modules
└── package.json
```

---

## 🎨 UI/UX Considerations

### 🎨 Modern Color Palette
- **Primary Color:** #ff5733 (Vibrant Orange) - For call-to-action buttons and highlights
- **Secondary Color:** #1f1f1f (Dark Grey/Black) - For backgrounds, navbar, and footer
- **Accent Color:** #4caf50 (Green) - For success messages and positive actions
- **Text Color:** #ffffff (White) - For text over dark backgrounds
- **Hover Effect:** Light shades of primary and secondary colors for interactive elements

### 🖌️ Typography
- **Heading Font:** Montserrat (Bold & Modern)
- **Body Font:** Open Sans (Clean & Readable)

### 📱 Responsive Design
- Mobile-first design with a clean layout
- Cross-browser compatibility

### 🎥 Media & Visuals
- High-quality images and video with lazy loading
- Background video with auto-play and mute for hero section

---

## ⚙️ Backend API Flow

### 1. User Authentication
- `/api/auth/register` - User Registration
- `/api/auth/login` - User Login
- `/api/auth/profile` - Get User Profile

### 2. Classes API
- `/api/classes` - Get All Classes
- `/api/classes/:id` - Get Class by ID

### 3. Schedule API
- `/api/schedule` - Get Class Schedule

### 4. Contact Us API
- `/api/contact` - Submit Contact Inquiry

---

## 🔄 User Flow

1. **Visitor:**
   - Browse Home, About, Classes, and Schedule
   - Contact Gym via Contact Form
   - Option to Register or Log In

2. **User:**
   - Log in and Access Dashboard
   - Enroll in Classes
   - View Personal Schedule

3. **Admin:**
   - Manage Classes and Schedules
   - Respond to Contact Inquiries

---

## 🔥 Next Steps
- Set up React Routing with `react-router-dom`
- Build API Endpoints and Models
- Integrate Backend with Frontend
- Implement JWT Authentication and Protect Routes

