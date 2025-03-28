import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, checkAuth } from "../../redux/auth.slicer";

import Cookies from "js-cookie";
import authController from "../../controller/auth.controller";
import customerController from "../../controller/customer.controller";
import customerServices from "../../services/customer.services";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputReferral, setInputReferral] = useState(false);
  const { profileData, refreshToken, accessToken } = useSelector((state) => state.auth);

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
    dispatch(checkAuth());

    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 1800000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleInputReferral = () => {
    setInputReferral(!inputReferral);
  };

  const handleLogout = async () => {
    if (refreshToken) {
      await authController.handleLogout(refreshToken, dispatch, navigate, setError);
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setLogout());
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleChangeReferral = (e) => {
    const { name, value } = e.target;
    setReferralCode({
      [name]: value,
    });
  };

  const handleSubmitReferral = async (e) => {
    e.preventDefault();

    if (accessToken) {
      await customerServices.postReferral(accessToken, referralCode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accessToken) {
      await customerController.handleProfile(editProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-row items-center justify-center">
      <img src="/Images/woman.png" alt="" className="hidden h-screen lg:block lg:w-[40%] object-fit " />
      <div className="h-screen p-6 bg-white rounded-lg md:justify-center md:mt-0 md:mx-0 md:w-[60%]">
        <a href="/">
          <img alt="backbiru" src="/Images/backbiru.png" className="fixed top-8 left-5 lg:relative "></img>
        </a>
        <div className="flex justify-between flex-col space-y-6 items-center mb-6">
          <h2 className="font-quick text-2xl font-semibold">PROFILE</h2>
          <img alt="profile" src="Images/profile.png" className="w-[8em]"></img>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 bg-white  font-quick hover:underline">
            Change profile
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="font-bold block font-quick text-sm text-gray-700">Name</label>
              {isEditing ? (
                <input type="text" name="name" value={editProfile.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              ) : (
                <p className="mt-1 text-gray-900 font-quick">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="font-quick block text-sm font-bold text-gray-700">E-mail</label>
              <p className="font-quick mt-1 text-gray-900">{profileData.data.email}</p>
            </div>

            <div>
              <label className="font-quick block text-sm font-bold text-gray-700">Phone</label>
              {isEditing ? (
                <input type="text" name="telephone" value={editProfile.telephone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              ) : (
                <p className="font-quick mt-1 text-gray-900">{profile.telephone}</p>
              )}
            </div>

            <div>
              <label className="font-quick block text-sm font-bold text-gray-700">Address</label>
              {isEditing ? (
                <input type="text" name="address" value={editProfile.address} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              ) : (
                <p className="font-quick mt-1 text-gray-900">{profile.address}</p>
              )}
            </div>

            <div>
              <label className="font-quick block text-sm font-bold text-gray-700">Kode Referal</label>
              {profileData.data.referral_code ? (
                <p className="font-quick mt-1 text-gray-900">{profileData.data.referral_code}</p>
              ) : inputReferral ? (
                <div>
                  <button onClick={handleSubmitReferral} className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                    Kirim
                  </button>
                  <button onClick={handleInputReferral} className="mt-2 ml-3  px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                    Batal
                  </button>
                  <input type="text" name="referral_code" value={referralCode.referral_code} onChange={handleChangeReferral}  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
              ) : (
                <button onClick={handleInputReferral} className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                  Tambah Kode Referral
                </button>
              )}
            </div>

            <div>
              <label className="font-quick block text-sm font-bold text-gray-700">Jumlah Pemakai Kode Referal : {profileData.data.referral_code_used} </label>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-4">
                <button type="submit" className="font-quick px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
        {error && (
          <p className="error-message text-center" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="flex flex-col items center justify-center">
          <button
            onClick={handleLogout}
            className="self-center mt-8 shadow-md font-sans w-[100px]  md:w-[130px] lg:w-[160px]  bg-red-500 text-white font-semibold px-1 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Log Out
          </button>
          <footer className="font-quick mt-[4em] text-center text-sm text-gray-500">HIGHLY PROFESSIONAL CLEANING</footer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
