import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import customerServices from "../../services/customer.services";

const Addresses = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await customerServices.getAddresses(accessToken);
      if (response.success) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleDelete = async (addressId) => {
    const result = await Swal.fire({
      title: "Hapus Alamat?",
      text: "Alamat yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
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
    });

    if (result.isConfirmed) {
      try {
        await customerServices.deleteAddress(accessToken, addressId);
        fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await customerServices.setDefaultAddress(accessToken, addressId);
      fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="font-['Montserrat'] flex flex-col bg-[#F4F5FF] dark:bg-dark-bg min-h-screen w-screen pb-8 dark:text-dark-text">
      {/* Header */}
      <div className="flex flex-row items-center justify-start bg-[#687EFF] pl-4 lg:p-8 py-12 mb-6 w-full rounded-b-3xl shadow-sm">
        <button onClick={handleBack} className="bg-transparent">
          <img alt="back" src="/Images/backwhite.webp" className="h-10 w-10" />
        </button>
        <h1 className="lg:text-2xl ml-4 text-2xl font-bold text-white font-['Montserrat']">
          Alamat Saya
        </h1>
      </div>

      <div className="px-4 lg:px-24 space-y-4">
        {/* Add New Address Button */}
        <button
          onClick={() => navigate("/profile/addresses/new")}
          className="w-full bg-[#687EFF] text-white font-semibold py-4 rounded-xl shadow-sm hover:bg-[#5668CC] transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Tambah Alamat Baru
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-dark-text/70">
              Memuat alamat...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && addresses.length === 0 && (
          <div className="bg-white dark:bg-dark-card rounded-xl p-8 text-center shadow-sm border border-gray-300/30 dark:border-neutral-700">
            <img
              src="/Images/empty-state.png"
              alt="No addresses"
              className="w-32 h-32 mx-auto mb-4 opacity-50"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <p className="text-gray-600 dark:text-dark-text/70 mb-4">
              Belum ada alamat tersimpan
            </p>
            <button
              onClick={() => navigate("/profile/addresses/new")}
              className="bg-[#687EFF] text-white font-semibold py-2 px-6 rounded-xl hover:bg-[#5668CC] transition-colors"
            >
              Tambah Alamat
            </button>
          </div>
        )}

        {/* Address List */}
        {!isLoading &&
          addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-300/30 dark:border-neutral-700 relative"
            >
              {/* Default Badge */}
              {address.is_default === 1 && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Utama
                </div>
              )}

              {/* Address Details */}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-dark-text mb-2">
                  {address.label}
                </h3>
                <p className="text-gray-600 dark:text-dark-text/70 text-sm mb-2">
                  {address.address}
                </p>
                {address.city && (
                  <p className="text-gray-500 dark:text-dark-text/60 text-sm">
                    {address.city}
                  </p>
                )}
                {address.area && (
                  <p className="text-gray-500 dark:text-dark-text/60 text-sm">
                    {address.area}
                  </p>
                )}
                <p className="text-gray-400 dark:text-dark-text/50 text-xs mt-2 font-mono">
                  {parseFloat(address.latitude).toFixed(6)},{" "}
                  {parseFloat(address.longitude).toFixed(6)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 lg:items-center">
                <button
                  onClick={() =>
                    navigate(`/profile/addresses/edit/${address.id}`)
                  }
                  className="w-full lg:w-1/2 bg-[#687EFF] text-white font-semibold py-2 rounded-lg hover:bg-[#5668CC] transition-colors"
                >
                  Edit
                </button>
                {!address.is_default && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="w-full lg:w-1/2 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Jadikan Alamat Utama
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="w-full lg:w-1/2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Addresses;
