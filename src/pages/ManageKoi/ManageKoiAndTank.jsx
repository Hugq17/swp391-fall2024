import React, { useState } from "react";
import axios from "axios";
import "./KoiForm.css"; // Import file CSS
import PondCard from "./ManageFish";
import PondParameters from "./Pondparameters"; // Import PondParameters component
import KoiInfo from "./Bieudothongsonuoc";

const PondForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    length: "",
    width: "",
    depth: "",
    volume: "",
    drainageCount: "",
    pumpCapacity: "",
    koiGroupId: null, // Khởi tạo với null
  });

  const [imageFile, setImageFile] = useState(null); // State để lưu file ảnh
  const [isOpen, setIsOpen] = useState(false); // State để quản lý hiển thị form
  const [showParameters, setShowParameters] = useState(false); // State để hiển thị PondParameters
  const [showPoncard, setShowPoncard] = useState(true);
  const [showKoiInfo, setShowKoiInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "koiGroupId") {
      setFormData({
        ...formData,
        [name]: value === "0" ? null : parseInt(value),
      });
    } else if (name === "imageFile") {
      setImageFile(e.target.files[0]); // Lưu file ảnh được chọn
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
      // Tạo đối tượng FormData để upload ảnh
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", imageFile); // Thêm file ảnh vào FormData

      // Upload ảnh lên server và nhận URL
      const uploadResponse = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/image/upload",
        formDataToUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Giả định API trả về URL của ảnh trong uploadResponse.data.url
      const imageUrl = uploadResponse.data.url; // Nhận URL từ phản hồi

      // Sau khi upload ảnh, gửi thông tin hồ cá
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/ponds/save",
        {
          name: formData.name,
          imageUrl: imageUrl, // Sử dụng URL đã nhận từ upload
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          depth: parseFloat(formData.depth),
          volume: parseFloat(formData.volume),
          drainageCount: parseInt(formData.drainageCount),
          pumpCapacity: parseFloat(formData.pumpCapacity),
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
      setIsOpen(false); // Đóng form sau khi lưu thành công
      // Reset form
      setFormData({
        name: "",
        length: "",
        width: "",
        depth: "",
        volume: "",
        drainageCount: "",
        pumpCapacity: "",
        koiGroupId: null,
      });
      setImageFile(null); // Reset file ảnh
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
                      type="file"
                      name="imageFile"
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
      {showPoncard && <PondCard />}
      {showKoiInfo && <KoiInfo />}
    </div>
  );
};

export default PondForm;
