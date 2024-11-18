import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
      <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] "/>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="font-bold text-[30px] text-[#687EFF] font-poppins text-center">Order Berhasil dibuat!!!</h1>
        <h4 className="font-sans font-base font-[25px] text-gray55 text-center">Terimakasih Sudah Memakai Layanan Kami🤩🤗</h4>
        <Link to="/">
          <button className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold py-4 px-4  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
