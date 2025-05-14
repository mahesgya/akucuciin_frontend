import axios from "axios";

const authHooks = {
  authValidation: async ( setIsLoggedIn, setProfileData, setError, setLoading, accessToken) => {
    if (accessToken) {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setProfileData(response.data);
        setIsLoggedIn(true);

      } catch (error) {
        setIsLoggedIn(false);
        console.log(error)
        setError("Gagal Melakukan Validasi.");
      } finally {
        setLoading(false);
      }
      
    } else {
      setIsLoggedIn(false);
      setError("Access Token Tidak Ada atau Expired.");
    }
  },
};

export default authHooks;
