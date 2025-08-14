import "../../../style/ServicesHP.css";
import NavbarHP from "../../../components/layout/navbar/index.hp";

function OurServicesHP() {
  return (
    <div id="OurServicesHP">
      <NavbarHP />
      <h4>OUR SERVICES</h4>
      <div className="div-ourServicesHP">
        <div className="loop1HP">
          <div>
            <img src="Images/loop.png" alt="" className="serviceImgHP" />
          </div>
          <h4>Antar Jemput</h4>
          <p>Nikmati Kemudahan Laundry Tanpa Keluar Rumah!</p>
        </div>
        <div className="loop2HP">
          <div>
            <img src="Images/dollar.png" alt="" className="serviceImgHP" />
          </div>
          <h4 className="loop2-h4">Pembayaran Online</h4>
          <p>Transaksi Cepat dan Aman dari Mana Saja.</p>
        </div>
        <div className="loop1HP">
          <div>
            <img src="Images/thumbup.png" alt="" className="serviceImgHP" />
          </div>
          <h4>Keamanan Terjamin</h4>
          <p>Keamanan Pakaian Anda, Prioritas Kami.</p>
        </div>
        <div className="loop2HP">
          <div>
            <img src="Images/timer.png" alt="" className="serviceImgHP" />
          </div>
          <h4>Update Progres Laundry</h4>
          <p>Tetap Terinformasi dengan Status Laundry Anda.</p>
        </div>
      </div>
    </div>
  );
}

export default OurServicesHP;
