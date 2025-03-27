# Atlas Taxi Service - Full Stack README

## Project Overview

**Atlas Taxi Service** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help a small taxi business streamline the ride booking process and provide an admin dashboard to manage bookings and users. The application allows users to sign up, book rides, and track ride status, while administrators can view all ride requests and manage user data.

---

## Frontend

Built with React, the frontend handles user interaction, routing, and communication with the backend API.

### Key Features

- React with React Router for navigation
- Forms for user sign-up, login, and ride booking
- Conditional rendering for success/error messages
- Admin dashboard displays rides and users with status update buttons
- Form validation and clean user experience

### Frontend Folder Structure

- `components/`: `NavBar`, `Signup`, `Login`, `BookRide`, `AdminDashboard`, `UserDashboard`
- Styling: CSS Modules for scoped styles per component

---

## Backend

The backend is built using Node.js with Express and connects to MongoDB using Mongoose. It handles API routing, data validation, and database operations.

### Key Features

- Express server with modular route handling
- MongoDB integration via Mongoose for data storage
- User and Ride models with validation and timestamps
- POST routes to handle sign-up and ride booking
- PATCH route for admin to update ride status
- CORS, Helmet, and Morgan for middleware and security

### Backend Folder Structure

- `routes/`: `user.js`, `auth.js`, `admin.js`, `ride.js`
- `models/`: `User.js`, `Ride.js`
- `index.js`: Connects to MongoDB and starts the server

---

## Future Enhancements

- Implement JWT authentication and password hashing
- Build a user dashboard to view ride history
- Add search/sort filters for admin dashboard
- Simulate SMS or email booking confirmations
- Add tests and validation feedback to improve UX
