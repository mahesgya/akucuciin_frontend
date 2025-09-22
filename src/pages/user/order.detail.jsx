import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import { successSwal } from "../../utils/alert.utils";
import ddmmyyFormatter from "../../utils/ddmmyyFormatter.utils";
import transformPhoneNumber from "../../utils/phone.number.utils";
import RatingSwal from "../../components/modal/rating.swal";
import FlexRowAccordion from "../../components/ui/accordian/flexrow.accordian";
import TrackOrderTimeline from "../../components/ui/timeline/order.timeline";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [data, setData] = useState();
  const { accessToken } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);

  const handleStarClick = () => {
    RatingSwal(accessToken, orderId);
  };

  const handlePayment = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Anda akan di arahkan ke laman pembayaran?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
    });

    if (confirmed.isConfirmed) {
      await CustomerServices.orderPayment(accessToken, id);
    }
  };

  const handleCancelOrder = async (id) => {
    const confirmed = await Swal.fire({
      title: "Kenapa cancel order?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
      input: "text",
      inputPlaceholder: "berikan alasan anda",
      background: "#fff",
      inputAttributes: {
        required: true,
      },
      preConfirm: async (reason) => {
        try {
          if (!reason) {
            Swal.showValidationMessage("Alasan tidak boleh kosong");
            return false;
          }
          return reason;
        } catch (error) {
          Swal.showValidationMessage("Terjadi kesalahan, silakan coba lagi");
          return false;
        }
      },
    });

    if (confirmed.isConfirmed) {
      try {
        const reason = confirmed.value;
        await CustomerServices.cancelOrder(accessToken, id, reason);

        const result = await successSwal("Order berhasil dibatalkan");
        if (result.isConfirmed || result.isDismissed) {
          window.location.reload();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal membatalkan order",
          text: "Silakan coba lagi",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await CustomerServices.getSingleOrder(accessToken, orderId);
      setData(response.data);
      setRating(response.data.rating ? response.data.rating : 0);
    };

    if (accessToken && orderId) {
      fetchData();
    }
  }, [accessToken, orderId]);

  if (!data) {
    return (
			<div className="h-screen flex items-center justify-center bg-[#F7F9FF] font-['Montserrat']">
				<p className="text-lg text-gray-600">Loading order details...</p>
			</div>
		);
  }

  return (
		<div className="lg:min-h-screen h-full flex flex-col items-center justify-start bg-gray-50 dark:bg-dark-bg">
			{data.status !== "batal" && (
				<div
					className={`flex flex-col items-center justify-center ${
						data.status === "selesai" ? "bg-green-500" : "bg-[#687EFF]"
					} lg:p-8 py-12 mb-6 lg:h-28 h-24 w-full rounded-b-3xl top-0 left-0 right-0`}
				>
					<a href="/order">
						<img
							alt="backwhite"
							src="/Images/BackButton.png"
							className="absolute top-8 left-5 lg:h-12 lg:w-12 h-8 w-8"
						/>
					</a>
					<h1 className="lg:text-[32px] text-[24px] font-bold text-white text-center font-['Montserrat']">
						{data.status === "selesai" ? "Order Selesai" : "Berhasil"}
					</h1>
					<p className="lg:text-xl text-sm text-white font-['Montserrat']">
						{data.id}
					</p>
				</div>
			)}

			{data.status === "batal" && (
				<div className="flex flex-col items-center justify-center bg-[#EF4444] lg:p-8 py-12 mb-6 lg:h-28 h-24 w-full rounded-b-3xl top-0 left-0 right-0">
					<a href="/order">
						<img
							alt="backwhite"
							src="/Images/backwhite.webp"
							className="absolute top-8 left-5"
						/>
					</a>
					<h1 className="lg:text-4xl text-2xl font-bold h-[80%] text-white text-center font-['Montserrat']">
						Order Batal
					</h1>
					<p className="lg:text-2xl text-sm text-white font-['Montserrat']">
						{data.id}
					</p>
				</div>
			)}

			{/* Main */}
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 h-full pb-8 w-full px-4 lg:px-28">
				<div
					className={`order-1 flex flex-col ${
						data.status === "selesai" ? "space-y-4" : ""
					}`}
				>
					{/* Rating */}
					<div
						className={`flex items-center justify-center font-['Montserrat'] rounded-lg ${
							data.status === "selesai" ? "border border-[#D0D5DD] dark:border-[#423E3E]" : ""
						} `}
					>
						{data.status === "selesai" && data.rating === 0 && (
							<div className="bg-white dark:bg-dark-card rounded-lg p-5 w-full">
								<h2 className="text-lg font-bold text-center text-black dark:text-dark-text mb-2 font-['Montserrat']">
									Berikan rating yuk!
								</h2>
								<p className="lg: text-sm text-center text-gray-600 dark:text-dark-text/70 mb-6 font-['Montserrat'] font-medium">
									(1 mengecewakan, 5 mantap! )
								</p>

								<div className="flex justify-center mb-6">
									{[1, 2, 3, 4, 5].map((star) => (
										<svg
											key={star}
											className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out ${
												star <= rating
													? "text-yellow-400"
													: "text-gray-300 hover:text-gray-400"
											}`}
											fill="currentColor"
											viewBox="0 0 20 20"
											onClick={() => handleStarClick()}
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
							</div>
						)}

						{data.status === "selesai" && data.rating !== 0 && (
							<div className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 w-full">
								<h2 className="text-lg font-bold text-center text-black dark:text-dark-text mb-2 font-['Montserrat']">
									Terima kasih sudah memberikan penilaian ^^
								</h2>
								<h3 className="text-lg font-semibold text-center text-gray-600 dark:text-dark-text/70 mb-4 font-['Montserrat']">
									"{data.review}"
								</h3>

								<div className="flex justify-center mb-6">
									{Array.from({ length: data.rating }, (_, i) => i + 1).map(
										(star) => (
											<svg
												key={star}
												className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out ${
													star <= rating
														? "text-yellow-400"
														: "text-gray-300 hover:text-gray-400"
												}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
											</svg>
										)
									)}
								</div>
							</div>
						)}
					</div>

					{/* Package Info */}
					<div className="flex flex-col">
						<div className="flex flex-col bg-white dark:bg-dark-card p-6 rounded-lg border border-[#D0D5DD] dark:border-[#423E3E] gap-4">
							{/* Package Info */}
							<div className="flex flex-row items-center justify-between">
								<div className="flex flex-col space-y-2 w-full">
									<div className="flex flex-row items-center justify-between">
										<p className='font-bold lg:text-lg text-sm font-["Montserrat"] text-gray-900 dark:text-dark-text'>
											{data.package.name}
										</p>
										<p className='font-semibold lg:text-lg text-sm text-gray-900 dark:text-dark-text font-["Montserrat"]'>
											Rp
											{parseInt(data.package.price_text).toLocaleString(
												"id-ID"
											)}
										</p>
									</div>
									<div className="flex flex-row items-center justify-between">
										<p className='font-semibold lg:text-lg text-sm text-gray-900 dark:text-dark-text font-["Montserrat"]'>
											{data.weight} Kg
										</p>
										{/* Status Payment */}
										<div>
											{data.status_payment === "belum bayar" && (
												<p className="text-red-500 font-medium font-['Montserrat'] lg:text-lg text-sm">
													{data.status_payment}
												</p>
											)}
											{data.status_payment === "sudah bayar" && (
												<p className="text-green-500 font-medium font-['Montserrat'] lg:text-lg text-sm">
													{data.status_payment}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Trip Detail */}
							<div>
								<p className="font-['Montserrat'] text-gray-900 dark:text-dark-text font-medium lg:text-sm text-xs mb-2">
									Trip Detail
								</p>
								{/* Pick Up */}
								<div className="flex flex-row items-center gap-2 px-4 py-2 border-2 border-[#D0D5DD] dark:border-[#423E3E] rounded-lg font-['Montserrat'] text-gray-800 dark:text-dark-text lg:text-sm text-xs font-medium">
									<img
										src="/Images/OrderDetail_PickUp_LightMode.png"
										alt="Lokasi"
										className="h-6 w-6 block dark:hidden"
									/>
									<img
										src="/Images/OrderDetail_PickUp_DarkMode.png"
										alt="Lokasi"
										className="h-6 w-6 hidden dark:block"
									/>
									<div>
										<p>Pick Up</p>
										{data.maps_pinpoint && (
											<a
												href={data.maps_pinpoint}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-500 hover:underline break-all"
											>
												{data.maps_pinpoint}
											</a>
										)}
									</div>
								</div>
								{/* Laundry Info */}
								<div className="flex flex-row items-center gap-2 px-4 py-2 border-2 border-[#D0D5DD] dark:border-[#423E3E] rounded-lg mt-2 font-['Montserrat'] text-gray-800 dark:text-dark-text lg:text-sm text-xs font-medium">
									<img
										src="/Images/OrderDetail_WashingMachine_LightMode.png"
										alt="Mesin Cuci"
										className="h-6 w-6 hidden dark:block"
									/>
									<img
										src="/Images/OrderDetail_WashingMachine_DarkMode.png"
										alt="Mesin Cuci"
										className="h-6 w-6 block dark:hidden"
									/>
									<FlexRowAccordion
										title={data.laundry_partner.name}
										contents={[
											{ value: data.laundry_partner.address },
											{
												phone: `https://wa.me/${transformPhoneNumber(
													data.laundry_partner.telephone
												)}`,
											},
										]}
									/>
								</div>
							</div>

							{/* Penjemputan */}
							<div>
								<p className="font-['Montserrat'] text-gray-900 dark:text-dark-text font-medium lg:text-sm text-xs mb-2">
									Penjemputan
								</p>
								<div className="flex flex-row items-center justify-between w-full lg:text-base text-sm">
									<p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>
										{ddmmyyFormatter(
											data.pickup_date.substring(
												data.pickup_date.lastIndexOf(" ") + 1
											),
											"id-ID"
										)}
									</p>
									<p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>
										{data.pickup_date.split(" ")[0] +
											" - " +
											data.pickup_date.split(" ")[2]}
									</p>
								</div>
							</div>

							{/* Voucher and Coupon */}
							<div className="flex flex-row items-center gap-2 px-4 py-2 border-2 border-[#D0D5DD] dark:border-[#423E3E] rounded-lg text-gray-800 dark:text-dark-text lg:text-sm text-xs font-medium">
								<div className="border-r-2 w-full border-[#D0D5DD] dark:border-[#423E3E] ">
									<p className="lg:text-sm text-xs font-['Montserrat']">
										Voucher
									</p>
									<p className="font-semibold lg:text-base text-sm font-['Montserrat']">
										{data.coupon_code ? data.coupon_code : "-"}
									</p>
								</div>
								<div className="w-full">
									<p className="lg:text-sm text-xs font-['Montserrat']">
										Referal
									</p>
									<p className="font-semibold lg:text-base text-sm font-['Montserrat']">
										{data.referral_code ? data.referral_code : "-"}
									</p>
								</div>
							</div>

							{/* Note / Catatan */}
							<div>
								<p className="font-['Montserrat'] text-gray-900 dark:text-dark-text font-medium lg:text-sm text-xs mb-2">
									Catatan
								</p>
								<p className="font-['Montserrat'] text-gray-800 dark:text-dark-text lg:text-sm text-xs break-words">
									{data.note ? data.note : "-"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Track Order */}
				<div className="order-2 border]">
					<div className="flex flex-col bg-white dark:bg-dark-card p-6 border border-[#D0D5DD] dark:border-[#423E3E] rounded-lg items-center justify-between">
						<div className="flex flex-col w-full">
							<h2 className='lg:text-lg text-sm text-center font-semibold font-["Montserrat"] text-gray-900 dark:text-dark-text mb-2'>
								Track Order
							</h2>
							<div className="flex flex-row items-center justify-between w-full">
								<p className="lg:text-base text-sm font-['Montserrat'] font-semibold text-gray-900 dark:text-dark-text">Order Time :</p>
								<p className='lg:text-base text-sm font-["Montserrat"] text-gray-900 dark:text-dark-text'>
									{`${new Date(data.created_at).toLocaleString("id-ID", {
										weekday: "long", // "Tuesday"
										year: "numeric", // "2025"
										month: "long", // "August"
										day: "numeric", // "12"
									})}, ${new Date(data.created_at).toLocaleTimeString("id-ID", {
										hour: "2-digit",
										minute: "2-digit",
									})}`}
								</p>
							</div>
							<div className="w-full border-b-2 my-2 border-neutral-200 dark:border-neutral-700" />
							<TrackOrderTimeline status={data.status} />
						</div>

						<div className="flex items-center justify-center mt-4 w-full">
							{data.status === "pending" && (
								<div className="w-full">
									<p className="lg:text-sm text-xs text-center text-[#687EFF] mb-2">
										Order tidak bisa dicancel setelah sudah dijemput
									</p>
									<button
										onClick={() => handleCancelOrder(data.id)}
										className="w-full text-sm lg:text-lg bg-[#EF4444] hover:bg-[#d93e3e] text-white font-semibold py-2 rounded-full transition"
									>
										Cancel
									</button>
								</div>
							)}

							{data.payment_link && data.status_payment === "belum bayar" && (
								<button
									onClick={() => handlePayment(data.id)}
									className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-full transition"
								>
									Bayar
								</button>
							)}

							{data.payment_link && data.status_payment === "sudah bayar" && (
								<button
									onClick={() => window.open(data.payment_link, "_blank")}
									className="w-full bg-[#687EFF] hover:bg-[#4762FF] text-white font-semibold py-2 rounded-full transition"
								>
									Lihat invoice
								</button>
							)}
						</div>
					</div>

					{data.status === "batal" && (
						<div className="flex flex-col space-y-4 bg-white dark:bg-dark-card p-6 border border-[#D0D5DD] dark:border-[#423E3E] rounded-lg items-center justify-center mt-4">
							<h2 className='text-lg font-semibold font-["Montserrat"] text-gray-900 dark:text-dark-text'>
								Order dicancel
							</h2>
							<p className='text-sm text-black dark:text-dark-text font-["Montserrat"]'>
								{data.cancel_reason}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
