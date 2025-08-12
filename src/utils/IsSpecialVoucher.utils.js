// Checks if a voucher (string) is "AKUMABA" or "AKUNGEKOS"

const isSpecialVoucher = (voucher) => {
	const specialVouchers = ["AKUMABA", "AKUNGEKOS"];

	return specialVouchers.includes(voucher);
};

export default isSpecialVoucher;
