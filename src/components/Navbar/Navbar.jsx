import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("Trang chủ");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userName, setUserName] = useState(""); // Lưu tên người dùng
  const navigate = useNavigate();

  useEffect(() => {
    // Giả sử trạng thái đăng nhập và tên người dùng được lưu trong localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName");

    setIsLoggedIn(loggedIn);
    if (storedUserName) {
      setUserName(storedUserName); // Cập nhật tên người dùng
    }
  }, []);

  const handleKoiManagementClick = () => {
    if (isLoggedIn) {
      setMenu("Quản lý cá Koi");
    } else {
      // Chuyển hướng tới trang đăng nhập nếu chưa đăng nhập
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Trang chủ")}
          className={menu === "Trang chủ" ? "active" : ""}
        >
          <Link to="/" className="navbar-link">
            Trang chủ
          </Link>
        </li>
        <li
          onClick={() => setMenu("Bài viết chia sẻ")}
          className={menu === "Bài viết chia sẻ" ? "active" : ""}
        >
          <Link to="/blog" className="navbar-link">
            Bài viết chia sẻ
          </Link>
        </li>
        <li
          onClick={handleKoiManagementClick} // Kiểm tra đăng nhập khi nhấn vào Quản lý cá Koi
          className={menu === "Quản lý cá Koi" ? "active" : ""}
        >
          <Link to={isLoggedIn ? "/manageKoi" : "#"} className="navbar-link">
            Quản lý cá Koi
          </Link>
        </li>
        <li
          onClick={() => setMenu("Cửa hàng")}
          className={menu === "Cửa hàng" ? "active" : ""}
        >
          <Link to="/store" className="navbar-link">
            Cửa hàng
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
        </div>
        {isLoggedIn ? (
          <span className="welcome-message">Xin chào, {userName}</span> // Hiển thị tên người dùng sau khi đăng nhập
        ) : (
          <Link to="/login" className="navbar-link">
            <button>Đăng nhập</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
