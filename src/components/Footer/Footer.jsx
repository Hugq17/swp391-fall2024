import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaTruck,
  FaExchangeAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";
function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Thông tin liên hệ</h4>
              <ul>
                <li>
                  <FaMapMarkerAlt /> Địa chỉ: 123 Nguyễn Văn Cừ, Q.1, TP.HCM
                </li>
                <li>
                  <FaPhoneAlt /> Số điện thoại: 0123 456 789
                </li>
                <li>
                  <FaEnvelope /> Email: koiking@gmail.com
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Chính sách</h4>
              <ul>
                <li>
                  <FaShieldAlt /> Chính sách bảo mật
                </li>
                <li>
                  <FaTruck /> Chính sách giao hàng
                </li>
                <li>
                  <FaExchangeAlt /> Chính sách đổi trả
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Mạng xã hội</h4>
              <ul>
                <li>
                  <FaFacebookF />{" "}
                  <a href="https://www.facebook.com/hugq17" target="_blank">
                    Facebook
                  </a>
                </li>
                <li>
                  <FaInstagram />{" "}
                  <a
                    href="https://www.instagram.com/nobihug17/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <FaTwitter />{" "}
                  <a href="https://x.com/?lang=vi" target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 Bản quyền của KoiKing.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
