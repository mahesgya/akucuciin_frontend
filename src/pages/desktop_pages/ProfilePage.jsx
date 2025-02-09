import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlicer";
import { useSelector } from "react-redux";
import { checkAuth } from "../../redux/authSlicer";

import Cookies from "js-cookie";
import authController from "../../controller/auth_controller";
import customerController from "../../controller/customer_controller";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, refreshToken, accessToken } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: profileData.data.name,
    telephone: profileData.data.telephone,
    address: profileData.data.address,
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  useEffect(() => {
    dispatch(checkAuth());

    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 1800000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = async () => {
    if (refreshToken) {
      await authController.handleLogout(refreshToken, dispatch, navigate, setError);
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setLogout());
      delete axios.defaults.headers.common["Authorization"];
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
          <img alt="backbiru" src="Images/backbiru.png" className="fixed top-8 left-5 lg:relative "></img>
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

export default ProfilePage;
