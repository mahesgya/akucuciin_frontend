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

import { Sheet } from 'react-modal-sheet'
import useIsMobileScreen from "../../utils/isMobileScreen.utils";
import Swal from "sweetalert2";
import { successSwal, errorSwal } from "../../utils/alert.utils";

const EditProfileSwal = (accessToken, editProfile, dispatch, setProfile, setEditProfile, setIsEditing, getProfileUser) => {
  Swal.fire({
    // title: "Edit Profile",
    html: `
      <div class="space-y-4">
        <div class="text-left">
          <label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Nama</label>
          <input 
            id="profile-name" 
            type="text" 
            value="${editProfile.name || ''}" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
            placeholder="Masukkan nama"
          />
        </div>
        
        <div class="text-left">
          <label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Nomor Telepon</label>
          <div class="flex items-center">
            <span class="px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md text-gray-700">+62</span>
            <input 
              id="profile-telephone" 
              type="text" 
              value="${editProfile.telephone || ''}" 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
              placeholder="Masukkan nomor telepon"
            />
          </div>
        </div>
        
        <div class="text-left">
          <label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Alamat</label>
          <textarea 
            id="profile-address" 
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] resize-none"
            placeholder="Masukkan alamat lengkap"
          >${editProfile.address || ''}</textarea>
        </div>

        <div class="w-full border border-neutral-200"><div/>

      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    customClass: {
      confirmButton: "btn-confirm",
      cancelButton: "btn-cancel",
    },
    backdrop: true,
    allowOutsideClick: false,
    preConfirm: () => {
      const name = document.getElementById("profile-name").value.trim();
      const telephone = document.getElementById("profile-telephone").value.trim();
      const address = document.getElementById("profile-address").value.trim();

      if (!name) {
        Swal.showValidationMessage("Nama tidak boleh kosong");
        return false;
      }
      if (!telephone) {
        Swal.showValidationMessage("Nomor telepon tidak boleh kosong");
        return false;
      }
      if (!address) {
        Swal.showValidationMessage("Alamat tidak boleh kosong");
        return false;
      }

      return { name, telephone, address };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { name, telephone, address } = result.value;

      // Show loading state
      Swal.fire({
        title: "Menyimpan perubahan...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Prepare the edit profile data
      const updatedProfile = {
        name,
        telephone: transformPhoneNumber(telephone),
        address
      };

      // Submit the profile changes
      try {
        await CustomerServices.changeProfile(
          updatedProfile, 
          accessToken, 
          dispatch, 
          setProfile, 
          setEditProfile, 
          setIsEditing
        );
        await getProfileUser();
        successSwal("Profile berhasil diperbarui");
      } catch (error) {
        errorSwal(error.message || "Terjadi kesalahan, silakan coba lagi");
      }
    }
  });
};

const EditProfileSheet = ({ accessToken, editProfile, dispatch, setProfile, setEditProfile, setIsEditing, getProfileUser, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    name: editProfile.name || '',
    telephone: editProfile.telephone || '',
    address: editProfile.address || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Nomor telepon tidak boleh kosong";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Alamat tidak boleh kosong";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare the edit profile data
    const updatedProfile = {
      name: formData.name,
      telephone: transformPhoneNumber(formData.telephone),
      address: formData.address
    };

    // Submit the profile changes
    try {
      await CustomerServices.changeProfile(
        updatedProfile, 
        accessToken, 
        dispatch, 
        setProfile, 
        setEditProfile, 
        setIsEditing
      );
      await getProfileUser();
      successSwal("Profile berhasil diperbarui");
      handleClose();
    } catch (error) {
      errorSwal(error.message || "Terjadi kesalahan, silakan coba lagi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Sheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="w-full flex justify-center">
            <div className="w-[30%] border-4 rounded-full border-neutral-200 mt-4"></div>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <div className="p-4 space-y-4">
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">
                Nama
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nama"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.name}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">
                Nomor Telepon
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md text-gray-700">
                  +62
                </span>
                <input
                  type="text"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nomor telepon"
                  disabled={isSubmitting}
                />
              </div>
              {errors.telephone && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.telephone}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">
                Alamat
              </label>
              <textarea
                rows="4"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] resize-none ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan alamat lengkap"
                disabled={isSubmitting}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.address}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-neutral-400">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-['Montserrat'] disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-['Montserrat'] disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

const Profile = () => {
  const isMobile = useIsMobileScreen(768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, refreshToken, accessToken, isLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [inputReferral, setInputReferral] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
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

  const handleEditProfile = () => {
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      EditProfileSwal(
        accessToken,
        editProfile,
        dispatch,
        setProfile,
        setEditProfile,
        setIsEditing,
        getProfileUser
      );
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

  const handleChangeReferral = handleChange(setReferralCode);

  const handleSubmitReferral = async (e) => {
    e.preventDefault();

    if (accessToken) {
      await customerServices.postReferral(accessToken, referralCode);
      await getProfileUser();
    }
  };

  if (isLoading) {
    return <LoadingUtils />;
  }

  return (
    <div className="min-h-screen w-screen flex lg:flex-row flex-col items-center justify-center bg-[#F4F5FF]">
      {toastContainer()}

      {/* Conditional rendering of edit profile sheet for mobile */}
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

      <div className="h-screen flex items-center flex-col p-6 rounded-lg md:justify-center md:mt-0 md:mx-0 md:w-[70%] lg:w-[50%]">
        <div className="flex justify-between flex-col space-y-6 items-center mb-6 w-full pt-10">
          <h2 className="font-['Montserrat'] z-10 lg:text-black text-white font-semibold text-center text-3xl">
            {profile.name}
          </h2>
        </div>

        <div className="z-10 mt-4">
          <form className="w-full lg:max-w-lg bg-white rounded-lg shadow-custom-note">
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
                    <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900">
                      {profile.telephone}
                    </p>
                  </div>
                </div>
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
                    <p className="font-['Montserrat'] mt-1 lg:text-md text-sm text-gray-900">
                      {profile.address}
                    </p>
                  </div>
                </div>
              </div>

              {!isEditing && (
                <div className="w-full flex justify-end mt-4 border-2 border-[#687EFF] rounded-full">
                  <button
                    type="button"
                    onClick={handleEditProfile}
                    className="w-full font-['Montserrat'] px-6 py-2 text-[#687EFF] font-semibold rounded-full bg-white hover:bg-gray-100 transition duration-200"
                  >
                    Edit
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
