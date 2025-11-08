import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { setLogin } from "../../redux/auth.slicer";
import CustomerServices from "../../services/customer.services";
import LoadingUtils from "../../utils/loading.utils";

const GoogleOauthRedirect = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const storeTokens = async () => {
			const accessToken = searchParams.get("accessToken");
			const refreshToken = searchParams.get("refreshToken");

			if (accessToken && refreshToken) {
				Cookies.set("accessToken", accessToken, {
					secure: false,
					sameSite: "none",
					expires: 1,
				});
				Cookies.set("refreshToken", refreshToken, {
					secure: false,
					sameSite: "none",
					expires: 7,
				});

			await new Promise((r) => setTimeout(r, 300));
			await dispatch(setLogin({ accessToken, refreshToken }));
			const user = await CustomerServices.getProfile(accessToken, dispatch);

			// Find if user has telephone number and address or not, redirect accordingly
			if (user.data.telephone) {
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
						navigate("/profile/addresses");
						return;
					}
				} catch (addressError) {
					// If address check fails, continue with normal flow
					console.error("Error checking addresses:", addressError);
				}
				navigate("/");
			} else {
				navigate("/register/missing-fields");
			}
		}
	};

		storeTokens();
	}, [searchParams, navigate, dispatch]);	return <LoadingUtils />;
};

export default GoogleOauthRedirect;
