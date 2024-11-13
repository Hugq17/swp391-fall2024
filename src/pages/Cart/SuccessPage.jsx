import React from "react";
import { Link } from "react-router-dom";
import "./SuccessPage.css";
const SuccessPage = () => {
  return (
    <div className="success-container">
      <h2>Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
      <Link to="/">Quay lại trang chủ</Link>
    </div>
  );
};

export default SuccessPage;
