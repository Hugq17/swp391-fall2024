import React, { useState } from "react";
import "./KoiForm.css"; // Thêm CSS tùy chỉnh cho form

const ManageKoi = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    length: 0,
    width: 0,
    depth: 0,
    volume: 0,
    drainageCount: 0,
    pumpCapacity: 0,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Cập nhật dữ liệu cho mỗi trường
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    try {
      const response = await fetch(
        "https://koi-care-server.azurewebsites.net/api/ponds/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
          body: JSON.stringify(formData), // Chuyển dữ liệu thành chuỗi JSON
        }
      );

      if (response.ok) {
        setMessage("Lưu thông tin thành công!");
      } else {
        setMessage("Lưu thông tin thất bại.");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="manage-koi-container">
      <h2>Nhập Thông Tin Hồ Cá</h2>
      {message && <p className="message">{message}</p>}{" "}
      {/* Hiển thị thông báo */}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Tên hồ</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên hồ"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="imageUrl">URL Hình ảnh</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Nhập URL hình ảnh"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="length">Chiều dài (m)</label>
          <input
            type="number"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleInputChange}
            placeholder="Nhập chiều dài"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="width">Chiều rộng (m)</label>
          <input
            type="number"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleInputChange}
            placeholder="Nhập chiều rộng"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="depth">Độ sâu (m)</label>
          <input
            type="number"
            id="depth"
            name="depth"
            value={formData.depth}
            onChange={handleInputChange}
            placeholder="Nhập độ sâu"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="volume">Thể tích (m³)</label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleInputChange}
            placeholder="Nhập thể tích"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="drainageCount">Số lần thoát nước</label>
          <input
            type="number"
            id="drainageCount"
            name="drainageCount"
            value={formData.drainageCount}
            onChange={handleInputChange}
            placeholder="Nhập số lần thoát nước"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="pumpCapacity">Công suất bơm (m³/h)</label>
          <input
            type="number"
            id="pumpCapacity"
            name="pumpCapacity"
            value={formData.pumpCapacity}
            onChange={handleInputChange}
            placeholder="Nhập công suất bơm"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Lưu thông tin
        </button>
      </form>
    </div>
  );
};

export default ManageKoi;
