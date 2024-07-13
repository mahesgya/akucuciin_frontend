import React, { useState } from "react";
import "../style/Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header id="Header">
      <div className="container">
        <img src="Images/LogoAkucuciin.png" alt="" className="nav-img" />
      </div>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="nav-Login">
        <ul id="navbar" className={menuOpen ? "open" : ""}>
          <li>
            <a className="navbarli">
              <NavLink to="/">Home</NavLink>
            </a>
          </li>
          <li>
            <a className="navbarli">
              <NavLink to="/proker">About Us</NavLink>
            </a>
          </li>
          <li>
            <a className="navbarli">
              <NavLink to="/digmapihelp">Services</NavLink>
            </a>
          </li>
          <li>
            <a className="navbarli">
              <NavLink to="/digmapistore">Contact</NavLink>
            </a>
          </li>
          <div className="navbardiv">
            <a className="signin">
              <NavLink to="/tentang">Sign In</NavLink>
            </a>
          </div>
          <div className="navbardiv1">
            <a className="signup">
              <NavLink to="/tentang">Sign up</NavLink>
            </a>
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Header;
