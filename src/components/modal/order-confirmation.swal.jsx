import Swal from "sweetalert2";

const OrderConfirmationSwal = (orderDetails) => {
    const formatOrderDetails = (details) => {
        let formattedDetails = '<div class="w-full text-left grid lg:grid-cols-2 grid-cols-1 gap-4">';
        for (const [key, value] of Object.entries(details)) {
            if (typeof value !== 'object' && typeof value !== 'function') {
                formattedDetails += `
                    <div class="flex flex-col text-base pb-2 border-b border-gray-200 dark:border-gray-700">
                        <div class="p-1"><strong>${key}</strong></div>
                        <div class="p-1">${value}</div>
                    </div>
                    `;
            }
        }
        formattedDetails += '</div>';
        return formattedDetails;
    };

    return Swal.fire({
        title: 'Pesanan sudah betul?',
        html: formatOrderDetails(orderDetails),
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Kembali',
        customClass: {
            confirmButton: 'btn btn-confirm',
            cancelButton: 'btn btn-cancel'
        },
        reverseButtons: true,
        didOpen: () => {
              const container = Swal.getContainer();
              const isDark = document.documentElement.classList.contains("dark");
              container?.setAttribute("data-swal2-theme", isDark ? "dark" : "light");
            },
    })
    .then((result) => {
        return result.isConfirmed;
    });
};

export default OrderConfirmationSwal;
