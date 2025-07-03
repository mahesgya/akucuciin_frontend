import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import CustomerServices from '../../services/customer.services'
import { successSwal } from '../../utils/alert.utils'
import ddmmyyFormatter from '../../utils/ddmmyyFormatter.utils'
import transformPhoneNumber from '../../utils/phone.number.utils'

const RatingSwal = (accessToken, orderId) => {
  let currentRating = 0;
  
  // Example chip options - these would be defined externally in a real implementation
  const chipOptions = [
    "Waktu penjemputan",
    "Waktu pengantaran",
    "Website",
    "Layanan laundry",
    "Kebersihan barang"
  ];

  Swal.fire({
    title: "Berikan rating yuk!",
    html: `
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2 font-['Montserrat']">(1 mengecewakan, 5 mantap!)</p>
        <div class="flex justify-center space-x-1">
          ${Array(5)
            .fill(0)
            .map(
              (_, i) => `
            <svg class="star w-10 h-10 cursor-pointer ${
              i === 0 ? "text-yellow-400" : "text-gray-300"
            }" 
              data-rating="${i + 1}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2 font-['Montserrat']">Pilih yang sesuai:</p>
        <div class="flex flex-wrap justify-center gap-2 mb-3">
          ${chipOptions.map(
            (chip, index) => `
            <div class="chip cursor-pointer py-1 px-3 rounded-xl border-2 border-gray-300 text-black text-sm hover:bg-gray-200" data-selected="false" data-chip-index="${index}">
              ${chip}
            </div>
          `
          ).join("")}
        </div>
      </div>
      <textarea id="rating-comment" class="w-full p-3 h-28 border-2 border-gray-300 rounded-lg focus:outline-none resize-none" placeholder="tambahkan komentar"></textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Batal",
    customClass: {
      confirmButton: "btn-confirm",
      cancelButton: "btn-cancel",
    },
    backdrop: true,
    allowOutsideClick: false,
    didOpen: () => {
      // Default rating set to 1
      currentRating = 1;

      // Add event listeners to stars
      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => {
        star.addEventListener("click", function () {
          const rating = parseInt(this.getAttribute("data-rating"));
          currentRating = rating;

          // Update stars appearance
          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < rating);
            s.classList.toggle("text-gray-300", index >= rating);
          });
        });

        star.addEventListener("mouseover", function () {
          const rating = parseInt(this.getAttribute("data-rating"));

          // Update stars appearance on hover
          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < rating);
            s.classList.toggle("text-gray-300", index >= rating);
          });
        });

        star.addEventListener("mouseout", function () {
          // Reset to current rating on mouseout
          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < currentRating);
            s.classList.toggle("text-gray-300", index >= currentRating);
          });
        });
      });
      
      // Add event listeners to chips for selection
      const chips = document.querySelectorAll(".chip");
      chips.forEach((chip) => {
        chip.addEventListener("click", function() {
          const isSelected = this.getAttribute("data-selected") === "true";
          
          // Toggle selection
          if (isSelected) {
            this.setAttribute("data-selected", "false");
            this.classList.remove("bg-blue-100", "border-blue-500", "text-blue-700");
            this.classList.add("border-gray-300", "text-gray-700");
          } else {
            this.setAttribute("data-selected", "true");
            this.classList.remove("border-gray-300");
            this.classList.add("bg-blue-100", "border-blue-500");
          }
        });
      });
    },
    preConfirm: () => {
      if (currentRating === 0) {
        Swal.showValidationMessage("Mohon berikan rating bintang");
        return false;
      }
      
      // Get selected chips
      const selectedChips = [];
      document.querySelectorAll(".chip[data-selected='true']").forEach((chip) => {
        const chipIndex = parseInt(chip.getAttribute("data-chip-index"));
        selectedChips.push(chipOptions[chipIndex]);
      });
      
      const comment = document.getElementById("rating-comment").value;
      
      // Format the final comment with selected chips
      let finalComment = "";
      if (selectedChips.length > 0) {
        finalComment = selectedChips.join(", ");
        if (comment.trim()) {
          finalComment += ", " + comment.trim();
        }
      } else {
        finalComment = comment.trim();
      }
      
      return { rating: currentRating, comment: finalComment };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { rating, comment } = result.value;

      // Show loading state
      Swal.fire({
        title: "Mengirim review...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Submit the review
      CustomerServices.postReview(accessToken, orderId, rating, comment)
        .then((response) => {
          // Check if response is successful
          if (response && response.success) {
            successSwal("Review berhasil dikirim!");
            window.location.reload();
          } else {
            // Response exists but indicates failure
            Swal.fire({
              icon: "error",
              title: "Gagal mengirim review",
              text: response?.message || "Silakan coba lagi nanti",
              customClass: {
                confirmButton: "btn-confirm",
                cancelButton: "btn-cancel",
              },
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal mengirim review",
            text: error?.response?.data?.message || "Silakan coba lagi nanti",
          });
        });
    }
  });
}

const FlexRowAccordion = ({ title, contents }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full flex flex-col items-start justify-between space-y-2 mb-2">
      {/* Accordion Title */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-start justify-between w-full space-y-1"
      >
        <div className="flex flex-row items-center justify-between w-full h-full">
          <p className='font-["Montserrat"] text-sm font-semibold'>
            {title}
          </p>
          {isOpen ? (
            <div className="flex items-center justify-center h-full">
              <img
                src="/Images/ArrowAccordionOpened.png"
                alt="arrow"
                className="h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <img
                src="/Images/ArrowAccordionClosed.png"
                alt="arrow"
                className="h-full"
              />
            </div>
          )}
        </div>
        {isOpen && (
          <div className='font-["Montserrat"] text-sm border-l-2 border-neutral-200 pl-2 w-full'>
            {contents.map((content, index) => (
              <div className="flex flex-row items-center justify-between w-full pr-2 space-x-4" key={index}>
                <p className='text-sm mt-2 font-["Montserrat"] whitespace-nowrap font-semibold'>{content.field}</p>
                
                <p className='w-full text-end text-sm mt-2 font-["Montserrat"] whitespace-nowrap overflow-hidden text-ellipsis font-semibold'>{content.value === "" ? "-" : content.value}</p>
                
                {content.link && (
                  <a href={content.link} target='_blank' rel='noopener noreferrer' title={content.link} className='w-full mt-2 font-["Montserrat"] whitespace-nowrap overflow-hidden text-ellipsis text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200'>{content.link === "" ? "-" : content.link}</a>
                )}

                {content.phone && (
                  <a href={content.phone} className='w-full mt-2 font-["Montserrat"] text-end text-blue-600 hover:text-blue-800 underline hover:no-underline'>{content.phone}</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FlexColAccordion = ({ title, contents }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full flex flex-col items-start justify-between space-y-2 mb-2">
      {/* Accordion Title */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-start justify-between w-full space-y-1"
      >
        <div className="flex flex-row items-center justify-between w-full h-full">
          <p className='font-["Montserrat"] text-sm font-semibold'>
            {title}
          </p>
          {isOpen ? (
            <div className="flex items-center justify-center h-full">
              <img
                src="/Images/ArrowAccordionOpened.png"
                alt="arrow"
                className="h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <img
                src="/Images/ArrowAccordionClosed.png"
                alt="arrow"
                className="h-full"
              />
            </div>
          )}
        </div>
        {isOpen && (
          <div className='font-["Montserrat"] text-sm border-l-2 border-neutral-200 pl-2 w-full'>
            {contents.map((content, index) => (
              <div className="flex flex-col items-start justify-between w-full pr-2" key={index}>
                <p className='text-sm mt-2 font-["Montserrat"] whitespace-nowrap font-semibold'>{content.field}</p>
                
                <p className='w-full text-sm text-justify mt-2 font-["Montserrat"]'>{content.value === "" ? "-" : content.value}</p>
                
                {content.link && (
                  <a href={content.link} target='_blank' rel='noopener noreferrer' title={content.link} className='w-full mt-2 font-["Montserrat"] text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200'>{content.link === "" ? "-" : content.link}</a>
                )}

                {content.phone && (
                  <a href={content.phone} className='w-full mt-2 font-["Montserrat"] text-blue-600 hover:text-blue-800 underline hover:no-underline'>`https://wa.me/{content.phone}`</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TrackOrderTimeline = ({ status }) => {
  const [orderPhases, setOrderPhases] = useState([]);

  useEffect(() => {
    const basePhases = [
      "Pembuatan order",
      "Penjemputan",
      "Penimbangan dan pencucian",
      "Pengantaran",
      "Selesai"
    ];

    const statusOrderMap = {
      pending: 0,
      penjemputan: 1,
      pencucian: 2,
      pengantaran: 3,
      selesai: 4
    };

    const currentIndex = statusOrderMap[status] ?? 0;

    const phases = basePhases.map((phase, index) => ({
      name: phase,
      isPassed: index <= currentIndex
    }));

    setOrderPhases(phases);
  }, [status]);

  return (
      <div className="flex flex-col items-start mt-4 w-full">
        {orderPhases.map((phase, index) => (
          <div key={index} className="flex items-start relative mb-6">
            {/* Line connector */}
            {index !== orderPhases.length - 1 && (
              <span className={`absolute left-[8px] top-6 w-1 h-full ${phase.isPassed ? 'bg-[#687EFF]' : 'bg-gray-300'}`} />
            )}

            {/* Dot */}
            <span
              className={`w-5 h-5 font-['Montserrat'] rounded-full z-10 mt-1 mr-4 ${
                phase.isPassed ? 'bg-[#687EFF]' : 'bg-gray-300'
              }`}
            ></span>

            {/* Label */}
            <span
              className={`font-['Montserrat'] lg:text-lg text-sm ${
                phase.isPassed ? 'text-black font-semibold' : 'text-gray-400'
              }`}
            >
              {phase.name}
            </span>
          </div>
        ))}
    </div>
  );
};


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
        }
        catch (error) {
          Swal.showValidationMessage("Terjadi kesalahan, silakan coba lagi");
          return false;
        }
      } 
    });

    if (confirmed.isConfirmed) {
      try {
        const reason = confirmed.value;
        await CustomerServices.cancelOrder(accessToken, id, reason);
        
        // Show success message and reload only after user clicks OK
        const result = await successSwal("Order berhasil dibatalkan");
        // Now reload page after the alert is dismissed
        if (result.isConfirmed || result.isDismissed) {
          window.location.reload();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal membatalkan order',
          text: 'Silakan coba lagi'
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await CustomerServices.getSingleOrder(
        accessToken,
        orderId
      );
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
    <div className="lg:h-screen h-full flex flex-col items-center justify-start bg-gray-50">
      {data.status !== "batal" && (
        <div className="flex flex-col items-center justify-center bg-[#687EFF] lg:p-8 py-12 mb-6 lg:h-40 w-full rounded-b-3xl shadow-md top-0 left-0 right-0">
          <a href="/order">
            <img
              alt="backwhite"
              src="/Images/backwhite.webp"
              className="absolute top-8 left-5"
            ></img>
          </a>
          <h1 className="lg:text-4xl text-2xl font-bold h-[80%] text-white text-center font-['Montserrat']">
            Order Berhasil
          </h1>
          <p className="lg:text-2xl text-sm text-white font-['Montserrat']">
            {data.id}
          </p>
        </div>
      )}

      {data.status === "batal" && (
        <div className="flex flex-col items-center justify-center bg-[#EF4444] lg:p-8 py-12 mb-6 lg:h-40 w-full rounded-b-3xl shadow-md top-0 left-0 right-0">
          <a href="/order">
            <img
              alt="backwhite"
              src="/Images/backwhite.webp"
              className="absolute top-8 left-5"
            ></img>
          </a>
          <h1 className="lg:text-4xl text-2xl font-bold h-[80%] text-white text-center font-['Montserrat']">
            Order Batal
          </h1>
          <p className="lg:text-2xl text-sm text-white font-['Montserrat']">
            {data.id}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 h-full pb-8 w-full px-4 lg:px-20">
        {/* Left Part*/}
        <div className="lg:order-1 order-3 flex flex-col bg-white p-6 rounded-lg shadow-lg items-center">
          <h2 className='lgtext-xl text-lg font-semibold font-["Montserrat"]'>
            Detail Order
          </h2>

          <div className="w-full py-2 border-b-2 border-neutral-200"></div>

          <div className="lg:text-sm text-xs flex flex-col w-full items-start justify-between space-y-3 mt-4">
            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>
                Paket Laundry{" "}
              </p>
              <p className='font-["Montserrat"] font-medium'>
                {data.package.name}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>Total </p>
              {data.price_after !== "0.00" && (
                <p className='font-["Montserrat"] font-medium'>
                  Rp {data.price_after}
                </p>
              )}
              {data.price_after === "0.00" && (
                <p className='font-["Montserrat"] font-medium'>
                  Belum diinput oleh mitra
                </p>
              )}
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>Berat </p>
              {data.weight === "0.00" && (
                <p className='font-["Montserrat"] font-medium'>
                  Belum diinput oleh mitra
                </p>
              )}
              {data.weight !== "0.00" && (
                <p className='font-["Montserrat"] font-medium'>
                  {data.weight} kg
                </p>
              )}
            </div>

            {data.status_payment === "belum bayar" && (
              <div className="flex flex-row items-center justify-between w-full">
                <p className='font-["Montserrat"] font-semibold'>Pembayaran </p>
                <p className="text-red-500 font-medium font-['Montserrat']">
                  {data.status_payment}
                </p>
              </div>
            )}

            {data.status_payment === "sudah bayar" && (
              <div className="flex flex-row items-center justify-between w-full">
                <p className='font-["Montserrat"] font-semibold'>Pembayaran </p>
                <p className="text-green-500 font-medium font-['Montserrat']">
                  {data.status_payment}
                </p>
              </div>
            )}

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>
                Tanggal Order{" "}
              </p>
              <p className='font-["Montserrat"] font-medium'>
                {" "}
                {new Date(data.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>
                Tanggal Penjemputan{" "}
              </p>
              <p className='font-["Montserrat"] font-medium'>
                {ddmmyyFormatter(
                  data.pickup_date.substring(
                    data.pickup_date.lastIndexOf(" ") + 1
                  ),
                  "id-ID"
                )}
                {}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <p className='font-["Montserrat"] font-semibold'>
                Jam Penjemputan{" "}
              </p>
              <p className='font-["Montserrat"] font-medium'>
                {data.pickup_date.substring(
                  0,
                  data.pickup_date.lastIndexOf(" ")
                )}
              </p>
            </div>

            <FlexRowAccordion
              title={"Voucher dan Referral"}
              contents={[
                { field: "Kupon", value: data.coupon_code },
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
                {
                  field: "Lokasi",
                  value:
                    data.laundry_partner.area +
                    ", " +
                    data.laundry_partner.city,
                },
                {
                  field: "Kontak",
                  phone: `https://wa.me/${transformPhoneNumber(
                    data.laundry_partner.telephone
                  )}`,
                },
              ]}
            />
          </div>
        </div>

        {/* Middle Part */}
        <div className="order-2 flex flex-col h-full">
          {/* Middle Top */}
          <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className='lg:text-xl text-lg font-semibold font-["Montserrat]'>
                Track Order
              </h2>
              <div className="w-full border-b-2 py-2 border-neutral-200"></div>
              <TrackOrderTimeline status={data.status} />
            </div>
            <div className="flex items-center justify-center mt-4 w-full">
              {/* Status Text */}
              <p className="text-blue-600 text-sm text-center mt-4 mb-2">
                {data.status === "pencucian" ? "Menunggu penimbangan" : ""}
              </p>

              {/* Button */}
              {data.status === "pending" && (
                <div className="w-full">
                  <p className="lg:text-sm text-xs text-center text-[#687EFF] mb-2">
                    Order tidak bisa dicancel setelah sudah dijemput
                  </p>
                  <button
                    onClick={() => handleCancelOrder(data.id)}
                    className="w-full text-sm lg:text-lg lg:bg-red-400 bg-red-500 hover:bg-red-500 text-white font-semibold py-2 rounded-full shadow-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {data.payment_link && data.status_payment === "belum bayar" && (
                <button
                  onClick={() => handlePayment(data.id)}
                  className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-full shadow-sm transition"
                >
                  Bayar
                </button>
              )}

              {data.payment_link && data.status_payment === "sudah bayar" && (
                <button
                  onClick={() => window.open(data.payment_link, "_blank")}
                  className="w-full bg-[#687EFF] hover:bg-[#4762FF] text-white font-semibold py-2 rounded-full shadow-sm transition"
                >
                  Lihat invoice
                </button>
              )}
            </div>
          </div>
          {/* Middle Bottom If cancelled*/}
          {data.status === "batal" && (
            <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg items-center justify-center mt-4">
              <h2 className='text-lg font-semibold font-["Montserrat"]'>
                Order dicancel
              </h2>
              <p className='text-sm text-black font-["Montserrat"]'>
                {data.cancel_reason}
              </p>
            </div>
          )}
        </div>

        {/* Right Part*/}
        <div className="lg:order-3 order-1 flex flex-col h-full">
          {/* Right Top */}
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex flex-col space-y-2">
                <p className='font-semibold lg:text-xl text-sm font-["Montserrat"]'>
                  {data.package.name}
                </p>
                <p className='font-semibold lg:text-sm text-xs text-neutral-400 font-["Montserrat"]'>
                  {data.package.description}
                </p>
              </div>
              <p className='font-semibold lg:text-xl text-sm text-green-400 font-["Montserrat"]'>
                Rp{parseInt(data.package.price_text).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="w-full border-b-2 border-neutral-200"></div>
            <div className="flex space-x-2 justify-between">
              <div className="flex flex-col space-y-2">
                {data.package.features.map((feature, index) => (
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
                      className='font-semibold lg:text-sm text-xs text-neutral-400 font-["Montserrat"]'
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col-reverse space-y-2 mt-4">
                {data.status === "pending" && (
                  <div className="w-full font-quick px-3 py-1 lg:text-sm text-xs border border-black bg-yellow-100 text-black font-semibold rounded-lg">
                    {data.status}
                  </div>
                )}
                {data.status === "batal" && (
                  <div className="w-full font-quick px-3 py-1 lg:text-sm text-xs border border-black bg-red-100 text-black font-semibold rounded-lg">
                    {data.status}
                  </div>
                )}
                {data.status === "selesai" && (
                  <div className="w-full font-quick px-3 py-1 lg:text-sm text-xs border border-black bg-green-100 text-black font-semibold rounded-lg">
                    {data.status}
                  </div>
                )}
                {(data.status === "penjemputan" ||
                  data.status === "pencucian" ||
                  data.status === "pengantaran") && (
                  <div className="w-full font-quick px-3 py-1 lg:text-sm text-xs border border-black bg-[#B3EBF2]/50 text-black font-semibold rounded-lg">
                    diproses
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Bottom */}
          <div className="flex items-center justify-center font-['Montserrat'] mt-4 shadow-lg">
            {data.status === "selesai" && data.rating === 0 && (
              <div className="bg-white rounded-lg p-6 md:p-8 w-full">
                <h2 className="text-lg font-bold text-center text-black mb-2 font-['Montserrat']">
                  Berikan rating yuk!
                </h2>
                <p className="lg: text-sm text-center text-gray-600 mb-6 font-['Montserrat'] font-medium">
                  (1 mengecewakan, 5 mantap! )
                </p>

                {/* Star Rating Section */}
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out
                ${
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
              <div className="bg-white rounded-lg p-6 md:p-8 w-full">
                <h2 className="text-lg font-bold text-center text-black mb-2 font-['Montserrat']">
                  Terima kasih sudah memberikan penilaian ^^
                </h2>

                <h3 className="text-lg font-semibold text-center text-gray-600 mb-4 font-['Montserrat']">
                  "{data.review}"
                </h3>

                {/* Star Rating Section */}
                <div className="flex justify-center mb-6">
                  {Array.from({ length: data.rating }, (_, i) => i + 1).map(
                    (star) => (
                      <svg
                        key={star}
                        className={`w-10 h-10 cursor-pointer transition-colors duration-200 ease-in-out
                ${
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
        </div>
      </div>

      {data ? (
        <div className="hidden bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order ID: {data.id}</h2>
          <p className="mb-2">
            <strong>Status:</strong> {data.status}
          </p>
          <p className="mb-2">
            <strong>Total Price:</strong> Rp. {data.total_price}
          </p>
          <p className="mb-2">
            <strong>Created At:</strong>{" "}
            {new Date(data.created_at).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Updated At:</strong>{" "}
            {new Date(data.updated_at).toLocaleString()}
          </p>
          <h3 className="text-lg font-semibold mt-4">Laundry Partner</h3>
          <p>
            <strong>Name:</strong> {data.laundry_partner.name}
          </p>
          <p>
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
}

export default OrderDetail