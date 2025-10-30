# Atlas Taxi - Frontend

**Full-Stack Development Capstone Project**

React-based frontend for a ride-booking application with JWT authentication, protected routes, and role-based dashboards.

## 🚀 Live Demo

**Try it live:** [https://atlastaxi.netlify.app](https://atlastaxi.netlify.app)

**Test Credentials:**
- **User:** `demo@test.com` / `demo1234`
- **Admin:** `admin@test.com` / `admin1234`

> 💡 **Tip:** Sign up as a new user or use the test accounts above to explore the app!

> ⚠️ **Hosting Note:** This demo uses free-tier hosting (Render). On the first request after 15 minutes of inactivity, the backend may take 30-60 seconds to wake up. If you see a connection message, please wait a moment and try again. This is a limitation of free hosting and would not occur in a production environment with paid hosting ($7/month eliminates cold starts). To demonstrate understanding of production considerations, UptimeRobot monitoring is used to prevent most cold starts during demo usage.

> 📌 **Note:** This is a portfolio/demonstration project showcasing full-stack development skills. All data is for testing purposes only.

## Features

- 🔐 JWT authentication with automatic token expiration handling
- 👤 User registration and login with personalized greeting
- 🚕 Ride booking with date/time scheduling
- 📊 User dashboard displaying personal ride history
- 🛠️ Admin dashboard for managing all rides and users
- 🎨 Responsive UI with CSS Modules
- ✅ Form validation and error handling
- 🔄 Dynamic navigation based on authentication state
- 🔒 Role-based access control
- ⏱️ User-friendly session expiration warnings
- 🎯 Axios interceptor for centralized error handling

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **Styling:** CSS Modules
- **Build Tool:** Vite
- **State Management:** React Hooks (useState, useEffect)
- **Deployment:** Netlify

## User Roles

### Regular User Can:
- Sign up and log in
- Book rides with pickup/dropoff locations
- View personal ride history with status updates
- See personalized greeting: "Welcome, [FirstName]!"

### Administrator Can:
- Log in via discreet admin login page
- View all rides from all users
- Update ride status (Scheduled → In Progress → Completed)
- Delete rides
- View all registered users

## Pages & Components

### Public Pages
- **Landing** - Home page with sign up/login options
- **Signup** - User registration form
- **Login** - User authentication with admin login link
- **Admin Login** - Admin authentication with visual badge

### Protected Pages (Require Authentication)
- **User Dashboard** - Personal ride history with personalized greeting
- **Book Ride** - Create new ride booking
- **Admin Dashboard** - Manage all rides and users
- **Logout** - Session termination

### Components
- **NavBar** - Dynamic navigation based on auth state
- **PrivateRoute** - Route protection wrapper

## Project Structure
```
frontend-capstone/
├── src/
│   ├── components/
│   │   └── PrivateRoute.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── BookRide.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── NavBar.jsx
│   │   └── Logout.jsx
│   ├── utils/
│   │   ├── auth.js              Authentication utilities
│   │   └── axiosInstance.js     Axios config with interceptors
│   ├── module/
│   │   └── *.module.css         Component styles
│   ├── docs/
│   │   └── SECURITY.md          Security documentation
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── _redirects               Netlify routing config
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend repo)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/peripateticlearner/frontend-capstone
cd frontend-capstone
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:4000
```

For production, set to your backend URL.

4. **Start development server**
```bash
npm run dev
```

Application will run on `http://localhost:5173`

## Authentication Flow

1. User submits login form
2. Frontend sends credentials to `/api/auth/user-login`
3. Backend returns JWT token, userId, and user details (firstName, lastName, email)
4. Token and user info stored in localStorage
5. Token sent in `Authorization: Bearer <token>` header for protected requests
6. Axios interceptor catches 401/403 errors automatically
7. On token expiration:
   - Interceptor sets `sessionExpired` flag in localStorage
   - Clears all user data
   - Redirects to login page
   - Displays user-friendly warning message

## Key Features Implementation

### Personalized User Experience
```javascript
// Store user details on login
localStorage.setItem("userFirstName", data.firstName);

// Display in dashboard
const firstName = localStorage.getItem("userFirstName");
<h1>Welcome, {firstName || "User"}!</h1>
```

### Automatic Token Expiration Handling
```javascript
// Axios interceptor catches expired tokens
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      localStorage.setItem('sessionExpired', 'true');
      window.location.href = '/login';
    }
  }
);
```

### Protected Routes
```javascript
<Route path="/dashboard" element={
  <PrivateRoute isLoggedIn={localStorage.getItem("userId")}>
    <UserDashboard />
  </PrivateRoute>
} />
```

## API Integration

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/user-register` | Register new user |
| POST | `/api/auth/user-login` | User login (returns token + user details) |
| POST | `/api/auth/admin-login` | Admin login |
| POST | `/api/rides` | Book new ride |
| GET | `/api/rides` | Get user's rides (or all for admin) |
| PATCH | `/api/rides/:id` | Update ride status |
| DELETE | `/api/rides/:id` | Delete ride |
| GET | `/api/user` | Get all users (admin) |

## Styling

- **CSS Modules** for component-scoped styles
- Consistent color scheme (dark nav, blue accents)
- Responsive design principles
- Form validation styling (error/success/warning states)
- Session expiration warnings with yellow background
- Admin badge for visual distinction

## Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

**Platform:** Netlify  
**Auto-deploy:** Connected to GitHub main branch  
**Environment Variables:** `VITE_API_BASE_URL` set in Netlify dashboard

**Important:** `_redirects` file ensures React Router works correctly on deployed site by serving `index.html` for all routes.

### Hosting Architecture

**Current (Demo):**
- **Frontend:** Netlify Free Tier
- **Backend:** Render Free Tier (may experience cold starts)
- **Database:** MongoDB Atlas Free Tier (M0)
- **Uptime Monitoring:** UptimeRobot (keeps backend responsive)

**Recommended for Production:**
- **Frontend:** Netlify (free tier is suitable)
- **Backend:** Render Starter ($7/month) or Railway - eliminates cold starts
- **Database:** MongoDB Atlas M10 ($57/month) - includes backups and better performance
- **Estimated Cost:** ~$70/month for professional deployment

### Cold Start Mitigation

This demo implements two strategies to handle free-tier cold starts:
1. **UptimeRobot monitoring** - Pings backend every 14 minutes to keep it awake
2. **User feedback** - Displays "Connecting to server..." message during wake-up periods

## Security Documentation

See [docs/SECURITY.md](docs/SECURITY.md) for information about:
- Current authentication approach (localStorage + JWT)
- Future migration to httpOnly cookies
- Security best practices and considerations
- When to upgrade security measures

## Related Repository

**Backend API:** [https://github.com/peripateticlearner/backend-capstone](https://github.com/peripateticlearner/backend-capstone)

---

**Built as part of a full-stack development capstone project demonstrating React, authentication, and modern frontend development practices.**