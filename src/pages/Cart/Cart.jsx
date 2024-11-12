import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Hook để chuyển hướng

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleAddItem = (newItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    } else {
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Hàm xử lý thanh toán
  const handleCheckout = async () => {
    const orderDetails = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      phoneNumber,
      address,
      orderDetails,
    };

    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    try {
      const response = await fetch(
        "https://koi-care-server.azurewebsites.net/api/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Thêm accessToken vào header
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        alert("Đơn hàng đã được gửi thành công!");
        setCartItems([]);
        localStorage.removeItem("cartItems");

        // Chuyển hướng đến trang thanh toán thành công
        navigate("/success");
      } else {
        alert("Có lỗi xảy ra khi gửi đơn hàng.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi khi kết nối đến server.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      <div className="checkout-info">
        <label>
          Số điện thoại:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label>
          Địa chỉ:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>

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
            <button className="checkout-button" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </>
      ) : (
        <p>Giỏ hàng của bạn trống!</p>
      )}
    </div>
  );
};

export default Cart;
