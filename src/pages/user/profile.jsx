import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { setLoading, setLogout } from "../../redux/auth.slicer";
import {
  default as customerServices,
  default as CustomerServices,
} from "../../services/customer.services";

import AuthServices from "../../services/auth.services";
import handleChange from "../../utils/handle.change.utils";
import LoadingUtils from "../../utils/loading.utils";
import transformPhoneNumber from "../../utils/phone.number.utils";
import { toastContainer } from "../../utils/toast.utils";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, refreshToken, accessToken, isLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [inputReferral, setInputReferral] = useState(false);
  const [profile, setProfile] = useState({
    name: profileData.data.name,
    telephone: profileData.data.telephone,
    address: profileData.data.address,
  });
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [referralCode, setReferralCode] = useState({
    referral_code: "",
  });
  
  const getProfileUser = useCallback(async () => {
    await CustomerServices.getProfile(accessToken, dispatch);
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken) return;
    getProfileUser();
  }, [accessToken, dispatch, getProfileUser]);

  const handleInputReferral = () => {
    setInputReferral(!inputReferral);
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

  const handleChangeProfile = handleChange(setEditProfile);
  const handleChangeReferral = handleChange(setReferralCode);

  const handleSubmitReferral = async (e) => {
    e.preventDefault();

    if (accessToken) {
      await customerServices.postReferral(accessToken, referralCode);
      await getProfileUser();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editProfile.telephone = transformPhoneNumber(editProfile.telephone);

    if (accessToken) {
      await CustomerServices.changeProfile(editProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing);
      await getProfileUser();
    }
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-screen w-screen flex lg:flex-row flex-col items-center justify-center bg-[#F4F5FF]">
      {toastContainer()}

      {/* for desktop, hidden in mobile screens */}
      <div className="hidden h-[30%] lg:h-screen bg-[#687eff] md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px]">
        <a href="/">
          <img
            alt="backwhite"
            src="/Images/backwhite.webp"
            className="absolute top-8 left-5"
          ></img>
        </a>
        <div className="absolute text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">
          Welcome Back!
        </div>
        <img
          src="/Images/mockup_hp.webp"
          alt=""
          className="hidden h-[80%] w-full lg:block object-cover"
        />
      </div>

      {/* for mobile, hidden in desktop screens */}
      <div className="absolute z-0 top-0 left-0 w-full lg:hidden h-[40%] bg-[#687eff] rounded-b-[30px]">
        <a href="/">
          <img
            alt="backwhite"
            src="/Images/backwhite.webp"
            className="absolute top-3 left-3 w-10"
          ></img>
        </a>
      </div>

      <div className="h-full flex items-center flex-col p-6 rounded-lg md:justify-center md:mt-0 md:mx-0 md:w-[70%] lg:w-[50%]">
        <div className="flex justify-between flex-col space-y-6 items-center mb-6 w-full pt-10">
          <h2 className="font-['Montserrat'] z-10 lg:text-black text-white font-semibold text-center text-3xl">
            {profile.name}
          </h2>
        </div>

        <div className="z-10 mt-4 lg:w-[70%]">
          <form
            onSubmit={handleSubmit}
            className="w-full lg:max-w-lg bg-white rounded-lg shadow-custom-note"
          >
            <div className="space-y-4 p-6 rounded-lg shadow-custom-note">
              <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
                <div className="flex items-center gap-6 w-full">
                  <img
                    src="/Images/email.webp"
                    alt="email"
                    className="w-8 h-8"
                  />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <p className="font-['Montserrat'] lg:text-md text-sm mt-1 text-gray-900">
                      {profileData.data.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
                <div className="flex items-center gap-6 w-full">
                  <img
                    src="/Images/telephone.webp"
                    alt="telephone"
                    className="w-8 h-8"
                  />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700">
                      Phone
                    </label>
                    {isEditing ? (
                      <div className="flex items-center lg:w-full">
                        <p className="mr-2">+62</p>
                        <input
                          type="text"
                          name="telephone"
                          value={editProfile.telephone}
                          onChange={handleChangeProfile}
                          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900">
                        {profile.telephone}
                      </p>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-transparent"
                    type="button"
                  >
                    <img
                      src="/Images/pencilbiru.webp"
                      alt="edit"
                      className="w-8 cursor-pointer"
                    />
                  </button>
                )}
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-6 w-full">
                  <img
                    src="/Images/address.webp"
                    alt="address"
                    className="w-8"
                  />
                  <div>
                    <label className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        type="text"
                        name="address"
                        value={editProfile.address}
                        onChange={handleChangeProfile}
                        className="mt-1 w-full lg:h-[100px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900">
                        {profile.address}
                      </p>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-transparent"
                    type="button"
                  >
                    <img
                      src="/Images/pencilbiru.webp"
                      alt="edit"
                      className="w-8 cursor-pointer"
                    />
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="font-['Montserrat'] px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-4 w-full lg:max-w-lg rounded-lg">
            <div>
              {profileData.data.referral_code ? (
                <div className="flex flex-col w-full bg-white p-4 space-y-4 rounded-lg shadow-custom-note">
                  <div className="flex  w-full items-center border-b border-gray-300 pb-4">
                    <img
                      src="/Images/kodeReferralTag.webp"
                      alt="kode referral"
                      className="w-8 h-8 mr-4"
                    />
                    <div>
                      <p className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700">
                        Kode Referral
                      </p>
                      <p className="font-['Montserrat'] lg:text-md text-sm mt-1 text-gray-900">
                        {profileData.data.referral_code}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-full">
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src="/Images/kodeReferralGroup.webp"
                        alt="pemakai kode referral"
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-['Montserrat'] block lg:text-md text-sm font-bold text-gray-700">
                          Jumlah Pemakai Kode Referral
                        </p>
                        <p>{profileData.data.referral_code_success_count}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-500 lg:text-md text-sm">
                    Ajak {profileData.data.referral_code_until_next_reward}{" "}
                    orang lagi untuk mendapatkan voucher
                  </p>
                </div>
              ) : inputReferral ? (
                <div className="flex flex-col items-center bg-white p-4 space-y-4 rounded-lg shadow-custom-note">
                  <p className="font-['Montserrat'] block text-lg pb-4 font-bold text-gray-700">
                    Buat Kode Referral
                  </p>
                  <input
                    type="text"
                    name="referral_code"
                    placeholder="Masukkan Kode Referral"
                    value={referralCode.referral_code}
                    onChange={handleChangeReferral}
                    className="mt-1 block w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></input>

                  <p className="text-blue-500 lg:text-md text-sm text-justify px-4">
                    Pastikan sudah benar karena tidak bisa diganti lagi
                  </p>

                  <div className="flex justify-around w-[80%]">
                    <button
                      onClick={handleSubmitReferral}
                      className="w-[40%] mt-2 px-4 py-2 bg-blue-500 text-white border font-semibold rounded-lg hover:bg-blue-600 hover:shadow-custom-note transition"
                    >
                      Kirim
                    </button>

                    <div className="w-[40%] mt-2 ml-3 px-4 py-2 border border-blue-500 hover:shadow-custom-note rounded-lg">
                      <button
                        onClick={handleInputReferral}
                        className="w-full text-blue-500 bg-white font-semibold rounded-lg transition"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items center justify-center w-full">
                  <button
                    onClick={handleInputReferral}
                    className="mt-2 px-4 py-2 w-[95%] mx-auto bg-blue-primary text-white lg:text-lg text-md font-semibold rounded-full hover:brightness-110 transition shadow-custom-note"
                  >
                    Bikin Kode Referral
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items center justify-center w-full lg:max-w-lg">
            <button
              onClick={handleLogout}
              className="mt-8 py-2 shadow-custom-note font-sans w-[95%] mx-auto bg-red-warning hover:brightness-110 lg:text-lg text-md text-white font-semibold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
