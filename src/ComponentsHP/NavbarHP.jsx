import React, { useState } from "react";
import "../style/Header.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoSearchCircle } from "react-icons/io5";

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
            <img src="Images/LogoAkucuciin2.png" alt="" className="logoAkucuciin2" />
            <button className="close-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <AiOutlineClose className="closeX" />
            </button>
          </div>
          <div className="navLine"></div>
          
          <li className="liHome">
            <img src="Images/Home.png" alt="" className="imgHome" />
            <a className="navbarli">
              <NavLink to="/">Home</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/About.png" alt="" className="imgHome" />
            <a className="navbarli">
              <NavLink to="/aboutushp">About Us</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Services.png" alt="" className="imgHome" />
            <a className="navbarli">
              <NavLink to="/serviceshp">Services</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Contact.png" alt="" className="imgHome" />
            <a className="navbarli" >
              <a href="https://www.instagram.com/akucuciin.id/" >Contact</a>
            </a>
          </li>
          <div className="navbardiv">
            <a className="signin">
              <NavLink to="/location">Search Laundry</NavLink>
              <IoSearchCircle className="IoSearch" />
            </a>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default NavbarHP;
