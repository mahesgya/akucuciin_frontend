import { useNavigate } from "react-router-dom";

const SnkVoucherGacha = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/");
	};

	return (
		<div className="w-full font-sans">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-800">
				<button onClick={handleBack}>
					<img
						alt="backbiru"
						src="/Images/backblack.webp"
						className="absolute z-20 top-4 left-4 w-10 h-10"
					></img>
				</button>
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
					Syarat dan Ketentuan Voucher Gacha AKUMABA
				</h1>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						1. Voucher hanya berlaku 1x pakai
					</h2>
					<p className="text-sm sm:text-base">
						Jika pesanan dibatalkan, voucher tidak dapat digunakan kembali.
					</p>
				</section>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						2. Setiap pengguna yang memasukkan kode akan mendapatkan diskon
						secara acak dengan nominal diskon yang berbeda-beda.
					</h2>
				</section>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						3. Masa Berlaku
					</h2>
					<p className="text-sm sm:text-base mb-2">
						Voucher hanya berlaku dari tanggal
						<span className="font-bold"> 27 Juli 2025 - 27 Agustus 2025 </span>
					</p>
				</section>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						4. Kode Voucher ini{" "}
						<span className="font-bold"> tidak bisa digabung</span> dengan promo
						atau kode voucher lainnya.
					</h2>
				</section>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						5. Penggunaan yang melanggar (misalnya: spam akun, manipulasi
						transaksi) akan dibatalkan secara sepihak oleh penyelenggara
						(Akucuciin).
					</h2>
				</section>

				<section className="mb-6 sm:mb-8">
					<h2 className="text-lg sm:text-xl font-medium mb-2">
						6. Tidak Dapat Diuangkan
					</h2>
					<p className="text-sm sm:text-base">
						Voucher tidak dapat ditukar dengan uang tunai atau dikembalikan.
					</p>
				</section>

				<section>
					<p className="text-sm sm:text-base">
						🌐 Website:{" "}
						<a
							href="https://akucuciin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline break-words"
						>
							https://akucuciin.com
						</a>
					</p>
				</section>
			</div>
		</div>
	);
};

export default SnkVoucherGacha;
