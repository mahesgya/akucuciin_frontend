import React from "react";
import "../style/Location.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Dragdown from "../Dragdown/Dragdown";

function BabakanTengah() {
  return (
    <div className="location">
      <div className="Location-Top">
      <Link className="liHome" to="/">
          <img src="Images/HomeLaundry.png" alt="" className="imgHomeHP" />
        </Link>
        <div className="Location-TopL">
          <h4 className="h4TopL">Location</h4>
          <h1 className="h1TopL">Babakan Tengah</h1>
          <Dragdown className="Dragdown" />
        </div>
        <div className="Location-TopR">
          '<h4 className="h4TopR">Find Your Best Choice!!</h4>
        </div>
      </div>
      <div className="Location-Container">
        <div className="Location-Box">
          <Link to="/castlelaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/CastleLaundryA.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Castle Laundry</h3>
                <p className="pbox">Babakan Tengah</p>
                <p className="pbox">Pakaian + Sepatu + Helm + etc</p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/goodlaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Good Laundry B.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Good Laundry</h3>
                <p className="pbox">Babakan Tengah</p>
                <p className="pbox">Pakaian</p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/eternity" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Eternity google.png" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Eternity Shoe n Care</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Sepatu + Tas + Helmet + etc</p>
                <h4 className="h4box">start from Rp20.000,00</h4>
              </div>
            </div>
          </Link>
          <Link className="locationLink" to='/babakantengah'>
            <div className="divbox">
              <div className="boximg">
              <img src="Images/LogoAkucuciin2.png" alt="" className="locationLogo"/>
              </div>
              <div className="divboxA">
                <h3 className="h3box">Coming Soon</h3>
                <p className="pbox"></p>
                <p className="pbox"></p>
                <h4 className="h4box"></h4>
              </div>
            </div>
          </Link>
          <Link className="locationLink" to='/babakantengah'>
            <div className="divbox">
              <div className="boximg">
              <img src="Images/LogoAkucuciin2.png" alt="" className="locationLogo"/>
              </div>
              <div className="divboxA">
                <h3 className="h3box">Coming Soon</h3>
                <p className="pbox"></p>
                <p className="pbox"></p>
                <h4 className="h4box"></h4>
              </div>
            </div>
          </Link>
          <Link className="locationLink" to='/babakantengah'>
            <div className="divbox">
              <div className="boximg">
              <img src="Images/LogoAkucuciin2.png" alt="" className="locationLogo"/>
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

export default BabakanTengah;
