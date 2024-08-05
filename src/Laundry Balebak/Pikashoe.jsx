import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
function Pikashoe() {
  return (
    <div className="detailDiv">
      <div className="navDetail">
        <Link to="/babakanlebak" className="linkNavDet">
          <img src="Images/TombolBack.png" alt="" className="ArrowDetail" />
          <p className="linkNavDetP">Back</p>
        </Link>
        <img src="Images/LogoAkucuciin2.png" alt="" className="LogoNavDetail "/>
      </div>
      <div className="imageDiv">
        <img src="Images/Pikashoe A.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Pikashoe.jpg" alt="" />
          <img src="Images/Pikashoe B.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Pikashoe</h1>
          <div className="divIcon">
            <img src="Images/Sneaker.svg" alt="" />
            <img src="Images/Helmet.svg" alt="" />
            <img src="Images/Bag.png" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Wilayah Dramaga Min 3 Barang <br />• Pembayaran Bisa Qris
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Lb. No.1, RT.02/RW.03, Kel. Balembang jaya, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.707178697647!2d106.73111287734396!3d-6.558599876505961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5fb20bce773%3A0x1a67e6d7f0c7b873!2sPikashoe%20Laundry!5e0!3m2!1sid!2sid!4v1721540294605!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Sepatu</h4>
          <p>
            <span className="leftPrice">Deep Clean 3-4 Hari</span> <span className="rightPrice">Rp35.000,00</span> <br /> <br />
            <span className="leftPrice">Luaran sepatu 1-3 Hari</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice">Express Deep Clean 1 Hari</span> <span className="rightPrice">Rp65.000,00</span> <br /> <br />
            <span className="leftPrice">Repaint 1 Warna 6 Hari</span> <span className="rightPrice">Rp100.000,00</span> <br /> <br />
            <span className="leftPrice">Repaint 2 Warna 6 Hari</span> <span className="rightPrice">Rp165.000,00</span> <br /> <br />
            <span className="leftPrice">Recolor 6 Hari</span> <span className="rightPrice">Rp100.000,00</span> <br /> <br />
            <span className="leftPrice"> Repaint Midsole 6 Hari</span> <span className="rightPrice">Rp65.000,00</span> <br /> <br />
            <span className="leftPrice">Glossy Midsole 6 Hari</span> <span className="rightPrice">Rp70.000,00</span> <br /> <br />
            <span className="leftPrice">Jait Sole 6 Hari</span> <span className="rightPrice">Rp35.000,00</span> <br /> <br />
            <span className="leftPrice">Jait Sole Hiking 6 Hari</span> <span className="rightPrice">Rp45.000,00</span> <br /> <br />
            <span className="leftPrice">Glue Sepasang 6 Hari</span> <span className="rightPrice">Rp25.000,00</span> <br /> <br />
            <span className="leftPrice">Full Glue Sepasang 6 Hari</span> <span className="rightPrice">Rp50.000,00</span> <br /> <br />
            <span className="leftPrice">Unyellowing 6 Hari</span> <span className="rightPrice">Rp75.000,00</span> <br /> <br />
          </p>
          <h4> Paket Bulanan </h4>
          <p>
            <span className="leftPrice">Bag 2-4 Hari</span> <span className="rightPrice">Rp25.000,00</span> <br /> <br />
            <span className="leftPrice">Large Bag 2-4 Hari</span> <span className="rightPrice">Rp35.000,00</span> <br /> <br />
            <span className="leftPrice">Half Face Helmet 2-4 Hari</span> <span className="rightPrice">Rp25.000,00</span> <br /> <br />
            <span className="leftPrice">Full Face Helmet 2-4 Hari</span> <span className="rightPrice">Rp35.000,00</span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
          <iframe
            className="mapsLaundryHP2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.707178697647!2d106.73111287734396!3d-6.558599876505961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5fb20bce773%3A0x1a67e6d7f0c7b873!2sPikashoe%20Laundry!5e0!3m2!1sid!2sid!4v1721540294605!5m2!1sid!2sid"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pikashoe;
