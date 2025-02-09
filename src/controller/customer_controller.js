import { setProfileData } from "../redux/authSlicer";
import customerServices from "../services/customer_services";

const customerController = {
  handleProfile: async (editProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing) => {
    try {
      await customerServices.changeProfile(editProfile, accessToken);

      dispatch(setProfileData(editProfile));
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...editProfile,
      }));
      setEditProfile({ ...editProfile });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },
};

export default customerController;
