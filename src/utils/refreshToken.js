import axiosInstance from "../services/axiosConfig";

async function refreshToken() {
  try {
    const response = await axiosInstance.post("token/refresh/", {
      token: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Error refreshing token:", error.response.data);
    // handle token refresh error (log out the user?)
    // window.location = "/login";
  }
}

export default refreshToken;
