export const login = async (url, formData, setMessage, navigate, role) => {
  try {
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

    setMessage("Login successful! Redirecting...");
    
    navigate(role === "admin" ? "/admin" : "/dashboard");
    window.location.reload();
  } catch (err) {
    console.error("Login error:", err);
    setMessage("Something went wrong. Please try again.");
  }
};