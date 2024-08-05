import React from "react";
import "../style/Location.css";
import { Link, NavLink } from "react-router-dom";
import Footer from "./footer";
import Dragdown from "../Dragdown/Dragdown";

function BabakanLebak() {
  return (
    <div className="location">
      <div className="Location-Top">
        <Link className="liHome" to="/">
          <img src="Images/HomeLaundry.png" alt="" className="imgHomeHP" />
        </Link>
        <div className="Location-TopL">
          <h4 className="h4TopL">Location</h4>
          <h1 className="h1TopL">Babakan Lebak</h1>
          <Dragdown className="Dragdown" />
        </div>
        <div className="Location-TopR">
          '<h4 className="h4TopR">Find Your Best Choice!!</h4>
        </div>
      </div>
      <div className="Location-Container">
        <div className="Location-Box">
          <Link to="/pikashoe" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Pikashoe A.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Pikashoe</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Sepatu + Tas + Helm</p>
                <h4 className="h4box">start from Rp25.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/xtralaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Xtra Laundry.png" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Xtra Laundry</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Pakaian + Sepatu + etc </p>
                <h4 className="h4box">start from Rp4.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/laundrygeulis" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Laundry Geulis.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Laundry Geulis</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Pakaian + Sprei + Boneka + etc</p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link className="locationLink" to="/geaclean">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Gea Clean.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Gea Clean</h3>
                <p className="pbox"> Babakan Lebak</p>
                <p className="pbox"> Pakaian </p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/mutialaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Mutia Laundry 1.png" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Mutia Laundry</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Pakaian + Sepatu </p>
                <h4 className="h4box">start from Rp5.000,00</h4>
              </div>
            </div>
          </Link>
          <Link className="locationLink" to="/babakanlebak">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/LogoAkucuciin2.png" alt="" className="locationLogo" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Coming Soon</h3>
                <p className="pbox"></p>
                <p className="pbox"></p>
                <h4 className="h4box"></h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BabakanLebak;
