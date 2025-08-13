import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import "../../style/SectionHome.css"

const KodeRefferralSwal = (accessToken, getProfileUser) => {
	Swal.fire({
		title: "Buat Kode Referral",
		html: `
      <div class="space-y-4">
        <div class="text-left">
          <label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Kode Referral</label>
          <input 
            id="referral-code" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#687EFF] font-['Montserrat']"
            placeholder="Masukkan Kode Referral"
          />
        </div>
        
        <div class="text-center">
          <p class="text-[#687EFF] text-sm font-['Montserrat']">
            Pastikan sudah benar karena tidak bisa diganti lagi
          </p>
        </div>
      </div>
    `,
		showCancelButton: true,
		confirmButtonText: "Submit",
		cancelButtonText: "Batal",
		customClass: {
			confirmButton: "btn-confirm",
			cancelButton: "btn-cancel",
		},
		backdrop: true,
		allowOutsideClick: false,
		preConfirm: () => {
			const referralCode = document
				.getElementById("referral-code")
				.value.trim();

			if (!referralCode) {
				Swal.showValidationMessage("Kode referral tidak boleh kosong");
				return false;
			}

			return { referral_code: referralCode };
		},
	}).then(async (result) => {
		if (result.isConfirmed) {
			const { referral_code } = result.value;

			try {
				await CustomerServices.postReferral(accessToken, { referral_code });
			} finally {
				getProfileUser();
			}
		}
	});
};

export default KodeRefferralSwal