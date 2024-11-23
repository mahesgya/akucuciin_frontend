import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateCustomer } from "../validator/customerValidator";

function RegisterPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirm_password" || name === "password") {
      if (name === "confirm_password" && value !== formData.password) {
        setError("Password dan konfirmasi password tidak cocok");
      } else if (name === "password" && formData.confirm_password && formData.confirm_password !== value) {
        setError("Password dan konfirmasi password tidak cocok");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      alert("Password dan konfirmasi password harus sama.");
      return;
    }

    const validationErrors = validateCustomer(formData);
    setError(validationErrors || {});

    console.log(validationErrors);

    if (!validationErrors) {
      axios
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, formData)
        .then((res) => {
          setFormData({
            email: "",
            password: "",
            confirm_password: "",
            name: "",
            address: "",
            telephone: "",
          });

          navigate("/verify");
        })
        .catch((err) => {
          console.error("Error:", err);
          alert(err.response.data.errors);
        });
    }
  };

  return (
    <div className="register-form h-screen w-screen flex flex-col items-center justify-center mx-[0.5em] mt-[2em] space-y-1">
      <img src="Images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="font-bold text-[30px] font-poppins text-center">REGISTER</h1>
        <h4 className="font-sans font-base font-[8px] text-gray55 text-center">Silahkan Isi Data Diri Anda</h4>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col align-center justify-center items-center ">
          <div className="flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/akunReg.png" alt="" className="w-[25px]" />
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="w-full font-sans bg-birumuda text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
          </div>

          <div className="flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/emailReg2.png" alt="" className="w-[25px]" />
            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full font-sans bg-birumuda text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
          </div>

          <div className="flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/callReg.png" alt="" className="w-[25px]" />
            <input
              required
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="No Whatsapp"
              className="w-full font-sans bg-birumuda text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2"
            />
          </div>
          <div className="flex flex-row space-x-1 font-sans bg-birumuda p-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/address.png" alt="" className="w-[25px]" />
            <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" className="w-full font-sans bg-birumuda text-gray-700 focus:shadow-none focus:outline-none focus:border-b-2" />
          </div>
          <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/passwordReg.png" alt="" className="w-[25px]" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
            />
            <button type="button" onClick={togglePasswordVisibility} className="h-[10px] flex justify-center align-center">
              {showPassword ? <img src="Images/invisible.png" className="w-[25px]" alt=""></img> : <img src="Images/visible.png" className="w-[25px]" alt=""></img>}
            </button>
          </div>
          <div className="flex flex-row justify-center align-center space-x-1 font-sans bg-birumuda px-[10px] py-[10px] rounded-lg w-[20rem]">
            <img src="Images/passwordReg.png" alt="" className="w-[25px]" />
            <input
              required
              type={showPassword2 ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Masukkan Password Kembali"
              className="w-full font-sans bg-birumuda text-gray-700  focus:outline-none focus:border-b-2"
            />
            <button type="button" onClick={togglePasswordVisibility2} className="h-[10px] flex justify-center align-center">
              {showPassword2 ? <img src="Images/invisible.png" className="w-[25px]" alt=""></img> : <img src="Images/visible.png" className="w-[25px]" alt=""></img>}
            </button>
          </div>
          {error.name && <p className="font-sans text-red-500 text-sm">{error.name}</p>}
          {error.email && <p className="font-sans text-red-500 text-sm">{error.email}</p>}
          {error.telephone && <p className="font-sans text-red-500 text-sm">{error.telephone}</p>}
          {error.address && <p className="font-sans text-red-500 text-sm">{error.address}</p>}
          {error.password && <p className="font-sans text-red-500 text-sm">{error.password}</p>}
          {error.confirm_password && <p className="font-sans text-red-500 text-sm">{error.confirm_password}</p>}
          <button type="submit" className="shadow-md font-sans w-[10rem] bg-blue-500 text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Daftar
          </button>
        </form>
        <div className="space-y-3 w-full flex align-center items-center flex-col justify-center ">
          <div className="flex flex-row items-center justify-center space-x-2 w-full m-[10px]">
            <div className="flex-grow h-[2px] w-[20%] bg-gray-200"></div>
            <p className="font-sans text-gray-500 text-center text-sm">Sudah Punya Akun?</p>
            <div className="flex-grow h-[2px] w-[20%]  bg-gray-200"></div>
          </div>
          <Link to="/login">
            <button className="align-center shadow-md font-sans w-[10rem] bg-gray-de text-gray-52 font-semibold p-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-de focus:ring-offset-2" type="button">
              Login
            </button>
          </Link>
        </div>
      </div>
      <h3 className="pt-10 text-[14px] font-sans text-gray55">HIGHLY PROFESSIONAL CLEANING</h3>
    </div>
  );
}

export default RegisterPage;
