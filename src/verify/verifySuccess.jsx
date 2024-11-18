import React from "react";
import { Link } from "react-router-dom";

function VerifySuccess() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
      <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] "/>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="font-bold text-[30px] text-[#687EFF] font-poppins text-center">Aktivasi Akun Berhasil !!!</h1>
        <h4 className="font-sans font-base font-[25px] text-gray55 text-center">Silahkan melakukan login sekarang</h4>
        <Link to="/login">
          <button className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold py-4 px-4  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default VerifySuccess;
