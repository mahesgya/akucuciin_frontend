import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function Eternity() {
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
        <img src="Images/Eternity google.png" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Eternity.jpg" alt="" />
          <img src="Images/Eternity A.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Eternity Shoe n Care</h1>
          <div className="divIcon">
            <img src="Images/Sneaker.svg" alt="" />
            <img src="Images/Helmet.svg" alt="" />
            <img src="Images/Belt.svg" alt="" />
            <img src="Images/Hat.svg" alt="" />
            <img src="Images/Bag.png" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Pengantaran (Untuk Jarak Maksimal 10 Km) <br />
              • Pembayaran Bisa Qris <br />
              • Terima Berbagai Macam Sepatu <br />
              • Terima Repair Sepatu <br />
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Tengah No.61, Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7048981826983!2d106.73157777475363!3d-6.558886593434263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5de1fa2fd65%3A0x51b7d43e5247ece8!2sETERNITY%20SHOES%20AND%20CARE!5e0!3m2!1sid!2sid!4v1721538957862!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Sepatu</h4>
          <p>
            <span className="leftPrice"> Deep Clean Easy </span> <span className="rightPrice"> Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Deep Clean Medium </span> <span className="rightPrice"> Rp35.000,00 </span> <br /> <br />
            <span className="leftPrice"> Deep Clean Hard</span> <span className="rightPrice"> Rp40.000,00 </span> <br /> <br />
            <span className="leftPrice"> Woman and Kids Shoes</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Leather Treatment</span> <span className="rightPrice"> Rp50.000,00 </span> <br /> <br />
            <span className="leftPrice"> One Day Service </span> <span className="rightPrice"> Rp55.000,00 </span> <br /> <br />
            <span className="leftPrice"> Unyellowing</span> <span className="rightPrice"> Rp55.000,00 </span> <br /> <br />
            <span className="leftPrice"> Reglue</span> <span className="rightPrice"> Mulai Rp20.000,00 </span> <br /> <br />
            <span className="leftPrice"> Repaint </span> <span className="rightPrice"> Mulai Rp90.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Bulanan </h4>
          <p>
            <span className="leftPrice"> Small Bag</span> <span className="rightPrice"> Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Medium Bag</span> <span className="rightPrice"> Rp40.000,00 </span> <br /> <br />
            <span className="leftPrice"> Large Bag </span> <span className="rightPrice"> Rp50.000,00 </span> <br /> <br />
            <span className="leftPrice"> Hat, Wallet, and Belt</span> <span className="rightPrice"> Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Helmet</span> <span className="rightPrice"> Rp35.000,00 </span> <br /> <br />
            <span className="leftPrice"> Full Face Helmet </span> <span className="rightPrice"> Rp45.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7048981826983!2d106.73157777475363!3d-6.558886593434263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5de1fa2fd65%3A0x51b7d43e5247ece8!2sETERNITY%20SHOES%20AND%20CARE!5e0!3m2!1sid!2sid!4v1721538957862!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Eternity;
