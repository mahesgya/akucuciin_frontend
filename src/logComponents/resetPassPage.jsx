import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-sans font-semibold text-[20px] text-gray55 text-center">Silahkan Masukkan Password Baru Anda</h4>
          <form action="submit" className="space-y-4 flex flex-col align-center justify-center items-center">
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="Images/passwordReg.png" alt="" className="w-[25px]" />
              <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2" />
              <button type="button" onClick={togglePasswordVisibility} className="h-[10px] flex justify-center align-center">
                {showPassword ? <img src="Images/invisible.png" className="w-[25px]" alt=""></img> : <img src="Images/visible.png" className="w-[25px]" alt=""></img>}
              </button>
            </div>
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="Images/passwordReg.png" alt="" className="w-[25px]" />
              <input required type={showPassword2 ? "text" : "password"} name="confirm_password" placeholder="Masukkan Password Kembali" className="w-full font-sans bg-birumuda text-gray-700  focus:outline-none focus:border-b-2" />
              <button type="button" onClick={togglePasswordVisibility2} className="h-[10px] flex justify-center align-center">
                {showPassword2 ? <img src="Images/invisible.png" className="w-[25px]" alt=""></img> : <img src="Images/visible.png" className="w-[25px]" alt=""></img>}
              </button>
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

export default ResetPassPage;
