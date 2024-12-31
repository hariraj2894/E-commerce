import React, { useState } from "react";
import { Link } from "react-router-dom";
import  { memo } from 'react';

import "../styles/Navbar.css"; // Importing the CSS file

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Get the user's role and token from localStorage
  const role = localStorage.getItem("role"); // Can be 'user' or 'admin'
  const token = localStorage.getItem("token");

  // Logout function
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("isadmin");
    localStorage.removeItem("artid");
    localStorage.removeItem("user");
    localStorage.removeItem("allowCOD");
    localStorage.removeItem("admin");
    localStorage.removeItem("artisanIdproduct");
    localStorage.removeItem('cart');
    localStorage.removeItem('adminId');
    localStorage.removeItem('name');

    window.location.href = '/'; // Redirect to home page or login page
  };

  // Links for normal users (logged in users)
  const userLinks = (
    <>
      <li>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      </li>
      <li>
        <Link to="/productsList" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
      </li>
      <li>
        <Link to="/your-profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
      </li>
      <li>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </li>
      <li>
        <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart <i className="fas fa-shopping-cart"></i></Link>
      </li>
      <li>
        <button className="logout-button" onClick={logout}>Logout</button>
      </li>
    </>
  );

  // Links for admins
  const adminLinks = (
    <>
      <li>
        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
      </li>
      <li>
        <button className="logout-button" onClick={logout}>Logout</button>
      </li>
    </>
  );

  // Links for guests (not logged in)
  const guestLinks = (
    <>
      <li>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      </li>
      <li>
        <Link to="/productsList" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
      </li>
      <li>
        <Link to="/user-register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
      </li>
      <li>
        <Link to="/user-login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
      </li>
      <li>
        <Link to= '/artisian-login' onClick={() => setIsMobileMenuOpen(false)}>Seller Login</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">E-Shopping 🛒</Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={isMobileMenuOpen ? "nav-links active" : "nav-links"}>
        {/* Display links based on login status and role */}
        {token ? (
          role === "artisan" ? adminLinks : userLinks
        ) : (
          guestLinks
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
