import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../redux/location.slicer";
import customerServices from "../../services/customer.services";
import { errorSwal } from "../../utils/alert.utils";
import LocationPicker from "../ui/map/LocationPicker";

/**
 * LocationSelectorModal
 *
 * A modal that allows users to select their location either by:
 * 1. Using current GPS location
 * 2. Picking a location on the map
 * 3. Selecting from saved addresses
 */
const LocationSelectorModal = ({ isOpen, onClose }) => {
  const { accessToken, isLoggedIn } = useSelector((state) => state.auth);
  const locationState = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("map"); // "map" or "addresses"
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([
    locationState.data.latitude || -6.5971,
    locationState.data.longitude || 106.806,
  ]);

  // Initialize selectedLocation with current position when modal opens
  useEffect(() => {
    if (isOpen && locationState.data.latitude && locationState.data.longitude) {
      setSelectedLocation({
        lat: locationState.data.latitude,
        lng: locationState.data.longitude,
        label: locationState.data.label || null,
      });
    }
  }, [
    isOpen,
    locationState.data.latitude,
    locationState.data.longitude,
    locationState.data.label,
  ]);

  // Fetch user's saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isLoggedIn || !accessToken) return;

      try {
        setLoadingAddresses(true);
        const response = await customerServices.getAddresses(accessToken);
        if (response.success) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    if (isOpen && activeTab === "addresses") {
      fetchAddresses();
    }
  }, [isOpen, activeTab, isLoggedIn, accessToken]);

  // Update current position from Redux state
  useEffect(() => {
    if (locationState.data.latitude && locationState.data.longitude) {
      setCurrentPosition([
        locationState.data.latitude,
        locationState.data.longitude,
      ]);
    }
  }, [locationState.data.latitude, locationState.data.longitude]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleAddressSelect = (address) => {
    const lat = parseFloat(address.latitude);
    const lng = parseFloat(address.longitude);

    setSelectedLocation({
      lat,
      lng,
      label: address.label,
      address: address.address,
    });
    setCurrentPosition([lat, lng]);
  };

  const handleConfirm = async () => {
    if (!selectedLocation) {
      errorSwal("Lokasi belum dipilih");
      return;
    }

    let finalLabel = selectedLocation.label;

    // Only fetch reverse geocoding if label is null (map click without label)
    // Skip if it's "Lokasi Saat Ini" or a saved address label
    if (!finalLabel) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&accept-language=id&addressdetails=1`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.display_name) {
            // Truncate to first 3 parts (street, area, city)
            const parts = data.display_name.split(",");
            if (parts.length > 3) {
              finalLabel = parts.slice(0, 3).join(",");
            } else {
              finalLabel = data.display_name;
            }
          }
        }
      } catch (error) {
        console.warn("Reverse geocoding failed, using coordinates:", error);
        // Fall back to coordinates
        finalLabel = `${selectedLocation.lat.toFixed(
          6
        )}, ${selectedLocation.lng.toFixed(6)}`;
      }

      // If still no label after fetch attempt, use coordinates
      if (!finalLabel) {
        finalLabel = `${selectedLocation.lat.toFixed(
          6
        )}, ${selectedLocation.lng.toFixed(6)}`;
      }
    }

    dispatch(
      setLocation({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        label: finalLabel,
      })
    );

    // Save label to localStorage for persistence
    if (finalLabel) {
      localStorage.setItem("locationLabel", finalLabel);
    } else {
      localStorage.removeItem("locationLabel");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-white dark:bg-dark-card">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-dark-card shadow-sm w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-dark-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold font-['Montserrat'] text-gray-800 dark:text-dark-text">
          Pilih Lokasi Penjemputan
        </h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Map/Content - Takes full remaining height */}
      <div className="flex-1 relative overflow-hidden w-full max-w-4xl">
        {activeTab === "map" ? (
          <LocationPicker
            initialPosition={currentPosition}
            initialZoom={15}
            onLocationSelect={handleLocationSelect}
            height="100%"
            showCoordinates={false}
            showSearchButton={true}
          />
        ) : (
          <div className="h-full overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-dark-bg">
            {loadingAddresses ? (
              <div className="text-center py-8">
                <p className="font-['Montserrat'] text-gray-600 dark:text-gray-400">
                  Memuat alamat...
                </p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8">
                <p className="font-['Montserrat'] text-gray-600 dark:text-gray-400 mb-4">
                  Belum ada alamat tersimpan
                </p>
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = "/profile/addresses/new")
                  }
                  className="font-['Montserrat'] bg-[#687EFF] text-white px-6 py-2 rounded-lg hover:bg-[#5668CC] transition-colors"
                >
                  Tambah Alamat
                </button>
              </div>
            ) : (
              addresses.map((address) => (
                <button
                  type="button"
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all bg-white dark:bg-dark-card ${
                    selectedLocation?.lat === parseFloat(address.latitude) &&
                    selectedLocation?.lng === parseFloat(address.longitude)
                      ? "border-[#687EFF] !bg-[#687EFF]/10 dark:!bg-[#687EFF]/20"
                      : "border-gray-200 dark:border-neutral-700 hover:border-[#687EFF]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-['Montserrat'] font-bold text-gray-800 dark:text-dark-text">
                          {address.label}
                        </h3>
                        {address.is_default === 1 && (
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            Utama
                          </span>
                        )}
                      </div>
                      <p className="font-['Montserrat'] text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {address.address}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                        {parseFloat(address.latitude).toFixed(6)},{" "}
                        {parseFloat(address.longitude).toFixed(6)}
                      </p>
                    </div>
                    {selectedLocation?.lat === parseFloat(address.latitude) &&
                      selectedLocation?.lng ===
                        parseFloat(address.longitude) && (
                        <svg
                          className="w-6 h-6 text-[#687EFF]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Sheet - Fixed at bottom */}
      <div className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-neutral-700 shadow-lg w-full max-w-4xl">
        {/* Location Info */}
        {selectedLocation && (
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#687EFF]/10 rounded-full flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[#687EFF]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Montserrat'] text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Lokasi Dipilih
                </p>
                <p className="font-['Montserrat'] font-semibold text-gray-800 dark:text-dark-text text-sm">
                  {selectedLocation.label ||
                    `${selectedLocation.lat.toFixed(
                      6
                    )}, ${selectedLocation.lng.toFixed(6)}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs & Confirm Button */}
        <div className="p-4 space-y-3">
          {/* Tabs */}
          <div className="flex gap-2 bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab("map")}
              className={`flex-1 font-['Montserrat'] px-4 py-2.5 font-semibold rounded-md transition-all ${
                activeTab === "map"
                  ? "bg-white dark:bg-dark-card text-[#687EFF] shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Pilih di Peta
            </button>
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={`flex-1 font-['Montserrat'] px-4 py-2.5 font-semibold rounded-md transition-all ${
                  activeTab === "addresses"
                    ? "bg-white dark:bg-dark-card text-[#687EFF] shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Alamat Tersimpan
              </button>
            )}
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedLocation}
            className="w-full font-['Montserrat'] bg-[#687EFF] text-white font-semibold py-4 rounded-xl hover:bg-[#5668CC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            Konfirmasi Lokasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectorModal;
