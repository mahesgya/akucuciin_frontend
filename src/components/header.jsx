import React, { useState , useEffect,useRef } from "react";
import "../style/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Footer from "./footer";
import SectionHome from "./SectionHome";
import AboutUs from "./aboutUs";

import OurServices from "./ourServices";

const Header = () => {
  const [error, setError] = useState(null);

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
          setError("");
        })
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken) {
      axios
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/logout`, {
          refresh_token: refreshToken,
        })
        .then((response) => {
          setError(null);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          delete axios.defaults.headers.common["Authorization"];
          setIsLoggedIn(false);
          window.location.reload()
        })
        .catch((error) => {
          console.error("Logout gagal:", error);
          setError("Gagal logout");
        });
    } else {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    }
  };

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
              {isLoggedIn ? (
                <button onClick={handleLogout} className="shadow-md font-sans w-[100px]  md:w-[130px] lg:w-[160px]  bg-red-500 text-white font-semibold px-1 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Log Out
                </button>
              ) : (
                <div className="space-x-3 ml-1">
                  <NavLink to="/login">
                    <button href="" className="shadow-md font-sans w-[4rem] bg-blue-500 text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">
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
    </div>
  );
};

export default Header;
