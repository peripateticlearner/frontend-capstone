import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// creating a custom axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

// response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    // if response is successful, return it
    (response) => response,
    // if an error in response, check if it's auth-related
    (error) => {
        // check if error is 401 (unauth.) or 403 (forbid.)
        if (error.response?.status === 401 || error.response?.status === 403) {
            // token expired or invalid - log user out
            console.log("Session expired. Logging out...");
            // clear all localStorage
            localStorage.clear();
            // flag for login page
            localStorage.setItem("sessionExpired", "true");
            // redirect to login page
            window.location.href = "/login";
        }
        // return the error so the calling code can still handle it
        return Promise.reject(error);
    }
);

export default axiosInstance;