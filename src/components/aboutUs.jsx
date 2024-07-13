import React from "react";
import "../style/AboutUs.css";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>
      <section id="AboutUs">
        <div className="container-about">
          <h4 className="aboutus-h4">About Us</h4>
          <h2 className="cepatdanmudah">
            <span>Cepat dan mudah</span> pesan antar jasa laundry di sekitar kampus
          </h2>
          <p className="p-aboutus">Akucuciin adalah solusi praktis untuk permasalahan mahasiswa dalam mencuci pakaian. Akucuciin adalah platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis. Dengan layanan kami, Mahasiswa dapat dengan mudah memesan jemput cuciuan dari outlet laundry melalui fitur-fitur menarik seperti pembayaran online, antar jemput, update progres laundry.</p>
          <div className="section-login">
            <Link>
              <a href="" className="signin">
                Our Services
              </a>
            </Link>
          </div>
        </div>
        <img src="Images/About Us.png" alt="" className="mesincuci2" />
      </section>
    </div>
  );
}

export default AboutUs;
