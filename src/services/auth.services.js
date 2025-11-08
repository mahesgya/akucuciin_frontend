import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { setLoading, setLogin, setLogout } from "../redux/auth.slicer";
import { errorSwal, successSwal } from "../utils/alert.utils";
import CustomerServices from "./customer.services";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const AuthServices = {
  registerUser: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/customer`, formData);
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  loginUser: async (formData, dispatch, navigate, redirectTo, fromStatePath, activePaket) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/customer/login`, formData);
      const { accessToken, refreshToken } = response.data.data;

      await Cookies.set("accessToken", accessToken, { secure: true, sameSite: "none", expires: 1 });
      await Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "none", expires: 7 });

      await dispatch(setLogin({ accessToken, refreshToken }));
      await CustomerServices.getProfile(accessToken, dispatch);

      // Check if user has any addresses
      try {
        const addressResponse = await CustomerServices.getAddresses(accessToken);
        if (addressResponse.success && (!addressResponse.data || addressResponse.data.length === 0)) {
          // No addresses found, show modal and redirect
          await Swal.fire({
            icon: "info",
            title: "Selamat Datang!",
            text: "Yuk buat alamat pertama Anda untuk kemudahan menggunakan Akucuciin.",
            confirmButtonText: "Buat Alamat",
            confirmButtonColor: "#687EFF",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          navigate("/profile/addresses", { replace: true });
          return response.data;
        }
      } catch (addressError) {
        // If address check fails, continue with normal flow
        console.error("Error checking addresses:", addressError);
      }

      redirectTo = fromStatePath || sessionStorage.getItem("postLoginRedirect") || "/";
      sessionStorage.removeItem("postLoginRedirect");

      navigate(redirectTo, { replace: true , state: { activePaket: activePaket }});
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.errors || error.response?.data?.message || "Login gagal. Silakan coba lagi.";
      errorSwal(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  },
  handleOauth: async () => {
    try {
      window.location.href = `${BASE_URL}/api/customer/login/google-auth`;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  logoutUser: async (refreshToken, dispatch, setLoading, navigate) => {
    try {
      setLoading(true);
      const response = axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/logout`, {
        refresh_token: refreshToken,
      });

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/");
      await dispatch(setLogout());
      return response.data;
    } catch (error) {
      await dispatch(setLogout());
      errorSwal(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  },
  refreshUser: async (oldRefreshToken, dispatch, navigate) => {
    try {
      setLoading(true);

      const response = await axios.put(`${BASE_URL}/api/auth`, { refresh_token: oldRefreshToken });
      const { accessToken, refreshToken } = response.data.data;

      Cookies.set("accessToken", accessToken, { secure: true, sameSite: "none", expires: 1 });
      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "none", expires: 7 });

      await dispatch(setLogin({ accessToken, refreshToken }));

      navigate("/");

      return response.data;
    } catch (error) {
      await dispatch(setLogout());
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      errorSwal(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  },
  resetPasswordEmail: async (email) => {
    try {
      setLoading(true);
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
      errorSwal(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  },
  resetPassPage: async (email, reset_password_token, password, confirmPassword, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/request-reset-password/customer/${email}/${reset_password_token}`, {
        password,
        confirm_password: confirmPassword,
      });

      await Swal.fire({
        icon: "success",
        title: "Password Berhasil Diperbarui!",
        text: "Silakan login dengan password baru Anda.",
        footer: '<a href="/login" style="color: #3085d6; text-decoration: none; font-weight: bold;">Kembali ke Halaman Login</a>',
      });

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  },
  resendEmail: async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/resend-verification-email`, { email });
      successSwal("Email verifikasi baru berhasil dikirim.");

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
};

export default AuthServices;
