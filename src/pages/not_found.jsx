import React from "react";

const NotFound = () => {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
			<img
				src="/Images/LogoAkucuciin2.png"
				alt="Akucuciin logo"
				className="lg:h-48 h-36"
			/>
			<h1 className="font-[Montserrat] lg:text-4xl text-2xl font-bold text-center mt-20">
				404 - Page Not Found
			</h1>
			<p className="font-[Montserrat] font-medium lg:text-base text-sm text-center mt-4">
				The page you are looking for does not exist.
			</p>
			<p className="font-[Montserrat] font-medium lg:text-base text-sm text-center mt-2">
				Please check the URL or return to the homepage.
			</p>
			<a
				href="/"
				className="font-[Montserrat] font-semibold text-white lg:text-base text-sm text-center block bg-[#687EFF] p-4 rounded-full mt-4 hover:bg-[#4762FF] transition-colors"
			>
				Return to Homepage
			</a>
		</div>
	);
};

export default NotFound;
