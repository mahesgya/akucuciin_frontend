import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function GeaClean() {
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
        <img src="Images/Gea Clean.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Gea Clean Harga.jpg" alt="" />
          <img src="Images/Gea Clean Harga2.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Gea Clean</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Blanket.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Min 10 Kg <br />• Laundry 5 Kg Gratis 1 Kg
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Cilubang, RT.03/RW.05, Balungbangjaya, Kec. Bogor Barat, Kota Bogor, Jawa Barat 16116</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.706073780055!2d106.73577437475352!3d-6.558738793434398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4bb29983a73%3A0x3208d1a559979090!2sLAUNDRY%20GEULIS!5e0!3m2!1sid!2sid!4v1721542068027!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp5.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (2 Hari)</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
            <span className="leftPrice"> Kilat (1 Hari)</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Hanya Setrika</span> <span className="rightPrice"> Rp3.000,00</span> <br /> <br />
            <span className="leftPrice"> Cuci Kering Non Setrika</span> <span className="rightPrice"> Rp3.000,00/Kg</span> <br /> <br />
          </p>
          <h4> Paket Lainnya</h4>
          <p>
            <span className="leftPrice"> Sprei Kecil</span> <span className="rightPrice"> Rp8.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sprei Besar</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Bed Cover </span> <span className="rightPrice"> Rp20.000,00 </span> <br /> <br />
            <span className="leftPrice"> Selimut Besar</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
            <span className="leftPrice"> Selimut Kecil</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka Kecil</span> <span className="rightPrice"> Rp8 .000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka Besar</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
          <iframe
            className="mapsLaundryHP2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.706073780055!2d106.73577437475352!3d-6.558738793434398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4bb29983a73%3A0x3208d1a559979090!2sLAUNDRY%20GEULIS!5e0!3m2!1sid!2sid!4v1721542068027!5m2!1sid!2sid"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GeaClean;
