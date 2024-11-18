import React from "react";

function Verify() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
      <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] "/>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="font-bold text-[30px] text-[#687EFF] font-poppins text-center">Pendaftaran Berhasil !!!</h1>
        <h4 className="font-sans font-base font-[25px] text-gray55 text-center">Silahkan Melakukan Aktivasi Akun di Email Anda</h4>
      </div>
    </div>
  );
}

export default Verify;
