import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { setLoading, setLogout } from "../../redux/auth.slicer";
import CustomerServices from "../../services/customer.services";

import AuthServices from "../../services/auth.services";
import LoadingUtils from "../../utils/loading.utils";
import { toastContainer } from "../../utils/toast.utils";

import useIsMobileScreen from "../../utils/isMobileScreen.utils";
import Sidebar from "../../components/layout/sidebar/sidebar";

import KodeRefferralSheet from "../../components/ui/sheet/referral.profile.sheet";
import EditProfileSheet from "../../components/ui/sheet/edit.profile.sheet";
import EditProfileSwal from "../../components/modal/profile.edit.swal";
import KodeRefferralSwal from "../../components/modal/referral.profile.swal";

const Profile = () => {
  const isMobile = useIsMobileScreen(768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, refreshToken, accessToken, isLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showReferralSheet, setShowReferralSheet] = useState(false);
  const [profile, setProfile] = useState({
    name: profileData.data.name,
    telephone: profileData.data.telephone,
    address: profileData.data.address,
  });
  const [editProfile, setEditProfile] = useState({ ...profile });

  const getProfileUser = useCallback(async () => {
    await CustomerServices.getProfile(accessToken, dispatch);
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken) return;
    getProfileUser();
  }, [accessToken, dispatch, getProfileUser]);

  const handleInputReferral = () => {
    if (isMobile) {
      setShowReferralSheet(true);
    } else {
      KodeRefferralSwal(accessToken, getProfileUser);
    }
  };

  const handleCloseReferralSheet = () => {
    setShowReferralSheet(false);
  };

  const handleEditProfile = () => {
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      EditProfileSwal(accessToken, editProfile, dispatch, setProfile, setEditProfile, setIsEditing, getProfileUser);
    }
  };

  const handleCloseEditSheet = () => {
    setShowEditSheet(false);
  };

  const handleLogout = async () => {
    if (refreshToken) {
      await AuthServices.logoutUser(refreshToken, dispatch, setLoading, navigate);
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setLogout());
    }
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-screen w-screen flex lg:flex-row flex-col items-center justify-center bg-gray-100 dark:bg-dark-bg">
      {toastContainer()}
      <Sidebar />
      {showEditSheet && (
        <EditProfileSheet
          accessToken={accessToken}
          editProfile={editProfile}
          dispatch={dispatch}
          setProfile={setProfile}
          setEditProfile={setEditProfile}
          setIsEditing={setIsEditing}
          getProfileUser={getProfileUser}
          onClose={handleCloseEditSheet}
          isOpen={showEditSheet}
        />
      )}

      {showReferralSheet && <KodeRefferralSheet accessToken={accessToken} getProfileUser={getProfileUser} onClose={handleCloseReferralSheet} isOpen={showReferralSheet} />}

      <div className="min-h-screen flex items-center flex-col px-4 pb-36 pt-6 md:pl-24 md:py-6 md:pr-6 lg:p-6 rounded-xl md:justify-center md:mt-0 md:mx-0 md:w-[70%] lg:w-[50%] dark:text-dark-text bg-gray-100 dark:bg-dark-bg">
        <div className="flex justify-between flex-col space-y-6 items-center mb-4 w-full pt-6">
          <h2 className="font-['Montserrat'] z-10 lg:text-black text-white dark:text-dark-text font-semibold text-center text-3xl">{profile.name}</h2>
        </div>

        <div className="z-10 mt-4">
          <form className="w-full lg:max-w-lg bg-white dark:bg-dark-card rounded-xl shadow-custom-note">
            <div className="space-y-4 p-6 rounded-xl shadow-custom-note">
              <div className="flex gap-4 items-center border-b border-gray-300 dark:border-neutral-700 pb-4">
                <div className="flex items-center gap-6 w-full">
                  <img src="/Images/email.webp" alt="email" className="w-8 h-8" />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700 dark:text-dark-text">Email</label>
                    <p className="font-['Montserrat'] lg:text-md text-sm mt-1 text-gray-900 dark:text-dark-text">{profileData.data.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center border-b border-gray-300 dark:border-neutral-700 pb-4">
                <div className="flex items-center gap-6 w-full">
                  <img src="/Images/telephone.webp" alt="telephone" className="w-8 h-8" />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700 dark:text-dark-text">Phone</label>
                    <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900 dark:text-dark-text">{profile.telephone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-6 w-full">
                  <img src="/Images/address.webp" alt="address" className="w-8" />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700 dark:text-dark-text">Address</label>
                    <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900 dark:text-dark-text">{profile.address}</p>
                  </div>
                </div>
              </div>

              {!isEditing && (
                <div className="w-full flex justify-end mt-4 border-2 border-[#687EFF] rounded-2xl">
                  <button
                    type="button"
                    onClick={handleEditProfile}
                    className="w-full font-['Montserrat'] px-6 py-2 text-[#687EFF] font-semibold rounded-2xl bg-white hover:bg-gray-100 dark:bg-dark-card dark:hover:bg-dark-card-darker transition duration-200"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-4 w-full lg:max-w-lg rounded-xl">
            <div>
              {profileData.data.referral_code ? (
                <div className="flex flex-col w-full bg-white dark:bg-dark-card p-4 space-y-4 rounded-xl shadow-custom-note">
                  <div className="flex  w-full items-center border-b border-gray-300 dark:border-neutral-700 pb-4">
                    <img src="/Images/kodeReferralTag.webp" alt="kode referral" className="w-8 h-8 mr-4" />
                    <div>
                      <p className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700 dark:text-dark-text">Kode Referral</p>
                      <p className="font-['Montserrat'] lg:text-md text-sm mt-1 text-gray-900 dark:text-dark-text">{profileData.data.referral_code}</p>
                    </div>
                  </div>

                  <div className="flex items-center w-full">
                    <div className="flex items-center gap-4 w-full">
                      <img src="/Images/kodeReferralGroup.webp" alt="pemakai kode referral" className="w-8 h-8" />
                      <div>
                        <p className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700 dark:text-dark-text">Jumlah Pemakai Kode Referral</p>
                        <p className="dark:text-dark-text">{profileData.data.referral_code_success_count}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-500 lg:text-md text-sm">Ajak {profileData.data.referral_code_until_next_reward} orang lagi untuk mendapatkan voucher</p>
                </div>
              ) : (
                <div className="flex flex-col items center justify-center w-full">
                  <button onClick={handleInputReferral} className="mt-2 px-4 py-2 w-[100%] mx-auto bg-blue-primary text-white lg:text-lg text-md font-semibold rounded-2xl hover:brightness-110 transition shadow-custom-note">
                    Bikin Kode Referral
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full lg:max-w-lg">
            <button
              onClick={handleLogout}
              className="mt-6 py-2 shadow-custom-note font-quick w-[100%] mx-auto bg-red-warning hover:brightness-110 lg:text-lg text-md text-white font-semibold p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
