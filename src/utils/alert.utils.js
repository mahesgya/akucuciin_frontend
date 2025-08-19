import Swal from "sweetalert2";

const errorSwal = (message) => {
	return Swal.fire({
		icon: "error",
		title: "Gagal",
		text: message || "Terjadi kesalahan silahkan coba lagi.",
		confirmButtonText: "Coba Lagi",
		confirmButtonColor: "#d33",
		showCloseButton: true,
		didOpen: () => {
			const container = Swal.getContainer();
			const isDark = document.documentElement.classList.contains("dark");
			container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");
		},
	});
};

const successSwal = (message) => {
	const handleDarkMode = (container, isDark) => {
		container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");
		if (isDark) {
			const successCircularLineLeft = document.querySelector(
				".swal2-success-circular-line-left"
			);
			if (successCircularLineLeft) {
				successCircularLineLeft.style.display = "none";
			}
			const successCircularLineRight = document.querySelector(
				".swal2-success-circular-line-right"
			);
			if (successCircularLineRight) {
				successCircularLineRight.style.display = "none";
			}
			const successFix = document.querySelector(".swal2-success-fix");
			if (successFix) {
				successFix.style.display = "none";
			}
		}
	};

	return Swal.fire({
		icon: "success",
		title: "Success",
		text: message,
		confirmButtonText: "Ok",
		confirmButtonColor: "#3085d6",
		showCloseButton: true,
		didOpen: () => {
			const container = Swal.getContainer();
			const isDark = document.documentElement.classList.contains("dark");
			handleDarkMode(container, isDark);
		},
	});
};

export { errorSwal, successSwal };
