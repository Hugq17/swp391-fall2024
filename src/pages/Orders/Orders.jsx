// ManageOrders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate để chuyển hướng
import "./Orders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook để chuyển hướng

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Nếu không có token, chuyển hướng về trang đăng nhập
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/order/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders); // Lưu đơn hàng vào state
        } else {
          setError("Không thể tải đơn hàng. Vui lòng thử lại.");
        }
      } catch (error) {
        setError("Lỗi khi kết nối đến server.");
      }
    };

    fetchOrders();
  }, [navigate]); // Chạy lại nếu navigate thay đổi (khi chuyển hướng)

  // Hàm kiểm tra và format tiền tệ
  const formatPrice = (amount) => {
    if (amount && !isNaN(amount)) {
      return amount.toLocaleString("vi-VN");
    }
    return "Không xác định";
  };

  return (
    <div className="manage-orders-container">
      <h2>Danh sách đơn hàng</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderCode}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.address}</td>
                  <td>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "Không xác định"}
                  </td>
                  <td>{formatPrice(order.total)} VND</td>
                  <td>
                    {order.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Không có đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
