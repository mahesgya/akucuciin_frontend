import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import transformPhoneNumber from "../../utils/phone.number.utils";
import "../../style/SectionHome.css"

const EditProfileSwal = (
	accessToken,
	editProfile,
	dispatch,
	setProfile,
	setEditProfile,
	setIsEditing,
	getProfileUser
) => {
	Swal.fire({
		html: `
      <div class="space-y-4">
        <div class="text-left">
          <label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Nama</label>
          <input 
            id="profile-name" 
            type="text" 
            value="${editProfile.name || ""}" 
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
              value="${editProfile.telephone || ""}" 
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
          >${editProfile.address || ""}</textarea>
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
			const telephone = document
				.getElementById("profile-telephone")
				.value.trim();
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
			const updatedProfile = {
				name,
				telephone: transformPhoneNumber(telephone),
				address,
			};
			try {
				await CustomerServices.changeProfile(
					updatedProfile,
					accessToken,
					dispatch,
					setProfile,
					setEditProfile,
					setIsEditing
				);
			} finally {
				getProfileUser();
			}
		}
	});
};

export default EditProfileSwal