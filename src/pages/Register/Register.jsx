import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Sử dụng lại CSS của trang đăng nhập

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State cho xác nhận mật khẩu
  const [showPassword, setShowPassword] = useState(false); // Ẩn/hiện mật khẩu
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    try {
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/register",
        {
          email,
          password,
          username,
          roleId: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Register error:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="auth-title">Đăng ký</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group-auth">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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
          <label htmlFor="password">Mật khẩu:</label>
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
              {showPassword ? "🙈" : "👁️"} {/* Biểu tượng ẩn/hiện mật khẩu */}
            </span>
          </div>
        </div>

        <div className="password-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
          <div className="password-input-field">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-visibility-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"} {/* Biểu tượng ẩn/hiện mật khẩu */}
            </span>
          </div>
        </div>

        {errorMessage && <p className="auth-error-message">{errorMessage}</p>}

        <button type="submit" className="auth-submit-btn">
          Đăng ký
        </button>
      </form>
      <p className="auth-toggle-text-register">
        Đã có tài khoản ? {"  "}
        <span onClick={() => navigate("/login")} className="auth-toggle-link">
          Đăng nhập ngay
        </span>
      </p>
    </div>
  );
};

export default Register;
