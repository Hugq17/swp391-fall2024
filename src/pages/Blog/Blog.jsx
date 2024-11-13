import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/blogs/get-all"
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Separate the first blog as featured and the rest as sidebar items
  const [featuredBlog, ...sidebarBlogs] = blogs;

  return (
    <div className="blog-container">
      <div className="featured">
        {featuredBlog && (
          <>
            {featuredBlog.image && (
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="featured-image"
              />
            )}
            <h2 className="featured-title">{featuredBlog.title}</h2>
            <p className="featured-summary">{featuredBlog.summary}</p>
            <Link to={`/blog/${featuredBlog.id}`} className="read-more">
              Đọc thêm
            </Link>
          </>
        )}
      </div>
      <div className="sidebar">
        {sidebarBlogs.map((blog) => (
          <div className="sidebar-item" key={blog.id}>
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="sidebar-image"
              />
            )}
            <Link to={`/blog/${blog.id}`} className="sidebar-title">
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
