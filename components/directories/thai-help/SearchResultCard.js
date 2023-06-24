import React from "react";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/logo_black.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";

const pid = "pid-thai-help";

function SearchResultCard({ postType, directory }) {
	const statusBackgroundColor =
		postType === "housing"
			? "bg-[color:var(--housing-bg)]"
			: postType === "moving"
			? "bg-[color:var(--moving-bg)]"
			: postType === "living"
			? "bg-[color:var(--living-bg)]"
			: postType === "travel"
			? "bg-[color:var(--travel-bg)]"
			: postType === "learning"
			? "bg-[color:var(--learning-bg)]"
			: postType === "transfer"
			? "bg-[color:var(--transfer-bg)]"
			: postType === "health"
			? "bg-[color:var(--health-bg)]"
			: postType === "kids"
			? "bg-[color:var(--kids-bg)]"
			: postType === "investment"
			? "bg-[color:var(--investment-bg)]"
			: "bg-[color:var(--pride-bg)]";

	const statusTextColor =
		postType === "housing"
			? "text-[color:var(--housing)]"
			: postType === "moving"
			? "text-[color:var(--moving)]"
			: postType === "living"
			? "text-[color:var(--living)]"
			: postType === "travel"
			? "text-[color:var(--travel)]"
			: postType === "learning"
			? "text-[color:var(--learning)]"
			: postType === "transfer"
			? "text-[color:var(--transfer)]"
			: postType === "health"
			? "text-[color:var(--health)]"
			: postType === "kids"
			? "text-[color:var(--kids)]"
			: postType === "investment"
			? "text-[color:var(--investment)]"
			: "text-[color:var(--pride)]";

	const statusText =
		postType === "housing"
			? "Basic living"
			: postType === "moving"
			? "Moving to US"
			: postType === "living"
			? "Living permanently"
			: postType === "travel"
			? "Travel"
			: postType === "learning"
			? "Learning"
			: postType === "transfer"
			? "Transfer"
			: postType === "health"
			? "Health"
			: postType === "kids"
			? "Kids"
			: postType === "investment"
			? "Business and Investment"
			: "Thai Pride";

	return (
		<Link
			href={`/${directory}/${pid}`}
			className="flex justify-between items-end border-b py-4"
		>
			<div className="flex flex-col gap-2">
				<p
					className={`${statusBackgroundColor} ${statusTextColor} w-fit px-3 py-1 rounded font-light text-sm`}
				>
					{statusText}
				</p>
				<h4>Lorem ipsum dolor sit.</h4>
				<div className="flex items-center gap-2">
					<Image
						src={thai_now_logo}
						alt="business logo"
						className="w-10 h-10 object-contain border rounded-full p-1 "
					/>
					<p className="font-extralight text-sm">Thai Now - 23m ago</p>
				</div>
			</div>
			<div className="flex  items-center">
				<IconButton>
					<ThumbUpOutlinedIcon color="primary" fontSize="small" />
				</IconButton>
				<p className="font-extralight text-sm">15</p>
			</div>
		</Link>
	);
}

export default SearchResultCard;
