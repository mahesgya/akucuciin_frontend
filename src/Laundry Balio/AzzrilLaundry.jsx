import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function AzriilLaundry() {
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
        <img src="Images/Azriil Laundry Harga.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Azriil Laundry Harga.jpg" alt="" />
          <img src="Images/Azriil Laundry Harga.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Azriil Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Blanket.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Jika Banyak <br />• Pembayaran Bisa Qris
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jalan Babakan Lio No. 6 RT 2 RW. 7 Kel. Galumbang Jaya Kec. Bogor Barat</p>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
            <span className="leftPrice"> Hanya Setrika</span> <span className="rightPrice"> Rp4.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Lainnya</h4>
          <p>
            <span className="leftPrice"> Sprei Besar</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sprei Kecil</span> <span className="rightPrice"> Rp8.000,00 </span> <br /> <br />
            <span className="leftPrice"> Bed Cover Besar</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Bed Cover Standar</span> <span className="rightPrice"> Rp15.000,00 </span> <br /> <br />
            <span className="leftPrice">  Jas</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Jas Hanger </span> <span className="rightPrice"> Rp15.000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice"> Rp15.000,00 </span> <br /> <br />
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AzriilLaundry;
