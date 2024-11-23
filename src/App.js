import Header from "./components/header";
import "./App.css";
import HomeHP from "./ComponentsHP/HomeHp";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setError(null);
      } catch {
        try {
          const response = await axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth`, {
            refresh_token: refreshToken,
          });
          const { accessToken, refreshToken } = response.data.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          setError("");
        } catch {
          
        }
      }
    };
    fetchCustomerData();
    const intervalId = setInterval(fetchCustomerData, 9000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="appHP">
        <HomeHP className="homeHP" />
      </div>

      <div className="AppLaptop">
        <Header />     
      </div>
    </div>
  );
};

export default App;
