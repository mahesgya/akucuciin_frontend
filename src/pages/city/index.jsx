import { useState, useEffect } from "react";
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
    <div className="relative h-[100dvh] flex flex-row items-start justify-center  ">
      <section className="min-w-[90vw] relative overflow-hidden flex flex-row items-center justify-center">
        <button onClick={handleBack} className="bg-white absolute top-8 left-5">
          <img alt="backbiru" src="/Images/backbiru.png" />
        </button>

        <div className="flex flex-col items-center justify-center ">
          <img src="/Images/LogoAkucuciin.png" alt="" className="my-6 w-[200px] text-center md:w-[250px] lg:w-[300px]" />
          <h2 className="font-bold font-quick text-xl md:text-3xl lg:text-4xl">CARI MITRA UNGGULAN ANDA</h2>
          <h2 className="text-center font-quick pb-8 text-base md:text-lg lg:text-xl">Silahkan pilih wilayah anda</h2>

          <div className="flex items-start justify-start flex-col w-full p-6 bg-white rounded-lg max-h-[50vh] overflow-y-auto">
            {Object.entries(regions).map(([city, areas]) => (
              <div key={city} className="mb-4 min-w-[90vw] flex justify-center">
                <button
                  onClick={() => handleNext(city)}
                  className="min-w-[90vw] font-quick text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none
                 bg-gray-100 shadow-md hover:shadow-lg active:shadow-sm
                 border border-gray-300 hover:border-gray-400
                 hover:-translate-y-0.5 active:translate-y-0 md:text-xl lg:text-2xl"
                >
                  {city}
                </button>
              </div>
            ))}
            <button
              className="min-w-[90vw] font-quick text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none
                 bg-gray-100 shadow-md hover:shadow-lg active:shadow-sm
                 border border-gray-300 hover:border-gray-400
                 hover:-translate-y-0.5 active:translate-y-0 mb-4 md:text-xl lg:text-2xl"
            >
              Bandung
            </button>
            <button
              className="min-w-[90vw] font-quick text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none
                 bg-gray-100 shadow-md hover:shadow-lg active:shadow-sm
                 border border-gray-300 hover:border-gray-400
                 hover:-translate-y-0.5 active:translate-y-0 mb-4 md:text-xl lg:text-2xl"
            >
              Jakarta
            </button>
            <button
              className="min-w-[90vw] font-quick text-left text-gray-900 font-semibold py-3 px-5 rounded-lg transition duration-300 focus:outline-none
                 bg-gray-100 shadow-md hover:shadow-lg active:shadow-sm
                 border border-gray-300 hover:border-gray-400
                 hover:-translate-y-0.5 active:translate-y-0 mb-4 md:text-xl lg:text-2xl"
            >
              Semarang
            </button>
          </div>
        </div>

      </section>
      <div className="text-center absolute bottom-4 pt-4 items-center justify-center flex flex-col space-y-3 text-base md:text-lg lg:text-xl">
        <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
      </div>
    </div>
  );
};

export default ListCity;
