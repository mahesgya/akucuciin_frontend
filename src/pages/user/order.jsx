import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { FaCheckCircle, FaRegClock, FaTimesCircle } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import customerServices from "../../services/customer.services";
import "../../style/SectionHome.css";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await customerServices.getOrderLaundry(accessToken);
      const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      await setOrders(sortedOrders);

      setFilteredOrders(sortedOrders);

      console.log(response);
    };

    fetchOrders();
  }, [accessToken]);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
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
      await customerServices.orderPayment(accessToken, id);
    }
  };

  const handleReview = async (orderId) => {
    let ratingValue = 0;

    const starContainer = document.createElement("div");
    starContainer.id = "star-rating-container";
    document.body.appendChild(starContainer);

    const root = ReactDOM.createRoot(starContainer);
    root.render(
      <ReactStars
        count={5}
        onChange={(newRating) => {
          ratingValue = newRating;
        }}
        size={30}
        activeColor="#ffd700"
      />
    );

    const { value: formValues } = await Swal.fire({
      title: "Beri Ulasan",
      html: `
      <div id="star-rating" style="display: flex; justify-content: center; margin-bottom: 10px;"></div>
      <textarea id="review" class="swal2-textarea" placeholder="Tulis ulasan Anda"></textarea>
    `,
      didOpen: () => {
        const modalStarContainer = document.getElementById("star-rating");
        modalStarContainer.appendChild(starContainer);
      },
      didClose: () => {
        root.unmount();
        if (starContainer.parentNode) {
          starContainer.parentNode.removeChild(starContainer);
        }
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Kirim",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#9ca3af",
      customClass: {
        confirmButton: "swal2-confirm btn-confirm",
        cancelButton: "swal2-cancel btn-cancel",
      },
      buttonsStyling: true,
      preConfirm: () => {
        const review = document.getElementById("review").value;
        if (ratingValue === 0) {
          Swal.showValidationMessage("Pilih rating dulu!");
          return false;
        }
        return { rating: ratingValue, review };
      },
    });

    if (formValues) {
      await customerServices.postReview(accessToken, orderId, formValues.rating, formValues.review);
      window.location.reload();
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-4">
      <h2 className="text-2xl text-center font-quick font-bold text-gray-800 mb-4">DAFTAR ORDER LAUNDRY</h2>
      <button className="absolute top-4 left-3" onClick={handleBack}>
        <img alt="backbiru" src="/Images/backbiru.png" className="bg-white"></img>
      </button>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 mb-4 whitespace-nowrap">
          {["all", "pending", "penjemputan", "pencucian", "pengantaran", "selesai", "batal", "kesalahan"].map((status) => (
            <button
              key={status}
              className={`font-quick px-4 py-2 rounded-lg font-semibold transition ${filter === status ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={() => handleFilterChange(status)}
            >
              {status === "all" ? "Semua" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border-l-4"
              style={{
                borderColor: order.status === "pending" ? "#facc15" : order.status === "selesai" ? "#10b981" : order.status === "batal" ? "#ef4444" : order.status === "kesalahan" ? "#9ca3af" : "#3b82f6",
              }}
            >
              <div>
                <h3 className="font-quick text-lg font-bold">{order.laundry_partner.name}</h3>
                <p className="font-quick text-gray-600 text-sm">
                  Total: <span className="font-quick font-semibold text-gray-900">Rp {order.price_after}</span>
                </p>
                <p className="font-quick text-gray-600 text-sm">
                  Berat: <span className="font-quick font-semibold text-gray-900">{order.weight} kg</span>
                </p>
                <p className="font-quick text-gray-600 text-sm">
                  Pembayaran: <span className={`font-quick font-bold ${order.status_payment === "sudah bayar" ? "text-[#10b981]" : "text-[#ef4444]"}`}>{order.status_payment}</span>
                </p>
                <p className="font-quick text-gray-600 text-sm">
                  Tanggal Order :{" "}
                  {new Date(order.created_at).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {order?.pickup_date &&
                  (() => {
                    const pickupStr = order.pickup_date.trim();
                    
                    const dateRegex = /(\d{2}-\d{2}-\d{4})$/;
                    const dateMatch = pickupStr.match(dateRegex);
                    
                    if (!dateMatch) return null;

                    const rawDate = dateMatch[1]; // ex: 22-05-2025
                    const timeRange = pickupStr.replace(rawDate, "").trim(); // sisanya adalah time range (bisa kosong)

                    const [day, month, year] = rawDate.split("-");
                    const dateForJS = `${year}-${month}-${day}`;
                    const jsDate = new Date(dateForJS);
                    
                    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                    const dayName = dayNames[jsDate.getDay()];

                    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                    const formattedDate = `${day} ${monthNames[Number(month) - 1]} ${year}`;

                    return (
                      <>
                        <p className="font-quick text-gray-600 text-sm">
                          Tanggal Penjemputan: {dayName}, {formattedDate}
                        </p>
                        {timeRange && (
                          <p className="font-quick text-gray-600 text-sm">
                            Jam Penjemputan: {timeRange}
                          </p>
                        )}
                      </>
                    );
                  })()}

                {order.review && (
                  <div>
                    <p className="font-quick text-gray-600 text-sm">
                      Review: <span className="font-quick text-gray-900">{order.review}</span>
                    </p>
                    <div className="flex flex-row items-center">
                      <p className="font-quick text-gray-600 text-sm pr-2">Rating: </p>
                      <ReactStars count={5} value={order.rating || 0} size={20} edit={false} activeColor="#ffd700" />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-quick px-3 py-1 rounded-lg text-sm font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "selesai"
                        ? "bg-green-100 text-green-800"
                        : order.status === "batal"
                        ? "bg-red-100 text-red-800"
                        : order.status === "kesalahan"
                        ? "bg-[#9ca3af] text-black"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {order.status === "pending" && <FaRegClock className="text-yellow-500 text-xl" />}
                  {order.status === "selesai" && <FaCheckCircle className="text-green-500 text-xl" />}
                  {order.status === "batal" && <FaTimesCircle className="text-red-500 text-xl" />}
                </div>

                {
                  <button onClick={() => navigate(`/order/${order.id}`)} className="w-full font-quick px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Lihat Detail
                  </button>
                }

                {order.status === "selesai" && !order.review && (
                  <button onClick={() => handleReview(order.id)} className="font-quick absolute top-10 left-6 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Review
                  </button>
                )}

                {order.payment_link !== null && order.status_payment === "belum bayar" && (
                  <button onClick={() => handlePayment(order.id)} className="font-quick absolute top-10 left-6 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Bayar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="font-quick text-center text-gray-600">Tidak ada order yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
