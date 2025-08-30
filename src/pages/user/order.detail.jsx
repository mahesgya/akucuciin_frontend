import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import { successSwal } from "../../utils/alert.utils";
import ddmmyyFormatter from "../../utils/ddmmyyFormatter.utils";
import transformPhoneNumber from "../../utils/phone.number.utils";
import RatingSwal from "../../components/modal/rating.swal";
import FlexColAccordion from "../../components/ui/accordian/flexcol.accordian";
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
      <div className="h-screen flex items-center justify-center bg-gray-50 font-['Montserrat']">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="lg:min-h-screen h-full flex flex-col items-center justify-start bg-gray-50 dark:bg-dark-bg">
      {data.status !== "batal" && (
        <div className={`flex flex-col items-center justify-center ${data.status === "selesai" ? "bg-green-500" : "bg-[#687EFF]"} lg:p-8 py-12 mb-6 lg:h-40 w-full rounded-b-3xl shadow-md top-0 left-0 right-0`}>
          <a href="/order">
            <img alt="backwhite" src="/Images/backwhite.webp" className="absolute top-8 left-5" />
          </a>
          <h1 className="lg:text-4xl text-2xl font-bold h-[80%] text-white text-center font-['Montserrat']">{data.status === "selesai" ? "Order Selesai" : "Order"}</h1>
          <p className="lg:text-2xl text-sm text-white font-['Montserrat']">{data.id}</p>
        </div>
      )}

      {data.status === "batal" && (
        <div className="flex flex-col items-center justify-center bg-[#EF4444] lg:p-8 py-12 mb-6 lg:h-40 w-full rounded-b-3xl shadow-md top-0 left-0 right-0">
          <a href="/order">
            <img alt="backwhite" src="/Images/backwhite.webp" className="absolute top-8 left-5" />
          </a>
          <h1 className="lg:text-4xl text-2xl font-bold h-[80%] text-white text-center font-['Montserrat']">Order Batal</h1>
          <p className="lg:text-2xl text-sm text-white font-['Montserrat']">{data.id}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 h-full pb-8 w-full px-4 lg:px-20">
        <div className="lg:order-1 order-3 flex flex-col bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg items-center">
          <h2 className='lgtext-xl text-lg font-semibold font-["Montserrat"] text-gray-900 dark:text-dark-text'>Detail Order</h2>

          <div className="w-full py-2 border-b-2 border-neutral-200 dark:border-neutral-700" />

          <div className="lg:text-sm text-xs flex flex-col w-full items-start justify-between space-y-3 mt-4">
            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Paket Laundry </p>
              <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>{data.package.name}</p>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Total </p>
              {data.price_after !== "0.00" && <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>Rp {data.price_after}</p>}
              {data.price_after === "0.00" &&
                (!data?.payment_link && data?.status_payment === "sudah bayar" ? (
                  <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>Rp {data?.price}</p>
                ) : (
                  <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>Belum diinput oleh mitra</p>
                ))}
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Berat </p>
              {data.weight === "0.00" && <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>Belum diinput oleh mitra</p>}
              {data.weight !== "0.00" && <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>{data.weight} kg</p>}
            </div>

            {data.status_payment === "belum bayar" && (
              <div className="flex flex-row items-center justify-between w-full">
                <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Pembayaran </p>
                <p className="text-red-500 font-medium font-['Montserrat']">{data.status_payment}</p>
              </div>
            )}

            {data.status_payment === "sudah bayar" && (
              <div className="flex flex-row items-center justify-between w-full">
                <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Pembayaran </p>
                <p className="text-green-500 font-medium font-['Montserrat']">{data.status_payment}</p>
              </div>
            )}

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Tanggal Order </p>
              <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>
                {new Date(data.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Tanggal Penjemputan </p>
              <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>{ddmmyyFormatter(data.pickup_date.substring(data.pickup_date.lastIndexOf(" ") + 1), "id-ID")}</p>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold text-gray-800 dark:text-dark-text'>Jam Penjemputan </p>
              <p className='font-["Montserrat"] font-medium text-gray-900 dark:text-dark-text'>{data.pickup_date.substring(0, data.pickup_date.lastIndexOf(" "))}</p>
            </div>

            <FlexRowAccordion
              title={"Voucher dan Referral"}
              contents={[
                { field: "Kupon", value: data.coupon_code },
                { field: "Diskon Kupon", value: data.coupon?.multiplier ? `${data.coupon.multiplier} %` : "-" },
                { field: "Kode referal", value: data.referral_code },
              ]}
            />

            <FlexColAccordion
              title={"Catatan & Lokasi"}
              contents={[
                { field: "Catatan", value: data.note },
                { field: "Pin lokasi anda", link: data.maps_pinpoint },
              ]}
            />

            <FlexRowAccordion
              title={"Detail Laundry"}
              contents={[
                { field: "Nama laundry", value: data.laundry_partner.name },
                { field: "Lokasi", value: data.laundry_partner.area + ", " + data.laundry_partner.city },
                { field: "Kontak", phone: `https://wa.me/${transformPhoneNumber(data.laundry_partner.telephone)}` },
              ]}
            />
          </div>
        </div>

        <div className="order-2 flex flex-col h-full">
          <div className="flex flex-col h-full bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className='lg:text-xl text-lg font-semibold font-["Montserrat] text-gray-900 dark:text-dark-text'>Track Order</h2>
              <div className="w-full border-b-2 py-2 border-neutral-200 dark:border-neutral-700" />
              <TrackOrderTimeline status={data.status} />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              {data.status === "pending" && (
                <div className="w-full">
                  <p className="lg:text-sm text-xs text-center text-[#687EFF] mb-2">Order tidak bisa dicancel setelah sudah dijemput</p>
                  <button onClick={() => handleCancelOrder(data.id)} className="w-full text-sm lg:text-lg lg:bg-red-400 bg-red-500 hover:bg-red-500 text-white font-semibold py-2 rounded-full shadow-sm transition">
                    Cancel
                  </button>
                </div>
              )}

              {data.payment_link && data.status_payment === "belum bayar" && (
                <button onClick={() => handlePayment(data.id)} className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-full shadow-sm transition">
                  Bayar
                </button>
              )}

              {data.payment_link && data.status_payment === "sudah bayar" && (
                <button onClick={() => window.open(data.payment_link, "_blank")} className="w-full bg-[#687EFF] hover:bg-[#4762FF] text-white font-semibold py-2 rounded-full shadow-sm transition">
                  Lihat invoice
                </button>
              )}
            </div>
          </div>

          {data.status === "batal" && (
            <div className="flex flex-col space-y-4 bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg items-center justify-center mt-4">
              <h2 className='text-lg font-semibold font-["Montserrat"] text-gray-900 dark:text-dark-text'>Order dicancel</h2>
              <p className='text-sm text-black dark:text-dark-text font-["Montserrat"]'>{data.cancel_reason}</p>
            </div>
          )}
        </div>

        <div className="lg:order-3 order-1 flex flex-col h-full">
          <div className="flex flex-col bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex flex-col space-y-2">
                <p className='font-semibold lg:text-xl text-sm font-["Montserrat"] text-gray-900 dark:text-dark-text'>{data.package.name}</p>
                <p className='font-semibold lg:text-sm text-xs text-neutral-400 dark:text-dark-text/60 font-["Montserrat"]'>{data.package.description}</p>
              </div>
              <p className='font-semibold lg:text-xl text-sm text-green-400 font-["Montserrat"]'>Rp{parseInt(data.package.price_text).toLocaleString("id-ID")}</p>
            </div>

            <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700" />

            <div className="flex space-x-2 justify-between">
              <div className="flex flex-col space-y-2">
                {data.package.features.map((feature, index) => (
                  <div className="flex flex-row items-center align-middle space-x-2 mt-4" key={index}>
                    <img src="/Images/ceklisijo.png" alt="check" className="lg:h-6 lg:w-6 h-3 w-3" />
                    <p key={index} className='font-semibold lg:text-sm text-xs text-neutral-400 dark:text-dark-text/70 font-["Montserrat"]'>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse space-y-2 mt-4">
                <div className="flex flex-col-reverse space-y-2 mt-4">
                  {data.status === "pending" && (
                    <div
                      className="w-full font-quick px-3 py-1.5 lg:text-sm text-xs
                    inline-flex items-center justify-center rounded-full capitalize
                    bg-amber-100/80 text-amber-900
                    dark:bg-amber-500/20 dark:text-amber-200
                    shadow-sm ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                      {data.status}
                    </div>
                  )}

                  {data.status === "batal" && (
                    <div
                      className="w-full font-quick px-3 py-1.5 lg:text-sm text-xs
                    inline-flex items-center justify-center rounded-full capitalize
                    bg-rose-100/80 text-rose-900
                    dark:bg-rose-500/20 dark:text-rose-200
                    shadow-sm ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                      {data.status}
                    </div>
                  )}

                  {data.status === "selesai" && (
                    <div
                      className="w-full font-quick px-3 py-1.5 lg:text-sm text-xs
                    inline-flex items-center justify-center rounded-full capitalize
                    bg-emerald-100/80 text-emerald-900
                    dark:bg-emerald-500/20 dark:text-emerald-200
                    shadow-sm ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                      {data.status}
                    </div>
                  )}

                  {(data.status === "penjemputan" || data.status === "pencucian" || data.status === "pengantaran") && (
                    <div
                      className="w-full font-quick px-3 py-1.5 lg:text-sm text-xs
                    inline-flex items-center justify-center rounded-full capitalize
                    bg-sky-100/80 text-sky-900
                    dark:bg-sky-500/20 dark:text-sky-200
                    shadow-sm ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                      diproses
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center font-['Montserrat'] mt-4 shadow-lg">
            {data.status === "selesai" && data.rating === 0 && (
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 w-full">
                <h2 className="text-lg font-bold text-center text-black dark:text-dark-text mb-2 font-['Montserrat']">Berikan rating yuk!</h2>
                <p className="lg: text-sm text-center text-gray-600 dark:text-dark-text/70 mb-6 font-['Montserrat'] font-medium">(1 mengecewakan, 5 mantap! )</p>

                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out ${star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"}`}
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
                <h2 className="text-lg font-bold text-center text-black dark:text-dark-text mb-2 font-['Montserrat']">Terima kasih sudah memberikan penilaian ^^</h2>
                <h3 className="text-lg font-semibold text-center text-gray-600 dark:text-dark-text/70 mb-4 font-['Montserrat']">"{data.review}"</h3>

                <div className="flex justify-center mb-6">
                  {Array.from({ length: data.rating }, (_, i) => i + 1).map((star) => (
                    <svg key={star} className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out ${star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {data ? (
        <div className="hidden bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text">Order ID: {data.id}</h2>
          <p className="mb-2 text-gray-800 dark:text-dark-text">
            <strong>Status:</strong> {data.status}
          </p>
          <p className="mb-2 text-gray-800 dark:text-dark-text">
            <strong>Total Price:</strong> Rp. {data.total_price}
          </p>
          <p className="mb-2 text-gray-800 dark:text-dark-text">
            <strong>Created At:</strong> {new Date(data.created_at).toLocaleString()}
          </p>
          <p className="mb-2 text-gray-800 dark:text-dark-text">
            <strong>Updated At:</strong> {new Date(data.updated_at).toLocaleString()}
          </p>
          <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-dark-text">Laundry Partner</h3>
          <p className="text-gray-800 dark:text-dark-text">
            <strong>Name:</strong> {data.laundry_partner.name}
          </p>
          <p className="text-gray-800 dark:text-dark-text">
            <strong>Address:</strong> {data.laundry_partner.address}
          </p>
        </div>
      ) : (
        Swal.showLoading({
          title: "Loading order details...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        })
      )}
    </div>
  );
};

export default OrderDetail;
