import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import Header from "../components/header";
import {Link} from "react-router-dom";

function CastleLaundry() {
  return (
    <div className="detailDiv">
      <div className="navDetail">
        <Link to="/babakantengah" className="linkNavDet">
          <img src="Images/TombolBack.png" alt="" className="ArrowDetail" />
          <p className="linkNavDetP">Back</p>
        </Link>
        <img src="Images/LogoAkucuciin2.png" alt="" className="LogoNavDetail " />
      </div>
      <div className="imageDiv">
        <img src="Images/CastleLaundryA.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/CastleLaundryA.jpg" alt="" />
          <img src="Images/CastleLaundryA.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Castle Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Helmet.svg" alt="" />
            <img src="Images/Hat.svg" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
            <img src="Images/Bag.png" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Min 4 Kg (Untuk Asrama Tanpa Minimal) <br />• Pembayaran Bisa Qris
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Tengah No.7-104, Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7040820894567!2d106.73223237475356!3d-6.558989193434145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c57a66d6c741%3A0x8a371bc38110e66c!2sCastle%20Laundry%20IPB!5e0!3m2!1sid!2sid!4v1721199740764!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Sepatu</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (6 Jam)</span> <span className="rightPrice"> Rp12.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Bulanan </h4>
          <p>
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice">Mulai dari Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Tas</span> <span className="rightPrice">Mulai dari Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Topi </span> <span className="rightPrice">Mulai dari Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Helm </span> <span className="rightPrice">Mulai dari Rp30.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7040820894567!2d106.73223237475356!3d-6.558989193434145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c57a66d6c741%3A0x8a371bc38110e66c!2sCastle%20Laundry%20IPB!5e0!3m2!1sid!2sid!4v1721199740764!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default CastleLaundry;
