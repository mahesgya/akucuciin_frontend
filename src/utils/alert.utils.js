import Swal from "sweetalert2";

const errorSwal = (message) => {
    return Swal.fire({
        icon: "error",
        title: "Gagal",
        text: message || "Terjadi kesalahan silahkan coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
    })
}

const successSwal = (message) => {
    return Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        showCloseButton: true,
    })
}

export {errorSwal, successSwal}