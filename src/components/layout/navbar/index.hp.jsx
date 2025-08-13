import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../../style/Header.css";

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
              <p >Home</p>
            </a>
          </li>
          <li>
            <img src="Images/About.png" alt="" className="imgHome" />
            <a href="/aboutus" className="navbarli">
              <p>About Us</p>
            </a>
          </li>
          <li>
            <img src="Images/Services.png" alt="" className="imgHome" />
            <a href="/services" className="navbarli">
              <p>Services</p>
            </a>
          </li>
          <li>
            <img src="Images/Contact.png" alt="" className="imgHome" />
            <a href="https://www.instagram.com/akucuciin.id/" className="navbarli">
              <p>Contact</p>
            </a>
          </li>
          <li>
            <img src="Images/privacy.png" alt="" className="imgHome" />
            <a href="/privacy-policy" className="navbarli">
              <p>Privacy</p>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavbarHP;
