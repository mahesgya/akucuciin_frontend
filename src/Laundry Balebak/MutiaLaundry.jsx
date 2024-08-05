import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function MutiaLaundry() {
  return (
    <div className="detailDiv">
     <div className="navDetail">
        <Link to="/babakanlebak" className="linkNavDet">
          <img src="Images/TombolBack.png" alt="" className="ArrowDetail" />
          <p className="linkNavDetP">Back</p>
        </Link>
        <img src="Images/LogoAkucuciin2.png" alt="" className="LogoNavDetail " />
      </div>
      <div className="imageDiv">
        <img src="Images/Mutia Laundry 1.png" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Mutia Laundry 2.png" alt="" />
          <img src="Images/Mutia Laundry 3.png" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Mutia Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p></p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Lb. No.18, RT.03/RW.05, Balungbangjaya, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16116</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.712748254987!2d106.73628247475368!3d-6.5578995934352395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4a4d1e83ab9%3A0x9a74ae027f0f2ad!2sMutia%20Laundry!5e0!3m2!1sid!2sid!4v1721542556431!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (2 Hari) </span> <span className="rightPrice">Rp5.000,00</span> <br /> <br />
            <span className="leftPrice"> Express (1 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Lainnya</h4>
          <p>
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
          <iframe
            className="mapsLaundryHP2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.712748254987!2d106.73628247475368!3d-6.5578995934352395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4a4d1e83ab9%3A0x9a74ae027f0f2ad!2sMutia%20Laundry!5e0!3m2!1sid!2sid!4v1721542556431!5m2!1sid!2sid"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MutiaLaundry;
