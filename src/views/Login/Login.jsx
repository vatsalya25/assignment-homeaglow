import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  // const [accessToken, setAccessToken] = useLocalStorage("token", null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    login();
  };

  const login = async () => {
    const loginDetails = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://homeaglow-staging.herokuapp.com/api/token/",
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError(null);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      onLogin();
      history.push("/chats");
    } catch (error) {
      console.error("Login error: ", JSON.stringify(error, null, 2));
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <form
        className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 xl:w-2/5 bg-white p-8 rounded shadow-lg"
        onSubmit={handleSubmit}
        style={{ minWidth: "initial", maxWidth: "550px" }}
      >
        <div className="flex flex-col items-start w-full">
          <label htmlFor="username" className="text-slate-800 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mb-4 w-full bg-slate-100 p-2 rounded border border-slate-200 text-slate-900"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="password" className="text-slate-800 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mb-4 w-full bg-slate-100 p-2 rounded border border-slate-200 text-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-5 self-center px-4 py-2 text-white w-full rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
