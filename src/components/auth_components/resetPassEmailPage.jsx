import React, { useState } from "react";
import authController from "../../controller/auth_controller";


function ResetPassEmailPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await authController.resetPasswordEmail(email, setIsLoading);
  };

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8 md:justify-center md:mt-0 md:mx-0 md:w-[60%] ">
      <a href="/login">
          <img alt="backbiru" src="Images/backbiru.png" className="fixed top-8 left-5"></img>
        </a>
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] md:w-[15rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-sans font-semibold text-[20px] text-gray55 text-center">Silahkan Masukkan Email Anda untuk Reset Password</h4>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col align-center justify-center items-center">
            <div className=" flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/Images/emailReg2.png" alt="" className="w-[25px]" />
              <input required type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full font-sans focus:outline-none bg-birumuda focus:border-b-2" />
            </div>
            <button
              type="submit"
              className={`shadow-md font-sans w-[10rem] ${
                isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"
              } text-white font-semibold py-4 px-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassEmailPage;
