import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";

import FotoCarousel from "../../components/carousel/laundry.foto";
import laundryServices from "../../services/laundry.service";

const LaundryDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [priceOn, setPriceOn] = useState(false);
  const { city, idlaundry } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await laundryServices.getById(idlaundry);
        const responseImg = await laundryServices.getImages(idlaundry);
        setData(response.data);
        setImg(responseImg.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, idlaundry]);

  const handleBack = () => {
    navigate(`/laundry/${city}`);
  };

  const handleDetail = () => {
    setPriceOn(!priceOn);
  };

  const handlePesan = (activePaket) => {
    navigate(`/laundry/${city}/${idlaundry}/pesan/${activePaket}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className={`relative flex flex-col items-center justify-start max-w-screen w-full md:items-center overflow-hidden ${priceOn ? "min-h-screen" : "h-[100dvh]"}`}>
      <section className="flex-grow mx-2 w-full max-w-screen-lg">
        <div className="flex flex-col items-center justify-center w-full">
          {priceOn ? (
            <div className="flex flex-col items-center justify-center gap-2 px-2 pb-4 w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img src="/Images/LogoAkucuciin.png" alt="" className="my-4 w-[200px] text-center" />
                <h2 className="font-quick text-2xl font-extrabold text-center md:text-3xl lg:text-4xl">{data.name}</h2>
                <p className="font-quick text-[12px] pb-3 text-gray-500 md:text-[16px] italic">{data.area}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {data.packages
                  ?.slice() 
                  .sort((a, b) => Number(a.price_text) - Number(b.price_text))
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handlePesan(item.id)}
                      className="flex items-center justify-between bg-white shadow-md border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer w-full max-w-[500px]"
                    >
                      <div className="w-1/2 flex flex-col gap-2 text-left">
                        {item.features.map((fitur, index) => (
                          <p key={index} className="font-quick font-semibold text-xs text-gray-600 flex items-center">
                            <BiCheck className="mr-2 text-blue-500 text-lg" /> {fitur}
                          </p>
                        ))}
                      </div>

                      <div className="w-1/2 px-4 flex flex-col items-center text-right">
                        <h3 className="font-quick text-sm font-bold text-gray-800">{item.name}</h3>
                        <span className="font-quick text-lg font-bold text-[#687eff] mt-1">Rp {Number(item.price_text).toLocaleString("id-ID")}</span>
                        <p className="font-quick text-xs font-semibold text-gray-500 mt-2 text-justify hyphens-auto">{item.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60%] w-full max-w-screen-lg">
              <div className="w-full flex justify-center max-w-lg">
                <FotoCarousel img={img} />
              </div>

              <button onClick={handleBack}>
                <img alt="backbiru" src="/Images/backwhite2.png" className="fixed z-20 top-4 left-2 "></img>
              </button>

              <div className="mt-2 w-full p-2 flex flex-col items-center justify-center max-w-screen-md">
                <div className="text-center">
                  <h2 className="font-quick text-3xl font-extrabold text-gray-800 md:text-3xl lg:text-4xl">{data.name}</h2>
                  <p className="font-quick text-sm text-gray-500 md:text-base italic">
                    {data.city} - {data.area}
                  </p>
                </div>
                <div className="mt-4 bg-gray-100 w-full p-4 rounded-lg border border-gray-200 max-w-screen-md">
                  <p className="font-quick text-gray-600 text-sm text-justify md:text-base leading-relaxed">
                    <span className="text-gray-500 mr-2">📝</span>
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="mb-4 items-center justify-center flex flex-col space-y-3 w-full">
        <div className="flex flex-col space-y-2">
          {!priceOn && (
            <button onClick={handleDetail} className="font-bold font-sans shadow-md w-[200px] bg-green-500 text-white p-3 rounded-[20px] md:w-[14rem]">
              Pilih Paket Pesanan
            </button>
          )}
          {priceOn && (
            <div className="mt-4">
              <button onClick={handleDetail} className="font-bold font-sans mt-2 shadow-md w-[170px] bg-white text-green-800  p-3 rounded-[20px] md:w-[14rem]">
                Kembali
              </button>
            </div>
          )}
        </div>
        <div className="text-center items-center justify-center flex flex-col space-y-3 text-base md:text-lg lg:text-xl">
          <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
        </div>
      </div>
    </div>
  );
};

export default LaundryDetail;
