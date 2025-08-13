import "../../../style/HomeHP.css";
import NavbarHP from "../../../components/layout/navbar/index.hp";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingUtils from "../../../utils/loading.utils";
import { errorSwal } from "../../../utils/alert.utils";


const HomeHP = () => {
  const navigate = useNavigate();

  const { profileData, isLoggedIn, isLoading, accessToken } = useSelector((state) => state.auth);


  const handlePesan = async () => {
    if (accessToken) {
      navigate("/laundry");
    } else {
      await errorSwal("Silahkan login terlebih dahulu.");
      navigate("/login");
    }
  };

  const handleOrder = async () => {
    if (accessToken) {
      navigate("/order");
    } else {
      await errorSwal("Silahkan login terlebih dahulu.");
      navigate("/login");
    }
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-w-[100%] min-h-[100dvh] flex-col flex items-center justify-center">
      {isLoggedIn && (
        <a href="/me" className="absolute top-4 left-4">
          <img alt="profile" src="Images/profile.png" className="w-[2.2em]"></img>
        </a>
      )}
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
            {isLoggedIn ? (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handlePesan}
                  className="shadow-md font-sans w-[170px] bg-[#06d001] text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#06d001] focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]"
                >
                  Pesan Sekarang
                </button>
                <button
                  onClick={handleOrder}
                  className="shadow-md font-sans w-[170px] bg-[#687eff] text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#687eff] focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]"
                >
                  Lihat Order
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-col space-y-3">
                  <NavLink to="/login">
                    <button className="shadow-md font-sans w-[170px] bg-[#687eff] text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[5rem] lg:w-[7rem]">Login</button>
                  </NavLink>
                </div>
                <div className="flex flex-col space-y-3">
                  <NavLink to="/register">
                    <button className="shadow-md font-sans w-[170px] bg-gray-de text-gray-52 font-semibold p-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-de focus:ring-offset-2 md:w-[5rem] lg:w-[7rem] ">Register</button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
        </div>
      </section>
      <a className="fixed right-4 bottom-4 bg-blue rounded-lg " href="https://wa.me/6285810211200">
        <img alt="waicon" src="Images/waicon.png" className="w-[60px] h-[60px]" />
      </a>
    </div>
  );
};

export default HomeHP;
