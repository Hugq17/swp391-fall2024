import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  const [menu, setMenu] = useState("Phong thủy");

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
          onClick={() => setMenu("Phong thủy")}
          className={menu === "Phong thủy" ? "active" : ""}
        >
          Phong thủy
        </li>
        <li
          onClick={() => setMenu("Mua cá koi")}
          className={menu === "Mua cá koi" ? "active" : ""}
        >
          Mua cá koi
        </li>
        <li
          onClick={() => setMenu("Liên hệ")}
          className={menu === "Liên hệ" ? "active" : ""}
        >
          Liên hệ
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
