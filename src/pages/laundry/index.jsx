import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import laundryServices from "../../services/laundry.service";
import Swal from "sweetalert2";

const LaundryList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { city } = useParams();

  const navigate = useNavigate();

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

  const handleKunjungi = (activeLaundry, laundryName) => {
    navigate(`/laundry/${city}/${activeLaundry}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-row items-start justify-center">
      <section className="relative mx-2 flex flex-col items-center justify-start w-[100dvw]  md:w-[90vw]">
        <button onClick={handleBack} className="absolute lg:absolute bg-white top-8 left-5">
          <img alt="backbiru" src="/Images/backbiru.png"></img>
        </button>
        <div className="flex flex-col items-center justify-center">
          <img src="/Images/LogoAkucuciin.png" alt="" className="my-6 w-[200px] text-center md:w-[250px] lg:w-[300px]" />
          <div className="space-y-4 w-[90vw]">
            {data.map((laundry) => (
              <button key={laundry.id} onClick={() => handleKunjungi(laundry.id, laundry.name)} className="w-full text-left min-w-[90vw]">
                <div className="min-h-[130px] flex items-center bg-white/80 border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-lg">
                  <img src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${laundry.image.filepath}`} alt={laundry.name} className="w-32 h-32 object-cover rounded-l-xl md:w-[300px] md:h-[180px] lg:w-[400px] lg:h-[225px]" />
                  <div className="p-4 flex flex-col items-start justify-start flex-1 gap-1">
                    <h3 className="font-quick text-[14px] font-extrabold text-gray-800 md:text-[20px]">{laundry.name}</h3>
                    <p className="font-quick text-[10px] text-gray-500 md:text-[16px] italic">{laundry.area}</p>
                    <p className="font-quick text-gray-700 text-justify text-[9px] md:text-[16px] hyphens-auto">{laundry.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="text-center absolute bottom-4 items-center justify-center flex flex-col space-y-3 text-base md:text-lg lg:hidden">
        <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
      </div>
    </div>
  );
};

export default LaundryList;
