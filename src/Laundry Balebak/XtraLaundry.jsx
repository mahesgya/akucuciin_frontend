import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function XtraLaundry() {
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
        <img src="Images/Xtra Laundry.png" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Xtra Laundry Harga.jpg" alt="" />
          <img src="Images/Xtra Laundry.png" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Xtra Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Curtain.png" alt="" />
            <img src="Images/Blanket.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Wilayah Dramaga Min 3 Barang <br />• Pembayaran Bisa Qris
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Lebak Rt 04/06 Kampus Dalam, Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.713808650736!2d106.7353412677088!3d-6.557766257132725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4a55838dbff%3A0x8da6028a11987381!2sXTRA%20LAUNDRY!5e0!3m2!1sid!2sid!4v1721541200969!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari) </span> <span className="rightPrice">Rp6.000,00</span> <br /> <br />
            <span className="leftPrice"> Reguler (2 Hari)</span> <span className="rightPrice"> Rp9.000,00 </span> <br /> <br />
            <span className="leftPrice"> Reguler (1 Hari) </span> <span className="rightPrice">Rp11.000,00</span> <br /> <br />
            <span className="leftPrice"> Express (12 Jam)</span> <span className="rightPrice"> Rp18.000,00</span> <br /> <br />
            <span className="leftPrice"> Express (9 Jam)</span> <span className="rightPrice">Rp20.000,00</span> <br /> <br />
            <span className="leftPrice"> Express (6 Jam)</span> <span className="rightPrice">Rp22.000,00</span> <br /> <br />
            <span className="leftPrice"> Pakaian Anak</span> <span className="rightPrice">Rp8.000,00</span> <br /> <br />
            <span className="leftPrice">Hanya Setrika</span> <span className="rightPrice">Rp4.000,00</span> <br /> <br />
          </p>
          <h4> Paket Lainnya</h4>
          <p>
          <span className="leftPrice"> Sprei Besar </span> <span className="rightPrice">Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sprei Kecil</span> <span className="rightPrice"> Rp8.000,00  </span> <br /> <br />
            <span className="leftPrice"> Bed Cover </span> <span className="rightPrice">Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Gorden Kecil</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice">  Gorden Besar</span> <span className="rightPrice">Rp15.000,00 </span> <br /> <br />
            <span className="leftPrice"> Selimut</span> <span className="rightPrice">Rp10.000,00  </span> <br /> <br />
            <span className="leftPrice"> Boneka Kecil</span> <span className="rightPrice">Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka Besar </span> <span className="rightPrice">Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice">Rp10.000,00 </span> <br /> <br />
            
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.713808650736!2d106.7353412677088!3d-6.557766257132725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4a55838dbff%3A0x8da6028a11987381!2sXTRA%20LAUNDRY!5e0!3m2!1sid!2sid!4v1721541200969!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default XtraLaundry;
