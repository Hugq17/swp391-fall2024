import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Blog from "./pages/Blog/Blog";
import ManageKoiAndTank from "./pages/ManageKoi/ManageKoiAndTank";
import Store from "./pages/Store/Store";
import Login from "./pages/Login/Login";
import BlogDetail from "./pages/Blog/BlogDetail";
import Register from "./pages/Register/Register";
import SuccessPage from "./pages/Cart/SuccessPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ManageOrders from "./pages/Orders/Orders";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/Managekoiandtank" element={<ManageKoiAndTank />} />
          <Route path="/store" element={<Store />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/manageOrders" element={<ManageOrders />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
