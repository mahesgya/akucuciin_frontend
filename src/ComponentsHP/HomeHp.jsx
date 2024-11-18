import React from "react";
import "./HomeHP.css";
import { NavLink } from "react-router-dom";
import NavbarHP from "./NavbarHP";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomeHP() {
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setProfileData(response.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setError("");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handlePesanSekarangClick = async (e) => {
    e.preventDefault();

    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setProfileData(response.data);
          setError(null);
          navigate("/form-pemesanan");
        })
        .catch(() => {
          setError("");
          axios
            .put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth`, {
              refresh_token: refreshToken,
            })
            .then((response) => {
              setError("");
              const { accessToken, refreshToken } = response.data.data;
              sessionStorage.setItem("accessToken", accessToken);
              sessionStorage.setItem("refreshToken", refreshToken);
              navigate("/form-pemesanan");
            })
            .catch((error) => {
              navigate("/login");
            });
        });
    } else {
      setError("Silahkan Lakukan Daftar/Login Sebelum Melakukan Pemesanan.");
    }
  };

  return (
    <div id="HomeHP">
      <NavbarHP />
      <section id="SectionHomeHP">
        <div className="container-homeHP">
          <img src="Images/LogoAkucuciin.png" alt="" className="LogoHomeHP" />
          <h2 className="gasempetHP">
            Ga Sempet Nyuci? <br /> sini <span>Aku Cuciin</span>
          </h2>
          <img src="Images/Mesin Cuci HP.png" alt="" className="mesincuciHP" />
          {isLoggedIn ? (
            <div className="flex items-center justify-center flex-col">
              <h1 className="font-work font-normal text-[12px] text-[#555555]  sm:text-[16px] md:text-[18px] lg:text-[20px]">Halo Selamat Datang!</h1>
              <p className="font-work font-semibold  text-[14px]  text-[#555555] uppercase sm:text-[18px] md:text-[22px] lg:text-[26px]">{profileData.data.name}</p>
            </div>
          ) : (
            <p></p>
          )}
          <div className="section-login flex flex-col space-y-3">
            <button
              onClick={handlePesanSekarangClick}
              className="shadow-md font-sans w-[170px] bg-[#06d001] text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#06d001] focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]"
            >
              Pesan Sekarang
            </button>
            {isLoggedIn ? (
              <button onClick={handlePesanSekarangClick}></button>
            ) : (
              <div className="flex flex-col space-y-3">
                <NavLink to="/login">
                  <button className="shadow-md font-sans w-[170px] bg-blue-500 text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">Login</button>
                </NavLink>
              </div>
            )}
          </div>
          {error && (
            <p className="error-message text-center" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
        </div>
      </section>
    </div>
  );
}

export default HomeHP;
