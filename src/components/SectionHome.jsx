import React from "react";
import "../style/SectionHome.css";
import { Link } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import { forwardRef } from "react";

function SectionHome({text},Homeref) {
  return (
    <div ref={Homeref}>
      <section id="SectionHome">
        <div className="container-home">
          <h4 className="highly">HIGHLY PROFESSIONAL CLEANING</h4>
          <h2 className="gasempet">
            Ga Sempet Nyuci? <br /> sini <span>Aku Cuciin</span>
          </h2>
          <p className="platform">Platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis</p>
          <div className="section-login">
            <Link to='/location'>
              <a href="" className="signin">
                Search Laundry
                <IoSearchCircle className="IoSearch"/>
              </a>
            </Link>
          </div>
          <h4 className="trusted">TRUSTED PARTNERS</h4>
          <h2 className="high">AND HIGH QUALITY</h2>
        </div>
        <img src="Images/Mesin Cucik.png" alt="" className="mesincuci" />
      </section>
      <div className="divkosong"></div>
    </div>
  );
}

export default forwardRef(SectionHome);
