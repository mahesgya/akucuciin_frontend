import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import transformPhoneNumber from "../../utils/phone.number.utils";
import "../../style/SectionHome.css";
const EditProfileSwal = (accessToken, editProfile, dispatch, setProfile, setEditProfile, setIsEditing, getProfileUser) => {
  Swal.fire({
    html: `
      <div class="space-y-4">
  <div class="text-left">
    <label class="block text-sm font-bold text-gray-700 dark:text-dark-text mb-2 font-['Montserrat']">Nama</label>
    <input
      id="profile-name"
      type="text"
      value="${editProfile.name || ""}"
      class="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md
             focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']
             bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text
             placeholder:text-gray-400 dark:placeholder:text-gray-400"
      placeholder="Masukkan nama"
    />
  </div>

  <div class="text-left">
    <label class="block text-sm font-bold text-gray-700 dark:text-dark-text mb-2 font-['Montserrat']">Nomor Telepon</label>
    <div class="flex items-center">
      <span class="px-3 py-2 border border-r-0 border-gray-300 dark:border-neutral-700
                   bg-gray-50 dark:bg-dark-card-darker rounded-l-md
                   text-gray-700 dark:text-dark-text">+62</span>
      <input
        id="profile-telephone"
        type="text"
        value="${editProfile.telephone || ""}"
        class="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-r-md
               focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']
               bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text
               placeholder:text-gray-400 dark:placeholder:text-gray-400"
        placeholder="Masukkan nomor telepon"
      />
    </div>
  </div>

  <div class="w-full border border-neutral-200 dark:border-neutral-700"><div/>
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
    didOpen: () => {
      const container = Swal.getContainer();
      const isDark = document.documentElement.classList.contains("dark");
      container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");
    },
    preConfirm: () => {
      const name = document.getElementById("profile-name").value.trim();
      const telephone = document.getElementById("profile-telephone").value.trim();

      if (!name) {
        Swal.showValidationMessage("Nama tidak boleh kosong");
        return false;
      }
      if (!telephone) {
        Swal.showValidationMessage("Nomor telepon tidak boleh kosong");
        return false;
      }

      return { name, telephone };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { name, telephone } = result.value;
      const updatedProfile = {
        name,
        telephone: transformPhoneNumber(telephone),
      };
      try {
        await CustomerServices.changeProfile(updatedProfile, accessToken, dispatch, setProfile, setEditProfile, setIsEditing);
      } finally {
        getProfileUser();
      }
    }
  });
};

export default EditProfileSwal;
