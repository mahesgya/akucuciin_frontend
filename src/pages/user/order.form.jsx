import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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

import customerServices from "../../services/customer.services";
import { errorSwal, successSwal } from "../../utils/alert.utils";
import useIsMobileScreen from "../../utils/isMobileScreen.utils";
import transformPhoneNumber from "../../utils/phone.number.utils";
import { toastError, toastSuccess } from "../../utils/toast.utils";
import isSpecialVoucher from "../../utils/IsSpecialVoucher.utils";
import VoucherReferralSwal from "../../components/modal/referral.swal";
import VoucherReferralSheet from "../../components/ui/sheet/referral.sheet";

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

	const [isLoading, setIsLoading] = useState(false);
	const [pickupDate, setPickupDate] = useState(null);
	const [pickupHours, setPickupHours] = useState("");

	const [lastOrder, setLastOrder] = useState(null);

	const location = useLocation();
	const { activePaket } = location.state || {};

	const { idlaundry, idpaket } = useParams();
	const navigate = useNavigate();

	const isMobile = useIsMobileScreen(768);
	const [showVoucherReferralSheet, setShowVoucherReferralSheet] =
		useState(false);
	const [validationResponses, setValidationResponses] = useState({
		referralResponse: null,
		couponResponse: null,
	});

	const [formData, setFormData] = useState({
		laundry_partner_id: idlaundry,
		package_id: idpaket,
		content: "-",
		status: "pending",
		maps_pinpoint: "",
		weight: 0,
		price: 0,
		referral_code: "",
		coupon_code: "",
		note: "",
		pickup_date: "",
	});

	const timeSlots = [
		{
			id: "12-14",
			label: "12:00 - 14:00",
			time: "Siang",
			startHour: 12,
			endHour: 14,
		},
		{
			id: "14-16",
			label: "14:00 - 16:00",
			time: "Siang",
			startHour: 14,
			endHour: 16,
		},
		{
			id: "16-18",
			label: "16:00 - 18:00",
			time: "Sore",
			startHour: 16,
			endHour: 18,
		},
		{
			id: "18-20",
			label: "18:00 - 20:00",
			time: "Malam",
			startHour: 18,
			endHour: 20,
		},
	];

	const isTimeSlotPassed = (slot) => {
		if (!pickupDate) return false;

		const now = dayjs().tz("Asia/Jakarta");

		const slotTime = dayjs(pickupDate)
			.tz("Asia/Jakarta")
			.hour(slot.startHour)
			.minute(0)
			.second(0);

		return now.isAfter(slotTime);
	};

	useEffect(() => {
		if (pickupHours) {
			const selectedSlot = timeSlots.find((slot) => slot.label === pickupHours);
			if (selectedSlot && isTimeSlotPassed(selectedSlot)) {
				setPickupHours(null);
			}
		}
	}, [pickupDate]);

	useEffect(() => {
		const fetchLastOrder = async () => {
			const response = await customerServices.getLastOrder(accessToken);
			setLastOrder(response.data);
		};
		fetchLastOrder();
	}, []);

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

		const pickup_date = dayjs(pickupDate)
			.tz("Asia/Jakarta")
			.format("DD-MM-YYYY");

		const updatedFormData = {
			laundry_partner_id: formData.laundry_partner_id,
			package_id: formData.package_id,
			content: "-",
			status: formData.status,
			maps_pinpoint: formData.maps_pinpoint,
			weight: formData.weight,
			price: formData.price,
			referral_code: formData.referral_code,
			coupon_code: formData.coupon_code,
			note: formData.note,
			pickup_date: `${pickupHours} ${pickup_date}`,
		};

		profile.telephone = transformPhoneNumber(profile.telephone);

		if (
			profileData.data.telephone === null ||
			profileData.data.address === null
		) {
			await customerServices.changeProfile(profile, accessToken);
		}
		await customerServices.orderLaundry(
			accessToken,
			updatedFormData,
			setIsLoading,
			navigate
		);
		await dispatch(setProfileData(profile));
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handleValidationResponse = async (responses) => {
		setValidationResponses(responses);

		if (
			!responses.referralResponse &&
			responses.referral_code &&
			!responses.couponResponse &&
			responses.coupon_code
		) {
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
				await toastSuccess(
					`Kupon "${responses.couponResponse.data.name}" Valid dengan diskon ${responses.couponResponse.data.multiplier}%`
				);
			}
		}
	};

	const handleVoucherReferralClick = () => {
		if (isMobile) {
			setShowVoucherReferralSheet(true);
		} else {
			VoucherReferralSwal(
				formData,
				setFormData,
				accessToken,
				handleValidationResponse
			);
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

	return (
		<div className="flex flex-col bg-[#F4F5FF] h-full min-h-screen w-screen pb-8">
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

			<div className="flex flex-row items-center justify-start bg-[#687EFF] pl-4 lg:p-8 py-12 mb-6 w-full rounded-b-3xl shadow-md top-0 left-0 right-0">
				<button onClick={handleBack} className="bg-transparent">
					<img
						alt="backwhite"
						src="/Images/backwhite.webp"
						className="h-10 w-10"
					></img>
				</button>
				<h1 className="lg:text-4xl ml-4 text-2xl font-bold text-white font-['Montserrat']">
					{activePaket.laundry_name}
				</h1>
			</div>

			<form
				onSubmit={handleSubmit}
				className="lg:grid lg:grid-flow-col lg:grid-cols-2 space-y-4 lg:space-y-0 gap-8 w-full h-full px-8 lg:px-24"
			>
				<div className="h-full flex flex-col w-full space-y-4">
					<div className="flex flex-col w-full bg-white p-6 rounded-lg shadow-lg">
						<div className="flex flex-row items-center justify-between mb-4">
							<div className="flex flex-col space-y-2">
								<p className='font-semibold lg:text-xl text-base font-["Montserrat"]'>
									{activePaket.name}
								</p>
								<p className='font-medium text-sm text-neutral-600 font-["Montserrat"]'>
									{activePaket.description}
								</p>
							</div>
							<div className="flex flex-col justify-center items-end space-y-2 h-full">
								<p className='font-medium text-base text-green-400 font-["Montserrat"]'>
									Rp
									{parseInt(activePaket.price_text).toLocaleString("id-ID")}
								</p>
							</div>
						</div>

						<div className="w-full border-b-2 border-neutral-200"></div>

						<div className="flex space-x-2 justify-between h-full">
							<div className="flex flex-col space-y-2 h-full">
								{activePaket.features?.map((feature, index) => (
									<div
										className="flex flex-row items-center align-middle space-x-2 mt-4"
										key={index}
									>
										<img
											src="/Images/ceklisijo.png"
											alt="check"
											className="lg:h-6 lg:w-6 h-3 w-3"
										/>
										<p
											key={index}
											className='font-medium lg:text-sm text-xs text-neutral-400 font-["Montserrat"]'
										>
											{feature}
										</p>
									</div>
								))}
							</div>
						</div>
						{activePaket.avg_rating && (
							<div className="relative h-full bottom-0 flex items-center mt-2">
								<AiFillStar className="mr-1 text-[#F59E0B] text-sm lg:text-xl" />
								<span className="font-['Montserrat'] text-sm font-semibold text-[#F59E0B]">
									{Number(activePaket.avg_rating)}/5.0
								</span>
							</div>
						)}
					</div>
					{(profileData.data.telephone === null ||
						profileData.data.address === null) && (
						<div className="flex flex-col space-y-4">
							<div className="bg-white rounded-lg px-10 py-5 shadow-md">
								<h4 className="font-[Montserrat] font-bold text-left text-gray-700 mb-1 text-base">
									Nomor Telephone
								</h4>
								<div className="border-b border-gray-300 mb-4">
									<input
										required
										value={profile.telephone}
										onChange={(e) =>
											setProfile({ ...profile, telephone: e.target.value })
										}
										type="number"
										placeholder="Ex: 62858491234"
										className="border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] font-[Montserrat] rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base"
									/>
								</div>
							</div>

							<div className="bg-white rounded-lg px-10 py-5 shadow-md">
								<h4 className="font-[Montserrat] font-bold text-left text-gray-700 mb-1 text-base">
									Alamat Lengkap
								</h4>
								<div className="border-b border-gray-300 mb-4">
									<input
										required
										value={profile.address}
										onChange={(e) =>
											setProfile({ ...profile, address: e.target.value })
										}
										type="text"
										placeholder="Ex: Dramaga Cantik, Cluster Pinnacle Blok H.28"
										className="border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:[-webkit-appearance:none] font-[Montserrat] rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base"
									/>
								</div>
							</div>
						</div>
					)}
					<div className="w-full bg-white rounded-lg px-6 py-5 shadow-lg">
						<h4 className="font-[Montserrat] font-semibold text-left text-gray-700 mb-1 text-base">
							Link Google Maps
						</h4>
						<input
							required
							value={formData.maps_pinpoint}
							onChange={(e) =>
								setFormData({ ...formData, maps_pinpoint: e.target.value })
							}
							type="text"
							placeholder="Ex: https://maps.app.goo.gl/..."
							className="font-[Montserrat] rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base"
						/>
						{lastOrder && lastOrder.maps_pinpoint && (
							<div className="mt-4 w-full flex flex-col gap-2 justify-between items-center mb-2">
								<div className="border border-white align-middle bg-[#687EFF] w-full rounded-full">
									<button
										type="button"
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												maps_pinpoint: lastOrder.maps_pinpoint,
											}))
										}
										className="font-[Montserrat] w-full p-2 rounded-lg font-semibold text-white text-sm"
									>
										Gunakan Maps Sebelumnya
									</button>
								</div>

								<div className="border border-[#687EFF] w-full rounded-full align-middle">
									<button
										type="button"
										onClick={() =>
											window.open(`${lastOrder.maps_pinpoint}`, "_blank")
										}
										className="font-[Montserrat] w-full p-2 rounded-lg font-semibold text-[#687EFF] text-sm"
									>
										Cek Maps Sebelumnya
									</button>
								</div>
							</div>
						)}
						<div className="flex flex-row space-x-1 items-center justify-start hover:underline">
							<img
								src="/Images/gmaps.png"
								alt=""
								className="w-[20px] h-[20px]"
							/>
							<a
								target="_blank"
								href="https://www.google.com/maps"
								className="font-[Montserrat] font-medium text-[#687EFF] mb-1 mt-2 text-sm"
								rel="noopener noreferrer"
							>
								Google Maps
							</a>
						</div>
					</div>

					<Link
						to="/voucher-gacha/snk"
						state={{ from: window.location.pathname }}
						className="font-quick font-semibold text-center text-blue-600 mb-1 mt-4 text-md md:text-md hover:underline"
					>
						Dapatkan diskon up to 62% SEKARANG! 👉 Cek caranya disini yukk! 👈
					</Link>
					<div
						className={`w-full rounded-lg shadow-md ${
							formData.referral_code || formData.coupon_code
								? "bg-gradient-to-r from-[#687EFF] to-[#39BCF8]"
								: "bg-white"
						}`}
					>
						{(formData.referral_code || formData.coupon_code) && (
							<div className="space-y-2 bg-gradient-to-r from-[#687EFF] to-[#39BCF8] text-white font-bold py-4 px-8 rounded-lg mb-4">
								{formData.coupon_code && (
									<div className="space-y-2">
										<p className="font-[Montserrat] font-bold text-base">
											Yay! Anda dapat promo!
										</p>
										<div className="flex flex-col space-y-2">
											<div className="rounded-lg font-bold text-lg flex flex-col justify-center items-center py-2 px-4 bg-white text-black">
												<div className="flex flex-row items-center justify-center">
													{formData.coupon_code}
													<div className="ml-2 px-2 py-1 text-xs text-center rounded-full text-white font-[Montserrat] bg-[#EF4444]">
														{isSpecialVoucher(
															validationResponses.couponResponse.data?.name
														)
															? "6% - 62% Off"
															: `${validationResponses.couponResponse.data?.multiplier}% Off`}{" "}
													</div>
												</div>
												<div className="text-sm font-semibold font-[Montserrat] italic border-t border-gray-300">
													{validationResponses.couponResponse.data?.description}
												</div>
											</div>
										</div>
									</div>
								)}

								{!formData.coupon_code && formData.referral_code && (
									<p className="font-[Montserrat] font-bold text-base text-center w-full">
										Mantap! Sebarkan ke teman anda
									</p>
								)}

								<div className="flex flex-row items-center justify-between space-x-8">
									{formData.referral_code && (
										<div className="rounded-full text-sm font-semibold flex items-center justify-center py-2 px-8 bg-white text-[#687EFF] w-full">
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
										className="bg-transparent text-sm text-white font-[Montserrat] border rounded-full w-full px-4 py-2 font-semibold hover:bg-white/20 flex items-center justify-center"
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
									className="px-10 py-5 flex flex-row align-middle items-center justify-center bg-gradient-to-r from-[#687EFF] to-[#39BCF8] text-white font-bold p-4 rounded-lg"
								>
									<div className="text-2xl lg:text-3xl">%</div>
									<div className="ml-4 w-full flex flex-col text-base font-bold">
										<p>Punya Voucher ?</p>
										<p>Punya Referral Teman?</p>
										<p>Klik di sini</p>
									</div>
								</div>
								<button
									className="w-full h-full py-2 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									onClick={() =>
										window.open(
											"https://www.instagram.com/akucuciin.id/",
											"_blank"
										)
									}
								>
									<div className="w-full flex flex-row h-full items-center align-middle justify-center text-[#687EFF] font-[Montserrat] font-semibold text-sm lg:text-base hover:underline">
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
				<div className="bg-white flex flex-col rounded-lg px-10 py-5 space-y-4 h-fit w-full relative shadow-lg">
					<h4 className="font-[Montserrat] font-semibold text-left text-gray-700 mb-1 text-sm lg:text-xl">
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
							placeholderText="Pilih Tanggal Penjemputan..."
							minDate={new Date()}
							style={{ width: "100%" }}
							calendarClassName="react-datepicker-wrapper react-datepicker__input-container react-datepicker__month-container react-datepicker__header "
							className="font-[Montserrat] rounded-lg p-2 bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base lg:text-base"
						/>

						<div className="flex flex-col w-full h-full mt-4 border-t-2 border-gray-200 pt-4">
							<div className="flex flex-col w-full">
								{timeSlots.map((slot) => {
									const isDisabled =
										!pickupDate || isTimeSlotPassed(slot, pickupDate);
									const isSelected = pickupHours === slot.label;

									return (
										<div
											key={slot.id}
											className={
												`flex items-center mb-1 py-2 rounded-md transition-colors duration-200 ` +
												(isDisabled
													? "opacity-60 cursor-not-allowed text-gray-400"
													: isSelected
													? "bg-blue-50 text-blue-700 font-semibold" 
													: "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer")
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
												} border-gray-300`}
											/>
											<label
												htmlFor={`time-slot-${slot.id}`}
												className={`ml-2 font-[Montserrat] text-sm lg:text-base font-semibold ${
													isDisabled ? "text-gray-400" : "text-gray-700"
												} cursor-pointer`}
											>
												{slot.label}
											</label>
										</div>
									);
								})}
							</div>
							{formData.note ? (
								<div className="flex flex-col w-full h-fit space-y-2 mt-2 border-l-2 mb-12 border-[#687EFF] pl-4">
									<p className="font-[Montserrat] max-w-60 h-full overflow-clip text-ellipsis font-medium text-[#7F7F7F] mb-1 text-sm">
										{formData.note}
									</p>
									<div
										onClick={() => handleEditNotes()}
										className="flex w-fit items-center text-sm justify-between bg-white border border-[#687EFF] text-[#687EFF] font-semibold py-2 px-4 rounded-full "
									>
										Edit
									</div>
								</div>
							) : (
								<div
									onClick={() => handleEditNotes()}
									className="flex items-center text-sm mb-12 justify-between mt-2 border bg-[#687EFF] font-semibold text-white border-gray-300 py-2 px-4 rounded-full w-fit"
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
						className={`shadow-md font-[Montserrat] font-base lg:text-xl  ${
							isLoading
								? "bg-gray-400 text-gray-600 cursor-not-allowed"
								: "bg-green-500 text-white"
						} font-semibold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
					>
						{isLoading ? "Loading..." : "Pesan"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default OrderForm;
