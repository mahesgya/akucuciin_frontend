import React from "react";
import "../style/Location.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Dragdown from "../Dragdown/Dragdown";

function BabakanLio() {
  return (
    <div className="location">
      <div className="Location-Top">
      <Link className="liHome" to="/">
          <img src="Images/HomeLaundry.png" alt="" className="imgHomeHP" />
        </Link>
        <div className="Location-TopL">
          <h4 className="h4TopL">Location</h4>
          <h1 className="h1TopL">Babakan Lio</h1>
          <Dragdown className="Dragdown" />
        </div>
        <div className="Location-TopR">
          '<h4 className="h4TopR">Find Your Best Choice!!</h4>
        </div>
      </div>
      <div className="Location-Container">
        <div className="Location-Box">
          <Link to="/juragankucek" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Juragan Kucek.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Juragan Kucek</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Sepatu</p>
                <h4 className="h4box">start from Rp7.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/ridholaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Ridho Laundry.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Ridho Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Sepatu </p>
                <h4 className="h4box">start from Rp5.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/ditalaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Dita Laundry.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Dita Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Tas + Bed Cover + etc</p>
                <h4 className="h4box">start from Rp5.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/berkahlaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Berkah Laundry C.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Berkah Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Sepatu + Tas + etc</p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/mutiaralaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Mutiara Laundry.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Mutiara Ratu Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Tas + Bed Cover + etc</p>
                <h4 className="h4box">start from Rp5.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/extralaundry2" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Extra Laundry B.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Extra Laundry Dua</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Sprei + Gorden + etc</p>
                <h4 className="h4box">start from Rp4.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/hslaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/HS Laundry A.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">HS Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Sepatu</p>
                <h4 className="h4box">start from Rp6.000,00</h4>
              </div>
            </div>
          </Link>
          <Link to="/azriillaundry" className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/Azriil Laundry Harga.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Azzril Laundry</h3>
                <p className="pbox">Babakan Lio</p>
                <p className="pbox">Pakaian + Jas + Sepatu + etc</p>
                <h4 className="h4box">start from Rp4.000,00</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BabakanLio;
