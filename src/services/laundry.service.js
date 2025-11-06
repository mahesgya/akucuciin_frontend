import axios from "axios";
import { errorSwal } from "../utils/alert.utils";

const LaundryServices = {
  getLaundryLocations: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partners/locations`);

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getByCity: async (city, lat, long) => {
    try {
      let response;
      if(lat && long){
        response = await axios.get(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partners/locations/${city}?user_latitude=${lat}&user_longitude=${long}`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partners/locations/${city}`
        );
      } 

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getById: async (idLaundry) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}`);

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getImages: async (idLaundry) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}/images`);

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getTopPicksPackages: async (idLaundry) => {
     try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}/top-picks`);

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  },
  getLaundryRating: async (idLaundry) => {
     try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/laundry_partner/${idLaundry}/rating`);

      return response.data;
    } catch (error) {
      errorSwal(error.response?.data?.errors);
    }
  }
};

export default LaundryServices;
