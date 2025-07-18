import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { errorSwal } from "../../utils/alert.utils";
import LoadingUtils from "../../utils/loading.utils";
import { setLoading } from "../../redux/auth.slicer";
import { validateCustomer } from "../../validator/customer.validator";
import AuthServices from "../../services/auth.services";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    address: "",
    telephone: "",
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "telephone") {
      if (!value.startsWith("62")) {
        newValue = "62" + value.replace(/^0+/, "");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === "confirm_password" || name === "password") {
      if (name === "confirm_password" && value !== formData.password) {
        setErrorPassword("Password dan konfirmasi password tidak cocok");
      } else if (name === "password" && formData.confirm_password && formData.confirm_password !== value) {
        setErrorPassword("Password dan konfirmasi password tidak cocok");
      } else {
        setErrorPassword("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8 && formData.confirm_password.length < 8) {
      errorSwal("Password dan confirm password minimal 8 karakter.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      errorSwal("Password dan confirm tidak sama.");
      return;
    }

    const validationErrors = validateCustomer(formData);

    if(validationErrors){
      errorSwal(validationErrors)
      return;
    }

    try {
      setLoading(true);
      await AuthServices.registerUser(formData);
      setFormData({
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        address: "",
        telephone: "",
      });

      navigate(`/register/${formData.email}`);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleOauth = async (e) => {
    e.preventDefault();
    await AuthServices.handleOauth();
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center">
       <div className=" hidden h-screen bg-[#687eff] lg:block md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px] lg:h-full">
        <a href="/">
          <img alt="backwhite" src="/Images/backwhite.webp" className="absolute top-8 left-5"></img>
        </a>
        <div className="text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">Welcome Back!</div>
        <img src="/Images/mockup_hp.webp" alt="" className="hidden h-[80%] w-full lg:block object-cover" />
      </div>
      <div className="register-form relative -screen w-screen flex flex-col items-center justify-center mt-[15px] mb-[20px] lg:mt-0 lg:mb-0 space-y-1 lg:w-[50%]">
        <a href="/">
          <img alt="backbiru" src="Images/backbiru.png" className="absolute top-8 left-5 md:fixed  lg:hidden"></img>
        </a>
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 lg:space-y-4">
        <img src="Images/LogoAkucuciin.png" alt="logo" className="w-[200px] mt-0 md:w-[13rem] lg:w-[15rem] lg:hidden" />

          <h1 className="font-normal font-[#423E3E] text-[20px] font-poppins text-center md:text-[24px]">Register new account</h1>
          <form onSubmit={handleSubmit} className="flex flex-col align-center justify-center items-center ">
            <div className="flex flex-col align-center justify-center items-center space-y-3 md:space-y-5 lg:space-y-3">
                <div className="space-x-1 flex flex-row font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm p-[10px] py-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/profile.webp" alt="" className="w-[25px]" />
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="w-full font-['Montserrat'] bg-white text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
                </div>

                <div className="space-x-1 flex flex-row font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm p-[10px] py-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/email.webp" alt="" className="w-[25px]" />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full font-['Montserrat'] bg-white text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
                </div>

                <div className="space-x-1 flex flex-row font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm p-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/telephone.webp" alt="" className="w-[25px]" />
                  <span className="text-gray-700 font-['Montserrat'] flex items-center">+</span>
                  <input
                    required
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Nomor Whatsapp"
                    className="w-full font-['Montserrat'] bg-white text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2"
                  />
                </div>
                <div className="space-x-1 flex flex-row font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm p-[10px] py-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/address.webp" alt="" className="w-[25px]" />
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" className="w-full font-['Montserrat'] bg-white text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
                </div>
                <div className="space-x-1 flex flex-row justify-center align-center font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm px-[10px] py-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/password.webp" alt="" className="w-[25px]" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full font-['Montserrat'] bg-white text-gray-700 focus:outline-none focus:border-b-2"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="flex justify-center align-center">
                    {showPassword ? <img src="Images/Invisible.webp" className="w-[25px] h-[25px]" alt=""></img> : <img src="Images/visible.webp" className="w-[25px] h-[25px]" alt=""></img>}
                  </button>
                </div>
                <div className="space-x-1 flex flex-row justify-center align-center font-['Montserrat'] bg-white border border-0.2 border-gray-500/30 shadow-sm px-[10px] py-[10px] rounded-lg w-[20rem] md:p-[12px] lg:p-[10px] md:w-[60dvw] lg:w-[30rem]">
                  <img src="Images/password.webp" alt="" className="w-[25px]" />
                  <input
                    required
                    type={showPassword2 ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Masukkan Password Kembali"
                    className="w-full font-['Montserrat'] bg-white text-gray-700  focus:outline-none focus:border-b-2"
                  />
                  <button type="button" onClick={togglePasswordVisibility2} className=" flex justify-center align-center">
                    {showPassword2 ? <img src="Images/Invisible.webp" className="w-[25px] h-[25px]" alt=""></img> : <img src="Images/visible.webp" className="w-[25px] h-[25px]" alt=""></img>}
                  </button>
                </div>
              </div>
            <p className="my-1 font-['Montserrat'] text-[#687eff] text-sm py-2 md:text-base md:py-2">Notes: Password minimal 8 karakter</p>

            {errorPassword && <p className="font-['Montserrat'] text-red-500 text-sm py-2 md:text-base  md:py-2">{errorPassword}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`shadow-md font-['Montserrat'] w-[20rem] md:p-[12px]  md:w-[60dvw] lg:w-[30rem] md:text-lg md:mt-4 ${
                isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#687eff] text-white"
              } text-white font-semibold p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </form>

          <div className="flex justify-center items-center flex-row">
            <div className="w-[6.7rem] md:w-[10.5rem] border-t border-zinc-400"></div>
            <div className="px-2 text-zinc-900/70 text-[10px] md:text-base font-normal font-['Montserrat'] whitespace-nowrap">Or Sign Up With</div>
            <div className="w-[6.7rem] md:w-[10.5rem] border-t border-zinc-400"></div>
          </div>

          <div className="border border-0.2 border-gray-500/30 shadow-sm rounded-[10px] space-y-5 w-[20rem] flex align-center items-center flex-col justify-center md:w-[60dvw] lg:w-[30rem]" >
            <button onClick={handleOauth} className="flex justify-center items-center font-['Montserrat'] w-[19rem] bg-white p-3 rounded-[10px] md:w-[24rem] focus:outline-none  focus:ring-0.2 focus:ring-gray-500/30 focus:ring-offset-0.2">
              <img src="Images/google.png" className="w-6 h-6" alt="Google Icon" />
              <p className="ml-2 font-['Montserrat'] text-gray-500 text-center text-sm md:text-base">Sign Up with Google</p>
            </button>
          </div>
        </div>
        <p className="font-['Montserrat'] text-gray-500 text-center text-sm py-2 md:text-base  md:py-2 md:mt-4">
          Sudah punya akun? {"  "}
          <Link to="/login">
            <button className="font-['Montserrat'] bg-white text-[#687eff] font-normal md:text-base">Sign In</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
