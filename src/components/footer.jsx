import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <footer id="Footer">
      <div className="Follow">
        <div className="Follow-A">
          <h2>Follow To Our Instagram</h2>
          <p>Follow Our Instagram to Get Latest News and Updates</p>
        </div>
        <div className="Follow-B">
          <a href="">Follow</a>
          <img src="Images/Instagram.png" alt="" />
        </div>
      </div>
      <div className="Footer-B">
        <div className="Footer-B1">
          <img src="Images/LogoAkucuciin.png" alt="" className="logo-Footer" />
          <p>Platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis</p>
          <div className="Footer-Biru">
            <a href="">
              <img src="Images/Facebook.png" alt="" />
            </a>
            <a href="">
              <img src="Images/Twitter.png" alt="" />
            </a>
            <a href="">
              <img src="Images/LinkedIn.png" alt="" />
            </a>
            <a href="">
              <img src="Images/Instagram2.png" alt="" />
            </a>
          </div>
        </div>
        <div className="Footer-B2">
          <div className="Footer-Pelengkap">
            <h4>Services</h4>
            <div className="div-line"></div>
            <p>Antar Jemput</p>
            <p>Pembayaran Online</p>
            <p>Keamanan Terjamin</p>
            <p>Update Progres Laundry</p>
          </div>
          <div className="Footer-Pelengkap">
            <h4>Useful Links</h4>
            <div className="div-line"></div>
            <a>Home Page</a>
            <a>About Us Page</a>
            <a>Service Page</a>
            <a>Contact Us</a>
          </div>
          <div className="Footer-Pelengkap">
            <h4>Contact</h4>
            <div className="div-line"></div>
            <div className="Footer-Akhir">
              <img src="Images/telfon.png" alt="" />
              <p>(+021) 254 4458 187</p>
            </div>
            <div className="Footer-Akhir">
              <img src="Images/email.png" alt="" />
              <p>akucuciin.bisnis@gmail.com</p>
            </div>
            <div className="Footer-Akhir">
              <img src="Images/lokasi.png" alt="" />
              <p>Bogor, Jawa Barat, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
