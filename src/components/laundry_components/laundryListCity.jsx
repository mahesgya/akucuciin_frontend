import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityCarousel from "./carousel_city/cityCarousel";
import laundryServices from "../../services/laundry_service";

const LaundryListCity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeLaundry, setActiveLaundry] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { city } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await laundryServices.getByCity(city);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const handleBack = () => {
    navigate("/laundry");
  };

  const handleKunjungi = () => {
    navigate(`/laundry/${city}/${activeLaundry}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="h-screen flex flex-row items-start justify-center md:items-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen md:block md:w-[40%] object-fit" />

      <section className="relative mx-2 flex flex-col items-center justify-center md:w-[60%]">
        <button onClick={handleBack} className="fixed lg:absolute bg-white top-8 left-5">
          <img alt="backbiru" src="/Images/backbiru.png" ></img>
        </button>
        <div className="flex flex-col items-center justify-center">
          <img src="/Images/LogoAkucuciin.png" alt="" className="p-6 w-[200px] text-center" />

          <div className="max-w-lg">
            <CityCarousel data={data} city={city} setActiveLaundry={setActiveLaundry} />
          </div>

          <div className="pt-2 items-center justify-center flex flex-col space-y-3">
            <div className="flex flex-col space-y-4">
              <button onClick={handleKunjungi} className="shadow-md font-sans w-[170px] bg-green-500 text-white font-semibold p-3  rounded-[20px]  md:w-[5rem] lg:w-[10rem]">
                KUNJUNGI MITRA
              </button>
            </div>

            <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaundryListCity;
