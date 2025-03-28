import authService from "../services/auth.services";
import { checkAuth, setLogin, setLogout } from "../redux/auth.slicer";
import { validateCustomer } from "../validator/customer.validator";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const authController = {
  handleLogin: async (formData, dispatch, navigate, setFormData, setLoading) => {
    setLoading(true);
    try {
      const data = await authService.loginUser(formData);
      const { accessToken, refreshToken } = data.data;

      Cookies.set("accessToken", accessToken, { secure: true, sameSite: "none", expires: 1 });
      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "none", expires: 7 });

      dispatch(setLogin({ accessToken, refreshToken }));
      await dispatch(checkAuth());

      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    } finally {
      setLoading(false);
    }
  },

  handleRegister: async (formData, setFormData, setLoading, navigate) => {
    setLoading(true);
    if (formData.password !== formData.confirm_password) {
      await Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Password dan confirm password tidak sama.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
      return;
    }

    const validationErrors = validateCustomer(formData);

    if (!validationErrors) {
      try {
        await authService.registerUser(formData);
        setFormData({
          email: "",
          password: "",
          confirm_password: "",
          name: "",
          address: "",
          telephone: "",
        });
        navigate(`/register/${formData.email}`)
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#d33",
          showCloseButton: true,
        });
      } finally {
        setLoading(false);
      }
    }
  },

  handleLogout: async (refreshToken, dispatch, navigate, setError) => {
    try {
      await authService.logoutUser(refreshToken, dispatch);
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
      const response = await authService.resetPasswordEmail(email);
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
      await authService.resetPassPage(email, reset_password_token, password, confirmPassword);
    } catch (error) {
      setError(error.response?.data?.errors || "Gagal Reset Password, Silahkan Coba Lagi.");
    } finally {
      setLoading(false);
    }
  },
};

export default authController;
