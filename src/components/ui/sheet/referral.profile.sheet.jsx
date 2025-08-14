import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import CustomerServices from "../../../services/customer.services";
const KodeRefferralSheet = ({ accessToken, getProfileUser, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    referral_code: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      referral_code: value,
    }));
    if (errors.referral_code) {
      setErrors((prev) => ({
        ...prev,
        referral_code: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.referral_code.trim()) {
      newErrors.referral_code = "Kode referral tidak boleh kosong";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await CustomerServices.postReferral(accessToken, formData);
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
            <div className="w-[30%] border-4 rounded-full border-neutral-200 dark:border-neutral-700 mt-4" />
          </div>
        </Sheet.Header>

        <Sheet.Content className="!bg-white dark:!bg-dark-card">
          <div className="p-4 space-y-4 text-gray-800 dark:text-dark-text">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-700 dark:text-dark-text font-['Montserrat']">Buat Kode Referral</h2>
            </div>

            <div className="text-left">
              <input
                type="text"
                value={formData.referral_code}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#687EFF] font-['Montserrat']
              bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400
              ${errors.referral_code ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-neutral-700"}`}
                placeholder="Masukkan Kode Referral"
                disabled={isSubmitting}
              />
              {errors.referral_code && <p className="text-red-500 text-xs mt-1 font-['Montserrat']">{errors.referral_code}</p>}
            </div>

            <div className="text-center">
              <p className="text-[#687EFF] text-sm font-['Montserrat']">Pastikan sudah benar karena tidak bisa diganti lagi</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-neutral-400 dark:border-neutral-700">
              <div className="w-full">
                <button onClick={handleSubmit} disabled={isSubmitting} className="w-full flex-1 px-4 py-2 font-semibold bg-[#687EFF] text-white rounded-xl hover:brightness-110 font-['Montserrat'] disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div className="w-full border-2 border-[#687EFF] rounded-xl">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-full flex-1 px-4 py-2 border border-blue-600 dark:border-[#687EFF]
                         font-semibold text-[#687EFF] rounded-xl bg-white dark:bg-dark-card
                         hover:bg-gray-50 dark:hover:bg-dark-card-darker font-['Montserrat'] disabled:opacity-50"
                >
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

export default KodeRefferralSheet;
