import React from "react";
import "../style/SectionHome.css";
import { Link } from "react-router-dom";

function SectionHome() {
  return (
    <div>
      <section id="SectionHome">
        <div className="container-home">
          <h4 className="highly">HIGHLY PROFESSIONAL CLEANING</h4>
          <h2 className="gasempet">
            Ga Sempet Nyuci? <br /> sini <span>AkuCuciin</span>
          </h2>
          <p className="platform">Platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis</p>
          <div className="section-login">
            <Link>
              <a href="" className="signin">
                Sign In
              </a>
            </Link>
            <Link>
              <a href="" className="signup">
                Sign Up
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

export default SectionHome;
