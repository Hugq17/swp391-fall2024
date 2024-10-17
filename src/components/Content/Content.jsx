import React from "react";
import "./Content.css";
import thietbibeca from "../../assets/thietbibeca.jpg";
import phukientrangtribeca from "../../assets/phukientrangtribeca.png";
import thucanchoca from "../../assets/thucanchoca.jpg";
import thuoccakoi from "../../assets/thuoccakoi.jpg";
import hoca from "../../assets/hoca.jpg";
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
          <img class="imgProduct" src={hoca} />
          <div class="card-content-child">Thiết bị bể cá</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src={phukientrangtribeca} />
          <div class="card-content-child">Phụ kiện trang trí</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src={thucanchoca} />
          <div class="card-content-child">Thức ăn cho cá</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src={thuoccakoi} />
          <div class="card-content-child">Thuốc và chất xử lý nước</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" src={thietbibeca} />
          <div class="card-content-child">Dụng cụ bảo dưỡng</div>
        </div>
      </div>
      <div class="title-container">
        <div className="title-container">
          <hr className="line" />
          <h2 className="title-text">Chia sẻ kinh nghiệm</h2>
          <hr className="line" />
        </div>
      </div>
      <div class="card-product">
        <div class="card-product-child">
          <img class="imgProduct" />
          <div class="card-content-child">Bài viết 1</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" />
          <div class="card-content-child">Bài viết 2</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" />
          <div class="card-content-child">Bài viết 3</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" />
          <div class="card-content-child">Bài viết 4</div>
        </div>
        <div class="card-product-child">
          <img class="imgProduct" />
          <div class="card-content-child">Bài viết 5</div>
        </div>
      </div>
    </div>
  );
};

export default Content;
