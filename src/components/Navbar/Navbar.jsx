import React, { useState } from "react";
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
          Trang chủ
        </li>
        <li
          onClick={() => setMenu("Bài viết chia sẻ")}
          className={menu === "Bài viết chia sẻ" ? "active" : ""}
          
        >
          Bài viết chia sẻ
        </li>
        <li
          onClick={() => setMenu("Quản lý cá Koi")}
          className={menu === "Quản lý cá Koi" ? "active" : ""}
        >
          Quản lý cá Koi
        </li>
        <li
          onClick={() => setMenu("Cửa hàng")}
          className={menu === "Cửa hàng" ? "active" : ""}
        >
          Cửa hàng
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Navbar;
