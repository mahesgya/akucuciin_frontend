import React from "react";
import "../style/Location.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Dragdown from "../Dragdown/Dragdown";

function Cangkurawok() {
  return (
    <div className="location">
      <div className="Location-Top">
      <Link className="liHome" to="/">
          <img src="Images/HomeLaundry.png" alt="" className="imgHomeHP" />
        </Link>
        <div className="Location-TopL">
          <h4 className="h4TopL">Location</h4>
          <h1 className="h1TopL">Babakan Raya</h1>
          <Dragdown className="Dragdown" />
        </div>
        <div className="Location-TopR">
          '<h4 className="h4TopR">Find Your Best Choice!!</h4>
        </div>
      </div>
      <div className="Location-Container">
        <div className="Location-Box">
          <Link to='/castlelaundry' className="locationLink">
            <div className="divbox">
              <div className="boximg">
                <img src="Images/CastleLaundryA.jpg" alt="" />
              </div>
              <div className="divboxA">
                <h3 className="h3box">Castle Laundry</h3>
                <p className="pbox">Babakan Lebak</p>
                <p className="pbox">Baju + Sepatu + Karpet</p>
                <h4 className="h4box">start from Rp.5000,00</h4>
              </div>
            </div>
          </Link>
          <Link to='/' className="locationLink">
          <div className="divbox">
            <div className="boximg">
              <img src="Images/CastleLaundryA.jpg" alt="" />
            </div>
            <div className="divboxA">
              <h3 className="h3box">Castle Laundry</h3>
              <p className="pbox">Babakan Lebak</p>
              <p className="pbox">Baju + Sepatu + Karpet</p>
              <h4 className="h4box">start from Rp.5000,00</h4>
            </div>
          </div>
          </Link>
          <Link className="locationLink">
          <div className="divbox">
            <div className="boximg">
              <img src="Images/CastleLaundryA.jpg" alt="" />
            </div>
            <div className="divboxA">
              <h3 className="h3box">Castle Laundry</h3>
              <p className="pbox">Babakan Lebak</p>
              <p className="pbox">Baju + Sepatu + Karpet</p>
              <h4 className="h4box">start from Rp.5000,00</h4>
            </div>
          </div>
          </Link>
          <Link className="locationLink"> 
          <div className="divbox">
            <div className="boximg">
              <img src="Images/CastleLaundryA.jpg" alt="" />
            </div>
            <div className="divboxA">
              <h3 className="h3box">Castle Laundry</h3>
              <p className="pbox">Babakan Lebak</p>
              <p className="pbox">Baju + Sepatu + Karpet</p>
              <h4 className="h4box">start from Rp.5000,00</h4>
            </div>
          </div>
          </Link>
          <Link className="locationLink">
          <div className="divbox">
            <div className="boximg">
              <img src="Images/CastleLaundryA.jpg" alt="" />
            </div>
            <div className="divboxA">
              <h3 className="h3box">Castle Laundry</h3>
              <p className="pbox">Babakan Lebak</p>
              <p className="pbox">Baju + Sepatu + Karpet</p>
              <h4 className="h4box">start from Rp.5000,00</h4>
            </div>
          </div>
          </Link>
          <Link className="locationLink">
          <div className="divbox">
            <div className="boximg">
              <img src="Images/CastleLaundryA.jpg" alt="" />
            </div>
            <div className="divboxA">
              <h3 className="h3box">Castle Laundry</h3>
              <p className="pbox">Babakan Lebak</p>
              <p className="pbox">Baju + Sepatu + Karpet</p>
              <h4 className="h4box">start from Rp.5000,00</h4>
            </div>
          </div>
          </Link>
        
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cangkurawok;
