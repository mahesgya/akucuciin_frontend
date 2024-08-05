import React from "react";
import "./HomeHP.css";
import { Link } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import NavbarHP from "./NavbarHP";

function HomeHP() {
  return (
    <div id="HomeHP">
      <NavbarHP/>
      <section id="SectionHomeHP">
        <div className="container-homeHP">
          <img src="Images/LogoAkucuciin.png" alt="" className="LogoHomeHP" />
          <h2 className="gasempetHP">
            Ga Sempet Nyuci? <br /> sini <span>Aku Cuciin</span>
          </h2>
          <img src="Images/Mesin Cuci HP.png" alt="" className="mesincuciHP" />
          <div className="section-login">
            <Link to="/location">
              <a href="" className="signinHP ">
                Search Laundry
                <IoSearchCircle className="IoSearch" />
              </a>
            </Link>
          </div>
          <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
        </div>
      </section>
    </div>
  );
}

export default HomeHP;
