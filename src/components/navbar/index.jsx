import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

import "../../style/Header.css";

import Footer from "../footer/index";
import Home from "../../pages/home";
import AboutUs from "../../pages/about/index"
import OurServices from "../../pages/service/index"

import { useSelector } from "react-redux";

const Navbar = () => {
  const {isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const Aboutusref = useRef(null);
  const Homeref = useRef(null);
  const Ourserviceref = useRef(null);
  const Footerref = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justif`1 y-center">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

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
            <li>
              <img src="Images/privacy.png" alt="" className="imgHome" />
              <button className="navbarli">
                <NavLink className="navbarlix" to="/privacy-policy">
                  Privacy
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
                    <button className="shadow-md font-sans w-[4rem] bg-blue-500 text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">Login</button>
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
      <Home ref={Homeref} />
      <AboutUs ref={Aboutusref} />
      <OurServices ref={Ourserviceref} />
      <Footer ref={Footerref} />
      <a className="fixed right-4 bottom-4 bg-blue rounded-lg " href="https://wa.me/6285810211200">
        <img alt="waicon" src="Images/waicon.png" className="w-[80px] h-[80px]" />
      </a>
    </div>
  );
};

export default Navbar;
