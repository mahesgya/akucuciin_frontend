import axios from "axios";
import Swal from "sweetalert2";

const customerServices = {
  changeProfile: async (editProfile, accessToken) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`,
        {
          name: editProfile.name,
          telephone: editProfile.telephone,
          address: editProfile.address,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Perubahan Anda Sudah di Terima.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mengganti Data Profile",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  orderLaundry: async (accessToken, formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/order`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pesanan Anda Sudah Terkirim.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
        footer: '<a href="/" style="color: #3085d6; font-weight: bold;">Kembali ke Beranda</a>',
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Order.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
};

export default customerServices;
