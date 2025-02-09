import React from "react";
import { Link } from "react-router-dom";

function VerifyFailedActivated() {
  return (
    <div className="max-h-screen w-screen flex flex-row items-center justify-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[50%] " />
      <div className="w-full h-screen flex flex-col items-center justify-center space-y-4 md:w-[50%] ">
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[13rem] lg:w-[18rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h1 className="font-bold  text-red-500  font-poppins text-center  text-[20px] md:text-[20px] lg:text-[30px]">Akun Anda Sudah Teraktivasi</h1>
          <h4 className="font-sans font-base  text-gray55 text-center text-[15px] md:text-[15px] lg:text-[20px]">Silahkan Melakukan Login</h4>
          <Link to="/login">
            <button className="shadow-md font-sans bg-blue-500 text-white font-semibold  rounded-[20px] w-[10rem] py-1.5 px-1.5 md:py-2 md:px-2 md:w-15rem lg:w-[25rem] lg:py-4 lg:px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyFailedActivated;
