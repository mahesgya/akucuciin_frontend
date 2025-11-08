import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks
function LocationMarker({ position, setPosition, onLocationSelect }) {
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);

      // Generate Google Maps link
      const mapsUrl = `https://maps.google.com/?q=${e.latlng.lat},${e.latlng.lng}`;

      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          mapsUrl: mapsUrl,
        });
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}

// Component to update map center
function ChangeMapView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom || map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  }, [center, zoom, map]);

  return null;
}

/**
 * LocationPicker Component
 *
 * A reusable map component that allows users to pick a location by clicking on the map.
 *
 * @param {Object} props
 * @param {Array} props.initialPosition - Initial position [lat, lng] (default: [-6.5971, 106.8060] - Jakarta)
 * @param {number} props.initialZoom - Initial zoom level (default: 13)
 * @param {Function} props.onLocationSelect - Callback function when location is selected
 *   Receives: { lat, lng, mapsUrl }
 * @param {string} props.height - Height of the map container (default: "400px")
 * @param {string} props.width - Width of the map container (default: "100%")
 * @param {boolean} props.showCoordinates - Show coordinates below the map (default: true)
 * @param {boolean} props.showSearchButton - Show "Use Current Location" button (default: true)
 * @param {string} props.className - Additional CSS classes
 *
 * @example
 * <LocationPicker
 *   initialPosition={[-6.5971, 106.8060]}
 *   onLocationSelect={(location) => {
 *     console.log("Selected location:", location);
 *     setFormData({ ...formData, maps_pinpoint: location.mapsUrl });
 *   }}
 *   height="500px"
 * />
 */
const LocationPicker = ({
  initialPosition = [-6.5971, 106.806], // Default: Jakarta, Indonesia
  initialZoom = 13,
  onLocationSelect,
  height = "400px",
  width = "100%",
  showCoordinates = true,
  showSearchButton = true,
  className = "",
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [mapCenter, setMapCenter] = useState(initialPosition);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Update position when initialPosition changes
  useEffect(() => {
    if (initialPosition && initialPosition.length === 2) {
      setPosition(initialPosition);
      setMapCenter(initialPosition);
    }
  }, [initialPosition]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = [pos.coords.latitude, pos.coords.longitude];
        setPosition(newPosition);
        setMapCenter(newPosition); // Move map view to current location

        const mapsUrl = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;

        if (onLocationSelect) {
          onLocationSelect({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            mapsUrl: mapsUrl,
            label: "Lokasi Saat Ini",
          });
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="relative" style={{ height, width }}>
        <MapContainer
          center={position}
          zoom={initialZoom}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "12px",
            zIndex: 0,
          }}
          className="shadow-sm border border-gray-300/30 dark:border-neutral-700"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            setPosition={setPosition}
            onLocationSelect={onLocationSelect}
          />
          <ChangeMapView center={mapCenter} zoom={initialZoom} />
        </MapContainer>

        {/* Current Location Button Overlay */}
        {showSearchButton && (
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loadingLocation}
            className="absolute top-[90px] left-[10px] z-[1000] bg-white dark:bg-dark-card p-2 rounded-md shadow-md border border-gray-300/50 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#687EFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Gunakan Lokasi Sekarang"
          >
            {loadingLocation ? (
              <svg className="w-5 h-5 text-[#687EFF] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#687EFF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {showCoordinates && position && (
        <div className="bg-white dark:bg-dark-card p-3 rounded-xl border border-gray-300/30 dark:border-neutral-700">
          <p className="font-['Montserrat'] text-sm text-gray-600 dark:text-dark-text/70">
            <span className="font-semibold">Lokasi Dipilih:</span>
          </p>
          <p className="text-sm text-gray-800 dark:text-dark-text font-mono">
            Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
          </p>
          <a
            href={`https://maps.google.com/?q=${position[0]},${position[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Montserrat'] text-sm text-[#687EFF] hover:underline inline-flex items-center mt-1"
          >
            Preview in Google Maps →
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
