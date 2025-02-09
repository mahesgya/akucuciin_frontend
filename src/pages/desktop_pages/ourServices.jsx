import React from "react";
import "../../style/OurServices.css";
import { forwardRef } from "react";

function OurServices({ text }, Ourserviceref) {
  return (
    <div id="OurServices" ref={Ourserviceref}>
      <h4>Our Services</h4>
      <h1>COMING SOON</h1>
      <div className="div-ourServices">
        <div className="loop1">
          <div>
            <img src="Images/loop.png" alt="" className="serviceImg" />
          </div>
          <h4>Antar Jemput</h4>
          <p>Nikmati Kemudahan Laundry Tanpa Keluar Rumah!</p>
        </div>
        <div className="loop2">
          <div>
            <img src="Images/dollar.png" alt="" className="serviceImg" />
          </div>
          <h4 className="loop2-h4">Pembayaran Online</h4>
          <p>Transaksi Cepat dan Aman dari Mana Saja.</p>
        </div>
        <div className="loop1">
          <div>
            <img src="Images/thumbup.png" alt="" className="serviceImg" />
          </div>
          <h4>Keamanan Terjamin</h4>
          <p>Keamanan Pakaian Anda, Prioritas Kami.</p>
        </div>
        <div className="loop2">
          <div>
            <img src="Images/timer.png" alt="" className="serviceImg" />
          </div>
          <h4>Update Progres Laundry</h4>
          <p>Tetap Terinformasi dengan Status Laundry Anda.</p>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(OurServices);
