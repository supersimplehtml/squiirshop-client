import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import HomePage from "./pages/HomePage";
import StartBusinessForm from "./components/StartBusiness";

import ProductManager from "./components/ProductManager";
import ProductFeed from "./components/Products";
import CartPage from "./components/Cart";
import OrderSuccess from "./components/OrderSucces";
import BusinessProfile from "./components/Business";
import Orders from "./components/Orders";

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Clean up
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="app h-[100%] overflow-hidden z-0" data-scroll-container ref={scrollRef}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/start-business" element={<StartBusinessForm />} />
          <Route path="/product-manager" element={<ProductManager />} />
          <Route path="/products" element={<ProductFeed />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/business/profile" element={<BusinessProfile />} />
          <Route path="/orders" element={<Orders/>} />
    
        </Routes>
      </Router>
    </div>
  );
};

export default App;
