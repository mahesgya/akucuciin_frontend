import axios from "axios";
import Swal from "sweetalert2";
import { setLoading } from "../redux/authSlicer";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const authService = {
  registerUser: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/customer`, formData);
      await Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Silakan cek email Anda untuk verifikasi.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
      });
      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  loginUser: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/customer/login`, formData);
      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  logoutUser: async (refreshToken, dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/logout`, {
        refresh_token: refreshToken,
      });
      delete axios.defaults.headers.common["Authorization"];
      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Melakukan Logout",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }finally {
      dispatch(setLoading(false)); 
    }
  },
  resetPasswordEmail: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/request-reset-password`, {
        email,
      });
      await Swal.fire({
        icon: "success",
        title: "Permintaan Reset Password Berhasil!!",
        text: "Silakan cek email Anda untuk mengganti password.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
      });
      return response.data;
    } catch (error) {
        await Swal.fire({
            icon: "error",
            title: "Gagal Melakukan Reset Password",
            text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
            confirmButtonText: "Coba Lagi",
            confirmButtonColor: "#d33",
            showCloseButton: true,
          });
    }
  },
  resetPassPage : async (email, reset_password_token, password, confirmPassword) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/request-reset-password/customer/${email}/${reset_password_token}`,
        {
          password,
          confirm_password: confirmPassword,
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Password Berhasil Diperbarui!",
        text: "Silakan login dengan password baru Anda.",
        footer: '<a href="/login" style="color: #3085d6; text-decoration: none; font-weight: bold;">Kembali ke Halaman Login</a>'
      });
      

      return response.data
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Melakukan Pergantian Password.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      
      return null;
    }

  }
};

export default authService;
