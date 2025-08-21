import Swal from "sweetalert2";

const OrderConfirmationSwal = (orderDetails) => {
    const formatOrderDetails = (details) => {
        let formattedDetails = '<table style="width: 100%; text-align: left;">';
        for (const [key, value] of Object.entries(details)) {
            if (typeof value !== 'object' && typeof value !== 'function') {
                formattedDetails += `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${key}</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${value}</td>
                    </tr>`;
            }
        }
        formattedDetails += '</table>';
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
