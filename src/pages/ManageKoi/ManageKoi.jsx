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

  const [tankInfo, setTankInfo] = useState({
    currentNo2: "",
    currentNo3: "",
    currentPo4: "",
    currentPh: "",
    currentOxygen: "",
    tankSize: "",
    salt: "",
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleKoiChange = (e) => {
    const { name, value } = e.target;
    setKoiInfo({
      ...koiInfo,
      [name]: value,
    });
  };

  const handleTankChange = (e) => {
    const { name, value } = e.target;
    setTankInfo({
      ...tankInfo,
      [name]: value,
    });
  };

  const calculateRecommendations = () => {
    setLoading(true); // Bắt đầu quá trình tải
    setRecommendations(null); // Xóa dữ liệu cũ (nếu có)

    // Giả lập thời gian tải 3 giây
    setTimeout(() => {
      const {
        currentNo2,
        currentNo3,
        currentPo4,
        currentPh,
        currentOxygen,
        tankSize,
        salt,
      } = tankInfo;

      const advice = {
        no2:
          currentNo2 > 1
            ? "Nồng độ NO2 quá cao, cần giảm xuống dưới 1 ppm."
            : "NO2 ở mức an toàn.",
        no3:
          currentNo3 > 25
            ? "Nồng độ NO3 quá cao, cần thay nước để giảm xuống dưới 25 ppm."
            : "NO3 ở mức an toàn.",
        po4:
          currentPo4 > 0.5
            ? "Nồng độ PO4 cao, có thể gây tảo, nên giảm xuống dưới 0.5 ppm."
            : "PO4 ổn định.",
        ph:
          currentPh < 7.5 || currentPh > 8.5
            ? "Độ pH không phù hợp, cần duy trì trong khoảng 7.5 - 8.5."
            : "pH phù hợp.",
        oxygen:
          currentOxygen < 6
            ? "Lượng oxy thấp, cần tăng cường hệ thống sục khí."
            : "Oxy đủ cho cá.",
        tankSize:
          tankSize < koiInfo.size * 10
            ? "Kích thước hồ chưa đủ rộng cho cá Koi, cần hồ lớn hơn."
            : "Kích thước hồ phù hợp.",
        salt:
          salt < koiInfo.weight / 100
            ? "Lượng muối cần thêm để phù hợp với cân nặng của cá."
            : "Lượng muối đủ.",
      };

      setRecommendations(advice); // Cập nhật dữ liệu lời khuyên
      setLoading(false); // Kết thúc quá trình tải
    }, 3000); // Thời gian chờ 3 giây
  };

  return (
    <div className="koi-form-container">
      <h2>CÁ VÀ THÔNG TIN HỒ</h2>
      <div className="koi-form-wrapper">
        {/* Phần nhập liệu về cá Koi */}
        <div className="koi-form">
          <h3>Thông tin về cá Koi</h3>
          <div className="input-group">
            <label htmlFor="name">Tên cá Koi</label>
            <input
              type="text"
              name="name"
              value={koiInfo.name}
              onChange={handleKoiChange}
              placeholder="Tên cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Tuổi cá Koi</label>
            <input
              type="number"
              name="age"
              value={koiInfo.age}
              onChange={handleKoiChange}
              placeholder="Tuổi cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="size">Kích thước cá Koi (cm)</label>
            <input
              type="number"
              name="size"
              value={koiInfo.size}
              onChange={handleKoiChange}
              placeholder="Kích thước cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Cân nặng cá Koi (kg)</label>
            <input
              type="number"
              name="weight"
              value={koiInfo.weight}
              onChange={handleKoiChange}
              placeholder="Cân nặng cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Giới tính</label>
            <input
              type="text"
              name="gender"
              value={koiInfo.gender}
              onChange={handleKoiChange}
              placeholder="Giới tính cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="origin">Nguồn gốc</label>
            <input
              type="text"
              name="origin"
              value={koiInfo.origin}
              onChange={handleKoiChange}
              placeholder="Nguồn gốc cá Koi"
            />
          </div>
          <div className="input-group">
            <label htmlFor="breed">Giống cá</label>
            <input
              type="text"
              name="breed"
              value={koiInfo.breed}
              onChange={handleKoiChange}
              placeholder="Giống cá Koi"
            />
          </div>
        </div>

        {/* Phần nhập liệu về tình trạng nước hiện tại */}
        <div className="tank-form">
          <h3>Tình trạng nước hiện tại của hồ</h3>
          <div className="input-group">
            <label htmlFor="currentNo2">Nồng độ NO2 (ppm)</label>
            <input
              type="number"
              name="currentNo2"
              value={tankInfo.currentNo2}
              onChange={handleTankChange}
              placeholder="Nồng độ NO2"
            />
          </div>
          <div className="input-group">
            <label htmlFor="currentNo3">Nồng độ NO3 (ppm)</label>
            <input
              type="number"
              name="currentNo3"
              value={tankInfo.currentNo3}
              onChange={handleTankChange}
              placeholder="Nồng độ NO3"
            />
          </div>
          <div className="input-group">
            <label htmlFor="currentPo4">Nồng độ PO4 (ppm)</label>
            <input
              type="number"
              name="currentPo4"
              value={tankInfo.currentPo4}
              onChange={handleTankChange}
              placeholder="Nồng độ PO4"
            />
          </div>
          <div className="input-group">
            <label htmlFor="currentPh">Độ pH</label>
            <input
              type="number"
              name="currentPh"
              value={tankInfo.currentPh}
              onChange={handleTankChange}
              placeholder="Độ pH"
            />
          </div>
          <div className="input-group">
            <label htmlFor="currentOxygen">Nồng độ Oxy (mg/L)</label>
            <input
              type="number"
              name="currentOxygen"
              value={tankInfo.currentOxygen}
              onChange={handleTankChange}
              placeholder="Nồng độ Oxy"
            />
          </div>
          <div className="input-group">
            <label htmlFor="tankSize">Kích thước hồ (lít)</label>
            <input
              type="number"
              name="tankSize"
              value={tankInfo.tankSize}
              onChange={handleTankChange}
              placeholder="Kích thước hồ"
            />
          </div>
          <div className="input-group">
            <label htmlFor="salt">Lượng muối hiện tại (kg)</label>
            <input
              type="number"
              name="salt"
              value={tankInfo.salt}
              onChange={handleTankChange}
              placeholder="Lượng muối"
            />
          </div>

          <button
            className="calculate-button"
            onClick={calculateRecommendations}
            disabled={loading}
          >
            {loading ? "Đang tính toán..." : "Tính toán"}
          </button>
        </div>
      </div>

      {/* Phần hiển thị lời khuyên */}
      <div className="koi-care-info">
        {loading ? (
          <div className="loading-message">Đang tải dữ liệu...</div>
        ) : (
          recommendations && (
            <>
              <h3>Lời khuyên cho hồ cá của bạn</h3>
              <p>
                <strong>NO2:</strong> {recommendations.no2}
              </p>
              <p>
                <strong>NO3:</strong> {recommendations.no3}
              </p>
              <p>
                <strong>PO4:</strong> {recommendations.po4}
              </p>
              <p>
                <strong>pH:</strong> {recommendations.ph}
              </p>
              <p>
                <strong>Oxygen:</strong> {recommendations.oxygen}
              </p>
              <p>
                <strong>Kích thước hồ:</strong> {recommendations.tankSize}
              </p>
              <p>
                <strong>Lượng muối:</strong> {recommendations.salt}
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default KoiForm;
