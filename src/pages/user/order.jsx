import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaBalanceScale, FaTag, FaMoneyBillWave, FaEdit } from "react-icons/fa";

import { STATUS_CONFIG, filterOptions } from "../../utils/status.order.utils"; 
import customerServices from "../../services/customer.services";
import Sidebar from "../../components/layout/sidebar/sidebar";

const InfoPill = ({ icon, label, value, valueClass = '' }) => (
  <div className="font-['Montserrat'] flex items-center gap-3 bg-gray-100 dark:bg-dark-bg p-2 rounded-lg">
    <div className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">{icon}</div>
    <div className="font-['Montserrat']">
      <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-[12px] md:text-sm font-semibold text-gray-800 dark:text-dark-text ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const visuals = STATUS_CONFIG[order.status] || STATUS_CONFIG.default;

  return (
    <div className="bg-white font-['Montserrat'] dark:bg-dark-card rounded-xl overflow-hidden shadow-lg transition-all duration-300">
      <div className="flex flex-col items-start md:flex-row justify-between md:items-center p-2 md:p-4 text-white" style={{ backgroundColor: visuals.color }}>
        <div className="flex items-center gap-2">
          <visuals.Icon className="text-lg md:text-2xl" />
          <h3 className="font-['Montserrat'] text-md md:text-lg font-bold">{visuals.label}</h3>
          <p className="font-['Montserrat'] font-bold text-md md:text-lg">- {order.laundry_partner.name}</p>
        </div>
        <span className="font-mono text-[10px] md:text-xs  opacity-80">{order.id}</span>
      </div>

      <div className="p-3 md:p-5">
        <div className="grid grid-cols-2 gap-3">
          <InfoPill icon={<FaCalendarAlt />} label="Tanggal Order" value={new Date(order.created_at).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' })} />
          <InfoPill icon={<FaBalanceScale />} label="Berat" value={`${order.weight} kg`} />
          <InfoPill icon={<FaTag />} label="Total" value={`Rp ${order.price_after}`} />
          <InfoPill icon={<FaMoneyBillWave />} label="Pembayaran" value={order.status_payment} valueClass={order.status_payment === "sudah bayar" ? "text-green-500" : "text-red-500"} />
        </div>
      </div>

      <div className="px-3 md:px-5 pb-2 md:pb-6 flex justify-end">
        <button
          onClick={() => navigate(`/order/${order.id}`)}
          className="font-['Montserrat'] text-[12px] md:text-smfont-semibold rounded-lg text-white transition-all duration-300 flex items-center gap-2 px-2 md:px-4 py-1  md:py-2"
          style={{ backgroundColor: visuals.color }}
        >
          <FaEdit/> Lihat Detail
        </button>
      </div>
    </div>
  );
};

const PageHeader = ({ filter, onFilterChange, searchQuery, onSearchChange }) => (
  <div className="mb-8 font-['Montserrat']">
    <h2 className="text-xl md:text-3xl text-center font-['Montserrat'] font-extrabold text-gray-900 dark:text-dark-text">Riwayat Pesanan Anda</h2>
    <p className="text-center font-['Montserrat'] text-gray-500 dark:text-gray-400 mt-1">Lacak semua pesanan laundry Anda di sini.</p>
    
    <div className="mt-6 p-4 bg-white dark:bg-dark-card rounded-xl shadow-md">
      <div className="relative mb-4">
        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"/>
        <input 
          type="text"
          placeholder="Cari order"
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full font-['Montserrat'] pl-10 md:pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-dark-bg border border-transparent focus:bg-white dark:focus:bg-dark-card-darker transition-all"
        />
      </div>
      <div className="md:hidden">
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)} className="w-full font-['Montserrat'] px-4 py-3 rounded-lg bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-neutral-700">
          {filterOptions.map((s) => (<option key={s} value={s}>{s === "all" ? "Semua Status" : STATUS_CONFIG[s]?.label || s}</option>))}
        </select>
      </div>
      <div className="hidden md:flex flex-wrap items-center gap-2">
        {filterOptions.map((status) => {
          const isActive = filter === status;
          const config = STATUS_CONFIG[status];
          return (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`font-['Montserrat'] px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${isActive ? 'text-white' : 'bg-transparent text-gray-600 dark:text-gray-300'}`}
              style={{ 
                backgroundColor: isActive ? (config?.color || '#6B7280') : 'transparent',
                borderColor: isActive ? (config?.color || '#6B7280') : '#E5E7EB'
              }}
            >
              {status === "all" ? "Semua Status" : config?.label}
            </button>
          )
        })}
      </div>
    </div>
  </div>
);


const OrderPage = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    customerServices.getOrderLaundry(accessToken).then(response => {
      const sorted = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(sorted);
    }).catch(error => console.error("Gagal mengambil data order:", error));
  }, [accessToken]);

  const filteredOrders = orders
    .filter(order => filter === "all" || order.status === filter)
    .filter(order =>
      order.laundry_partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery)
    );

  return (
    <div className="font-['Montserrat'] min-h-screen p-4 pb-20 md:pbb-0 md:pl-32 md:pr-4 md:py-4 relative mx-auto text-gray-900 dark:text-dark-text bg-gray-100 dark:bg-dark-bg">
      <Sidebar />
      <PageHeader
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-4 md:space-y-4 lg:space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="text-center py-20 px-4 bg-white dark:bg-dark-card rounded-xl shadow-md">
            <FaSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-dark-text">Oops! Tidak Ditemukan</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Kami tidak dapat menemukan pesanan yang cocok dengan filter atau pencarian Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;