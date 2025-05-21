import axios from "axios";
import { errorSwal, successSwal } from "../utils/alert.utils";
import { setProfileData } from "../redux/auth.slicer";

const CustomerServices = {
  getProfile: async (accessToken, dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      dispatch(setProfileData(response.data));
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  changeProfile: async (editProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing) => {
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
      dispatch(setProfileData(editProfile));
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...editProfile,
      }));
      setEditProfile({ ...editProfile });
      setIsEditing(false);
      successSwal("Perubahan profile berhasil.");
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  orderLaundry: async (accessToken, formData, setIsLoading, navigate) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/order`, formData, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      });

      successSwal("Pesanan berhasil dikirim.");
      navigate("/");
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  },
  postReferral: async (accessToken, formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/referral_code`, formData, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      });

      successSwal("Berhasil membuat kode referral.");
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getOrderLaundry: async (accessToken) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/orders`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  cancelOrder: async (accessToken, orderId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      });

      successSwal("Order berhasil dibatalkan.");
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  postReview: async (accessToken, orderId, rating, review) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}/review `,
        { rating, review },
        {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        }
      );

      successSwal("Ulasan berhasil dikirim");
      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  orderPayment: async (accessToken, orderId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}/pay`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      });

      const paymentUrl = response.data.data.url;
      window.location.href = paymentUrl;

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
};

export default CustomerServices;
