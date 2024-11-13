import React, { useState, useEffect } from "react";
import "./Content.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
const Content = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/blogs/get-all"
        );
        setBlogs(response.data.blogs.slice(0, 5)); // Lấy 5 bài viết đầu tiên
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/category/get-all"
        );
        setCategories(response.data.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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
      <div className="card-product">
        {categories.map((category) => (
          <div className="card-product-child" key={category.id}>
            <img
              className="imgProduct"
              src={category.imageUrl}
              alt={category.name}
            />
            <div className="card-content-child">{category.name}</div>
          </div>
        ))}
      </div>
      <div class="title-container">
        <div className="title-container">
          <hr className="line" />
          <h2 className="title-text">Chia sẻ kinh nghiệm</h2>
          <hr className="line" />
        </div>
      </div>
      <div className="card-product">
        {blogs.map((blog) => (
          <div className="card-product-child" key={blog.id}>
            <Link to={`/blog/${blog.id}`}>
              <img className="imgProduct" src={blog.image} alt={blog.title} />
              <div className="card-content-child">{blog.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
