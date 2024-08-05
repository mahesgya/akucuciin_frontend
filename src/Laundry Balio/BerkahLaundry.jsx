import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function BerkahLaundry() {
  return (
    <div className="detailDiv">
     <div className="navDetail">
        <Link to="/babakanlio" className="linkNavDet">
          <img src="Images/TombolBack.png" alt="" className="ArrowDetail" />
          <p className="linkNavDetP">Back</p>
        </Link>
        <img src="Images/LogoAkucuciin2.png" alt="" className="LogoNavDetail " />
      </div>
      <div className="imageDiv">
        <img src="Images/Berkah Laundry C.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Berkah Laundry A.jpg" alt="" />
          <img src="Images/Berkah Laundry B.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Berkah Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Bag.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
            <img src="Images/Blanket.png" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Pada Sore Hari <br />
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl Babakan Lio Rt.1, Rw.7, no.11</p>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Pakaian</h4>
          <p>
            <span className="leftPrice"> Reguler (1 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
          </p>

          <h4> Paket Sepatu </h4>
          <p>
            <span className="leftPrice"> Sepatu </span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BerkahLaundry;
