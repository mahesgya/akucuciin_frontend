import React, { useState } from "react";
import { useParams } from "react-router-dom";
import authController from "../../controller/auth.controller";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);

  const { email, reset_password_token } = useParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authController.ResetPassPage(email, reset_password_token, password, confirmPassword, setError, setLoading)
  };

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />
      <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8 md:justify-center md:mt-0 md:mx-0 md:w-[60%]">
      <a href="/">
          <img alt="backbiru" src="Images/backbiru.png" className="fixed top-8 left-5"></img>
        </a>
        <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[9rem] md:w-[15rem]" />
        <div className="flex flex-col items-center justify-center space-y-5">
          <h4 className="font-sans font-semibold text-[20px] text-gray55 text-center md:text-[30px]">
            Silahkan Masukkan Password Baru Anda untuk {`${email}`}
          </h4>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col align-center justify-center items-center"
          >
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/Images/passwordReg.png" alt="" className="w-[25px]" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="h-[10px] flex justify-center align-center"
              >
                {showPassword ? (
                  <img
                    src="/Images/invisible.png"
                    className="w-[25px]"
                    alt=""
                  />
                ) : (
                  <img
                    src="/Images/visible.png"
                    className="w-[25px]"
                    alt=""
                  />
                )}
              </button>
            </div>
            <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
              <img src="/Images/passwordReg.png" alt="" className="w-[25px]" />
              <input
                required
                type={showPassword2 ? "text" : "password"}
                name="confirm_password"
                placeholder="Masukkan Password Kembali"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="h-[10px] flex justify-center align-center"
              >
                {showPassword2 ? (
                  <img src="/Images/invisible.png" className="w-[25px]" alt="" />
                ) : (
                  <img src="/Images/visible.png" className="w-[25px]" alt="" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className={`shadow-md font-sans w-[10rem] ${
                loading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"
              } text-white font-semibold py-4 px-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
