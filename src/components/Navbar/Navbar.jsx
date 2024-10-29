import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("Trang chủ");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKoiManagementClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/manageKoi");
      setMenu("Quản lý cá Koi");
    }
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <nav className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />
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
          onClick={handleKoiManagementClick}
          className={menu === "Quản lý cá Koi" ? "active" : ""}
        >
          <Link to="#" className="navbar-link">
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
        <div className="navbar-cart-icon" onClick={() => navigate("/cart")}>
          <img className="img-logo" src={assets.cart} alt="Giỏ hàng" />
          {getTotalItemsInCart() > 0 && (
            <span className="cart-count">{getTotalItemsInCart()}</span>
          )}
        </div>
        {isLoggedIn ? (
          <div className="user-dropdown">
            <span className="welcome-message" onClick={toggleDropdown}>
              Xin chào, {userName}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar-link">
            <button className="login-button">Đăng nhập</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
