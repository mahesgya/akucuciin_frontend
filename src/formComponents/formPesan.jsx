import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import idLocale from "date-fns/locale/id";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
function FormPemesanan() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLaundryContent, setSelectedLaundryContent] = useState([]);
  const [selectedLaundryType, setSelectedLaundryType] = useState(null);
  const [pickup_date, setPickUpDate] = useState(null);
  const [formError, setFormError] = useState("");
  const laundry_content = [
    "Pakaian",
    "Sprei Kecil (80x80 - 140x140)",
    "Sprei Besar (160x160 - 200x200)",
    "Selimut",
    "Jas",
  ];
  const laundry_type = ["Biasa 3 Hari", "Express 1 Hari"];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    laundry_type: "",
    laundry_content: [],
    laundry_content_other: "",
    gmaps_pinpoint: "",
    code_referral: "",
    note: "",
  });

  const handleCheckboxChange = (item) => {
    const updatedItems = selectedLaundryContent.includes(item)
      ? selectedLaundryContent.filter(
          (selectedLaundryContent) => selectedLaundryContent !== item
        )
      : [...selectedLaundryContent, item];
    setSelectedLaundryContent(updatedItems);
    setFormData((prevData) => ({
      ...prevData,
      laundry_content: updatedItems,
    }));
  };

  const handleCheckboxChange2 = (laundry_type) => {
    setSelectedLaundryType(laundry_type);
    setFormData((prevData) => ({
      ...prevData,
      laundry_type: laundry_type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    if (selectedLaundryContent.length === 0) {
      setFormError("Pilih Minimal Satu Kategori Laundry");
    } else if (accessToken) {
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          return axios
            .post(
              `${process.env.REACT_APP_BASE_BACKEND_URL}/api/order`,
              {
                ...formData,
                pickup_date: pickup_date.toISOString(),
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            )
            .catch((error) => {
              console.error("Error submitting form", error);
              alert("Terjadi kesalahan, silakan coba lagi.");
            });
        })
        .then((response) => {
          setIsLoading(false);
          console.log("Form submitted successfully", response.data);
          navigate("/order-success");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error submitting form", error.response?.data || error);
          alert("Terjadi kesalahan, silakan coba lagi.");
        });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center mx-[0.5em] my-[2em] flex flex-col items-center justify-center space-y-4">
      <img src="Images/LogoAkucuciin.png" alt="logo" className="w-[9rem]" />
      <h1 className="font-bold text-[30px] font-poppins text-center">
        FORM PEMESANAN
      </h1>
      <h4 className="font-sans font-base font-[8px] text-gray55 text-center">
        Silahkan isi kolom-kolom di bawah dengan benar{" "}
      </h4>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center bg-white p-6 max-w-md mx-auto"
      >
        <div className="w-[100%]">
          <h4 className="text-lg font-semibold font-sans text-gray-700 mb-4 text-center">
            Pilih Jenis Laundry
          </h4>
          <div className="space-y-3">
            {laundry_type.map((laundry_type, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  required
                  onChange={() => handleCheckboxChange2(laundry_type)}
                  type="radio"
                  name="laundry_type"
                  value={formData.laundry_type}
                  checked={selectedLaundryType === laundry_type}
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-400"
                />
                <span className="text-gray-700">{laundry_type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-[100%]">
          <h4 className="text-lg font-semibold font-sans text-center text-gray-700 mb-5">
            Kategori Laundry
          </h4>
          <div className="space-y-3">
            {laundry_content.map((item) => (
              <label key={item} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="laundry_content"
                  checked={selectedLaundryContent.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
                />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
            <label className="flex items-center space-x-3">
              <input
                value={formData.laundry_content_other}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    laundry_content_other: e.target.value,
                  })
                }
                type="text"
                name="laundry_content_other"
                placeholder="Lainnya"
                className="rounded-lg p-1 w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col w-[100%]">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center font-sans ">
            Masukkan Link Google Maps Anda
          </h4>
          <input
            required
            value={formData.gmaps_pinpoint}
            onChange={(e) =>
              setFormData({ ...formData, gmaps_pinpoint: e.target.value })
            }
            type="text"
            placeholder="Link Google Maps"
            name="gmaps_pinpoint"
            className="rounded-lg p-1 w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
          />
          <div className="flex flex-row space-x-1 items-center justify-start">
            <img src="Images/gmaps.png" alt="" className="w-[20px] h-[20px]" />
            <a
              target="_blank"
              href="https://www.google.com/maps/@-6.5585586,106.7345455,14z?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D"
              className="text-base font-normal text-blue-500 mb-2 mt-2"
            >
              Google Maps
            </a>
          </div>
        </div>

        <div className="flex flex-col w-[100%]">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center font-sans">
            Tanggal Penjemputan
          </h4>
          <DatePicker
            required
            selected={pickup_date}
            onChange={(date) => setPickUpDate(date)}
            dateFormat="eeee, dd MMMM yyyy"
            locale={idLocale}
            placeholderText="Pilih Tanggal"
            minDate={new Date(new Date().setDate(new Date().getDate()))}
            className="rounded-lg p-1 w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
          />
        </div>
        <div className="flex flex-col w-[100%]">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center font-sans ">
            Kode Referral (Jika Ada)
          </h4>
          <input
            value={formData.code_referral}
            onChange={(e) =>
              setFormData({ ...formData, code_referral: e.target.value })
            }
            type="text"
            placeholder="Kode Referral"
            name="code_referral"
            className="rounded-lg p-1 w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
          />
        </div>

        <div className="flex flex-col w-[100%]">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center font-sans ">
            Catatan (Opsional)
          </h4>
          <input
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            type="text"
            placeholder="Catatan"
            name="note"
            className="rounded-lg p-1 w-full font-sans bg-birumuda text-gray-700 focus:outline-none focus:border-b-2"
          />
        </div>
        {formError && <p className="text-red-500 text-center">{formError}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`shadow-md font-sans w-[200px] ${
              isLoading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#06d001] text-white"
            }  text-white font-semibold p-3  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#06d001] focus:ring-offset-2 md:w-[200px] lg:w-[240px]`}
        >
          {isLoading ? "Loading..." : "Selesaikan Pemesanan"}
        </button>
      </form>
      <h3 className="pt-10 text-[14px] font-sans text-gray55">
        HIGHLY PROFESSIONAL CLEANING
      </h3>
    </div>
  );
}

export default FormPemesanan;
