import React from "react"
import App from "./App"
import AboutUsHP from "./ComponentsHP/AboutUsHP"
import OurServicesHP from "./ComponentsHP/ServicesHP"
import LoginPage from "./logComponents/loginPage"
import RegisterPage from "./logComponents/registerPage"
import FormPemesanan from "./formComponents/formPesan"
import VerifySuccess from "./verify/verifySuccess"
import VerifyFailed from "./verify/verifyFailed"
import VerifyFailedInvalid from "./verify/verifyFailedInvalid"
import VerifyFailedActivated from "./verify/verifyFailedActivated"
import Verify from "./verify/verify"
import OrderSuccess from "./formComponents/orderSuccess"
import ResetPassEmailPage from "./logComponents/resetPassEmailPage"
import ResetPassPage from "./logComponents/resetPassPage"

const Routess = [
    {
        path:"/",
        element: <App/>,
    },
    {
        path:"/aboutus",
        element: <AboutUsHP/>,
    },
    {
        path:"/services",
        element: <OurServicesHP/>,
    },
    {
        path:"/login",
        element: <LoginPage/>,
    },
    {
        path:"/register",
        element: <RegisterPage/>,
    },
    {
        path:"/verify",
        element: <Verify/>,
    },
    {
        path:"/verify/success",
        element: <VerifySuccess/>,
    },
    {
        path:"/verify/error",
        element: <VerifyFailed/>,
    },
    {
        path:"/verify/error-invalid",
        element: <VerifyFailedInvalid/>,
    },
    {
        path:"/verify/error-activated",
        element: <VerifyFailedActivated/>,
    },
    {
        path:"/form-pemesanan",
        element: <FormPemesanan/>,
    },
    {
        path:"/order-success",
        element: <OrderSuccess/>,
    },
    {
        path:"/reset-email",
        element: <ResetPassEmailPage/>
    },{
        path:"/reset-password",
        element:<ResetPassPage/>
    }
]

export default Routess