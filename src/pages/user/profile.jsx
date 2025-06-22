import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { setLogout, setLoading } from "../../redux/auth.slicer";
import customerServices from "../../services/customer.services";
import CustomerServices from "../../services/customer.services";

import transformPhoneNumber from "../../utils/phone.number.utils";
import handleChange from "../../utils/handle.change.utils";
import LoadingUtils from "../../utils/loading.utils";
import AuthServices from "../../services/auth.services";

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

  useEffect(() => {
    if (!accessToken) return;
    const getProfileUser = async () => {
      await CustomerServices.getProfile(accessToken, dispatch);
    };

    getProfileUser();
  }, [accessToken, dispatch]);

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editProfile.telephone = transformPhoneNumber(editProfile.telephone);

    if (accessToken) {
      await CustomerServices.changeProfile(editProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing);
    }
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center bg-[#F4F5FF]">
      <div className="hidden h-screen bg-[#687eff] md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px]">
        <a href="/">
          <img
            alt="backwhite"
            src="/Images/backwhite.webp"
            className="absolute top-8 left-5"
          ></img>
        </a>
        <div className="text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">
          Welcome Back!
        </div>
        <img
          src="/Images/mockup_hp.webp"
          alt=""
          className="hidden h-[80%] w-full lg:block object-cover"
        />
      </div>
      <div className="h-full flex items-center flex-col p-6 rounded-lg md:justify-center md:mt-0 md:mx-0 md:w-[70%] lg:w-[50%]">
        <a href="/">
          <img
            alt="backbiru"
            src="/Images/backbiru.png"
            className="fixed top-8 left-5 lg:relative lg:hidden"
          ></img>
        </a>
        <div className="flex justify-between flex-col space-y-6 items-center mb-6">
          <h2 className="font-['Montserrat'] text-2xl font-semibold">
            {profile.name}
          </h2>
        </div>

        <div className="bg-[#F4F5FF]">
          <form
            onSubmit={handleSubmit}
            className="w-max max-w-lg bg-white rounded-lg shadow-md"
          >
            <div className="space-y-4 border border-gray-300 p-6 rounded-lg shadow-md">
              <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
                <div className="flex items-center gap-4 w-full">
                  <img
                    src="/Images/email.webp"
                    alt="email"
                    className="w-10 h-10"
                  />
                  <div>
                    <label className="font-['Montserrat'] block text-md font-bold text-gray-700">
                      Email
                    </label>
                    <p className="font-['Montserrat'] mt-1 text-gray-900">
                      {profileData.data.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
                <div className="flex items-center gap-4 w-full">
                  <img
                    src="/Images/telephone.webp"
                    alt="telephone"
                    className="w-10 h-10"
                  />
                  <div>
                    <label className="font-['Montserrat'] block text-md font-bold text-gray-700">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="telephone"
                        value={editProfile.telephone}
                        onChange={handleChangeProfile}
                        className="mt-1 w-[400px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-['Montserrat'] mt-1 text-gray-900">
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
                <div className="flex items-center gap-4 w-full">
                  <img
                    src="/Images/address.webp"
                    alt="address"
                    className="w-10"
                  />
                  <div>
                    <label className="font-['Montserrat'] block text-md font-bold text-gray-700">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editProfile.address}
                        onChange={handleChangeProfile}
                        className="mt-1 w-[400px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-['Montserrat'] mt-1 text-gray-900">
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

          {}

          <div className="mt-6 space-y-4 w-full">
            <div>
              {profileData.data.referral_code ? (
                <div className="flex flex-col bg-white p-4 space-y-4 rounded-lg shadow-md">
                  <div className="flex  w-full items-center border-b border-gray-300 pb-4">
                    <img
                      src="/Images/kodeReferralTag.webp"
                      alt="kode referral"
                      className="w-10 h-10 mr-4"
                    />
                    <div>
                      <p className="font-['Montserrat'] block text-md font-bold text-gray-700">
                        Kode Referral
                      </p>
                      <p className="font-['Montserrat'] mt-1 text-gray-900">
                        {profileData.data.referral_code}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-full">
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src="/Images/kodeReferralGroup.webp"
                        alt="pemakai kode referral"
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="font-['Montserrat'] block text-sm font-bold text-gray-700">
                          Jumlah Pemakai Kode Referral{" "}
                        </p>
                        <p>{profileData.data.referral_code_success_count}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-500">Ajak {profileData.data.referral_code_until_next_reward} orang lagi untuk mendapatkan voucher</p>
                </div>
              ) : inputReferral ? (
                <div className="flex flex-col items-center bg-white p-4 space-y-4 rounded-lg shadow-md">
                  <p className="font-['Montserrat'] block text-lg pb-4 font-bold text-gray-700">
                    Buat Kode Referral
                  </p>
                  <input
                    type="text"
                    name="referral_code"
                    placeholder="Masukkan Kode Referral"
                    value={referralCode.referral_code}
                    onChange={handleChangeReferral}
                    className="mt-1 block w-[80%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></input>

                  <p className="text-blue-500">
                    Pastikan sudah benar karena tidak bisa diganti lagi
                  </p>

                  <div className="flex justify-around w-[80%]">
                    <button
                      onClick={handleSubmitReferral}
                      className="w-[40%] mt-2 px-4 py-2 bg-blue-500 text-white border font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      Kirim
                    </button>

                    <div className="w-[40%] mt-2 ml-3 px-4 py-2 border border-blue-500 rounded-lg">
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
                <button
                  onClick={handleInputReferral}
                  className="mt-2 px-4 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  Bikin Kode Referral
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items center justify-center w-full">
            <button
              onClick={handleLogout}
              className="mt-8 py-3 shadow-md font-sans w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
