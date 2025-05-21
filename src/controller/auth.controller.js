import AuthServices from "../services/auth.services";
import { setLogout } from "../redux/auth.slicer";
import Cookies from "js-cookie";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const authController = {

  handleLogout: async (refreshToken, dispatch, navigate, setError) => {
    try {
      await AuthServices.logoutUser(refreshToken, dispatch);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      dispatch(setLogout());
      setError("Gagal logout");
    }
  },

  resetPasswordEmail: async (email, setIsLoading) => {
    try {
      setIsLoading(true);
      const response = await AuthServices.resetPasswordEmail(email);
      await sleep(1000);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
    }
  },

  ResetPassPage: async (email, reset_password_token, password, confirmPassword, setError, setLoading) => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi password harus sama.");
        return;
      }
      await AuthServices.resetPassPage(email, reset_password_token, password, confirmPassword);
    } catch (error) {
      setError(error.response?.data?.errors || "Gagal Reset Password, Silahkan Coba Lagi.");
    } finally {
      setLoading(false);
    }
  },
};

export default authController;
