import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import authController from "../../controller/auth.controller";
import authService from "../../services/auth.services";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authController.handleLogin(formData, dispatch, navigate, setFormData, setLoading);
  };

  const handleOauth = async (e) => {
    e.preventDefault();
    await authService.handleOauth(navigate);
  }

  return (
    <div className="min-h-[100dvh] w-screen flex flex-row items-center justify-center md:items-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />
      <div className="relative min-h-[100dvh] w-screen mx-0.5 flex flex-col items-center justify-center space-y-8 md:my-0 md:mx-0 lg:w-[60%]">
        <a href="/">
          <img alt="backbiru" src="/Images/backbiru.png" className="absolute top-8 left-5"></img>
        </a>
        <img src="Images/LogoAkucuciin.png" alt="logo" className="w-[200px] lg:w-[15rem]" />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="font-bold text-[25px] font-poppins text-center lg:text-[32px]">LOGIN</h1>
          <h4 className="font-sans font-base text-gray55 text-center lg:text-[20px]">Silahkan Masukan Email dan Password Anda</h4>

          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col align-center justify-center items-center">
            <div className="space-y-5 lg:space-y-6">
              <div className="flex flex-row space-x-1 font-sans bg-white border border-0.2 border-gray-500/30 shadow-sm rounded-[10px] p-[8px] rounded-lg w-[20rem]">
                <img src="Images/emailReg2.png" alt="" className="w-[25px]" />
                <input value={formData.email} onChange={handleChange} required type="email" name="email" placeholder="Email" className="w-full bg-white font-sans focus:outline-none focus:border-b-2" />
              </div>
              <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-white border border-0.2 border-gray-500/30 shadow-sm p-[10px] rounded-lg w-[20rem] ">
                <img src="Images/passwordReg.png" alt="" className="w-[25px]" />
                <input
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full font-sans bg-white focus:outline-none focus:border-b-2"
                />

                <button type="button" onClick={togglePasswordVisibility} className=" flex justify-center align-center">
                  {showPassword ? <img src="Images/invisible.png" className="w-[25px] h-[25px]" alt="" /> : <img src="Images/visible.png" className="w-[25px] h-[25px]" alt="" />}
                </button>
              </div>
            </div>
            <div className="pl-[8px] space-y-3 flex flex-col self-start">
              <Link to="/reset-password-email" className="font-sans text-[#687eff]">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`shadow-md font-sans w-[20rem] ${
                loading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#687eff] text-white"
              } text-white font-semibold p-3 rounded-[10px] lg:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="border border-0.2 border-gray-500/30 shadow-sm rounded-[10px] space-y-5 w-full flex align-center items-center flex-col justify-center">
            <button
              onClick={handleOauth}
              className="flex justify-center items-center font-sans w-[20rem] bg-white p-3 rounded-[10px] lg:p-4 focus:outline-none focus:ring-0.2 focus:ring-gray-500/30 focus:ring-offset-0.2"
            >
              <img src="Images/google.png" className="w-6 h-6" alt="Google Icon" />
              <p className="ml-2 font-sans text-gray-500 text-center text-sm">Sign in with Google</p>
            </button>
          </div>
        </div>
        <p className="font-sans text-gray-500 text-center text-sm">
          Belum Punya Akun? {"  "}
          <Link to="/register">
            <button className="font-sans bg-white text-[#687eff] font-normal "> Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
