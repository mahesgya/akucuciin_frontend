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
  }, [isOpen, locationState.data.latitude, locationState.data.longitude, locationState.data.label]);

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
      setCurrentPosition([locationState.data.latitude, locationState.data.longitude]);
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
            const parts = data.display_name.split(',');
            if (parts.length > 3) {
              finalLabel = parts.slice(0, 3).join(',');
            } else {
              finalLabel = data.display_name;
            }
          }
        }
      } catch (error) {
        console.warn("Reverse geocoding failed, using coordinates:", error);
        // Fall back to coordinates
        finalLabel = `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`;
      }

      // If still no label after fetch attempt, use coordinates
      if (!finalLabel) {
        finalLabel = `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`;
      }
    }

    dispatch(setLocation({
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      label: finalLabel,
    }));

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold font-['Montserrat'] text-gray-800 dark:text-dark-text">
            Pilih Lokasi
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-neutral-700 px-6 bg-white dark:bg-dark-card">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`font-['Montserrat'] px-6 py-3 font-semibold transition-colors ${
              activeTab === "map"
                ? "text-[#687EFF] border-b-2 border-[#687EFF]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Pilih di Peta
          </button>
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`font-['Montserrat'] px-6 py-3 font-semibold transition-colors ${
                activeTab === "addresses"
                  ? "text-[#687EFF] border-b-2 border-[#687EFF]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Alamat Tersimpan
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-dark-card">
          {activeTab === "map" ? (
            <div className="space-y-4">
              <p className="font-['Montserrat'] text-sm text-gray-600 dark:text-gray-400">
                Klik pada peta untuk memilih lokasi atau gunakan lokasi saat ini
              </p>
              <LocationPicker
                initialPosition={currentPosition}
                initialZoom={15}
                onLocationSelect={handleLocationSelect}
                height="400px"
                showCoordinates={true}
                showSearchButton={true}
              />
            </div>
          ) : (
            <div className="space-y-3">
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
                    onClick={() => window.location.href = "/profile/addresses/new"}
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
                          {parseFloat(address.latitude).toFixed(6)}, {parseFloat(address.longitude).toFixed(6)}
                        </p>
                      </div>
                      {selectedLocation?.lat === parseFloat(address.latitude) &&
                        selectedLocation?.lng === parseFloat(address.longitude) && (
                        <svg className="w-6 h-6 text-[#687EFF]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => onClose}
            className="flex-1 font-['Montserrat'] bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => handleConfirm()}
            className="flex-1 font-['Montserrat'] bg-[#687EFF] text-white font-semibold py-3 rounded-xl hover:bg-[#5668CC] transition-colors"
          >
            Konfirmasi Lokasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectorModal;
