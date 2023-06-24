import Image from "next/image";
import React from "react";

function CategoryCard({ imgSrc, imgAlt, text, color, bg }) {
	return (
		<button
			className={`${bg} rounded-lg min-w-[40%] pt-2 pb-4 pl-4 pr-8 shadow-lg`}
		>
			<div className="flex flex-col items-start text-left">
				<Image src={imgSrc} alt={imgAlt} />
				<p className={`${color} text-sm mt-2 font-base`}>{text}</p>
			</div>
		</button>
	);
}

export default CategoryCard;
