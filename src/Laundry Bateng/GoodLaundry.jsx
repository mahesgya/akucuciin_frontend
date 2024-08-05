import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function GoodLaundry() {
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
        <img src="Images/Good Laundry B.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Good Laundry A.jpg" alt="" />
          <img src="Images/Good Laundry Google.png" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Good Laundry</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Clothes.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>
              • Gratis Antar Jemput Min 3 Kg <br />
              • Pembayaran Bisa Qris <br />• Dapat Request Berapa Lama Laundry Selesei
            </p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl Kampus Dalam Babakan Tengah RT.2 RW.8 No 4 Desa Babakan, Kec. Dramaga, Bogor</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.70320314441!2d106.73270067475357!3d-6.559099693434059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5861460d94d%3A0xd883a52a91c39321!2sGood%20Laundry!5e0!3m2!1sid!2sid!4v1721490651085!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
            <span className="leftPrice"> Middle (2 Hari)</span> <span className="rightPrice"> Rp7.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (1 Hari)</span> <span className="rightPrice"> Rp9.000,00 </span> <br /> <br />
            <span className="leftPrice"> Extra Express (8 Jam)</span> <span className="rightPrice"> Rp12.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Bulanan </h4>
          <p>
            <span className="leftPrice"> 20 Kg/Bulan</span> <span className="rightPrice">Rp130.000,00</span> <br /> <br />
            <span className="leftPrice"> 40 Kg/Bulan</span> <span className="rightPrice">Rp250.000,00</span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.70320314441!2d106.73270067475357!3d-6.559099693434059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5861460d94d%3A0xd883a52a91c39321!2sGood%20Laundry!5e0!3m2!1sid!2sid!4v1721490651085!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default GoodLaundry;
