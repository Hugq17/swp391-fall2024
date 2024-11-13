import React, { useState } from "react";
import axios from "axios";
import "./ManageKoiAndTank.css"; // Import file CSS
import PondCard from "./ManageFish";
import PondParameters from "./Pondparameters"; // Import PondParameters component
import KoiInfo from "./Bieudothongsonuoc";

const ManageKoiAndTank = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    length: "",
    width: "",
    depth: "",
    volume: "",
    drainageCount: "",
    pumpCapacity: "",
    koiGroupId: null,
    gender: "",
    ageRange: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [showPoncard, setShowPoncard] = useState(true);
  const [showKoiInfo, setShowKoiInfo] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      alert("Giá trị không được âm!");
      return;
    }

    // Nếu giá trị không âm, tiến hành cập nhật formData
    if (name === "koiGroupId" || name === "gender") {
      setFormData({
        ...formData,
        [name]: value === "0" ? null : parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Lưu trữ file hình ảnh
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile); // Thêm file vào FormData

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imageUrl; // Giả sử server trả về đường dẫn hình ảnh dưới thuộc tính imageUrl
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Lỗi tải lên hình ảnh, vui lòng thử lại.");
      return null; // Trả về null nếu có lỗi
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    const uploadedImageUrl = await uploadImage(); // Tải lên hình ảnh và nhận đường dẫn

    if (!uploadedImageUrl) {
      return; // Dừng nếu không có đường dẫn hình ảnh
    }

    try {
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/ponds/save",
        {
          name: formData.name,
          imageUrl: uploadedImageUrl, // Sử dụng đường dẫn hình ảnh đã tải lên
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          depth: parseFloat(formData.depth),
          volume: parseFloat(formData.volume),
          drainageCount: parseInt(formData.drainageCount),
          pumpCapacity: parseFloat(formData.pumpCapacity),
          gender: parseInt(formData.gender),
          ageRange: parseInt(formData.ageRange),
          koiGroupId: formData.koiGroupId,
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
      setIsOpen(false);
      setFormData({
        name: "",
        imageUrl: "",
        length: "",
        width: "",
        depth: "",
        volume: "",
        drainageCount: "",
        pumpCapacity: "",
        koiGroupId: null,
      });
      setImageFile(null); // Reset file hình ảnh
    } catch (error) {
      console.error("There was an error saving the pond!", error);
    }
  };

  const toggleParameters = () => {
    setShowParameters((prev) => !prev);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="add-pond-button" onClick={() => setIsOpen(true)}>
        Thêm Hồ Cá
      </button>
      <button className="parameters-button" onClick={toggleParameters}>
        Nhập Thông số hồ
      </button>
      <button
        className="parameters-chart-button"
        onClick={() => {
          setShowPoncard(!showPoncard);
          setShowKoiInfo(!showKoiInfo);
        }}
      >
        {showKoiInfo ? "Quản lý hồ cá" : "Biểu đồ thông số hồ"}
      </button>
      {showParameters ? (
        <PondParameters />
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
                      type="file" // Thay đổi từ text thành file
                      accept="image/*"
                      onChange={handleImageChange} // Gọi hàm khi có thay đổi
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
                    Công suất máy bơm (W):
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
                <div className="form-row">
                  <label>
                    Giới tính:
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="1">Đực</option>
                      <option value="2">Cái</option>
                    </select>
                  </label>
                </div>
                {/* Thêm phần tuổi trung bình */}
                <div className="form-row">
                  <label>
                    Tuổi trung bình (năm):
                    <input
                      type="number"
                      name="ageRange"
                      value={formData.ageRange}
                      onChange={handleChange}
                      required
                    />
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
      {showPoncard && <PondCard />}
      {showKoiInfo && <KoiInfo />}
    </div>
  );
};

export default ManageKoiAndTank;
