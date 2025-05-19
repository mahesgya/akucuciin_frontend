import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { setProfileData } from "../../redux/auth.slicer";
import { useDispatch } from "react-redux";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import idLocale from "date-fns/locale/id";

import customerServices from "../../services/customer.services";
import Swal from "sweetalert2";

function OrderForm() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const { profileData, accessToken } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: profileData.data.name,
    telephone: profileData.data.telephone,
    address: profileData.data.address,
  });

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);

  const [formError, setFormError] = useState("");
  const { idlaundry, idpaket } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    laundry_partner_id: idlaundry,
    package_id: idpaket,
    content: "-",
    status: "pending",
    maps_pinpoint: "",
    weight: 0,
    price: 0,
    referral_code: "",
    coupon_code: "",
    note: "",
    pickup_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Order.",
        text: "Anda Harus Login Terlebih Dahulu",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      return;
    }

    if (!pickupDate) {
      setFormError("Pilih Tanggal Penjemputan");
      return;
    }

    const pickup_date = dayjs(pickupDate).tz("Asia/Jakarta").format("DD-MM-YYYY");

    const updatedFormData = {
      laundry_partner_id: formData.laundry_partner_id,
      package_id: formData.package_id,
      content: "-",
      status: formData.status,
      maps_pinpoint: formData.maps_pinpoint,
      weight: formData.weight,
      price: formData.price,
      referral_code: formData.referral_code,
      coupon_code: formData.coupon_code,
      note: formData.note,
      pickup_date: pickup_date,
    };

    profile.telephone = transformPhoneNumber(profile.telephone);

    await customerServices.changeProfile(profile, accessToken);
    await customerServices.orderLaundry(accessToken, updatedFormData, setIsLoading, navigate);
    await dispatch(setProfileData(profile));
  };

  const transformPhoneNumber = (phone) => {
    if (!phone) return "";

    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.substring(1);
    }

    if (!cleaned.startsWith("62")) {
      cleaned = "62" + cleaned;
    }

    return cleaned;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-2 my-8 space-y-4">
      <button onClick={handleBack}>
        <img alt="backbiru" src="/Images/backbiru.png" className="absolute top-8 left-5 lg:absolute" />
      </button>
      <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-[200px] md:w-[250px] lg:w-[300px]" />
      <h1 className="font-bold font-quick text-center text-2xl md:text-3xl lg:text-4xl">FORM PEMESANAN</h1>
      <h4 className="font-quick text-gray-600 text-center text-sm md:text-base lg:text-lg">Silahkan isi kolom-kolom di bawah dengan benar.</h4>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center bg-white py-3 px-6 min-w-[90vw] max-w-md mx-auto ">
        {(profileData.data.telephone === null || profileData.data.address === null) && (
          <>
            <div className="w-full">
              <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Nomor Telephone</h4>
              <input
                required
                value={profile.telephone}
                onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                type="number"
                placeholder="Ex: 62858491234"
                className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
              />
            </div>

            <div className="w-full">
              <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Alamat Lengkap</h4>
              <input
                required
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                type="text"
                placeholder="Ex: Dramaga Cantik, Cluster Pinnacle Blok H.28"
                className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
              />
            </div>
          </>
        )}

        <div className="w-full">
          <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Link Google Maps Anda</h4>
          <input
            required
            value={formData.maps_pinpoint}
            onChange={(e) => setFormData({ ...formData, maps_pinpoint: e.target.value })}
            type="text"
            placeholder="Ex: https://www.google.com/maps"
            className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
          />
          <div className="flex flex-row space-x-1 items-center justify-start">
            <img src="/Images/gmaps.png" alt="" className="w-[20px] h-[20px]" />
            <a target="_blank" href="https://www.google.com/maps" className="font-quick font-normal text-blue-500 mb-1 mt-2 text-sm md:text-base" rel="noopener noreferrer">
              Google Maps
            </a>
          </div>
        </div>

        <div className="w-full">
          <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Tanggal Penjemputan Baju Kotor</h4>
          <DatePicker
            required
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            dateFormat="eeee, dd MMMM yyyy"
            locale={idLocale}
            placeholderText="Pilih Tanggal Penjemputan..."
            minDate={new Date()}
            style={{ width: "100%" }}
            className="w-full font-quick rounded-lg p-2 bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
          />
        </div>

        <div className="w-full">
          <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Kode Referral (Jika Ada)</h4>
          <input
            value={formData.referral_code}
            onChange={(e) => setFormData({ ...formData, referral_code: e.target.value })}
            type="text"
            placeholder="Ex: REF12345"
            className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
          />
        </div>

        <div className="w-full">
          <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Voucher Diskon (Jika Ada)</h4>
          <input
            value={formData.coupon_code}
            onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
            type="text"
            placeholder="Ex: DISKON12"
            className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
          />
        </div>

        <div className="w-full">
          <h4 className="font-quick font-semibold text-left text-gray-700 mb-1 text-md md:text-xl">Catatan (Opsional)</h4>
          <input
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            type="text"
            placeholder="Ex: Jangan Pakai Pemutih"
            className="font-quick rounded-lg p-2 w-full bg-white border border-0.2 border-gray-500/30 shadow-sm text-gray-700 focus:outline-none focus:border-b-2 text-base md:text-lg"
          />
        </div>

        {formError && <p className="text-red-500 text-center">{formError}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`shadow-md w-56 font-quick mt-[20px] font-base md:text-lg  ${
            isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-green-500 text-white"
          } font-semibold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          {isLoading ? "Loading..." : "Kirim Pesanan"}
        </button>
      </form>
      <h3 className="text-sm text-gray-600 md:text-lg">HIGHLY PROFESSIONAL CLEANING</h3>
    </div>
  );
}

export default OrderForm;
