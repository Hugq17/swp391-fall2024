import React, { useState } from "react";
import axios from "axios";
import "./KoiForm.css"; // Import file CSS
import PondCard from "./KoiTank";

const PondForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    length: "",
    width: "",
    depth: "",
    volume: "",
    drainageCount: "",
    pumpCapacity: "",
  });

  const [isOpen, setIsOpen] = useState(false); // State để quản lý hiển thị form

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/ponds/save",
        {
          name: formData.name,
          imageUrl: formData.imageUrl,
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          depth: parseFloat(formData.depth),
          volume: parseFloat(formData.volume),
          drainageCount: parseInt(formData.drainageCount),
          pumpCapacity: parseFloat(formData.pumpCapacity),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pond saved successfully!");
      console.log(response.data);
      setIsOpen(false); // Đóng form sau khi lưu thành công
      setFormData({
        // Reset form
        name: "",
        imageUrl: "",
        length: "",
        width: "",
        depth: "",
        volume: "",
        drainageCount: "",
        pumpCapacity: "",
      });
    } catch (error) {
      console.error("There was an error saving the pond!", error);
    }
  };

  return (
    <div>
      <button className="add-pond-button" onClick={() => setIsOpen(true)}>
        Thêm Hồ Cá
      </button>
      {isOpen && (
        <div className="form-overlay">
          <div className="form-container">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              X
            </button>
            <h1>Thêm Hồ Cá</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Tên:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                URL Ảnh:
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Chiều dài:
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Chiều rộng:
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Độ sâu:
                <input
                  type="number"
                  name="depth"
                  value={formData.depth}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Thể tích:
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Số lượng cống thoát:
                <input
                  type="number"
                  name="drainageCount"
                  value={formData.drainageCount}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Công suất máy bơm:
                <input
                  type="number"
                  name="pumpCapacity"
                  value={formData.pumpCapacity}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button className="save-button" type="submit">
                Lưu Hồ Cá
              </button>
            </form>
          </div>
        </div>
      )}
      <PondCard />
    </div>
  );
};

export default PondForm;
