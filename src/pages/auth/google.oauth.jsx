import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/auth.slicer";
import LoadingUtils from "../../utils/loading.utils";
import CustomerServices from "../../services/customer.services";

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
        Cookies.set("refreshToken", refreshToken, { secure: false, sameSite: "none", expires: 7 });

        await new Promise((r) => setTimeout(r, 300));
        await dispatch(setLogin({ accessToken, refreshToken }));
        await CustomerServices.getProfile(accessToken, dispatch);

        navigate("/");
      }
    };

    storeTokens();
  }, [searchParams, navigate, dispatch]);

  return <LoadingUtils />;
};

export default GoogleOauthRedirect;
