import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    telephone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...profile });

  const handleLogout = (e) => {
    e.preventDefault();

    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken) {
      axios
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer/logout`, {
          refresh_token: refreshToken,
        })
        .then((response) => {
          setError(null);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          delete axios.defaults.headers.common["Authorization"];
          setIsLoggedIn(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("Logout gagal:", error);
          setError("Gagal logout");
        });
    } else {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
      navigate("/")
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setProfile(res.data.data);
          setEditProfile(res.data.data);
          setEmail(res.data.data.email);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`,
          {
            name: editProfile.name,
            telephone: editProfile.telephone,
            address: editProfile.address,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setProfile((prevProfile) => {
          const updatedProfile = { ...prevProfile, ...editProfile };
          return updatedProfile;
        });

        setEditProfile({ ...editProfile });
        setIsEditing(false);
        console.log("Profile updated:", editProfile);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="h-screen max-w-lg mx-auto p-6 bg-white rounded-lg ">
      <a href="/">
        <img src="Images/backbiru.png" className="fixed top-8 left-5"></img>
      </a>
      <div className="flex justify-between flex-col space-y-6 items-center mb-6">
        <h2 className="font-quick text-2xl font-semibold">PROFILE</h2>
        <img src="Images/profile.png" className="w-[8em]"></img>
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
            <p className="font-quick mt-1 text-gray-900">{email}</p>
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
  );
};

export default ProfilePage;
