import axios from "axios";
import { setProfileData } from "../redux/auth.slicer";
import { errorSwal, successSwal } from "../utils/alert.utils";
import { toastError, toastSuccess } from "../utils/toast.utils";

const CustomerServices = {
	getProfile: async (accessToken, dispatch) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);

			dispatch(setProfileData(response.data));
			return response.data;
		} catch (error) {
			errorSwal(error.response?.data?.errors);
		}
	},
	changeProfile: async (
		editProfile,
		accessToken,
		dispatch,
		setProfile,
		setEditProfile,
		setIsEditing
	) => {
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
			toastSuccess("Profil berhasil diperbarui.");
			return response.data;
		} catch (error) {
			toastError(error.response?.data?.errors);
		}
	},
	orderLaundry: async (accessToken, formData, setIsLoading, navigate) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/order`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			successSwal("Pesanan berhasil dikirim.").then(() => {
				navigate(`/order/${response.data.data.id}`);
			});
		} catch (error) {
			errorSwal(error.response?.data?.errors);
		} finally {
			setIsLoading(false);
		}
	},
	postReferral: async (accessToken, formData) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/referral_code`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			toastSuccess("Berhasil membuat kode referral.");
			return response.data;
		} catch (error) {
			toastError(error.response?.data?.errors);
		}
	},
	getOrderLaundry: async (accessToken) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/orders`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			errorSwal(error.response?.data?.errors);
		}
	},
	cancelOrder: async (accessToken, orderId, cancelReason) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						cancel_reason: cancelReason,
					},
				}
			);

			successSwal("Order berhasil dibatalkan.");
			return response.data;
		} catch (error) {
			errorSwal(error.response?.data?.errors || "Unauthorized");
		}
	},
	postReview: async (accessToken, orderId, rating, review) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}/review `,
				{ rating, review },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			return response.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.errors || "Server error, please try again later."
			);
		}
	},
	orderPayment: async (accessToken, orderId) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}/pay`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			const paymentUrl = response.data.data.url;
			window.location.href = paymentUrl;

			return response.data;
		} catch (error) {
			errorSwal(error.response?.data?.errors);
		}
	},
	getSingleOrder: async (accessToken, orderId) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/order/${orderId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			const orderData = response.data;
			return orderData;
		} catch (error) {
			errorSwal(error.response?.data?.errors);
		}
	},
	checkReferralCode: async (accessToken, referralCode) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/public/referral_code/${referralCode}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			return (
				error.response?.data || {
					success: false,
					errors: "Referral code not found",
				}
			);
		}
	},
	checkCouponCode: async (accessToken, couponCode) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_BACKEND_URL}/api/coupon/${couponCode}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			return (
				error.response?.data || {
					success: false,
					errors: "Coupon code not found",
				}
			);
		}
	},
};

export default CustomerServices;
