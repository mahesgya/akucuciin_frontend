import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import idLocale from "date-fns/locale/id";

import customerServices from "../../services/customer.services";
import Swal from "sweetalert2";

function OrderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLaundryContent, setSelectedLaundryContent] = useState([]);
  const [pickupDate, setPickupDate] = useState(null);
  const [formError, setFormError] = useState("");
  const { idlaundry, idpaket } = useParams();
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const laundryContentOptions = ["Pakaian", "Sprei", "Selimut", "Jas", "Boneka", "Tas", "Sepatu", "Lainnya"];

  const [formData, setFormData] = useState({
    laundry_partner_id: idlaundry,
    package_id: idpaket,
    content: "",
    status: "pending",
    maps_pinpoint: "",
    weight: 0,
    price: 0,
    coupon_code: "",
    note: "",
    pickup_date: "",
  });

  const handleCheckboxChange = (item) => {
    const updatedItems = selectedLaundryContent.includes(item) ? selectedLaundryContent.filter((selected) => selected !== item) : [...selectedLaundryContent, item];
    setSelectedLaundryContent(updatedItems);
    setFormData((prevData) => ({ ...prevData, content: updatedItems.join(", ") }));
  };

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

    if (selectedLaundryContent.length === 0) {
      setFormError("Pilih Minimal Satu Kategori Laundry");
      return;
    }

    if (!pickupDate) {
      setFormError("Pilih Tanggal Penjemputan");
      return;
    }

    const updatedFormData = {
      laundry_partner_id: formData.laundry_partner_id,
      package_id: formData.package_id,
      content: formData.content,
      status: formData.status,
      maps_pinpoint: formData.maps_pinpoint,
      weight: formData.weight,
      price: formData.price,
      coupon_code: formData.coupon_code,
      note: formData.note,
      pickup_date: pickupDate.toISOString().split("T")[0],
    };

    setIsLoading(true);
    try {
      await customerServices.orderLaundry(accessToken, updatedFormData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-2 my-8 space-y-4">
      <button onClick={handleBack}>
        <img alt="backbiru" src="/Images/backbiru.png" className="fixed top-8 left-5 lg:absolute" />
      </button>
      <img src="/Images/LogoAkucuciin.png" alt="logo" className="w-36" />
      <h1 className="font-bold text-2xl font-poppins text-center">FORM PEMESANAN</h1>
      <h4 className="text-gray-600 text-center text-sm">Silahkan isi kolom-kolom di bawah dengan benar.</h4>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center bg-white p-6 max-w-md mx-auto">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-center text-gray-700 mb-2">Kategori Laundry</h4>
          <div className="space-y-3">
            {laundryContentOptions.map((item) => (
              <label key={item} className="flex items-center space-x-3">
                <input type="checkbox" checked={selectedLaundryContent.includes(item)} onChange={() => handleCheckboxChange(item)} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400" />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-center text-gray-700 mb-2">Masukkan Link Google Maps Anda</h4>
          <input
            required
            value={formData.maps_pinpoint}
            onChange={(e) => setFormData({ ...formData, maps_pinpoint: e.target.value })}
            type="text"
            placeholder="Link Google Maps"
            className="rounded-lg p-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:border-b-2"
          />
          <div className="flex flex-row space-x-1 items-center justify-start">
            <img src="/Images/gmaps.png" alt="" className="w-[20px] h-[20px]" />
            <a target="_blank" href="https://www.google.com/maps" className="text-base font-normal text-blue-500 mb-2 mt-2" rel="noopener noreferrer">
              Google Maps
            </a>
          </div>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-center text-gray-700 mb-2">Tanggal Penjemputan</h4>
          <DatePicker
            required
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            dateFormat="eeee, dd MMMM yyyy"
            locale={idLocale}
            placeholderText="Pilih Tanggal"
            minDate={new Date()}
            className="rounded-lg p-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:border-b-2"
          />
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-center text-gray-700 mb-2">Kode Referral (Jika Ada)</h4>
          <input
            value={formData.coupon_code}
            onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
            type="text"
            placeholder="Kode Referral"
            className="rounded-lg p-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:border-b-2"
          />
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-center text-gray-700 mb-2">Catatan (Opsional)</h4>
          <input value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} type="text" placeholder="Catatan" className="rounded-lg p-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:border-b-2" />
        </div>

        {formError && <p className="text-red-500 text-center">{formError}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`shadow-md w-56 ${isLoading ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-green-500 text-white"} font-semibold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          {isLoading ? "Loading..." : "Kirim Pesanan"}
        </button>
      </form>
      <h3 className="text-sm text-gray-600">HIGHLY PROFESSIONAL CLEANING</h3>
    </div>
  );
}

export default OrderForm;
