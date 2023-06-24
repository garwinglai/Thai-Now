import React from "react";
import basic_living_img from "@/public/static/images/directory/basic_living_img.png";
import business_investment from "@/public/static/images/directory/business_investment.png";
import health from "@/public/static/images/directory/health.png";
import kids from "@/public/static/images/directory/kids.png";
import learning from "@/public/static/images/directory/learning.png";
import living_permanently from "@/public/static/images/directory/living_permanently.png";
import moving_us from "@/public/static/images/directory/moving_us.png";
import thai_pride from "@/public/static/images/directory/thai_pride.png";
import transfer from "@/public/static/images/directory/transfer.png";
import travel from "@/public/static/images/directory/travel.png";
import CategoryCard from "./CategoryCard";
import CategorySearchResultHeader from "./CategorySearchResultHeader";
import Link from "next/link";

const categoryList = [
	{
		alt: "basic living",
		img: basic_living_img,
		text: "Basic living",
		color: "text-[color:var(--housing)]",
		bg: "bg-[color:var(--housing-bg)]",
	},
	{
		alt: "moving to united states",
		img: moving_us,
		text: "Moving to US",
		color: "text-[color:var(--moving)]",
		bg: "bg-[color:var(--moving-bg)]",
	},
	{
		alt: "living permanently image",
		img: living_permanently,
		text: "Living Permanently",
		color: "text-[color:var(--living)]",
		bg: "bg-[color:var(--living-bg)]",
	},
	{
		alt: "travel ",
		img: travel,
		text: "Travel",
		color: "text-[color:var(--travel)]",
		bg: "bg-[color:var(--travel-bg)]",
	},
	{
		alt: "learning ",
		img: learning,
		text: "Learning",
		color: "text-[color:var(--learning)]",
		bg: "bg-[color:var(--learning-bg)]",
	},
	{
		alt: "transfer ",
		img: transfer,
		text: "Transfer",
		color: "text-[color:var(--transfer)]",
		bg: "bg-[color:var(--transfer-bg)]",
	},
	{
		alt: "health ",
		img: health,
		text: "Health",
		color: "text-[color:var(--health)]",
		bg: "bg-[color:var(--health-bg)]",
	},
	{
		alt: "kids lin",
		img: kids,
		text: "Kids",
		color: "text-[color:var(--kids)]",
		bg: "bg-[color:var(--kids-bg)]",
	},
	{
		alt: "business and investment ",
		img: business_investment,
		text: "Business and Investment",
		color: "text-[color:var(--investment)]",
		bg: "bg-[color:var(--investment-bg)]",
	},
	{
		alt: "thai pride ",
		img: thai_pride,
		text: "Thai Pride",
		color: "text-[color:var(--pride)]",
		bg: "bg-[color:var(--pride-bg)]",
	},
];

function ThaiHelpCategory() {
	return (
		<React.Fragment>
			<div className=" pt-4 w-screen bg-[color:var(--category-bg)]">
				<h3 className="pl-4 text-[var(--deals-primary)] mb-4">Category</h3>

				<div className="flex flex-nowrap gap-4 overflow-x-auto pb-8 pl-4">
					{categoryList.map((listItem, idx) => (
						<CategoryCard
							imgSrc={listItem.img}
							key={idx}
							imgAlt={listItem.alt}
							text={listItem.text}
							color={listItem.color}
							bg={listItem.bg}
						/>
					))}
				</div>
			</div>
			<div className="bg-white p-4">
				<CategorySearchResultHeader title="Trending Post" />
			</div>
		</React.Fragment>
	);
}

export default ThaiHelpCategory;
