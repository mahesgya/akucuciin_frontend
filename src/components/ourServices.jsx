import React from 'react'
import "../style/OurServices.css";
import { Link } from "react-router-dom";

function OurServices() {
  return (
    <div id='OurServices'>
      <h4>Our Services</h4>
      <h1>WHAT WE OFFER</h1>
      <div className='div-ourServices'>
            <div className="loop1"><div><img src="Images/loop.png" alt="" /></div><h4>Antar Jemput</h4><p>Lorem ipsum dolor sit amet consectetur adipisicing.</p></div>
            <div className="loop2"><div><img src="Images/dollar.png" alt="" /></div><h4 className='loop2-h4'>Pembayaran Online</h4><p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p></div>
            <div className="loop1"><div><img src="Images/thumbup.png" alt="" /></div><h4>Keamanan Terjamin</h4><p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p></div>
            <div className="loop2"><div><img src="Images/timer.png" alt="" /></div><h4>Update Progres Laundry</h4><p>Lorem ipsum dolor sit amet consectetur adipisicing.</p></div>
      </div>
    </div>
  )
}

export default OurServices
