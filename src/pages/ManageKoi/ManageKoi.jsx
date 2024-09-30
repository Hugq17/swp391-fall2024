import React, { useState } from "react";
import "./KoiForm.css"; // CSS tùy chỉnh cho form

const KoiForm = () => {
  const [koiInfo, setKoiInfo] = useState({
    name: "",
    age: "",
    size: "",
    weight: "",
    gender: "",
    origin: "",
    breed: "",
  });

  const [koiCare, setKoiCare] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKoiInfo({
      ...koiInfo,
      [name]: value,
    });
  };

  const calculateCare = () => {
    setLoading(true); // Bắt đầu quá trình tải
    setKoiCare(null); // Xóa dữ liệu cũ (nếu có)

    // Giả lập thời gian tải 3 giây
    setTimeout(() => {
      // Giả định tính toán các chỉ số dựa trên thông tin nhập vào (có thể thay thế bằng công thức thực tế)
      const { size, weight } = koiInfo;
      const care = {
        tankSize: size * 10 + " liters", // Kích thước hồ dựa trên kích thước cá
        salt: weight / 100 + " kg", // Lượng muối cần thiết
        no3: "25 ppm", // Nồng độ NO3 giả định
        no2: "1 ppm", // Nồng độ NO2 giả định
        oxygen: "6 mg/L", // Oxy phù hợp
        po4: "0.5 ppm", // Nồng độ PO4 giả định
        ph: "7.5 - 8.5", // Độ pH
      };

      setKoiCare(care); // Cập nhật dữ liệu chăm sóc cá
      setLoading(false); // Kết thúc quá trình tải
    }, 3000); // Thời gian chờ 3 giây
  };

  return (
    <div className="koi-form-container">
      <h2>Thông tin cá Koi</h2>
      <div className="koi-form-wrapper">
        {/* Phần nhập liệu */}
        <div className="koi-form">
          <div className="input-group">
            <label htmlFor="name">Tên cá Koi</label>
            <input
              type="text"
              name="name"
              value={koiInfo.name}
              onChange={handleChange}
              placeholder="Tên cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Tuổi cá Koi</label>
            <input
              type="number"
              name="age"
              value={koiInfo.age}
              onChange={handleChange}
              placeholder="Tuổi cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="size">Kích thước cá Koi (cm)</label>
            <input
              type="number"
              name="size"
              value={koiInfo.size}
              onChange={handleChange}
              placeholder="Kích thước cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Cân nặng cá Koi (kg)</label>
            <input
              type="number"
              name="weight"
              value={koiInfo.weight}
              onChange={handleChange}
              placeholder="Cân nặng cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Giới tính</label>
            <select
              name="gender"
              value={koiInfo.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Đực</option>
              <option value="Female">Cái</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="origin">Nguồn gốc</label>
            <input
              type="text"
              name="origin"
              value={koiInfo.origin}
              onChange={handleChange}
              placeholder="Nguồn gốc cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="breed">Giống cá Koi</label>
            <input
              type="text"
              name="breed"
              value={koiInfo.breed}
              onChange={handleChange}
              placeholder="Giống cá Koi"
            />
          </div>
          <button
            className="calculate-button"
            onClick={calculateCare}
            disabled={loading}
          >
            {loading ? "Đang tính toán..." : "Tính toán"}
          </button>
        </div>

        {/* Phần hiển thị thông tin */}
        <div className="koi-care-info">
          {loading ? (
            <div className="loading-message">Đang tải dữ liệu...</div>
          ) : (
            koiCare && (
              <>
                <h3>Thông tin chăm sóc cho cá Koi</h3>
                <p>Kích thước hồ: {koiCare.tankSize}</p>
                <p>Lượng muối cần: {koiCare.salt}</p>
                <p>Nồng độ NO3: {koiCare.no3}</p>
                <p>Nồng độ NO2: {koiCare.no2}</p>
                <p>Oxy cần thiết: {koiCare.oxygen}</p>
                <p>Nồng độ PO4: {koiCare.po4}</p>
                <p>Độ pH phù hợp: {koiCare.ph}</p>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default KoiForm;
