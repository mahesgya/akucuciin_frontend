import Swal from "sweetalert2";
import CustomerServices from "../../services/customer.services";
import { successSwal, errorSwal } from "../../utils/alert.utils";
import "../../style/SectionHome.css";

const RatingSwal = (accessToken, orderId) => {
  let currentRating = 0;

  const chipOptions = ["Waktu penjemputan", "Waktu pengantaran", "Website", "Layanan laundry", "Kebersihan barang"];

  Swal.fire({
    title: "Berikan rating yuk!",
    html: `
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2 font-['Montserrat']">(1 mengecewakan, 5 mantap!)</p>
        <div class="flex justify-center space-x-1">
          ${Array(5)
            .fill(0)
            .map(
              (_, i) => `
            <svg class="star w-10 h-10 cursor-pointer ${i === 0 ? "text-yellow-400" : "text-gray-300"}" 
              data-rating="${i + 1}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2 font-['Montserrat']">Pilih yang sesuai:</p>
        <div class="flex flex-wrap justify-center gap-2 mb-3">
          ${chipOptions
            .map(
              (chip, index) => `
            <div class="chip cursor-pointer py-1 px-3 rounded-xl border-2 border-gray-300 text-black text-sm hover:bg-gray-200" data-selected="false" data-chip-index="${index}">
              ${chip}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <textarea id="rating-comment" class="w-full p-3 h-28 border-2 border-gray-300 rounded-lg focus:outline-none resize-none" placeholder="tambahkan komentar"></textarea>
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
    didOpen: () => {
      const container = Swal.getContainer();
      const isDark = document.documentElement.classList.contains("dark");
      container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");

      currentRating = 1;

      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => {
        star.addEventListener("click", function () {
          const rating = parseInt(this.getAttribute("data-rating"));
          currentRating = rating;

          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < rating);
            s.classList.toggle("text-gray-300", index >= rating);
          });
        });

        star.addEventListener("mouseover", function () {
          const rating = parseInt(this.getAttribute("data-rating"));

          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < rating);
            s.classList.toggle("text-gray-300", index >= rating);
          });
        });

        star.addEventListener("mouseout", function () {
          // Reset to current rating on mouseout
          stars.forEach((s, index) => {
            s.classList.toggle("text-yellow-400", index < currentRating);
            s.classList.toggle("text-gray-300", index >= currentRating);
          });
        });
      });
      const chips = document.querySelectorAll(".chip");
      chips.forEach((chip) => {
        chip.addEventListener("click", function () {
          const isSelected = this.getAttribute("data-selected") === "true";

          if (isSelected) {
            this.setAttribute("data-selected", "false");
            this.classList.remove("bg-blue-100", "border-blue-500", "text-blue-700");
            this.classList.add("border-gray-300", "text-gray-700");
          } else {
            this.setAttribute("data-selected", "true");
            this.classList.remove("border-gray-300");
            this.classList.add("bg-blue-100", "border-blue-500");
          }
        });
      });
    },
    preConfirm: () => {
      if (currentRating === 0) {
        Swal.showValidationMessage("Mohon berikan rating bintang");
        return false;
      }

      const selectedChips = [];
      document.querySelectorAll(".chip[data-selected='true']").forEach((chip) => {
        const chipIndex = parseInt(chip.getAttribute("data-chip-index"));
        selectedChips.push(chipOptions[chipIndex]);
      });

      const comment = document.getElementById("rating-comment").value;

      let finalComment = "";
      if (selectedChips.length > 0) {
        finalComment = selectedChips.join(", ");
        if (comment.trim()) {
          finalComment += ", " + comment.trim();
        }
      } else {
        finalComment = comment.trim();
      }

      return { rating: currentRating, comment: finalComment };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { rating, comment } = result.value;

      Swal.fire({
        title: "Mengirim review...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await CustomerServices.postReview(accessToken, orderId, rating, comment);
        successSwal("Ulasan berhasil dikirim").then(() => {
          window.location.reload();
        });
      } catch (error) {
        errorSwal(error.message || "Terjadi kesalahan, silakan coba lagi");
      }
    }
  });
};

export default RatingSwal;
