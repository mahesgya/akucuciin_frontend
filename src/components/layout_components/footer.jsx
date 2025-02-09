import React from "react";
import "../../style/Footer.css";
import { forwardRef } from "react";

function Footer({ text }, Footerref) {
  return (
    <footer id="Footer" ref={Footerref}>
      <div className="Follow">
        <div className="Follow-A">
          <h2>Follow To Our Instagram</h2>
          <p>Follow Our Instagram to Get Latest News and Updates</p>
        </div>
        <a href="https://www.instagram.com/akucuciin.id/" className="Follow-B">
          <a href="https://www.instagram.com/akucuciin.id/">Follow</a>
          <img src="Images/Instagram.png" alt="" />
        </a>
      </div>
      <div className="Footer-B">
        <div className="Footer-B1">
          <img src="Images/LogoAkucuciin.png" alt="" className="logo-Footer" />
          <p>Platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis</p>
          <div className="Footer-Biru">
            <a href="https://www.instagram.com/akucuciin.id/">
              <img src="Images/Facebook.png" alt="" />
            </a>
            <a href="https://www.instagram.com/akucuciin.id/">
              <img src="Images/Twitter.png" alt="" />
            </a>
            <a href="https://www.instagram.com/akucuciin.id/">
              <img src="Images/LinkedIn.png" alt="" />
            </a>
            <a href="https://www.instagram.com/akucuciin.id/">
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
            <a href="/">Home Page</a>
            <a href="/">About Us Page</a>
            <a href="/">Service Page</a>
            <a href="/">Contact Us</a>
          </div>
          <div className="Footer-Pelengkap">
            <h4>Contact</h4>
            <div className="div-line"></div>
            <a href="https://wa.me/6285810211200" className="Footer-Akhir">
              <img src="Images/telfon.png" alt="" />
              <p className="emailFot">(+62)881-0259-91660</p>
            </a>
            <a className="Footer-Akhir" href="mailto:akucuciin.bisnis@gmail.com">
              <img src="Images/email.png" alt="" />
              <p className="emailFot">akucuciin.bisnis@gmail.com</p>
            </a>
            <a href="https://maps.app.goo.gl/1koXGXfQnZy2ji3S8" className="Footer-Akhir">
              <img src="Images/Lokasi.png" alt="" />
              <p className="emailFot">Bogor, Jawa Barat, Indonesia</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default forwardRef(Footer);
