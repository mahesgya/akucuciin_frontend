import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar/sidebar";
import LocationSelectorModal from "../../components/modal/location.selector.modal";
import SearchBar from "../../components/ui/bar/search.bar";
import ThemeSwitcher from "../../components/widgets/button/theme.button";
import PromoCarousel from "../../components/widgets/carousel/promo.carousel";
import PromoCarouselDesktop from "../../components/widgets/carousel/promo.carousel.desktop";
import { PromoImages, PromoImagesDesktop } from "../../data/promo.images";
import {
	fetchLocationError,
	fetchLocationStart,
	setLocation,
} from "../../redux/location.slicer";
import laundryServices from "../../services/laundry.service";
import LoadingUtils from "../../utils/loading.utils";

const LaundryList = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [selectedArea, setSelectedArea] = useState(() => {
		// Load from localStorage on initial render
		return localStorage.getItem("selectedArea") || "";
	});
	const [isAreaDropdownOpen, setisAreaDropdownOpen] = useState(false);
	const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
	const { profileData, isLoggedIn } = useSelector((state) => state.auth);
  const [laundryAreas, setLaundryAreas] = useState([]);
  
  const locationState = useSelector((state) => state.location);
	const dispatch = useDispatch();
	const { latitude, longitude, label } = locationState.data;

	const handleAreaSelect = (areaValue) => {
		setSelectedArea(areaValue);
		localStorage.setItem("selectedArea", areaValue); // Save to localStorage
		setisAreaDropdownOpen(false);
	};

  const getLaundryAreas = useCallback(async () => {
    const response = await laundryServices.getLaundryLocations();
    return response.data;
  }, []);

	const getCurrentLocation = useCallback(() => {
		if (!navigator.geolocation) {
			dispatch(
				fetchLocationError("Geolocation tidak didukung oleh browser Anda")
			);
			return;
		}

		dispatch(fetchLocationStart(true));

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const lat = pos.coords.latitude;
				const long = pos.coords.longitude;

				dispatch(
					setLocation({
						latitude: lat,
						longitude: long,
						label: "Lokasi Saat Ini",
					})
				);

				// Save label to localStorage
				localStorage.setItem("locationLabel", "Lokasi Saat Ini");
			},
			(error) => {
				dispatch(
					fetchLocationError(error?.message || "Unable to retrieve your location")
				);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		);
	}, [dispatch]);

	const handleSearch = useCallback(() => {
    if (!searchQuery.trim() || searchQuery.trim() === "") {
        setFilteredData(Array.isArray(data) ? data : []);
        return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = (Array.isArray(data) ? data : []).filter(
        (item) =>
            item.name.toLowerCase().includes(query) ||
            item.area.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
    );

    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
}, [searchQuery, data]);

	const navigate = useNavigate();

	// Get current location only on initial mount if no location is set
	useEffect(() => {
		if (!latitude || !longitude) {
			getCurrentLocation();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await laundryServices.getByCity(selectedArea, latitude, longitude);
				setData(response.data);
    		const areasResponse = await getLaundryAreas();

    		setLaundryAreas(areasResponse);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [latitude, longitude, selectedArea, getLaundryAreas]);

	useEffect(() => {
		handleSearch();
	}, [handleSearch]);

	const handleKunjungi = (activeLaundry, isOpen, is_user_in_radius) => {
		if (!isOpen || !is_user_in_radius) {
			return;
		}
		navigate(`/laundry/${activeLaundry}`);
	};

	if (loading) {
		return <LoadingUtils/>;
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
					<div className="z-20 absolute -bottom-12">
						<SearchBar
							value={searchQuery}
							onChangeText={setSearchQuery}
							onSubmit={handleSearch}
						/>
					</div>
				</div>

				<div className="z-30 absolute top-2 left-2 md:hidden">
					<ThemeSwitcher />
				</div>

				<div className="w-[90dvw] md:w-[87dvw] mt-12 mb-0 md:mb-0 lg:mb-4 flex flex-row justify-between">
					<h3 className="font-['Montserrat'] text-md md:text-2xl lg:text-3xl font-semibold text-blue-primary dark:text-white">
						{isLoggedIn
							? `Halo, ${profileData.data.name}!`
							: "Temukan Laundry Favoritmu"}
					</h3>
					<div className="hidden md:block">
						<ThemeSwitcher />
					</div>
				</div>

				<div className="hidden md:block w-full mt-4">
					<PromoCarouselDesktop img={PromoImagesDesktop} />
				</div>

				<div className="w-full flex-col md:flex-row md:items-center md:justify-between mt-4 mb-6 gap-4 flex md:flex lg:flex">
					{/* Location Picker Dropdown */}
					<div className="relative px-2 md:px-0 lg:px-0">
						<button
							onClick={() => setisAreaDropdownOpen(!isAreaDropdownOpen)}
							className="flex items-center justify-between mx-auto my-3 px-4 py-3 h-14 min-w-[200px] w-full bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-all duration-200"
						>
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-blue-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<div className="text-left">
									<p className="text-xs text-gray-500 dark:text-gray-400 font-['Montserrat']">
										Area Laundry
									</p>
									<p className="text-sm font-medium text-gray-700 dark:text-dark-text font-['Montserrat']">
										{selectedArea || "Pilih Area"}
									</p>
								</div>
							</div>
							<svg
								className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
									isAreaDropdownOpen ? "rotate-180" : ""
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{/* Dropdown Menu */}
						{isAreaDropdownOpen && (
							<div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-card border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

								{/* Header */}
								<div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 rounded-t-lg">
									<p className="text-sm font-semibold text-gray-700 dark:text-dark-text font-['Montserrat']">
										Area Laundry
									</p>
								</div>
								
								{Object.keys(laundryAreas).length > 0 ? (
									Object.keys(laundryAreas).map((areaKey) => (
										<button
											key={areaKey}
											onClick={() => handleAreaSelect(areaKey, areaKey)}
											className="w-full px-4 py-3 text-left text-sm bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors duration-150 last:rounded-b-lg"
										>
											{areaKey}
										</button>
									))
								) : (
									<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
										Memuat area...
									</div>
								)}
							</div>
						)}
					</div>
					<div className="px-2 md:px-0 lg:px-0 w-full md:w-auto">
						<button
							onClick={() => setIsLocationModalOpen(true)}
							className="w-full flex items-center justify-between mx-auto my-3 px-4 py-3 h-14 min-w-[200px] bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-neutral-700 hover:shadow-md hover:border-[#687EFF] transition-all duration-200"
						>
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-[#687EFF]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<div className="text-left">
									<p className="text-xs text-gray-500 dark:text-gray-400 font-['Montserrat']">
										Lokasi
									</p>
									<p className="text-sm font-medium text-gray-700 dark:text-dark-text font-['Montserrat']">
										{label
											? label
											: latitude && longitude
											? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
											: "Pilih Lokasi"}
									</p>
								</div>
							</div>
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					<div className="hidden lg:block w-full">
						<SearchBar
							value={searchQuery}
							onChangeText={setSearchQuery}
							onSubmit={handleSearch}
						/>
					</div>
				</div>

				{selectedArea ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90dvw] md:w-[82vw] lg:w-[86dvw] mx-auto">
						{filteredData.map((laundry) => (
							<button
								key={laundry.id}
								onClick={() =>
									handleKunjungi(
										laundry.id,
										laundry.is_open,
										laundry.is_user_in_radius
									)
								}
								className="w-full text-left bg-white dark:bg-transparent"
							>
								<div className="relative flex flex-row md:flex-col items-center min-h-[90px] h-full overflow-hidden md:min-h-[390px] rounded-xl bg-white dark:bg-dark-card border border-neutral-300 dark:border-neutral-700 shadow-sm shadow-black/10 dark:shadow-black/30 hover:shadow-md hover:shadow-black/20 transition-all duration-300 ease-out">
									<img
										src={
											laundry?.image?.filepath
												? `${process.env.REACT_APP_BASE_BACKEND_URL}/static/${laundry.image.filepath}`
												: "https://placehold.co/600x400" // fallback image to use
										}
										alt={laundry.name}
										className={`w-[8.5rem] h-[120px] object-cover md:w-full md:h-[180px] rounded-l-xl md:rounded-t-xl md:rounded-l-none ${
											laundry.is_open ? "" : "filter grayscale"
										} ${laundry.is_user_in_radius ? "" : "filter grayscale"}`}
									/>

									<div className="flex flex-1 flex-col gap-2 p-4 self-start">
										<h3 className="font-['Montserrat'] text-[14px] md:text-[20px] font-bold text-blue-primary">
											{laundry.name}
										</h3>
										<div>
											<h4 className="font-['Montserrat'] text-[12px] md:text-[15px] text-black29/65 dark:text-dark-text/70">
												{" "}
												{laundry.area +
													" - " +
													laundry.distance_in_km_to_user +
													" km"}
											</h4>
										</div>
										<p className="font-['Montserrat'] text-[10px] md:text-[14px] text-black29/85 dark:text-dark-text/80 text-justify hyphens-auto">
											{laundry.description}
										</p>

										{!laundry.is_open ? (
											<div className="md:hidden bg-[#] flex flex-row items-center gap-1">
												<img
													src="/Images/moon.svg"
													alt="closed"
													className="w-4"
												/>
												<p className="font-['Montserrat'] text-[8px] font-medium text-[#EF4444] text-justify hyphens-auto">
													Sorry, we're closed, come back later!
												</p>
											</div>
										) : laundry.is_user_in_radius ? (
											<div className="md:hidden bg-[#] flex flex-row items-center gap-1"></div>
										) : (
											<div className="md:hidden bg-[#] flex flex-row items-center gap-1">
												<img
													src="/Images/too_far.png"
													alt="closed"
													className="w-4"
												/>
												<p className="font-['Montserrat'] text-[8px] font-medium text-[#EF4444] text-justify hyphens-auto">
													Laundry too far!
												</p>
											</div>
										)}
									</div>

									<div className="hidden md:w-[19rem] lg:w-[21rem] border-t border-zinc-400 dark:border-zinc-700 md:block"></div>

									{!laundry.is_open ? (
										<div class="hidden md:w-[19rem] lg:w-[21rem] border-2 border-[#7F7F7F] dark:border-neutral-500 h-10 bg-[#F4F5FF] dark:bg-neutral-800 rounded-[10px] my-4 md:flex items-center justify-center">
											<h4 class="text-[#EF4444] text-sm lg:text-base font-semibold font-['Montserrat'] flex flex-row items-center gap-2">
												<img src="/Images/moon.svg" alt="closed" />
												Sorry, we're closed, come back later!
											</h4>
										</div>
									) : laundry.is_user_in_radius ? (
										<div class="hidden md:w-[19rem] lg:w-[21rem] h-10 bg-indigo-500 rounded-[10px] my-4 md:flex items-center justify-center">
											<h4 class="text-white text-base font-semibold font-['Montserrat']">
												Lihat Detail
											</h4>
										</div>
									) : (
										<div class="hidden md:w-[19rem] lg:w-[21rem] border border-[#7F7F7F] dark:border-neutral-500 h-10 bg-[#F4F5FF] dark:bg-neutral-800 rounded-[10px] my-4 md:flex items-center justify-center">
											<h4 class="text-[#EF4444] text-sm lg:text-base font-semibold font-['Montserrat'] flex flex-row items-center gap-2">
												<img src="/Images/too_far.png" alt="too far" />
												Laundry too far!
											</h4>
										</div>
									)}
								</div>
							</button>
						))}
					</div>
				) : (
					<h1 className="font-['Montserrat'] font-semibold text-blue-primary dark:text-white">
						Yuk pilih area mu dulu!
					</h1>
				)}
			</section>

			{/* Location Selector Modal */}
			<LocationSelectorModal
				isOpen={isLocationModalOpen}
				onClose={() => setIsLocationModalOpen(false)}
			/>
		</div>
	);
};

export default LaundryList;
