import App from "./App";

import AboutUsHP from "./pages/about/index.hp";
import OurServicesHP from "./pages/service/index.hp";

import Login from "./pages/login";
import Register from "./pages/register";
import RequestResetPassword from "./pages/req_reset_pass";
import ResetPassword from "./pages/reset_pass";

import OrderForm from "./pages/order_form";

import VerifyFailed from "./components/verify/verify.failed";
import VerifyFailedInvalid from "./components/verify/verfiy.failed.invalid";
import VerifyFailedActivated from "./components/verify/verify.failed.activated";
import VerifySuccess from "./components/verify/verify.success";
import EmailVerificationPage from "./pages/verif_email/verif.email";

import Profile from "./pages/profile";

import LaundryList from "./pages/laundry";
import LaundryDetail from "./pages/laundry_detail";
import Order from "./pages/order";
import GoogleOauthRedirect from "./pages/oauth";
import PrivacyPolicy from "./pages/privacy_policy";

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
    path: "/me",
    element: <Profile />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/laundry",
    element: <LaundryList />,
  },
  {
    path: "/laundry/:idlaundry",
    element: <LaundryDetail />,
  },
  {
    path: "/laundry/:idlaundry/pesan/:idpaket",
    element: <OrderForm />,
  },
  {
    path: "/googleoauthsuccess",
    element: <GoogleOauthRedirect />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
];

export default Routess;
