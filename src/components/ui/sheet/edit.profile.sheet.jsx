import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import CustomerServices from "../../../services/customer.services";
import transformPhoneNumber from "../../../utils/phone.number.utils";

const EditProfileSheet = ({ accessToken, editProfile, dispatch, setProfile, setEditProfile, setIsEditing, getProfileUser, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    name: editProfile.name || "",
    telephone: editProfile.telephone || "",
    address: editProfile.address || "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
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
    const updatedProfile = {
      name: formData.name,
      telephone: transformPhoneNumber(formData.telephone),
      address: formData.address,
    };

    try {
      await CustomerServices.changeProfile(updatedProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing);
    } finally {
      getProfileUser();
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Sheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container className="!bg-white dark:!bg-dark-card !text-gray-800 dark:!text-dark-text">
        <Sheet.Header className="!bg-white dark:!bg-dark-card">
          <div className="w-full flex justify-center">
            <div className="w-[30%] border-4 rounded-full border-neutral-200 dark:border-neutral-700 mt-4"></div>
          </div>
        </Sheet.Header>

        <Sheet.Content>
          <div className="p-4 space-y-4 text-gray-800 dark:text-dark-text bg-transparent">
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 dark:text-dark-text mb-2 font-['Montserrat']">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:border-neutral-700 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.name}</p>}
            </div>

            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 dark:text-dark-text mb-2 font-['Montserrat']">Nomor Telepon</label>
              <div className="flex items-center">
                <span className="px-3 py-2 border border-r-0 border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-dark-card-darker rounded-l-md text-gray-700 dark:text-dark-text">+62</span>
                <input
                  type="text"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange("telephone", e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:border-neutral-700 ${
                    errors.telephone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan nomor telepon"
                  disabled={isSubmitting}
                />
              </div>
              {errors.telephone && <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.telephone}</p>}
            </div>

            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 dark:text-dark-text mb-2 font-['Montserrat']">Alamat</label>
              <textarea
                rows="4"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] resize-none bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:border-neutral-700 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan alamat lengkap"
                disabled={isSubmitting}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.address}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-neutral-400 dark:border-neutral-700">
              <div className="w-full">
                <button onClick={handleSubmit} disabled={isSubmitting} className="w-full flex-1 px-4 py-2 bg-blue-primary font-semibold text-white rounded-xl hover:bg-primary/90 font-['Montserrat'] disabled:opacity-50">
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
              <div className="w-full border-2 border-[#687EFF] rounded-xl">
                <button onClick={handleClose} disabled={isSubmitting} className="w-full flex-1 px-4 py-2 font-semibold border border-blue-600 bg-white dark:bg-dark-card text-[#687EFF] rounded-2xl font-['Montserrat'] disabled:opacity-50">
                  Batal
                </button>
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default EditProfileSheet;
