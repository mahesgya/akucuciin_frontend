import React, { useState , useEffect } from "react";
import axios from "axios";
import { NavLink , useNavigate} from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../style/Header.css";

const NavbarHP = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
              <NavLink to="/aboutus">About Us</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Services.png" alt="" className="imgHome" />
            <a className="navbarli">
              <NavLink to="/services">Services</NavLink>
            </a>
          </li>
          <li>
            <img src="Images/Contact.png" alt="" className="imgHome" />
            <a className="navbarli" >
              <a href="https://www.instagram.com/akucuciin.id/" >Contact</a>
            </a>
          </li>
          <div className="navbardiv">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="shadow-md font-sans w-[140px]  md:w-[160px] lg:w-[200px]  bg-red-500 text-white font-semibold px-1 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Log Out
                </button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <NavLink to="/login">
                    <button href="" className="shadow-md font-sans w-[140px]  md:w-[160px] lg:w-[200px]  bg-blue-500 text-white font-semibold px-1 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="shadow-md font-sans w-[140px] md:w-[160px] lg:w-[200px] bg-gray-de text-gray-52 font-semibold px-1 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-de focus:ring-offset-2 ">
                      Register
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
        </ul>
      </div>
    </header>
  );
};

export default NavbarHP;
