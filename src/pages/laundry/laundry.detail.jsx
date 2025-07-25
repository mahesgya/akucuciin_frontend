import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";

import FotoCarousel from "../../components/carousel/laundry.foto";
import laundryServices from "../../services/laundry.service";
import SearchBar from "../../components/bar/search.bar";
import LoadingUtils from "../../utils/loading.utils";
import { useSelector } from "react-redux";

const LaundryDetail = () => {
  const [data, setData] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [rating, setRating] = useState([]);
  const [img, setImg] = useState([]);
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
      const responseTop = await laundryServices.getTopPicksPackages(idlaundry);
      const responseRating = await laundryServices.getLaundryRating(idlaundry);

      setData(response.data);
      setImg(responseImg.data);
      setTopPicks(responseTop.data);
      setRating(responseRating.data);
    };

    fetchData();
  }, [city, idlaundry]);

  const handleBack = () => {
    navigate(`/laundry`);
  };

  const handlePesan = (activePaket) => {
    navigate(`/laundry/${idlaundry}/pesan/${activePaket}`);
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className={`bg-[#F9FAFB] relative flex flex-col items-center justify-start max-w-screen w-full md:items-center overflow-hidden min-h-screen`}>
      <section className="bg-[#F9FAFB]  flex-grow mx-2 w-full max-w-screen-xl">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="relative flex flex-col items-center justify-center min-h-[60%] w-full mb-[5rem] lg:mt-[1rem]">
            <div className="w-full flex justify-center lg:w-[80dvw]">
              <FotoCarousel img={img} />
            </div>

            <button onClick={handleBack}>
              <img alt="backbiru" src="/Images/backblack.webp" className="absolute z-20 top-4 left-2 w-10 h-10"></img>
            </button>

            <div className="absolute m-4 -bottom-[6rem] z-30 bg-white mt-2 rounded-xl border border-gray-300 p-4 flex flex-col items-center justify-center w-[95dvw] lg:w-[80.5dvw] lg:rounded-[30px] lg:flex lg:items-start lg:flex-col lg:p-8">
              <div className="text-start w-full mb-2">
                <h2 className="font-['Montserrat'] text-xl font-semibold text-[#687eff] md:text-2xl lg:text-3xl">{data.name}</h2>
                <p className="font-['Montserrat'] text-sm text-gray-500 md:text-base italic">
                  {data.city} - {data.area}
                </p>
              </div>
              <div className="my-2 w-[20.5rem] md:w-[90dvw] lg:w-[75dvw] border-t border-zinc-200 md:my-4"></div>

              <div className="mt-2 w-full rounded-lg max-w-screen-md">
                <p className="font-['Montserrat'] text-gray-700 text-sm font-normal text-justify md:text-base leading-relaxed">{data.description}</p>
              </div>

              {rating.avg_rating && (
                <div className="absolute top-4 right-4 flex items-center bg-white px-2 py-1 rounded-full shadow">
                  <AiFillStar className="text-[#F59E0B] mr-1 text-md lg:text-xl" />
                  <span className="text-sm md:text-md lg:text-lg font-semibold text-[#F59E0B] font-['Montserrat']">{Number(rating.avg_rating).toFixed(1)}/5.0</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 px-2 pb-4 w-full">
            <div className="flex items-center justify-center md:w-[100dvw] lg:w-[85dvw] ">
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />
            </div>
            {!searchQuery && (
              <>
                <div className="relative mt-2">
                  <div className="mx-4 flex flex-row space-x-3 items-center md:mx-0">
                    <img src="/Images/guarantee.webp" className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" alt="top picks"></img>
                    <h4 class="justify-start text-[#687eff] text-md font-medium font-['Montserrat'] md:text-lg lg:text-xl">Laundry Top Picks</h4>
                  </div>
                  <div className="my-2 w-[100dvw] md:w-[95dvw] lg:w-[80dvw] border-t border-zinc-200 md:my-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:mx-12">
                  {topPicks
                    .slice()
                    .sort((a, b) => Number(a.price_text) - Number(b.price_text))
                    .map((item) => (
                      <div key={item.id} onClick={() => handlePesan(item.id)} className="relative bg-white shadow-sm border border-gray-300/30 rounded-lg p-6 cursor-pointer w-full min-w-[95dvw] md:min-w-[100px] ">
                        <div className="flex items-start justify-between">
                          <div className="mr-4">
                            <h3 className="font-['Montserrat'] font-semibold text-md font-semibold text-gray-800 md:text-lg">{item.name}</h3>
                            <p className="font-['Montserrat'] text-[10px] text-gray-500 mt-0.5 md:text-[12px] lg:text-[14px]">{item.description}</p>
                          </div>

                          <span className="font-['Montserrat'] text-md font-bold text-[#40A578] md:text-lg">Rp&nbsp;{Number(item.price_text).toLocaleString("id-ID")}</span>
                        </div>

                        <hr className="my-2 border-gray-200" />

                        <ul className="space-y-1">
                          {item.features.split(",").map((fitur, index) => (
                            <li key={index} className="flex items-center font-['Montserrat'] text-[10px] text-gray-600 md:text-[12px] lg:text-[14px]">
                              <BiCheck className="mr-2 text-[#40A578] text-lg" />
                              {fitur.trim()}
                            </li>
                          ))}
                        </ul>

                        {item.avg_rating && (
                          <div className="absolute right-4 bottom-2 flex items-center justify-end mt-2">
                            <AiFillStar className="mr-1 text-[#F59E0B] text-md lg:text-xl" />
                            <span className="font-['Montserrat'] text-sm font-semibold text-[#F59E0B] md:text-md lg:text-lg">{item.avg_rating}/5.00</span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
            
            {!searchQuery && (
              <div className="mt-2">
                <div className="mx-4 flex flex-row space-x-3 items-center md:mx-0">
                  <img src="/Images/thumbsup.webp" className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" alt="thumbs up"></img>
                  <h4 class="justify-start text-[#687eff] text-md font-medium font-['Montserrat'] md:text-lg lg:text-xl">All Packages</h4>
                </div>
                <div className="my-2 w-[100dvw] md:w-[95dvw] lg:w-[80dvw] border-t border-zinc-200 md:my-4"></div>
              </div>
            )}

            {filteredPackages.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>Tidak ada paket yang sesuai dengan pencarian Anda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 md:mx-12">
                {filteredPackages
                  .slice()
                  .sort((a, b) => Number(a.price_text) - Number(b.price_text))
                  .map((item) => (
                    <div key={item.id} onClick={() => handlePesan(item.id)} className="bg-white shadow-sm border border-gray-300/30 rounded-lg p-6 cursor-pointer w-full min-w-[95dvw] md:min-w-[100px] ">
                      <div className="flex items-start justify-between">
                        <div className="mr-4">
                          <h3 className="font-['Montserrat'] text-md font-semibold text-gray-800 md:text-lg">{item.name}</h3>
                          <p className="font-['Montserrat'] text-[10px] text-gray-500 mt-0.5 md:text-[12px] lg:text-[14px]">{item.description}</p>
                        </div>

                        <span className="font-['Montserrat'] text-md font-bold text-[#40A578] md:text-lg">Rp&nbsp;{Number(item.price_text).toLocaleString("id-ID")}</span>
                      </div>

                      <hr className="my-2 border-gray-200" />

                      <ul className="space-y-1">
                        {item.features.map((fitur, index) => (
                          <li key={index} className="flex items-center font-['Montserrat'] text-[10px] text-gray-600 md:text-[12px] lg:text-[14px]">
                            {<BiCheck className="mr-2 text-[#40A578] text-lg" />}
                            {fitur}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaundryDetail;
