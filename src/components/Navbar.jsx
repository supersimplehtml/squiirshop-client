import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import logo from "../assets/squirshop.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.replace("/login" );
  };

  return (
    <nav className="relative p-4 z-[999]" style={{  background: 'linear-gradient(270deg, #240046 0%, #ff6d00 100%)'}}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Image */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Squirshop Logo" className="h-[60px] w-[60px] rounded-full" />
          <span className="text-3xl font-bold text-[#ff9e00]">Squirshop</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center space-x-6">
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/" ? "text-[#ff8500]" : "text-white"
            } hover:text-[#ff7900]`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-link ${
              location.pathname === "/products" ? "text-[#ff8500]" : "text-white"
            } hover:text-[#ff7900]`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              location.pathname === "/contact" ? "text-[#ff8500]" : "text-white"
            } hover:text-[#ff7900]`}
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={`nav-link ${
                  location.pathname === "/profile" ? "text-[#ff8500]" : "text-white"
                } hover:text-[#ff7900]`}
              >
                Profile
              </Link>
              <Link
                to="/cart"
                className={`nav-link ${
                  location.pathname === "/cart" ? "text-[#ff8500]" : "text-white"
                } hover:text-[#ff7900]`}
              >
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#ff8500] text-white px-4 py-2 rounded-md hover:bg-[#ff9100]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-[#ff8500] text-white px-4 py-2 rounded-md hover:bg-[#ff9100]"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-purple-950 text-white px-4 py-2 rounded-md hover:bg-purple-800"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon with Framer Motion */}
        <motion.button
          onClick={toggleMenu}
          className="text-[#ff9e00] text-3xl md:hidden focus:outline-none"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className="ri-menu-3-line" />
        </motion.button>

        {/* Mobile Menu with Slide Down Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-[#240046] bg-opacity-95 flex flex-col items-center space-y-6 md:hidden py-6"
            >
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white hover:text-[#ff8500]"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white hover:text-[#ff8500]"
              >
                Products
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-white hover:text-[#ff8500]"
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl text-white hover:text-[#ff8500]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-2xl text-white bg-[#ff8500] px-4 py-2 rounded-md hover:bg-[#ff9100]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl text-white bg-[#ff8500] px-4 py-2 rounded-md hover:bg-[#ff9100]"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl text-white bg-purple-950 px-4 py-2 rounded-md hover:bg-purple-800"
                  >
                    Login
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
