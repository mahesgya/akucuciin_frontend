import React from "react";
import "../../style/AboutUs.css";
import NavbarHP from "./NavbarHP";
import "../../style/AboutUsHP.css";

function AboutUsHP() {
  return (
    <div>
      <section id="AboutUsHP  ">
        <NavbarHP />
        <div className="container-aboutHP">
          <h4 className="aboutus-h4HP">About Us</h4>
          <h2 className="cepatdanmudahHP">
            <span>Cepat dan mudah</span> pesan antar jasa laundry di sekitar kampus
          </h2>
          <p className="p-aboutusHP">
            Aku Cuciin adalah solusi praktis untuk permasalahan mahasiswa dalam mencuci pakaian. Aku Cuciin adalah platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar
            lebih praktis. Dengan layanan kami, Mahasiswa dapat dengan mudah memesan jemput cucian dari outlet laundry melalui fitur-fitur menarik seperti pembayaran online, antar jemput, update progres laundry.
          </p>
          <img src="Images/About UsHP.png" alt="" className="mesincuci2HP" />
        </div>
      </section>
    </div>
  );
}

export default AboutUsHP;
