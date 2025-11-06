import { useState, useEffect } from "react";
import LocationPicker from "../../components/ui/map/LocationPicker";

/**
 * Example page demonstrating LocationPicker with current location default
 */
const MapExample = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Get user's current location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingCurrentLocation(false);
      setCurrentPosition([-6.5971, 106.8060]); // Default to Jakarta
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = [position.coords.latitude, position.coords.longitude];
        setCurrentPosition(pos);
        setLoadingCurrentLocation(false);
        
        // Auto-select current location
        setSelectedLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          mapsUrl: `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError(`Error: ${error.message}`);
        setLoadingCurrentLocation(false);
        setCurrentPosition([-6.5971, 106.8060]); // Default to Jakarta
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleLocationSelect = (location) => {
    console.log("Location selected:", location);
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-[#F4F5FF] dark:bg-dark-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Montserrat'] text-3xl font-bold text-gray-800 dark:text-dark-text mb-2">
          Interactive Location Picker
        </h1>
        <p className="font-['Montserrat'] text-base text-gray-600 dark:text-dark-text/70 mb-6">
          Click anywhere on the map to select a location and get coordinates
        </p>

        {/* Loading State */}
        {loadingCurrentLocation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-6">
            <p className="font-['Montserrat'] text-blue-700 dark:text-blue-400">
              📍 Getting your current location...
            </p>
          </div>
        )}

        {/* Error State */}
        {locationError && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 mb-6">
            <p className="font-['Montserrat'] text-yellow-700 dark:text-yellow-400 font-semibold mb-1">
              ⚠️ Location Access
            </p>
            <p className="font-['Montserrat'] text-sm text-yellow-600 dark:text-yellow-300">
              {locationError}. Using default location (Jakarta).
            </p>
            <p className="font-['Montserrat'] text-xs text-yellow-600 dark:text-yellow-300 mt-2">
              To use your location, please enable location permissions in your browser.
            </p>
          </div>
        )}

        {/* Map Component */}
        {currentPosition && (
          <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-300/30 dark:border-neutral-700 mb-6">
            <h2 className="font-['Montserrat'] text-xl font-semibold text-gray-800 dark:text-dark-text mb-4">
              {loadingCurrentLocation ? "Loading Map..." : "Select Your Location"}
            </h2>
            <LocationPicker
              initialPosition={currentPosition}
              initialZoom={15}
              onLocationSelect={handleLocationSelect}
              height="500px"
              showCoordinates={false}
              showSearchButton={true}
            />
          </div>
        )}

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-300/30 dark:border-neutral-700">
            <h2 className="font-['Montserrat'] text-xl font-semibold text-gray-800 dark:text-dark-text mb-4">
              📍 Selected Location Details
            </h2>
            
            <div className="space-y-4">
              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F4F5FF] dark:bg-dark-bg p-4 rounded-lg">
                  <p className="font-['Montserrat'] text-xs font-semibold text-gray-500 dark:text-dark-text/70 mb-1">
                    LATITUDE
                  </p>
                  <p className="text-lg font-bold text-gray-800 dark:text-dark-text font-mono">
                    {selectedLocation.lat.toFixed(6)}
                  </p>
                </div>
                <div className="bg-[#F4F5FF] dark:bg-dark-bg p-4 rounded-lg">
                  <p className="font-['Montserrat'] text-xs font-semibold text-gray-500 dark:text-dark-text/70 mb-1">
                    LONGITUDE
                  </p>
                  <p className="text-lg font-bold text-gray-800 dark:text-dark-text font-mono">
                    {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>

              {/* Copy Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedLocation.lat.toString());
                    alert("Latitude copied!");
                  }}
                  className="font-['Montserrat'] px-4 py-2 bg-[#687EFF] text-white rounded-lg font-semibold hover:bg-[#5668CC] transition-colors text-sm"
                >
                  Copy Latitude
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedLocation.lng.toString());
                    alert("Longitude copied!");
                  }}
                  className="font-['Montserrat'] px-4 py-2 bg-[#687EFF] text-white rounded-lg font-semibold hover:bg-[#5668CC] transition-colors text-sm"
                >
                  Copy Longitude
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${selectedLocation.lat}, ${selectedLocation.lng}`);
                    alert("Coordinates copied!");
                  }}
                  className="font-['Montserrat'] px-4 py-2 bg-[#39BCF8] text-white rounded-lg font-semibold hover:bg-[#2BA8E0] transition-colors text-sm"
                >
                  Copy Both
                </button>
              </div>

              {/* Google Maps URL */}
              <div className="bg-[#F4F5FF] dark:bg-dark-bg p-4 rounded-lg">
                <p className="font-['Montserrat'] text-xs font-semibold text-gray-500 dark:text-dark-text/70 mb-2">
                  GOOGLE MAPS URL
                </p>
                <div className="flex items-start gap-2">
                  <a
                    href={selectedLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Montserrat'] text-sm text-[#687EFF] hover:underline break-all flex-1"
                  >
                    {selectedLocation.mapsUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLocation.mapsUrl);
                      alert("Maps URL copied!");
                    }}
                    className="font-['Montserrat'] px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                  >
                    Copy URL
                  </button>
                </div>
              </div>

              {/* JSON Output */}
              <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-['Montserrat'] text-xs font-semibold text-gray-300 mb-2">
                  JSON OUTPUT
                </p>
                <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{JSON.stringify(selectedLocation, null, 2)}
                </pre>
              </div>

              {/* Open in Google Maps */}
              <a
                href={selectedLocation.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Montserrat'] w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <img src="/Images/gmaps.png" alt="Google Maps" className="w-5 h-5" />
                Open in Google Maps
              </a>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-300/30 dark:border-neutral-700">
          <h2 className="font-['Montserrat'] text-xl font-semibold text-gray-800 dark:text-dark-text mb-3">
            💡 How to Use
          </h2>
          <ul className="font-['Montserrat'] text-sm text-gray-600 dark:text-dark-text/70 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#687EFF] font-bold">1.</span>
              <span>The map automatically centers on your current location (if permission granted)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#687EFF] font-bold">2.</span>
              <span>Click anywhere on the map to select a new location</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#687EFF] font-bold">3.</span>
              <span>A marker will appear and the coordinates will be displayed below</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#687EFF] font-bold">4.</span>
              <span>Use the "Use Current Location" button to recenter to your position</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#687EFF] font-bold">5.</span>
              <span>Copy coordinates individually or as a pair for use in your application</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapExample;
