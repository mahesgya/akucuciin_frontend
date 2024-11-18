import React from "react";
import "../style/SectionHome.css";
import { IoSearchCircle } from "react-icons/io5";
import { forwardRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SectionHome({ text }, Homeref) {
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if(accessToken){
      axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`,{
        headers: {Authorization : `Bearer ${accessToken}`},
      })
      .then((response)=>{
        setProfileData(response.data);
        setIsLoggedIn(true)
      })
      .catch((error)=>{
        setIsLoggedIn(false)
        setError("")
      })
    }
    else {
      setIsLoggedIn(false);
    }

  }, []);

  const handlePesanSekarangClick = async (e) => {
    e.preventDefault();
  
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if(accessToken){
      axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: {Authorization : `Bearer ${accessToken}`},
      })
      .then((response) =>{
        setProfileData(response.data);
        setError(null);
        navigate("/form-pemesanan");
      })
      .catch(()=>{
        setError("");
        axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth`,{
          refresh_token : refreshToken, 
        })
        .then((response)=>{
          setError("")
          const {accessToken, refreshToken} = response.data.data;
          sessionStorage.setItem("accessToken", accessToken)
          sessionStorage.setItem("refreshToken", refreshToken);
          navigate("/form-pemesanan");
        })
        .catch((error) => {
          navigate("/login");
        });
      })
    } else {
      setError("Silahkan Lakukan Daftar/Login Sebelum Melakukan Pemesanan.");
    }
  };
  

  return (
    <div ref={Homeref}>
      <section id="SectionHome">
        <div className="container-home">
          {isLoggedIn ? (
            <div>
              <h1 className="font-work font-normal text-[12px] text-[#555555]  sm:text-[16px] md:text-[18px] lg:text-[20px]">Halo Selamat Datang!</h1>
              <p className="font-work font-semibold  text-[14px]  text-[#555555] uppercase sm:text-[18px] md:text-[22px] lg:text-[26px]">{profileData.data.name}</p>
            </div>
          ) : (
            <p></p>
          )}
          <h4 className="highly">HIGHLY PROFESSIONAL CLEANING</h4>
          <h2 className="gasempet">
            Ga Sempet Nyuci? <br /> sini <span>Aku Cuciin</span>
          </h2>
          <p className="platform">Platform digital yang dirancang khusus untuk memudahkan kehidupan mahasiswa dalam mencari dan menggunakan jasa laundry agar lebih praktis</p>

          <div className="section-login">
            <button onClick={handlePesanSekarangClick} className="signin">
              Pesan Sekarang
              <IoSearchCircle className="IoSearch" />
            </button>
          </div>

          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <h4 className="trusted">TRUSTED PARTNERS</h4>
          <h2 className="high">AND HIGH QUALITY</h2>
        </div>
        <img src="Images/Mesin Cucik.png" alt="" className="mesincuci" />
      </section>
      <div className="divkosong"></div>
    </div>
  );
}

export default forwardRef(SectionHome);
