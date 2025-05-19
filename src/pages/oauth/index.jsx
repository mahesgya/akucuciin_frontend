import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { checkAuth, setLogin } from "../../redux/auth.slicer";

const GoogleOauthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storeTokens = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      console.log(accessToken);
      console.log(refreshToken);

      if (accessToken && refreshToken) {
        Cookies.set("accessToken", accessToken, {
          secure: false,
          sameSite: "none",
          expires: 1,
        });
        Cookies.set("refreshToken", refreshToken, { secure: false, sameSite: "none", expires: 7 });

        await new Promise((r) => setTimeout(r, 300));
        dispatch(setLogin({ accessToken, refreshToken }));
        await dispatch(checkAuth());

        navigate("/");
      }
    };

    storeTokens();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default GoogleOauthRedirect;
