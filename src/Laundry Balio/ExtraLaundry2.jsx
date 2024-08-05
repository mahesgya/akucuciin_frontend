import React from "react";
import "../style/detail.css";
import Footer from "../components/footer";
import {Link} from "react-router-dom";

function ExtraLaundry2() {
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
        <img src="Images/Extra Laundry A.jpg" alt="" />
        <div className="imageSubdiv">
          <img src="Images/Extra Laundry 2 .jpg" alt="" />
          <img src="Images/Extra Laundry B.jpg" alt="" />
        </div>
      </div>
      <div className="completeDiv">
        <div>
          <h1 className="h1Judul">Extra Laundry Dua</h1>
          <div className="divIcon">
            <img src="Images/Clothes.svg" alt="" />
            <img src="Images/Curtain.png" alt="" />
            <img src="Images/Blanket.png" alt="" />
            <img src="Images/Boneka.png" alt="" />
            <img src="Images/Sneaker.svg" alt="" />
          </div>
          <div className="divDesc">
            <h3>Laundry Description</h3>
            <p>• Pembayaran Bisa Qris</p>
          </div>
          <div className="divDesc">
            <h3>Location</h3>
            <p>Jl. Babakan Lio, RT.01/RW.09, Balungbangjaya, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16116</p>
          </div>
          <div className="mapsLaundry">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.69627127802!2d106.73433081268918!3d-6.559971095076053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4baa66b76b5%3A0x1e36b28d4151f3d8!2sEXTRA%20LAUNDRY%20DUA!5e0!3m2!1sid!2sid!4v1721659093377!5m2!1sid!2sid"></iframe>
          </div>
        </div>
        <div className="divPrice">
          <h1>Price List</h1>
          <h4>Paket Kiloan</h4>
          <p>
            <span className="leftPrice"> Reguler (3 Hari)</span> <span className="rightPrice"> Rp6.000,00 </span> <br /> <br />
            <span className="leftPrice"> Reguler (2 Hari)</span> <span className="rightPrice"> Rp9.000,00 </span> <br /> <br />
            <span className="leftPrice"> Reguler (1 Hari)</span> <span className="rightPrice"> Rp11.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (12 Jam) </span> <span className="rightPrice"> Rp18.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (9 Jam)</span> <span className="rightPrice"> Rp20.000,00 </span> <br /> <br />
            <span className="leftPrice"> Express (6 Jam)</span> <span className="rightPrice"> Rp22.000,00 </span> <br /> <br />
            <span className="leftPrice">Pakaian Anak</span> <span className="rightPrice"> Rp8.000,00 </span> <br /> <br />
            <span className="leftPrice"> Hanya Setrika</span> <span className="rightPrice"> Rp4.000,00 </span> <br /> <br />
          </p>
          <h4> Paket Lainnya</h4>
          <p>
            <span className="leftPrice"> Sprei Besar</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sprei Kecil</span> <span className="rightPrice"> Rp8.000,00 </span> <br /> <br />
            <span className="leftPrice"> Bed Cover</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Gorden Kecil</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Gorden Besar </span> <span className="rightPrice"> Rp15.000,00 </span> <br /> <br />
            <span className="leftPrice"> Selimut</span> <span className="rightPrice"> Rp10.000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka Kecil</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
            <span className="leftPrice"> Boneka Besar</span> <span className="rightPrice"> Rp30.000,00 </span> <br /> <br />
            <span className="leftPrice"> Sepatu</span> <span className="rightPrice"> Rp25.000,00 </span> <br /> <br />
          </p>
        </div>
        <div className="mapsLaundryHP">
            <iframe  className="mapsLaundryHP2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.69627127802!2d106.73433081268918!3d-6.559971095076053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4baa66b76b5%3A0x1e36b28d4151f3d8!2sEXTRA%20LAUNDRY%20DUA!5e0!3m2!1sid!2sid!4v1721659093377!5m2!1sid!2sid"></iframe>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExtraLaundry2;
