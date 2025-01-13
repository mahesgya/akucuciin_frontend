import React, { useState, useEffect, useRef } from "react";
import "../style/Header.css";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Footer from "./footer";
import SectionHome from "./SectionHome";
import AboutUs from "./aboutUs";
import OurServices from "./ourServices";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const Aboutusref = useRef(null);
  const Homeref = useRef(null);
  const Ourserviceref = useRef(null);
  const Footerref = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header id="Header">
        <div className="container2">
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
              <button className="navbarli" onClick={() => handleScroll(Homeref)}>
                <NavLink className="navbarlix" to="/">
                  Home
                </NavLink>
              </button>
            </li>
            <li>
              <img src="Images/About.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={() => handleScroll(Aboutusref)}>
                <NavLink className="navbarlix" to="/">
                  About Us
                </NavLink>
              </button>
            </li>
            <li>
              <img src="Images/Services.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={() => handleScroll(Ourserviceref)}>
                <NavLink className="navbarlix" to="/">
                  Services
                </NavLink>
              </button>
            </li>
            <li>
              <img src="Images/Contact.png" alt="" className="imgHome" />
              <button className="navbarli" onClick={() => handleScroll(Footerref)}>
                <NavLink className="navbarlix" to="/">
                  Contact
                </NavLink>
              </button>
            </li>
            <div className="navbardiv">
              {isLoggedIn ? (
                <a href="/me" className="">
                  <img alt="profile" src="Images/profile.png" className="w-[4em] pl-4"></img>
                </a>
              ) : (
                <div className="space-x-3 ml-1">
                  <NavLink to="/login">
                    <button className="shadow-md font-sans w-[4rem] bg-blue-500 text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="align-center shadow-md font-sans w-[4rem] bg-gray-de text-gray-52 font-semibold p-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-de focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">
                      Register
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </ul>
        </div>
      </header>
      <SectionHome ref={Homeref} />
      <AboutUs ref={Aboutusref} />
      <OurServices ref={Ourserviceref} />
      <Footer ref={Footerref} />
      <a className="fixed right-4 bottom-4 bg-blue rounded-lg " href="https://wa.me/6285810211200">
        <img alt="waicon" src="Images/waicon.png" className="w-[80px] h-[80px]" />
      </a>
    </div>
  );
};

export default Header;
