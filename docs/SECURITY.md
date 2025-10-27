# Security Considerations

## Current Authentication Implementation

### Token Storage: localStorage

**Current approach:**
- JWT tokens stored in `localStorage`
- Token sent via `Authorization: Bearer <token>` header
- Easy to implement and works with any API

**Security considerations:**
- Simple implementation
- Works with any backend
- Easy to debug
- Vulnerable to XSS (Cross-Site Scripting) attacks
- JavaScript can access tokens

---

## Future Migration: httpOnly Cookies

For production deployments with high security requirements, consider migrating to **httpOnly cookies**.

### Why httpOnly Cookies Are More Secure

**httpOnly cookies:**
- JavaScript CANNOT access them (provides XSS protection)
- Browser automatically includes in requests
- Can set `Secure` flag (HTTPS only)
- Can set `SameSite` flag (CSRF protection)
- Requires backend changes
- More complex CORS configuration

### How to Implement httpOnly Cookies

#### Backend Changes (Express)

**Update auth routes to set cookies:**
```javascript
// backend/routes/auth.js

authRouter.post("/user-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // ... validation code ...
    
    const token = jwt.sign(
      { userId: dbUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );
    
    // Set httpOnly cookie instead of sending token in body
    res.cookie('token', token, {
      httpOnly: true,      // Cannot be accessed by JavaScript
      secure: true,        // Only sent over HTTPS (production)
      sameSite: 'strict',  // CSRF protection
      maxAge: 3600000      // 1 hour in milliseconds
    });
    
    // Still send user info (but NOT the token)
    res.status(200).json({ 
      _id: dbUser._id, 
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
      message: "User Login successful" 
    });
  } catch (err) {
    // ... error handling ...
  }
});
```

**Update authentication middleware:**
```javascript
// backend/middleware/authenticateJWT.js

const authenticateJWT = (req, res, next) => {
  // Read token from cookie instead of Authorization header
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (decoded.userId) {
      req.user = { userId: decoded.userId };
    } else if (decoded.adminId) {
      req.admin = { adminId: decoded.adminId };
    }
    
    next();
  });
};
```

**Install cookie-parser:**
```bash
npm install cookie-parser
```

**Update backend index.js:**
```javascript
import cookieParser from 'cookie-parser';

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "https://yourdomain.com"],
  credentials: true  // IMPORTANT: Allow cookies
}));
```

#### Frontend Changes

**Update axios instance:**
```javascript
// frontend/src/utils/axiosInstance.js

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true  // IMPORTANT: Send cookies with requests
});
```

**Update auth.js utility:**
```javascript
// frontend/src/utils/auth.js

export const login = async (url, formData, setMessage, navigate, role) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',  // IMPORTANT: Send cookies
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Login failed.");
      return;
    }

    // Token is in httpOnly cookie (not accessible to JS)
    // Only save user info, NOT the token
    localStorage.setItem(role === "admin" ? "adminId" : "userId", data._id);
    localStorage.setItem("isAdmin", role === "admin" ? "true" : "false");

    if (role === "user") {
      localStorage.setItem("userFirstName", data.firstName);
      localStorage.setItem("userLastName", data.lastName);
    }

    setMessage("Login successful! Redirecting...");
    navigate(role === "admin" ? "/admin" : "/dashboard");
    window.location.reload();
  } catch (err) {
    console.error("Login error:", err);
    setMessage("Something went wrong. Please try again.");
  }
};
```

**Remove Authorization headers from components:**

Since the cookie is sent automatically, you don't need to manually add headers:
```javascript
// Before (with localStorage):
const res = await axios.get('/api/rides', {
  headers: { Authorization: `Bearer ${token}` }
});

// After (with httpOnly cookies):
const res = await axios.get('/api/rides');  // Cookie sent automatically
```

---

## Comparison: localStorage vs httpOnly Cookies

| Feature | localStorage | httpOnly Cookies |
|---------|-------------|------------------|
| **XSS Protection** | Vulnerable | Protected |
| **Setup Complexity** | Simple | Complex |
| **CORS Requirements** | Simple | Requires credentials |
| **Mobile App Support** | Supported | Difficult |
| **Third-party API** | Supported | Domain restrictions |
| **Debugging** | Easy (DevTools) | Harder to inspect |
| **Production Ready** | Acceptable with precautions | Industry best practice |

---

## When to Migrate

**Stick with localStorage if:**
- Building a portfolio or demo project (current use case)
- Need to support mobile apps
- Using third-party APIs
- Want simpler development workflow

**Migrate to httpOnly cookies if:**
- Deploying to production with real users
- Handling sensitive data
- Security is top priority
- App and API on same domain or proper CORS setup available

---

## Additional Security Measures

Regardless of token storage method, implement these security practices:

1. **Always use HTTPS in production**
2. **Implement refresh tokens** for longer sessions
3. **Rate limit authentication endpoints**
4. **Validate and sanitize all inputs**
5. **Keep dependencies updated**
6. **Implement CSP (Content Security Policy) headers**
7. **Use environment variables for secrets**
8. **Regular security audits**

---

## Resources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [MDN: httpOnly cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

---

**Last Updated:** October 27, 2025  
**Author:** Ali Kirat
**Project:** Atlas Taxi - Full Stack Capstone