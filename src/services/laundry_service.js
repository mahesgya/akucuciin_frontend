import axios from "axios";
import Swal from "sweetalert2";

const laundryServices = {
  getByLocation: async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partners/locations`
      );

      return response.data
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Data Laundry",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  getByCity: async (city) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partners/locations/${city}`
      );

      return response.data
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Data Laundry",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  getById: async (idLaundry) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}`
      );

      return response.data
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Data Laundry",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  getImages: async (idLaundry) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}/images`
      );

      return response.data
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Data Laundry",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
};

export default laundryServices;
