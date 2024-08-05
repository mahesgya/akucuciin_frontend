import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function DitaLaundry() {
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
        <img src="Images/Ridho Laundry.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Ridho Laundry.jpg" alt="" />
          <img src="Images/Ridho Laundry.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Dita Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Bag.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
            <img src="Images/Blanket.png" alt="" />
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl Babakan Lio Rt.1, Rw.7</p>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Pakaian</h4>
          <p>
            <span className="leftPrice"> Reguler (1 Hari)</span> <span className="rightPrice"> Rp5.000,00 </span> <br /> <br />
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DitaLaundry;
