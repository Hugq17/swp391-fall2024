import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // CSS tùy chỉnh

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu email không rỗng
    if (!email) {
      setErrorMessage("Vui lòng nhập email.");
      return;
    }

    try {
      // Gửi yêu cầu đến API quên mật khẩu
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // Nếu thành công, hiển thị thông báo
      setSuccessMessage(
        "Đã gửi yêu cầu khôi phục mật khẩu. Vui lòng kiểm tra email."
      );
      setErrorMessage(""); // Xóa thông báo lỗi nếu có
      setEmail("");
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo
      setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại.");
      setSuccessMessage(""); // Xóa thông báo thành công nếu có
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-title">Quên Mật Khẩu</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit" className="submit-btn">
            Gửi
          </button>
        </form>
        <p className="back-to-login">
          <span onClick={() => navigate("/login")} className="back-link">
            Quay lại trang đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
