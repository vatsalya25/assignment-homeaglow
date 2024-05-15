import axiosInstance from "../services/axiosConfig";

async function verifyToken() {
  try {
    const response = await axiosInstance.post("token/verify/", {
      token: localStorage.getItem("accessToken"),
    });
    console.log("Token is valid:", response.data);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error.response.data);
    // window.location = "/login";
    return false;
  }
}

export default verifyToken;
