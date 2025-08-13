import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/ui/bar/search.bar";
import PromoCarousel from "../../components/widgets/carousel/promo.carousel";
import PromoImages from "../../data/promo.images";
import laundryServices from "../../services/laundry.service";
import Sidebar from "../../components/layout/sidebar/sidebar";
import PromoCarouselDesktop from "../../components/widgets/carousel/promo.carousel.desktop";
import ThemeSwitcher from "../../components/widgets/button/theme.button";
import { useSelector } from "react-redux";

const LaundryList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { profileData, isLoggedIn } = useSelector((state) => state.auth);

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

  const handleKunjungi = (activeLaundry, isOpen) => {
    if (!isOpen) {
      return;
    }
    navigate(`/laundry/${activeLaundry}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="bg-[#F9FAFB] dark:bg-dark-bg relative min-h-[100dvh] flex flex-row items-start justify-center">
      <Sidebar />
      <section className="mb-36 relative mx-2 flex flex-col items-center justify-start w-[100dvw] md:mb-4 md:px-6 md:mt-0 md:w-[90dvw] lg:mt-0 dark:text-dark-text">
        <div className="mb-4 relative flex items-center justify-center flex-col md:hidden">
          <PromoCarousel img={PromoImages} />
          <div className="z-20 absolute -bottom-12 ">
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />
          </div>
        </div>

        <div className="w-[90dvw] md:w-[87dvw] mt-8 mb-4 md:mb-0 lg:mb-4 flex justify-between">
          <h3 className="font-['Montserrat'] text-md md:text-xl font-semibold text-blue-primary dark:text-white">{isLoggedIn ? `Halo, ${profileData.data.name}!` : "Temukan Laundry Favoritmu"}</h3>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="hidden md:block w-full mt-4 mb-4">
          <PromoCarouselDesktop img={PromoImages} />
          <div className="mt-3">
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={handleSearch} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[90dvw] md:w-[82vw] lg:w-[86dvw] mx-auto">
          {filteredData.map((laundry) => (
            <button key={laundry.id} onClick={() => handleKunjungi(laundry.id, laundry.is_open)} className="w-full text-left bg-white dark:bg-transparent">
              <div className="relative flex flex-row md:flex-col items-center min-h-[90px] h-full overflow-hidden md:min-h-[390px] rounded-xl bg-white dark:bg-dark-card border border-neutral-300 dark:border-neutral-700 shadow-sm shadow-black/10 dark:shadow-black/30 hover:shadow-md hover:shadow-black/20 transition-all duration-300 ease-out">
                <img
                  src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${laundry.image.filepath}`}
                  alt={laundry.name}
                  className={`w-[8.5rem] h-[120px] object-cover md:w-full md:h-[180px] rounded-l-xl md:rounded-t-xl md:rounded-l-none ${laundry.is_open ? "" : "filter grayscale"}`}
                />

                <div className="flex flex-1 flex-col gap-1 p-4 self-start">
                  <div className="">
                    <h3 className="font-['Montserrat'] text-[14px] md:text-[20px] font-bold text-blue-primary">{laundry.name}</h3>
                    <h4 className="font-['Montserrat'] text-[12px] md:text-[14px] text-black29/70 dark:text-dark-text/70"> {laundry.area}</h4>
                  </div>
                  <p className="font-['Montserrat'] text-[8px] md:text-[14px] text-black29/85 dark:text-dark-text/80 text-justify hyphens-auto">{laundry.description}</p>

                  {!laundry.is_open && (
                    <div className="md:hidden bg-[#] flex flex-row items-center gap-1">
                      <img src="/Images/moon.svg" alt="closed" className="w-4" />
                      <p className="font-['Montserrat'] text-[8px] font-medium text-[#EF4444] text-justify hyphens-auto">Sorry, we're closed, come back later!</p>
                    </div>
                  )}
                </div>

                <div className="hidden md:w-[19rem] lg:w-[21rem] border-t border-zinc-400 dark:border-zinc-700 md:block"></div>

                {laundry.is_open ? (
                  <div class="hidden md:w-[19rem] lg:w-[21rem] h-10 bg-indigo-500 rounded-[10px] my-4 md:flex items-center justify-center">
                    <h4 class="text-white text-base font-semibold font-['Montserrat']">Lihat Detail</h4>
                  </div>
                ) : (
                  <div class="hidden md:w-[19rem] lg:w-[21rem] border-2 border-[#7F7F7F] dark:border-neutral-500 h-10 bg-[#F4F5FF] dark:bg-neutral-800 rounded-[10px] my-4 md:flex items-center justify-center">
                    <h4 class="text-[#EF4444] text-sm lg:text-base font-semibold font-['Montserrat'] flex flex-row items-center gap-2">
                      <img src="/Images/moon.svg" alt="closed" />
                      Sorry, we're closed, come back later!
                    </h4>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LaundryList;
