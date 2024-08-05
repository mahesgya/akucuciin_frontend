import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <div className="FooterMargin">
      <footer id="Footer">
        <div className="Follow">
          <div className="Follow-A">
            <h2>Follow To Our Instagram</h2>
            <p>Follow Our Instagram to Get Latest News and Updates</p>
          </div>
          <div className="Follow-B">
            <a href="https://www.instagram.com/akucuciin.id/">Follow</a>
            <img href="https://www.instagram.com/akucuciin.id/" src="Images/Instagram.png" alt="" />
          </div>
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
              <a>Home Page</a>
              <a>About Us Page</a>
              <a>Service Page</a>
              <a>Contact Us</a>
            </div>
            <div className="Footer-Pelengkap">
              <h4>Contact</h4>
              <div className="div-line"></div>
              <a href="https://wa.me/62881025991660" className="Footer-Akhir">
                <img src="Images/telfon.png" alt="" />
                <p>(+62)881-0259-91660</p>
              </a>
              <a href="mailto:akucuciin.bisnis@gmail.com" className="Footer-Akhir">
                <img src="Images/email.png" alt="" />
                <p>akucuciin.bisnis@gmail.com</p>
              </a>
              <a href="https://maps.app.goo.gl/1koXGXfQnZy2ji3S8" className="Footer-Akhir">
                <img src="Images/Lokasi.png" alt="" />
                <p>Bogor, Jawa Barat, Indonesia</p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
