import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LaundryCarousel from "./carousel_id/laundryCarousel";
import laundryServices from "../../services/laundry_service";
import PriceCarousel from "./carousel_id/priceCarousel";

const LaundryListId = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [priceOn, setPriceOn] = useState(false);
  const [activePaket, setActivePaket] = useState("");
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

  const handlePesan = () => {
    navigate(`/laundry/${city}/${idlaundry}/pesan/${activePaket}`);
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

      <section className="mx-2 relative flex flex-col items-center justify-center md:w-[60%]">
        {!priceOn && (
          <button onClick={handleBack}>
            <img alt="backbiru" src="/Images/backbiru.png" className="fixed lg:absolute bg-white top-8 left-5"></img>
          </button>
        )}
        <div className="flex flex-col items-center justify-center">
          <img src="/Images/LogoAkucuciin.png" alt="" className="pt-4 pb-8 w-[200px] text-center" />
          <h2 className="font-quick text-3xl font-extrabold pb-6 text-center md:text-md  lg:text-xl">{data.name}</h2>
          {priceOn ? (
            <div className="">
              <PriceCarousel data={data} setActivePaket={setActivePaket} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60%]">
              <div className="max-w-lg">
                <LaundryCarousel img={img} />
              </div>

              <p className="font-quick text-sm font-normal text-center md:text-sm lg:text-base mb-2">
                <span className="text-blue-500 mr-2">📞</span>
                {data.telephone}
              </p>

              <a href={data.maps_pinpoint} className="font-quick text-sm text-blue-500 font-normal text-center md:text-sm lg:text-base mb-2">
                <span className="text-red-500 mr-2">📍</span>
                {data.maps_pinpoint}
              </a>

              <p className="font-quick text-sm font-normal text-center md:text-sm lg:text-base mb-2">
                <span className="text-gray-500">📝</span>
                {data.description}
              </p>
            </div>
          )}

          <div className="pt-12 items-center justify-center flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              {priceOn && (
                <button onClick={handlePesan} className="shadow-md font-sans w-[170px] bg-green-500 text-white font-semibold p-3  rounded-[20px]  md:w-[5rem] lg:w-[14rem]">
                  Pesan Sekarang
                </button>
              )}

              {!priceOn && (
                <button onClick={handleDetail} className="shadow-md font-sans w-[200px] bg-green-500 text-white font-semibold p-3   rounded-[20px]  md:w-[5rem] lg:w-[14rem]">
                  Pilih Paket Pesanan
                </button>
              )}

              {priceOn && (
                <div className="mt-4">
                  <button onClick={handleDetail} className="mt-2 shadow-md font-sans w-[170px] bg-white border-8 border-red-500 text-green-800 font-semibold p-3 rounded-[20px] md:w-[5rem] lg:w-[14rem]">
                    Kembali
                  </button>
                </div>
              )}
            </div>

            <h4 className="highlyHP">HIGHLY PROFESSIONAL CLEANING</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaundryListId;
