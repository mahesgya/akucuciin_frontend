import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function Arraya() {
  return (
    <div className="detailDiv">
      <div className="navDetail">
        <Link to="/cibanteng" className="linkNavDet">
          <img src="Images/TombolBack.png" alt="" className="ArrowDetail" />
          <p className="linkNavDetP">Back</p>
        </Link>
        <img src="Images/LogoAkucuciin2.png" alt="" className="LogoNavDetail " />
      </div>
      <div className="imageDiv">
        <img src="Images/Arraya google.png" alt="" />
        <div className="imageSubdiv">
          <img src="Images/arraya harga.jpg" alt="" />
          <img src="Images/arraya harga.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Arraya Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>• Gratis Antar Jemput Daerah Sekitar Laundry</p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Raya Dramaga, Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.449654472497!2d106.69550783491509!3d-6.561864445071686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5ba954972a1%3A0x4f42f9149cd98c9c!2sLaundry%20Arraya!5e0!3m2!1sid!2sid!4v1721831587054!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Sepatu</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (1 Hari)</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Setrika</span> <span className="rightPrice"> Rp4.000,00 </span> <br /> <br />
            <span className="leftPrice"> Setrika Express</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.449654472497!2d106.69550783491509!3d-6.561864445071686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5ba954972a1%3A0x4f42f9149cd98c9c!2sLaundry%20Arraya!5e0!3m2!1sid!2sid!4v1721831587054!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Arraya;
