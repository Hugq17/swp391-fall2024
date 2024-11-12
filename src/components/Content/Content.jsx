import React, { useState, useEffect } from "react";
import "./Content.css";
import axios from "axios";
import thietbibeca from "../../assets/thietbibeca.jpg";
import phukientrangtribeca from "../../assets/phukientrangtribeca.png";
import thucanchoca from "../../assets/thucanchoca.jpg";
import thuoccakoi from "../../assets/thuoccakoi.jpg";
import hoca from "../../assets/hoca.jpg";
const Content = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-server.azurewebsites.net/api/blogs/get-all"
        );
        setBlogs(response.data.blogs.slice(0, 5)); // Lấy 5 bài viết đầu tiên
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
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
      <div className="card-product">
        {blogs.map((blog, index) => (
          <div className="card-product-child" key={blog.id}>
            <img
              className="imgProduct"
              src={blog.image}
              alt={`Bài viết ${index + 1}`}
            />
            <div className="card-content-child">{blog.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
