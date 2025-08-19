import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomerServices from "../../services/customer.services";
import { successSwal } from "../../utils/alert.utils";
import LoadingUtils from "../../utils/loading.utils";

const MissingFields = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let redirectTo = "/";

	const [formData, setFormData] = useState({
		address: "",
		telephone: "",
	});
	const { accessToken, isLoading } = useSelector((state) => state.auth);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await CustomerServices.fillMissingFields(
			accessToken,
			formData,
			dispatch
		);

		setFormData({
			address: "",
			telephone: "",
		});

		if (response) {
			successSwal("Data berhasil dilengkapi.");
			navigate(redirectTo);
		}
	};

	if (isLoading) {
		return <LoadingUtils />;
	}

	return (
		<div className="min-h-[100dvh] w-screen flex flex-row items-center justify-center dark:bg-dark-bg">
			<div className=" hidden h-screen bg-[#687eff] md:w-[50%] lg:relative lg:flex justify-end items-end rounded-tr-[40px] rounded-br-[40px]">
				<a href="/">
					<img
						alt="backwhite"
						src="/Images/backwhite.webp"
						className="absolute top-8 left-5"
					/>
				</a>
				<div className="text-center text-white text-5xl font-bold font-['Montserrat'] whitespace-nowrap [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.25)] lg:absolute top-[15dvh] left-1/2 transform -translate-x-1/2">
					Welcome Back!
				</div>
				<img
					src="/Images/mockup_hp.webp"
					alt=""
					className="hidden h-[80%] w-full lg:block object-cover"
				/>
			</div>

			<div className="relative min-h-[100dvh] w-screen mx-0.5 flex flex-col items-center justify-center space-y-10 md:space-y-16 md:my-0 md:mx-0 lg:space-y-6 lg:w-[50%] dark:text-dark-text">
				<a href="/">
					<img
						alt="backbiru"
						src="/Images/backbiru.png"
						className="absolute top-8 left-5 lg:hidden"
					/>
				</a>
				<img
					src="/Images/LogoAkucuciin.png"
					alt="logo"
					className="w-[200px] mt-0 md:w-[13rem] lg:w-[15rem]"
				/>

				<div className="flex flex-col items-center justify-center space-y-7 lg:space-y-5">
					<h1 className="font-normal text-[20px] font-poppins self-start md:text-[24px] dark:text-dark-text">
						Yuk lengkapi data kamu untuk melanjutkan
					</h1>

					<form
						onSubmit={handleSubmit}
						className="space-y-6 flex flex-col align-center justify-center items-center md:space-y-8 lg:space-y-6"
					>
						<div className="space-y-5 md:space-y-6">
							<div className="flex flex-row space-x-1 font-['Montserrat'] bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm rounded-[10px] p-[8px] rounded-lg w-[20rem] md:p-[15px] md:w-[60dvw] lg:w-[30rem] lg:p-[10px]">
								<img
									src="/Images/address.webp"
									alt=""
									className="w-[25px] mr-1"
								/>
								<input
									value={formData.address}
									onChange={handleChange}
									required
									type="text"
									name="address"
									placeholder="alamat"
									className="fix-autofill w-full bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 font-['Montserrat'] focus:outline-none focus:border-b-1 md:text-base"
								/>
							</div>

							<div className="flex flex-row justify-center align-center space-x-1 font-['Montserrat'] bg-white dark:bg-dark-card border border-0.2 border-gray-500/30 dark:border-neutral-700 shadow-sm p-[10px] rounded-lg w-[20rem] md:p-[15px] md:w-[60dvw] lg:w-[30rem] lg:p-[10px]">
								<img
									src="/Images/telephone.webp"
									alt=""
									className="w-[25px] mr-1"
								/>
								<input
									value={formData.telephone}
									onChange={handleChange}
									required
									type="text"
									name="telephone"
									placeholder="Nomor WA (62xxxx)"
									className="fix-autofill w-full font-['Montserrat'] bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-b-1 md:text-base"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className={`shadow-md font-['Montserrat'] w-[20rem] md:w-[60dvw] md:text-lg lg:w-[30rem] ${
								isLoading
									? "bg-gray-400 text-gray-600 cursor-not-allowed"
									: "bg-[#687eff] text-white"
							} text-white font-semibold p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg`}
						>
							{isLoading ? "Loading..." : "Continue"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default MissingFields;
