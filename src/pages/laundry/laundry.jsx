import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import laundryServices from "../../services/laundry.service";
import SearchBar from "../../components/bar/search.bar";
import PromoImages from "../../data/promo.images";
import PromoCarousel from "../../components/carousel/promo.carousel";
const LaundryList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredData(data || []);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = (data || []).filter((data) => data.name.toLowerCase().includes(query) || data.area.toLowerCase().includes(query) || data.description.toLowerCase().includes(query));

    setFilteredData(filtered);
  };

  const city = "bogor";

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

  useEffect(() => {
    handleSearch();
  }, [searchQuery, data]);

  const handleBack = () => {
    navigate("/");
  };

  const handleKunjungi = (activeLaundry) => {
    navigate(`/laundry/${activeLaundry}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-row items-start justify-center">
      <section className="relative mx-2 flex flex-col items-center justify-start w-[100dvw] mb-4 md:mt-4 md:w-[90vw]">
        <button onClick={handleBack} className="z-30 w-[50px] h-[50px] absolute bg-transparent top-2 left-2 md:top-6 md:-left-6 lg:-left-12">
          <img alt="backbiru" src="/Images/backblack.webp" className="absolute z-20 top-4 left-2 w-10 h-10 md:w-[3rem] md:h-[3rem] md:top-0"></img>
        </button>
        <div className=" flex flex-col items-center justify-center">
          <nav className="hidden md:w-[100dvw] mb-8 md:block md:flex items-center justify-between pl-20 lg:pl-24 pr-4 py-2 bg-white shadow-md">
            <div className="flex items-center space-x-4">
              <img src="/Images/LogoAkucuciin.png" alt="AkuCuciin Logo" className="w-[150px] lg:w-[200px]" />
            </div>
            <div className="w-full max-w-md">
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />
            </div>
          </nav>
          <div className="mb-12 relative flex items-center justify-center flex-col md:hidden">
            <PromoCarousel img={PromoImages} />
            <div className="z-20 absolute -bottom-12">
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[90vw] mx-auto">
            {filteredData.map((laundry) => (
              <button key={laundry.id} onClick={() => handleKunjungi(laundry.id)} className="w-full text-left bg-white">
                <div className="relative flex flex-row md:flex-col items-center min-h-[90px] overflow-hidden md:min-h-[390px] rounded-xl bg-white border border-neutral-300 shadow-sm shadow-black/10 hover:shadow-md hover:shadow-black/20 transition-all duration-300 ease-out">
                  <img
                    src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${laundry.image.filepath}`}
                    alt={laundry.name}
                    className="w-[8.5rem] h-[120px] object-cover md:w-full md:h-[180px] rounded-l-xl md:rounded-t-xl md:rounded-l-none"
                  />

                  <div className="flex flex-1 flex-col gap-1 p-4 self-start">
                    <h3 className="font-['Montserrat'] text-[14px] md:text-[20px] font-bold text-neutral-700">{laundry.name}</h3>
                    <p className="font-['Montserrat'] text-[10px] md:text-[16px] italic text-zinc-600">{laundry.area}</p>
                    <p className="font-['Montserrat'] text-[9px] md:text-[14px] text-neutral-700 text-justify hyphens-auto">{laundry.description}</p>
                  </div>

                  <div className="hidden md:w-[22rem] border-t border-zinc-400 md:block"></div>

                  <div class="hidden w-[22rem]  h-10 bg-indigo-500 rounded-[10px] my-4 md:flex items-center justify-center md:block">
                    <h4 class="text-white text-base font-semibold font-['Montserrat']">Lihat Detail</h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaundryList;
