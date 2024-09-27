import React from "react";
import "./Content.css";
import ImageCard from "../ImageCard/ImageCard";
import { assets } from "./../../assets/assets";

const imageData = [
  {
    src: "src/assets/koitank.jpg",
    title: "Hồ cá",
  },
  { src: "src/assets/koitank.jpg", title: "Đồ lọc bể" },
  { src: "src/assets/koitank.jpg", title: "Đá lọc" },
  { src: "src/assets/koitank.jpg", title: "Cây cảnh & đồ trang trí" },
];

const Content = () => {
  return (
    <div>
      <div class="card-container">
        <div class="card">
          <div class="card-content">Uy tín hàng đầu</div>
        </div>
        <div class="card">
          <div class="card-content">Giá cả phù hợp</div>
        </div>
        <div class="card">
          <div class="card-content">Tư vấn nhiệt tình</div>
        </div>
        <div class="card">
          <div class="card-content">Đa dạng hàng hóa</div>
        </div>
      </div>
      <div class="title-container">
        <div className="title-container">
          <hr className="line" />
          <h2 className="title-text">Phụ kiện nuôi cá</h2>
          <hr className="line" />
        </div>
      </div>

      <div class="card-product">
        <div class="card-product-child">
          <img class="imgProduct" src="src/assets/koitank.jpg" />
          <div class="card-content-child">Hồ cá</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src="src/assets/dolocbe.jpg" />
          <div class="card-content-child">Đồ lọc bể</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src="src/assets/thuocca.jpg" />
          <div class="card-content-child">Thuốc cá</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src="src/assets/caycanh.jpg" />
          <div class="card-content-child">Cây cảnh & đồ trang trí</div>
        </div>
      </div>
    </div>
  );
};

export default Content;
