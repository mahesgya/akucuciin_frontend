import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function JuraganKucek() {
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
        <img src="Images/Juragan Kucek.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Juragan Kucek A.jpg" alt="" />
          <img src="Images/Juragan Kucek B.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Juragan Kucek</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput <br />• Pembayaran Bisa Qris
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Tengah No.7-104, Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253677.181540988!2d106.7385497!3d-6.5587529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5560856b42d%3A0x1e48f0d9d0a7752!2sLaundry%20Juragan%20Kucek%20Cilubang!5e0!3m2!1sid!2sid!4v1721654421527!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Pakaian</h4>
          <p>
            <span className="leftPrice"> Reguler (2 Hari)</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Sepatu </h4>
          <p>
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice"> Rp20.000,00 - Rp40.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253677.181540988!2d106.7385497!3d-6.5587529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5560856b42d%3A0x1e48f0d9d0a7752!2sLaundry%20Juragan%20Kucek%20Cilubang!5e0!3m2!1sid!2sid!4v1721654421527!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default JuraganKucek;
