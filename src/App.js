import Navbar from "./components/layout/navbar/index";
import HomeHP from "./pages/static/home/index.hp";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "./redux/auth.slicer";
import AuthServices from "./services/auth.services";
import Cookies from "js-cookie";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!refreshToken) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setLogout());
      return;
    }

    let hasRefreshed = false;

    const refreshUser = async () => {
      if (hasRefreshed) return;

      hasRefreshed = true;
      await AuthServices.refreshUser(String(refreshToken), dispatch, navigate);
    };

    refreshUser();
  }, []);

  return (
    <div className="App">
      <div className="appHP">
        <HomeHP className="homeHP" />
      </div>

      <div className="AppLaptop">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
