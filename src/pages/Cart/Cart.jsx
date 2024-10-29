import React, { useEffect, useState } from "react";
import "./Cart.css"; // Import CSS file for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Lấy sản phẩm trong giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Giá: {item.price.toLocaleString("vi-VN")} VND</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h4>Tổng tiền: {getTotalPrice().toLocaleString("vi-VN")} VND</h4>
            <button className="checkout-button">Thanh toán</button>
          </div>
        </>
      ) : (
        <p>Giỏ hàng của bạn trống!</p>
      )}
    </div>
  );
};

export default Cart;
