import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/auth.services";
import LoadingUtils from "../../utils/loading.utils";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoading } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.loginUser(formData, dispatch, navigate);
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleOauth = async (e) => {
    e.preventDefault();
    await authService.handleOauth(navigate);
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-[100dvh] w-screen flex flex-row items-center justify-center dark:bg-dark-bg">
      <div className=" hidden h-screen bg-[#687eff] lg:block md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px]">
        <a href="/">
          <img alt="backwhite" src="/Images/backwhite.webp" className="absolute top-8 left-5" />
        </a>
        <div className="text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">Welcome Back!</div>
        <img src="/Images/mockup_hp.webp" alt="" className="hidden h-[80%] w-full lg:block object-cover" />
      </div>

      <div className="relative min-h-[100dvh] w-screen mx-0.5 flex flex-col items-center justify-center space-y-10 md:space-y-16 md:my-0 md:mx-0 lg:space-y-6 lg:w-[50%] dark:text-dark-text">
        <a href="/">
          <img alt="backbiru" src="/Images/backbiru.png" className="absolute top-8 left-5 lg:hidden" />
        </a>
        <img src="Images/LogoAkucuciin.png" alt="logo" className="w-[200px] mt-0 md:w-[13rem] lg:w-[15rem]" />

        <div className="flex flex-col items-center justify-center space-y-7 lg:space-y-5">
          <h1 className="font-normal font-[#423E3E] text-[20px] font-poppins self-start md:text-[24px] dark:text-dark-text">Login to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col align-center justify-center items-center md:space-y-8 lg:space-y-6">
            <div className="space-y-5 md:space-y-6">
              <div className="flex flex-row space-x-1 font-['Montserrat'] bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm rounded-[10px] p-[8px] rounded-lg w-[20rem] md:p-[15px] md:w-[60dvw] lg:w-[30rem] lg:p-[10px]">
                <img src="Images/email.webp" alt="" className="w-[25px]" />
                <input
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="fix-autofill w-full bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 font-['Montserrat'] focus:outline-none focus:border-b-1 md:text-base"
                />
              </div>

              <div className="flex flex-row justify-center align-center space-x-1 font-['Montserrat'] bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm p-[10px] rounded-lg w-[20rem] md:p-[15px] md:w-[60dvw] lg:w-[30rem] lg:p-[10px]">
                <img src="Images/password.webp" alt="" className="w-[25px]" />
                <input
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="fix-autofill w-full font-['Montserrat'] bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-b-1 md:text-base"
                />

                <button type="button" onClick={togglePasswordVisibility} className=" flex justify-center align-center">
                  {showPassword ? <img src="Images/Invisible.webp" className="w-[25px] h-[25px]" alt="" /> : <img src="Images/visible.webp" className="w-[25px] h-[25px]" alt="" />}
                </button>
              </div>
            </div>

            <div className="pl-[8px] space-y-3 flex flex-col self-start">
              <Link to="/reset-password-email" className="font-['Montserrat'] text-[#687eff] md:text-base">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`shadow-md font-['Montserrat'] w-[20rem] md:w-[60dvw] md:text-lg lg:w-[30rem] ${
                isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#687eff] text-white"
              } text-white font-semibold p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="flex justify-center items-center flex-row">
            <div className="w-[6.7rem] md:w-[10.5rem] border-t border-zinc-400 dark:border-neutral-700"></div>
            <div className="px-2 text-zinc-900/70 dark:text-dark-text/70 text-[10px] md:text-base font-normal font-['Montserrat'] whitespace-nowrap">Or Sign Up With</div>
            <div className="w-[6.7rem] md:w-[10.5rem] border-t border-zinc-400 dark:border-neutral-700"></div>
          </div>

          <div className="border border-0.2 border-gray-500/30 dark:border-neutral-700 dark:bg-dark-card shadow-sm rounded-[10px] space-y-5 w-[20rem] flex align-center items-center flex-col justify-center md:w-[60dvw] lg:w-[30rem]">
            <button
              onClick={handleOauth}
              className="flex justify-center items-center font-['Montserrat'] w-[19rem] bg-white dark:bg-dark-card p-3 rounded-[10px] focus:outline-none focus:ring-0.2 focus:ring-gray-500/30 focus:ring-offset-0.2"
            >
              <img src="Images/google.png" className="w-6 h-6" alt="Google Icon" />
              <p className="ml-2 font-['Montserrat'] text-gray-500 dark:text-dark-text text-center text-sm md:text-base">Sign in with Google</p>
            </button>
          </div>
        </div>

        <p className="font-['Montserrat'] text-gray-500 dark:text-dark-text/80 text-center text-sm md:text-base">
          Belum Punya Akun?{" "}
          <Link to="/register">
            <button className="font-['Montserrat'] bg-white dark:bg-transparent text-[#687eff] font-normal md:text-base"> Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
