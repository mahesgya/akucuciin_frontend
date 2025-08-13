import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import customerServices from "../../../services/customer.services";

const VoucherReferralSheet = ({
	formData,
	onClose,
	isOpen,
	accessToken,
	onValidationResponse,
}) => {
	const [localFormData, setLocalFormData] = useState({
		referral_code: formData.referral_code || "",
		coupon_code: formData.coupon_code || "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (field, value) => {
		setLocalFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			let referralResponse = null;
			let couponResponse = null;

			if (!localFormData.referral_code && !localFormData.coupon_code) {
				onValidationResponse({
					referralResponse: null,
					couponResponse: null,
					referral_code: "",
					coupon_code: "",
				});
				return;
			}

			if (localFormData.referral_code) {
				referralResponse = await customerServices.checkReferralCode(
					accessToken,
					localFormData.referral_code
				);
			}

			if (localFormData.coupon_code) {
				couponResponse = await customerServices.checkCouponCode(
					accessToken,
					localFormData.coupon_code
				);
			}

			if (onValidationResponse) {
				onValidationResponse({
					referralResponse: referralResponse,
					couponResponse: couponResponse,
					referral_code: localFormData.referral_code
						? localFormData.referral_code
						: "",
					coupon_code: localFormData.coupon_code
						? localFormData.coupon_code
						: "",
				});
			}

			handleClose();
		} finally {
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
			<Sheet.Container>
				<Sheet.Header>
					<div className="w-full flex justify-center">
						<div className="w-[30%] border-4 rounded-full border-neutral-200 mt-4"></div>
					</div>
				</Sheet.Header>
				<Sheet.Content>
					<div className="p-4 space-y-4">
						<div className="text-center mb-4">
							<h2 className="text-lg font-bold text-gray-700 font-['Montserrat']">
								Voucher / Referral
							</h2>
						</div>

						<div className="text-left">
							<label className="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">
								Kode Referral
							</label>
							<input
								type="text"
								value={localFormData.referral_code}
								onChange={(e) =>
									handleInputChange("referral_code", e.target.value)
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
								placeholder="Ex: REF12345"
								disabled={isSubmitting}
							/>
						</div>

						<div className="text-left">
							<label className="block text-sm font-bold text-gray-700 mb-2 font-['Montserrat']">
								Voucher Diskon
							</label>
							<input
								type="text"
								value={localFormData.coupon_code}
								onChange={(e) =>
									handleInputChange("coupon_code", e.target.value)
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat']"
								placeholder="Ex: DISKON12"
								disabled={isSubmitting}
							/>
						</div>

						<div className="text-center text-[#687EFF] text-sm font-['Montserrat'] font-semibold hover:underline">
							<a
								href="https://instagram.com/akucuciin.id/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Cek promo lain di instagram/akucuciin.id
							</a>
						</div>
						<div className="flex gap-3 pt-4 border-t border-neutral-400">
							<button
								onClick={handleClose}
								disabled={isSubmitting}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-['Montserrat'] disabled:opacity-50"
							>
								Batal
							</button>
							<button
								onClick={handleSubmit}
								disabled={isSubmitting}
								className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-['Montserrat'] disabled:opacity-50"
							>
								Simpan
							</button>
						</div>
					</div>
				</Sheet.Content>
			</Sheet.Container>
		</Sheet>
	);
};

export default VoucherReferralSheet