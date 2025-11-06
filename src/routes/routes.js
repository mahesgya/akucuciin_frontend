import App from "../App";

import AboutUsHP from "../pages/static/about/index.hp";
import OurServicesHP from "../pages/static/service/index.hp";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import RequestResetPassword from "../pages/auth/request.reset.password";
import ResetPassword from "../pages/auth/reset.pass";
import EmailVerificationPage from "../pages/auth/verif.email";
import GoogleOauthRedirect from "../pages/auth/google.oauth";

import OrderForm from "../pages/user/order.form";

import VerifyFailed from "../components/ui/verify/verify.failed";
import VerifyFailedInvalid from "../components/ui/verify/verfiy.failed.invalid";
import VerifyFailedActivated from "../components/ui/verify/verify.failed.activated";
import VerifySuccess from "../components/ui/verify/verify.success";

import Profile from "../pages/user/profile";

import LaundryDetail from "../pages/laundry/laundry.detail";
import Order from "../pages/user/order";
import PrivacyPolicy from "../pages/static/privacy_policy";
import OrderDetail from "../pages/user/order.detail";
import NotFound from "../pages/not_found";
import SnkVoucherGacha from "../pages/other/SnkVoucherGacha";
import MapExample from "../pages/examples/MapExample";

import RequireAuth from "./require.auth";
import MissingFields from "../pages/auth/missing.fields";

const withAuth = (element) => <RequireAuth>{element}</RequireAuth>;

const Routess = [
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/aboutus",
		element: <AboutUsHP />,
	},
	{
		path: "/services",
		element: <OurServicesHP />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/register/missing-fields",
		element: <MissingFields />,
	},
	{
		path: "/register/:email",
		element: <EmailVerificationPage />,
	},
	{
		path: "/verify/error",
		element: <VerifyFailed />,
	},
	{
		path: "/verify/success",
		element: <VerifySuccess />,
	},
	{
		path: "/verify/error-invalid",
		element: <VerifyFailedInvalid />,
	},
	{
		path: "/verify/error-activated",
		element: <VerifyFailedActivated />,
	},
	{
		path: "/reset-password-email",
		element: <RequestResetPassword />,
	},
	{
		path: "/reset-password/:email/:reset_password_token",
		element: <ResetPassword />,
	},
	{
		path: "/laundry/:idlaundry",
		element: <LaundryDetail />,
	},
	{
		path: "/googleoauthsuccess",
		element: <GoogleOauthRedirect />,
	},
	{
		path: "/privacy-policy",
		element: <PrivacyPolicy />,
	},
	{
		path: "/voucher-gacha/snk",
		element: <SnkVoucherGacha />,
	},
	{
		path: "/map-example",
		element: <MapExample />,
	},

	{ path: "/order", element: withAuth(<Order />) },
	{ path: "/order/:orderId", element: withAuth(<OrderDetail />) },
	{ path: "/profile", element: withAuth(<Profile />) },
	{
		path: "/laundry/:idlaundry/pesan/:idpaket",
		element: withAuth(<OrderForm />),
	},

	{
		path: "*",
		element: <NotFound />,
	},
];

export default Routess;
