import React from "react";
import thai_housing_icon from "@/public/static/images/icons/thai_housing_icon.svg";
import thai_marketplace_icon from "@/public/static/images/icons/thai_marketplace_icon.svg";
import thai_jobs_icon from "@/public/static/images/icons/thai_jobs_icon.svg";
import Image from "next/image";

function BusinessCenterBodyHeader({ route }) {
	function displayRoutes(route) {
		if (route === "classic") {
			return (
				<React.Fragment>
					<div className="flex flex-col justify-center items-center flex-grow gap-1 ">
						<Image
							src={thai_housing_icon}
							alt="housing icon"
							className="w-12 h-12"
						/>
						<div className="text-center">
							<p className=" text-gray-400 font-extralight text-xs">Housing</p>
							<p className="text-blue-900 text-sm">0 Post</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center flex-grow gap-1 ">
						<Image
							src={thai_marketplace_icon}
							alt="housing icon"
							className="w-12 h-12"
						/>
						<div className="text-center">
							<p className=" text-gray-400 font-extralight text-xs">
								Marketplace
							</p>
							<p className="text-blue-900 text-sm">0 Post</p>
						</div>
					</div>
				</React.Fragment>
			);
		}
		if (route === "business") {
			return (
				<React.Fragment>
					<div className="flex flex-col justify-center items-center flex-grow gap-1 ">
						<Image
							src={thai_jobs_icon}
							alt="jobs icon"
							className="w-12 h-12"
						/>
						<div className="text-center">
							<p className=" text-gray-400 font-extralight text-xs">Jobs</p>
							<p className="text-blue-900 text-sm">0 Post</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center flex-grow gap-1 ">
						<Image
							src={thai_housing_icon}
							alt="housing icon"
							className="w-12 h-12"
						/>
						<div className="text-center">
							<p className=" text-gray-400 font-extralight text-xs">Housing</p>
							<p className="text-blue-900 text-sm">0 Post</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center flex-grow gap-1 ">
						<Image
							src={thai_marketplace_icon}
							alt="housing icon"
							className="w-12 h-12"
						/>
						<div className="text-center">
							<p className=" text-gray-400 font-extralight text-xs">
								Marketplace
							</p>
							<p className="text-blue-900 text-sm">0 Post</p>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}

	return (
		<div className="p-4">
			<h4>My Post</h4>
			<div className="flex justify-between py-4">{displayRoutes(route)}</div>
		</div>
	);
}

export default BusinessCenterBodyHeader;
