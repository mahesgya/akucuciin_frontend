import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../../style/Header.css";

const NavbarHP = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="Header">
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="nav-Login">
        <ul id="navbar" className={menuOpen ? "open" : ""}>
          <div className="divCloseBtn">
            <img src="Images/LogoAkucuciin2.png" alt="" className="mt-2 ml-2 w-8" />
            <button className="close-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <AiOutlineClose className="closeX" />
            </button>
          </div>
          <div className="navLine"></div>
          <li className="liHome">
            <img src="Images/Home.png" alt="" className="imgHome" />
            <a href="/" className="navbarli">
              <NavLink to="/">Home</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/About.png" alt="" className="imgHome" />
            <a href="/aboutus" className="navbarli">
              <NavLink to="/aboutus">About Us</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Services.png" alt="" className="imgHome" />
            <a href="/services" className="navbarli">
              <NavLink to="/services">Services</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Contact.png" alt="" className="imgHome" />
            <a href="https://www.instagram.com/akucuciin.id/" className="navbarli">
              <a href="https://www.instagram.com/akucuciin.id/">Contact</a>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavbarHP;
