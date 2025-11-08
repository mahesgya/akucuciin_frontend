import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setProfileData } from "../../redux/auth.slicer";

import idLocale from "date-fns/locale/id";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import OrderConfirmationSwal from "../../components/modal/order-confirmation.swal";
import VoucherReferralSwal from "../../components/modal/referral.swal";
import VoucherReferralSheet from "../../components/ui/sheet/referral.sheet";
import customerServices from "../../services/customer.services";
import { errorSwal, successSwal } from "../../utils/alert.utils";
import useIsMobileScreen from "../../utils/isMobileScreen.utils";
import isSpecialVoucher from "../../utils/IsSpecialVoucher.utils";
import transformPhoneNumber from "../../utils/phone.number.utils";
import { toastError, toastSuccess } from "../../utils/toast.utils";
import LocationSelectorModal from "../../components/modal/location.selector.modal";
import LaundryServices from "../../services/laundry.service";

const OrderForm = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const { profileData, accessToken } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: profileData.data.name,
    telephone: profileData.data.telephone,
    address: profileData.data.address,
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupHours, setPickupHours] = useState("");

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const locationState = useSelector((state) => state.location);
  const { latitude, longitude, label } = locationState.data;
  const [userIsInRadius, setUserIsInRadius] = useState(true);

  const { activePaket } = location.state || {};

  const { idlaundry, idpaket } = useParams();
  const navigate = useNavigate();

  const isMobile = useIsMobileScreen(768);
  const [showVoucherReferralSheet, setShowVoucherReferralSheet] = useState(false);
  const [validationResponses, setValidationResponses] = useState({
    referralResponse: null,
    couponResponse: null,
  });

  const [formData, setFormData] = useState({
		laundry_partner_id: idlaundry,
		package_id: idpaket,
		content: "-",
		status: "pending",
		weight: 0,
		price: 0,
		referral_code: "",
		coupon_code: "",
		note: "",
		pickup_date: "",
		user_latitude: latitude,
		user_longitude: longitude,
	});

  const timeSlots = useMemo(() => [
    {
      id: "14-16",
      label: "14:00 - 16:00",
      time: "Siang",
      startHour: 14,
      endHour: 16,
    },
    {
      id: "16-20",
      label: "16:00 - 20:00",
      time: "Sore",
      startHour: 16,
      endHour: 20,
    },
  ], []);

  const isTimeSlotPassed = useCallback((slot) => {
    if (!pickupDate) return false;

    const now = dayjs().tz("Asia/Jakarta");
    const slotTime = dayjs(pickupDate).tz("Asia/Jakarta").hour(slot.startHour).minute(0).second(0);

    // Check if current time is within 45 minutes of slot start time
    return now.isAfter(slotTime.add(45, 'minutes'));
  }, [pickupDate]);

  useEffect(() => {
    if (pickupHours) {
      const selectedSlot = timeSlots.find((slot) => slot.label === pickupHours);
      if (selectedSlot && isTimeSlotPassed(selectedSlot)) {
        setPickupHours(null);
      }
    }
  }, [pickupDate, pickupHours, timeSlots, isTimeSlotPassed]);



  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!accessToken) {
      successSwal("Anda harus login terlebih dahulu.");
      return;
    }

    if (!pickupDate) {
      errorSwal("Pilih Tanggal Penjemputan");
      return;
    }

    if (!pickupHours) {
      errorSwal("Pilih Jam Penjemputan");
      return;
    }

    if (!latitude || !longitude) {
      errorSwal("Pilih Lokasi Penjemputan", "Silakan pilih lokasi penjemputan terlebih dahulu menggunakan tombol 'Pilih Lokasi Penjemputan'.");
      return;
    }

    const pickup_date = dayjs(pickupDate).tz("Asia/Jakarta").format("DD-MM-YYYY");

    const updatedFormData = {
			laundry_partner_id: formData.laundry_partner_id,
			package_id: formData.package_id,
			content: "-",
			status: formData.status,
			weight: formData.weight,
			price: formData.price,
			coupon_code: formData.coupon_code,
			note: formData.note,
			pickup_date: `${pickupHours} ${pickup_date}`,
			referral_code: formData.referral_code,
			user_latitude: latitude,
			user_longitude: longitude,
		};

    const orderConfirmation = await OrderConfirmationSwal({
      "Nama Laundry": activePaket?.laundry_name,
      "Nama Paket": activePaket?.name,
      "Tanggal Penjemputan": pickup_date,
      "Jam Penjemputan": pickupHours,
      "Lokasi Penjemputan": label || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      "Nomor Telephone": profile.telephone || "Tidak ada",
      "Catatan Tambahan": formData.note || "Tidak ada",
      "Kode Referral": formData.referral_code || "Tidak ada",
      "Kode Voucher": formData.coupon_code || "Tidak ada",
    });
    
    if (!orderConfirmation) {
      return;
    }

    profile.telephone = transformPhoneNumber(profile.telephone);

    if (profileData.data.telephone === null || profileData.data.address === null) {
      await customerServices.changeProfile(profile, accessToken);
    }
    await customerServices.orderLaundry(accessToken, updatedFormData, setIsLoading, navigate);
    await dispatch(setProfileData(profile));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleValidationResponse = async (responses) => {
    setValidationResponses(responses);

    if (!responses.referralResponse && responses.referral_code && !responses.couponResponse && responses.coupon_code) {
      toastError(responses.referralResponse.errors);
      toastError(responses.couponResponse.errors);
      return;
    }

    if (responses.referral_code === "") {
      setFormData((prev) => ({
        ...prev,
        referral_code: "",
      }));
    } else if (responses.referralResponse) {
      if (!responses.referralResponse.success) {
        toastError(responses.referralResponse.errors);
      } else {
        setFormData((prev) => ({
          ...prev,
          referral_code: responses.referral_code || prev.referral_code,
        }));
        await toastSuccess(responses.referralResponse.data);
      }
    }

    if (responses.coupon_code === "") {
      setFormData((prev) => ({
        ...prev,
        coupon_code: "",
      }));
    } else if (responses.couponResponse) {
      if (!responses.couponResponse.success) {
        toastError(responses.couponResponse.errors);
      } else {
        setFormData((prev) => ({
          ...prev,
          coupon_code: responses.coupon_code || prev.coupon_code,
        }));
        const percentageDiscount = isSpecialVoucher(responses.couponResponse.data?.name) ? "6% - 62" : responses.couponResponse.data.multiplier
        await toastSuccess(`Kupon "${responses.couponResponse.data.name}" Valid dengan diskon ${percentageDiscount}%`);
      }
    }
  };

  const handleVoucherReferralClick = () => {
    if (isMobile) {
      setShowVoucherReferralSheet(true);
    } else {
      VoucherReferralSwal(formData, setFormData, accessToken, handleValidationResponse);
    }
  };

  const handleEditNotes = () => {
    Swal.fire({
      title: "Catatan",
      input: "textarea",
      inputValue: formData.note || "",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
      didOpen: () => {
        const container = Swal.getContainer();
        const isDark = document.documentElement.classList.contains("dark");
        container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");
      },
      preConfirm: (note) => {
        if (note === null || note.trim() === "") {
          setFormData((prev) => ({ ...prev, note: "" }));
          return note;
        }
        setFormData((prev) => ({ ...prev, note }));
        return note;
      },
    });
  };

  useEffect(() => {
    const fetchLaundryById = async () => {
      // Only fetch if we have valid coordinates
      if (!latitude || !longitude) return;
      
      const response = await LaundryServices.getById(idlaundry, latitude, longitude);
      
      if(response.data.is_user_in_radius !== true){
        setUserIsInRadius(false);
        errorSwal("Maaf, Anda berada di luar jangkauan layanan laundry ini.");
      } else {
        setUserIsInRadius(true);
      }
    }

    fetchLaundryById();

  }, [idlaundry, latitude, longitude]); // Removed isLocationModalOpen dependency

  return (
		<div className="font-['Montserrat'] flex flex-col bg-[#F4F5FF] dark:bg-dark-bg h-full min-h-screen w-screen pb-8 dark:text-dark-text">
			<ToastContainer />

			{showVoucherReferralSheet && (
				<VoucherReferralSheet
					formData={formData}
					isOpen={showVoucherReferralSheet}
					onClose={() => setShowVoucherReferralSheet(false)}
					accessToken={accessToken}
					onValidationResponse={handleValidationResponse}
				/>
			)}

			<div className="flex flex-row items-center justify-start bg-[#687EFF] pl-4 lg:p-8 py-12 mb-6 w-full rounded-b-3xl shadow-sm top-0 left-0 right-0">
				<button onClick={handleBack} className="bg-transparent">
					<img
						alt="backwhite"
						src="/Images/backwhite.webp"
						className="h-10 w-10"
					/>
				</button>
				<h1 className="lg:text-2xl ml-4 text-2xl font-bold text-white font-['Montserrat']">
					{activePaket?.laundry_name}
				</h1>
			</div>

			<form
				onSubmit={handleSubmit}
				className="lg:grid lg:grid-flow-col lg:grid-cols-[2fr_3fr] space-y-4 lg:space-y-0 gap-8 w-full h-full px-3 lg:px-24"
			>
				<div className="h-full flex flex-col w-full space-y-4">
					<div className="relative flex flex-col w-full bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-300/30 dark:border-neutral-700">
						<div className="flex flex-row items-center justify-between mb-4">
							<div className="flex flex-col space-y-2">
								<p className='font-semibold lg:text-xl text-base font-["Montserrat"] dark:text-dark-text'>
									{activePaket?.name}
								</p>
								<p className='font-medium text-sm text-neutral-600 dark:text-dark-text/70 font-["Montserrat"]'>
									{activePaket?.description}
								</p>
							</div>
							<div className="flex flex-col justify-center items-end space-y-2 h-full">
								<p className='font-medium text-base text-green-400 font-["Montserrat"]'>
									Rp{parseInt(activePaket?.price_text).toLocaleString("id-ID")}
								</p>
							</div>
						</div>

						<div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700"></div>

						<div className="flex space-x-2 justify-between h-full">
							<div className="flex flex-col space-y-2 h-full">
								{activePaket?.features?.map((feature, index) => (
									<div
										className="flex flex-row items-center align-middle space-x-2 mt-4"
										key={index}
									>
										<img
											src="/Images/ceklisijo.png"
											alt="check"
											className="lg:h-6 lg:w-6 h-3 w-3"
										/>
										<p className='font-medium lg:text-sm text-xs text-gray-500/80 dark:text-dark-text/80 font-["Montserrat"]'>
											{feature}
										</p>
									</div>
								))}
							</div>
						</div>

						{activePaket?.avg_rating && (
							<div className="absolute bottom-3 right-4 z-10 flex items-center gap-1 pointer-events-none">
								<AiFillStar className="text-[#F59E0B] text-base md:text-lg" />
								<span className="font-['Montserrat'] text-sm md:text-base font-semibold text-[#F59E0B]">
									{Number(activePaket.avg_rating).toFixed(1)}/5.0
								</span>
							</div>
						)}
					</div>

					{(profileData.data.telephone === null ||
						profileData.data.address === null) && (
						<div className="flex flex-col space-y-4">
							<div className="bg-white dark:bg-dark-card rounded-xl px-10 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
								<h4 className="font-['Montserrat'] font-bold text-left text-gray-700 dark:text-dark-text mb-1 text-base">
									Nomor Telephone
								</h4>
								<div className="border-b border-gray-300 dark:border-neutral-700 mb-4">
									<input
										required
										value={profile.telephone}
										onChange={(e) =>
											setProfile({ ...profile, telephone: e.target.value })
										}
										type="number"
										placeholder="Ex: 62858491234"
										className="border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] font-['Montserrat'] rounded-xl p-2 w-full bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm text-gray-700 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-b-2 text-base"
									/>
								</div>
							</div>

							<div className="bg-white dark:bg-dark-card rounded-xl px-10 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
								<h4 className="font-['Montserrat'] font-bold text-left text-gray-700 dark:text-dark-text mb-1 text-base">
									Alamat Lengkap
								</h4>
								<div className="border-b border-gray-300 dark:border-neutral-700 mb-4">
									<input
										required
										value={profile.address}
										onChange={(e) =>
											setProfile({ ...profile, address: e.target.value })
										}
										type="text"
										placeholder="Ex: Dramaga Cantik, Cluster Pinnacle Blok H.28"
										className="border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] font-['Montserrat'] rounded-xl p-2 w-full bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm text-gray-700 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-b-2 text-base"
									/>
								</div>
							</div>
						</div>
					)}

					{/*  THIS CAN BE USED LATER FOR PROMO VOUCHER */}
					{/*
            <Link to="/voucher-gacha/snk" state={{ from: window.location.pathname }} className="font-quick font-semibold text-center text-blue-600 dark:text-blue-400 mb-1 mt-4 text-md md:text-md hover:underline">
            Dapatkan diskon up to 62% SEKARANG! <br/> 👉 Cek caranya disini yukk! 👈
            </Link> 
          */}

					<div className="w-full bg-white dark:bg-dark-card rounded-xl px-6 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
						<h4 className="font-['Montserrat'] font-semibold text-left text-gray-700 dark:text-dark-text mb-3 text-base">
							Lokasi Penjemputan
						</h4>

						{/* Selected Location Display */}
						{latitude && longitude && (
							<div className="w-full">
								<button
									type="button"
									onClick={() => setIsLocationModalOpen(true)}
									className={`w-full flex items-center justify-between px-6 py-4 rounded-xl shadow-sm transition-all duration-200 ${
										latitude && longitude
											? "bg-blue-50 dark:bg-blue-900/20 border-2 border-[#687EFF]/30 dark:border-[#687EFF]/50 hover:bg-blue-100 dark:hover:bg-blue-900/30"
											: "bg-white dark:bg-dark-card border-2 border-dashed border-gray-300 dark:border-neutral-600 hover:border-[#687EFF] hover:bg-blue-50 dark:hover:bg-blue-900/20"
									}`}
								>
									<div className="flex items-center gap-3">
										<div
											className={`p-2 rounded-lg ${
												latitude && longitude
													? "bg-[#687EFF]/10 dark:bg-[#687EFF]/20"
													: "bg-blue-100 dark:bg-blue-900"
											}`}
										>
											<svg
												className={`w-6 h-6 ${
													latitude && longitude
														? "text-[#687EFF] dark:text-[#687EFF]"
														: "text-[#687EFF]"
												}`}
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
										</div>
										<div className="text-left">
											<p
												className={`text-sm font-semibold font-['Montserrat'] ${
													latitude && longitude
														? "text-[#687EFF] dark:text-[#687EFF]"
														: "text-gray-700 dark:text-dark-text"
												}`}
											>
												{latitude && longitude
													? "Lokasi Terpilih"
													: "Pilih Lokasi Penjemputan"}
											</p>
											<p
												className={`text-xs font-['Montserrat'] mt-1 ${
													latitude && longitude
														? "text-[#687EFF]/80 dark:text-[#687EFF]/90"
														: "text-gray-500 dark:text-gray-400"
												}`}
											>
												{latitude && longitude
													? label ||
													  `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
													: "Klik untuk membuka peta dan pilih lokasi"}
											</p>
										</div>
									</div>
									<svg
										className={`w-5 h-5 ${
											latitude && longitude
												? "text-[#687EFF] dark:text-[#687EFF]"
												: "text-gray-400"
										}`}
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
                { !userIsInRadius && (
                  <div className="mt-2 text-sm text-red-600 font-['Montserrat']">
                    Maaf, Anda berada di luar jangkauan layanan laundry ini.
                  </div>
                )}
							</div>
						)}
					</div>

					{/* Location Selector Modal */}
					<LocationSelectorModal
						isOpen={isLocationModalOpen}
						onClose={() => setIsLocationModalOpen(false)}
					/>

					<div
						className={`w-full rounded-xl shadow-sm ${
							formData.referral_code || formData.coupon_code
								? "bg-gradient-to-r from-[#687EFF] to-[#39BCF8]"
								: "bg-white dark:bg-dark-card border border-gray-300/30 dark:border-neutral-700"
						}`}
					>
						{(formData.referral_code || formData.coupon_code) && (
							<div className="space-y-2 bg-gradient-to-r from-[#687EFF] to-[#39BCF8] text-white font-bold py-4 px-8 rounded-xl mb-4">
								{formData.coupon_code && (
									<div className="space-y-2">
										<p className="font-['Montserrat'] font-bold text-base">
											Yay! Anda dapat promo!
										</p>
										<div className="flex flex-col space-y-2">
											<div className="rounded-xl font-bold text-lg flex flex-col justify-center items-center py-2 px-4 bg-white text-black">
												<div className="flex flex-row items-center justify-center">
													{formData.coupon_code}
													<div className="ml-2 px-2 py-1 text-xs text-center rounded-xl text-white font-['Montserrat'] bg-[#EF4444]">
														{isSpecialVoucher(
															validationResponses.couponResponse.data?.name
														)
															? "6% - 62% Off"
															: `${validationResponses.couponResponse.data?.multiplier}% Off`}{" "}
													</div>
												</div>
												<div className="text-xs font-semibold font-['Montserrat'] italic">
													{validationResponses.couponResponse.data?.description}
												</div>
											</div>
										</div>
									</div>
								)}

								{!formData.coupon_code && formData.referral_code && (
									<p className="font-['Montserrat'] font-bold text-base text-center w-full">
										Mantap! Sebarkan ke teman anda
									</p>
								)}

								<div className="flex flex-row items-center justify-between space-x-8">
									{formData.referral_code && (
										<div className="rounded-xl text-sm font-semibold flex items-center justify-center py-2 px-8 bg-white text-[#687EFF] w-full">
											<img
												src="/Images/profile.webp"
												alt="profile"
												className="h-6 w-6 mr-2"
											/>{" "}
											{formData.referral_code}
										</div>
									)}
									<div
										onClick={() => handleVoucherReferralClick()}
										className="bg-transparent text-sm text-white font-['Montserrat'] border rounded-xl w-full px-4 py-2 font-semibold hover:bg-white/20 flex items-center justify-center"
									>
										Edit
									</div>
								</div>
							</div>
						)}

						{formData.referral_code === "" && formData.coupon_code === "" && (
							<div>
								<div
									onClick={() => handleVoucherReferralClick()}
									className="px-10 py-5 flex flex-row align-middle items-center justify-center bg-gradient-to-r from-[#687EFF] to-[#39BCF8] text-white font-bold p-4 rounded-xl"
								>
									<div className="text-2xl lg:text-3xl">%</div>
									<div className="ml-4 w-full flex flex-col text-base font-bold">
										<p>Punya Voucher ?</p>
										<p>Punya Referral Teman?</p>
										<p>Klik di sini</p>
									</div>
								</div>
								<button
									className="w-full h-full py-2 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
									onClick={() =>
										window.open(
											"https://www.instagram.com/akucuciin.id/",
											"_blank"
										)
									}
								>
									<div className="w-full flex flex-row h-full items-center align-middle justify-center text-[#687EFF] font-['Montserrat'] font-semibold text-sm lg:text-base hover:underline">
										<p className="text-[#687EFF] mr-1 text-sm">
											cek promo lain di instagram akucuciin.id{" "}
										</p>
										<img
											src="/Images/ArrowLeft2.png"
											alt="arrow"
											className="h-4 rotate-180"
										/>
									</div>
								</button>
							</div>
						)}
					</div>
				</div>

				<div className="bg-white dark:bg-dark-card flex flex-col rounded-xl px-6 md:px-10 py-5 space-y-4 h-fit w-full relative shadow-sm border border-gray-300/30 dark:border-neutral-700">
					<h4 className="font-['Montserrat'] font-semibold text-left text-gray-700 dark:text-dark-text mb-1 text-sm lg:text-xl">
						Kapan baju kotornya mau dijemput?
					</h4>

					<div className="flex flex-col w-full">
						<DatePicker
							inline
							required
							selected={pickupDate}
							onChange={(date) => setPickupDate(date)}
							dateFormat="eeee, dd MMMM yyyy"
							locale={idLocale}
							renderCustomHeader={({
								date,
								decreaseMonth,
								increaseMonth,
								prevMonthButtonDisabled,
								nextMonthButtonDisabled,
							}) => (
								<div
									className="flex items-center justify-between px-4 py-3 rounded-t-lg
                  bg-white dark:bg-dark-card-darker
                  border-b border-gray-200 dark:border-neutral-700"
								>
									<button
										type="button"
										onClick={decreaseMonth}
										disabled={prevMonthButtonDisabled}
										aria-label="Bulan sebelumnya"
										className="inline-flex items-center justify-center h-9 w-9 rounded-full
                 text-gray-700 dark:text-dark-text
                 hover:bg-gray-100 dark:hover:bg-dark-card
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:ring-offset-2 dark:focus:ring-offset-dark-card-darker
                 disabled:opacity-40 disabled:hover:bg-transparent"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-5 w-5"
											fill="none"
											aria-hidden="true"
										>
											<path
												d="M15 19L8 12l7-7"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>

									<div
										className="font-['Montserrat'] font-extrabold text-lg
                 text-gray-900 dark:text-dark-text"
										aria-live="polite"
									>
										{date.toLocaleDateString("id-ID", {
											month: "long",
											year: "numeric",
										})}
									</div>
									<button
										type="button"
										onClick={increaseMonth}
										disabled={nextMonthButtonDisabled}
										aria-label="Bulan berikutnya"
										className="inline-flex items-center justify-center h-9 w-9 rounded-full
                 text-gray-700 dark:text-dark-text
                 hover:bg-gray-100 dark:hover:bg-dark-card
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:ring-offset-2 dark:focus:ring-offset-dark-card-darker
                 disabled:opacity-40 disabled:hover:bg-transparent"
									>
										<svg
											viewBox="0 0 24 24"
											className="h-5 w-5"
											fill="none"
											aria-hidden="true"
										>
											<path
												d="M9 5l7 7-7 7"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							)}
							placeholderText="Pilih Tanggal Penjemputan..."
							minDate={new Date()}
							style={{ width: "100%" }}
							calendarClassName="font-['Montserrat'] !bg-white dark:!bg-dark-card dark:!text-dark-text !rounded-lg !border-0 !shadow-none"
							className="hidden"
							dayClassName={() =>
								"font-['Montserrat'] text-gray-800 dark:text-dark-text"
							}
							weekDayClassName={() =>
								"font-['Montserrat'] text-gray-500 dark:text-dark-text/70"
							}
						/>

						<div className="flex flex-col w-full h-full mt-4 border-t-2 border-gray-200 dark:border-neutral-700 pt-4">
							<div className="flex flex-col w-full">
								{timeSlots.map((slot) => {
									const isDisabled = !pickupDate || isTimeSlotPassed(slot);
									const isSelected = pickupHours === slot.label;

									return (
										<div
											key={slot.id}
											className={
												"flex items-center mb-1 py-2 rounded-md transition-colors duration-200 " +
												(isDisabled
													? "opacity-60 cursor-not-allowed text-gray-400"
													: isSelected
													? "bg-blue-50 text-blue-700 dark:bg-dark-card-darker dark:text-dark-text font-semibold"
													: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-card dark:text-dark-text dark:hover:bg-dark-card-darker cursor-pointer")
											}
										>
											<input
												type="radio"
												id={`time-slot-${slot.id}`}
												name="pickupTime"
												value={slot.label}
												checked={isSelected}
												onChange={() =>
													!isDisabled && setPickupHours(slot.label)
												}
												disabled={isDisabled}
												className={`form-radio h-4 w-4 ${
													isDisabled
														? "text-gray-400"
														: "text-indigo-600 focus:ring-indigo-500"
												} border-gray-300 dark:border-neutral-700`}
											/>
											<label
												htmlFor={`time-slot-${slot.id}`}
												className={`ml-2 font-["Montserrat"] text-sm lg:text-base font-semibold ${
													isDisabled
														? "text-gray-400"
														: "text-gray-700 dark:text-dark-text"
												} cursor-pointer`}
											>
												{slot.label}
											</label>
										</div>
									);
								})}
							</div>

							{formData.note ? (
								<div className="flex flex-col w-full h-fit space-y-2 mt-2 border-l-2 mb-4 md:mb-12 border-[#687EFF] pl-4">
									<p className="font-['Montserrat'] max-w-60 h-full overflow-clip text-ellipsis font-medium text-[#7F7F7F] dark:text-dark-text/80 mb-1 text-sm">
										{formData.note}
									</p>
									<div
										onClick={() => handleEditNotes()}
										className="flex w-fit items-center text-sm justify-between bg-white dark:bg-dark-card border border-[#687EFF] text-[#687EFF] font-semibold py-2 px-4 rounded-xl "
									>
										Edit
									</div>
								</div>
							) : (
								<div
									onClick={() => handleEditNotes()}
									className="flex items-center text-sm mb-4 md:mb-12 justify-between mt-2 border bg-[#687EFF] font-semibold text-white border-gray-300 dark:border-neutral-700 py-2 px-4 rounded-xl w-fit"
								>
									<p>Catatan</p>
									<img src="/Images/note.png" alt="notes" className="ml-2" />
								</div>
							)}
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={`shadow-sm font-['Montserrat'] font-base lg:text-xl ${
							isLoading
								? "bg-gray-400 text-gray-600 cursor-not-allowed"
								: "bg-green-500 text-white"
						} font-semibold p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg`}
					>
						{isLoading ? "Loading..." : "Pesan"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default OrderForm;
