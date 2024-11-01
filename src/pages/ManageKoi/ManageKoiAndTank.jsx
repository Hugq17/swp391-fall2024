import React, { useState } from "react";
import axios from "axios";
import "./KoiForm.css"; // Import file CSS
import PondCard from "./ManageFish";
import PondParameters from "./Pondparameters"; // Import PondParameters component
import KoiInfo from "./Bieudothongsonuoc";

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
    koiGroupId: null, // Khởi tạo với null
  });

  const [isOpen, setIsOpen] = useState(false); // State để quản lý hiển thị form
  const [showParameters, setShowParameters] = useState(false); // State để hiển thị PondParameters

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Kiểm tra trường koiGroupId và đặt giá trị null nếu chọn "Không"
    if (name === "koiGroupId") {
      setFormData({
        ...formData,
        [name]: value === "0" ? null : parseInt(value), // Đặt thành null nếu chọn "Không", chuyển thành số nếu chọn nhóm
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/ponds/save",
        {
          name: formData.name,
          imageUrl: formData.imageUrl,
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          depth: parseFloat(formData.depth),
          volume: parseFloat(formData.volume),
          drainageCount: parseInt(formData.drainageCount),
          pumpCapacity: parseFloat(formData.pumpCapacity),
          koiGroupId: formData.koiGroupId, // Gửi giá trị koiGroupId
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
        koiGroupId: null, // Đặt lại về null
      });
    } catch (error) {
      console.error("There was an error saving the pond!", error);
    }
  };

  const toggleParameters = () => {
    setShowParameters((prev) => !prev); // Toggle trạng thái hiển thị PondParameters
    setIsOpen(false); // Đảm bảo form cũng đóng lại khi hiển thị thông số hồ
  };

  return (
    <div>
      <button className="add-pond-button" onClick={() => setIsOpen(true)}>
        Thêm Hồ Cá
      </button>
      <button className="parameters-button" onClick={toggleParameters}>
        Thông số hồ
      </button>

      {showParameters ? (
        <PondParameters /> // Hiển thị nội dung từ PondParameters
      ) : (
        isOpen && (
          <div className="form-overlay">
            <div className="form-container">
              <button className="close-button" onClick={() => setIsOpen(false)}>
                X
              </button>
              <h1>Thêm Hồ Cá</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
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
                </div>

                <div className="form-row">
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
                </div>

                <div className="form-row">
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
                </div>

                <div className="form-row">
                  <label>
                    Nhóm Koi:
                    <select
                      name="koiGroupId"
                      value={formData.koiGroupId || 0}
                      onChange={handleChange}
                      className="group-fish"
                      required
                    >
                      <option value="0">Không</option>
                      <option value="1">Nhóm 1 - Taisho Sanke</option>
                      <option value="2">Nhóm 2 - Shusui - Asagi</option>
                      <option value="3">Nhóm 3 - Ogons - Tancho</option>
                      <option value="4">
                        Nhóm 4 - Kawarimono - Doitsu Koi
                      </option>
                      <option value="5">Nhóm 5 - Goshiki</option>
                    </select>
                  </label>
                </div>

                <button className="save-button" type="submit">
                  Lưu Hồ Cá
                </button>
              </form>
            </div>
          </div>
        )
      )}
      <PondCard />
      <KoiInfo />
    </div>
  );
};

export default PondForm;