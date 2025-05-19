import "../../style/SectionHome.css";

import { IoSearchCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../redux/auth.slicer";

import Swal from "sweetalert2";
import CloseModal from "../../components/modal/close.modal";

function Home({ text }, Homeref) {
  const [closeModal, setCloseModal] = useState(false);
  const { profileData, isLoggedIn, isLoading, accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());

    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 1800000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handlePesan = async () => {
    if (accessToken) {
      dispatch(checkAuth());
      navigate("/laundry");
    } else {
      await Swal.fire({
        icon: "error",
        title: "Anda Belom Login. ",
        text: "Silahkan Login Terlebih Dahulu.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      navigate("/login");
    }
  };

  const handleOrder = async () => {
    if (accessToken) {
      dispatch(checkAuth());
      navigate("/order");
    } else {
      await Swal.fire({
        icon: "error",
        title: "Anda Belom Login. ",
        text: "Silahkan Login Terlebih Dahulu.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      navigate("/login");
    }
  }

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

          <div className="flex items-center justify-center mt-[20px] space-x-5">
            <button onClick={handlePesan} className="w-[240px] flex items-center justify-center gap-2 rounded-full bg-[#06d001] text-white px-9 py-3 font-semibold mx-4">
              <IoSearchCircle className="IoSearch" />
              Pesan Sekarang
            </button>
            {isLoggedIn && (
              <button onClick={handleOrder} className="w-[240px] flex items-center justify-center gap-2 rounded-full bg-[#687eff] text-white px-9 py-3 font-semibold mx-4">
                <FaShoppingCart className="IoSearch" />
                Lihat Order
              </button>
            )}
          </div>

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

export default forwardRef(Home);
