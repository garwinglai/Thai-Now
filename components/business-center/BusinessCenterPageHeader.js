import React from "react";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

function BusinessCenterPageHeader({ isBusinessUser }) {
	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	return (
		<div className="p-4 bg-white">
			<button onClick={handleBack} className="flex content-center gap-1">
				<ChevronLeftIcon />
				<p className="text-blue-950">Back</p>
			</button>
			<div className="flex gap-4 pt-8 pb-2 justify-between items-center w-full">
				<div className="flex justify-between gap-4">
					<Image
						src={avatar_image}
						alt="profile image"
						className=" w-14 h-14"
					/>
					<div className="flex flex-col">
						<p>Welcome</p>
						<h4>Lolar Ramsey</h4>
					</div>
				</div>
				<Link
					href={`${
						isBusinessUser
							? `/business-center/business/public-page`
							: `/business-center/classic`
					}`}
					className=" bg-orange-600 text-white px-1 py-2 text-xs h-full rounded-md "
				>
					View public page
				</Link>
			</div>
			<div className="flex items-center gap-2">
				<StarIcon fontSize="small" sx={{ color: "orange" }} />
				<p className="font-light">4.96</p>
				<p className=" font-extralight text-gray-600">
					(20 Reviews) - East Hollywood, CA
				</p>
			</div>
		</div>
	);
}

export default BusinessCenterPageHeader;
