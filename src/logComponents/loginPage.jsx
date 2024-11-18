import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form submitted:", formData);
    axios
      .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/login`, formData)
      .then((res) => {
        console.log(res);

        const { accessToken, refreshToken } = res.data.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        setFormData({
          email: "",
          password: "",
        });
        
        setError("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Email dan Password Anda Tidak Cocok");
      });
  };
  

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start mx-[0.5em] mt-[3em] space-y-8">
      <img src="/images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="font-bold text-[30px] font-poppins text-center">LOGIN</h1>
        <h4 className="font-sans font-base font-[8px] text-gray55 text-center">Silahkan Masukan Email dan Password Anda</h4>

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col align-center justify-center items-center">
          <div className="flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="/images/emailReg2.png" alt="" className="w-[25px]" />
            <input value={formData.email} onChange={handleChange} required type="email" name="email" placeholder="Email" className="w-full font-sans focus:outline-none bg-birumuda focus:border-b-2" />
          </div>
          <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="/images/passwordReg.png" alt="" className="w-[25px]" />
            <input value={formData.password} onChange={handleChange} required type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full font-sans bg-birumuda focus:outline-none focus:border-b-2" />
            <button type="button" onClick={togglePasswordVisibility} className="h-[10px] flex justify-center align-center">
              {showPassword ? <img src="/images/invisible.png" className="w-[25px]" alt="" /> : <img src="/images/visible.png" className="w-[25px]" alt="" />}
            </button>
          </div>
          {error && (
          <div className="text-red-500 font-sans text-center">
            {Array.isArray(error) ? (
              <ul>
                {error.map((errMsg, index) => (
                  <li key={index}>{errMsg}</li>
                ))}
              </ul>
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}
          <button type="submit" className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold py-4 px-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Login
          </button>
        </form>
        
        <div className="space-y-5 w-full flex align-center items-center flex-col justify-center">
          <div className="flex flex-row items-center justify-center space-x-2 w-full">
            <div className="flex-grow h-[2px] w-[20%] bg-gray-200"></div>
            <p className="font-sans text-gray-500 text-center text-sm">Belum Punya Akun?</p>
            <div className="flex-grow h-[2px] w-[20%] bg-gray-200"></div>
          </div>
          <Link to="/register">
            <button className="align-center shadow-md font-sans w-[10rem] bg-gray-de text-gray-52 font-semibold py-4 px-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" type="button">
              Daftar
            </button>
          </Link>
        </div>
      </div>
      <h3 className="pt-10 text-[14px] font-sans text-gray55">HIGHLY PROFESSIONAL CLEANING</h3>
    </div>
  );
}

export default LoginPage;
