import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LocationPicker from "../../components/ui/map/LocationPicker";
import customerServices from "../../services/customer.services";
import { errorSwal } from "../../utils/alert.utils";

const AddressForm = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { addressId } = useParams();
  const isEditMode = !!addressId;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(isEditMode);
  const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(
    !isEditMode
  );
  const [currentPosition, setCurrentPosition] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    address: "",
    city: null,
    area: null,
    latitude: null,
    longitude: null,
    is_default: false,
  });

  const fetchAddress = useCallback(async () => {
    try {
      setLoadingAddress(true);
      const response = await customerServices.getAddressById(
        accessToken,
        addressId
      );
      if (response.success) {
        const addr = response.data;
        setFormData({
          label: addr.label || "",
          address: addr.address || "",
          city: addr.city,
          area: addr.area,
          latitude: parseFloat(addr.latitude),
          longitude: parseFloat(addr.longitude),
          is_default: addr.is_default === 1,
        });
        setCurrentPosition([
          parseFloat(addr.latitude),
          parseFloat(addr.longitude),
        ]);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      errorSwal(error.response?.data.errors || "Gagal mengambil data alamat.");
      navigate("/profile/addresses");
    } finally {
      setLoadingAddress(false);
    }
  }, [accessToken, addressId, navigate]);

  // Get current location for new address
  useEffect(() => {
    if (!isEditMode) {
      if (!navigator.geolocation) {
        setLoadingCurrentLocation(false);
        setCurrentPosition([-6.5971, 106.806]); 
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(pos);
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setLoadingCurrentLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingCurrentLocation(false);
          setCurrentPosition([-6.5971, 106.806]); 
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [isEditMode]);

  // Fetch address data if editing
  useEffect(() => {
    if (isEditMode && addressId) {
      fetchAddress();
    }
  }, [isEditMode, addressId, fetchAddress]);

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      errorSwal("Silakan pilih lokasi di peta");
      return;
    }

    if (!formData.label.trim()) {
      errorSwal("Silakan masukkan label alamat");
      return;
    }

    if (!formData.address.trim()) {
      errorSwal("Silakan masukkan alamat lengkap");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        label: formData.label,
        address: formData.address,
        city: formData.city,
        area: formData.area,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      // Only include is_default when creating new address
      if (!isEditMode) {
        payload.is_default = formData.is_default;
      }

      if (isEditMode) {
        await customerServices.updateAddress(accessToken, addressId, payload);
      } else {
        await customerServices.createAddress(accessToken, payload);
      }

      navigate("/profile/addresses");
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile/addresses");
  };

  if (loadingAddress) {
    return (
      <div className="min-h-screen bg-[#F4F5FF] dark:bg-dark-bg flex items-center justify-center">
        <p className="font-['Montserrat'] text-gray-600 dark:text-dark-text">
          Memuat data alamat...
        </p>
      </div>
    );
  }

  return (
    <div className="font-['Montserrat'] flex flex-col bg-[#F4F5FF] dark:bg-dark-bg min-h-screen w-screen pb-8 dark:text-dark-text">
      {/* Header */}
      <div className="flex flex-row items-center justify-start bg-[#687EFF] pl-4 lg:p-8 py-12 mb-6 w-full rounded-b-3xl shadow-sm">
        <button onClick={handleBack} className="bg-transparent">
          <img alt="back" src="/Images/backwhite.webp" className="h-10 w-10" />
        </button>
        <h1 className="lg:text-2xl ml-4 text-2xl font-bold text-white font-['Montserrat']">
          {isEditMode ? "Edit Alamat" : "Tambah Alamat Baru"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 lg:px-24 space-y-4">
        {/* Label Input */}
        <div className="bg-white dark:bg-dark-card rounded-xl px-6 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
          <h4 className="font-['Montserrat'] font-semibold text-gray-700 dark:text-dark-text mb-2 text-base">
            Label Alamat <span className="text-red-500">*</span>
          </h4>
          <input
            required
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
            type="text"
            placeholder="Contoh: Rumah, Kantor, Kos"
            className="font-['Montserrat'] rounded-xl p-3 w-full bg-white dark:bg-dark-card border border-gray-300 dark:border-neutral-700 shadow-sm text-gray-700 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#687EFF] text-base"
          />
        </div>

        {/* Address Input */}
        <div className="bg-white dark:bg-dark-card rounded-xl px-6 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
          <h4 className="font-['Montserrat'] font-semibold text-gray-700 dark:text-dark-text mb-2 text-base">
            Alamat Lengkap <span className="text-red-500">*</span>
          </h4>
          <textarea
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Contoh: Jalan Raya Dramaga No. 123, RT 01/RW 02"
            rows={3}
            className="font-['Montserrat'] rounded-xl p-3 w-full bg-white dark:bg-dark-card border border-gray-300 dark:border-neutral-700 shadow-sm text-gray-700 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#687EFF] text-base resize-none"
          />
        </div>

        {/* Set as Default - Only show when creating new address */}
        {!isEditMode && (
          <div className="bg-white dark:bg-dark-card rounded-xl px-6 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_default}
                onChange={(e) =>
                  setFormData({ ...formData, is_default: e.target.checked })
                }
                className="w-5 h-5 text-[#687EFF] border-gray-300 rounded focus:ring-[#687EFF]"
              />
              <span className="font-['Montserrat'] font-semibold text-gray-700 dark:text-dark-text text-base">
                Jadikan sebagai alamat utama
              </span>
            </label>
          </div>
        )}

        {/* Location Picker */}
        <div className="bg-white dark:bg-dark-card rounded-xl px-6 py-5 shadow-sm border border-gray-300/30 dark:border-neutral-700">
          <h4 className="font-['Montserrat'] font-semibold text-gray-700 dark:text-dark-text mb-2 text-base">
            Pilih Lokasi di Peta <span className="text-red-500">*</span>
          </h4>
          <p className="font-['Montserrat'] text-sm text-gray-600 dark:text-dark-text/70 mb-4">
            Klik pada peta untuk menandai lokasi alamat Anda
          </p>

          {loadingCurrentLocation && !isEditMode && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-4">
              <p className="font-['Montserrat'] text-blue-700 dark:text-blue-400 text-sm">
                📍 Mengambil lokasi Anda...
              </p>
            </div>
          )}

          {currentPosition && (
            <LocationPicker
              initialPosition={currentPosition}
              initialZoom={25}
              onLocationSelect={handleLocationSelect}
              height="400px"
              showCoordinates={true}
              showSearchButton={!isEditMode}
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-4 rounded-xl shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 font-semibold py-4 rounded-xl shadow-sm transition-colors ${
              isLoading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#687EFF] text-white hover:bg-[#5668CC]"
            }`}
          >
            {isLoading
              ? "Menyimpan..."
              : isEditMode
              ? "Simpan Perubahan"
              : "Tambah Alamat"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
