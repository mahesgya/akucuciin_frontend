import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";

import FotoCarousel from "../../components/carousel/laundry.foto";
import laundryServices from "../../services/laundry.service";
import SearchBar from "../../components/bar/search.bar";
import LoadingUtils from "../../utils/loading.utils";
import { useSelector } from "react-redux";

const LaundryDetail = () => {
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [priceOn, setPriceOn] = useState(false);
  const { city, idlaundry } = useParams();

  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPackages(data.packages || []);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = (data.packages || []).filter((pkg) => pkg.name.toLowerCase().includes(query) || pkg.description.toLowerCase().includes(query) || pkg.features.some((feature) => feature.toLowerCase().includes(query)));

    setFilteredPackages(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, data.packages]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await laundryServices.getById(idlaundry);
      const responseImg = await laundryServices.getImages(idlaundry);
      setData(response.data);
      setImg(responseImg.data);
    };

    fetchData();
  }, [city, idlaundry]);

  const handleBack = () => {
    navigate(`/laundry`);
  };

  const handleDetail = () => {
    setPriceOn(!priceOn);
  };

  const handlePesan = (activePaket) => {
    navigate(`/laundry/${idlaundry}/pesan/${activePaket}`);
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className={`relative flex flex-col items-center justify-start max-w-screen w-full md:items-center overflow-hidden ${priceOn ? "min-h-screen" : "h-[100dvh]"}`}>
      <section className="flex-grow mx-2 w-full max-w-screen-xl">
        <div className="flex flex-col items-center justify-center w-full">
          {priceOn ? (
            <div className="flex flex-col items-center justify-center gap-2 px-2 pb-4 w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img src="/Images/LogoAkucuciin.png" alt="" className="my-4 w-[200px] text-center" />
                <h2 className="font-quick text-2xl font-extrabold text-center md:text-3xl lg:text-4xl">{data.name}</h2>
                <p className="font-quick text-[12px] pb-3 text-gray-500 md:text-[16px] italic">{data.area}</p>
              </div>

              <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />

              {filteredPackages.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p>Tidak ada paket yang sesuai dengan pencarian Anda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {filteredPackages
                    .slice()
                    .sort((a, b) => Number(a.price_text) - Number(b.price_text))
                    .map((item) => (
                      <div key={item.id} onClick={() => handlePesan(item.id)} className="flex items-center justify-between bg-white shadow-sm border border-0.2 border-gray-300/30 rounded-lg p-3 cursor-pointer w-full min-w-[95dvw] md:min-w-[500px] max-w-[700px]">
                        <div className="w-1/2 px-4 flex flex-col items-start text-right">
                          <h3 className="font-quick text-sm font-bold text-gray-800 text-right">{item.name}</h3>
                          <p className="font-quick text-[10px] font-normal text-gray-500 mt-2 text-justify hyphens-auto text-right">{item.description}</p>
                          <span className="font-quick text-md font-bold text-[#40A578] mt-1 text-right">Rp {Number(item.price_text).toLocaleString("id-ID")}</span>
                        </div>

                        <div className="w-1/2 flex flex-col gap-0.5 text-left">
                          {item.features.map((fitur, index) => (
                            <p key={index} className="font-quick font-semibold text-[10px] text-gray-600 flex items-center">
                              <BiCheck className="mr-2 text-blue-500 text-lg" /> {fitur}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
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
            <div className="m-1 border rounded-[20px] border-0.1 border-gray-300/30">
              <button onClick={handleDetail} className="font-bold font-sans shadow-md w-[170px] bg-white text-green-800 p-3 rounded-[20px] md:w-[14rem]">
                Kembali
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaundryDetail;
