import { useState, useEffect } from "react";
import customerServices from "../../services/customer.services";
import { FaRegClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "../../style/SectionHome.css";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await customerServices.getOrderLaundry(accessToken);
        const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const handleCancelOrder = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin membatalkan order anda?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
    });

    if (confirmed.isConfirmed) {
      await customerServices.cancelOrder(accessToken, id);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl text-center font-quick font-bold text-gray-800 mb-4">DAFTAR ORDER LAUNDRY</h2>
      <button  className="fixed top-4 left-3" onClick={handleBack}>
        <img alt="backbiru" src="/Images/backbiru.png" className="bg-white "></img>
      </button>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 mb-4 whitespace-nowrap">
          {["all", "pending", "penjemputan", "pencucian", "selesai", "batal", "kesalahan"].map((status) => (
            <button key={status} className={`px-4 py-2 rounded-lg font-semibold transition ${filter === status ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`} onClick={() => handleFilterChange(status)}>
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
                <h3 className="text-lg font-semibold">{order.laundry_partner.name}</h3>
                <p className="text-gray-600 text-sm">
                  Total: <span className="font-bold text-gray-900">Rp {order.price}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Berat: <span className="font-bold text-gray-900">{order.weight} kg</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Pembayaran: <span className="font-bold text-gray-900">{order.status_payment}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Tanggal:{" "}
                  {new Date(order.created_at).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="relative flex items-center space-x-2">
                {order.status === "pending" && <FaRegClock className="text-yellow-500 text-xl" />}
                {order.status === "selesai" && <FaCheckCircle className="text-green-500 text-xl" />}
                {order.status === "batal" && <FaTimesCircle className="text-red-500 text-xl" />}
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${
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

                {order.status === "pending" && (
                  <button onClick={() => handleCancelOrder(order.id)} className="absolute top-10 left-6 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Tidak ada order yang tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
