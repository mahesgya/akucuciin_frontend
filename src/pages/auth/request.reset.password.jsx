import { useState } from "react";
import { useSelector } from "react-redux";
import { setLoading } from "../../redux/auth.slicer";
import AuthServices from "../../services/auth.services";
import LoadingUtils from "../../utils/loading.utils";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");

  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthServices.resetPasswordEmail(email, setLoading);
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-[100dvh] w-screen flex flex-row items-center justify-center dark:bg-dark-bg">
      <div className="hidden h-screen bg-[#687eff] lg:block md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px]">
        <a href="/login">
          <img alt="backwhite" src="/Images/backwhite.webp" className="absolute top-8 left-5" />
        </a>
        <div className="text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">Welcome Back!</div>
        <img src="/Images/mockup_hp.webp" alt="" className="hidden h-[80%] w-full lg:block object-cover" />
      </div>

      <div className="relative min-h-[100dvh] w-screen mx-0.5 flex flex-col items-center justify-center space-y-10 md:space-y-16 md:my-0 md:mx-0 lg:space-y-6 lg:w-[50%] dark:text-dark-text">
        <a href="/login">
          <img alt="backbiru" src="/Images/backbiru.png" className="absolute top-8 left-5 lg:hidden" />
        </a>

        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] md:w-[15rem]" />

        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-['Montserrat'] font-semibold text-[20px] text-gray55 text-center dark:text-dark-text/90">Silahkan Masukkan Email Anda untuk Reset Password</h4>

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col align-center justify-center items-center">
            <div className="flex flex-row bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 space-x-1 font-['Montserrat'] p-[10px] py-[10px] rounded-lg w-[20rem] dark:shadow-black/30">
              <img src="/Images/emailReg2.png" alt="" className="w-[25px]" />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-['Montserrat'] bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-b-2 md:text-base"
              />
            </div>

            <button
              type="submit"
              className={`shadow-md font-['Montserrat'] w-[10rem] ${
                isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"
              } text-white font-semibold py-4 px-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg`}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPassword;
