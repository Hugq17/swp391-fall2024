import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("Trang chủ");

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
          </Link>{" "}
          {/* Sử dụng Link */}
        </li>
        <li
          onClick={() => setMenu("Bài viết chia sẻ")}
          className={menu === "Bài viết chia sẻ" ? "active" : ""}
        >
          <Link to="/blog" className="navbar-link">
            Bài viết chia sẻ
          </Link>{" "}
          {/* Sử dụng Link */}
        </li>
        <li
          onClick={() => setMenu("Quản lý cá Koi")}
          className={menu === "Quản lý cá Koi" ? "active" : ""}
        >
          <Link to="/manageKoi" className="navbar-link">
            Quản lý cá Koi
          </Link>{" "}
          {/* Sử dụng Link */}
        </li>
        <li
          onClick={() => setMenu("Cửa hàng")}
          className={menu === "Cửa hàng" ? "active" : ""}
        >
          <Link to="/store" className="navbar-link">
            Cửa hàng
          </Link>{" "}
          {/* Sử dụng Link */}
        </li>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <Link to="/login" className="navbar-link">
          <button>Đăng nhập</button>
        </Link>{" "}
        {/* Sử dụng Link */}
      </div>
    </div>
  );
};

export default Navbar;
