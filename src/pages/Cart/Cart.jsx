import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Set default payment method to COD
  const [paymentUrl, setPaymentUrl] = useState("");
  const navigate = useNavigate();

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

    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://koi-care-server.azurewebsites.net/api/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPaymentUrl(data.paymentUrl);

        // Redirect based on payment method
        if (paymentMethod === "cod") {
          navigate("/success");
        } else if (paymentMethod === "transfer") {
          window.location.href = data.paymentUrl;
        }

        setCartItems([]);
        localStorage.removeItem("cartItems");
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
        <label>
          Phương thức thanh toán:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="transfer">Chuyển khoản</option>
          </select>
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
