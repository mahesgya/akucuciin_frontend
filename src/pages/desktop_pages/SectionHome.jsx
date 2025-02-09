import React from "react";
import "../../style/SectionHome.css";

import { IoSearchCircle } from "react-icons/io5";
import { forwardRef } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../redux/authSlicer";
import Swal from "sweetalert2";
import CloseModal from "../../components/modal_components/closeModal";

function SectionHome({ text }, Homeref) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());

    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 1800000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const [closeModal, setCloseModal] = useState(false);
  const { profileData, isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const closeOrder = async (e) => {
    setCloseModal(true);
  };

  const handlePesan = async () => {
    try {
      dispatch(checkAuth());
      navigate("/laundry");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Anda Belom Login Silahkan Login Terlebih Dahulu.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      navigate("/login")
    }
  };

  if (isLoading) {
    return null;
  }

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
            <button onClick={handlePesan} className="signin">
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
      {closeModal && <CloseModal onClose={() => setCloseModal(false)} />}
    </div>
  );
}

export default forwardRef(SectionHome);
