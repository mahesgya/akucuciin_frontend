import Swal from "sweetalert2";
import customerServices from "../../services/customer.services";
import "../../style/SectionHome.css"

const VoucherReferralSwal = (
	formData,
	setFormData,
	accessToken,
	onValidationResponse
) => {
	Swal.fire({
		title: "Voucher / Referral",
		html: `
			<div class="space-y-4">
				<div class="text-left">
					<label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Kode Referral</label>
					<input 
						id="referral-code" 
						type="text" 
						value="${formData.referral_code || ""}"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
						placeholder="Ex: REF12345"
					/>
				</div>
				
				<div class="text-left">
					<label class="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">Voucher Diskon</label>
					<input 
						id="coupon-code" 
						type="text" 
						value="${formData.coupon_code || ""}"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
						placeholder="Ex: DISKON12"
					/>
				</div>

				<div class="text-center text-[#687EFF] text-sm font-['Montserrat'] font-semibold hover:underline">
					<a href='https://instagram.com/akucuciin.id/' target="blank" >Cek promo lain di instagram/akucuciin.id</a>
				</div>

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
			const referralCode = document
				.getElementById("referral-code")
				.value.trim();
			const couponCode = document.getElementById("coupon-code").value.trim();

			return { referral_code: referralCode, coupon_code: couponCode };
		},
	}).then(async (result) => {
		if (result.isConfirmed) {
			let referralResponse = null;
			let couponResponse = null;

			if (!result.value.referral_code && !result.value.coupon_code) {
				onValidationResponse({
					referralResponse: null,
					couponResponse: null,
					referral_code: "",
					coupon_code: "",
				});
				return;
			}

			if (result.value.referral_code) {
				referralResponse = await customerServices.checkReferralCode(
					accessToken,
					result.value.referral_code
				);
			}

			if (result.value.coupon_code) {
				couponResponse = await customerServices.checkCouponCode(
					accessToken,
					result.value.coupon_code
				);
			}

			if (onValidationResponse) {
				onValidationResponse({
					referralResponse: referralResponse,
					couponResponse: couponResponse,
					referral_code: result.value.referral_code
						? result.value.referral_code
						: "",
					coupon_code: result.value.coupon_code ? result.value.coupon_code : "",
				});
			}
		}
	});
};

export default VoucherReferralSwal