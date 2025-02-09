import React from "react";
import App from "./App";

import AboutUsHP from "./pages/mobile_pages/AboutUsHP";
import OurServicesHP from "./pages/mobile_pages/ServicesHP";

import LoginPage from "./components/auth_components/loginPage";
import RegisterPage from "./components/auth_components/registerPage";
import ResetPassEmailPage from "./components/auth_components/resetPassEmailPage";
import ResetPassPage from "./components/auth_components/resetPassPage";

import FormPemesanan from "./components/form_components/formPesan";

import VerifyFailed from "./components/verify_components/verifyFailed";
import VerifyFailedInvalid from "./components/verify_components/verifyFailedInvalid";
import VerifyFailedActivated from "./components/verify_components/verifyFailedActivated";
import VerifySuccess from "./components/verify_components/verifySuccess";

import ProfilePage from "./pages/desktop_pages/ProfilePage";

import LaundryCity from "./components/laundry_components/laundryCity";
import LaundryListCity from "./components/laundry_components/laundryListCity";
import LaundryListId from "./components/laundry_components/laundryId";

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
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    element: <ResetPassEmailPage />,
  },
  {
    path: "/reset-password/:email/:reset_password_token",
    element: <ResetPassPage />,
  },
  {
    path: "/me",
    element: <ProfilePage />,
  },
  {
    path: "/laundry",
    element: <LaundryCity />,
  },
  {
    path: "/laundry/:city",
    element: <LaundryListCity />,
  },
  {
    path: "/laundry/:city/:idlaundry",
    element: <LaundryListId />,
  },
  {
    path: "/laundry/:city/:idlaundry/pesan/:idpaket",
    element: <FormPemesanan />,
  },
];

export default Routess;
