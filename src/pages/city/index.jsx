import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import laundryServices from "../../services/laundry.service";

const ListCity = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await laundryServices.getByLocation();
        setRegions(response.data);
      } catch (err) {
        setError("Gagal memuat data wilayah");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = async (city) => {
    try {
      navigate(`/laundry/${city}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="h-screen flex flex-row items-start justify-center lg:items-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />

      <section className="relative flex flex-col items-center justify-center md:w-[60%]">
        <button onClick={handleBack} className="bg-white fixed lg:absolute top-8 left-5">
          <img alt="backbiru" src="/Images/backbiru.png"></img>
        </button>
        <div className="flex flex-col items-center justify-center">
          <img src="/Images/LogoAkucuciin.png" alt="" className="pt-4 w-[200px] text-center" />
          <h2 className="pt-4 font-bold font-quick text-[20px]">CARI MITRA UNGGULAN ANDA</h2>
          <h2 className="font-normal text-center font-quick text-[14px] pb-14">Silahkan pilih wilayah anda</h2>

          <div className="flex items-start justify-start flex-col w-full p-6 bg-white rounded-lg h-[60%]">
            {Object.entries(regions).map(([city, areas]) => (
              <div key={city} className="mb-5">
                <button onClick={() => handleNext(city)} className="w-[20em] text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none">
                  {city}
                </button>
              </div>
            ))}
            <button className="mb-5 w-[20em] text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none">Bandung</button>
            <button className="mb-5 w-[20em] text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none">Jakarta</button>
            <button className="mb-5 w-[20em] text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none">Semarang</button>
          </div>

          <div className="pt-4 items-center justify-center flex flex-col space-y-3">
            <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListCity;
