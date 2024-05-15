import axiosInstance from "../services/axiosConfig";

async function fetchUserInfo() {
  try {
    const response = await axiosInstance.get("userinfo/");
    console.log("User info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error.response.data);
    // window.location = "/login";
  }
}

export default fetchUserInfo;
