import React, { useState } from "react";
import "../style/Header.css";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoSearchCircle } from "react-icons/io5";
import Footer from "./footer";
import SectionHome from "./SectionHome";
import AboutUs from "./aboutUs";

import OurServices from "./ourServices";

const Header = () => {
  const Aboutusref = useRef(null);
  const Homeref = useRef(null);
  const Ourserviceref = useRef(null);
  const Footerref = useRef(null);

  const handleClick = () => {
    Aboutusref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick2 = () => {
    Homeref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick3 = () => {
    Ourserviceref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick4 = () => {
    Footerref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
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
            <div className="divCloseBtn">
              <img src="Images/LogoAkucuciin2.png" alt="" className="logoAkucuciin2" />
              <button className="close-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="navLine"></div>

            <li className="liHome">
              <img src="Images/Home.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={handleClick2}>
                <NavLink to="/">Home</NavLink>
              </button>
            </li>
            <li>
              <img src="Images/About.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={handleClick}>
                <NavLink to="/">About Us</NavLink>
              </button>
            </li>
            <li>
              <img src="Images/Services.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={handleClick3}>
                <NavLink to="/">Services</NavLink>
              </button>
            </li>
            <li>
              <img src="Images/Contact.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={handleClick4}>
                <NavLink to="/">Contact</NavLink>
              </button>
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
      <SectionHome  ref={Homeref}/>
      <AboutUs ref={Aboutusref} />
      <OurServices ref={Ourserviceref}/>
      <Footer ref={Footerref}/>
    </div>
  );
};

export default Header;
