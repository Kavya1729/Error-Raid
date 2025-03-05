import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/Auth.css";
import logo from "../assets/whitelogo.png";

const Auth = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint = isSignUp ? "/auth/signup" : "/auth/login";
    const payload = isSignUp
      ? { username, email, password }
      : { email, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        payload
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/ai/get-solution");
    } catch (error) {
      console.error(isSignUp ? "Signup failed" : "Login failed", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      id="container"
      className={`container ${isSignUp ? "sign-up" : "sign-in"}`}
    >
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  color="black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="email"
                  placeholder="Email"
                  color="black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Password"
                  color="black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  color="black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="signup-btn"
                onClick={handleSubmit}
              >
                Sign up
              </button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggleForm} className="pointer">
                  Login here
                </b>
              </p>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>

        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group" id="okg">
                <i className="bx bxs-user"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group" id="okg">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="login-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggleForm} className="pointer">
                  Sign up here
                </b>
              </p>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* LOGIN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="sign-inimg">
            <img src={logo} alt="Welcome" />
          </div>
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
        </div>

        {/* SIGNUP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="signimg">
            <img src={logo} alt="Let's Debug" />
          </div>
          <div className="text sign-up">
            <h2>Let's Debug</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
//done
