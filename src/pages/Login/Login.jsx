import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/account/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userName", response.data.userName);
      alert("Login successful!");
      navigate("/Managekoiandtank");
    } catch (error) {
      setErrorMessage("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group-auth">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-visibility-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          {errorMessage && <p className="auth-error-message">{errorMessage}</p>}
          <button type="submit" className="auth-submit-btn">
            Đăng nhập
          </button>
        </form>

        <p className="auth-toggle-text">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="auth-toggle-link"
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
