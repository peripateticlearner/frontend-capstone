export const login = async (url, formData, setMessage, navigate, role) => {
  try {
    // Show connection message immediately
    setMessage("Connecting to server...");
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Login failed.");
      return;
    }

    // Save user/admin details AND token in localStorage
    localStorage.setItem(role === "admin" ? "adminId" : "userId", data._id);
    localStorage.setItem("token", data.token);
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
    
    // Better error message for network/timeout issues (common with Render cold starts)
    if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
      setMessage("Server is starting up (this takes 30-60 seconds on free hosting). Please try again in a moment.");
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  }
};