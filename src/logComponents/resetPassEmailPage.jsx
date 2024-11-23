import React from "react";
import { Link } from "react-router-dom";

function ResetPassEmailPage() {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-sans font-semibold text-[20px] text-gray55 text-center">Silahkan Masukkan Email Anda untuk Reset Password</h4>
          <form action="submit" className="space-y-4 flex flex-col align-center justify-center items-center">
            <div className=" flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/images/emailReg2.png" alt="" className="w-[25px]" />
              <input required type="email" name="email" placeholder="Email" className="w-full font-sans focus:outline-none bg-birumuda focus:border-b-2" />
            </div>
            <Link to="/">
              <button className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold py-4 px-4  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassEmailPage;
